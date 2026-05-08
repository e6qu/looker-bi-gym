import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type DatasetTableMetadata = {
  readonly id: string;
  readonly file: string;
  readonly grain: string;
  readonly row_count: number;
  readonly primary_key: readonly string[];
  readonly sensitive_fields: readonly string[];
  readonly date_semantics: readonly string[];
};

type DatasetRelationship = {
  readonly from_table: string;
  readonly from_field: string;
  readonly to_table: string;
  readonly to_field: string;
  readonly expected_missing_count: number;
  readonly intentional_issue?: string;
};

type ControlTotal = {
  readonly business_date: string;
  readonly currency_code: string;
  readonly ledger_total: number;
};

type KnownIssue = {
  readonly id: string;
  readonly description: string;
  readonly expected_count: number;
};

type FanoutNegativeTest = {
  readonly business_date: string;
  readonly base_total: number;
  readonly naive_owner_join_total: number;
  readonly expected_delta: number;
};

type DatasetVersioningMetadata = {
  readonly status: "released" | "simulation" | "draft";
  readonly immutable_after_release: boolean;
  readonly supersedes_version?: string;
  readonly output_changes?: readonly string[];
  readonly affected_challenge_fixtures?: ReadonlyArray<{
    readonly challenge_id: string;
    readonly reason: string;
  }>;
};

type DatasetMetadata = {
  readonly dataset_id: string;
  readonly version: string;
  readonly description: string;
  readonly synthetic_only: boolean;
  readonly regulatory_context: readonly string[];
  readonly tables: readonly DatasetTableMetadata[];
  readonly relationships: readonly DatasetRelationship[];
  readonly control_totals: readonly ControlTotal[];
  readonly known_issues: readonly KnownIssue[];
  readonly fanout_negative_test: FanoutNegativeTest;
  readonly versioning?: DatasetVersioningMetadata;
};

type DatasetVersion = {
  readonly datasetId: string;
  readonly version: string;
  readonly root: string;
  readonly metadataPath: string;
  readonly metadata: DatasetMetadata;
};

type CsvTable = {
  readonly header: readonly string[];
  readonly rows: ReadonlyArray<Readonly<Record<string, string>>>;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const datasetsRoot = join(repoRoot, "datasets");

function parseCsv(source: string): CsvTable {
  const lines = source.trim().split(/\r?\n/);
  const header = lines[0]?.split(",") ?? [];

  if (header.length === 0) {
    throw new Error("CSV header is empty.");
  }

  const rows = lines.slice(1).map((line, rowIndex) => {
    const values = line.split(",");

    if (values.length !== header.length) {
      throw new Error(
        `CSV row ${rowIndex + 2} has ${values.length} fields, expected ${header.length}.`,
      );
    }

    return Object.fromEntries(
      header.map((field, index) => [field, values[index] ?? ""]),
    );
  });

  return { header, rows };
}

function requireField(
  row: Readonly<Record<string, string>>,
  field: string,
): string {
  const value = row[field];

  if (value === undefined) {
    throw new Error(`Missing CSV field ${field}.`);
  }

  return value;
}

function requireNumber(
  row: Readonly<Record<string, string>>,
  field: string,
): number {
  const value = Number(requireField(row, field));

  if (!Number.isFinite(value)) {
    throw new Error(`Field ${field} is not numeric.`);
  }

  return value;
}

function assertRequiredColumns(
  tableId: string,
  table: CsvTable,
  columns: readonly string[],
): void {
  const header = new Set(table.header);
  const missingColumns = columns.filter((column) => !header.has(column));

  if (missingColumns.length > 0) {
    throw new Error(
      `${tableId} is missing required columns: ${missingColumns.join(", ")}`,
    );
  }
}

function assertUniquePrimaryKey(
  tableId: string,
  table: CsvTable,
  primaryKey: readonly string[],
): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const row of table.rows) {
    const key = primaryKey.map((field) => requireField(row, field)).join("|");

    if (seen.has(key)) {
      duplicates.add(key);
    }

    seen.add(key);
  }

  if (duplicates.size > 0) {
    throw new Error(
      `${tableId} has duplicate primary keys: ${Array.from(duplicates).join(", ")}`,
    );
  }
}

