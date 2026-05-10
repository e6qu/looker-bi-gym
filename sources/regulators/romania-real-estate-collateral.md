# Romania Real Estate Collateral Source Cards

Source cards for Romania real-estate collateral, official housing-price index
data, and notarial minimum reference-value boundaries.

## SRC-EUROSTAT-HPI-ANNUAL-RO - Eurostat Annual Romania House Price Index

- Type: official statistics dataset.
- Publisher: Eurostat.
- URL: https://ec.europa.eu/eurostat/databrowser/view/prc_hpi_a/default/table
- Accessed: 2026-05-10.
- Local data: `datasets/lending-month-end/v0.1.0/official_house_price_index_ro_annual.csv`.
- Used by facts:
  - `FACT-EUROSTAT-HPI-MARKET-PRICE-INDEX`
  - `FACT-EUROSTAT-HPI-ROMANIA-HISTORICAL-PRESENT`
- Source quote: "The House Price Index (HPI) shows price changes of residential properties purchased by households."
- Notes: Data were retrieved from the official Eurostat dissemination API for
  `PRC_HPI_A`, `geo=RO`, `purchase=TOTAL`, annual frequency. The committed CSV
  stores Romania annual average HPI observations for 2009-2025 using the
  2015=100 unit, with the latest source update timestamp 2026-04-07.

## SRC-EUROSTAT-HPI-METADATA - Eurostat HPI Metadata

- Type: official statistics metadata.
- Publisher: Eurostat.
- URL: https://ec.europa.eu/eurostat/cache/metadata/en/tipsho20_esms.htm
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-EUROSTAT-HPI-MARKET-PRICE-INDEX`
- Source quote: "Only market prices are considered".
- Notes: Use this source for the conceptual scope of HPI: residential property
  purchases by households, new and existing dwellings, market prices, and land
  component inclusion.

## SRC-CNPB-NOTARIAL-MINIMUM-VALUES - Bucharest Chamber Of Notaries Market Studies

- Type: official professional-body explanatory page.
- Publisher: Camera Notarilor Publici Bucuresti.
- URL: https://www.cnpb.ro/studiile-de-piata-privind-valorile-minime-imobiliare
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-ROMANIA-NOTARIAL-STUDIES-NOT-MARKET-VALUE`
- Source quote: "nu reprezintă valorile de circulație ale imobilelor".
- Notes: Use this source to prevent tutorials from treating notarial minimum
  reference studies as property-level market valuations.

## SRC-UNNPR-NOTARIAL-STUDIES - UNNPR Real Estate Market Studies Index

- Type: official professional-body publication index.
- Publisher: Uniunea Nationala a Notarilor Publici din Romania.
- URL: https://www.unnpr.ro/
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-ROMANIA-NOTARIAL-STUDIES-ANNUAL-COUNTY`
- Source quote: "STUDII DE PIATA 2026".
- Notes: Use this source to show that Romanian notarial reference studies are
  published annually by chamber/county and should be handled as vintage-specific
  reference material.
