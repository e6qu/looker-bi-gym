import * as duckdb from '@duckdb/duckdb-wasm';
import duckdbEhWasmUrl from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import duckdbEhWorkerUrl from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';
import duckdbMvpWasmUrl from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdbMvpWorkerUrl from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import { seedDataset } from './seedDataset';

type ArrowFieldLike = {
  readonly name: string;
};

type ArrowSchemaLike = {
  readonly fields: readonly ArrowFieldLike[];
};

type ArrowRowLike = {
  readonly toJSON: () => Record<string, unknown>;
};

type ArrowTableLike = {
  readonly schema: ArrowSchemaLike;
  readonly toArray: () => readonly ArrowRowLike[];
};

export type SqlTableSchema = {
  readonly tableName: string;
  readonly fileName: string;
  readonly rowCount: number;
  readonly columns: readonly string[];
};

export type SqlQueryResult = {
  readonly columns: readonly string[];
  readonly rows: ReadonlyArray<Record<string, unknown>>;
  readonly rowCount: number;
  readonly truncated: boolean;
};

type DuckDbConnectionLike = {
  readonly query: <T = ArrowTableLike>(sql: string) => Promise<T>;
  readonly close: () => Promise<void>;
};

type DuckDbLike = {
  readonly registerFileText: (path: string, text: string) => Promise<void>;
  readonly connect: () => Promise<DuckDbConnectionLike>;
  readonly terminate?: () => Promise<void>;
};

type DuckDbAsyncLike = DuckDbLike & {
  readonly instantiate: (mainModule: string, pthreadWorker?: string) => Promise<void>;
};

export type SqlRuntime = {
  readonly connection: DuckDbConnectionLike;
  readonly tables: readonly SqlTableSchema[];
  readonly close: () => Promise<void>;
};

const sqlResultLimit = 100;
const sqlPreviewLimit = sqlResultLimit + 1;

const manualBundles: duckdb.DuckDBBundles = {
  eh: {
    mainModule: duckdbEhWasmUrl,
    mainWorker: duckdbEhWorkerUrl,
  },
  mvp: {
    mainModule: duckdbMvpWasmUrl,
    mainWorker: duckdbMvpWorkerUrl,
  },
};

let runtimePromise: Promise<SqlRuntime> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getRecordString(value: Record<string, unknown>, key: string): string {
  const fieldValue = value[key];

  if (typeof fieldValue === 'string') {
    return fieldValue;
  }

  if (
    typeof fieldValue === 'number' ||
    typeof fieldValue === 'bigint' ||
    typeof fieldValue === 'boolean'
  ) {
    return String(fieldValue);
  }

  if (fieldValue === null || fieldValue === undefined || typeof fieldValue === 'object') {
    return '';
  }

  return '';
}

function getRecordNumber(value: Record<string, unknown>, key: string): number {
  const fieldValue = value[key];

  if (typeof fieldValue === 'number') {
    return fieldValue;
  }

  if (typeof fieldValue === 'bigint') {
    return Number(fieldValue);
  }

  const coercedValue = Number(fieldValue);
  return Number.isFinite(coercedValue) ? coercedValue : 0;
}

function normalizeSql(sql: string): string {
  return sql.trim().replace(/;+\s*$/, '');
}

function buildPreviewQuery(sql: string): string {
  return `SELECT * FROM (${normalizeSql(sql)}) AS query_preview LIMIT ${sqlPreviewLimit}`;
}

async function createDuckDb(): Promise<DuckDbLike> {
  const bundle = await duckdb.selectBundle(manualBundles);
  const worker = new Worker(bundle.mainWorker ?? duckdbEhWorkerUrl);
  const logger = new duckdb.ConsoleLogger();
  const database = new duckdb.AsyncDuckDB(logger, worker) as unknown as DuckDbAsyncLike;
  await database.instantiate(bundle.mainModule, bundle.pthreadWorker ?? undefined);
  return database;
}

async function loadSeedTables(
  database: DuckDbLike,
  connection: DuckDbConnectionLike,
): Promise<readonly SqlTableSchema[]> {
  const tableSchemas: SqlTableSchema[] = [];

  try {
    for (const table of seedDataset.tables) {
      const registeredPath = `seed/${table.fileName}`;
      await database.registerFileText(registeredPath, table.csv);
      await connection.query(
        `CREATE OR REPLACE TABLE "${table.tableName}" AS SELECT * FROM read_csv_auto('${registeredPath}', header=true);`,
      );

      const schemaResult = await connection.query(`PRAGMA table_info('${table.tableName}');`);
      const columns = schemaResult.toArray().map((row) => getRecordString(row.toJSON(), 'name'));

      const countResult = await connection.query(
        `SELECT count(*) AS row_count FROM "${table.tableName}";`,
      );
      const countRows = countResult.toArray();
      const firstRow = countRows[0]?.toJSON();
      const rowCount = isRecord(firstRow) ? getRecordNumber(firstRow, 'row_count') : 0;

      tableSchemas.push({
        tableName: table.tableName,
        fileName: table.fileName,
        rowCount,
        columns,
      });
    }
  } catch (error: unknown) {
    await connection.close().catch(() => undefined);
    await Promise.resolve(database.terminate?.());
    throw error;
  }

  return tableSchemas;
}

async function initializeSqlRuntime(): Promise<SqlRuntime> {
  const database = await createDuckDb();
  const connection = await database.connect();
  const tables = await loadSeedTables(database, connection);

  return {
    connection,
    tables,
    close: async () => {
      await connection.close().catch(() => undefined);
      await Promise.resolve(database.terminate?.());
    },
  };
}

export async function getSqlRuntime(): Promise<SqlRuntime> {
  runtimePromise ??= initializeSqlRuntime();

  return runtimePromise;
}

export async function runSqlPreview(
  connection: DuckDbConnectionLike,
  sql: string,
): Promise<SqlQueryResult> {
  const previewQuery = buildPreviewQuery(sql);
  const result = await connection.query(previewQuery);
  const rows = result.toArray().map((row) => row.toJSON());
  const columns = result.schema.fields.map((field) => field.name);
  const truncated = rows.length > sqlResultLimit;
  const visibleRows = truncated ? rows.slice(0, sqlResultLimit) : rows;

  return {
    columns,
    rows: visibleRows,
    rowCount: rows.length,
    truncated,
  };
}

export function isSqlPreviewSupported(sql: string): boolean {
  const normalized = normalizeSql(sql).toLowerCase();
  return normalized.startsWith('select') || normalized.startsWith('with');
}
