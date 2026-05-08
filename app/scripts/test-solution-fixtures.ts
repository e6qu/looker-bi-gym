import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, extname, join, relative } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { evaluateCloudEvidenceChecks } from "../src/cloudEvidence";
import { evaluateChallengeQuestions } from "../src/quiz";
import { evaluateSqlResultChecks } from "../src/validators";
import type { ChallengeManifest, ChallengeMode } from "../src/challengeTypes";
import type { CloudEvidenceAnswerState } from "../src/cloudEvidence";
import type { QuizAnswerState } from "../src/quiz";
import type {
  SqlValidationResult,
  ValidationCheckResult,
} from "../src/validators";

type DuckDbRow = Readonly<Record<string, unknown>>;

type ArrowFieldLike = {
  readonly name: string;
};

type ArrowSchemaLike = {
  readonly fields: readonly ArrowFieldLike[];
};

type ArrowRowLike = {
  readonly toJSON: () => DuckDbRow;
};

type ArrowTableLike = {
  readonly schema: ArrowSchemaLike;
  readonly toArray: () => readonly ArrowRowLike[];
};

type DuckDbConnectionLike = {
  readonly query: (sql: string) => Promise<ArrowTableLike>;
  readonly close: () => Promise<void>;
};

type DuckDbBindingsLike = {
  readonly registerFileText: (path: string, text: string) => Promise<void>;
  readonly connect: () => Promise<DuckDbConnectionLike>;
  readonly instantiate: (
    mainModule: string,
    pthreadWorker?: string,
  ) => Promise<void>;
  readonly terminate?: () => Promise<void>;
};

type DuckDbNodeBlockingModule = {
  readonly createDuckDB: (
    bundles: DuckDbBundles,
    logger: unknown,
    runtime: unknown,
  ) => Promise<DuckDbBindingsLike>;
  readonly ConsoleLogger: new () => unknown;
  readonly NODE_RUNTIME: unknown;
};

type DuckDbBundle = {
  readonly mainModule: string;
  readonly mainWorker: string;
};

type DuckDbBundles = {
  readonly mvp: DuckDbBundle;
  readonly eh: DuckDbBundle;
};

type FixtureKind = "known-good" | "known-bad" | "coverage-exception";

type FixtureExpected = {
  readonly required_passed?: boolean;
  readonly failed_check_ids?: readonly string[];
};

type SolutionFixture = {
  readonly fixture_id: string;
  readonly challenge_id: string;
  readonly mode: ChallengeMode;
  readonly kind: FixtureKind;
  readonly description: string;
  readonly dataset_id?: string;
  readonly dataset_version?: string;
  readonly sql_file?: string;
  readonly answers?: QuizAnswerState;
  readonly evidence?: CloudEvidenceAnswerState;
  readonly expected?: FixtureExpected;
  readonly path: string;
};

type DatasetTableMetadata = {
  readonly id: string;
  readonly file: string;
};

type DatasetMetadata = {
  readonly dataset_id: string;
  readonly version: string;
  readonly tables: readonly DatasetTableMetadata[];
};

type FixtureEvaluation = {
  readonly requiredPassed: boolean;
  readonly checkResults: readonly ValidationCheckResult[];
};

const require = createRequire(import.meta.url);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const manifestsRoot = join(repoRoot, "challenges", "manifests");
const fixturesRoot = join(repoRoot, "challenges", "solution-fixtures");
const datasetsRoot = join(repoRoot, "datasets");
const packageRoot = dirname(require.resolve("@duckdb/duckdb-wasm"));
const duckdbNode = require(
  join(packageRoot, "duckdb-node-blocking.cjs"),
) as DuckDbNodeBlockingModule;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isChallengeMode(value: unknown): value is ChallengeMode {
  return (
    value === "quiz" ||
    value === "browser-sql" ||
    value === "browser-config" ||
    value === "cloud-evidence" ||
    value === "capstone"
  );
}

function isFixtureKind(value: unknown): value is FixtureKind {
  return (
    value === "known-good" ||
    value === "known-bad" ||
    value === "coverage-exception"
  );
}

function isStringArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function parseString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== "string") {
    throw new Error(
      `${relative(repoRoot, filePath)} field ${field} must be a string.`,
    );
  }

  if (value.trim().length === 0) {
    throw new Error(
      `${relative(repoRoot, filePath)} field ${field} must be non-empty.`,
    );
  }

  return value;
}

