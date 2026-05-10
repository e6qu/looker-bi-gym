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
