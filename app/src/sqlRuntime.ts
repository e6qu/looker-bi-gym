import * as duckdb from "@duckdb/duckdb-wasm";
import duckdbEhWasmUrl from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import duckdbEhWorkerUrl from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import duckdbMvpWasmUrl from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import duckdbMvpWorkerUrl from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import {
  defaultDatasetRef,
  getRuntimeDataset,
  type RuntimeDataset,
  type RuntimeDatasetRef,
} from "./datasetRegistry";

// Apache Arrow Type enum values we care about. DuckDB-WASM ships
// apache-arrow as a transitive dep, so the type IDs are stable.
// Reference:
// node_modules/.bun/apache-arrow@17.0.0/node_modules/apache-arrow/enum.d.ts
const ARROW_TYPE_INT = 2;
const ARROW_TYPE_FLOAT = 3;
const ARROW_TYPE_UTF8 = 5;
const ARROW_TYPE_BOOL = 6;
const ARROW_TYPE_DECIMAL = 7;
const ARROW_TYPE_DATE = 8;
const ARROW_TYPE_TIMESTAMP = 10;

export type SqlColumnType =
  | "date"
  | "timestamp"
  | "int"
  | "bigint"
  | "decimal"
  | "float"
  | "string"
  | "bool"
  | "other";

type ArrowTypeLike = {
  readonly typeId?: number;
  readonly bitWidth?: number;
  readonly unit?: number;
  readonly isSigned?: boolean;
  readonly scale?: number;
  readonly precision?: number;
};

