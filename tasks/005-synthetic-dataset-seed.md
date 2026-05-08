# 005 - Synthetic Dataset Seed

## Status

Complete on 2026-05-05.

## Objective

Create the first small synthetic banking dataset for browser challenges.

## Dependencies

- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)

## Deliverables

- [x] Static synthetic data files for:
  - `raw_ref.branches`
  - `raw_ref.products`
  - `raw_deposits.accounts`
  - `raw_deposits.account_owners`
  - `raw_deposits.account_daily_balances`
- [x] Data dictionary for the seed dataset.
- [x] Dataset metadata declaring grain, sensitive fields, and expected joins.
- [x] At least one intentional fanout trap.
- [x] At least one sensitive field that must be excluded from serving outputs.
- [x] CSV format for the first dataset.
- [x] Romanian/EU banking flavor:
  - RON/EUR currencies.
  - Romanian branch geography.
  - Local regulatory context tags where useful.

## Verification

- [x] Dataset uses synthetic data only.
- [x] Dataset is small enough for fast browser loading.
- [x] Dataset has stable row counts.
- [x] Dataset includes joint ownership or many-to-many ownership.
- [x] Dataset has enough rows to test balances across date, branch, and product.
- [x] Dataset includes at least one intentional data-quality issue for a future CTF.

## Tests

- [x] Run dataset schema validation.
- [x] Run row-count validation.
- [x] Run uniqueness checks for intended primary keys.
- [x] Run a control-total query for daily balances.
- [x] Run a negative test showing naive owner joins multiply at least one balance total.

## Notes

- Dataset root: `datasets/deposits-seed/v0.1.0/`.
- Metadata: `datasets/deposits-seed/v0.1.0/metadata.json`.
- Data dictionary: `datasets/deposits-seed/v0.1.0/README.md`.
- Validation command: `bun validate:datasets`.
- `bun validate:datasets`, `bun validate:manifests`, and `bun check` passed on 2026-05-05.
