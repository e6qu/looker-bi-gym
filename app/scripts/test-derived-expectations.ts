import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, extname, join, relative } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import type { ChallengeCheck, ChallengeManifest } from "../src/challengeTypes";

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

type DatasetTableMetadata = {
  readonly id: string;
  readonly file: string;
};

type DatasetMetadata = {
  readonly dataset_id: string;
  readonly version: string;
  readonly tables: readonly DatasetTableMetadata[];
};

type BrowserSqlFixture = {
  readonly fixture_id: string;
  readonly challenge_id: string;
  readonly mode: "browser-sql";
  readonly kind: "known-good" | "known-bad" | "coverage-exception";
  readonly dataset_id: string;
  readonly dataset_version: string;
  readonly sql_file: string;
  readonly path: string;
};

type QueryResult = {
  readonly columns: readonly string[];
  readonly rows: readonly DuckDbRow[];
};

type AggregateExpectation = {
  readonly column: string;
  readonly value: number;
  readonly tolerance: number;
};

type DerivedExpectation = {
  readonly challenge_id: string;
  readonly fixture_id: string;
  readonly check_id: string;
  readonly check_type: "row-count" | "aggregate-total" | "scalar-aggregate";
  readonly dataset_id: string;
  readonly dataset_version: string;
  readonly manifest_value: number;
  readonly derived_value: number;
  readonly tolerance: number;
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

function parseString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== "string") {
    throw new Error(
      `${relative(repoRoot, filePath)} field ${field} must be a string.`,
    );
  }

  assert.ok(
    value.trim().length > 0,
    `${relative(repoRoot, filePath)} field ${field} must be non-empty.`,
  );

  return value;
}

function parseBrowserSqlFixture(
  source: string,
  filePath: string,
): BrowserSqlFixture | undefined {
  const parsed = JSON.parse(source) as unknown;

  assert.ok(
    isRecord(parsed),
    `${relative(repoRoot, filePath)} must be a JSON object.`,
  );

  if (parsed["mode"] !== "browser-sql") {
    return undefined;
  }

  const kind = parsed["kind"];

  assert.ok(
    kind === "known-good" ||
      kind === "known-bad" ||
      kind === "coverage-exception",
    `${relative(repoRoot, filePath)} field kind is unsupported.`,
  );

  return {
    fixture_id: parseString(parsed["fixture_id"], "fixture_id", filePath),
    challenge_id: parseString(parsed["challenge_id"], "challenge_id", filePath),
    mode: "browser-sql",
    kind,
    dataset_id: parseString(parsed["dataset_id"], "dataset_id", filePath),
    dataset_version: parseString(
      parsed["dataset_version"],
      "dataset_version",
      filePath,
    ),
    sql_file: parseString(parsed["sql_file"], "sql_file", filePath),
    path: filePath,
  };
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

  const rawTables = parsed["tables"];

  assert.ok(
    Array.isArray(rawTables),
    `${relative(repoRoot, filePath)} tables must be an array.`,
  );

  const tables = rawTables.map((table, index): DatasetTableMetadata => {
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
    dataset_id: parseString(parsed["dataset_id"], "dataset_id", filePath),
    version: parseString(parsed["version"], "version", filePath),
    tables,
  };
}

async function listFiles(
  root: string,
  extension: string,
): Promise<readonly string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(root, entry.name);

      if (entry.isDirectory()) {
        return listFiles(entryPath, extension);
      }

      return entry.isFile() && extname(entry.name) === extension
        ? [entryPath]
        : [];
    }),
  );

  return nestedFiles.flat().sort();
}

async function readManifests(): Promise<
  ReadonlyMap<string, ChallengeManifest>
> {
  const manifestFiles = await listFiles(manifestsRoot, ".yaml");
  const manifests = new Map<string, ChallengeManifest>();

  for (const filePath of manifestFiles) {
    const manifest = parse(
      await readFile(filePath, "utf8"),
    ) as ChallengeManifest;
    manifests.set(manifest.id, manifest);
  }

  return manifests;
}

