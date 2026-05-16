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
        "objective": "Explain why a narrow serving view costs less than a broad raw scan for a banking dashboard, and name three BigQuery cost mechanics (partition pruning, query results cache, materialized view cache) that determine real-world billed bytes.\n",
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
      {
        "id": "exam-card-rls-cls-design",
        "title": "Row-Level And Column-Level Security Design",
        "recommended_learner_tasks": ["LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-BIGQUERY-ROW-ACCESS-POLICY",
            "FACT-BIGQUERY-COLUMN-POLICY-TAG",
            "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
          ],
        "objective": "Design BigQuery access controls for a single account-day balance table that must serve a wide aggregate audience and three branch-manager audiences without exposing personal-data identifiers to any of them.\n",
        "verification":
          {
            "expected_outputs":
              [
                "policy tags applied to account_id, customer_id, synthetic_iban, masked_account_number",
                "ROW ACCESS POLICY granted per branch-manager group with FILTER USING (branch_id = ...)",
                "authorized view exposes the aggregate (currency, branch, balance) without raw identifiers",
                "credential mode for the dashboard is viewer credentials, paired with the authorized view",
              ],
            "self_assessment": "Explain when row-level security beats per-audience views; explain why column-level security still applies when a row policy is already in place; explain why an authorized view does not by itself protect tagged columns.\n",
          },
      },
      {
        "id": "exam-card-scd2-historical-reporting",
        "title": "SCD Type 2 Historical Reporting",
        "recommended_learner_tasks": ["LT-BI-001"],
        "source_facts":
          [
            "FACT-BI-SCD-TYPES",
            "FACT-BI-SURROGATE-KEY",
            "FACT-BI-REFERENCE-DATE-SEPARATION",
          ],
        "objective": "Design a branch dimension that preserves history when a branch is renamed mid-year, and explain how the monthly deposit trend will read each month's totals under the correct branch name.\n",
        "verification":
          {
            "expected_outputs":
              [
                "dim_branch carries surrogate key branch_sk plus natural branch_id, effective_from, effective_to columns",
                "fct_account_daily_balances references branch_sk valid at business_date",
                "trend chart for 2026-01 reports totals under the old branch name",
                "trend chart for 2026-03 reports totals under the new branch name",
                "no SCD type 1 overwrite is used on branch_name",
              ],
            "self_assessment": "Explain why type-1 overwrite would silently rewrite the 2026-01 trend; explain why natural-key joins fail under SCD type 2 history.\n",
          },
      },
      {
        "id": "exam-card-materialized-view-refresh-review",
        "title": "Materialized View Refresh Interval Review",
        "recommended_learner_tasks": ["LT-DQ-005"],
        "source_facts":
          [
            "FACT-BIGQUERY-MATERIALIZED-VIEW-REFRESH",
            "FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE",
            "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
          ],
        "objective": "Replace an expensive logical view backing an executive dashboard with a materialized view, choosing a refresh interval that fits a 30-minute freshness SLA and recording the design in the operations review.\n",
        "verification":
          {
            "expected_outputs":
              [
                "materialized view refresh interval is configured to at most 30 minutes",
                "Looker Studio data freshness is set to align with the materialized refresh interval",
                "the materialized view SQL is validated against MV limitations (no chained views, no wildcard tables, allowed aggregations)",
                "the operations review records the SLA, the refresh interval, and the cost expectation",
              ],
            "self_assessment": "Explain why Looker Studio freshness alone does not control the warehouse refresh; explain why a materialized view is not a substitute for SLA review.\n",
          },
      },
      {
        "id": "exam-card-corep-finrep-alignment",
        "title": "COREP / FINREP Capital Ratio Alignment",
        "recommended_learner_tasks": ["LT-DQ-005"],
        "source_facts":
          [
            "FACT-CRR-CET1-RATIO",
            "FACT-EBA-FRAMEWORK-VERSIONING",
            "FACT-EBA-DPM-VALIDATION-RULES",
          ],
        "objective": "Align a capital-monitoring dashboard with the bank's COREP / FINREP submission for the latest reporting reference date; record the evidence that lets a reviewer trust the on-screen CET1 ratio.\n",
        "verification":
          {
            "expected_outputs":
              [
                "CET1 numerator (CET1 capital) and denominator (total RWA) read from the same reporting reference date",
                "reporting framework version and validation rule version recorded next to the displayed ratio per period",
                "reconciliation evidence linking the dashboard CET1 to the COREP capital adequacy template",
                "no cross-period mixing of CET1 numerator with prior-period RWA denominator",
              ],
            "self_assessment": "Explain why a single CET1 ratio without numerator/denominator coordinates is not reviewable; explain why the framework version matters even when the absolute ratio looks unchanged.\n",
          },
      },
      {
        "id": "exam-card-ifrs9-stage-transition",
        "title": "IFRS 9 Stage-Transition Reporting",
        "recommended_learner_tasks": ["LT-SQL-003"],
        "source_facts":
          [
            "FACT-IFRS9-STAGES",
            "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
            "FACT-BI-REFERENCE-DATE-SEPARATION",
          ],
        "objective": "Build a credit-risk dashboard page that explains a month-over-month ECL movement in terms of IFRS 9 stage transitions rather than as a single ECL total.\n",
        "verification":
          {
            "expected_outputs":
              [
                "ECL exposure totals broken down by stage 1 / stage 2 / stage 3 per reporting date",
                "a transition matrix showing how many loans moved between stages between the two reporting dates",
                "stage-aware monthly trend chart instead of a single aggregate ECL line",
                "explanation note: ECL movement is decomposed into stage movements rather than smoothed by a rolling average",
              ],
            "self_assessment": "Explain why a single ECL total hides credit-risk signal; explain why semi-additive exposure cannot be summed across reporting dates.\n",
          },
      },
      {
        "id": "exam-card-bcbs-239-lineage-walkthrough",
        "title": "BCBS 239 Lineage Walkthrough For A Risk-Decision Dashboard",
        "recommended_learner_tasks": ["LT-DQ-005"],
        "source_facts":
          [
            "FACT-BCBS-239-RDARR-PRINCIPLES",
            "FACT-BI-RECONCILIATION-WINDOWS",
            "FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY",
          ],
        "objective": "Document the BCBS 239 evidence chain for a credit-risk dashboard metric: source-to-metric lineage, named owner, and per-period reconciliation evidence.\n",
        "verification":
          {
            "expected_outputs":
              [
                "named source tables and intermediate serving views feeding the metric",
                "a named owner or reviewer accountable for the metric definition",
                "per-reporting-date reconciliation between the dashboard total and an upstream control total",
                "an integrity / confidentiality note for the underlying pipeline",
              ],
            "self_assessment": "Explain why a metric without lineage, owner, or reconciliation cannot pass a BCBS 239-style review; explain why visual styling is not in scope of the review.\n",
          },
      },
      {
        "id": "exam-card-aml-alert-dashboard-governance",
        "title": "AML Alert Dashboard Governance",
        "recommended_learner_tasks": ["LT-LOOKER-004"],
        "source_facts":
          [
            "FACT-AML-CFT-SUSPICIOUS-ACTIVITY",
            "FACT-GDPR-DATA-MINIMISATION",
            "FACT-GDPR-SPECIAL-CATEGORIES",
          ],
        "objective": "Design two dashboard surfaces for a bank's compliance audience: a governed aggregate AML alert page for the broad team, and a separately access-controlled investigation page for the alert handlers.\n",
        "verification":
          {
            "expected_outputs":
              [
                "aggregate page exposes alert counts, ageing categories, type / channel breakdown only",
                "aggregate page excludes customer_id, KYC narrative, account-level identifiers",
                "investigation page sits on a separate authorized view with viewer credentials matching the handler role",
                "no blend between aggregate AML page and any marketing or account-management report",
              ],
            "self_assessment": "Explain why combining aggregate and investigation evidence on one page violates minimisation; explain which BigQuery access mechanic guards the investigation page.\n",
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
