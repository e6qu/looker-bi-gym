import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { evaluateSqlResultChecks } from '../src/validators';
import type { ChallengeManifest } from '../src/challengeTypes';
import type { SqlValidationResult } from '../src/validators';

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
  readonly instantiate: (mainModule: string, pthreadWorker?: string) => Promise<void>;
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

type SeedTable = {
  readonly fileName:
    | 'account_daily_balances.csv'
    | 'account_owners.csv'
    | 'accounts.csv'
    | 'branches.csv'
    | 'products.csv';
  readonly tableName: 'branches' | 'products' | 'accounts' | 'account_owners' | 'account_daily_balances';
};

const require = createRequire(import.meta.url);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, '..');
const repoRoot = join(appRoot, '..');
const packageRoot = dirname(require.resolve('@duckdb/duckdb-wasm'));
const duckdbNode = require(join(packageRoot, 'duckdb-node-blocking.cjs')) as DuckDbNodeBlockingModule;
const datasetRoot = join(repoRoot, 'datasets', 'deposits-seed', 'v0.1.0');
const manifestsRoot = join(repoRoot, 'challenges', 'manifests');

const seedTables: readonly SeedTable[] = [
  { fileName: 'branches.csv', tableName: 'branches' },
  { fileName: 'products.csv', tableName: 'products' },
  { fileName: 'accounts.csv', tableName: 'accounts' },
  { fileName: 'account_owners.csv', tableName: 'account_owners' },
  { fileName: 'account_daily_balances.csv', tableName: 'account_daily_balances' },
];

function readNumberField(row: DuckDbRow, field: string): number {
  const value = row[field];
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`Field ${field} is not numeric.`);
  }

  return numericValue;
}

