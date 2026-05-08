WITH latest_balances AS (
  SELECT account_id, business_date, ledger_balance
  FROM account_daily_balances
  WHERE business_date = (
    SELECT MAX(business_date)
    FROM account_daily_balances
  )
),
correct_total AS (
  SELECT CAST(SUM(ledger_balance) AS DOUBLE) AS correct_ledger_total
  FROM latest_balances
),
naive_total AS (
  SELECT CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
  FROM latest_balances lb
  INNER JOIN account_owners ao USING (account_id)
),
fanout_proof AS (
  SELECT
    correct_total.correct_ledger_total,
    naive_total.naive_joined_total
  FROM correct_total
  CROSS JOIN naive_total
)
SELECT
  (SELECT MAX(business_date) FROM latest_balances) AS latest_balance_date,
  correct_ledger_total,
  naive_joined_total,
  naive_joined_total - correct_ledger_total AS fanout_delta,
  ROUND(((naive_joined_total - correct_ledger_total) * 100.0) / correct_ledger_total, 2) AS overstatement_pct
FROM fanout_proof;
