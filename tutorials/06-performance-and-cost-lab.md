---
{
  "id": "tutorial-tutorials-06-performance-and-cost-lab",
  "title": "06 - Measure Dashboard Performance And Cost Signals",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-JOBS-BYTES",
      "FACT-BIGQUERY-JOBS-CREATION-TIME",
      "FACT-BIGQUERY-JOBS-USER-EMAIL",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-PARTITION-FILTERS",
      "FACT-BIGQUERY-SELECT-LIST-NARROWING",
      "FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-DORA-ICT-IDENTIFICATION",
      "FACT-DORA-ICT-RISK-FRAMEWORK",
      "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
      "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
      "FACT-LOOKER-STUDIO-FRESHNESS-MEMORY",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 06 - Measure Dashboard Performance And Cost Signals

Area: C - Looker Studio Dashboards

Synthetic-data boundary: measure and simulate query behavior only with the
synthetic deposits dataset. Do not inspect, export, paste, or screenshot private
billing data, job metadata, user emails, customer data, credentials, tokens, or
private report links.

Prior knowledge expected:

- A governed serving view, an executive dashboard spec, and an
  understanding that owner-joined raw rows can fanout balances.
- Awareness that a BigQuery logical view re-runs its SQL every time it is
  queried.
- Basic comfort with reading job metadata fields (bytes processed,
  bytes billed).

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: connect dashboard design choices to observable query work, then
produce a cost/freshness control record that can be reviewed without exposing
private operational metadata.

After this tutorial, you will be able to:

- Compare a broad raw source with a narrow serving source.
- Explain why
  <a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">logical views<sup>BQ</sup></a>
  still run their SQL when queried, and when to prefer a
  <a class="termRef" href="#/terminology/bigquery.md#bigquery-materialized-view">materialized view<sup>BQ</sup></a>.
- Read BigQuery job fields that matter for BI cost review.
- Draft a daily report operations control that records source, owner, query
  count, bytes, freshness, and control totals.
- Separate browser-local simulated evidence from optional live BigQuery job
  evidence.

Produces:

- Browser-first source-profile and cost-signal outputs.
- A draft `serve.bi_ops_cost_daily` design.
- Optional BigQuery job metadata query notes.
- `notes/06-performance-cost-findings.md`, if you keep external notes.

## Goal

Create this operations handoff:

| Report Date | Report Name              | Source Pattern   | Query Count | Estimated Bytes | Freshness Minutes | Owner Team | Control Total |
| ----------- | ------------------------ | ---------------- | ----------: | --------------: | ----------------: | ---------- | ------------: |
| 2026-03-31  | deposits executive daily | broad raw source |           3 |           11232 |                15 | BI Core    |         95700 |
| 2026-03-31  | deposits executive daily | serving source   |           3 |            1248 |                60 | BI Core    |         95700 |

The browser-first byte values are a deterministic simulation, not real
BigQuery billing evidence. The applied BigQuery path later shows where real job
fields come from.

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Profile the synthetic source tables:

```sql
WITH table_profiles AS (
  SELECT
    'account_daily_balances' AS table_name,
    COUNT(*) AS row_count,
    7 AS declared_columns
  FROM account_daily_balances
  UNION ALL
  SELECT 'accounts', COUNT(*), 10 FROM accounts
  UNION ALL
  SELECT 'branches', COUNT(*), 8 FROM branches
  UNION ALL
  SELECT 'account_owners', COUNT(*), 7 FROM account_owners
  UNION ALL
  SELECT 'products', COUNT(*), 8 FROM products
)
SELECT
  table_name,
  row_count,
  declared_columns,
  row_count * declared_columns AS row_column_cells
FROM table_profiles
ORDER BY table_name;
```

3. Confirm the output:

| table_name             | row_count | declared_columns | row_column_cells |
| ---------------------- | --------: | ---------------: | ---------------: |
| account_daily_balances |        18 |                7 |              126 |
| account_owners         |         9 |                7 |               63 |
| accounts               |         6 |               10 |               60 |
| branches               |         5 |                8 |               40 |
| products               |         4 |                8 |               32 |

4. Run the safe serving-source profile. This uses the branch/currency serving
   source pattern (latest snapshot per account, joined to a single owner share)
   and keeps the unmapped branch visible:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance,
    currency_code,
    source_cutoff_timestamp
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
safe_branch_currency AS (
  SELECT
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(b.ledger_balance) AS ledger_total,
    COUNT(DISTINCT b.account_id) AS account_count,
    MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM latest_balances b
  INNER JOIN accounts a
    ON b.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  GROUP BY
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  COUNT(*) AS serving_rows,
  5 AS serving_columns,
  COUNT(*) * 5 AS serving_row_column_cells,
  SUM(ledger_total) AS control_total,
  MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
FROM safe_branch_currency;
```

5. Confirm the output:

| serving_rows | serving_columns | serving_row_column_cells | control_total | source_cutoff_timestamp |
| -----------: | --------------: | -----------------------: | ------------: | ----------------------- |
|            6 |               5 |                       30 |         95700 | 2026-03-31T20:15:00Z    |

6. Compare broad dashboard queries with serving-source queries using a
   deterministic job-evidence simulation:

```sql
WITH synthetic_job_events AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'broad raw source',
        'scorecard_total_balance',
        'account_daily_balances',
        18,
        7,
        18 * 7 * 16,
        15,
        95700
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'broad raw source',
        'currency_breakdown',
        'account_daily_balances',
        18,
        7,
        18 * 7 * 16,
        15,
        95700
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'broad raw source',
        'branch_table_raw_join',
        'account_daily_balances + accounts + branches',
        18,
        25,
        18 * 25 * 16,
        15,
        95700
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'serving source',
        'scorecard_total_balance',
        'safe_branch_currency',
        6,
        5,
        6 * 5 * 16,
        60,
        95700
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'serving source',
        'currency_breakdown',
        'safe_branch_currency',
        6,
        3,
        6 * 3 * 16,
        60,
        95700
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'serving source',
        'branch_table_serving',
        'safe_branch_currency',
        6,
        5,
        6 * 5 * 16,
        60,
        95700
      )
  ) AS t(
    report_date,
    report_name,
    source_pattern,
    chart_query,
    source_name,
    rows_scanned,
    columns_scanned,
    estimated_bytes_processed,
    freshness_minutes,
    control_total
  )
)
SELECT
  source_pattern,
  COUNT(*) AS query_count,
  SUM(rows_scanned) AS rows_scanned,
  SUM(estimated_bytes_processed) AS estimated_bytes_processed,
  MAX(freshness_minutes) AS freshness_minutes,
  MAX(control_total) AS control_total
