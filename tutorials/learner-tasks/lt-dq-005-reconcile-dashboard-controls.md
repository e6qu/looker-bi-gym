# LT-DQ-005 - Reconcile Dashboard Controls

Area: data quality and controls. Timebox: 15-20 minutes. Dataset:
`lending-month-end/v0.1.0`.

Objective: add lightweight reconciliation controls to a serving result so a BI
dashboard can show data-quality risk next to the business metric.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

- `FACT-BI-RECONCILIATION-WINDOWS`
- `FACT-BI-REFERENCE-DATE-SEPARATION`
- `FACT-BIGQUERY-LAST-DAY-MONTH-END`
- `FACT-GDPR-ACCURACY`

## Prerequisites

- Complete [LT-SQL-003](lt-sql-003-month-end-serving-result.md).
- Keep the same browser challenge page open.

## Steps

1. Start from the serving query in
   [LT-SQL-003](lt-sql-003-month-end-serving-result.md).
2. Run this focused control query:

```sql
SELECT
  COUNT(*) AS snapshot_row_count,
  COUNT(CASE WHEN as_of_date = '2026-03-31' THEN 1 END)
    AS latest_snapshot_row_count,
  COUNT(CASE
    WHEN as_of_date NOT IN ('2026-02-28', '2026-03-31') THEN 1
  END) AS non_month_end_snapshot_count,
  MIN(as_of_date) AS first_snapshot_date,
  MAX(as_of_date) AS latest_snapshot_date
FROM loan_monthly_snapshots;
```

3. Verify this deterministic output:

| snapshot_row_count | latest_snapshot_row_count | non_month_end_snapshot_count | first_snapshot_date | latest_snapshot_date |
| ------------------ | ------------------------- | ---------------------------- | ------------------- | -------------------- |
| 13                 | 6                         | 1                            | 2026-02-15          | 2026-03-31           |

4. Add a note to the serving-result design: `non_month_end_snapshot_count`
   should stay visible to report builders until the upstream data issue is
   resolved.
5. Record one pass condition and one fail condition:
   - pass: latest rows exist for the chosen reporting date;
   - fail: any non-month-end snapshot row appears in a month-end pack.

## Checkpoints

- The latest snapshot row count is `6`.
- The non-month-end count is `1`, caused by a synthetic `2026-02-15` row.
- The control query returns only aggregate/date fields.

## Visualization Or Reporting Action

Create a two-row control chart with this query:

```sql
SELECT 'latest snapshot rows' AS control_name,
  CAST(COUNT(CASE WHEN as_of_date = '2026-03-31' THEN 1 END) AS DOUBLE)
    AS control_value
FROM loan_monthly_snapshots
UNION ALL
SELECT 'non-month-end rows' AS control_name,
  CAST(COUNT(CASE
    WHEN as_of_date NOT IN ('2026-02-28', '2026-03-31') THEN 1
  END) AS DOUBLE) AS control_value
FROM loan_monthly_snapshots
ORDER BY control_name;
```

The SQL result visualization should show a small `non-month-end rows` bar next
to the expected latest snapshot row count.

## Common Failure Modes

- Removing the control from the final result because it is not a business KPI.
- Treating a stale valuation count as a loan exposure amount.
- Returning loan or property identifiers in the dashboard control result.

## Self-Assessment

Mark the task complete only if you can state what the control protects against
and what a report consumer should do when it is non-zero.

## End Challenge

Update your answer in `040 - Lending Month-End Snapshot CTF` so the local flag
is still earned after you can explain the reconciliation controls.

## Solution Notes

The task uses the same released fixture as
[LT-SQL-003](lt-sql-003-month-end-serving-result.md), plus the focused control
query above.