type ArrowFieldLike = {
  readonly name: string;
  readonly type?: ArrowTypeLike;
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

export type SqlColumnMetadata = {
  readonly type: SqlColumnType;
  readonly scale?: number;
  readonly isSigned?: boolean;
};

export type SqlQueryResult = {
  readonly columns: readonly string[];
  readonly columnTypes: Readonly<Record<string, SqlColumnType>>;
  readonly columnMetadata: Readonly<Record<string, SqlColumnMetadata>>;
  readonly rows: ReadonlyArray<Record<string, unknown>>;
  readonly rowCount: number;
  readonly truncated: boolean;
};

function classifyArrowType(type: ArrowTypeLike | undefined): SqlColumnType {
  if (type === undefined || typeof type.typeId !== "number") {
    return "other";
  }

  switch (type.typeId) {
    case ARROW_TYPE_INT:
      // DuckDB SUM on an INTEGER column returns BIGINT, which Arrow JS
      // surfaces as a typed array even when the JS-safe range is fine.
      // Treat 64-bit ints as bigint so the formatter does the right
      // thing; 32-bit and smaller can pass through as plain int.
      return (type.bitWidth ?? 32) >= 64 ? "bigint" : "int";
    case ARROW_TYPE_FLOAT:
      return "float";
    case ARROW_TYPE_UTF8:
      return "string";
    case ARROW_TYPE_BOOL:
      return "bool";
    case ARROW_TYPE_DECIMAL:
      return "decimal";
    case ARROW_TYPE_DATE:
      return "date";
    case ARROW_TYPE_TIMESTAMP:
      return "timestamp";
    default:
      return "other";
  }
}

function deriveColumnTypes(
  schema: ArrowSchemaLike,
): Record<string, SqlColumnType> {
  const columnTypes: Record<string, SqlColumnType> = {};
  for (const field of schema.fields) {
    columnTypes[field.name] = classifyArrowType(field.type);
  }
  return columnTypes;
}

function deriveColumnMetadata(
  schema: ArrowSchemaLike,
): Record<string, SqlColumnMetadata> {
  const metadata: Record<string, SqlColumnMetadata> = {};
  for (const field of schema.fields) {
    const type = classifyArrowType(field.type);
    const entry: { type: SqlColumnType; scale?: number; isSigned?: boolean } = {
      type,
    };
    if (typeof field.type?.scale === "number") {
      entry.scale = field.type.scale;
    }
    if (typeof field.type?.isSigned === "boolean") {
      entry.isSigned = field.type.isSigned;
    }
    metadata[field.name] = entry;
  }
  return metadata;
}

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
  readonly instantiate: (
    mainModule: string,
    pthreadWorker?: string,
  ) => Promise<void>;
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

const runtimePromises = new Map<string, Promise<SqlRuntime>>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getRecordString(value: Record<string, unknown>, key: string): string {
  const fieldValue = value[key];

  if (typeof fieldValue === "string") {
    return fieldValue;
  }

  if (
    typeof fieldValue === "number" ||
    typeof fieldValue === "bigint" ||
    typeof fieldValue === "boolean"
  ) {
    return String(fieldValue);
  }

  if (
    fieldValue === null ||
    fieldValue === undefined ||
    typeof fieldValue === "object"
  ) {
    return "";
  }

  return "";
}

function getRecordNumber(value: Record<string, unknown>, key: string): number {
  const fieldValue = value[key];

  if (typeof fieldValue === "number") {
    return fieldValue;
  }

  if (typeof fieldValue === "bigint") {
    return Number(fieldValue);
  }

  const coercedValue = Number(fieldValue);
  return Number.isFinite(coercedValue) ? coercedValue : 0;
}

function normalizeSql(sql: string): string {
  return sql.trim().replace(/;+\s*$/, "");
}

function buildPreviewQuery(sql: string): string {
  return `SELECT * FROM (${normalizeSql(sql)}) AS query_preview LIMIT ${sqlPreviewLimit}`;
}

async function createDuckDb(): Promise<DuckDbLike> {
  const bundle = await duckdb.selectBundle(manualBundles);
  const worker = new Worker(bundle.mainWorker ?? duckdbEhWorkerUrl);
  const logger = new duckdb.ConsoleLogger();
  const database = new duckdb.AsyncDuckDB(
    logger,
    worker,
  ) as unknown as DuckDbAsyncLike;
  await database.instantiate(
    bundle.mainModule,
    bundle.pthreadWorker ?? undefined,
  );
  return database;
}

function datasetKey(datasetRef: RuntimeDatasetRef): string {
  return `${datasetRef.datasetId}/${datasetRef.version}`;
}

async function loadDatasetTables(
  database: DuckDbLike,
  connection: DuckDbConnectionLike,
  dataset: RuntimeDataset,
): Promise<readonly SqlTableSchema[]> {
  const tableSchemas: SqlTableSchema[] = [];

  try {
    for (const table of dataset.tables) {
      const registeredPath = `${dataset.datasetId}/${dataset.version}/${table.fileName}`;
      await database.registerFileText(registeredPath, table.csv);
      await connection.query(
        `CREATE OR REPLACE TABLE "${table.tableName}" AS SELECT * FROM read_csv_auto('${registeredPath}', header=true);`,
      );

      const schemaResult = await connection.query(
        `PRAGMA table_info('${table.tableName}');`,
      );
      const columns = schemaResult
        .toArray()
        .map((row) => getRecordString(row.toJSON(), "name"));

      const countResult = await connection.query(
        `SELECT count(*) AS row_count FROM "${table.tableName}";`,
      );
      const countRows = countResult.toArray();
      const firstRow = countRows[0]?.toJSON();
      const rowCount = isRecord(firstRow)
        ? getRecordNumber(firstRow, "row_count")
        : 0;

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

async function initializeSqlRuntime(
  datasetRef: RuntimeDatasetRef,
): Promise<SqlRuntime> {
  const dataset = getRuntimeDataset(datasetRef);
  const database = await createDuckDb();
  const connection = await database.connect();
  const tables = await loadDatasetTables(database, connection, dataset);

  return {
    connection,
    tables,
    close: async () => {
      await connection.close().catch(() => undefined);
      await Promise.resolve(database.terminate?.());
    },
  };
}

export async function getSqlRuntime(
  datasetRef: RuntimeDatasetRef = defaultDatasetRef,
): Promise<SqlRuntime> {
  const key = datasetKey(datasetRef);
  const existingRuntime = runtimePromises.get(key);

  if (existingRuntime !== undefined) {
    return existingRuntime;
  }

  const runtimePromise = initializeSqlRuntime(datasetRef);
  runtimePromises.set(key, runtimePromise);
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
  const columnTypes = deriveColumnTypes(result.schema);
  const columnMetadata = deriveColumnMetadata(result.schema);
  const truncated = rows.length > sqlResultLimit;
  const visibleRows = truncated ? rows.slice(0, sqlResultLimit) : rows;

  return {
    columns,
    columnTypes,
    columnMetadata,
    rows: visibleRows,
    rowCount: rows.length,
    truncated,
  };
}

export function isSqlPreviewSupported(sql: string): boolean {
  const normalized = normalizeSql(sql).toLowerCase();
  return normalized.startsWith("select") || normalized.startsWith("with");
}