function parseStringList(
  value: unknown,
  field: string,
  filePath: string,
): readonly string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  assert.ok(
    isStringArray(value),
    `${relative(repoRoot, filePath)} field ${field} must be a string array.`,
  );

  return value;
}

function parseAnswerState(
  value: unknown,
  field: string,
  filePath: string,
): QuizAnswerState | undefined {
  if (value === undefined) {
    return undefined;
  }

  assert.ok(
    isRecord(value),
    `${relative(repoRoot, filePath)} field ${field} must be an object.`,
  );

  for (const [key, answer] of Object.entries(value)) {
    const isValidAnswer = typeof answer === "string" || isStringArray(answer);

    assert.ok(
      isValidAnswer,
      `${relative(repoRoot, filePath)} answer ${key} must be a string or string array.`,
    );
  }

  return value as QuizAnswerState;
}

function parseEvidenceState(
  value: unknown,
  field: string,
  filePath: string,
): CloudEvidenceAnswerState | undefined {
  if (value === undefined) {
    return undefined;
  }

  assert.ok(
    isRecord(value),
    `${relative(repoRoot, filePath)} field ${field} must be an object.`,
  );

  for (const [key, evidence] of Object.entries(value)) {
    assert.ok(
      typeof evidence === "string" || typeof evidence === "boolean",
      `${relative(repoRoot, filePath)} evidence ${key} must be a string or boolean.`,
    );
  }

  return value as CloudEvidenceAnswerState;
}

function parseExpected(
  value: unknown,
  filePath: string,
): FixtureExpected | undefined {
  if (value === undefined) {
    return undefined;
  }

  assert.ok(
    isRecord(value),
    `${relative(repoRoot, filePath)} field expected must be an object.`,
  );

  const requiredPassed = value["required_passed"];

  assert.ok(
    requiredPassed === undefined || typeof requiredPassed === "boolean",
    `${relative(repoRoot, filePath)} expected.required_passed must be a boolean.`,
  );

  const expected: {
    required_passed?: boolean;
    failed_check_ids?: readonly string[];
  } = {};

  if (typeof requiredPassed === "boolean") {
    expected.required_passed = requiredPassed;
  }

  const failedCheckIds = parseStringList(
    value["failed_check_ids"],
    "expected.failed_check_ids",
    filePath,
  );

  if (failedCheckIds !== undefined) {
    expected.failed_check_ids = failedCheckIds;
  }

  return expected;
}

function parseFixture(source: string, filePath: string): SolutionFixture {
  const parsed = JSON.parse(source) as unknown;

  assert.ok(
    isRecord(parsed),
    `${relative(repoRoot, filePath)} must be a JSON object.`,
  );

  const mode = parsed["mode"];
  const kind = parsed["kind"];

  assert.ok(
    isChallengeMode(mode),
    `${relative(repoRoot, filePath)} field mode is unsupported.`,
  );
  assert.ok(
    isFixtureKind(kind),
    `${relative(repoRoot, filePath)} field kind is unsupported.`,
  );

  const datasetId = parsed["dataset_id"];
  const datasetVersion = parsed["dataset_version"];
  const sqlFile = parsed["sql_file"];

  assert.ok(
    datasetId === undefined || typeof datasetId === "string",
    `${relative(repoRoot, filePath)} field dataset_id must be a string.`,
  );
  assert.ok(
    datasetVersion === undefined || typeof datasetVersion === "string",
    `${relative(repoRoot, filePath)} field dataset_version must be a string.`,
  );
  assert.ok(
    sqlFile === undefined || typeof sqlFile === "string",
    `${relative(repoRoot, filePath)} field sql_file must be a string.`,
  );

  const answers = parseAnswerState(parsed["answers"], "answers", filePath);
  const evidence = parseEvidenceState(parsed["evidence"], "evidence", filePath);
  const expected = parseExpected(parsed["expected"], filePath);

  return {
    fixture_id: parseString(parsed["fixture_id"], "fixture_id", filePath),
    challenge_id: parseString(parsed["challenge_id"], "challenge_id", filePath),
    mode,
    kind,
    description: parseString(parsed["description"], "description", filePath),
    ...(datasetId !== undefined ? { dataset_id: datasetId } : {}),
    ...(datasetVersion !== undefined
      ? { dataset_version: datasetVersion }
      : {}),
    ...(sqlFile !== undefined ? { sql_file: sqlFile } : {}),
    ...(answers !== undefined ? { answers } : {}),
    ...(evidence !== undefined ? { evidence } : {}),
    ...(expected !== undefined ? { expected } : {}),
    path: filePath,
  };
}

