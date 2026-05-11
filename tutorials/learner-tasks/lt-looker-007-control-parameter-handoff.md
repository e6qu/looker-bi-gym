---
{
  "id": "LT-LOOKER-007",
  "title": "LT-LOOKER-007 - Design A Control Parameter Handoff",
  "content_type": "learner_task",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "source_facts":
    [
      "FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA",
      "FACT-LOOKER-STUDIO-CONTROL-FIELD-ID",
      "FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT",
      "FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT",
      "FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER",
      "FACT-BIGQUERY-QUERY-VALIDATOR-BYTES",
    ],
  "tags": ["tutorial", "synthetic-data", "looker-studio", "bigquery"],
}
---

# LT-LOOKER-007 - Design A Control Parameter Handoff

Area: Looker Studio mechanics and BigQuery serving patterns. Timebox: 15-20 minutes.
Dataset: `deposits-seed/v0.1.0`.

Objective: design a report control that filters a governed serving result and
document the equivalent BigQuery parameter pattern for an applied dashboard.

After this task, you will be able to:

- Define which fields a dashboard control is allowed to filter.
- Simulate a selected report control value in browser SQL.
- Translate the same filter into a BigQuery named-parameter pattern.
- Add a pre-run cost checkpoint before publishing a report query.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Evidence Basis

This material is backed by source notes for Looker Studio controls, BigQuery
query parameters, BigQuery pre-run cost estimates, and the synthetic deposits
dataset.

## Prerequisites

- Complete [LT-LOOKER-004](lt-looker-004-report-ready-data-source.md).
- Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
- Use only the synthetic dataset already loaded in the browser workbench.

## Steps

1. Create this control contract in your notes:

| Control label | Bound field     | Allowed values | Default value | Target chart field |
| ------------- | --------------- | -------------- | ------------- | ------------------ |
| Currency      | `currency_code` | EUR, RON       | RON           | `currency_code`    |

2. Run this browser SQL to simulate the selected control value and validate the
   filtered serving row:

```sql
WITH control_selection AS (
  SELECT
    DATE '2026-03-31' AS selected_business_date,
    'RON' AS selected_currency
),
serving_rows AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total,
    COUNT(*) AS source_account_count
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  CAST(serving_rows.business_date AS VARCHAR) AS business_date,
  serving_rows.currency_code,
  CAST(serving_rows.ledger_total AS DOUBLE) AS ledger_total,
  serving_rows.source_account_count
FROM serving_rows
CROSS JOIN control_selection
WHERE serving_rows.business_date = control_selection.selected_business_date
  AND serving_rows.currency_code = control_selection.selected_currency;
```

3. Confirm the result matches this expected output:

| business_date | currency_code | ledger_total | source_account_count |
| ------------- | ------------- | -----------: | -------------------: |
| 2026-03-31    | RON           |        79300 |                    4 |

4. Record the applied BigQuery pattern below as a design note. It is not run in
   the browser workbench because the local engine uses the simulated
   `control_selection` CTE above.

```sql
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total,
  COUNT(*) AS source_account_count
FROM `project.dataset.account_daily_balances`
WHERE business_date = @selected_business_date
  AND currency_code = @selected_currency
GROUP BY business_date, currency_code;
```

5. Add these parameter settings to the same design note:

| Parameter name           | Type   | Example value | Control source |
| ------------------------ | ------ | ------------- | -------------- |
| `selected_business_date` | DATE   | 2026-03-31    | date control   |
| `selected_currency`      | STRING | RON           | list control   |

6. Add this publication checkpoint: before the query backs a dashboard page,
   the query editor or dry-run evidence must show an acceptable estimated byte
   count for the selected serving source.

7. Write the final control handoff summary:

`control=Currency; field=currency_code; parameter=selected_currency; default=RON; total=79300`

## Checkpoints

- The control contract binds the visible control to `currency_code`.
- The browser SQL returns exactly one row for `2026-03-31` and `RON`.
- The expected `ledger_total` is `79300`.
- The BigQuery design uses `@selected_business_date` and
  `@selected_currency` for values, not string concatenation.
- The design does not use parameters for table names, column names, or other
  SQL structure.
- The publication checkpoint names a pre-run byte estimate or dry-run check.

## Visualization Or Reporting Action

Sketch a single dashboard page with one Currency list control, one date control,
one scorecard named `Ledger total`, and one table with `business_date`,
`currency_code`, `ledger_total`, and `source_account_count`. The scorecard and
table should both be filtered by the same selected currency and business date.

## Common Failure Modes

- Binding a control to a display label while the report data source uses a
  different field identity.
- Letting a control choose arbitrary table names or column names.
- Publishing a BigQuery-backed report query without checking the estimated
  bytes processed.
- Comparing the RON-only scorecard to the all-currency total of `95700`.

## Self-Assessment

Mark the task complete only if you can explain why a control-selected value is
safe as a query parameter, while SQL object selection still belongs in governed
serving logic.

## End Challenge

Change the simulated selected currency to `EUR`, rerun the browser SQL, and
write the new summary:

`control=Currency; field=currency_code; parameter=selected_currency; default=EUR; total=<value>`

## Answer Reference

For the base case, the expected summary is:

`control=Currency; field=currency_code; parameter=selected_currency; default=RON; total=79300`

For the end challenge, the expected EUR total for `2026-03-31` is `16400`.
