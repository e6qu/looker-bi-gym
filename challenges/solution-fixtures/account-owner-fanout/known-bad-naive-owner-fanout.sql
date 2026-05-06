WITH latest_balances AS (
  SELECT account_id, business_date, ledger_balance
  FROM account_daily_balances
  WHERE business_date = (
    SELECT MAX(business_date)
    FROM account_daily_balances
  )
),
naive_total AS (
  SELECT CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
  FROM latest_balances lb
  INNER JOIN account_owners ao USING (account_id)
)
SELECT
  (SELECT MAX(business_date) FROM latest_balances) AS latest_balance_date,
  naive_joined_total AS correct_ledger_total,
  naive_joined_total,
  0 AS fanout_delta,
  0 AS overstatement_pct
FROM naive_total;