async function listFiles(
  root: string,
  extension: string,
): Promise<readonly string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath, extension)));
    } else if (entry.isFile() && extname(entry.name) === extension) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

async function readManifests(): Promise<
  ReadonlyMap<string, ChallengeManifest>
> {
  const manifestFiles = await listFiles(manifestsRoot, ".yaml");
  const manifests = new Map<string, ChallengeManifest>();

  for (const filePath of manifestFiles) {
    const source = await readFile(filePath, "utf8");
    const manifest = parse(source) as ChallengeManifest;

    assert.ok(
      !manifests.has(manifest.id),
      `Duplicate manifest id ${manifest.id}.`,
    );
    manifests.set(manifest.id, manifest);
  }

  return manifests;
}

async function readFixtures(): Promise<readonly SolutionFixture[]> {
  const fixtureFiles = await listFiles(fixturesRoot, ".json");
  const fixtures: SolutionFixture[] = [];

  for (const filePath of fixtureFiles) {
    fixtures.push(parseFixture(await readFile(filePath, "utf8"), filePath));
  }

  return fixtures;
}

function manualBundles(): DuckDbBundles {
  return {
    eh: {
      mainModule: join(packageRoot, "duckdb-eh.wasm"),
      mainWorker: join(packageRoot, "duckdb-node-eh.worker.cjs"),
    },
    mvp: {
      mainModule: join(packageRoot, "duckdb-mvp.wasm"),
      mainWorker: join(packageRoot, "duckdb-node-mvp.worker.cjs"),
    },
  };
}

async function createDatabase(): Promise<DuckDbBindingsLike> {
  const bundles = manualBundles();
  const database = await duckdbNode.createDuckDB(
    bundles,
    new duckdbNode.ConsoleLogger(),
    duckdbNode.NODE_RUNTIME,
  );
  await database.instantiate(bundles.mvp.mainModule, bundles.mvp.mainWorker);
  return database;
}

function parseDatasetMetadata(
  source: string,
  filePath: string,
): DatasetMetadata {
  const parsed = JSON.parse(source) as unknown;

  assert.ok(
    isRecord(parsed),
    `${relative(repoRoot, filePath)} must be a JSON object.`,
  );
  const datasetId = parseString(parsed["dataset_id"], "dataset_id", filePath);
  const version = parseString(parsed["version"], "version", filePath);
  const rawTables = parsed["tables"];

  assert.ok(
    Array.isArray(rawTables),
    `${relative(repoRoot, filePath)} tables must be an array.`,
  );

  const tables: DatasetTableMetadata[] = rawTables.map((table, index) => {
    assert.ok(
      isRecord(table),
      `${relative(repoRoot, filePath)} tables[${index}] must be an object.`,
    );

    return {
      id: parseString(table["id"], `tables[${index}].id`, filePath),
      file: parseString(table["file"], `tables[${index}].file`, filePath),
    };
  });

  return {
    dataset_id: datasetId,
    version,
    tables,
  };
}

function tableNameFromMetadataId(tableId: string): string {
  const parts = tableId.split(".");
  const tableName = parts[parts.length - 1];

  assert.ok(
    tableName !== undefined && tableName.length > 0,
    `Invalid dataset table id: ${tableId}.`,
  );
  return tableName;
}

