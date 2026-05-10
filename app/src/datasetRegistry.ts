const rawCsvFiles = import.meta.glob<string>("../../datasets/*/*/*.csv", {
  eager: true,
  import: "default",
  query: "?raw",
});

const rawMetadataFiles = import.meta.glob<string>(
  "../../datasets/*/*/metadata.json",
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);

export type RuntimeDatasetRef = {
  readonly datasetId: string;
  readonly version: string;
};

export type RuntimeDatasetTable = {
  readonly fileName: string;
  readonly tableName: string;
  readonly csv: string;
};

export type RuntimeDataset = RuntimeDatasetRef & {
  readonly tables: readonly RuntimeDatasetTable[];
};

type RuntimeDatasetTableMetadata = {
  readonly id: string;
  readonly file: string;
};

type RuntimeDatasetMetadata = RuntimeDatasetRef & {
  readonly tables: readonly RuntimeDatasetTableMetadata[];
};

export const defaultDatasetRef: RuntimeDatasetRef = {
  datasetId: "deposits-seed",
  version: "v0.1.0",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Dataset metadata field ${field} must be a non-empty string.`,
    );
  }

  return value;
}

function parseMetadataTable(
  value: unknown,
  index: number,
): RuntimeDatasetTableMetadata {
  if (!isRecord(value)) {
    throw new Error(`Dataset metadata tables[${index}] must be an object.`);
  }

  return {
    id: parseString(value["id"], `tables[${index}].id`),
    file: parseString(value["file"], `tables[${index}].file`),
  };
}

function parseMetadata(source: string): RuntimeDatasetMetadata {
  const parsed = JSON.parse(source) as unknown;

  if (!isRecord(parsed)) {
    throw new Error("Dataset metadata must be a JSON object.");
  }

  const tables = parsed["tables"];

  if (!Array.isArray(tables)) {
    throw new Error("Dataset metadata tables must be an array.");
  }

  return {
    datasetId: parseString(parsed["dataset_id"], "dataset_id"),
    version: parseString(parsed["version"], "version"),
    tables: tables.map(parseMetadataTable),
  };
}

function tableNameFromMetadataId(tableId: string): string {
  const tableName = tableId.split(".").at(-1);

  if (tableName === undefined || tableName.length === 0) {
    throw new Error(`Invalid dataset table id: ${tableId}.`);
  }

  return tableName;
}

function findRawFile(
  files: Readonly<Record<string, string>>,
  datasetRef: RuntimeDatasetRef,
  fileName: string,
): string {
  const suffix = `/datasets/${datasetRef.datasetId}/${datasetRef.version}/${fileName}`;
  const filePath = Object.keys(files).find((candidate) =>
    candidate.endsWith(suffix),
  );

  if (filePath === undefined) {
    throw new Error(
      `Missing dataset file ${datasetRef.datasetId}/${datasetRef.version}/${fileName}.`,
    );
  }

  const fileSource = files[filePath];

  if (typeof fileSource !== "string") {
    throw new Error(
      `Dataset file ${datasetRef.datasetId}/${datasetRef.version}/${fileName} did not load as text.`,
    );
  }

  return fileSource;
}

export function getRuntimeDataset(
  datasetRef: RuntimeDatasetRef,
): RuntimeDataset {
  const metadataSource = findRawFile(
    rawMetadataFiles,
    datasetRef,
    "metadata.json",
  );
  const metadata = parseMetadata(metadataSource);

  if (
    metadata.datasetId !== datasetRef.datasetId ||
    metadata.version !== datasetRef.version
  ) {
    throw new Error(
      `Dataset metadata identity mismatch for ${datasetRef.datasetId}/${datasetRef.version}.`,
    );
  }

  return {
    ...datasetRef,
    tables: metadata.tables.map((table) => ({
      fileName: table.file,
      tableName: tableNameFromMetadataId(table.id),
      csv: findRawFile(rawCsvFiles, datasetRef, table.file),
    })),
  };
}
