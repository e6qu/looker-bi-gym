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
      {
        "id": "exam-card-weighted-ratio-contract",
        "title": "Weighted Ratio Metric Contract",
        "recommended_learner_tasks": ["LT-DQ-006", "LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
            "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
            "FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION",
            "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
          ],
        "objective": "Define a reusable Average Account Balance metric and prove it is weighted by account count, not averaged over per-row averages.\n",
        "verification":
          {
            "expected_outputs":
              [
                "latest_ledger_total = 95700",
                "latest_account_count = 6",
                "weighted_average_account_balance = 15950.00",
                "average_of_averages_anti_pattern = 14012.50",
                "currency_share_ron = 82.86%",
              ],
            "self_assessment": "Explain why SUM(ledger_total) / SUM(account_count) stays correct under any chart filter while AVG(row_average) does not, and name the data-source aggregation settings that make the reusable calculated field safe.\n",
          },
      },
      {
        "id": "exam-card-governance-release-decision",
        "title": "Governance Release Decision",
        "recommended_learner_tasks": ["LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-GDPR-DATA-MINIMISATION",
            "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
            "FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS",
            "FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK",
          ],
        "objective": "Write a release decision for the executive deposit dashboard that keeps personal-data identifiers out of the report data source while preserving the aggregate KPI.\n",
        "verification":
          {
            "expected_outputs":
              [
                "kept_fields = 6",
                "excluded_sensitive_fields = 4 (account_id, customer_id, synthetic_iban, masked_account_number)",
                "sensitive_fields_kept = 0",
                "restriction_flag_in_public_chart = 0",
                "control_total = 95700",
                "credential_mode = viewer_credentials_or_authorized_view",
              ],
            "self_assessment": "Name when authorized views, row-level security, and column-level security each apply, and why owner credentials are not the default for an internal report.\n",
          },
      },
      {
        "id": "exam-card-bigquery-cost-triage",
        "title": "BigQuery Cost Triage",
        "recommended_learner_tasks": ["LT-LOOKER-007", "LT-DQ-005"],
        "source_facts":
          [
            "FACT-BIGQUERY-JOBS-BYTES",
            "FACT-BIGQUERY-PARTITION-FILTERS",
            "FACT-BIGQUERY-SELECT-LIST-NARROWING",
            "FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME",
            "FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE",
          ],
        "objective": "Explain why a narrow serving view costs less than a broad raw scan and name three real BigQuery cost mechanics that the simulated proxy in tutorial 06 does not model.\n",
        "verification":
          {
            "expected_outputs":
              [
                "simulated_raw_estimated_bytes = 11232",
                "simulated_serving_estimated_bytes = 1248",
                "simulated_reduction_pct = 88.89",
                "named real cost mechanic examples include partition filter, query results cache, materialized view cache",
              ],
            "self_assessment": "Describe what total_bytes_processed, total_bytes_billed, and cache_hit in INFORMATION_SCHEMA.JOBS mean; explain when a partition filter saves cost; explain why a logical view does not avoid a re-scan but a materialized view sometimes does.\n",
          },
      },
      {
        "id": "exam-card-dora-operations-evidence",
        "title": "DORA Operations Evidence",
        "recommended_learner_tasks": ["LT-DQ-005", "LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-DORA-ICT-RISK-FRAMEWORK",
            "FACT-DORA-INCIDENTS",
            "FACT-DORA-THIRD-PARTY-REGISTER",
            "FACT-BI-RECONCILIATION-WINDOWS",
          ],
        "objective": "Produce one daily operations evidence row plus a DORA-shaped ICT third-party register entry for the deposits executive dashboard, then identify what would force a hold on a non-zero reconciliation delta day.\n",
        "verification":
          {
            "expected_outputs":
              [
                "reconciliation_delta_in_service_day = 0",
                "reconciliation_delta_break_day = 40",
                "operations_status_in_service_day = in_service",
                "operations_status_break_day = hold_publish_investigate",
                "dora_critical_service = BigQuery",
                "dora_important_service = Looker Studio",
              ],
            "self_assessment": "Explain the difference between freshness lag and reconciliation delta; explain why a non-zero delta or failed validation rule must hold the publish; write one row of an ICT third-party register covering service, provider, criticality, function supported, data location, and exit-plan summary.\n",
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
