# LT-BI-001 - Profile Dataset Grain

Area: BI fundamentals. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: prove the row grain and safe profile metrics before building any
dashboard from the synthetic deposits dataset.

After this task, you will be able to:

- Identify row grain before writing a dashboard query.
- Produce a safe aggregate profile without account or customer identifiers.
- Explain why balance snapshots are not summed across dates as current-balance
  KPIs.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

- `FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`
- `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`
- `FACT-GDPR-DATA-MINIMISATION`
- `FACT-GDPR-PERSONAL-DATA`

## Prerequisites

- Open the website and go to
  `#/workbench/deposits-seed/v0.1.0`.
- Keep the workbench in browser mode. No backend, CLI, Python, Docker, or real
  banking data is required.
- Use this task page as the complete instruction source; the workbench is only
  where you run the SQL.

## Steps

1. Inspect the table browser and list the row grain for `account_daily_balances`,
   `accounts`, `account_owners`, `branches`, and `products`.
2. Run this browser SQL profile:

```sql
SELECT
  COUNT(*) AS row_count,
  COUNT(DISTINCT adb.currency_code) AS currency_count,
  COUNT(DISTINCT a.branch_id) AS branch_count,
  CAST(MAX(adb.business_date) AS VARCHAR) AS latest_balance_date
FROM account_daily_balances adb
INNER JOIN accounts a USING (account_id);
```

3. Confirm the result has one row with these values:

| row_count | currency_count | branch_count | latest_balance_date |
| --------- | -------------- | ------------ | ------------------- |
| 18        | 2              | 3            | 2026-03-31          |

4. Write a two-line metric contract in your notes:
   - grain: one balance row per `account_id` and `business_date`;
   - serving profile: aggregate counts and latest date only, with no account,
     customer, or synthetic IBAN identifiers.
5. Answer these tutorial check questions in your notes:
   - Which table has one row per `account_id` and `business_date`?
   - Why is `row_count = 18` not an account count?
   - Which identifiers did you deliberately exclude from the profile output?

## Checkpoints

- The SQL result returns exactly one row.
- `row_count` is `18`, not the count of accounts or owners.
- The output excludes `account_id`, `customer_id`, and `synthetic_iban`.
- Your notes explain why latest balance snapshots should not be summed across
  dates.

## Visualization Or Reporting Action

Run this optional chart query to trigger the SQL result visualization panel:

```sql
SELECT
  adb.currency_code,
  CAST(SUM(adb.ledger_balance) AS DOUBLE) AS ledger_total
FROM account_daily_balances adb
WHERE adb.business_date = '2026-03-31'
GROUP BY adb.currency_code
ORDER BY adb.currency_code;
```

Expected chart data:

| currency_code | ledger_total |
| ------------- | ------------ |
| EUR           | 16400        |
| RON           | 79300        |

## Common Failure Modes

- Counting rows in `accounts` and treating that as balance snapshot grain.
- Returning raw identifiers in a profile output without a stated dashboard
  purpose.
- Summing every balance date and presenting it as a current-balance KPI.

## Self-Assessment

Mark the task complete only if you can explain the difference between account
grain, balance-snapshot grain, and report-serving grain without looking at the
SQL.

## End Challenge

Write a one-sentence CTF answer in this form:

`grain=<grain>; rows=<row_count>; latest=<latest_balance_date>; safe_output=<yes/no>`

The expected answer is:

`grain=account_id+business_date; rows=18; latest=2026-03-31; safe_output=yes`

## Answer Reference

The reviewer reference for this learner task is
[`challenges/solution-fixtures/first-banking-dataset/known-good.sql`](../../challenges/solution-fixtures/first-banking-dataset/known-good.sql).
The released challenge manifest is
[`challenges/manifests/first-banking-dataset.yaml`](../../challenges/manifests/first-banking-dataset.yaml).
