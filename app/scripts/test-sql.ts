import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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

type SeedTable = {
  readonly fileName:
    | "account_daily_balances.csv"
    | "account_owners.csv"
    | "accounts.csv"
    | "branches.csv"
    | "products.csv";
  readonly tableName:
    | "branches"
    | "products"
    | "accounts"
    | "account_owners"
    | "account_daily_balances";
};

const require = createRequire(import.meta.url);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const packageRoot = dirname(require.resolve("@duckdb/duckdb-wasm"));
const duckdbNode = require(
  join(packageRoot, "duckdb-node-blocking.cjs"),
) as DuckDbNodeBlockingModule;
const datasetRoot = join(repoRoot, "datasets", "deposits-seed", "v0.1.0");

const seedTables: readonly SeedTable[] = [
  { fileName: "branches.csv", tableName: "branches" },
  { fileName: "products.csv", tableName: "products" },
  { fileName: "accounts.csv", tableName: "accounts" },
  { fileName: "account_owners.csv", tableName: "account_owners" },
  {
    fileName: "account_daily_balances.csv",
    tableName: "account_daily_balances",
  },
];

function readNumberField(row: DuckDbRow, field: string): number {
  const value = row[field];
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`Field ${field} is not numeric.`);
  }

  return numericValue;
}