async function readManifest(fileName: string): Promise<ChallengeManifest> {
  const source = await readFile(join(manifestsRoot, fileName), 'utf8');
  return parse(source) as ChallengeManifest;
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

async function assertQueryPasses(
  connection: DuckDbConnectionLike,
  challenge: ChallengeManifest,
  sql: string,
): Promise<void> {
  const validationResult = await runValidationQuery(connection, sql);
  const evaluation = evaluateSqlResultChecks(challenge, validationResult);

  assert.equal(
    evaluation.requiredPassed,
    true,
    `${challenge.id} expected known-good query to pass: ${evaluation.checks
      .filter((check) => check.status !== 'pass')
      .map((check) => `${check.checkId}: ${check.message}`)
      .join('; ')}`,
  );
}

async function assertQueryFails(
  connection: DuckDbConnectionLike,
  challenge: ChallengeManifest,
  sql: string,
): Promise<void> {
  const validationResult = await runValidationQuery(connection, sql);
  const evaluation = evaluateSqlResultChecks(challenge, validationResult);

  assert.equal(
    evaluation.requiredPassed,
    false,
    `${challenge.id} expected known-bad query to fail.`,
  );
}

async function loadSeedTables(database: DuckDbBindingsLike, connection: DuckDbConnectionLike): Promise<void> {
  for (const table of seedTables) {
    const csvPath = join(datasetRoot, table.fileName);
    const csv = await readFile(csvPath, 'utf8');
    const registeredPath = `seed/${table.fileName}`;

    await database.registerFileText(registeredPath, csv);
    await connection.query(
      `CREATE OR REPLACE TABLE "${table.tableName}" AS SELECT * FROM read_csv_auto('${registeredPath}', header=true);`,
    );
  }
}

function manualBundles(): DuckDbBundles {
  return {
    eh: {
      mainModule: join(packageRoot, 'duckdb-eh.wasm'),
      mainWorker: join(packageRoot, 'duckdb-node-eh.worker.cjs'),
    },
    mvp: {
      mainModule: join(packageRoot, 'duckdb-mvp.wasm'),
      mainWorker: join(packageRoot, 'duckdb-node-mvp.worker.cjs'),
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

async function main(): Promise<void> {
  const database = await createDatabase();
  const connection = await database.connect();

  try {
    await loadSeedTables(database, connection);
    const firstDatasetChallenge = await readManifest('first-banking-dataset.yaml');
    const fanoutChallenge = await readManifest('account-owner-fanout.yaml');

    for (const table of seedTables) {
      const result = await connection.query(`SELECT count(*) AS row_count FROM "${table.tableName}";`);
      const rows = result.toArray().map((row) => row.toJSON());
      const rowCount = readNumberField(rows[0] ?? {}, 'row_count');

      assert.ok(rowCount > 0, `${table.tableName} should have rows`);
    }

    const branchRows = await connection.query('SELECT count(*) AS row_count FROM branches;');
    const branchCount = readNumberField(branchRows.toArray()[0]?.toJSON() ?? {}, 'row_count');
    assert.equal(branchCount, 5);

    const joinResult = await connection.query(
      `
        SELECT SUM(b.ledger_balance) AS total_balance
        FROM accounts a
        INNER JOIN account_daily_balances b USING (account_id)
        WHERE b.business_date = '2026-03-31'
      `,
    );
    const joinTotal = readNumberField(joinResult.toArray()[0]?.toJSON() ?? {}, 'total_balance');
    assert.equal(joinTotal, 95700);

    let invalidSqlFailed = false;
    try {
      await connection.query('SELECT * FROM missing_table;');
    } catch {
      invalidSqlFailed = true;
    }

    assert.equal(invalidSqlFailed, true);

    await assertQueryPasses(
      connection,
      firstDatasetChallenge,
      `
        SELECT
          COUNT(*) AS row_count,
          COUNT(DISTINCT adb.currency_code) AS currency_count,
          COUNT(DISTINCT a.branch_id) AS branch_count,
          MAX(adb.business_date) AS latest_balance_date
        FROM account_daily_balances adb
        INNER JOIN accounts a USING (account_id);
      `,
    );

    await assertQueryFails(
      connection,
      firstDatasetChallenge,
      `
        SELECT
          account_id,
          COUNT(*) AS row_count,
          COUNT(DISTINCT currency_code) AS currency_count,
          MAX(business_date) AS latest_balance_date
        FROM account_daily_balances
        GROUP BY account_id;
      `,
    );

    await assertQueryPasses(
      connection,
      fanoutChallenge,
      `
        WITH latest_balances AS (
          SELECT account_id, business_date, ledger_balance
          FROM account_daily_balances
          WHERE business_date = (
            SELECT MAX(business_date)
            FROM account_daily_balances
          )
        ),
        correct_total AS (
          SELECT CAST(SUM(ledger_balance) AS DOUBLE) AS correct_ledger_total
          FROM latest_balances
        ),
        naive_total AS (
          SELECT CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
          FROM latest_balances lb
          INNER JOIN account_owners ao USING (account_id)
        ),
        fanout_proof AS (
          SELECT
            correct_total.correct_ledger_total,
            naive_total.naive_joined_total
          FROM correct_total
          CROSS JOIN naive_total
        )
        SELECT
          (SELECT MAX(business_date) FROM latest_balances) AS latest_balance_date,
          correct_ledger_total,
          naive_joined_total,
          naive_joined_total - correct_ledger_total AS fanout_delta,
          ROUND(((naive_joined_total - correct_ledger_total) * 100.0) / correct_ledger_total, 2) AS overstatement_pct
        FROM fanout_proof;
      `,
    );

    await assertQueryFails(
      connection,
      fanoutChallenge,
      `
        WITH latest_balances AS (
          SELECT account_id, business_date, ledger_balance
          FROM account_daily_balances
          WHERE business_date = (
            SELECT MAX(business_date)
            FROM account_daily_balances
          )
        ),
        naive_total AS (
          SELECT CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
          FROM latest_balances lb
          INNER JOIN account_owners ao USING (account_id)
        )
        SELECT
          (SELECT MAX(business_date) FROM latest_balances) AS latest_balance_date,
          naive_joined_total AS correct_ledger_total,
          naive_joined_total,
          0 AS fanout_delta,
          0 AS overstatement_pct
        FROM naive_total;
      `,
    );
  } finally {
    await Promise.resolve(connection.close());
    const terminate = (database as { readonly terminate?: () => unknown }).terminate;

    if (typeof terminate === 'function') {
      await Promise.resolve(terminate());
    }
  }
}

await main();
