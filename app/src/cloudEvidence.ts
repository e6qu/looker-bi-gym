import type { ChallengeCheck, ChallengeManifest } from "./challengeTypes";
import type {
  SqlValidationResult,
  ValidationCheckResult,
  ValidationEvaluation,
} from "./validators";

export type CloudEvidenceValue = string | boolean;

export type CloudEvidenceAnswerState = Readonly<
  Record<string, CloudEvidenceValue>
>;

type ParseResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly message: string };

type NumericRangeExpectation = {
  readonly min?: number;
  readonly max?: number;
};

type ReportUrlExpectation = {
  readonly require_https?: boolean;
  readonly allowed_hosts?: readonly string[];
};

const cloudEvidenceCheckTypes: ReadonlySet<string> = new Set([
  "sql-text-contains",
  "tabular-required-columns",
  "numeric-range",
  "report-url-format",
  "checklist-confirmed",
  "evidence-format",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeColumnName(value: string): string {
  return value.trim().toLowerCase();
}

function getSeverity(check: ChallengeCheck): "required" | "advisory" {
  return check.severity ?? "required";
}

function makeResult(
  check: ChallengeCheck,
  status: ValidationCheckResult["status"],
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

function parseNumericRangeExpectation(
  value: unknown,
): NumericRangeExpectation | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const min = value["min"];
  const max = value["max"];

  if (min !== undefined && typeof min !== "number") {
    return undefined;
  }

  if (max !== undefined && typeof max !== "number") {
    return undefined;
  }

  if (min === undefined && max === undefined) {
    return undefined;
  }

  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
  };
}

function parseReportUrlExpectation(
  value: unknown,
): ReportUrlExpectation | undefined {
  if (value === undefined || value === null) {
    return {};
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const requireHttps = value["require_https"];
  const allowedHosts = value["allowed_hosts"];

  if (requireHttps !== undefined && typeof requireHttps !== "boolean") {
    return undefined;
  }

  if (
    allowedHosts !== undefined &&
    (!Array.isArray(allowedHosts) ||
      !allowedHosts.every((item) => typeof item === "string"))
  ) {
    return undefined;
  }

  return {
    ...(requireHttps !== undefined ? { require_https: requireHttps } : {}),
    ...(allowedHosts !== undefined ? { allowed_hosts: allowedHosts } : {}),
  };
}

function getEvidenceString(
  answers: CloudEvidenceAnswerState,
  evidenceId: string | undefined,
): string | undefined {
  if (evidenceId === undefined) {
    return undefined;
  }

  const value = answers[evidenceId];
  return typeof value === "string" ? value : undefined;
}

function getEvidenceBoolean(
  answers: CloudEvidenceAnswerState,
  evidenceId: string | undefined,
): boolean | undefined {
  if (evidenceId === undefined) {
    return undefined;
  }

  const value = answers[evidenceId];
  return typeof value === "boolean" ? value : undefined;
}

function parseCsvLine(line: string): ParseResult<readonly string[]> {
  const cells: string[] = [];
  let cell = "";
  let isQuoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index] ?? "";

    if (character === '"') {
      if (isQuoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        isQuoted = !isQuoted;
      }
    } else if (character === "," && !isQuoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }

  if (isQuoted) {
    return {
      ok: false,
      message: "CSV evidence has an unterminated quoted value.",
    };
  }

  cells.push(cell.trim());
  return { ok: true, value: cells };
}

function parseCsvEvidence(source: string): ParseResult<SqlValidationResult> {
  const lines = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    return {
      ok: false,
      message:
        "CSV evidence must include a header row and at least one data row.",
    };
  }

  const headerResult = parseCsvLine(lines[0] ?? "");

  if (!headerResult.ok) {
    return { ok: false, message: headerResult.message };
  }

  const columns = headerResult.value;

  if (columns.length === 0 || columns.some((column) => column.length === 0)) {
    return {
      ok: false,
      message: "CSV evidence must include non-empty column names.",
    };
  }

  const rows: Array<Record<string, unknown>> = [];

  for (const line of lines.slice(1)) {
    const rowResult = parseCsvLine(line);

    if (!rowResult.ok) {
      return { ok: false, message: rowResult.message };
    }

    if (rowResult.value.length !== columns.length) {
      return {
        ok: false,
        message:
          "CSV evidence rows must have the same number of cells as the header.",
      };
    }

    rows.push(
      Object.fromEntries(
        columns.map((column, index) => [column, rowResult.value[index] ?? ""]),
      ),
    );
  }

  return { ok: true, value: { columns, rows } };
}

