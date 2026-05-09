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
