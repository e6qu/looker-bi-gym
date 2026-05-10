# Lending Month-End v0.1.0

This dataset pack is synthetic training data only. It is not derived from real bank data, and it is not real, masked, anonymized, sampled, or production banking data.

## Purpose

`lending-month-end/v0.1.0` supports browser-first banking BI exercises about
loan exposure snapshots, semi-additive balances, DPD buckets, IFRS 9 stage,
missing reference mappings, real-estate collateral data management, valuation
freshness, synthetic property location bands, and date-role separation.

## Tables

- `branches.csv`: synthetic lending branch reference data.
- `loan_products.csv`: synthetic loan-product reference data.
- `loan_accounts.csv`: one row per synthetic loan contract.
- `loan_monthly_snapshots.csv`: one row per loan per exposure snapshot date.
- `collateral.csv`: one row per pledged synthetic real-estate collateral record.
- `property_locations.csv`: one row per synthetic residential property location
  profile with city, neighborhood tier, and access bands.
- `property_attributes.csv`: one row per synthetic residential property physical
  attribute profile.
- `property_valuations.csv`: one row per synthetic property per valuation date.
- `market_price_bands.csv`: synthetic Romania city and neighborhood-tier price
  bands for benchmark comparisons.
- `official_house_price_index_ro_annual.csv`: official Eurostat annual Romania
  house price index observations for total residential purchases, 2009-2025.

## Intentional BI Traps

- `loan_monthly_snapshots.outstanding_principal` is semi-additive across time:
  latest or month-end exposure is meaningful, but summing all snapshot dates is
  not.
- One intentional non-month-end snapshot exists on `2026-03-15`.
- `loan_accounts` contains one missing branch mapping, `BR-UNKNOWN`.
- Three collateral pledges intentionally use stale `2025-03-31` valuation dates
  so valuation-freshness checks can be tested.
- Property price bands are synthetic training bands. They are shaped by official
  HPI and Romanian notarial-study concepts, but they are not official local
  property values, market valuations, or lending recommendations.
- `loan_id`, `borrower_id`, and `synthetic_contract_ref` are sensitive training
  identifiers and should not appear in dashboard serving outputs unless a
  restricted exercise explicitly asks for them.

## Official Source Boundaries

- Eurostat PRC_HPI_A provides the official historical and current Romania HPI
  observations committed in `official_house_price_index_ro_annual.csv`.
- Romanian notarial studies provide minimum reference value context for transfer
  taxation workflows. They are not market circulation values and are not used as
  property-level appraisals in this dataset.
- All property, collateral, and price-band rows are synthetic. They are designed
  for BI data-management practice, not real estate appraisal, mortgage
  underwriting, legal, tax, or valuation advice.

## Determinism

The real-estate collateral CSVs are generated deterministically by
`generate-real-estate-collateral.ts` and committed with the dataset pack. No
build, test, grading, or learner runtime step downloads live data. If a CSV
changes, update `metadata.json`, expected control totals, known traps, and
solution fixtures in the same dataset-version change.
