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
- Related facts: [`FACT-APP-FRONTEND-ONLY`](project-architecture.md#fact-app-frontend-only).

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
- Related facts: [`FACT-DATASET-OWNER-FANOUT-TRAP`](project-architecture.md#fact-dataset-owner-fanout-trap).

### FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET

- Statement: Looker Studio recommends including only the specific fields needed
  for charts in a blend.
- Source: [Google Cloud, Blending tips and advanced concepts](https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts).
- Source quote: "only include the specific fields".
- Derived implication: Tutorials should make learners trim fields before blending
  to reduce cost and accidental sensitivity.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).
