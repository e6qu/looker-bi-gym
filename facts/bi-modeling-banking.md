---
{
  "id": "facts-bi-modeling-banking",
  "title": "Banking BI Modeling Facts",
  "content_type": "fact_register",
  "status": "published",
  "version": "0.1.0",
  "topic": "facts",
  "tags": ["facts", "source-backed"],
}
---

# Banking BI Modeling Facts

These facts anchor the analytical layer for banking BI tutorials across
BigQuery, Looker Studio, and dimensional modeling. They are technical training
notes only, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

### FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION

- Statement: An aggregate function summarizes rows of a group into one value, so
  BI work must declare the grouping grain before totals are trusted.
- Source: [`SRC-BIGQUERY-AGGREGATE-CALLS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-aggregate-calls);
  [`SRC-LOOKER-STUDIO-AGGREGATION`](../sources/platforms/looker-studio.md#src-looker-studio-aggregation).
- Source quote: "summarizes the rows of a group".
- Derived implication: Banking profile questions should ask for the table grain,
  grouping dimensions, and metric meaning before accepting a dashboard total.
- Related facts: [`FACT-LOOKER-STUDIO-DIMENSION-CONTEXT`](#fact-looker-studio-dimension-context),
  [`FACT-BIGQUERY-COUNT-DISTINCT-GRAIN`](#fact-bigquery-count-distinct-grain).

### FACT-BI-FANOUT-JOIN-RISK

- Statement: Joining before reducing data can increase processed rows and can
  duplicate facts when the join key is not unique on the joined side.
- Source: [`SRC-BIGQUERY-PERFORMANCE-COMPUTE`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-performance-compute);
  [`SRC-LOOKER-STUDIO-BLENDS`](../sources/platforms/looker-studio.md#src-looker-studio-blends).
- Source quote: "Reduce data before using a `JOIN`".
- Derived implication: Banking ownership, branch, and product joins need
  pre-join row counts and post-join reconciliation checks.
- Related facts: [`FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-blend-more-rows),
  [`FACT-BIGQUERY-REDUCE-BEFORE-JOIN`](#fact-bigquery-reduce-before-join).

### FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT

- Statement: Balance amounts are common semi-additive facts: they can be summed
  across some dimensions but not across time.
- Source: [`SRC-KIMBALL-ADDITIVE-SEMIADDITIVE`](../sources/literature/kimball-dimensional-modeling.md#src-kimball-additive-semiadditive);
  [`SRC-BIGQUERY-NAVIGATION-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-navigation-functions).
- Source quote: "balance amounts are common semi-additive facts".
- Derived implication: Banking dashboards should use latest-date or month-end
  balance logic instead of summing daily balances across dates.
- Related facts: [`FACT-BIGQUERY-LAST-VALUE-FRAME`](#fact-bigquery-last-value-frame),
  [`FACT-BIGQUERY-LAST-DAY-MONTH-END`](#fact-bigquery-last-day-month-end).

### FACT-BI-RATIO-SUM-COMPONENTS-FIRST

- Statement: For non-additive ratios, a sound BI pattern is to store additive
  numerator and denominator components and calculate the ratio after summing the
  components.
- Source: [`SRC-KIMBALL-ADDITIVE-SEMIADDITIVE`](../sources/literature/kimball-dimensional-modeling.md#src-kimball-additive-semiadditive);
  [`SRC-BIGQUERY-AGGREGATE-CALLS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-aggregate-calls).
- Source quote: "store the fully additive components".
- Derived implication: Deposit mix, approval rate, and reconciliation variance
  metrics should not average precomputed row-level percentages.
- Related facts: [`FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION`](#fact-looker-studio-default-aggregation),
  [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](#fact-bi-grain-declare-before-aggregation).

### FACT-BI-RECONCILIATION-WINDOWS

- Statement: BigQuery window functions can compute totals or comparisons across
  partitions while returning a result for each row.
- Source: [`SRC-BIGQUERY-WINDOW-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-window-functions).
- Source quote: "returns a single result for each row".
- Derived implication: Reconciliation exercises can show row-level detail
  together with branch, currency, or bank-level control totals.
- Related facts: [`FACT-BIGQUERY-WINDOW-PRESERVES-ROWS`](#fact-bigquery-window-preserves-rows),
  [`FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY`](governance-reporting-operations.md#fact-dora-data-confidentiality-integrity).

### FACT-BI-REFERENCE-DATE-SEPARATION

- Statement: BI models should distinguish business event dates, reporting
  reference dates, month-end dates, and dashboard refresh dates.
- Source: [`SRC-BIGQUERY-DATE-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-date-functions);
  [`SRC-EBA-REPORTING-FRAMEWORKS`](../sources/regulators/eba-reporting-frameworks.md#src-eba-reporting-frameworks).
- Source quote: "each reference date".
- Derived implication: Banking tutorials should name the date role in every
  metric, especially for balances, delinquency, and reporting packs.
- Related facts: [`FACT-BIGQUERY-DATE-TRUNC-GRANULARITY`](#fact-bigquery-date-trunc-granularity),
  [`FACT-EBA-REFERENCE-DATES`](governance-reporting-operations.md#fact-eba-reference-dates).

### FACT-BIGQUERY-COUNT-DISTINCT-GRAIN

- Statement: BigQuery aggregate calls support `DISTINCT`, which aggregates each
  distinct value once inside the grouped result.
- Source: [`SRC-BIGQUERY-AGGREGATE-CALLS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-aggregate-calls);
  [`SRC-BIGQUERY-AGGREGATE-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-aggregate-functions).
- Source quote: "`DISTINCT`".
- Derived implication: Fanout checks should compare row counts with distinct
  account, customer, depositor, and bank counts at the intended grain.
- Related facts: [`FACT-BI-FANOUT-JOIN-RISK`](#fact-bi-fanout-join-risk),
  [`FACT-DGSD-AGGREGATE-PER-DEPOSITOR`](banking-deposits-romania-eu.md#fact-dgsd-aggregate-per-depositor).

### FACT-BIGQUERY-SUM-NULLS

- Statement: BigQuery `SUM` returns the sum of non-`NULL` values and returns
  `NULL` when the aggregated group is empty or all arguments are `NULL`.
- Source: [`SRC-BIGQUERY-AGGREGATE-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-aggregate-functions).
- Source quote: "sum of non-`NULL` values".
- Derived implication: Banking reconciliation queries should explicitly handle
  missing balances or unmapped branches before treating a `NULL` as zero.
- Related facts: [`FACT-GDPR-ACCURACY`](privacy-gdpr.md#fact-gdpr-accuracy),
  [`FACT-BI-RECONCILIATION-WINDOWS`](#fact-bi-reconciliation-windows).

### FACT-BIGQUERY-APPROX-COUNT-DISTINCT

- Statement: BigQuery `APPROX_COUNT_DISTINCT` returns a statistical estimate,
  not the exact distinct count.
- Source: [`SRC-BIGQUERY-APPROX-AGGREGATES`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-approx-aggregates).
- Source quote: "statistical estimate".
- Derived implication: Exploratory scale estimates can use approximate counts,
  but graded reconciliation and guarantee coverage checks should use exact
  counts.
- Related facts: [`FACT-BIGQUERY-COUNT-DISTINCT-GRAIN`](#fact-bigquery-count-distinct-grain),
  [`FACT-FGDB-GUARANTEE-CEILING`](banking-deposits-romania-eu.md#fact-fgdb-guarantee-ceiling).

### FACT-BIGQUERY-WINDOW-PRESERVES-ROWS

- Statement: A BigQuery window function computes over a selected set of rows but
  returns a result for each input row.
- Source: [`SRC-BIGQUERY-WINDOW-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-window-functions).
- Source quote: "for each row".
- Derived implication: Window functions are useful for diagnostic columns, but
  they do not by themselves reduce a dataset to dashboard grain.
- Related facts: [`FACT-BI-RECONCILIATION-WINDOWS`](#fact-bi-reconciliation-windows),
  [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](#fact-bi-grain-declare-before-aggregation).

### FACT-BIGQUERY-PARTITION-BY-WINDOW

- Statement: BigQuery window specifications use `PARTITION BY` to break input
  rows into separate partitions for independent window evaluation.
- Source: [`SRC-BIGQUERY-WINDOW-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-window-functions).
- Source quote: "`PARTITION BY`".
- Derived implication: Banking metrics can compute customer, branch, currency,
  or legal-entity context without collapsing rows too early.
- Related facts: [`FACT-BIGQUERY-WINDOW-PRESERVES-ROWS`](#fact-bigquery-window-preserves-rows),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](#fact-bi-reference-date-separation).

### FACT-BIGQUERY-LAST-VALUE-FRAME

- Statement: BigQuery `LAST_VALUE` returns a value from the last row in the
  current window frame, so the frame definition affects the answer.
- Source: [`SRC-BIGQUERY-NAVIGATION-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-navigation-functions).
- Source quote: "last row in the current window frame".
- Derived implication: Latest-balance tutorials should make the `ORDER BY` and
  window frame explicit when using navigation functions.
- Related facts: [`FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`](#fact-bi-semi-additive-balance-snapshot),
  [`FACT-BIGQUERY-LAST-DAY-MONTH-END`](#fact-bigquery-last-day-month-end).

### FACT-BIGQUERY-DATE-TRUNC-GRANULARITY

- Statement: BigQuery `DATE_TRUNC` truncates date-like values at a specified
  granularity such as day, week, month, quarter, or year.
- Source: [`SRC-BIGQUERY-DATE-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-date-functions).
- Source quote: "particular granularity".
- Derived implication: Month, quarter, and year dashboards should define the
  reporting period transformation in SQL, not only in chart labels.
- Related facts: [`FACT-BI-REFERENCE-DATE-SEPARATION`](#fact-bi-reference-date-separation),
  [`FACT-EBA-REFERENCE-DATES`](governance-reporting-operations.md#fact-eba-reference-dates).

### FACT-BIGQUERY-LAST-DAY-MONTH-END

- Statement: BigQuery `LAST_DAY` returns the last day in a period containing a
  date and defaults to month when no date part is supplied.
- Source: [`SRC-BIGQUERY-DATE-FUNCTIONS`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-date-functions).
- Source quote: "last day from a date expression".
- Derived implication: Month-end balance snapshots should calculate month-end
  dates explicitly instead of assuming all source dates are already period ends.
- Related facts: [`FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`](#fact-bi-semi-additive-balance-snapshot),
  [`FACT-BIGQUERY-DATE-TRUNC-GRANULARITY`](#fact-bigquery-date-trunc-granularity).

### FACT-BIGQUERY-REDUCE-BEFORE-JOIN

- Statement: BigQuery performance guidance recommends reducing the amount of
  data processed before a join, including by aggregating earlier where useful.
- Source: [`SRC-BIGQUERY-PERFORMANCE-COMPUTE`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-performance-compute).
- Source quote: "Reduce data before using a `JOIN`".
- Derived implication: Banking BI serving views should aggregate or filter large
  event tables before joining dimensions when the metric contract allows it.
- Related facts: [`FACT-BI-FANOUT-JOIN-RISK`](#fact-bi-fanout-join-risk),
  [`FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-blend-join-config).

### FACT-BIGQUERY-SELECT-LIST-NARROWING

- Statement: BigQuery performance guidance warns against `SELECT *` when only a
  subset of columns is needed.
- Source: [`SRC-BIGQUERY-PERFORMANCE-INPUT`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-performance-input).
- Source quote: "Avoid `SELECT *`".
- Derived implication: Serving views for dashboards should expose only the
  required fields for the chart purpose and access boundary.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation),
  [`FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-blend-field-subset).

### FACT-BIGQUERY-PARTITION-FILTERS

- Statement: BigQuery performance guidance for partitioned tables relies on
  filters that let the engine prune partitions.
- Source: [`SRC-BIGQUERY-PERFORMANCE-INPUT`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-performance-input).
- Source quote: "prune partitions".
- Derived implication: Banking tutorials should include business-date or
  reference-date filters when querying large partitioned fact tables.
- Related facts: [`FACT-BIGQUERY-JOBS-BYTES`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-jobs-bytes),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](#fact-bi-reference-date-separation).

### FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD

- Statement: BigQuery `SAFE_DIVIDE` behaves like division but returns `NULL`
  instead of failing when an error such as division by zero occurs.
- Source: [`SRC-BIGQUERY-MATH-SAFE-DIVIDE`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-math-safe-divide).
- Source quote: "division by zero".
- Derived implication: Ratio metrics such as approval rate, delinquency rate,
  and reconciliation variance should make zero-denominator behavior explicit in
  the metric contract.
- Related facts: [`FACT-BI-RATIO-SUM-COMPONENTS-FIRST`](#fact-bi-ratio-sum-components-first),
  [`FACT-BIGQUERY-SUM-NULLS`](#fact-bigquery-sum-nulls).

### FACT-BIGQUERY-SAFE-CAST-DQ-NULL

- Statement: BigQuery `SAFE_CAST` returns `NULL` when a runtime cast error is
  produced, rather than stopping the query.
- Source: [`SRC-BIGQUERY-CONVERSION-SAFE-CAST`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-conversion-safe-cast).
- Source quote: "returns `NULL`".
- Derived implication: Data-quality tutorials can parse messy source fields
  without crashing, but they must count and reconcile the resulting `NULL`
  values.
- Related facts: [`FACT-GDPR-ACCURACY`](privacy-gdpr.md#fact-gdpr-accuracy),
  [`FACT-BIGQUERY-SUM-NULLS`](#fact-bigquery-sum-nulls).

### FACT-BIGQUERY-QUALIFY-WINDOW-FILTER

- Statement: BigQuery `QUALIFY` filters the results of window functions after a
  window function is present in the `QUALIFY` clause or `SELECT` list.
- Source: [`SRC-BIGQUERY-QUERY-QUALIFY`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-query-qualify).
- Source quote: "filters the results of window functions".
- Derived implication: Latest-snapshot and top-N tutorials can compute row
  rankings with window functions and then filter to the intended dashboard
  grain.
- Related facts: [`FACT-BIGQUERY-WINDOW-PRESERVES-ROWS`](#fact-bigquery-window-preserves-rows),
  [`FACT-BIGQUERY-LAST-VALUE-FRAME`](#fact-bigquery-last-value-frame).

### FACT-BIGQUERY-QUALIFY-TRUE-ONLY

- Statement: BigQuery `QUALIFY` keeps only rows whose boolean expression
  evaluates to `TRUE`; rows evaluating to `NULL` or `FALSE` are discarded.
- Source: [`SRC-BIGQUERY-QUERY-QUALIFY`](../sources/platforms/bigquery-sql-bi.md#src-bigquery-query-qualify).
- Source quote: "evaluates to `TRUE`".
- Derived implication: Challenge validators should include missing-rank and
  tie-handling cases when learners filter latest records or top-N rows.
- Related facts: [`FACT-BIGQUERY-QUALIFY-WINDOW-FILTER`](#fact-bigquery-qualify-window-filter),
  [`FACT-BI-RECONCILIATION-WINDOWS`](#fact-bi-reconciliation-windows).

### FACT-LOOKER-STUDIO-AGGREGATION-METHODS

- Statement: Looker Studio fields support aggregation methods including Sum,
  Average, Count, Count Distinct, Max, Min, Auto, and None.
- Source: [`SRC-LOOKER-STUDIO-AGGREGATION`](../sources/platforms/looker-studio.md#src-looker-studio-aggregation).
- Source quote: "`Count Distinct`".
- Derived implication: Dashboard questions should ask which aggregation method
  matches the metric contract rather than accepting chart defaults blindly.
- Related facts: [`FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION`](#fact-looker-studio-default-aggregation),
  [`FACT-BIGQUERY-COUNT-DISTINCT-GRAIN`](#fact-bigquery-count-distinct-grain).

### FACT-LOOKER-STUDIO-DIMENSION-CONTEXT

- Statement: Looker Studio aggregation takes place in the context of the
  dimensions selected in a chart.
- Source: [`SRC-LOOKER-STUDIO-AGGREGATION-ARTICLE`](../sources/platforms/looker-studio.md#src-looker-studio-aggregation-article);
  [`SRC-LOOKER-STUDIO-DIMENSION`](../sources/platforms/looker-studio.md#src-looker-studio-dimension).
- Source quote: "context of a set of dimensions".
- Derived implication: A total can change when a learner adds branch, product,
  owner, or date dimensions to the same chart.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](#fact-bi-grain-declare-before-aggregation),
  [`FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-blend-more-rows).

### FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION

- Statement: Looker Studio data-source fields can have a default aggregation
  used in reports unless a chart overrides it.
- Source: [`SRC-LOOKER-STUDIO-AGGREGATION-ARTICLE`](../sources/platforms/looker-studio.md#src-looker-studio-aggregation-article).
- Source quote: "default aggregation".
- Derived implication: Metric tutorials should require learners to inspect
  default aggregation before charting balances, counts, or ratios.
- Related facts: [`FACT-LOOKER-STUDIO-AGGREGATION-METHODS`](#fact-looker-studio-aggregation-methods),
  [`FACT-BI-RATIO-SUM-COMPONENTS-FIRST`](#fact-bi-ratio-sum-components-first).

### FACT-LOOKER-STUDIO-DIMENSIONS-METRICS

- Statement: Looker Studio dimensions group data, while metrics are aggregated
  values displayed in chart context.
- Source: [`SRC-LOOKER-STUDIO-DIMENSION`](../sources/platforms/looker-studio.md#src-looker-studio-dimension);
  [`SRC-LOOKER-STUDIO-DATA-SOURCES`](../sources/platforms/looker-studio.md#src-looker-studio-data-sources).
- Source quote: "group your data".
- Derived implication: Lessons should ask learners to classify fields as
  dimensions or metrics before building banking dashboard charts.
- Related facts: [`FACT-LOOKER-STUDIO-DATA-SOURCE`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-data-source),
  [`FACT-LOOKER-STUDIO-DIMENSION-CONTEXT`](#fact-looker-studio-dimension-context).

### FACT-BI-SCD-TYPES

- Statement: Slowly Changing Dimension (SCD) types describe how dimensional
  attribute changes are recorded - type 1 overwrites the prior value, type 2
  inserts a new row per change with effective-from / effective-to dates,
  type 3 keeps current and previous values as separate columns.
- Source: [`SRC-KIMBALL-SCD`](../sources/literature/kimball-dimensional-modeling.md#src-kimball-scd).
- Source quote: "slowly changing dimensions".
- Derived implication: A dashboard that reports historical metrics by
  attribute must declare the SCD type of that attribute. A type-1 overwrite
  silently rewrites history; a type-2 split preserves it. The choice
  affects every time-series comparison.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](#fact-bi-grain-declare-before-aggregation),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](#fact-bi-reference-date-separation).

### FACT-BI-CONFORMED-DIMENSION

- Statement: A conformed dimension is a dimension table used consistently
  across multiple fact tables, with the same grain, keys, and attribute
  semantics, so metrics from those fact tables can be combined or compared on
  the conformed dimension.
- Source: [`SRC-KIMBALL-CONFORMED-DIMENSIONS`](../sources/literature/kimball-dimensional-modeling.md#src-kimball-conformed-dimensions).
- Source quote: "conformed dimensions".
- Derived implication: A banking BI program that produces multiple subject
  marts (deposits, lending, fees) should share a conformed `dim_date`,
  `dim_branch`, `dim_customer_masked`, and `dim_product`. Without conformance,
  cross-mart joins re-create the same fanout patterns at a larger scale.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](#fact-bi-grain-declare-before-aggregation),
  [`FACT-BI-FANOUT-JOIN-RISK`](#fact-bi-fanout-join-risk).

### FACT-BI-SURROGATE-KEY

- Statement: A surrogate key is a system-generated identifier used as the
  primary key of a dimension table, independent of the natural source-system
  key, so that natural-key changes (renames, merges, type-2 history) do not
  break fact-table joins.
- Source: [`SRC-KIMBALL-SURROGATE-KEYS`](../sources/literature/kimball-dimensional-modeling.md#src-kimball-surrogate-keys).
- Source quote: "surrogate keys".
- Derived implication: When `dim_branch` carries SCD-2 history, fact rows
  must reference the branch surrogate key valid at the fact's reference
  date. Joining on the natural `branch_id` would silently associate
  pre-rename activity with post-rename geography.
- Related facts: [`FACT-BI-SCD-TYPES`](#fact-bi-scd-types),
  [`FACT-BI-CONFORMED-DIMENSION`](#fact-bi-conformed-dimension).
