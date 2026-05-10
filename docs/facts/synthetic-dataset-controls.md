# Synthetic Dataset Control Facts

These facts describe committed synthetic learner datasets used to grade browser
SQL and quiz work. They are not real banking data and are not production banking
benchmarks.

### FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN

- Statement: In `deposits-seed/v0.1.0`, the
  `account_daily_balances` synthetic table is at account and business-date
  grain.
- Sources: `SRC-DATASET-DEPOSITS-SEED-V010`.
- Source quote: "`primary_key`: [`account_id`, `business_date`]".
- Derived implication: Grain questions about summing `ledger_balance` in the
  deposits seed should expect learners to name one row per account and business
  date before aggregating balances.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation),
  [`FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`](bi-modeling-banking.md#fact-bi-semi-additive-balance-snapshot).

### FACT-DEPOSITS-FANOUT-CONTROL-TOTALS

- Statement: In `deposits-seed/v0.1.0`, the latest account-grain balance total
  is 95700, the naive latest balance total after joining account owners is
  164800, and the fanout overstatement delta is 69100.
- Sources: `SRC-DATASET-DEPOSITS-SEED-V010`.
- Source quote: "`expected_fanout_delta`: 69100".
- Derived implication: Numeric fanout quiz questions can require answer 69100
  when they cite this deterministic synthetic dataset control fact.
- Related facts: [`FACT-BI-FANOUT-JOIN-RISK`](bi-modeling-banking.md#fact-bi-fanout-join-risk),
  [`FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN`](#fact-deposits-account-daily-balances-grain).

### FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT

- Statement: In `lending-month-end/v0.1.0`, the deterministic month-end control
  has one synthetic loan snapshot row that is not on an accepted month-end date.
- Sources: `SRC-DATASET-LENDING-MONTH-END-V010`.
- Source quote: "`expected_non_month_end_snapshot_count`: 1".
- Derived implication: Numeric month-end control quiz questions can require
  answer 1 when they cite this deterministic synthetic lending dataset control
  fact.
- Related facts: [`FACT-BIGQUERY-LAST-DAY-MONTH-END`](bi-modeling-banking.md#fact-bigquery-last-day-month-end),
  [`FACT-BI-RECONCILIATION-WINDOWS`](bi-modeling-banking.md#fact-bi-reconciliation-windows).
