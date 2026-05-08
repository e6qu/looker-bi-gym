import assert from "node:assert/strict";
import {
  completeChallenge,
  maybeCreateLocalFlag,
  readLearnerProgress,
  resetLearnerProgress,
  writeLearnerProgress,
} from "../src/progress";
import { evaluateChallengeQuestions } from "../src/quiz";
import { evaluateSqlResultChecks } from "../src/validators";
import type { ChallengeManifest } from "../src/challengeTypes";
import type { BrowserStorage, LearnerProgressState } from "../src/progress";
import type { QuizAnswerState } from "../src/quiz";
import type { SqlValidationResult } from "../src/validators";

class MemoryStorage implements BrowserStorage {
  readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

const challenge: ChallengeManifest = {
  id: "validator-test",
  version: "v0.1.0",
  title: "Validator Test",
  area: "orientation-and-source-data",
  mode: "browser-sql",
  difficulty: "beginner",
  estimated_minutes: 10,
  prerequisites: [],
  business_scenario: "Validate browser-side SQL result checks.",
  regulatory_context: ["GDPR"],
  required_tools: "none",
  inputs: [
    {
      id: "seed",
      type: "dataset",
      description: "Synthetic seed dataset.",
      dataset_id: "deposits-seed",
      dataset_version: "v0.1.0",
      sensitive_fields: ["account_id", "customer_id"],
    },
  ],
  outputs: [
    {
      id: "profile_result",
      type: "sql-result",
      description: "Synthetic profile result.",
    },
  ],
  checks: [
    {
      id: "required_columns",
      type: "required-column",
      description: "Required columns exist.",
      expected: ["row_count", "currency_count", "latest_balance_date"],
    },
    {
      id: "forbidden_columns",
      type: "forbidden-column",
      description: "Forbidden columns are absent.",
      expected: ["account_id"],
    },
    {
      id: "one_row",
      type: "row-count",
      description: "One profile row is returned.",
      expected: 1,
    },
    {
      id: "unique_date",
      type: "unique-key",
      description: "Dates are unique.",
      expected: ["latest_balance_date"],
    },
    {
      id: "aggregate_total",
      type: "scalar-aggregate",
      description: "Aggregate total matches.",
      expected: {
        column: "row_count",
        value: 12,
        tolerance: 0,
      },
    },
    {
      id: "sensitive_exclusion",
      type: "sensitive-field-exclusion",
      description: "Sensitive fields are excluded.",
      expected: ["synthetic_iban"],
    },
  ],
  questions: [
    {
      id: "q_grain",
      type: "multiple-choice",
      prompt: "What is the daily balance grain?",
      options: [
        { id: "account_day", label: "Account day" },
        { id: "branch_month", label: "Branch month" },
      ],
      answer: "account_day",
    },
  ],
  flag: {
    id: "flag-validator-test",
    criteria: ["Pass SQL checks and answer the question."],
  },
};

const passingResult: SqlValidationResult = {
  columns: ["row_count", "currency_count", "latest_balance_date"],
  rows: [
    {
      row_count: 12,
      currency_count: 2,
      latest_balance_date: "2026-03-31",
    },
  ],
};

function resultWith(
  overrides: Partial<SqlValidationResult>,
): SqlValidationResult {
  return {
    ...passingResult,
    ...overrides,
  };
}

function getCheckStatus(result: SqlValidationResult, checkId: string): string {
  const evaluation = evaluateSqlResultChecks(challenge, result);
  const check = evaluation.checks.find(
    (candidate) => candidate.checkId === checkId,
  );

  if (check === undefined) {
    throw new Error(`Missing check result: ${checkId}`);
  }

  return check.status;
}

const passingEvaluation = evaluateSqlResultChecks(challenge, passingResult);
assert.equal(passingEvaluation.requiredPassed, true);
assert.equal(
  passingEvaluation.checks.every((check) => check.status === "pass"),
  true,
);

assert.equal(
  getCheckStatus(
    resultWith({
      columns: ["row_count", "currency_count"],
      rows: [{ row_count: 12, currency_count: 2 }],
    }),
    "required_columns",
  ),
  "fail",
);

assert.equal(
  getCheckStatus(
    resultWith({
      columns: [
        "row_count",
        "currency_count",
        "latest_balance_date",
        "account_id",
      ],
      rows: [
        {
          row_count: 12,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
          account_id: "A1001",
        },
      ],
    }),
    "forbidden_columns",
  ),
  "fail",
);

assert.equal(
  getCheckStatus(
    resultWith({
      rows: [
        {
          row_count: 12,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
        },
        {
          row_count: 12,
          currency_count: 2,
          latest_balance_date: "2026-03-30",
        },
      ],
    }),
    "one_row",
  ),
  "fail",
);

assert.equal(
  getCheckStatus(
    resultWith({
      rows: [
        {
          row_count: 12,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
        },
        {
          row_count: 13,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
        },
      ],
    }),
    "unique_date",
  ),
  "fail",
);

assert.equal(
  getCheckStatus(
    resultWith({
      rows: [
        {
          row_count: 11,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
        },
      ],
    }),
    "aggregate_total",
  ),
  "fail",
);

assert.equal(
  getCheckStatus(
    resultWith({
      columns: [
        "row_count",
        "currency_count",
        "latest_balance_date",
        "customer_id",
      ],
      rows: [
        {
          row_count: 12,
          currency_count: 2,
          latest_balance_date: "2026-03-31",
          customer_id: "C0001",
        },
      ],
    }),
    "sensitive_exclusion",
  ),
  "fail",
);

const correctAnswers: QuizAnswerState = {
  q_grain: "account_day",
};
const incompleteAnswers: QuizAnswerState = {};
const questionEvaluation = evaluateChallengeQuestions(
  challenge,
  correctAnswers,
);
const incompleteQuestionEvaluation = evaluateChallengeQuestions(
  challenge,
  incompleteAnswers,
);

assert.equal(
  maybeCreateLocalFlag(
    challenge,
    incompleteQuestionEvaluation,
    passingEvaluation,
  ),
  undefined,
);
assert.equal(
  maybeCreateLocalFlag(
    challenge,
    questionEvaluation,
    evaluateSqlResultChecks(
      challenge,
      resultWith({
        rows: [
          {
            row_count: 11,
            currency_count: 2,
            latest_balance_date: "2026-03-31",
          },
        ],
      }),
    ),
  ),
  undefined,
);
assert.equal(
  maybeCreateLocalFlag(challenge, questionEvaluation, passingEvaluation)?.flag,
  "flag-validator-test",
);

const storage = new MemoryStorage();
const emptyProgress = readLearnerProgress(storage);
const completedProgress: LearnerProgressState = completeChallenge(
  emptyProgress,
  {
    challengeId: challenge.id,
    flag: challenge.flag.id,
    passedCheckIds: passingEvaluation.passedRequiredCheckIds,
    passedQuestionIds: ["q_grain"],
    completedAt: "2026-05-06T00:00:00.000Z",
  },
);

writeLearnerProgress(completedProgress, storage);
assert.equal(
  readLearnerProgress(storage).challenges[challenge.id]?.flag,
  challenge.flag.id,
);
assert.equal(resetLearnerProgress(storage).challenges[challenge.id], undefined);
assert.equal(readLearnerProgress(storage).challenges[challenge.id], undefined);
