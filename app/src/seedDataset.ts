const rawSeedCsvFiles = import.meta.glob<string>(
  '../../datasets/deposits-seed/v0.1.0/*.csv',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
);

export type SeedDatasetTableName =
  | 'branches'
  | 'products'
  | 'accounts'
  | 'account_owners'
  | 'account_daily_balances';

export type SeedDatasetTable = {
  readonly fileName:
    | 'account_daily_balances.csv'
    | 'account_owners.csv'
    | 'accounts.csv'
    | 'branches.csv'
    | 'products.csv';
  readonly tableName: SeedDatasetTableName;
  readonly csv: string;
};

export type SeedDataset = {
  readonly datasetId: 'deposits-seed';
  readonly version: 'v0.1.0';
  readonly tables: readonly SeedDatasetTable[];
};

const tableOrder: ReadonlyArray<SeedDatasetTable['fileName']> = [
  'branches.csv',
  'products.csv',
  'accounts.csv',
  'account_owners.csv',
  'account_daily_balances.csv',
];

const tableNameByFileName: Readonly<Record<SeedDatasetTable['fileName'], SeedDatasetTableName>> = {
  'branches.csv': 'branches',
  'products.csv': 'products',
  'accounts.csv': 'accounts',
  'account_owners.csv': 'account_owners',
  'account_daily_balances.csv': 'account_daily_balances',
};

function getSeedCsv(fileName: SeedDatasetTable['fileName']): string {
  const csvPath = Object.keys(rawSeedCsvFiles).find((candidate) => candidate.endsWith(`/${fileName}`));

  if (csvPath === undefined) {
    throw new Error(`Missing seed dataset CSV: ${fileName}`);
  }

  const csv = rawSeedCsvFiles[csvPath];

  if (typeof csv !== 'string') {
    throw new Error(`Seed dataset CSV did not load as text: ${fileName}`);
  }

  return csv;
}

export const seedDataset: SeedDataset = {
  datasetId: 'deposits-seed',
  version: 'v0.1.0',
  tables: tableOrder.map((fileName) => ({
    fileName,
    tableName: tableNameByFileName[fileName],
    csv: getSeedCsv(fileName),
  })),
};

export function getSeedDatasetTableNames(): readonly SeedDatasetTableName[] {
  return seedDataset.tables.map((table) => table.tableName);
}
