SELECT
  account_id,
  COUNT(*) AS row_count,
  COUNT(DISTINCT currency_code) AS currency_count,
  MAX(business_date) AS latest_balance_date
FROM account_daily_balances
GROUP BY account_id;
