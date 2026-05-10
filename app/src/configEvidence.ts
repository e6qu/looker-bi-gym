import type { ChallengeCheck, ChallengeManifest } from "./challengeTypes";
import type { ValidationCheckResult, ValidationEvaluation } from "./validators";

export type BrowserConfigValue = string | boolean;

export type BrowserConfigAnswerState = Readonly<
  Record<string, BrowserConfigValue>
>;

type ParseResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly message: string };

type ScalarValue = string | number | boolean;

type PathExpectation = {
  readonly path: string;
  readonly value: ScalarValue;
};

type PathListExpectation = {
  readonly path: string;
  readonly values: readonly string[];
};

const browserConfigCheckTypes: ReadonlySet<string> = new Set([
  "json-required-fields",
  "json-field-equals",
  "json-array-includes",
  "json-array-excludes",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value: string): string {
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

function isScalarValue(value: unknown): value is ScalarValue {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function parseJsonRecord(source: string): ParseResult<Record<string, unknown>> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(source) as unknown;
  } catch {
    return { ok: false, message: "Configuration JSON could not be parsed." };
  }

  return isRecord(parsed)
    ? { ok: true, value: parsed }
    : {
        ok: false,
        message: "Configuration JSON must be one object.",
      };
}

function getConfigString(
  answers: BrowserConfigAnswerState,
  evidenceId: string | undefined,
): string | undefined {
  if (evidenceId === undefined) {
    return undefined;
  }

  const value = answers[evidenceId];
  return typeof value === "string" ? value : undefined;
}

function getPathValue(
  record: Readonly<Record<string, unknown>>,
  path: string,
): unknown {
  const pathParts = path.split(".");
  let currentValue: unknown = record;

  for (const pathPart of pathParts) {
    if (!isRecord(currentValue)) {
      return undefined;
    }

    currentValue = currentValue[pathPart];
  }

  return currentValue;
}

function parsePathExpectations(
  value: unknown,
): readonly PathExpectation[] | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const expectations: PathExpectation[] = [];

  for (const [path, expectedValue] of Object.entries(value)) {
    if (!isScalarValue(expectedValue)) {
      return undefined;
    }

    expectations.push({ path, value: expectedValue });
  }

  return expectations;
}

function parsePathListExpectations(
  value: unknown,
): readonly PathListExpectation[] | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const expectations: PathListExpectation[] = [];

  for (const [path, expectedValue] of Object.entries(value)) {
    const values = parseStringList(expectedValue);

    if (values === undefined || values.length === 0) {
      return undefined;
    }

    expectations.push({ path, values });
  }

  return expectations;
}

function coerceStringArray(value: unknown): readonly string[] | undefined {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value;
  }

  return undefined;
}

function evaluateJsonConfig(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
  evaluator: (
    record: Readonly<Record<string, unknown>>,
  ) => ValidationCheckResult,
): ValidationCheckResult {
  const source = getConfigString(answers, check.target);

  if (source === undefined || source.trim().length === 0) {
    return makeResult(
      check,
      "fail",
      "Paste configuration JSON before running checks.",
    );
  }

  const parsed = parseJsonRecord(source);

  return parsed.ok
    ? evaluator(parsed.value)
    : makeResult(check, "fail", parsed.message);
}

function evaluateJsonRequiredFields(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
): ValidationCheckResult {
  const expectedPaths = parseStringList(check.expected);

  if (expectedPaths === undefined || expectedPaths.length === 0) {
    return makeResult(
      check,
      "fail",
      "Required-fields check expected must be a string or string array.",
    );
  }

  return evaluateJsonConfig(check, answers, (record) => {
    const missingPaths = expectedPaths.filter(
      (path) => getPathValue(record, path) === undefined,
    );

    return missingPaths.length === 0
      ? makeResult(
          check,
          "pass",
          `Configuration includes: ${expectedPaths.join(", ")}.`,
        )
      : makeResult(
          check,
          "fail",
          `Configuration is missing: ${missingPaths.join(", ")}.`,
        );
  });
}