FROM synthetic_job_events
GROUP BY source_pattern
ORDER BY estimated_bytes_processed DESC;
```

7. Confirm the output:

| source_pattern   | query_count | rows_scanned | estimated_bytes_processed | freshness_minutes | control_total |
| ---------------- | ----------: | -----------: | ------------------------: | ----------------: | ------------: |
| broad raw source |           3 |           54 |                     11232 |                15 |         95700 |
| serving source   |           3 |           18 |                      1248 |                60 |         95700 |

8. Run the reduction calculation:

```sql
WITH cost_summary AS (
  SELECT * FROM (
    VALUES
      ('broad raw source', 11232),
      ('serving source', 1248)
  ) AS t(source_pattern, estimated_bytes_processed)
)
SELECT
  MAX(CASE WHEN source_pattern = 'broad raw source' THEN estimated_bytes_processed END) AS raw_estimated_bytes,
  MAX(CASE WHEN source_pattern = 'serving source' THEN estimated_bytes_processed END) AS serving_estimated_bytes,
  MAX(CASE WHEN source_pattern = 'broad raw source' THEN estimated_bytes_processed END)
    - MAX(CASE WHEN source_pattern = 'serving source' THEN estimated_bytes_processed END)
    AS estimated_bytes_reduced,
  ROUND(
    100.0 * (
      MAX(CASE WHEN source_pattern = 'broad raw source' THEN estimated_bytes_processed END)
      - MAX(CASE WHEN source_pattern = 'serving source' THEN estimated_bytes_processed END)
    )
    / MAX(CASE WHEN source_pattern = 'broad raw source' THEN estimated_bytes_processed END),
    2
  ) AS estimated_reduction_pct
FROM cost_summary;
```

9. Confirm the output:

| raw_estimated_bytes | serving_estimated_bytes | estimated_bytes_reduced | estimated_reduction_pct |
| ------------------: | ----------------------: | ----------------------: | ----------------------: |
|               11232 |                    1248 |                    9984 |                   88.89 |

10. Draft the daily operations control:

```sql
WITH bi_ops_cost_daily AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'BI Core',
        'broad raw source',
        3,
        11232,
        15,
        '2026-03-31 20:15:00',
        95700,
        'replace_with_serving_source'
      ),
      (
        DATE '2026-03-31',
        'deposits executive daily',
        'BI Core',
        'serving source',
        3,
        1248,
        60,
        '2026-03-31 20:15:00',
        95700,
        'ok'
      )
  ) AS t(
    report_date,
    report_name,
    owner_team,
    source_pattern,
    query_count,
    estimated_bytes_processed,
    freshness_minutes,
    source_cutoff_timestamp,
    control_total,
    review_status
  )
)
SELECT
  report_date,
  report_name,
  owner_team,
  source_pattern,
  query_count,
  estimated_bytes_processed,
  freshness_minutes,
  source_cutoff_timestamp,
  control_total,
  review_status
