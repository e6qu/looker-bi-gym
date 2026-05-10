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
            "prompt": "Before summing `ledger_balance`, what must the learner declare for the balance rows?\n",
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
            "explanation": "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION requires the row grain to be stated before aggregates are trusted. FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN gives the deposits seed balance grain: one row per account and business date.\n",
            "self_assessment": "Review LT-BI-001 if you cannot say what one source row represents.\n",
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
            "explanation": "FACT-GDPR-DATA-MINIMISATION supports narrow serving outputs; currency is needed for the stated aggregate, while unnecessary identifiers are not. FACT-GDPR-PERSONAL-DATA grounds identifier sensitivity, and FACT-BIGQUERY-SELECT-LIST-NARROWING supports exposing only required dashboard fields.\n",
            "self_assessment": "Review the output-minimisation checkpoint in LT-BI-001.\n",
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
                  "label": "It becomes this app's backend database.",
                },
                {
                  "id": "credential_export",
                  "label": "It exports cloud credentials into the static app.",
                },
              ],
            "answer": "conduit_schema_layer",
            "explanation": "FACT-LOOKER-STUDIO-DATA-SOURCE defines the data source as the connection and schema layer for report charts. FACT-LOOKER-STUDIO-CREDENTIALS keeps credential behavior outside this static app's local quiz answer.\n",
            "self_assessment": "Review LT-LOOKER-004 if data source, chart, and view roles are blurred.\n",
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
            "explanation": "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD explains the NULL behavior for division errors, while FACT-BI-RATIO-SUM-COMPONENTS-FIRST keeps ratio components explicit before presentation.\n",
            "self_assessment": "Review LT-DQ-005 if a NULL ratio feels like a finished dashboard answer rather than a control decision.\n",
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
            "explanation": "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF requires an explicit freshness tradeoff, and FACT-BI-REFERENCE-DATE-SEPARATION keeps report refresh timing separate from business reference dates.\n",
            "self_assessment": "Review LT-LOOKER-004 if freshness, source update timing, and business reference date are being treated as one field.\n",
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
            "explanation": "FACT-BI-FANOUT-JOIN-RISK explains why the owner join can duplicate balance facts. FACT-DEPOSITS-FANOUT-CONTROL-TOTALS fixes the synthetic dataset values: 164800 minus 95700 gives fanout_delta 69100.\n",
            "self_assessment": "Review LT-BI-002 if you cannot reproduce the delta from SQL.\n",
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
                  "label": "It stores learner progress in browser localStorage.",
                },
              ],
            "answer": "sql_virtual_table",
            "explanation": "FACT-BIGQUERY-LOGICAL-VIEW anchors the SQL-defined virtual table behavior; FACT-BIGQUERY-VIEW-SCOPE constrains how it references data.\n",
            "self_assessment": "Review LT-LOOKER-004 before using a chart-only formula for shared metric logic.\n",
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
            "explanation": "FACT-BIGQUERY-LAST-DAY-MONTH-END supports the month-end check and the deterministic control query returns one non-month-end row. FACT-BI-RECONCILIATION-WINDOWS frames the result as a control signal, and FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT fixes the expected answer at 1 for the synthetic lending dataset.\n",
            "self_assessment": "Review LT-DQ-005 if the control looks like a business KPI instead of a data-quality signal.\n",
          },
          {
            "id": "q-medium-safe-cast-null-control",
            "type": "multiple_choice",
            "estimated_seconds": 90,
            "recommended_learner_tasks": ["LT-DQ-005"],
            "source_facts":
              ["FACT-BIGQUERY-SAFE-CAST-DQ-NULL", "FACT-GDPR-ACCURACY"],
            "prompt": "After a parsing query uses SAFE_CAST on a messy source field, what should the learner add to the control output?\n",
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
            "explanation": "FACT-BIGQUERY-SAFE-CAST-DQ-NULL says SAFE_CAST returns NULL for runtime cast errors; FACT-GDPR-ACCURACY supports treating the resulting NULL count as data-quality evidence, not silent cleanup.\n",
            "self_assessment": "Review LT-DQ-005 if failed casts disappear from your reconciliation notes.\n",
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
            "explanation": "FACT-BIGQUERY-QUALIFY-WINDOW-FILTER supports filtering window-function results, and FACT-BIGQUERY-WINDOW-PRESERVES-ROWS explains why ranking rows before filtering can preserve the intended partition logic.\n",
            "self_assessment": "Review LT-SQL-003 if latest snapshot logic depends on chart sorting rather than query output.\n",
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
            "explanation": "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT says snapshots are safe across entities for one date, not across time; FACT-BI-REFERENCE-DATE-SEPARATION keeps exposure and valuation dates distinct. FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION keeps property valuation context separate from loan principal.\n",
            "self_assessment": "Review LT-SQL-003 if all dates in the dataset feel interchangeable.\n",
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
            "explanation": "FACT-BI-FANOUT-JOIN-RISK explains the raw owner-join risk. FACT-BIGQUERY-REDUCE-BEFORE-JOIN supports reducing grain before joins, and FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE distinguishes reusable data-source logic from chart-only calculations.\n",
            "self_assessment": "Review LT-BI-002 and LT-LOOKER-004 if your answer depends on a chart hiding the repair.\n",
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
            "explanation": "FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM states the minimum-refresh behavior for blended sources; FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG and FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF make the blend configuration and freshness SLA review explicit.\n",
            "self_assessment": "Review LT-LOOKER-004 and LT-DQ-005 if only one source in a blend is included in your operations note.\n",
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
            "explanation": "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST connects refresh behavior to usual BigQuery query costs, while FACT-BIGQUERY-JOBS-BYTES and FACT-BIGQUERY-JOBS-CREATION-TIME identify job evidence for cost and timing review.\n",
            "self_assessment": "Review LT-DQ-005 if your operations note cannot connect refresh settings to observable BigQuery job evidence.\n",
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