function assertRowCount(
  tableId: string,
  table: CsvTable,
  expectedRowCount: number,
): void {
  if (table.rows.length !== expectedRowCount) {
    throw new Error(
      `${tableId} has ${table.rows.length} rows, expected ${expectedRowCount}.`,
    );
  }
}

function assertRelationship(
  relationship: DatasetRelationship,
  tables: ReadonlyMap<string, CsvTable>,
): void {
  const fromTable = tables.get(relationship.from_table);
  const toTable = tables.get(relationship.to_table);

  if (fromTable === undefined || toTable === undefined) {
    throw new Error(
      `Relationship references missing table: ${relationship.from_table} -> ${relationship.to_table}.`,
    );
  }

  const allowedValues = new Set(
    toTable.rows.map((row) => requireField(row, relationship.to_field)),
  );
  const missingCount = fromTable.rows.filter(
    (row) => !allowedValues.has(requireField(row, relationship.from_field)),
  ).length;

  if (missingCount !== relationship.expected_missing_count) {
    throw new Error(
      `${relationship.from_table}.${relationship.from_field} has ${missingCount} missing mappings, expected ${relationship.expected_missing_count}.`,
    );
  }
}

function assertControlTotals(
  tables: ReadonlyMap<string, CsvTable>,
  controlTotals: readonly ControlTotal[],
): void {
  const balances = tables.get("raw_deposits.account_daily_balances");

  if (balances === undefined) {
    throw new Error("Missing raw_deposits.account_daily_balances.");
  }

  const actualTotals = new Map<string, number>();

  for (const row of balances.rows) {
    const key = `${requireField(row, "business_date")}|${requireField(row, "currency_code")}`;
    const current = actualTotals.get(key) ?? 0;
    actualTotals.set(key, current + requireNumber(row, "ledger_balance"));
  }

  for (const expected of controlTotals) {
    const key = `${expected.business_date}|${expected.currency_code}`;
    const actual = actualTotals.get(key);

    if (actual !== expected.ledger_total) {
      throw new Error(
        `${key} ledger total is ${actual ?? "missing"}, expected ${expected.ledger_total}.`,
      );
    }
  }
}

function assertKnownIssues(
  tables: ReadonlyMap<string, CsvTable>,
  knownIssues: readonly KnownIssue[],
): void {
  const accounts = tables.get("raw_deposits.accounts");
  const branches = tables.get("raw_ref.branches");
  const owners = tables.get("raw_deposits.account_owners");

  if (
    accounts === undefined ||
    branches === undefined ||
    owners === undefined
  ) {
    throw new Error("Missing required tables for known issue validation.");
  }

  const issueCounts = new Map<string, number>();
  const branchIds = new Set(
    branches.rows.map((row) => requireField(row, "branch_id")),
  );
  const missingBranchCount = accounts.rows.filter(
    (row) => !branchIds.has(requireField(row, "branch_id")),
  ).length;
  issueCounts.set("missing_branch_mapping", missingBranchCount);

  const ownerSharesByAccount = new Map<string, number>();
  for (const row of owners.rows) {
    const accountId = requireField(row, "account_id");
    ownerSharesByAccount.set(
      accountId,
      (ownerSharesByAccount.get(accountId) ?? 0) +
        requireNumber(row, "ownership_share_pct"),
    );
  }
  const overAllocatedCount = Array.from(ownerSharesByAccount.values()).filter(
    (share) => share > 100,
  ).length;
  issueCounts.set("ownership_share_over_100", overAllocatedCount);

  for (const issue of knownIssues) {
    const actual = issueCounts.get(issue.id);

    if (actual !== issue.expected_count) {
      throw new Error(
        `${issue.id} count is ${actual ?? "missing"}, expected ${issue.expected_count}.`,
      );
    }
  }
}