function evaluateJsonFieldEquals(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
): ValidationCheckResult {
  const expectations = parsePathExpectations(check.expected);

  if (expectations === undefined || expectations.length === 0) {
    return makeResult(
      check,
      "fail",
      "Field-equals check expected must be an object of path/value pairs.",
    );
  }

  return evaluateJsonConfig(check, answers, (record) => {
    const failures = expectations.filter((expectation) => {
      const actualValue = getPathValue(record, expectation.path);

      if (
        typeof actualValue === "string" &&
        typeof expectation.value === "string"
      ) {
        return normalizeText(actualValue) !== normalizeText(expectation.value);
      }

      return actualValue !== expectation.value;
    });

    return failures.length === 0
      ? makeResult(check, "pass", "Configuration fields match expected values.")
      : makeResult(
          check,
          "fail",
          `Configuration fields did not match: ${failures
            .map((failure) => failure.path)
            .join(", ")}.`,
        );
  });
}

function evaluateJsonArrayIncludes(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
): ValidationCheckResult {
  const expectations = parsePathListExpectations(check.expected);

  if (expectations === undefined || expectations.length === 0) {
    return makeResult(
      check,
      "fail",
      "Array-includes check expected must be an object of path/string-list pairs.",
    );
  }

  return evaluateJsonConfig(check, answers, (record) => {
    const missingValues = expectations.flatMap((expectation) => {
      const actualValues = coerceStringArray(
        getPathValue(record, expectation.path),
      );
      const normalizedActualValues = new Set(
        (actualValues ?? []).map(normalizeText),
      );

      return expectation.values
        .filter((value) => !normalizedActualValues.has(normalizeText(value)))
        .map((value) => `${expectation.path}:${value}`);
    });

    return missingValues.length === 0
      ? makeResult(
          check,
          "pass",
          "Configuration arrays include expected values.",
        )
      : makeResult(
          check,
          "fail",
          `Configuration arrays are missing: ${missingValues.join(", ")}.`,
        );
  });
}

function evaluateJsonArrayExcludes(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
): ValidationCheckResult {
  const expectations = parsePathListExpectations(check.expected);

  if (expectations === undefined || expectations.length === 0) {
    return makeResult(
      check,
      "fail",
      "Array-excludes check expected must be an object of path/string-list pairs.",
    );
  }

  return evaluateJsonConfig(check, answers, (record) => {
    const presentValues = expectations.flatMap((expectation) => {
      const actualValues = coerceStringArray(
        getPathValue(record, expectation.path),
      );
      const normalizedActualValues = new Set(
        (actualValues ?? []).map(normalizeText),
      );

      return expectation.values
        .filter((value) => normalizedActualValues.has(normalizeText(value)))
        .map((value) => `${expectation.path}:${value}`);
    });

    return presentValues.length === 0
      ? makeResult(
          check,
          "pass",
          "Configuration arrays exclude forbidden values.",
        )
      : makeResult(
          check,
          "fail",
          `Configuration arrays include forbidden values: ${presentValues.join(
            ", ",
          )}.`,
        );
  });
}

export function isBrowserConfigCheckSupported(check: ChallengeCheck): boolean {
  return browserConfigCheckTypes.has(check.type);
}

export function evaluateBrowserConfigCheck(
  check: ChallengeCheck,
  answers: BrowserConfigAnswerState,
): ValidationCheckResult {
  switch (check.type) {
    case "json-required-fields":
      return evaluateJsonRequiredFields(check, answers);
    case "json-field-equals":
      return evaluateJsonFieldEquals(check, answers);
    case "json-array-includes":
      return evaluateJsonArrayIncludes(check, answers);
    case "json-array-excludes":
      return evaluateJsonArrayExcludes(check, answers);
    default:
      return makeResult(
        check,
        "unsupported",
        `Unsupported browser config validator: ${check.type}.`,
      );
  }
}

export function evaluateBrowserConfigChecks(
  challenge: ChallengeManifest,
  answers: BrowserConfigAnswerState,
): ValidationEvaluation {
  const checks = challenge.checks
    .filter((check) => check.type !== "quiz-answer")
    .map((check) => evaluateBrowserConfigCheck(check, answers));
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
