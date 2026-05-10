WITH latest_snapshots AS (
  SELECT *
  FROM loan_monthly_snapshots
  WHERE as_of_date = '2026-03-31'
),
latest_totals AS (
  SELECT
    currency_code,
    CAST(SUM(outstanding_principal) AS DOUBLE) AS latest_principal_total,
    CAST(SUM(CASE WHEN ifrs9_stage = 3 THEN outstanding_principal ELSE 0 END) AS DOUBLE) AS stage3_principal_total
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
)
SELECT
  '2026-03-31' AS latest_as_of_date,
  lt.currency_code,
  lt.latest_principal_total,
  nts.naive_time_sum_total,
  nts.naive_time_sum_total - lt.latest_principal_total AS time_sum_delta,
  non_month_end.non_month_end_snapshot_count,
  lt.stage3_principal_total
FROM latest_totals lt
INNER JOIN naive_time_sums nts USING (currency_code)
CROSS JOIN non_month_end
ORDER BY lt.currency_code;
