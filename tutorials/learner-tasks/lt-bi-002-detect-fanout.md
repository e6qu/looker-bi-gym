---
{
  "id": "LT-BI-002",
  "title": "LT-BI-002 - Detect Fanout Before Reporting",
  "content_type": "learner_task",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "source_facts":
    [
      "FACT-BI-FANOUT-JOIN-RISK",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-REDUCE-BEFORE-JOIN",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# LT-BI-002 - Detect Fanout Before Reporting

Area: BI fundamentals. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: reproduce a many-to-many owner join error, quantify the
overstatement, and repair the reporting result at account-latest-date grain.

After this task, you will be able to:

- Reproduce a fanout error caused by joining owners before aggregation.
- Quantify the overstatement and keep it as a control value.
- Move the repaired metric logic into the serving SQL/model layer before
  reporting.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Evidence Basis

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Prerequisites

- Complete [LT-BI-001](lt-bi-001-profile-dataset-grain.md).
- Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
- Use the instructions below as the complete practice sequence; the workbench is only
  where you run the SQL.

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
4. Replace it with the checked repair query:

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
  CAST((SELECT MAX(business_date) FROM latest_balances) AS VARCHAR)
    AS latest_balance_date,
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
6. Answer these tutorial check questions in your notes:
   - Which join duplicates `ledger_balance`?
   - Which CTE isolates the unsafe fanout total?
   - Why is depositor coverage grain different from current balance KPI grain?

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

Write a one-sentence CTF answer in this form:

`correct=<correct_ledger_total>; naive=<naive_joined_total>; delta=<fanout_delta>; pct=<overstatement_pct>`

The expected answer is:

`correct=95700; naive=164800; delta=69100; pct=72.20`

## Answer Reference

Use the unsafe SQL, repaired SQL, expected output table, and expected
end-challenge answer below as the complete reference for checking your
work.
