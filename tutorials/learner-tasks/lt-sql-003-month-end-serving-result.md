---
{
  "id": "LT-SQL-003",
  "title": "Build A Month-End Serving Result",
  "content_type": "learner_task",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "source_facts":
    [
      "FACT-BI-REFERENCE-DATE-SEPARATION",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-LAST-DAY-MONTH-END",
      "FACT-GDPR-DATA-MINIMISATION",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# Build A Month-End Serving Result

Area: BigQuery and SQL mechanics. Timebox: 15-20 minutes. Dataset:
`lending-month-end/v0.1.0`.

Objective: create a report-serving result that separates latest month-end
exposure from invalid time sums and valuation freshness controls.

After this task, you will be able to:

- Filter semi-additive lending exposure to the selected month-end before
  aggregation.
- Return a currency-level serving result with reconciliation and valuation
  freshness controls.
- Exclude loan, borrower, contract, and property identifiers from a dashboard
  output.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Setup

- Open the [lending month-end workbench](#/workbench/lending-month-end/v0.1.0).
- Comfort with the idea of declaring row grain before aggregation is
  assumed; semi-additive measures (balances, exposures) cannot be summed
  across snapshot dates as if they were transaction events.
- The instructions below are the complete practice sequence; the workbench
  is only where you run the SQL.

## Dataset Orientation

This task uses the `lending-month-end` dataset, not the deposits seed used
in other BI fundamentals exercises. The tables you will query are:

- `loan_monthly_snapshots`: one row per loan and month-end snapshot date.
  Contains `as_of_date`, `currency_code`, `outstanding_principal`,
  `ifrs9_stage`, and contract identifiers.
- `collateral`: one row per collateral piece tied to a loan.
- `property_valuations`: one row per valuation event, with
  `valuation_date` separate from the loan's `as_of_date`.
- `romania_house_price_index_annual`: HPI reference context.

The cert-track point of this task is to keep three reference dates
distinct: exposure (`as_of_date`), origination, and valuation
(`valuation_date`). Naive sums across all three will produce wrong
control totals.

## Expected Serving Result

After the steps below, the currency-level serving result should be:

| currency_code | latest_principal_total | stage3_principal_total |
| ------------- | ---------------------: | ---------------------: |
| EUR           |                  55000 |                      0 |
| RON           |                 396000 |                  60000 |

The reconciliation controls should report `1` non-month-end snapshot row
and `3` stale collateral valuations.

## Steps

1. In the table browser, inspect `loan_monthly_snapshots`, `collateral`,
   `property_valuations`, and `romania_house_price_index_annual`.
2. Write down four different reference dates:
   - `as_of_date` for exposure measurement;
   - `origination_date` for loan start;
   - `maturity_date` for contractual maturity;
   - `valuation_date` for collateral value evidence.
3. Run the released serving-result query:

```sql
WITH latest_snapshots AS (
  SELECT *
  FROM loan_monthly_snapshots
  WHERE as_of_date = '2026-03-31'
),
latest_totals AS (
  SELECT
    currency_code,
    CAST(SUM(outstanding_principal) AS DOUBLE) AS latest_principal_total,
    CAST(SUM(
      CASE WHEN ifrs9_stage = 3 THEN outstanding_principal ELSE 0 END
    ) AS DOUBLE) AS stage3_principal_total
  FROM latest_snapshots
  GROUP BY currency_code
),
naive_time_sums AS (
  SELECT
    currency_code,
    CAST(SUM(outstanding_principal) AS DOUBLE) AS naive_time_sum_total
  FROM loan_monthly_snapshots
  GROUP BY currency_code
),
non_month_end AS (
  SELECT COUNT(*) AS non_month_end_snapshot_count
  FROM loan_monthly_snapshots
  WHERE as_of_date NOT IN ('2026-02-28', '2026-03-31')
),
latest_property_valuation AS (
  SELECT CAST(SUM(market_value_eur) AS DOUBLE)
    AS latest_property_valuation_total_eur
  FROM property_valuations
  WHERE valuation_date = '2026-03-31'
),
stale_collateral AS (
  SELECT COUNT(*) AS stale_collateral_valuation_count
  FROM collateral
  WHERE valuation_date = '2025-03-31'
),
latest_hpi AS (
  SELECT CAST(house_price_index_2015_100 AS DOUBLE)
    AS latest_romania_hpi_2015_100
  FROM romania_house_price_index_annual
  WHERE year = 2025
)
SELECT
  '2026-03-31' AS latest_as_of_date,
  lt.currency_code,
  lt.latest_principal_total,
  nts.naive_time_sum_total,
  nts.naive_time_sum_total - lt.latest_principal_total AS time_sum_delta,
  non_month_end.non_month_end_snapshot_count,
  lt.stage3_principal_total,
  latest_property_valuation.latest_property_valuation_total_eur,
  stale_collateral.stale_collateral_valuation_count,
  latest_hpi.latest_romania_hpi_2015_100
FROM latest_totals lt
INNER JOIN naive_time_sums nts USING (currency_code)
CROSS JOIN non_month_end
CROSS JOIN latest_property_valuation
CROSS JOIN stale_collateral
CROSS JOIN latest_hpi
ORDER BY lt.currency_code;
```

4. Verify the expected result:

| latest_as_of_date | currency_code | latest_principal_total | naive_time_sum_total | time_sum_delta | non_month_end_snapshot_count | stage3_principal_total | latest_property_valuation_total_eur | stale_collateral_valuation_count | latest_romania_hpi_2015_100 |
| ----------------- | ------------- | ---------------------- | -------------------- | -------------- | ---------------------------- | ---------------------- | ----------------------------------- | -------------------------------- | --------------------------- |
| 2026-03-31        | EUR           | 55000                  | 112000               | 57000          | 1                            | 0                      | 11801400                            | 3                                | 164.82                      |
| 2026-03-31        | RON           | 396000                 | 915000               | 519000         | 1                            | 29500                  | 11801400                            | 3                                | 164.82                      |

5. Answer these tutorial check questions in your notes:
   - Which reference date controls exposure measurement?
   - Why is `naive_time_sum_total` a control and not a KPI?
   - Which loan, borrower, contract, and property identifiers are excluded from
     the serving result?

## Checkpoints

- There are exactly two output rows, one per currency.
- `RON` has `time_sum_delta = 519000`.
- `non_month_end_snapshot_count = 1` appears as a control on each row.
- The result excludes `loan_id`, `borrower_id`, `synthetic_contract_ref`, and
  `property_id`.

## Visualization Or Reporting Action

Use the SQL result visualization panel to compare `latest_principal_total` by
`currency_code`. The `RON` bar should be larger than the `EUR` bar and the
table should still expose the time-sum control columns.

## Common Failure Modes

- Summing February and March snapshots together as if they were transactions.
- Using `valuation_date` as if it were the loan exposure date.
- Returning property-level identifiers in a currency-level serving result.

## Self-Assessment

Mark the task complete only if you can explain why the naive time sum is useful
as a control but unacceptable as a dashboard KPI.

## End Challenge

Write a one-sentence final summary in this form:

`latest_as_of=<date>; ron_delta=<time_sum_delta>; non_month_end=<count>; stale_valuations=<count>`

The expected answer is:

`latest_as_of=2026-03-31; ron_delta=519000; non_month_end=1; stale_valuations=3`

## Answer Reference

Use the SQL, expected output table, and expected end-challenge answer on this
page as the complete reference for checking your work.
