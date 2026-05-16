---
{
  "id": "tutorial-tutorials-quiz-bank",
  "title": "BI Foundations Self-Assessment Topics",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.3.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# BI Foundations Self-Assessment Topics

This page summarises the BI Foundations topics a banking BI learner is
expected to recall and apply without reference material. It is a study
map, not a worked example. Use it to plan focused review or to check
which areas feel weak before moving on.

Objective: be able to name each topic area, state the one-sentence rule
or definition, and recognise the typical pitfall.

After this quiz, you will be able to:

- Recognise which competency area a banking BI scenario sits in.
- Translate "I am unsure about X" into the underlying concept rather
  than the surface phrasing.
- Decide which terminology entry to revisit before retrying.

Training boundary: use synthetic training data only. The topics here are
technical learning material, not legal, regulatory, accounting, privacy,
compliance, or model-risk advice.

## Topic Map

Each bullet names a topic and the typical pitfall a beginner makes when
they have not internalised it.

### BI Modeling

- Grain (declare before aggregation): if you cannot state "one row per
  X", the metric is unsafe.
- Fanout (raw owner-join multiplies measures): joining a parent table to
  a child without aggregating first inflates totals.
- Weighted average vs average of averages: averaging averages drops the
  weight and gives a different (wrong) number.
- COUNT(\*) vs COUNT(column): COUNT(column) ignores NULL; the two
  counts diverge when the column is nullable.
- SUM(COUNT(DISTINCT)): distinct counts are not additive across groups.
- Semi-additive measures: balance snapshots cannot be summed across
  dates; pick a reference date.
- Slowly Changing Dimensions: SCD types 1, 2, 3 describe how a
  dimension records change history.
- Conformed dimensions: shared dimension keys across fact tables let
  metrics compose; non-conformed keys silently double-count.
- Surrogate vs natural key: surrogate keys decouple analytics from
  source-system identifier changes.

### BigQuery SQL And Cost

- Logical view vs materialized view: a logical view re-runs its query;
  a materialized view caches results with a best-effort refresh target.
- Partition filters / partition pruning: the partition predicate must
  appear in the query for pruning to engage.
- Clustering: orders data within a partition so range / equality
  predicates read fewer bytes.
- Query results cache: identical-text queries hit cache; non-determinism
  (e.g., `CURRENT_TIMESTAMP()`) disables it.
- Dry run / query validator: estimates bytes processed before billing.
- `INFORMATION_SCHEMA.JOBS`: source of job metadata
  (`total_bytes_processed`, `total_bytes_billed`).
- Parameterized queries: pass user input as a named parameter
  (`@selected_date`); never interpolate into SQL text.
- `SAFE_CAST` / `SAFE_DIVIDE`: NULL on failure / division by zero.
- `QUALIFY`: filter the result of a window function.
- `DATE_TRUNC` / `LAST_DAY`: month-end and period boundaries.

### BigQuery Security

- Authorized view: grants downstream access without granting underlying
  table access.
- Row-level security (`CREATE ROW ACCESS POLICY`): row visibility per
  grantee group.
- Column-level security (policy tags): masks or restricts specific
  columns by policy tag and grantee role.

### Looker Studio Mechanics

- Data source: connection plus field schema; the field type can be
  edited without touching the warehouse.
- Calculated field scope: data-source-level vs chart-level scope; chart
  scope hides the field from other charts.
- Blends: row-level join across data sources; the leftmost source is
  authoritative for rows; only the join key plus selected fields cross
  the boundary.
- Controls and parameters: a control filters charts on a shared field
  ID; a parameter passes a value back to the data source.
- Data freshness: a cache-staleness threshold (how stale a cached
  result may be before the source is re-read), not an automatic
  refresh interval.
- Credentials: owner, viewer, or service account credentials change
  whose access governs query execution.

### Privacy And Regulatory Context

- GDPR personal data and special-category data: special category
  (Article 9) is a narrower bar than "sensitive"; it covers things like
  health, biometric, or political data.
- GDPR principles: data minimisation, purpose limitation, storage
  limitation, accountability.
- Deposit guarantee (DGSD / FGDB): the grain is depositor by bank, not
  account by branch.
- DORA: ICT risk, incident reporting, third-party register.
- CRR: CET1 capital ratio and the 4.5% Article 92 minimum.
- IFRS 9: stages 1 / 2 / 3 with 12-month vs lifetime ECL.
- BCBS 239: 14 RDARR principles across governance, aggregation,
  reporting, and supervisory review.
- PSD2: strong customer authentication elements and incident
  reporting.
- AML / CFT: suspicious activity, KYC sensitivity, output minimisation
  on alert dashboards.

## Self-Assessment Pattern

For each topic, ask three questions:

1. Can I state the rule or definition in one sentence?
2. Can I describe the typical pitfall in one sentence?
3. Could I write the SQL or design step that prevents the pitfall on
   a synthetic banking scenario?

If the answer to any question is "no", revisit the relevant terminology
entry or BI mechanic before relying on the topic in applied work.