async function loadDataset(
  database: DuckDbBindingsLike,
  connection: DuckDbConnectionLike,
  datasetId: string,
  datasetVersion: string,
): Promise<void> {
  const datasetRoot = join(datasetsRoot, datasetId, datasetVersion);
  const metadataPath = join(datasetRoot, "metadata.json");
  const metadata = parseDatasetMetadata(
    await readFile(metadataPath, "utf8"),
    metadataPath,
  );

  assert.equal(metadata.dataset_id, datasetId);
  assert.equal(metadata.version, datasetVersion);

  for (const table of metadata.tables) {
    const csv = await readFile(join(datasetRoot, table.file), "utf8");
    const registeredPath = `${datasetId}/${datasetVersion}/${table.file}`;
    const tableName = tableNameFromMetadataId(table.id);

    await database.registerFileText(registeredPath, csv);
    await connection.query(
      `CREATE OR REPLACE TABLE "${tableName}" AS SELECT * FROM read_csv_auto('${registeredPath}', header=true);`,
    );
  }
}

async function runValidationQuery(
  connection: DuckDbConnectionLike,
  sql: string,
): Promise<SqlValidationResult> {
  const result = await connection.query(sql);

  return {
    columns: result.schema.fields.map((field) => field.name),
    rows: result.toArray().map((row) => row.toJSON()),
  };
}

function manifestDatasetMatchesFixture(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): boolean {
  return challenge.inputs.some(
    (input) =>
      input.dataset_id === fixture.dataset_id &&
      input.dataset_version === fixture.dataset_version,
  );
}

function evaluateQuestions(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): boolean {
  if (challenge.questions.length === 0) {
    return true;
  }

  const answers = fixture.answers ?? {};
  const evaluation = evaluateChallengeQuestions(challenge, answers);

  return evaluation.isComplete;
}

async function evaluateBrowserSqlFixture(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): Promise<FixtureEvaluation> {
  const datasetId = fixture.dataset_id;
  const datasetVersion = fixture.dataset_version;
  const sqlFile = fixture.sql_file;

  if (datasetId === undefined) {
    throw new Error(`${fixture.fixture_id} must pin dataset_id.`);
  }

  if (datasetVersion === undefined) {
    throw new Error(`${fixture.fixture_id} must pin dataset_version.`);
  }

  if (sqlFile === undefined) {
    throw new Error(`${fixture.fixture_id} must declare sql_file.`);
  }

  assert.ok(
    manifestDatasetMatchesFixture(challenge, fixture),
    `${fixture.challenge_id}/${fixture.fixture_id} dataset pin ${datasetId}/${datasetVersion} must match a manifest input.`,
  );

  const database = await createDatabase();
  const connection = await database.connect();

  try {
    await loadDataset(database, connection, datasetId, datasetVersion);
    const sql = await readFile(join(dirname(fixture.path), sqlFile), "utf8");
    const result = await runValidationQuery(connection, sql);
    const sqlEvaluation = evaluateSqlResultChecks(challenge, result);
    const questionsPassed = evaluateQuestions(challenge, fixture);

    return {
      requiredPassed: sqlEvaluation.requiredPassed && questionsPassed,
      checkResults: sqlEvaluation.checks,
    };
  } finally {
    await Promise.resolve(connection.close());

    if (typeof database.terminate === "function") {
      await database.terminate();
    }
  }
}

function evaluateQuizFixture(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): FixtureEvaluation {
  return {
    requiredPassed: evaluateQuestions(challenge, fixture),
    checkResults: [],
  };
}

function evaluateCloudEvidenceFixture(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): FixtureEvaluation {
  const evidence = fixture.evidence ?? {};
  const evidenceEvaluation = evaluateCloudEvidenceChecks(challenge, evidence);
  const questionsPassed = evaluateQuestions(challenge, fixture);

  return {
    requiredPassed: evidenceEvaluation.requiredPassed && questionsPassed,
    checkResults: evidenceEvaluation.checks,
  };
}

async function evaluateFixture(
  challenge: ChallengeManifest,
  fixture: SolutionFixture,
): Promise<FixtureEvaluation> {
  switch (challenge.mode) {
    case "quiz":
      return evaluateQuizFixture(challenge, fixture);
    case "browser-sql":
      return evaluateBrowserSqlFixture(challenge, fixture);
    case "cloud-evidence":
      return evaluateCloudEvidenceFixture(challenge, fixture);
    case "browser-config":
    case "capstone":
      throw new Error(
        `Fixture runner does not support mode ${challenge.mode} for ${challenge.id}.`,
      );
  }
}

function requiresKnownBadFixture(challenge: ChallengeManifest): boolean {
  const haystack =
    `${challenge.title} ${challenge.business_scenario}`.toLowerCase();
  return haystack.includes("ctf") || haystack.includes("trap");
}

