# Lending Month-End v0.1.0

This dataset pack is synthetic training data only. It is not derived from real bank data, and it is not real, masked, anonymized, sampled, or production banking data.

## Purpose

`lending-month-end/v0.1.0` supports browser-first banking BI exercises about
loan exposure snapshots, semi-additive balances, DPD buckets, IFRS 9 stage,
missing reference mappings, and date-role separation.

## Tables

- `branches.csv`: synthetic lending branch reference data.
- `loan_products.csv`: synthetic loan-product reference data.
- `loan_accounts.csv`: one row per synthetic loan contract.
- `loan_monthly_snapshots.csv`: one row per loan per exposure snapshot date.
- `collateral.csv`: synthetic collateral valuation records.

## Intentional BI Traps

- `loan_monthly_snapshots.outstanding_principal` is semi-additive across time:
  latest or month-end exposure is meaningful, but summing all snapshot dates is
  not.
- One intentional non-month-end snapshot exists on `2026-03-15`.
- `loan_accounts` contains one missing branch mapping, `BR-UNKNOWN`.
- `loan_id`, `borrower_id`, and `synthetic_contract_ref` are sensitive training
  identifiers and should not appear in dashboard serving outputs unless a
  restricted exercise explicitly asks for them.

## Determinism

All files are committed CSV/JSON. No build, test, grading, or learner runtime
step downloads live data. If a CSV changes, update `metadata.json`, expected
control totals, known traps, and solution fixtures in the same dataset-version
change.
