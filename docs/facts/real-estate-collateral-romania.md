# Real Estate Collateral Facts

Facts for Romania mortgage collateral, residential property price indices,
valuation date management, and notarial reference-value boundaries.

### FACT-EUROSTAT-HPI-MARKET-PRICE-INDEX

- Statement: Eurostat HPI measures price changes of residential properties
  purchased by households and is an index-level market-price statistic, not a
  property-level collateral appraisal.
- Source: [`SRC-EUROSTAT-HPI-ANNUAL-RO`](../../sources/regulators/romania-real-estate-collateral.md#src-eurostat-hpi-annual-ro---eurostat-annual-romania-house-price-index);
  [`SRC-EUROSTAT-HPI-METADATA`](../../sources/regulators/romania-real-estate-collateral.md#src-eurostat-hpi-metadata---eurostat-hpi-metadata).
- Source quote: "Only market prices are considered".
- Derived implication: Mortgage BI tutorials may use HPI as historical and
  current market context, but they must not treat HPI as a pledged property's
  appraisal value.
- Related facts: [`FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION`](#fact-real-estate-valuation-date-separation),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).

### FACT-EUROSTAT-HPI-ROMANIA-HISTORICAL-PRESENT

- Statement: The committed Romania HPI source table stores official Eurostat
  annual HPI observations for 2009-2025, with 2025 as the latest observation in
  the 2026-04-07 Eurostat update.
- Source: [`SRC-EUROSTAT-HPI-ANNUAL-RO`](../../sources/regulators/romania-real-estate-collateral.md#src-eurostat-hpi-annual-ro---eurostat-annual-romania-house-price-index).
- Source quote: "2026-04-07T11:00:00+0200".
- Derived implication: Property-price exercises can ask learners to distinguish
  historical market-index context from current synthetic valuation rows.
- Related facts: [`FACT-EUROSTAT-HPI-MARKET-PRICE-INDEX`](#fact-eurostat-hpi-market-price-index),
  [`FACT-BIGQUERY-DATE-TRUNC-GRANULARITY`](bi-modeling-banking.md#fact-bigquery-date-trunc-granularity).

### FACT-ROMANIA-NOTARIAL-STUDIES-NOT-MARKET-VALUE

- Statement: Romanian notarial market studies provide minimum reference values
  for specified legal/tax workflows and are not market circulation values for
  individual properties.
- Source: [`SRC-CNPB-NOTARIAL-MINIMUM-VALUES`](../../sources/regulators/romania-real-estate-collateral.md#src-cnpb-notarial-minimum-values---bucharest-chamber-of-notaries-market-studies).
- Source quote: "nu reprezintă valorile de circulație ale imobilelor".
- Derived implication: A mortgage BI dashboard can label notarial-study context
  as reference-value context, but collateral valuation metrics must come from a
  valuation table with valuation dates and methods.
- Related facts: [`FACT-REAL-ESTATE-COLLATERAL-GRAIN`](#fact-real-estate-collateral-grain),
  [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).

### FACT-ROMANIA-NOTARIAL-STUDIES-ANNUAL-COUNTY

- Statement: UNNPR publishes annual Romanian real-estate market studies by
  notarial chamber and county, so BI reference data should carry geography and
  vintage fields.
- Source: [`SRC-UNNPR-NOTARIAL-STUDIES`](../../sources/regulators/romania-real-estate-collateral.md#src-unnpr-notarial-studies---unnpr-real-estate-market-studies-index).
- Source quote: "STUDII DE PIATA 2026".
- Derived implication: Real-estate benchmark tables need explicit reference
  year, geography, and property-type grain before comparison to collateral
  valuation rows.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation),
  [`FACT-ROMANIA-NOTARIAL-STUDIES-NOT-MARKET-VALUE`](#fact-romania-notarial-studies-not-market-value).

### FACT-REAL-ESTATE-COLLATERAL-GRAIN

- Statement: Mortgage collateral analysis has at least three distinct grains:
  pledged collateral, property attributes/location, and property valuation by
  valuation date.
- Source: [`SRC-EUROSTAT-HPI-METADATA`](../../sources/regulators/romania-real-estate-collateral.md#src-eurostat-hpi-metadata---eurostat-hpi-metadata);
  [`SRC-CNPB-NOTARIAL-MINIMUM-VALUES`](../../sources/regulators/romania-real-estate-collateral.md#src-cnpb-notarial-minimum-values---bucharest-chamber-of-notaries-market-studies).
- Source quote: "residential properties purchased by households".
- Derived implication: Tutorials should ask learners to aggregate valuation
  rows at property-date grain before joining collateral pledges to loan exposure
  snapshots.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation),
  [`FACT-BI-FANOUT-JOIN-RISK`](bi-modeling-banking.md#fact-bi-fanout-join-risk).

### FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION

- Statement: A collateral valuation date, a loan exposure snapshot date, a
  notarial-study reference year, and an HPI observation period answer different
  BI questions.
- Source: [`SRC-EUROSTAT-HPI-ANNUAL-RO`](../../sources/regulators/romania-real-estate-collateral.md#src-eurostat-hpi-annual-ro---eurostat-annual-romania-house-price-index);
  [`SRC-UNNPR-NOTARIAL-STUDIES`](../../sources/regulators/romania-real-estate-collateral.md#src-unnpr-notarial-studies---unnpr-real-estate-market-studies-index).
- Source quote: "annual average index".
- Derived implication: Challenges should include stale valuation checks and
  should not join every valuation date to every loan month-end exposure row.
- Related facts: [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation),
  [`FACT-BIGQUERY-LAST-DAY-MONTH-END`](bi-modeling-banking.md#fact-bigquery-last-day-month-end).
