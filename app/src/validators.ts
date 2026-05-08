import type { ChallengeCheck, ChallengeManifest } from "./challengeTypes";

export type SqlValidationResult = {
  readonly columns: readonly string[];
  readonly rows: ReadonlyArray<Record<string, unknown>>;
};

export type ValidationStatus = "pass" | "fail" | "unsupported";

export type ValidationCheckResult = {
  readonly checkId: string;
  readonly type: string;
  readonly description: string;
  readonly severity: "required" | "advisory";
  readonly status: ValidationStatus;
  readonly message: string;
};

export type ValidationEvaluation = {
  readonly checks: readonly ValidationCheckResult[];
  readonly requiredPassed: boolean;
  readonly passedRequiredCheckIds: readonly string[];
};

type RowCountExpectation = {
  readonly operator: "equals" | "at-least" | "at-most";
  readonly value: number;
};

type AggregateExpectation = {
  readonly column: string;
  readonly value: number;
  readonly tolerance: number;
};

const sqlResultCheckTypes: ReadonlySet<string> = new Set([
  "required-column",
  "forbidden-column",
  "row-count",
  "unique-key",
  "aggregate-total",
  "scalar-aggregate",
  "sensitive-field-exclusion",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeColumnName(column: string): string {
  return column.trim().toLowerCase();
}

function getSeverity(check: ChallengeCheck): "required" | "advisory" {
  return check.severity ?? "required";
}

function makeResult(
  check: ChallengeCheck,
  status: ValidationStatus,
  message: string,
): ValidationCheckResult {
  return {
    checkId: check.id,
    type: check.type,
    description: check.description,
    severity: getSeverity(check),
    status,
    message,
  };
}

function parseStringList(value: unknown): readonly string[] | undefined {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value;
  }

  return undefined;
}

function parseRowCountExpectation(
  value: unknown,
): RowCountExpectation | undefined {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
    return { operator: "equals", value };
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const operator = value["operator"];
  const expectedValue = value["value"];

  if (
    (operator === "equals" ||
      operator === "at-least" ||
      operator === "at-most") &&
    typeof expectedValue === "number" &&
    Number.isInteger(expectedValue) &&
    expectedValue >= 0
  ) {
    return { operator, value: expectedValue };
  }

  return undefined;
}

function parseAggregateExpectation(
  value: unknown,
): AggregateExpectation | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const column = value["column"];
  const expectedValue = value["value"];
  const tolerance = value["tolerance"];

  if (typeof column !== "string" || typeof expectedValue !== "number") {
    return undefined;
  }

  if (tolerance !== undefined && typeof tolerance !== "number") {
    return undefined;
  }

  return {
    column,
    value: expectedValue,
    tolerance: tolerance ?? 0,
  };
}

function getResultColumns(result: SqlValidationResult): ReadonlySet<string> {
  return new Set(result.columns.map((column) => normalizeColumnName(column)));
}

function getSensitiveFields(
  challenge: ChallengeManifest,
  check: ChallengeCheck,
): readonly string[] {
  const expectedFields = parseStringList(check.expected) ?? [];
  const inputFields = challenge.inputs.flatMap(
    (input) => input.sensitive_fields ?? [],
  );

  return [...new Set([...inputFields, ...expectedFields])];
}

function hasRowCountPassed(
  actual: number,
  expected: RowCountExpectation,
): boolean {
  switch (expected.operator) {
    case "equals":
      return actual === expected.value;
    case "at-least":
      return actual >= expected.value;
    case "at-most":
      return actual <= expected.value;
  }
}