async function loadSeedTables(
  database: DuckDbBindingsLike,
  connection: DuckDbConnectionLike,
): Promise<void> {
  for (const table of seedTables) {
    const csvPath = join(datasetRoot, table.fileName);
    const csv = await readFile(csvPath, "utf8");
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

async function main(): Promise<void> {
  const database = await createDatabase();
  const connection = await database.connect();

  try {
    await loadSeedTables(database, connection);

    for (const table of seedTables) {
      const result = await connection.query(
        `SELECT count(*) AS row_count FROM "${table.tableName}";`,
      );
      const rows = result.toArray().map((row) => row.toJSON());
      const rowCount = readNumberField(rows[0] ?? {}, "row_count");

      assert.ok(rowCount > 0, `${table.tableName} should have rows`);
    }

    const branchRows = await connection.query(
      "SELECT count(*) AS row_count FROM branches;",
    );
    const branchCount = readNumberField(
      branchRows.toArray()[0]?.toJSON() ?? {},
      "row_count",
    );
    assert.equal(branchCount, 5);

    const joinResult = await connection.query(
      `
        SELECT SUM(b.ledger_balance) AS total_balance
        FROM accounts a
        INNER JOIN account_daily_balances b USING (account_id)
        WHERE b.business_date = '2026-03-31'
      `,
    );
    const joinTotal = readNumberField(
      joinResult.toArray()[0]?.toJSON() ?? {},
      "total_balance",
    );
    assert.equal(joinTotal, 95700);

    let invalidSqlFailed = false;
    try {
      await connection.query("SELECT * FROM missing_table;");
    } catch {
      invalidSqlFailed = true;
    }

    assert.equal(invalidSqlFailed, true);

    // Tutorial 06 cost-budget exercise: real row counts driving the
    // estimated bytes, against the committed deposits seed.
    const costBudget = await connection.query(`
      WITH safe_serving_costed AS (
        SELECT
          'serving source baseline' AS scenario,
          COUNT(*) AS rows_scanned,
          5 AS columns_scanned,
          COUNT(*) * 5 * 16 AS estimated_bytes_processed
        FROM (
          SELECT
            b.currency_code,
            COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
            SUM(b.ledger_balance) AS ledger_total,
            COUNT(DISTINCT b.account_id) AS account_count,
            MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
          FROM account_daily_balances b
          INNER JOIN accounts a ON b.account_id = a.account_id
          LEFT JOIN branches br ON a.branch_id = br.branch_id
          WHERE b.business_date = DATE '2026-03-31'
          GROUP BY b.currency_code, COALESCE(br.city, 'UNMAPPED_BRANCH')
        ) s
      ),
      raw_join_costed AS (
        SELECT
          'serving source plus accidental raw owner join' AS scenario,
          COUNT(*) AS rows_scanned,
          9 AS columns_scanned,
          COUNT(*) * 9 * 16 AS estimated_bytes_processed
        FROM account_daily_balances b
        INNER JOIN accounts a ON b.account_id = a.account_id
        LEFT JOIN branches br ON a.branch_id = br.branch_id
        INNER JOIN account_owners o ON b.account_id = o.account_id
      )
      SELECT scenario, rows_scanned, estimated_bytes_processed
      FROM safe_serving_costed
      UNION ALL
      SELECT scenario, rows_scanned, estimated_bytes_processed
      FROM raw_join_costed
      ORDER BY rows_scanned;
    `);
    const costRows = costBudget.toArray().map((row) => row.toJSON());
    assert.equal(costRows.length, 2);
    assert.equal(readNumberField(costRows[0] ?? {}, "rows_scanned"), 6);
    assert.equal(
      readNumberField(costRows[0] ?? {}, "estimated_bytes_processed"),
      480,
    );
    assert.equal(readNumberField(costRows[1] ?? {}, "rows_scanned"), 27);
    assert.equal(
      readNumberField(costRows[1] ?? {}, "estimated_bytes_processed"),
      3888,
    );

    // Tutorial 07 minimisation: DESCRIBE-based real check against the
    // learner's actual query projection.
    const leakyDescribe = await connection.query(`
      WITH leaky_candidate AS (
        SELECT
          b.business_date,
          b.currency_code,
          a.account_id,
          a.synthetic_iban,
          o.customer_id,
          SUM(b.ledger_balance) AS ledger_total
        FROM account_daily_balances b
        INNER JOIN accounts a ON b.account_id = a.account_id
        INNER JOIN account_owners o ON b.account_id = o.account_id
        WHERE b.business_date = DATE '2026-03-31'
        GROUP BY
          b.business_date, b.currency_code, a.account_id, a.synthetic_iban, o.customer_id
      )
      SELECT
        COUNT(*) AS leaky_column_count,
        SUM(CASE WHEN column_name IN ('account_id', 'customer_id', 'synthetic_iban', 'masked_account_number') THEN 1 ELSE 0 END) AS sensitive_columns_in_output
      FROM (DESCRIBE SELECT * FROM leaky_candidate);
    `);
    const leakyRow = leakyDescribe.toArray()[0]?.toJSON() ?? {};
    assert.equal(readNumberField(leakyRow, "leaky_column_count"), 6);
    assert.equal(readNumberField(leakyRow, "sensitive_columns_in_output"), 3);

    const governedDescribe = await connection.query(`
      WITH governed_candidate AS (
        SELECT
          b.business_date,
          b.currency_code,
          COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
          SUM(b.ledger_balance) AS ledger_total,
          COUNT(DISTINCT b.account_id) AS account_count,
          MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
        FROM account_daily_balances b
        INNER JOIN accounts a ON b.account_id = a.account_id
        LEFT JOIN branches br ON a.branch_id = br.branch_id
        WHERE b.business_date = DATE '2026-03-31'
        GROUP BY b.business_date, b.currency_code, COALESCE(br.city, 'UNMAPPED_BRANCH')
      )
      SELECT
        COUNT(*) AS governed_column_count,
        SUM(CASE WHEN column_name IN ('account_id', 'customer_id', 'synthetic_iban', 'masked_account_number') THEN 1 ELSE 0 END) AS sensitive_columns_in_output
      FROM (DESCRIBE SELECT * FROM governed_candidate);
    `);
    const governedRow = governedDescribe.toArray()[0]?.toJSON() ?? {};
    assert.equal(readNumberField(governedRow, "governed_column_count"), 6);
    assert.equal(
      readNumberField(governedRow, "sensitive_columns_in_output"),
      0,
    );

    // Tutorial 08 reconciliation break: source vs broken queries against
    // real data.
    const reconciliation = await connection.query(`
      WITH source_total AS (
        SELECT SUM(ledger_balance) AS source_ledger_total
        FROM account_daily_balances
        WHERE business_date = DATE '2026-03-31'
      ),
      broken_dashboard AS (
        SELECT SUM(ledger_balance) AS dashboard_ledger_total
        FROM account_daily_balances
      ),
      fanout_dashboard AS (
        SELECT SUM(b.ledger_balance) AS dashboard_ledger_total
        FROM account_daily_balances b
        INNER JOIN account_owners o ON b.account_id = o.account_id
        WHERE b.business_date = DATE '2026-03-31'
      )
      SELECT
        'all-dates sum' AS broken_query_shape,
        bd.dashboard_ledger_total - s.source_ledger_total AS reconciliation_delta
      FROM source_total s CROSS JOIN broken_dashboard bd
      UNION ALL
      SELECT
        'owner-join fanout',
        fd.dashboard_ledger_total - s.source_ledger_total AS reconciliation_delta
      FROM source_total s CROSS JOIN fanout_dashboard fd
      ORDER BY broken_query_shape;
    `);
    const reconciliationRows = reconciliation
      .toArray()
      .map((row) => row.toJSON());
    assert.equal(
      readNumberField(reconciliationRows[0] ?? {}, "reconciliation_delta"),
      190870,
    );
    assert.equal(
      readNumberField(reconciliationRows[1] ?? {}, "reconciliation_delta"),
      69100,
    );
  } finally {
    await Promise.resolve(connection.close());
    const terminate = (database as { readonly terminate?: () => unknown })
      .terminate;

    if (typeof terminate === "function") {
      await Promise.resolve(terminate());
    }
  }
}

await main();