async function readBrowserSqlKnownGoodFixtures(): Promise<
  readonly BrowserSqlFixture[]
> {
  const fixtureFiles = await listFiles(fixturesRoot, ".json");
  const fixtures: BrowserSqlFixture[] = [];

  for (const filePath of fixtureFiles) {
    const fixture = parseBrowserSqlFixture(
      await readFile(filePath, "utf8"),
      filePath,
    );

    if (fixture?.kind === "known-good") {
      fixtures.push(fixture);
    }
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
    const registeredPath = `${datasetId}/${datasetVersion}/${table.file}`;
    const tableName = tableNameFromMetadataId(table.id);

    await database.registerFileText(
      registeredPath,
      await readFile(join(datasetRoot, table.file), "utf8"),
    );
    await connection.query(
      `CREATE OR REPLACE TABLE "${tableName}" AS SELECT * FROM read_csv_auto('${registeredPath}', header=true);`,
    );
  }
}

async function runQuery(
  connection: DuckDbConnectionLike,
  sql: string,
): Promise<QueryResult> {
  const result = await connection.query(sql);

  return {
    columns: result.schema.fields.map((field) => field.name),
    rows: result.toArray().map((row) => row.toJSON()),
  };
}

function parseAggregateExpectation(
  check: ChallengeCheck,
): AggregateExpectation | undefined {
  const expected = check.expected;

  if (!isRecord(expected)) {
    return undefined;
  }

  const column = expected["column"];
  const value = expected["value"];
  const tolerance = expected["tolerance"];

  if (typeof column !== "string" || typeof value !== "number") {
    return undefined;
  }

  assert.ok(
    tolerance === undefined || typeof tolerance === "number",
    `${check.id} tolerance must be numeric when present.`,
  );

  return {
    column,
    value,
    tolerance: tolerance ?? 0,
  };
}

function normalizeColumnName(column: string): string {
  return column.trim().toLowerCase();
}

function getNumericCell(
  row: Readonly<Record<string, unknown>>,
  column: string,
): number | undefined {
  const normalizedColumn = normalizeColumnName(column);
  const matchingKey = Object.keys(row).find(
    (key) => normalizeColumnName(key) === normalizedColumn,
  );

  if (matchingKey === undefined) {
    return undefined;
  }

  const value = row[matchingKey];

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }

  return undefined;
}

function deriveRowCount(
  check: ChallengeCheck,
  result: QueryResult,
): DerivedExpectation | undefined {
  if (typeof check.expected !== "number") {
    return undefined;
  }

  return {
    check_id: check.id,
    check_type: "row-count",
    challenge_id: "",
    fixture_id: "",
    dataset_id: "",
    dataset_version: "",
    manifest_value: check.expected,
    derived_value: result.rows.length,
    tolerance: 0,
  };
}

function deriveScalarAggregate(
  check: ChallengeCheck,
  result: QueryResult,
): DerivedExpectation | undefined {
  const expectation = parseAggregateExpectation(check);

  if (expectation === undefined) {
    return undefined;
  }

  assert.equal(
    result.rows.length,
    1,
    `${check.id} scalar aggregate can only be derived from a one-row result.`,
  );

  const row = result.rows[0];
  assert.ok(row !== undefined, `${check.id} must have one result row.`);

  const derivedValue = getNumericCell(row, expectation.column);

  assert.ok(
    derivedValue !== undefined,
    `${check.id} column ${expectation.column} must be numeric in the known-good SQL result.`,
  );

  return {
    check_id: check.id,
    check_type: "scalar-aggregate",
    challenge_id: "",
    fixture_id: "",
    dataset_id: "",
    dataset_version: "",
    manifest_value: expectation.value,
    derived_value: derivedValue,
    tolerance: expectation.tolerance,
  };
}

