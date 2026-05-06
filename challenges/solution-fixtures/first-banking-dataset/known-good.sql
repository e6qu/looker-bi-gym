SELECT
  COUNT(*) AS row_count,
  COUNT(DISTINCT adb.currency_code) AS currency_count,
  COUNT(DISTINCT a.branch_id) AS branch_count,
  MAX(adb.business_date) AS latest_balance_date
FROM account_daily_balances adb
INNER JOIN accounts a USING (account_id);
