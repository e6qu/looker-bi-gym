import assert from "node:assert/strict";
import {
  evaluateCloudEvidenceChecks,
  parsePastedTabularEvidence,
} from "../src/cloudEvidence";
import type { ChallengeManifest } from "../src/challengeTypes";
import type { CloudEvidenceAnswerState } from "../src/cloudEvidence";

const challenge: ChallengeManifest = {
  id: "cloud-evidence-test",
  version: "v0.1.0",
  title: "Cloud Evidence Test",
  area: "looker-studio-and-dashboard-design",
  mode: "cloud-evidence",
  difficulty: "intermediate",
  estimated_minutes: 15,
  prerequisites: [],
  business_scenario: "Validate local cloud evidence checks.",
  regulatory_context: ["GDPR"],
  required_tools: [
    {
      name: "Looker Studio",
      purpose: "Browser UI report evidence.",
      required: false,
    },
  ],
  inputs: [
    {
      id: "cloud_ui",
      type: "cloud-ui",
      description: "Browser UI workflow.",
    },
  ],
  outputs: [
    {
      id: "evidence",
      type: "dashboard-evidence",
      description: "Pasted local evidence.",
    },
  ],
  checks: [
    {
      id: "sql_names_view",
      type: "sql-text-contains",
      description: "SQL names required objects.",
      target: "serving_sql",
      expected: ["serving_deposit_dashboard", "account_daily_balances"],
    },
    {
      id: "result_columns",
      type: "tabular-required-columns",
      description: "Pasted result has expected columns.",
      target: "control_result",
      expected: ["business_date", "currency_code", "ledger_total"],
    },
    {
      id: "numeric_range",
      type: "numeric-range",
      description: "Numeric value is in range.",
      target: "visible_total",
      expected: {
        min: 95000,
        max: 96000,
      },
    },
    {
      id: "url_format",
      type: "report-url-format",
      description: "Report URL format is valid.",
      target: "report_url",
      expected: {
        require_https: true,
        allowed_hosts: ["lookerstudio.google.com", "datastudio.google.com"],
      },
    },
    {
      id: "checklist",
      type: "checklist-confirmed",
      description: "Checklist is confirmed.",
      target: "dashboard_checklist",
      expected: true,
    },
  ],
  questions: [
    {
      id: "q_credentials",
      type: "multiple-choice",
      prompt: "What should the static app store?",
      options: [
        { id: "none", label: "No credentials" },
        { id: "token", label: "Access token" },
      ],
      answer: "none",
    },
  ],
  evidence: [
    {
      id: "serving_sql",
      type: "pasted-sql",
      description: "SQL text.",
    },
  ],
  flag: {
    id: "flag-cloud-evidence-test",
    criteria: ["Pass evidence checks."],
  },
};

const validAnswers: CloudEvidenceAnswerState = {
  serving_sql: `
CREATE OR REPLACE VIEW serving_deposit_dashboard AS
SELECT business_date, currency_code, SUM(ledger_balance) AS ledger_total
FROM account_daily_balances
GROUP BY business_date, currency_code;
`,
  control_result: `business_date,currency_code,ledger_total
2026-03-31,RON,79300
2026-03-31,EUR,16400`,
  visible_total: "95700",
  report_url: "https://lookerstudio.google.com/reporting/example-report",
  dashboard_checklist: true,
};

function statusFor(answers: CloudEvidenceAnswerState, checkId: string): string {
  const evaluation = evaluateCloudEvidenceChecks(challenge, answers);
  const check = evaluation.checks.find(
    (candidate) => candidate.checkId === checkId,
  );

  if (check === undefined) {
    throw new Error(`Missing check result: ${checkId}`);
  }

  return check.status;
}

function unwrapParse<T>(
  result:
    | { readonly ok: true; readonly value: T }
    | { readonly ok: false; readonly message: string },
): T {
  if (!result.ok) {
    throw new Error(result.message);
  }

  return result.value;
}

const controlResult = validAnswers["control_result"];
if (typeof controlResult !== "string") {
  throw new Error("Expected control_result fixture to be a string.");
}

const csvParse = unwrapParse(parsePastedTabularEvidence(controlResult));
assert.deepEqual(csvParse.columns, [
  "business_date",
  "currency_code",
  "ledger_total",
]);

const jsonParse = parsePastedTabularEvidence(
  JSON.stringify([
    { business_date: "2026-03-31", currency_code: "RON", ledger_total: 79300 },
    { business_date: "2026-03-31", currency_code: "EUR", ledger_total: 16400 },
  ]),
);
assert.deepEqual(unwrapParse(jsonParse).columns, [
  "business_date",
  "currency_code",
  "ledger_total",
]);

const validEvaluation = evaluateCloudEvidenceChecks(challenge, validAnswers);
assert.equal(validEvaluation.requiredPassed, true);
assert.equal(
  validEvaluation.checks.every((check) => check.status === "pass"),
  true,
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      serving_sql: "SELECT * FROM account_daily_balances;",
    },
    "sql_names_view",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      control_result: "business_date,ledger_total\n2026-03-31,95700",
    },
    "result_columns",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      visible_total: "97000",
    },
    "numeric_range",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      report_url: "notaurl",
    },
    "url_format",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      report_url: "http://lookerstudio.google.com/reporting/example-report",
    },
    "url_format",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      ...validAnswers,
      dashboard_checklist: false,
    },
    "checklist",
  ),
  "fail",
);
