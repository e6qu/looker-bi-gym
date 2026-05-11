---
{
  "id": "bi-foundations-mixed",
  "title": "BI Foundations Mixed Quiz",
  "estimated_minutes": 20,
  "audience": "Data analyst moving into BI and banking.",
  "description": "Fact-backed mixed quiz covering BI grain, browser SQL, BigQuery serving concepts, Looker Studio mechanics, and synthetic-data privacy boundaries.\n",
  "questions":
    {
      "easy":
        [
          {
            "id": "q-easy-grain-before-aggregation",
            "type": "multiple_choice",
            "estimated_seconds": 75,
            "recommended_learner_tasks": ["LT-BI-001"],
            "source_facts":
              [
                "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
                "FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN",
              ],
            "prompt": "Before summing `ledger_balance`, what must be declared for the balance rows?\n",
            "options":
              [
                {
                  "id": "account_day_grain",
                  "label": "One row per account and business date.",
                },
                {
                  "id": "branch_only_grain",
                  "label": "One row per branch only.",
                },
                {
                  "id": "owner_only_grain",
                  "label": "One row per owner only.",
                },
              ],
            "answer": "account_day_grain",
            "explanation": "The row grain must be stated before aggregates are trusted. In the deposits seed balance table, one source row represents one account on one business date.\n",
            "self_assessment": "Review dataset-grain profiling if you cannot say what one source row represents.\n",
          },
          {
            "id": "q-easy-sensitive-fields",
            "type": "select_all",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-BI-001", "LT-LOOKER-004"],
            "source_facts":
              [
                "FACT-GDPR-DATA-MINIMISATION",
                "FACT-GDPR-PERSONAL-DATA",
                "FACT-BIGQUERY-SELECT-LIST-NARROWING",
              ],
            "prompt": "Which fields should stay out of a currency-level dashboard output unless a specific purpose requires them?\n",
            "options":
              [
                { "id": "account_id", "label": "account_id" },
                { "id": "customer_id", "label": "customer_id" },
                { "id": "synthetic_iban", "label": "synthetic_iban" },
                { "id": "currency_code", "label": "currency_code" },
              ],
            "answer": ["account_id", "customer_id", "synthetic_iban"],
            "explanation": "Currency is needed for the stated aggregate, while unnecessary identifiers are not. Narrow dashboard-serving outputs reduce unnecessary exposure of personal or sensitive fields.\n",
            "self_assessment": "Review the output-minimisation checkpoint in dataset-grain profiling.\n",
          },
          {
            "id": "q-easy-data-source-role",
            "type": "multiple_choice",
            "estimated_seconds": 75,
            "recommended_learner_tasks": ["LT-LOOKER-004"],
            "source_facts":
              [
                "FACT-LOOKER-STUDIO-DATA-SOURCE",
                "FACT-LOOKER-STUDIO-CREDENTIALS",
              ],
            "prompt": "What role does a Looker Studio data source play between source data and charts?\n",
            "options":
              [
                {
                  "id": "conduit_schema_layer",
                  "label": "It connects data and provides the report field schema.",
                },
                {
                  "id": "backend_database",
                  "label": "It replaces the bank's operational source system.",
                },
                {
                  "id": "credential_export",
                  "label": "It exports Google credentials into the report data model.",
                },
              ],
            "answer": "conduit_schema_layer",
            "explanation": "A Looker Studio data source is the connection and schema layer that report charts use. Credential handling belongs in the governed source configuration, not in metric definitions.\n",
            "self_assessment": "Review report-ready data source setup if data source, chart, and view roles are blurred.\n",
          },
          {
            "id": "q-easy-safe-divide-ratio",
            "type": "multiple_choice",
            "estimated_seconds": 75,
            "recommended_learner_tasks": ["LT-DQ-005"],
            "source_facts":
              [
                "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
                "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
              ],
            "prompt": "Why should a ratio metric contract say how zero denominators are handled?\n",
            "options":
              [
                {
                  "id": "null_needs_policy",
                  "label": "SAFE_DIVIDE can return NULL, and the metric still needs an explicit display and reconciliation policy.",
                },
                {
                  "id": "always_zero",
                  "label": "SAFE_DIVIDE always turns zero-denominator ratios into zero.",
                },
                {
                  "id": "ignore_components",
                  "label": "Ratio metrics do not need numerator and denominator definitions.",
                },
              ],
            "answer": "null_needs_policy",
            "explanation": "SAFE_DIVIDE can return NULL for division errors, so the metric contract still needs a display and reconciliation policy. Ratio components should be explicit before presentation.\n",
            "self_assessment": "Review dashboard-control reconciliation if a NULL ratio feels like a finished dashboard answer rather than a control decision.\n",
          },
          {
            "id": "q-easy-refresh-setting",
            "type": "multiple_choice",
            "estimated_seconds": 75,
            "recommended_learner_tasks": ["LT-LOOKER-004"],
            "source_facts":
              [
                "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
                "FACT-BI-REFERENCE-DATE-SEPARATION",
              ],
            "prompt": "What should a dashboard handoff document about Looker Studio data freshness?\n",
            "options":
              [
                {
                  "id": "freshness_sla_tradeoff",
                  "label": "The freshness need and its performance, cost, and quota tradeoffs.",
                },
                {
                  "id": "hidden_default",
                  "label": "Nothing; data freshness is only an internal editor preference.",
                },
                {
                  "id": "source_date_equals_report_date",
                  "label": "That report refresh time and source business date always mean the same thing.",
                },
              ],
            "answer": "freshness_sla_tradeoff",
            "explanation": "Dashboard handoffs should state the freshness need and its performance, cost, and quota tradeoffs. Report refresh timing must stay separate from source business reference dates.\n",
            "self_assessment": "Review report-ready data source setup if freshness, source update timing, and business reference date are being treated as one field.\n",
          },
          {
            "id": "q-easy-control-field",
            "type": "multiple_choice",
            "estimated_seconds": 75,
            "recommended_learner_tasks": ["LT-LOOKER-007"],
            "source_facts":
              [
                "FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA",
                "FACT-LOOKER-STUDIO-CONTROL-FIELD-ID",
              ],
            "prompt": "A dashboard has a Currency list control. What should the control contract name?\n",
            "options":
              [
                {
                  "id": "stable_field",
                  "label": "The stable data-source field, allowed values, default value, and affected charts.",
                },
                {
                  "id": "display_color",
                  "label": "Only the control's display color and screen position.",
                },
                {
                  "id": "raw_identifier",
                  "label": "A private account identifier to make filtering more precise.",
                },
              ],
            "answer": "stable_field",
            "explanation": "A useful control contract names the filter field, allowed values, default value, and report elements affected by the filter. The field should be part of the report-ready data source.\n",
            "self_assessment": "Review control handoff design if a dashboard filter cannot be tied to a governed field.\n",
          },
        ],
      "medium":
        [
          {
            "id": "q-medium-fanout-total",
            "type": "numeric",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-BI-002"],
            "source_facts":
              [
                "FACT-BI-FANOUT-JOIN-RISK",
                "FACT-DEPOSITS-FANOUT-CONTROL-TOTALS",
              ],
            "prompt": "In the synthetic deposits fanout exercise, what is the overstatement delta between the naive owner-joined total and the correct latest account-grain total?\n",
            "answer": 69100,
            "explanation": "The owner join can duplicate balance facts. In the synthetic dataset, 164800 minus 95700 gives a fanout delta of 69100.\n",
            "self_assessment": "Review fanout detection if you cannot reproduce the delta from SQL.\n",
          },
          {
            "id": "q-medium-view-purpose",
            "type": "multiple_choice",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-LOOKER-004"],
            "source_facts":
              ["FACT-BIGQUERY-LOGICAL-VIEW", "FACT-BIGQUERY-VIEW-SCOPE"],
            "prompt": "Why is a BigQuery logical view a good serving-layer shape for reusable dashboard SQL?\n",
            "options":
              [
                {
                  "id": "sql_virtual_table",
                  "label": "It is a SQL-defined virtual table queried like a table.",
                },
                {
                  "id": "parameterized_dashboard_state",
                  "label": "It stores each viewer's dashboard filter state.",
                },
                {
                  "id": "browser_storage",
                  "label": "It stores each viewer's dashboard click history as metric data.",
                },
              ],
            "answer": "sql_virtual_table",
            "explanation": "A BigQuery logical view is a SQL-defined virtual table that can be queried like a table. Its SQL scope constrains how it references underlying data.\n",
            "self_assessment": "Review report-ready data source setup before using a chart-only formula for shared metric logic.\n",
          },
          {
            "id": "q-medium-month-end-control",
            "type": "numeric",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-SQL-003", "LT-DQ-005"],
            "source_facts":
              [
                "FACT-BIGQUERY-LAST-DAY-MONTH-END",
                "FACT-BI-RECONCILIATION-WINDOWS",
                "FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT",
              ],
            "prompt": "How many synthetic lending snapshot rows are not on an accepted month-end date in the month-end control task?\n",
            "answer": 1,
            "explanation": "The month-end control query returns one non-month-end row in the synthetic lending dataset. That result is a reconciliation signal, not a business KPI.\n",
            "self_assessment": "Review dashboard-control reconciliation if the control looks like a business KPI instead of a data-quality signal.\n",
          },
          {
            "id": "q-medium-safe-cast-null-control",
            "type": "multiple_choice",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-DQ-005"],
            "source_facts":
              ["FACT-BIGQUERY-SAFE-CAST-DQ-NULL", "FACT-GDPR-ACCURACY"],
            "prompt": "After a parsing query uses SAFE_CAST on a messy source field, what should the control output include?\n",
            "options":
              [
                {
                  "id": "null_reconciliation",
                  "label": "A count or reconciliation of the NULL values produced by failed runtime casts.",
                },
                {
                  "id": "drop_nulls_silently",
                  "label": "A silent filter that removes every NULL before anyone sees it.",
                },
                {
                  "id": "assume_accuracy",
                  "label": "A note that SAFE_CAST proves the source field is accurate.",
                },
              ],
            "answer": "null_reconciliation",
            "explanation": "SAFE_CAST returns NULL for runtime cast errors. The resulting NULL count is data-quality evidence and should not disappear through silent cleanup.\n",
            "self_assessment": "Review dashboard-control reconciliation if failed casts disappear from your reconciliation notes.\n",
          },
          {
            "id": "q-medium-qualify-latest-snapshot",
            "type": "multiple_choice",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-SQL-003"],
            "source_facts":
              [
                "FACT-BIGQUERY-QUALIFY-WINDOW-FILTER",
                "FACT-BIGQUERY-WINDOW-PRESERVES-ROWS",
              ],
            "prompt": "Which BigQuery pattern best expresses latest-row selection after ranking rows inside each reporting group?\n",
            "options":
              [
                {
                  "id": "qualify_window_rank",
                  "label": "Use a window ranking expression and filter it with QUALIFY.",
                },
                {
                  "id": "sum_all_dates",
                  "label": "Sum all historical dates and filter the result later in the chart.",
                },
                {
                  "id": "manual_sort",
                  "label": "Sort the result and let the dashboard viewer pick the latest row by sight.",
                },
              ],
            "answer": "qualify_window_rank",
            "explanation": "QUALIFY can filter window-function results after ranking rows. Ranking within partitions before filtering preserves the intended latest-row selection logic.\n",
            "self_assessment": "Review month-end serving SQL if latest snapshot logic depends on chart sorting rather than query output.\n",
          },
          {
            "id": "q-medium-bigquery-parameter",
            "type": "multiple_choice",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-LOOKER-007"],
            "source_facts":
              [
                "FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT",
                "FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER",
                "FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT",
              ],
            "prompt": "A report control passes a selected currency into a BigQuery-backed source. Which SQL pattern is appropriate?\n",
            "options":
              [
                {
                  "id": "named_value_parameter",
                  "label": "Use a named value parameter such as `currency_code = @selected_currency`.",
                },
                {
                  "id": "concat_table_name",
                  "label": "Concatenate the selected currency into a table name.",
                },
                {
                  "id": "paste_sql_fragment",
                  "label": "Let the control provide a SQL fragment for the WHERE clause.",
                },
              ],
            "answer": "named_value_parameter",
            "explanation": "A selected currency is a value and fits a named parameter predicate. SQL identifiers and query structure should stay in governed serving logic.\n",
            "self_assessment": "Review control handoff design if a filter value and a SQL object name feel interchangeable.\n",
          },
        ],
      "hard":
        [
          {
            "id": "q-hard-semi-additive",
            "type": "multiple_choice",
            "estimated_seconds": 120,
            "recommended_learner_tasks": ["LT-SQL-003"],
            "source_facts":
              [
                "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
                "FACT-BI-REFERENCE-DATE-SEPARATION",
                "FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION",
              ],
            "prompt": "Which result should be used as the dashboard KPI for March exposure?\n",
            "options":
              [
                {
                  "id": "latest_period_not_time_sum",
                  "label": "The latest period principal by currency, with time sums kept as controls.",
                },
                {
                  "id": "february_plus_march",
                  "label": "February plus March principal summed together.",
                },
                {
                  "id": "valuation_sum",
                  "label": "Property valuation total used as loan principal.",
                },
              ],
            "answer": "latest_period_not_time_sum",
            "explanation": "Balance snapshots are safe across entities for one date, not across time. Exposure dates, reporting dates, and collateral valuation dates should remain distinct.\n",
            "self_assessment": "Review month-end serving SQL if all dates in the dataset feel interchangeable.\n",
          },
          {
            "id": "q-hard-metric-ownership",
            "type": "multiple_choice",
            "estimated_seconds": 120,
            "recommended_learner_tasks": ["LT-BI-002", "LT-LOOKER-004"],
            "source_facts":
              [
                "FACT-BI-FANOUT-JOIN-RISK",
                "FACT-BIGQUERY-REDUCE-BEFORE-JOIN",
                "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
              ],
            "prompt": "Where should the fanout-safe `ledger_total` metric be repaired for a shared executive dashboard?\n",
            "options":
              [
                {
                  "id": "upstream_serving_logic",
                  "label": "Upstream serving SQL or a reusable data-source field.",
                },
                {
                  "id": "single_chart_formula",
                  "label": "A one-off formula hidden in one chart.",
                },
                {
                  "id": "raw_owner_join",
                  "label": "The raw account-owner join before reducing grain.",
                },
              ],
            "answer": "upstream_serving_logic",
            "explanation": "A raw owner join can duplicate balance facts. Shared metric repair belongs in upstream serving SQL or reusable data-source logic, not as a hidden one-chart calculation.\n",
            "self_assessment": "Review fanout detection and report-ready data source setup if your answer depends on a chart hiding the repair.\n",
          },
          {
            "id": "q-hard-blend-freshness-operations",
            "type": "multiple_choice",
            "estimated_seconds": 120,
            "recommended_learner_tasks": ["LT-LOOKER-004", "LT-DQ-005"],
            "source_facts":
              [
                "FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM",
                "FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG",
                "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
              ],
            "prompt": "A dashboard blends a BigQuery serving view with a branch mapping source. What must the handoff review check before signing off freshness?\n",
            "options":
              [
                {
                  "id": "each_source_freshness",
                  "label": "Each included source's freshness setting and how the blend uses the minimum refresh time.",
                },
                {
                  "id": "bigquery_only",
                  "label": "Only the BigQuery view, because blended sources inherit its freshness automatically.",
                },
                {
                  "id": "chart_position",
                  "label": "Only the chart position, because freshness is unrelated to blends.",
                },
              ],
            "answer": "each_source_freshness",
            "explanation": "Blended-source freshness depends on each included source and the blend configuration. The operations note should make both the join setup and freshness tradeoff explicit.\n",
            "self_assessment": "Review report-ready data source setup and dashboard-control reconciliation if only one source in a blend is included in your operations note.\n",
          },
          {
            "id": "q-hard-refresh-cost-observability",
            "type": "select_all",
            "estimated_seconds": 120,
            "recommended_learner_tasks": ["LT-LOOKER-004", "LT-DQ-005"],
            "source_facts":
              [
                "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
                "FACT-BIGQUERY-JOBS-BYTES",
                "FACT-BIGQUERY-JOBS-CREATION-TIME",
              ],
            "prompt": "Which evidence belongs in an operations review for a BigQuery-backed Looker Studio report refresh?\n",
            "options":
              [
                {
                  "id": "refresh_cost_note",
                  "label": "A note that manual and automatic refreshes can trigger usual BigQuery query costs.",
                },
                {
                  "id": "job_bytes",
                  "label": "BigQuery job bytes processed for the dashboard query window.",
                },
                {
                  "id": "job_creation_time",
                  "label": "Job creation time evidence for the refresh or observation window.",
                },
                {
                  "id": "chart_color",
                  "label": "The chart color palette used by the report editor.",
                },
              ],
            "answer": ["refresh_cost_note", "job_bytes", "job_creation_time"],
            "explanation": "Looker Studio refreshes can trigger usual BigQuery query costs. Job bytes processed and job creation time provide observable evidence for cost and timing review.\n",
            "self_assessment": "Review dashboard-control reconciliation if your operations note cannot connect refresh settings to observable BigQuery job evidence.\n",
          },
          {
            "id": "q-hard-control-cost-review",
            "type": "select_all",
            "estimated_seconds": 120,
            "recommended_learner_tasks": ["LT-LOOKER-007", "LT-DQ-005"],
            "source_facts":
              [
                "FACT-BIGQUERY-DRY-RUN-BYTES",
                "FACT-BIGQUERY-QUERY-VALIDATOR-BYTES",
                "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
                "FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA",
              ],
            "prompt": "Before publishing a BigQuery-backed dashboard page with currency and date controls, which checks belong in the review?\n",
            "options":
              [
                {
                  "id": "byte_estimate",
                  "label": "Pre-run byte estimate or dry-run evidence for the serving query.",
                },
                {
                  "id": "control_scope",
                  "label": "The control fields, allowed values, default values, and affected charts.",
                },
                {
                  "id": "refresh_cost",
                  "label": "A note that report refreshes can create BigQuery query cost.",
                },
                {
                  "id": "raw_private_rows",
                  "label": "A pasted sample of raw private customer rows.",
                },
              ],
            "answer": ["byte_estimate", "control_scope", "refresh_cost"],
            "explanation": "The review should connect control behavior to governed fields and cost evidence. Raw private rows are unnecessary for validating the dashboard contract.\n",
            "self_assessment": "Review control handoff design if a dashboard can be published without a field contract and a pre-run cost check.\n",
          },
        ],
    },
  "content_type": "quiz_bank",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-foundations",
  "tags": ["quiz", "mixed-difficulty"],
}
---

# BI Foundations Mixed Quiz

Fact-backed mixed quiz covering BI grain, browser SQL, BigQuery serving concepts, Looker Studio mechanics, and synthetic-data privacy boundaries.