function coerceJsonRows(
  value: unknown,
): ParseResult<ReadonlyArray<Record<string, unknown>>> {
  if (Array.isArray(value) && value.every((item) => isRecord(item))) {
    return { ok: true, value };
  }

  if (
    isRecord(value) &&
    Array.isArray(value["rows"]) &&
    value["rows"].every((item) => isRecord(item))
  ) {
    return { ok: true, value: value["rows"] };
  }

  return {
    ok: false,
    message:
      "JSON evidence must be an array of objects or an object with a rows array.",
  };
}

function parseJsonEvidence(source: string): ParseResult<SqlValidationResult> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(source) as unknown;
  } catch {
    return { ok: false, message: "JSON evidence could not be parsed." };
  }

  const rowsResult = coerceJsonRows(parsed);

  if (!rowsResult.ok) {
    return rowsResult;
  }

  if (rowsResult.value.length === 0) {
    return {
      ok: false,
      message: "JSON evidence must include at least one row.",
    };
  }

  const columns = Array.from(
    new Set(rowsResult.value.flatMap((row) => Object.keys(row))),
  );

  if (columns.length === 0) {
    return { ok: false, message: "JSON evidence rows must include columns." };
  }

  return { ok: true, value: { columns, rows: rowsResult.value } };
}

export function parsePastedTabularEvidence(
  source: string,
): ParseResult<SqlValidationResult> {
  const trimmed = source.trim();

  if (trimmed.length === 0) {
    return {
      ok: false,
      message: "Paste CSV or JSON evidence before running checks.",
    };
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return parseJsonEvidence(trimmed);
  }

  return parseCsvEvidence(trimmed);
}

function evaluateSqlTextContains(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceString(answers, check.target);
  const expectedTerms = parseStringList(check.expected);

  if (evidence === undefined || evidence.trim().length === 0) {
    return makeResult(check, "fail", "Paste SQL text before running checks.");
  }

  if (expectedTerms === undefined || expectedTerms.length === 0) {
    return makeResult(
      check,
      "fail",
      "SQL text check expected must be a string or string array.",
    );
  }

  const normalizedEvidence = normalizeText(evidence);
  const missingTerms = expectedTerms.filter(
    (term) => !normalizedEvidence.includes(normalizeText(term)),
  );

  return missingTerms.length === 0
    ? makeResult(
        check,
        "pass",
        `SQL text includes: ${expectedTerms.join(", ")}.`,
      )
    : makeResult(
        check,
        "fail",
        `SQL text is missing: ${missingTerms.join(", ")}.`,
      );
}

function evaluateTabularRequiredColumns(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceString(answers, check.target);
  const expectedColumns = parseStringList(check.expected);

  if (evidence === undefined) {
    return makeResult(
      check,
      "fail",
      "Paste CSV or JSON result evidence before running checks.",
    );
  }

  if (expectedColumns === undefined || expectedColumns.length === 0) {
    return makeResult(
      check,
      "fail",
      "Tabular evidence check expected must be a string or string array.",
    );
  }

  const parsed = parsePastedTabularEvidence(evidence);

  if (!parsed.ok) {
    return makeResult(check, "fail", parsed.message);
  }

  const parsedColumns = new Set(parsed.value.columns.map(normalizeColumnName));
  const missingColumns = expectedColumns.filter(
    (column) => !parsedColumns.has(normalizeColumnName(column)),
  );

  return missingColumns.length === 0
    ? makeResult(
        check,
        "pass",
        `Pasted evidence includes columns: ${expectedColumns.join(", ")}.`,
      )
    : makeResult(
        check,
        "fail",
        `Pasted evidence is missing columns: ${missingColumns.join(", ")}.`,
      );
}

