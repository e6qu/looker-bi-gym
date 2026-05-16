# BigQuery Source Cards

These cards support BigQuery BI platform facts. They are training material only,
not legal, regulatory, accounting, privacy, compliance, or model-risk advice.

## SRC-BIGQUERY-VIEWS-INTRO

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/views-intro
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-LOGICAL-VIEW`
  - `FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME`
- Relevant quotes:
  - "virtual table defined by a SQL query"
  - "run each time"
- Notes: Use this source to distinguish logical views from stored tables.

## SRC-BIGQUERY-VIEWS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/views
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-VIEW-LIMITATIONS`
  - `FACT-BIGQUERY-VIEW-SAME-REGION`
  - `FACT-BIGQUERY-VIEW-SQL-VERSIONING`
- Relevant quotes:
  - "Views are read-only"
  - "same location"
- Notes: Use this source for cloud-applied checklist questions.

## SRC-BIGQUERY-AUTHORIZED-VIEWS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/authorized-views
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-VIEW-SCOPE`
  - `FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL`
- Relevant quotes:
  - "without giving them access"
- Notes: Use this source for governed serving-view access patterns.

## SRC-BIGQUERY-MATERIALIZED-VIEWS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/materialized-views-intro
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED`
  - `FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS`
  - `FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE`
- Relevant quotes:
  - "precomputed views"
  - "periodically cache"
  - "restricted SQL syntax"
- Notes: Use this source for performance/cost lesson boundaries.

## SRC-BIGQUERY-JOBS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/information-schema-jobs
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-JOBS-BYTES`
  - `FACT-BIGQUERY-JOBS-USER-EMAIL`
  - `FACT-BIGQUERY-JOBS-CREATION-TIME`
- Relevant quotes:
  - "near real-time metadata"
  - "`total_bytes_billed`"
  - "`user_email`"
- Notes: Use this source for cost evidence and metadata privacy questions.

## SRC-BIGQUERY-PARAMETERIZED-QUERIES

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/parameterized-queries
- Accessed: 2026-05-11.
- Used by facts:
  - `FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT`
  - `FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER`
- Relevant quotes:
  - "protect queries made from user input"
  - "Parameters cannot be used as substitutes for identifiers"
  - "parameter value isn't logged"
- Notes: Use this source for BigQuery query settings and dashboard parameter
  handoff patterns.

## SRC-BIGQUERY-COST-ESTIMATION

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/best-practices-costs
- Accessed: 2026-05-11.
- Used by facts:
  - `FACT-BIGQUERY-QUERY-VALIDATOR-BYTES`
  - `FACT-BIGQUERY-DRY-RUN-BYTES`
- Relevant quotes:
  - "preview them to estimate costs"
  - "estimate of the number of bytes read"
  - "dry_run"
- Notes: Use this source for pre-run cost checks and report-query review.

## SRC-BIGQUERY-CLUSTERED-TABLES

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/clustered-tables
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-CLUSTERING`
- Relevant quotes:
  - "sorted based on the values"
  - "improve query performance"
- Notes: Use this source for clustering vs partitioning decisions inside the
  serving layer.

## SRC-BIGQUERY-RESULTS-CACHE

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/cached-results
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-RESULTS-CACHE`
- Relevant quotes:
  - "approximately 24 hours"
  - "cache_hit"
- Notes: Use this source when explaining why a refresh may bill zero bytes.

## SRC-BIGQUERY-AGGREGATE-COUNT

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions#count
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-COUNT-STAR-VS-COLUMN`
- Relevant quotes:
  - "returns the number of rows in the input"
  - "NULL"
- Notes: Use this source for `COUNT(*)` vs `COUNT(column)` NULL handling.

## SRC-BIGQUERY-ROW-LEVEL-SECURITY

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/row-level-security-intro
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-ROW-ACCESS-POLICY`
- Relevant quotes:
  - "row access policy"
  - "filter using"
- Notes: Use this source for RLS design; pairs with authorized views for
  field-narrowing.

## SRC-BIGQUERY-COLUMN-LEVEL-SECURITY

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/column-level-security-intro
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-COLUMN-POLICY-TAG`
- Relevant quotes:
  - "policy tag"
  - "fine-grained access"
- Notes: Use this source for tagging personal-data identifiers at the column
  level.

## SRC-BIGQUERY-MATERIALIZED-VIEW-REFRESH

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/materialized-views-use
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-BIGQUERY-MATERIALIZED-VIEW-REFRESH`
- Relevant quotes:
  - "automatically refreshes"
  - "refresh interval"
- Notes: Pairs with the MV cache source for cost/freshness reviews.
