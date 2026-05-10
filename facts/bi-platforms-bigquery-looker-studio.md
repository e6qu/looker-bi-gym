---
{
  "id": "facts-bi-platforms-bigquery-looker-studio",
  "title": "BI Platforms: BigQuery And Looker Studio Facts",
  "content_type": "fact_register",
  "status": "published",
  "version": "0.1.0",
  "topic": "facts",
  "tags": ["facts", "source-backed"],
}
---

# BI Platforms: BigQuery And Looker Studio Facts

These facts anchor BI platform tutorials. They are technical training notes only,
not legal, regulatory, accounting, privacy, compliance, or model-risk advice.

### FACT-BIGQUERY-LOGICAL-VIEW

- Statement: BigQuery logical views are virtual tables defined by SQL, and the
  view query runs when the view is queried.
- Source: [Google Cloud, Introduction to logical views](https://cloud.google.com/bigquery/docs/views-intro).
- Source quote: "virtual table defined by a SQL query".
- Derived implication: Serving-view tutorials should teach reusable SQL
  definitions, stable schemas, and cost expectations.
- Related facts: [`FACT-BIGQUERY-VIEW-SCOPE`](#fact-bigquery-view-scope),
  [`FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME`](#fact-bigquery-view-query-runs-each-time).

### FACT-BIGQUERY-VIEW-SCOPE

- Statement: BigQuery logical or authorized views can expose selected data and
  calculation logic without giving direct access to source datasets.
- Source: [Google Cloud, Authorized views](https://cloud.google.com/bigquery/docs/authorized-views);
  [Google Cloud, Create an authorized view](https://cloud.google.com/bigquery/docs/create-authorized-views).
- Source quote: "without giving them access".
- Derived implication: Governance tutorials should prefer curated serving views
  when raw tables contain sensitive or excessive fields.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).

### FACT-BIGQUERY-VIEW-LIMITATIONS

- Statement: BigQuery logical views are read-only and must be in the same
  location as referenced tables.
- Source: [Google Cloud, Create logical views](https://cloud.google.com/bigquery/docs/views).
- Source quote: "Views are read-only".
- Derived implication: Cloud-applied tasks should ask learners to check dataset
  region and avoid treating a logical view as a mutable staging table.
- Related facts: [`FACT-BIGQUERY-LOGICAL-VIEW`](#fact-bigquery-logical-view).

### FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME

- Statement: BigQuery runs the query defining a logical view each time the view
  is queried.
- Source: [Google Cloud, Introduction to logical views](https://cloud.google.com/bigquery/docs/views-intro).
- Source quote: "run each time".
- Derived implication: Performance tutorials should teach byte-processing
  evidence and narrow serving schemas before recommending materialized views.
- Related facts: [`FACT-BIGQUERY-JOBS-BYTES`](#fact-bigquery-jobs-bytes),
  [`FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED`](#fact-bigquery-materialized-view-precomputed).

### FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED

- Statement: BigQuery materialized views are precomputed views that periodically
  store SQL query results.
- Source: [Google Cloud, Introduction to materialized views](https://cloud.google.com/bigquery/docs/materialized-views-intro).
- Source quote: "precomputed views".
- Derived implication: Tutorials should distinguish reusable logical views from
  cached/precomputed performance structures.
- Related facts: [`FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS`](#fact-bigquery-materialized-view-limitations).

### FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS

- Statement: BigQuery materialized views have restrictions: their SQL cannot be
  updated after creation, and they cannot query logical views or wildcard tables.
- Source: [Google Cloud, Introduction to materialized views](https://cloud.google.com/bigquery/docs/materialized-views-intro).
- Source quote: "restricted SQL syntax".
- Derived implication: Performance labs should not prescribe materialized views
  until learners check query shape and refresh constraints.
- Related facts: [`FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME`](#fact-bigquery-view-query-runs-each-time).

### FACT-BIGQUERY-JOBS-BYTES

- Statement: BigQuery `INFORMATION_SCHEMA.JOBS` includes job metadata and byte
  fields such as `total_bytes_billed` and `total_bytes_processed`.
- Source: [Google Cloud, JOBS view](https://cloud.google.com/bigquery/docs/information-schema-jobs).
- Source quote: "`total_bytes_billed`".
- Derived implication: Cost/performance tutorials should ask for job metadata
  evidence, not subjective "dashboard feels faster" claims.
- Related facts: [`FACT-DORA-ICT-RISK-FRAMEWORK`](governance-reporting-operations.md#fact-dora-ict-risk-framework).

### FACT-LOOKER-STUDIO-DATA-SOURCE

- Statement: A Looker Studio data source is a conduit between external data and
  report charts/controls, and it provides the field schema used by editors.
- Source: [Google Cloud, About data sources](https://cloud.google.com/looker/docs/studio/about-data-sources).
- Source quote: "acts as a conduit".
- Derived implication: Dashboard tutorials should require learners to inspect
  data-source fields before building charts.
- Related facts: [`FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES`](#fact-looker-studio-embedded-reusable-data-sources).

### FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE

- Statement: Looker Studio data-source calculated fields are reusable, while
  chart-specific calculated fields exist only in the chart where created.
- Source: [Google Cloud, Add, edit, and troubleshoot calculated fields](https://docs.cloud.google.com/data-studio/add-edit-and-troubleshoot-calculated-fields).
- Source quote: "chart-specific calculated fields".
- Derived implication: Metrics tutorials should ask whether logic belongs
  upstream, in a reusable data source, or in one chart.
- Related facts: [`FACT-BIGQUERY-VIEW-SCOPE`](#fact-bigquery-view-scope).

### FACT-LOOKER-STUDIO-CREDENTIALS

- Statement: Looker Studio data credentials determine who can see data from a
  data source; documented options include owner's, viewer's, and service account
  credentials.
- Source: [Google Cloud, Data credentials](https://cloud.google.com/looker/docs/studio/data-credentials);
  [Google Cloud, About data sources](https://cloud.google.com/looker/docs/studio/about-data-sources).
- Source quote: "who can see its data".
- Derived implication: Cloud-evidence tasks must never ask learners to paste
  credentials into the static app.
- Related facts: [`FACT-GDPR-SECURITY-PROCESSING`](privacy-gdpr.md#fact-gdpr-security-processing).

### FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES

- Statement: Looker Studio supports embedded and reusable data sources, with
  reusable data sources supporting a consistent shared data model.
- Source: [Google Cloud, About data sources](https://cloud.google.com/looker/docs/studio/about-data-sources).
- Source quote: "reusable data sources".
- Derived implication: Capstone tutorials should prefer reusable data sources for
  governed dashboards unless a one-report artifact is intentional.
- Related facts: [`FACT-LOOKER-STUDIO-DATA-SOURCE`](#fact-looker-studio-data-source).

### FACT-LOOKER-STUDIO-BLEND-LEFTMOST

- Statement: In a blended data source, Looker Studio includes all records from
  the leftmost data source and matched records from sources to the right.
- Source: [Google Cloud, Join key](https://cloud.google.com/looker/docs/studio/join-key).
- Source quote: "leftmost data source".
- Derived implication: Blend/fanout tutorials should teach table order, join key,
  and grain before trusting totals.
- Related facts: [`FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`](#fact-looker-studio-blend-more-rows).

### FACT-LOOKER-STUDIO-BLEND-MORE-ROWS

- Statement: Looker Studio warns that blends may contain more rows than the
  original data when join conditions have multiple matches.
- Source: [Google Cloud, Blending tips and advanced concepts](https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts).
- Source quote: "more rows".
- Derived implication: The account-owner fanout challenge should be framed as a
  general BI blend/join risk, not only a SQL mistake.
- Related facts: [`FACT-BI-FANOUT-JOIN-RISK`](bi-modeling-banking.md#fact-bi-fanout-join-risk).

### FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET

- Statement: Looker Studio recommends including only the specific fields needed
  for charts in a blend.
- Source: [Google Cloud, Blending tips and advanced concepts](https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts).
- Source quote: "only include the specific fields".
- Derived implication: Tutorials should make learners trim fields before blending
  to reduce cost and accidental sensitivity.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).

### FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL

- Statement: BigQuery authorized views let a view grant selected access to data
  without granting direct table access to the underlying source dataset.
- Source: [`SRC-BIGQUERY-AUTHORIZED-VIEWS`](../sources/platforms/bigquery.md#src-bigquery-authorized-views).
- Source quote: "without giving them access".
- Derived implication: Governance lessons should separate raw-table access,
  serving-view access, and dashboard access decisions.
- Related facts: [`FACT-BIGQUERY-VIEW-SCOPE`](#fact-bigquery-view-scope),
  [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).

### FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE

- Statement: BigQuery materialized views periodically cache the results of a SQL
  query to improve performance for compatible query patterns.
- Source: [`SRC-BIGQUERY-MATERIALIZED-VIEWS`](../sources/platforms/bigquery.md#src-bigquery-materialized-views).
- Source quote: "periodically cache".
- Derived implication: Performance questions should ask learners to justify when
  cached results are appropriate versus when a logical view is enough.
- Related facts: [`FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED`](#fact-bigquery-materialized-view-precomputed),
  [`FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME`](#fact-bigquery-view-query-runs-each-time).

### FACT-BIGQUERY-JOBS-USER-EMAIL

- Statement: BigQuery `INFORMATION_SCHEMA.JOBS` exposes `user_email` in job
  metadata examples and clusters the view by `project_id` and `user_email`.
- Source: [`SRC-BIGQUERY-JOBS`](../sources/platforms/bigquery.md#src-bigquery-jobs).
- Source quote: "`user_email`".
- Derived implication: Cost-observability tutorials should aggregate or redact
  user-level job metadata when evidence is shared outside the operations team.
- Related facts: [`FACT-GDPR-PERSONAL-DATA`](privacy-gdpr.md#fact-gdpr-personal-data),
  [`FACT-BIGQUERY-JOBS-BYTES`](#fact-bigquery-jobs-bytes).

### FACT-BIGQUERY-JOBS-CREATION-TIME

- Statement: BigQuery `INFORMATION_SCHEMA.JOBS` is partitioned by
  `creation_time`, making time-window filters a natural part of job-evidence
  queries.
- Source: [`SRC-BIGQUERY-JOBS`](../sources/platforms/bigquery.md#src-bigquery-jobs).
- Source quote: "`creation_time`".
- Derived implication: Cost and freshness exercises should specify the query
  time window instead of asking for an unbounded jobs scan.
- Related facts: [`FACT-BIGQUERY-JOBS-BYTES`](#fact-bigquery-jobs-bytes),
  [`FACT-DORA-ICT-IDENTIFICATION`](governance-reporting-operations.md#fact-dora-ict-identification).

### FACT-BIGQUERY-VIEW-SAME-REGION

- Statement: BigQuery logical views must reference resources in the same
  location as the view.
- Source: [`SRC-BIGQUERY-VIEWS`](../sources/platforms/bigquery.md#src-bigquery-views).
- Source quote: "same location".
- Derived implication: Cloud-applied instructions should include dataset-region
  checks before learners create or troubleshoot views.
- Related facts: [`FACT-BIGQUERY-VIEW-LIMITATIONS`](#fact-bigquery-view-limitations),
  [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation).

### FACT-BIGQUERY-VIEW-SQL-VERSIONING

- Statement: A BigQuery logical view stores SQL as the contract for a virtual
  table, so changing the SQL changes downstream behavior even when the view name
  stays the same.
- Source: [`SRC-BIGQUERY-VIEWS-INTRO`](../sources/platforms/bigquery.md#src-bigquery-views-intro);
  [`SRC-BIGQUERY-VIEWS`](../sources/platforms/bigquery.md#src-bigquery-views).
- Source quote: "defined by a SQL query".
- Derived implication: Tutorials should require learners to version view SQL or
  keep the SQL in source-controlled lesson artifacts.
- Related facts: [`FACT-EBA-FRAMEWORK-VERSIONING`](governance-reporting-operations.md#fact-eba-framework-versioning),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).

### FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG

- Statement: Looker Studio blends require join keys and join configuration; the
  leftmost source determines the retained records for the documented default
  pattern.
- Source: [`SRC-LOOKER-STUDIO-JOIN-KEY`](../sources/platforms/looker-studio.md#src-looker-studio-join-key);
  [`SRC-LOOKER-STUDIO-BLENDS`](../sources/platforms/looker-studio.md#src-looker-studio-blends).
- Source quote: "join key".
- Derived implication: Blend challenges should make learners state join key,
  source order, fields kept, and expected fanout risk before grading totals.
- Related facts: [`FACT-LOOKER-STUDIO-BLEND-LEFTMOST`](#fact-looker-studio-blend-leftmost),
  [`FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`](#fact-looker-studio-blend-more-rows).

### FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK

- Statement: Looker Studio owner's credentials can let report viewers see data
  through the owner's access rather than their own direct access.
- Source: [`SRC-LOOKER-STUDIO-CREDENTIALS`](../sources/platforms/looker-studio.md#src-looker-studio-credentials).
- Source quote: "owner's credentials".
- Derived implication: Cloud-evidence tasks should ask for safe written
  descriptions of credential mode rather than screenshots or pasted credentials.
- Related facts: [`FACT-LOOKER-STUDIO-CREDENTIALS`](#fact-looker-studio-credentials),
  [`FACT-GDPR-SECURITY-PROCESSING`](privacy-gdpr.md#fact-gdpr-security-processing).

### FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS

- Statement: Looker Studio viewer credentials use the report viewer's access to
  determine what data the viewer can see.
- Source: [`SRC-LOOKER-STUDIO-CREDENTIALS`](../sources/platforms/looker-studio.md#src-looker-studio-credentials).
- Source quote: "viewer credentials".
- Derived implication: Access-control tutorials should ask learners to explain
  owner-versus-viewer credential tradeoffs for a synthetic banking dashboard.
- Related facts: [`FACT-LOOKER-STUDIO-CREDENTIALS`](#fact-looker-studio-credentials),
  [`FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL`](#fact-bigquery-authorized-view-access-control).

### FACT-LOOKER-STUDIO-FIELD-TYPES

- Statement: Looker Studio data sources expose fields and field properties that
  report editors use when building charts and calculated fields.
- Source: [`SRC-LOOKER-STUDIO-DATA-SOURCES`](../sources/platforms/looker-studio.md#src-looker-studio-data-sources);
  [`SRC-LOOKER-STUDIO-CALCULATED-FIELDS`](../sources/platforms/looker-studio.md#src-looker-studio-calculated-fields).
- Source quote: "field schema".
- Derived implication: Dashboard lessons should require learners to inspect
  field type, aggregation, and calculation location before chart creation.
- Related facts: [`FACT-LOOKER-STUDIO-DATA-SOURCE`](#fact-looker-studio-data-source),
  [`FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`](#fact-looker-studio-calculated-field-scope).