function assertExpectedFailedChecks(
  fixture: SolutionFixture,
  evaluation: FixtureEvaluation,
): void {
  const expectedFailedCheckIds = fixture.expected?.failed_check_ids ?? [];
  const failedCheckIds = new Set(
    evaluation.checkResults
      .filter((check) => check.status === "fail")
      .map((check) => check.checkId),
  );

  for (const checkId of expectedFailedCheckIds) {
    assert.ok(
      failedCheckIds.has(checkId),
      `${fixture.challenge_id}/${fixture.fixture_id} expected check ${checkId} to fail.`,
    );
  }
}

function assertFixtureCoverage(
  manifests: ReadonlyMap<string, ChallengeManifest>,
  fixtures: readonly SolutionFixture[],
): void {
  const fixturesByChallenge = new Map<string, SolutionFixture[]>();
  const fixtureKeys = new Set<string>();

  for (const fixture of fixtures) {
    const challenge = manifests.get(fixture.challenge_id);

    assert.ok(
      challenge !== undefined,
      `${relative(repoRoot, fixture.path)} references unknown challenge ${fixture.challenge_id}.`,
    );
    assert.equal(
      fixture.mode,
      challenge.mode,
      `${fixture.challenge_id}/${fixture.fixture_id} mode must match the manifest.`,
    );

    const fixtureKey = `${fixture.challenge_id}/${fixture.fixture_id}`;
    assert.ok(
      !fixtureKeys.has(fixtureKey),
      `Duplicate solution fixture ${fixtureKey}.`,
    );
    fixtureKeys.add(fixtureKey);

    const existingFixtures =
      fixturesByChallenge.get(fixture.challenge_id) ?? [];
    existingFixtures.push(fixture);
    fixturesByChallenge.set(fixture.challenge_id, existingFixtures);
  }

  for (const challenge of manifests.values()) {
    const challengeFixtures = fixturesByChallenge.get(challenge.id) ?? [];
    const hasGoodFixture = challengeFixtures.some(
      (fixture) => fixture.kind === "known-good",
    );
    const hasCoverageException = challengeFixtures.some(
      (fixture) => fixture.kind === "coverage-exception",
    );

    assert.ok(
      hasGoodFixture || hasCoverageException,
      `${challenge.id} must have a known-good solution fixture or a documented coverage exception.`,
    );

    if (requiresKnownBadFixture(challenge)) {
      assert.ok(
        challengeFixtures.some((fixture) => fixture.kind === "known-bad"),
        `${challenge.id} is a CTF/trap challenge and must have a known-bad fixture.`,
      );
    }
  }
}

async function main(): Promise<void> {
  const manifests = await readManifests();
  const fixtures = await readFixtures();

  assertFixtureCoverage(manifests, fixtures);

  let executedCount = 0;

  for (const fixture of fixtures) {
    if (fixture.kind === "coverage-exception") {
      continue;
    }

    const challenge = manifests.get(fixture.challenge_id);

    assert.ok(
      challenge !== undefined,
      `${fixture.challenge_id} should have been checked during coverage validation.`,
    );

    const evaluation = await evaluateFixture(challenge, fixture);
    const expectedRequiredPassed =
      fixture.expected?.required_passed ?? fixture.kind === "known-good";

    assert.equal(
      evaluation.requiredPassed,
      expectedRequiredPassed,
      `${fixture.challenge_id}/${fixture.fixture_id} expected required_passed=${String(expectedRequiredPassed)}.`,
    );

    if (fixture.kind === "known-good") {
      assert.equal(
        evaluation.requiredPassed,
        true,
        `${fixture.challenge_id}/${fixture.fixture_id} known-good fixture must pass.`,
      );
    }

    if (fixture.kind === "known-bad") {
      assert.equal(
        evaluation.requiredPassed,
        false,
        `${fixture.challenge_id}/${fixture.fixture_id} known-bad fixture must fail.`,
      );
      assertExpectedFailedChecks(fixture, evaluation);
    }

    executedCount += 1;
  }

  process.stdout.write(
    `Validated ${executedCount} solution fixtures for ${manifests.size} released challenges.\n`,
  );
}

await main();
