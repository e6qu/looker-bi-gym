# LT-BI-002 - Detect Fanout Before Reporting

Area: BI fundamentals. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: reproduce a many-to-many owner join error, quantify the
overstatement, and repair the reporting result at account-latest-date grain.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

- `FACT-BI-FANOUT-JOIN-RISK`
- `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`
- `FACT-BIGQUERY-REDUCE-BEFORE-JOIN`
- `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`

## Prerequisites

- Complete [LT-BI-001](lt-bi-001-profile-dataset-grain.md).
- Open `#/challenges/account-owner-fanout`.

## Steps

1. Inspect `account_owners` and identify accounts with more than one owner.
2. Run this intentionally unsafe comparison query:

```sql
WITH latest_balances AS (
  SELECT account_id, business_date, ledger_balance
  FROM account_daily_balances
  WHERE business_date = (
    SELECT MAX(business_date)
    FROM account_daily_balances
  )
)
SELECT
  CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
FROM latest_balances lb
INNER JOIN account_owners ao USING (account_id);
```

3. Record the unsafe result: `naive_joined_total = 164800`.
4. Replace it with the fixture-backed repair query:

```sql
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
  ROUND(
    ((naive_joined_total - correct_ledger_total) * 100.0)
    / correct_ledger_total,
    2
  ) AS overstatement_pct
FROM fanout_proof;
```

5. Explain in your notes why the fix belongs in the serving SQL/model layer
   before Looker Studio charts use the metric.
6. Answer the challenge questions.

## Checkpoints

| latest_balance_date | correct_ledger_total | naive_joined_total | fanout_delta | overstatement_pct |
| ------------------- | -------------------- | ------------------ | ------------ | ----------------- |
| 2026-03-31          | 95700                | 164800             | 69100        | 72.20             |

- The correct total uses latest account balances before joining owners.
- The naive total is kept only as a control value, not as a report KPI.
- Your answer names depositor-bank as a later coverage-analysis grain, not the
  safe balance KPI grain.

## Visualization Or Reporting Action

Run this chart query after the CTF query:

```sql
WITH latest_balances AS (
  SELECT account_id, ledger_balance
  FROM account_daily_balances
  WHERE business_date = '2026-03-31'
),
metric_compare AS (
  SELECT 'correct account grain' AS metric_name,
    CAST(SUM(ledger_balance) AS DOUBLE) AS metric_value
  FROM latest_balances
  UNION ALL
  SELECT 'naive owner join' AS metric_name,
    CAST(SUM(lb.ledger_balance) AS DOUBLE) AS metric_value
  FROM latest_balances lb
  INNER JOIN account_owners ao USING (account_id)
)
SELECT metric_name, metric_value
FROM metric_compare
ORDER BY metric_value;
```

Expected visualization: two bars, `correct account grain = 95700` and
`naive owner join = 164800`.

## Common Failure Modes

- Joining owners first and then summing balances.
- Hiding the fanout by using `COUNT(DISTINCT account_id)` while leaving the
  balance sum duplicated.
- Treating deposit-guarantee owner logic as if it were the same metric grain as
  current account balance.

## Self-Assessment

Mark the task complete only if you can point to the exact join that duplicates
the balance measure and name the CTE where the duplication is isolated.

## End Challenge

Capture the local flag for `020 - Account Owner Fanout CTF`.

## Solution Notes

The known-good fixture is
[`challenges/solution-fixtures/account-owner-fanout/known-good.sql`](../../challenges/solution-fixtures/account-owner-fanout/known-good.sql).
The known-bad fixture is
[`challenges/solution-fixtures/account-owner-fanout/known-bad-naive-owner-fanout.sql`](../../challenges/solution-fixtures/account-owner-fanout/known-bad-naive-owner-fanout.sql).
