# Dimensional Modeling Literature Source Cards

These cards support general BI modeling concepts used in banking exercises. They
are training material only, not legal, regulatory, accounting, privacy,
compliance, or model-risk advice.

## SRC-KIMBALL-ADDITIVE-SEMIADDITIVE

- Type: recognized BI literature.
- Publisher: Kimball Group.
- URL: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`
  - `FACT-BI-RATIO-SUM-COMPONENTS-FIRST`
- Relevant quotes:
  - "balance amounts are common semi-additive facts"
  - "store the fully additive components"
- Notes: Use this source for dimensional-modeling vocabulary; pair with
  BigQuery/Looker Studio docs for implementation.

## SRC-KIMBALL-SCD

- Type: recognized BI literature.
- Publisher: Kimball Group.
- URL: https://www.kimballgroup.com/2008/09/slowly-changing-dimensions-part-2/
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BI-SCD-TYPES`
- Relevant quotes:
  - "slowly changing dimensions"
- Notes: Use this source for SCD type-1 / type-2 / type-3 vocabulary.

## SRC-KIMBALL-CONFORMED-DIMENSIONS

- Type: recognized BI literature.
- Publisher: Kimball Group.
- URL: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/conformed-dimensions/
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BI-CONFORMED-DIMENSION`
- Relevant quotes:
  - "conformed dimensions"
- Notes: Use this source when cross-subject-mart consistency matters.

## SRC-KIMBALL-SURROGATE-KEYS

- Type: recognized BI literature.
- Publisher: Kimball Group.
- URL: https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/surrogate-key/
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BI-SURROGATE-KEY`
- Relevant quotes:
  - "surrogate keys"
- Notes: Pairs with SCD-2 history; surrogate keys protect facts from natural-key
  changes.