FROM bi_ops_cost_daily
ORDER BY estimated_bytes_processed DESC;
```

11. Confirm the output:

| report_date | report_name              | owner_team | source_pattern   | query_count | estimated_bytes_processed | freshness_minutes | source_cutoff_timestamp | control_total | review_status               |
| ----------- | ------------------------ | ---------- | ---------------- | ----------: | ------------------------: | ----------------: | ----------------------- | ------------: | --------------------------- |
| 2026-03-31  | deposits executive daily | BI Core    | broad raw source |           3 |                     11232 |                15 | 2026-03-31 20:15:00     |         95700 | replace_with_serving_source |
| 2026-03-31  | deposits executive daily | BI Core    | serving source   |           3 |                      1248 |                60 | 2026-03-31 20:15:00     |         95700 | ok                          |

12. Record the operating decision:
    - use the serving source for the dashboard release;
    - keep a time-windowed job-evidence query for real BigQuery reviews;
    - aggregate or redact user-level job metadata before sharing evidence
      outside the operations review;
    - document freshness settings because Looker Studio refresh behavior and
      source-table update time are not the same control.

13. Run the cost-budget failure scenario against real dataset state. Three
    different chart shapes will be costed below using the actual row and
    column counts that the workbench reports, so the failure must come from
    real query shape rather than a hand-written number:

```sql
WITH safe_serving_costed AS (
  SELECT
    'serving source baseline' AS scenario,
    COUNT(*) AS rows_scanned,
    5 AS columns_scanned,
    COUNT(*) * 5 * 16 AS estimated_bytes_processed
  FROM (
    SELECT
      b.currency_code,
      COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
      SUM(b.ledger_balance) AS ledger_total,
      COUNT(DISTINCT b.account_id) AS account_count,
      MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
    FROM account_daily_balances b
    INNER JOIN accounts a ON b.account_id = a.account_id
    LEFT JOIN branches br ON a.branch_id = br.branch_id
    WHERE b.business_date = DATE '2026-03-31'
    GROUP BY b.currency_code, COALESCE(br.city, 'UNMAPPED_BRANCH')
  ) s
),
raw_join_costed AS (
  SELECT
    'serving source plus accidental raw owner join' AS scenario,
    COUNT(*) AS rows_scanned,
    9 AS columns_scanned,
    COUNT(*) * 9 * 16 AS estimated_bytes_processed
  FROM account_daily_balances b
  INNER JOIN accounts a ON b.account_id = a.account_id
  LEFT JOIN branches br ON a.branch_id = br.branch_id
  INNER JOIN account_owners o ON b.account_id = o.account_id
),
budget AS (
  SELECT 2000 AS byte_budget
)
SELECT
  c.scenario,
  c.rows_scanned,
  c.columns_scanned,
  c.estimated_bytes_processed,
  b.byte_budget,
  c.estimated_bytes_processed - b.byte_budget AS overrun_bytes,
  CASE
    WHEN c.estimated_bytes_processed <= b.byte_budget THEN 'within_budget'
    ELSE 'over_budget_hold_release'
  END AS budget_status
FROM (
  SELECT * FROM safe_serving_costed
  UNION ALL
  SELECT * FROM raw_join_costed
) c
CROSS JOIN budget
ORDER BY c.estimated_bytes_processed;
```

14. Confirm the output. The numbers come from the actual workbench row
    counts; if a future committed dataset change adds rows, the bytes
    update automatically:

| scenario                                      | rows_scanned | columns_scanned | estimated_bytes_processed | byte_budget | overrun_bytes | budget_status            |
| --------------------------------------------- | -----------: | --------------: | ------------------------: | ----------: | ------------: | ------------------------ |
| serving source baseline                       |            6 |               5 |                       480 |        2000 |         -1520 | within_budget            |
| serving source plus accidental raw owner join |           27 |               9 |                      3888 |        2000 |          1888 | over_budget_hold_release |

The `27` row count for the raw-join scenario is the real fanout from
`account_daily_balances` (18 rows) inner-joining `account_owners`
(9 ownership rows) and produces a real over-budget signal. The
governed serving view aggregates to 6 rows and stays within budget.

15. Record the budget-failure rule in your notes: a chart that joins
    `account_owners` into the latest-day path multiplies the rows
    scanned and breaks the byte budget. The fix is upstream
    aggregation, not chart-level filters.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery and a sandbox
dataset containing the synthetic views.

1. Open BigQuery in the Google Cloud Console.
2. Confirm the dataset region before querying job metadata. Use the matching
   regional `INFORMATION_SCHEMA` location.
3. Run a time-windowed job query like this, replacing `region-eu` only if your
   sandbox dataset uses a different location:

```sql
SELECT
  creation_time,
  job_id,
  statement_type,
  total_bytes_processed,
  total_bytes_billed,
  cache_hit,
  labels