function evaluateNumericRange(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceString(answers, check.target);
  const expectation = parseNumericRangeExpectation(check.expected);

  if (expectation === undefined) {
    return makeResult(
      check,
      "fail",
      "Numeric range check expected must include min or max.",
    );
  }

  if (evidence === undefined || evidence.trim().length === 0) {
    return makeResult(
      check,
      "fail",
      "Enter numeric evidence before running checks.",
    );
  }

  const actualValue = Number(evidence);

  if (!Number.isFinite(actualValue)) {
    return makeResult(
      check,
      "fail",
      "Numeric evidence must be a finite number.",
    );
  }

  if (expectation.min !== undefined && actualValue < expectation.min) {
    return makeResult(
      check,
      "fail",
      `Expected at least ${expectation.min}, got ${actualValue}.`,
    );
  }

  if (expectation.max !== undefined && actualValue > expectation.max) {
    return makeResult(
      check,
      "fail",
      `Expected at most ${expectation.max}, got ${actualValue}.`,
    );
  }

  return makeResult(
    check,
    "pass",
    `Numeric evidence ${actualValue} is in range.`,
  );
}

function evaluateReportUrlFormat(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceString(answers, check.target);
  const expectation = parseReportUrlExpectation(check.expected);

  if (expectation === undefined) {
    return makeResult(
      check,
      "fail",
      "Report URL check expected must be a URL rule object.",
    );
  }

  if (evidence === undefined || evidence.trim().length === 0) {
    return makeResult(
      check,
      "fail",
      "Enter a report URL before running checks.",
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(evidence);
  } catch {
    return makeResult(check, "fail", "Report URL is not a valid URL.");
  }

  if (expectation.require_https === true && parsedUrl.protocol !== "https:") {
    return makeResult(check, "fail", "Report URL must use HTTPS.");
  }

  const allowedHosts =
    expectation.allowed_hosts?.map((host) => host.toLowerCase()) ?? [];

  if (
    allowedHosts.length > 0 &&
    !allowedHosts.includes(parsedUrl.hostname.toLowerCase())
  ) {
    return makeResult(
      check,
      "fail",
      `Report URL host must be one of: ${allowedHosts.join(", ")}.`,
    );
  }

  return makeResult(check, "pass", "Report URL format is valid.");
}

function evaluateChecklistConfirmed(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceBoolean(answers, check.target);

  return evidence === true
    ? makeResult(check, "pass", "Checklist confirmation is present.")
    : makeResult(check, "fail", "Checklist confirmation is required.");
}

function evaluateEvidenceFormat(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  const evidence = getEvidenceString(answers, check.target);
  const expectedTerms = parseStringList(check.expected);

  if (evidence === undefined || evidence.trim().length === 0) {
    return makeResult(check, "fail", "Enter evidence before running checks.");
  }

  if (expectedTerms === undefined || expectedTerms.length === 0) {
    return makeResult(
      check,
      "fail",
      "Evidence format expected must be a string or string array.",
    );
  }

  const normalizedEvidence = normalizeText(evidence);
  const missingTerms = expectedTerms.filter(
    (term) => !normalizedEvidence.includes(normalizeText(term)),
  );

  return missingTerms.length === 0
    ? makeResult(
        check,
        "pass",
        `Evidence mentions: ${expectedTerms.join(", ")}.`,
      )
    : makeResult(
        check,
        "fail",
        `Evidence is missing: ${missingTerms.join(", ")}.`,
      );
}

export function isCloudEvidenceCheckSupported(check: ChallengeCheck): boolean {
  return cloudEvidenceCheckTypes.has(check.type);
}

export function evaluateCloudEvidenceCheck(
  check: ChallengeCheck,
  answers: CloudEvidenceAnswerState,
): ValidationCheckResult {
  switch (check.type) {
    case "sql-text-contains":
      return evaluateSqlTextContains(check, answers);
    case "tabular-required-columns":
      return evaluateTabularRequiredColumns(check, answers);
    case "numeric-range":
      return evaluateNumericRange(check, answers);
    case "report-url-format":
      return evaluateReportUrlFormat(check, answers);
    case "checklist-confirmed":
      return evaluateChecklistConfirmed(check, answers);
    case "evidence-format":
      return evaluateEvidenceFormat(check, answers);
    default:
      return makeResult(
        check,
        "unsupported",
        `Unsupported cloud evidence validator: ${check.type}.`,
      );
  }
}

export function evaluateCloudEvidenceChecks(
  challenge: ChallengeManifest,
  answers: CloudEvidenceAnswerState,
): ValidationEvaluation {
  const checks = challenge.checks
    .filter((check) => check.type !== "quiz-answer")
    .map((check) => evaluateCloudEvidenceCheck(check, answers));
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
