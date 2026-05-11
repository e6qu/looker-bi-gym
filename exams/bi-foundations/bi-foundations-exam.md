---
{
  "id": "bi-foundations-exam",
  "title": "BI Foundations Practical Exam Cards",
  "mode": "self_assessed",
  "estimated_minutes_per_card": 120,
  "description": "Untimed independent challenge cards for a data analyst moving into banking BI. Cards use synthetic datasets, deterministic expected outputs, and self-assessment notes.\n",
  "cards":
    [
      {
        "id": "exam-card-grain-and-fanout",
        "title": "Grain And Fanout Review",
        "recommended_learner_tasks": ["LT-BI-001", "LT-BI-002"],
        "source_facts":
          [
            "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
            "FACT-BI-FANOUT-JOIN-RISK",
            "FACT-BIGQUERY-REDUCE-BEFORE-JOIN",
          ],
        "objective": "Produce a one-page review note and SQL result proving that current balance reporting stays at latest account-date grain before ownership analysis is introduced.\n",
        "verification":
          {
            "expected_outputs":
              [
                "correct_ledger_total = 95700",
                "naive_joined_total = 164800",
                "fanout_delta = 69100",
              ],
            "self_assessment": "Identify the duplicated measure and explain why the repair belongs upstream of dashboard charts.\n",
          },
      },
      {
        "id": "exam-card-month-end-controls",
        "title": "Month-End Controls Review",
        "recommended_learner_tasks": ["LT-SQL-003", "LT-DQ-005"],
        "source_facts":
          [
            "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
            "FACT-BI-REFERENCE-DATE-SEPARATION",
            "FACT-BI-RECONCILIATION-WINDOWS",
          ],
        "objective": "Build a currency-level month-end exposure result and attach controls for non-month-end rows, stale collateral valuation, and output minimisation.\n",
        "verification":
          {
            "expected_outputs":
              [
                "EUR latest_principal_total = 55000",
                "RON latest_principal_total = 396000",
                "non_month_end_snapshot_count = 1",
                "stale_collateral_valuation_count = 3",
              ],
            "self_assessment": "Distinguish exposure date, valuation date, and dashboard control dates without exposing loan or property identifiers.\n",
          },
      },
      {
        "id": "exam-card-ratio-null-contract",
        "title": "Ratio Null Contract Review",
        "recommended_learner_tasks": ["LT-DQ-005", "LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
            "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
            "FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION",
          ],
        "objective": "Write a metric contract note for a dashboard ratio that uses numerator and denominator components, handles zero denominators, and states how Looker Studio should display or flag NULL results.\n",
        "verification":
          {
            "expected_outputs":
              [
                "ratio numerator and denominator are named before aggregation",
                "zero-denominator behavior is documented as NULL, hidden, zero, or flagged",
                "Looker Studio field aggregation is checked before chart release",
              ],
            "self_assessment": "Explain why SQL safety behavior and dashboard display behavior are separate contract decisions.\n",
          },
      },
      {
        "id": "exam-card-dashboard-refresh-ops",
        "title": "Dashboard Refresh Operations Review",
        "recommended_learner_tasks": ["LT-LOOKER-004", "LT-DQ-005"],
        "source_facts":
          [
            "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
            "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
            "FACT-BIGQUERY-JOBS-BYTES",
            "FACT-BIGQUERY-JOBS-CREATION-TIME",
          ],
        "objective": "Prepare a handoff note for a BigQuery-backed Looker Studio report that names the freshness setting, cost-observability evidence, and the operational checks needed before publication.\n",
        "verification":
          {
            "expected_outputs":
              [
                "freshness SLA or review interval is stated",
                "BigQuery refresh cost risk is acknowledged",
                "job bytes and job creation time evidence are listed as review inputs",
              ],
            "self_assessment": "Connect report freshness settings to BigQuery job evidence instead of treating dashboard refresh as invisible platform behavior.\n",
          },
      },
      {
        "id": "exam-card-control-parameter-handoff",
        "title": "Control Parameter Handoff Review",
        "recommended_learner_tasks": ["LT-LOOKER-007"],
        "source_facts":
          [
            "FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA",
            "FACT-LOOKER-STUDIO-CONTROL-FIELD-ID",
            "FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT",
            "FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT",
            "FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER",
            "FACT-BIGQUERY-DRY-RUN-BYTES",
          ],
        "objective": "Design a dashboard control contract for currency and business date filters, then map those selected values to a BigQuery parameterized serving-query pattern.\n",
        "verification":
          {
            "expected_outputs":
              [
                "control fields, allowed values, defaults, and affected charts are named",
                "RON selected total for 2026-03-31 equals 79300",
                "BigQuery pattern uses named value parameters for date and currency",
                "SQL object names remain governed by the serving query",
                "pre-run byte estimate or dry-run evidence is listed before publication",
              ],
            "self_assessment": "Explain why report controls can safely supply values while table and column selection stays in governed SQL.\n",
          },
      },
    ],
  "content_type": "exam_pack",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-foundations",
  "tags": ["exam", "self-assessed"],
}
---

# BI Foundations Practical Exam Cards

Untimed independent challenge cards for a data analyst moving into banking BI. Cards use synthetic datasets, deterministic expected outputs, and self-assessment notes.
