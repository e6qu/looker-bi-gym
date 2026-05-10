import assert from "node:assert/strict";
import {
  evaluateBrowserConfigChecks,
  isBrowserConfigCheckSupported,
} from "../src/configEvidence";
import type { ChallengeManifest } from "../src/challengeTypes";
import type { BrowserConfigAnswerState } from "../src/configEvidence";

const challenge: ChallengeManifest = {
  id: "browser-config-test",
  version: "v0.1.0",
  title: "Browser Config Test",
  area: "warehouse-modeling-and-metrics",
  mode: "browser-config",
  difficulty: "intermediate",
  estimated_minutes: 15,
  prerequisites: [],
  business_scenario: "Validate local browser config checks.",
  regulatory_context: ["GDPR"],
  required_tools: "none",
  inputs: [
    {
      id: "contract",
      type: "markdown",
      description: "Metric contract fixture.",
    },
  ],
  outputs: [
    {
      id: "metric_contract",
      type: "metric-contract",
      description: "Metric contract JSON.",
    },
  ],
  checks: [
    {
      id: "required",
      type: "json-required-fields",
      description: "Config includes required fields.",
      target: "contract_json",
      expected: ["metric_id", "selected_fields", "excluded_fields"],
    },
    {
      id: "equals",
      type: "json-field-equals",
      description: "Config fields match expected values.",
      target: "contract_json",
      expected: {
        source_table: "account_daily_balances",
        measure: "ledger_balance",
        aggregation: "SUM",
      },
    },
    {
      id: "includes",
      type: "json-array-includes",
      description: "Config arrays include expected values.",
      target: "contract_json",
      expected: {
        selected_fields: ["business_date", "currency_code", "ledger_total"],
      },
    },
    {
      id: "excludes",
      type: "json-array-excludes",
      description: "Config arrays exclude sensitive values.",
      target: "contract_json",
      expected: {
        selected_fields: ["account_id", "customer_id", "synthetic_iban"],
      },
    },
  ],
  questions: [],
  evidence: [
    {
      id: "contract_json",
      type: "metric-contract-json",
      description: "Metric contract JSON.",
    },
  ],
  flag: {
    id: "flag-browser-config-test",
    criteria: ["Pass config checks."],
  },
};

const validAnswers: BrowserConfigAnswerState = {
  contract_json: JSON.stringify({
    metric_id: "latest_ledger_total",
    source_table: "account_daily_balances",
    measure: "ledger_balance",
    aggregation: "SUM",
    selected_fields: ["business_date", "currency_code", "ledger_total"],
    excluded_fields: ["account_id", "customer_id", "synthetic_iban"],
  }),
};

function statusFor(answers: BrowserConfigAnswerState, checkId: string): string {
  const evaluation = evaluateBrowserConfigChecks(challenge, answers);
  const check = evaluation.checks.find(
    (candidate) => candidate.checkId === checkId,
  );

  if (check === undefined) {
    throw new Error(`Missing check result: ${checkId}`);
  }

  return check.status;
}

assert.equal(challenge.checks.every(isBrowserConfigCheckSupported), true);

const validEvaluation = evaluateBrowserConfigChecks(challenge, validAnswers);
assert.equal(validEvaluation.requiredPassed, true);
assert.equal(
  validEvaluation.checks.every((check) => check.status === "pass"),
  true,
);

assert.equal(statusFor({ contract_json: "not-json" }, "required"), "fail");

assert.equal(
  statusFor(
    {
      contract_json: JSON.stringify({
        metric_id: "latest_ledger_total",
        selected_fields: ["business_date", "currency_code", "ledger_total"],
        excluded_fields: ["account_id", "customer_id", "synthetic_iban"],
      }),
    },
    "equals",
  ),
  "fail",
);

assert.equal(
  statusFor(
    {
      contract_json: JSON.stringify({
        metric_id: "latest_ledger_total",
        source_table: "account_daily_balances",
        measure: "ledger_balance",
        aggregation: "SUM",
        selected_fields: ["business_date", "ledger_total", "account_id"],
        excluded_fields: ["account_id", "customer_id", "synthetic_iban"],
      }),
    },
    "excludes",
  ),
  "fail",
);