FROM `region-eu`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
  AND job_type = 'QUERY'
ORDER BY creation_time DESC
LIMIT 50;
```

4. Keep the evidence at report/source level. Do not paste user emails, private
   project names, billing exports, private labels, credentials, or private
   report links into training notes.
5. Compare real `total_bytes_processed` and `total_bytes_billed` values with
   the browser-first simulation. The exact values do not need to match because
   the browser-first bytes are an educational proxy.

### BigQuery Cost Mechanics For Cert-Track Learners

The browser-first proxy is intentionally simple
(`rows * columns * 16 bytes`). Real BigQuery on-demand cost has named
mechanics every cert-shape question expects you to know:

- BigQuery on-demand pricing is charged per TB of data processed. Only
  columns you select get scanned; unused columns do not bill. A narrow
  serving view that selects six columns from an account-day balance table
  scans far less than `SELECT *` on the raw table.
- Partitioned tables let a `WHERE` filter on the partition column skip
  whole partitions. If `account_daily_balances` were partitioned by
  `business_date` and the dashboard filtered `business_date = ...`, the
  scan would be limited to that partition.
- Clustered tables further reduce scanning by physically ordering rows
  inside a partition on cluster keys. Filters and aggregations on the
  cluster keys take less work.
- A materialized view stores precomputed results. Subsequent queries
  against the base table that match the materialized view definition can
  read the cached result and skip the underlying scan. A logical view
  always re-runs its SQL.
- Cached results: a repeated query against unchanged data can hit the
  query results cache and bill `0` bytes. The
  `INFORMATION_SCHEMA.JOBS_BY_PROJECT.cache_hit` field shows when this
  happened.
- Reservations let an organisation pay for slots (a unit of compute) per
  hour or per month instead of paying per byte processed. Reservation
  pricing changes the billing model but not the byte mechanics above.

A learner who understands the cost rules above can answer cost-shaped
exam questions even if a real billing dashboard is not available.

### Optional Looker Studio UI Path

Use this section only if the optional Looker Studio report exists.

1. Open the report data source settings for the synthetic deposit source.
2. Record these non-secret fields:
   - report name;
   - data source name;
   - source table or view name;
   - data freshness setting;
   - owner team;
   - dashboard control total.
3. Load the report once, then check BigQuery job metadata in the same time
   window.
4. If the report uses BigQuery, treat manual and automatic data refresh as query
   events that can carry normal BigQuery query cost.
5. If the report appears stale, compare the data freshness setting with the
   `source_cutoff_timestamp` field before changing SQL.

## Checkpoints

- The source profile returns 18 balance rows and 126 balance row-column cells.
- The safe serving profile returns 6 rows, 30 row-column cells, and total
  `95700`.
- The simulated broad raw source uses 11232 estimated bytes.
- The simulated serving source uses 1248 estimated bytes.
- The estimated reduction is `9984` bytes and `88.89%`.
- The operations control names an owner team, source pattern, query count,
  estimated bytes, freshness minutes, source cutoff, control total, and review
  status.
- Optional live BigQuery evidence uses a bounded time window and does not expose
  private user or billing details.

## Common Failure Modes

- Treating dashboard performance as only a chart layout problem.
- Comparing raw and serving sources without keeping the same control total.
- Forgetting that a logical view still runs its query when it is queried.
- Recommending materialized views before checking query shape, freshness needs,
  and view limitations.
- Sharing raw `user_email`, private project labels, or billing exports in
  report evidence.
- Changing Looker Studio freshness settings without documenting the dashboard
  SLA and cost tradeoff.

## Recovery Checks

- If the serving total is not `95700`, rebuild the safe serving source
  (latest snapshot per account, single owner share, left join to branches) and
  keep the branch join as a left join.
- If the browser simulation returns a different reduction, check that
  `estimated_bytes_processed` uses `rows * columns * 16` for every synthetic
  job event.
- If the optional BigQuery job query returns no rows, narrow the time window to
  the minute when the report was loaded or confirm the regional
  `INFORMATION_SCHEMA` path.
- If a live report shows stale values, inspect data freshness and source cutoff
  before assuming the SQL view is wrong.

## End Challenge

Write the release decision in this form:

`raw_bytes=<bytes>; serving_bytes=<bytes>; reduction_pct=<pct>; release_source=<source>; evidence_rule=<rule>`

Fill it in from your own browser SQL output before opening the expected
answer.

<details>
<summary>Reveal expected answer</summary>

`raw_bytes=11232; serving_bytes=1248; reduction_pct=88.89; release_source=serving_source; evidence_rule=bounded_redacted_job_metadata`

</details>

## Deliverable

Create `notes/06-performance-cost-findings.md` with:

- the source-table profile output;
- the safe serving profile output;
- the broad-versus-serving simulated job summary;
- the operations control table;
- the release decision and evidence boundary.