function deriveAggregateTotal(
  check: ChallengeCheck,
  result: QueryResult,
): DerivedExpectation | undefined {
  const expectation = parseAggregateExpectation(check);

  if (expectation === undefined) {
    return undefined;
  }

  const derivedValue = result.rows.reduce((total, row) => {
    const value = getNumericCell(row, expectation.column);

    assert.ok(
      value !== undefined,
      `${check.id} column ${expectation.column} must be numeric in every known-good SQL result row.`,
    );

    return total + value;
  }, 0);

  return {
    check_id: check.id,
    check_type: "aggregate-total",
    challenge_id: "",
    fixture_id: "",
    dataset_id: "",
    dataset_version: "",
    manifest_value: expectation.value,
    derived_value: derivedValue,
    tolerance: expectation.tolerance,
  };
}

function deriveCheckExpectation(
  check: ChallengeCheck,
  result: QueryResult,
): DerivedExpectation | undefined {
  switch (check.type) {
    case "row-count":
      return deriveRowCount(check, result);
    case "scalar-aggregate":
      return deriveScalarAggregate(check, result);
    case "aggregate-total":
      return deriveAggregateTotal(check, result);
    default:
      return undefined;
  }
}

function withFixtureContext(
  expectation: DerivedExpectation,
  fixture: BrowserSqlFixture,
): DerivedExpectation {
  return {
    ...expectation,
    challenge_id: fixture.challenge_id,
    fixture_id: fixture.fixture_id,
    dataset_id: fixture.dataset_id,
    dataset_version: fixture.dataset_version,
  };
}

async function deriveFixtureExpectations(
  challenge: ChallengeManifest,
  fixture: BrowserSqlFixture,
): Promise<readonly DerivedExpectation[]> {
  assert.equal(
    challenge.mode,
    "browser-sql",
    `${challenge.id} must be a browser-sql challenge.`,
  );

  const database = await createDatabase();
  const connection = await database.connect();

  try {
    await loadDataset(
      database,
      connection,
      fixture.dataset_id,
      fixture.dataset_version,
    );
    const sql = await readFile(
      join(dirname(fixture.path), fixture.sql_file),
      "utf8",
    );
    const result = await runQuery(connection, sql);

    return challenge.checks
      .map((check) => deriveCheckExpectation(check, result))
      .filter((expectation) => expectation !== undefined)
      .map((expectation) => withFixtureContext(expectation, fixture));
  } finally {
    await Promise.resolve(connection.close());

    if (typeof database.terminate === "function") {
      await database.terminate();
    }
  }
}

function assertDerivedExpectationMatchesManifest(
  expectation: DerivedExpectation,
): void {
  const delta = Math.abs(
    expectation.derived_value - expectation.manifest_value,
  );

  assert.ok(
    delta <= expectation.tolerance,
    `${expectation.challenge_id}/${expectation.fixture_id}/${expectation.check_id} manifest expected ${expectation.manifest_value}, but dataset-derived value was ${expectation.derived_value}.`,
  );
}

async function main(): Promise<void> {
  const manifests = await readManifests();
  const fixtures = await readBrowserSqlKnownGoodFixtures();
  const derivedExpectations: DerivedExpectation[] = [];

  for (const fixture of fixtures) {
    const challenge = manifests.get(fixture.challenge_id);

    assert.ok(
      challenge !== undefined,
      `${relative(repoRoot, fixture.path)} references unknown challenge ${fixture.challenge_id}.`,
    );

    if (challenge.mode !== "browser-sql") {
      continue;
    }

    derivedExpectations.push(
      ...(await deriveFixtureExpectations(challenge, fixture)),
    );
  }

  assert.ok(
    derivedExpectations.length > 0,
    "Expected at least one dataset-derived SQL expectation.",
  );

  for (const expectation of derivedExpectations) {
    assertDerivedExpectationMatchesManifest(expectation);
  }

  const challengeCount = new Set(
    derivedExpectations.map((expectation) => expectation.challenge_id),
  ).size;

  process.stdout.write(
    `Derived and verified ${derivedExpectations.length} SQL expectations across ${challengeCount} browser-SQL challenges.\n`,
  );
}

await main();
