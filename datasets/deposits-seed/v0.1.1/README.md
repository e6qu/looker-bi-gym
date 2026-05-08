# Deposits Seed v0.1.1

This is a synthetic changed-output fixture for dataset versioning tests. It is not derived from real bank data and is not used by released browser challenges.

`v0.1.1` copies `v0.1.0` and adds one later balance snapshot date, `2026-04-01`, to `account_daily_balances.csv`.

The change intentionally alters challenge outputs:

- `first-banking-dataset`: row count changes from `18` to `24`, and the latest balance date changes from `2026-03-31` to `2026-04-01`.
- `account-owner-fanout`: latest-date totals change from `95700`, `164800`, and `69100` to `96280`, `165930`, and `69650`.

Existing released challenge manifests remain pinned to `deposits-seed` `v0.1.0`. Do not repoint them to this version unless their checks, flags, fixture solutions, and learner copy are refreshed together.