function assertFanoutNegativeTest(
  tables: ReadonlyMap<string, CsvTable>,
  expected: FanoutNegativeTest,
): void {
  const balances = tables.get("raw_deposits.account_daily_balances");
  const owners = tables.get("raw_deposits.account_owners");

  if (balances === undefined || owners === undefined) {
    throw new Error("Missing required tables for fanout validation.");
  }

  const ownerCountsByAccount = new Map<string, number>();
  for (const owner of owners.rows) {
    const accountId = requireField(owner, "account_id");
    ownerCountsByAccount.set(
      accountId,
      (ownerCountsByAccount.get(accountId) ?? 0) + 1,
    );
  }

  let baseTotal = 0;
  let naiveOwnerJoinTotal = 0;

  for (const balance of balances.rows) {
    if (requireField(balance, "business_date") === expected.business_date) {
      const accountId = requireField(balance, "account_id");
      const ledgerBalance = requireNumber(balance, "ledger_balance");
      const ownerCount = ownerCountsByAccount.get(accountId) ?? 0;
      baseTotal += ledgerBalance;
      naiveOwnerJoinTotal += ledgerBalance * ownerCount;
    }
  }

  const delta = naiveOwnerJoinTotal - baseTotal;

  if (
    baseTotal !== expected.base_total ||
    naiveOwnerJoinTotal !== expected.naive_owner_join_total ||
    delta !== expected.expected_delta ||
    delta <= 0
  ) {
    throw new Error(
      `Fanout negative test failed: base=${baseTotal}, naive=${naiveOwnerJoinTotal}, delta=${delta}.`,
    );
  }
}