function formatRowCountExpectation(expected: RowCountExpectation): string {
  switch (expected.operator) {
    case "equals":
      return `exactly ${expected.value}`;
    case "at-least":
      return `at least ${expected.value}`;
    case "at-most":
      return `at most ${expected.value}`;
  }
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

function evaluateRequiredColumns(
  check: ChallengeCheck,
  result: SqlValidationResult,
): ValidationCheckResult {
  const expectedColumns = parseStringList(check.expected);

  if (expectedColumns === undefined) {
    return makeResult(
      check,
      "fail",
      "Required-column check expected must be a string or string array.",
    );
  }

  const resultColumns = getResultColumns(result);
  const missingColumns = expectedColumns.filter(
    (column) => !resultColumns.has(normalizeColumnName(column)),
  );

  return missingColumns.length === 0
    ? makeResult(
        check,
        "pass",
        `Found required columns: ${expectedColumns.join(", ")}.`,
      )
    : makeResult(
        check,
        "fail",
        `Missing required columns: ${missingColumns.join(", ")}.`,
      );
}

function evaluateForbiddenColumns(
  check: ChallengeCheck,
  result: SqlValidationResult,
  fieldsOverride?: readonly string[],
): ValidationCheckResult {
  const expectedColumns = fieldsOverride ?? parseStringList(check.expected);

  if (expectedColumns === undefined) {
    return makeResult(
      check,
      "fail",
      "Forbidden-column check expected must be a string or string array.",
    );
  }

  const resultColumns = getResultColumns(result);
  const presentColumns = expectedColumns.filter((column) =>
    resultColumns.has(normalizeColumnName(column)),
  );

  return presentColumns.length === 0
    ? makeResult(
        check,
        "pass",
        `Did not expose forbidden columns: ${expectedColumns.join(", ")}.`,
      )
    : makeResult(
        check,
        "fail",
        `Result exposes forbidden columns: ${presentColumns.join(", ")}.`,
      );
}

function evaluateRowCount(
  check: ChallengeCheck,
  result: SqlValidationResult,
): ValidationCheckResult {
  const expectation = parseRowCountExpectation(check.expected);

  if (expectation === undefined) {
    return makeResult(
      check,
      "fail",
      "Row-count check expected must be a non-negative integer or an operator/value object.",
    );
  }

  return hasRowCountPassed(result.rows.length, expectation)
    ? makeResult(check, "pass", `Row count is ${result.rows.length}.`)
    : makeResult(
        check,
        "fail",
        `Expected ${formatRowCountExpectation(expectation)} rows, got ${result.rows.length}.`,
      );
}

function evaluateUniqueKey(
  check: ChallengeCheck,
  result: SqlValidationResult,
): ValidationCheckResult {
  const keyColumns = parseStringList(check.expected);

  if (keyColumns === undefined || keyColumns.length === 0) {
    return makeResult(
      check,
      "fail",
      "Unique-key check expected must be a string or string array.",
    );
  }

  const resultColumns = getResultColumns(result);
  const missingColumns = keyColumns.filter(
    (column) => !resultColumns.has(normalizeColumnName(column)),
  );

  if (missingColumns.length > 0) {
    return makeResult(
      check,
      "fail",
      `Unique-key columns are missing: ${missingColumns.join(", ")}.`,
    );
  }

  const seenKeys = new Set<string>();

  for (const row of result.rows) {
    const keyParts = keyColumns.map((column) => {
      const normalizedColumn = normalizeColumnName(column);
      const matchingKey = Object.keys(row).find(
        (key) => normalizeColumnName(key) === normalizedColumn,
      );
      return matchingKey === undefined ? "" : String(row[matchingKey]);
    });
    const key = JSON.stringify(keyParts);

    if (seenKeys.has(key)) {
      return makeResult(
        check,
        "fail",
        `Duplicate key found for ${keyColumns.join(", ")}.`,
      );
    }

    seenKeys.add(key);
  }

  return makeResult(
    check,
    "pass",
    `Rows are unique by ${keyColumns.join(", ")}.`,
  );
}

function evaluateScalarAggregate(
  check: ChallengeCheck,
  result: SqlValidationResult,
): ValidationCheckResult {
  const expectation = parseAggregateExpectation(check.expected);

  if (expectation === undefined) {
    return makeResult(
      check,
      "fail",
      "Scalar aggregate check expected must include column, value, and optional tolerance.",
    );
  }

  if (result.rows.length !== 1) {
    return makeResult(
      check,
      "fail",
      `Expected one aggregate row, got ${result.rows.length}.`,
    );
  }

  const row = result.rows[0];

  if (row === undefined) {
    return makeResult(check, "fail", "Expected one aggregate row, got none.");
  }

  const actualValue = getNumericCell(row, expectation.column);

  if (actualValue === undefined) {
    return makeResult(
      check,
      "fail",
      `Aggregate column ${expectation.column} is missing or not numeric.`,
    );
  }

  const delta = Math.abs(actualValue - expectation.value);

  return delta <= expectation.tolerance
    ? makeResult(
        check,
        "pass",
        `${expectation.column} matched expected value ${expectation.value}.`,
      )
    : makeResult(
        check,
        "fail",
        `Expected ${expectation.column} to be ${expectation.value}, got ${actualValue}.`,
      );
}

export function isSqlResultCheckSupported(check: ChallengeCheck): boolean {
  return sqlResultCheckTypes.has(check.type);
}

export function evaluateSqlResultCheck(
  challenge: ChallengeManifest,
  check: ChallengeCheck,
  result: SqlValidationResult,
): ValidationCheckResult {
  switch (check.type) {
    case "required-column":
      return evaluateRequiredColumns(check, result);
    case "forbidden-column":
      return evaluateForbiddenColumns(check, result);
    case "row-count":
      return evaluateRowCount(check, result);
    case "unique-key":
      return evaluateUniqueKey(check, result);
    case "aggregate-total":
    case "scalar-aggregate":
      return evaluateScalarAggregate(check, result);
    case "sensitive-field-exclusion":
      return evaluateForbiddenColumns(
        check,
        result,
        getSensitiveFields(challenge, check),
      );
    default:
      return makeResult(
        check,
        "unsupported",
        `Unsupported browser SQL validator: ${check.type}.`,
      );
  }
}

export function evaluateSqlResultChecks(
  challenge: ChallengeManifest,
  result: SqlValidationResult,
): ValidationEvaluation {
  const checks = challenge.checks
    .filter((check) => check.type !== "quiz-answer")
    .map((check) => evaluateSqlResultCheck(challenge, check, result));
  const requiredChecks = checks.filter(
    (check) => check.severity === "required",
  );

  return {
    checks,
    requiredPassed:
      requiredChecks.length > 0 &&
      requiredChecks.every((check) => check.status === "pass"),
    passedRequiredCheckIds: requiredChecks
      .filter((check) => check.status === "pass")
      .map((check) => check.checkId),
  };
}
