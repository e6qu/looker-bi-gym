# BigQuery SQL And BI Source Cards

These cards support banking BI modeling facts about aggregation, windows, dates,
joins, and performance in BigQuery. They are training material only, not legal,
regulatory, accounting, privacy, compliance, or model-risk advice.

## SRC-BIGQUERY-AGGREGATE-CALLS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-function-calls
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`
  - `FACT-BIGQUERY-COUNT-DISTINCT-GRAIN`
  - `FACT-BI-RATIO-SUM-COMPONENTS-FIRST`
- Relevant quotes:
  - "summarizes the rows of a group"
  - "`DISTINCT`"
- Notes: Use this source for group grain and aggregate semantics.

## SRC-BIGQUERY-AGGREGATE-FUNCTIONS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-SUM-NULLS`
  - `FACT-BIGQUERY-COUNT-DISTINCT-GRAIN`
  - `FACT-BIGQUERY-APPROX-COUNT-DISTINCT`
- Relevant quotes:
  - "Returns the sum of non-`NULL` values"
  - "`APPROX_COUNT_DISTINCT`"
- Notes: Use this source for precise SQL behavior in questions.

## SRC-BIGQUERY-APPROX-AGGREGATES

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-APPROX-COUNT-DISTINCT`
- Relevant quotes:
  - "statistical estimate"
- Notes: Use this source to distinguish exact BI controls from approximate
  exploratory metrics.

## SRC-BIGQUERY-WINDOW-FUNCTIONS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-WINDOW-PRESERVES-ROWS`
  - `FACT-BIGQUERY-PARTITION-BY-WINDOW`
  - `FACT-BI-RECONCILIATION-WINDOWS`
- Relevant quotes:
  - "returns a single result for each row"
  - "`PARTITION BY`"
- Notes: Use this source for reconciliation and latest-snapshot exercises.

## SRC-BIGQUERY-NAVIGATION-FUNCTIONS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`
  - `FACT-BIGQUERY-LAST-VALUE-FRAME`
- Relevant quotes:
  - "`LAST_VALUE`"
  - "last row in the current window frame"
- Notes: Use this source for latest-value and month-end balance patterns.

## SRC-BIGQUERY-DATE-FUNCTIONS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-DATE-TRUNC-GRANULARITY`
  - `FACT-BIGQUERY-LAST-DAY-MONTH-END`
  - `FACT-BI-REFERENCE-DATE-SEPARATION`
- Relevant quotes:
  - "Truncates a `DATE`"
  - "last day from a date expression"
- Notes: Use this source for calendar, month-end, and reference-date questions.

## SRC-BIGQUERY-PERFORMANCE-COMPUTE

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/best-practices-performance-compute
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-REDUCE-BEFORE-JOIN`
  - `FACT-BI-FANOUT-JOIN-RISK`
- Relevant quotes:
  - "Reduce data before using a `JOIN`"
- Notes: Use this source for cost and join-order teaching.

## SRC-BIGQUERY-PERFORMANCE-INPUT

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/best-practices-performance-input
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-BIGQUERY-SELECT-LIST-NARROWING`
  - `FACT-BIGQUERY-PARTITION-FILTERS`
- Relevant quotes:
  - "Avoid `SELECT *`"
  - "prune partitions"
- Notes: Use this source for serving-view field selection and partition filters.

## SRC-BIGQUERY-MATH-SAFE-DIVIDE

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#safe_divide
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD`
- Relevant quotes:
  - "returns `NULL` if an error occurs"
  - "division by zero"
- Notes: Use this source for ratio metrics that need explicit divide-by-zero
  behavior.

## SRC-BIGQUERY-CONVERSION-SAFE-CAST

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#safe_cast
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-BIGQUERY-SAFE-CAST-DQ-NULL`
- Relevant quotes:
  - "returns `NULL` when a runtime error is produced"
  - "impossible casts"
- Notes: Use this source for data-quality parsing traps and invalid source-field
  handling.

## SRC-BIGQUERY-QUERY-QUALIFY

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#qualify_clause
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-BIGQUERY-QUALIFY-WINDOW-FILTER`
  - `FACT-BIGQUERY-QUALIFY-TRUE-ONLY`
- Relevant quotes:
  - "filters the results of window functions"
  - "evaluates to `TRUE`"
- Notes: Use this source for latest-record and top-N tutorial patterns that
  filter after window functions.