async function readDatasetTables(
  datasetRoot: string,
  metadata: DatasetMetadata,
): Promise<Map<string, CsvTable>> {
  const tables = new Map<string, CsvTable>();

  for (const tableMetadata of metadata.tables) {
    const csvSource = await readFile(
      join(datasetRoot, tableMetadata.file),
      "utf8",
    );
    const table = parseCsv(csvSource);
    assertRequiredColumns(tableMetadata.id, table, tableMetadata.primary_key);
    assertRequiredColumns(
      tableMetadata.id,
      table,
      tableMetadata.sensitive_fields,
    );
    assertRowCount(tableMetadata.id, table, tableMetadata.row_count);
    assertUniquePrimaryKey(tableMetadata.id, table, tableMetadata.primary_key);
    tables.set(tableMetadata.id, table);
  }

  return tables;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

function assertDatasetMetadataShape(version: DatasetVersion): void {
  const { datasetId, metadata } = version;

  if (
    metadata.dataset_id !== datasetId ||
    metadata.version !== version.version
  ) {
    throw new Error(
      `${version.metadataPath} metadata identity mismatch: expected ${datasetId} ${version.version}, got ${metadata.dataset_id} ${metadata.version}.`,
    );
  }

  if (!metadata.synthetic_only) {
    throw new Error(
      `${metadata.dataset_id} ${metadata.version} must be marked synthetic_only.`,
    );
  }

  if (!/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(metadata.version)) {
    throw new Error(
      `${metadata.dataset_id} ${metadata.version} must use vMAJOR.MINOR.PATCH format.`,
    );
  }

  if (metadata.regulatory_context.length === 0) {
    throw new Error(
      `${metadata.dataset_id} ${metadata.version} must declare regulatory context tags.`,
    );
  }

  if (metadata.tables.length === 0) {
    throw new Error(
      `${metadata.dataset_id} ${metadata.version} must declare at least one table.`,
    );
  }

  const tableIds = new Set<string>();

  for (const table of metadata.tables) {
    if (
      table.file.includes("/") ||
      table.file.includes("\\") ||
      table.file.length === 0
    ) {
      throw new Error(
        `${metadata.dataset_id} ${metadata.version} table ${table.id} has invalid file path ${table.file}.`,
      );
    }

    if (tableIds.has(table.id)) {
      throw new Error(
        `${metadata.dataset_id} ${metadata.version} has duplicate table metadata id ${table.id}.`,
      );
    }
    tableIds.add(table.id);

    if (table.grain.length === 0 || table.primary_key.length === 0) {
      throw new Error(
        `${metadata.dataset_id} ${metadata.version} table ${table.id} must declare grain and primary key.`,
      );
    }

    if (
      !Array.isArray(table.sensitive_fields) ||
      !Array.isArray(table.date_semantics)
    ) {
      throw new Error(
        `${metadata.dataset_id} ${metadata.version} table ${table.id} must declare sensitive_fields and date_semantics arrays.`,
      );
    }
  }
}

async function readDatasetVersion(
  datasetId: string,
  version: string,
): Promise<DatasetVersion> {
  const root = join(datasetsRoot, datasetId, version);
  const metadataPath = join(root, "metadata.json");
  const metadataSource = await readFile(metadataPath, "utf8");
  const metadata = JSON.parse(metadataSource) as DatasetMetadata;

  return { datasetId, version, root, metadataPath, metadata };
}

async function listDatasetVersions(): Promise<DatasetVersion[]> {
  const datasetEntries = await readdir(datasetsRoot, { withFileTypes: true });
  const versions: DatasetVersion[] = [];

  for (const datasetEntry of datasetEntries) {
    if (!datasetEntry.isDirectory()) {
      continue;
    }

    const datasetId = datasetEntry.name;
    const versionEntries = await readdir(join(datasetsRoot, datasetId), {
      withFileTypes: true,
    });

    for (const versionEntry of versionEntries) {
      if (!versionEntry.isDirectory()) {
        continue;
      }

      const metadataPath = join(
        datasetsRoot,
        datasetId,
        versionEntry.name,
        "metadata.json",
      );

      if (await pathExists(metadataPath)) {
        versions.push(await readDatasetVersion(datasetId, versionEntry.name));
      }
    }
  }

  return versions.sort((left, right) =>
    `${left.datasetId}/${left.version}`.localeCompare(
      `${right.datasetId}/${right.version}`,
    ),
  );
}

function assertVersioningMetadata(versions: readonly DatasetVersion[]): void {
  const versionKeys = new Set(
    versions.map((version) => `${version.datasetId}/${version.version}`),
  );

  for (const version of versions) {
    const versioning = version.metadata.versioning;

    if (versioning === undefined) {
      continue;
    }

    if (
      versioning.status === "released" &&
      !versioning.immutable_after_release
    ) {
      throw new Error(
        `${version.datasetId} ${version.version} is released but not marked immutable_after_release.`,
      );
    }

    if (versioning.supersedes_version !== undefined) {
      const predecessorKey = `${version.datasetId}/${versioning.supersedes_version}`;

      if (!versionKeys.has(predecessorKey)) {
        throw new Error(
          `${version.datasetId} ${version.version} supersedes missing ${versioning.supersedes_version}.`,
        );
      }

      if (versioning.supersedes_version === version.version) {
        throw new Error(
          `${version.datasetId} ${version.version} cannot supersede itself.`,
        );
      }
    }

    if (
      (versioning.output_changes?.length ?? 0) > 0 &&
      (versioning.affected_challenge_fixtures?.length ?? 0) === 0
    ) {
      throw new Error(
        `${version.datasetId} ${version.version} changes expected outputs but does not record affected challenge fixtures.`,
      );
    }
  }
}

async function validateDatasetVersion(version: DatasetVersion): Promise<void> {
  const { metadata } = version;
  assertDatasetMetadataShape(version);
  const tables = await readDatasetTables(version.root, metadata);

  for (const relationship of metadata.relationships) {
    assertRelationship(relationship, tables);
  }

  assertControlTotals(tables, metadata.control_totals);
  assertKnownIssues(tables, metadata.known_issues);
  assertFanoutNegativeTest(tables, metadata.fanout_negative_test);
}

async function main(): Promise<void> {
  const versions = await listDatasetVersions();

  if (versions.length === 0) {
    throw new Error("No dataset versions found.");
  }

  for (const version of versions) {
    await validateDatasetVersion(version);
  }

  assertVersioningMetadata(versions);
}

await main();
