import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

type DuckDbRow = Readonly<Record<string, unknown>>;

type ArrowRowLike = {
  readonly toJSON: () => DuckDbRow;
};

type ArrowTableLike = {
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
  } finally {
    await Promise.resolve(connection.close());
    const terminate = (database as { readonly terminate?: () => unknown }).terminate;

    if (typeof terminate === 'function') {
      await Promise.resolve(terminate());
    }
  }
}

await main();
