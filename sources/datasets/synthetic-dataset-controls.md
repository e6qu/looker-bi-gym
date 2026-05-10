# Synthetic Dataset Control Sources

These are local source-code and committed-data source cards for deterministic
training datasets. They are synthetic learner-dataset facts, not real banking
data and not app implementation facts.

## SRC-DATASET-DEPOSITS-SEED-V010

- Type: Local committed synthetic dataset.
- Publisher: looker-bi-gym repository.
- URL: `datasets/deposits-seed/v0.1.0/`.
- Accessed: 2026-05-10.
- Used by facts: `FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN`,
  `FACT-DEPOSITS-FANOUT-CONTROL-TOTALS`.

The source files are `datasets/deposits-seed/v0.1.0/account_daily_balances.csv`,
`datasets/deposits-seed/v0.1.0/account_owners.csv`, and
`datasets/deposits-seed/v0.1.0/metadata.json`.

## SRC-DATASET-LENDING-MONTH-END-V010

- Type: Local committed synthetic dataset.
- Publisher: looker-bi-gym repository.
- URL: `datasets/lending-month-end/v0.1.0/`.
- Accessed: 2026-05-10.
- Used by facts: `FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT`.

The source files are
`datasets/lending-month-end/v0.1.0/loan_monthly_snapshots.csv` and
`datasets/lending-month-end/v0.1.0/metadata.json`.
