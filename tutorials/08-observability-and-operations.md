---
{
  "id": "tutorial-tutorials-08-observability-and-operations",
  "title": "08 - Operate Dashboard Freshness, Cost, And Controls",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-RECONCILIATION-WINDOWS",
      "FACT-BIGQUERY-JOBS-BYTES",
      "FACT-BIGQUERY-JOBS-CREATION-TIME",
      "FACT-BIGQUERY-JOBS-USER-EMAIL",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY",
      "FACT-DORA-ICT-IDENTIFICATION",
      "FACT-DORA-ICT-RISK-FRAMEWORK",
      "FACT-DORA-INCIDENTS",
      "FACT-EBA-DPM-VALIDATION-RULES",
      "FACT-EBA-FRAMEWORK-VERSIONING",
      "FACT-EBA-REFERENCE-DATES",
      "FACT-GDPR-ACCURACY",
      "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
      "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
      "FACT-LOOKER-STUDIO-FRESHNESS-MEMORY",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 08 - Operate Dashboard Freshness, Cost, And Controls

Area: D - Governance, Security, And Operations

Synthetic-data boundary: use only synthetic source rows and deterministic
operations examples. Do not copy production incident records, job logs, user
emails, reconciliation breaks, report links, credentials, keys, screenshots of
access settings, or customer data into evidence notes.

Builds on:

- [03 - Build The First Executive Dashboard](03-first-executive-dashboard.md)
- [06 - Measure Dashboard Performance And Cost Signals](06-performance-and-cost-lab.md)
- [07 - Govern Dashboard Access, Fields, And Sharing](07-governance-security-and-sharing.md)

Required tools:

- Browser-first path: this website and the browser SQL workbench.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: operate the executive deposit dashboard as a BI product with named
dependencies, owners, freshness evidence, cost evidence, reconciliation checks,
incident triage, and validation/reference-date notes.

After this tutorial, you will be able to:

- Build a dependency register for a dashboard, serving source, raw tables, and
  evidence controls.
- Check source freshness against a report SLA.
- Compare simulated BigQuery job bytes with report source choices.
- Reconcile dashboard totals back to the source ledger total.
- Classify operational events without copying private logs.
- Tie validation evidence to a reference date, rule name, owner, and outcome.

Produces:

- Browser-first dependency, freshness, cost, reconciliation, incident, and
  validation outputs.
- A draft `serve.bi_dependency_register` design.
- A draft `serve.bi_operations_daily` design.
- Optional BigQuery job-metadata and Looker Studio freshness notes.
- `notes/08-bi-operations.md`, if you keep external notes.

## Source Facts

This material is backed by source notes for DORA-style dependency and incident
documentation, BigQuery job metadata, Looker Studio data freshness, dashboard
refresh cost, reconciliation windows, GDPR accuracy, and EBA reporting
framework validation/reference-date concepts.

## Goal

Create this daily operations record:

| Report Date | Report Name              | Dependencies | Freshness Status | Reconciliation Delta | Estimated Bytes | Open Items |
| ----------- | ------------------------ | -----------: | ---------------- | -------------------: | --------------: | ---------: |
| 2026-03-31  | deposits executive daily |            6 | ok               |                    0 |            1248 |          1 |

The browser-first path uses deterministic evidence. The optional applied path
shows where equivalent BigQuery and Looker Studio evidence comes from when a
sandbox cloud environment exists.

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Draft the dependency register:

```sql
WITH bi_dependency_register AS (
  SELECT * FROM (
    VALUES
      (
        'raw_deposits.account_daily_balances',
        'source_table',
        'BI Data Engineering',
        'daily_balance_snapshots',
        'missing_or_late_snapshot',
        'source_cutoff_timestamp'
      ),
      (
        'raw_deposits.accounts',
        'source_table',
        'BI Data Engineering',
        'account_attributes',
        'missing_branch_or_identifier_exposure',
        'schema_review'
      ),
      (
        'raw_deposits.branches',
        'source_table',
        'Branch Data Steward',
        'branch_geography',
        'unmapped_branch',
        'left_join_unmapped_count'
      ),
      (
        'serve.safe_governed_deposit_summary',
        'serving_view',
        'BI Core',
        'aggregate_dashboard_source',
        'wrong_total_or_stale_source',
        'control_total_and_freshness'
      ),
      (
        'looker_studio.deposits_executive_daily',
        'report',
        'BI Core',
        'executive_dashboard',
        'stale_or_unreconciled_report',
        'report_release_register'
      ),
      (
        'serve.bi_operations_daily',
        'control_table',
        'BI Operations',
        'daily_evidence',
        'missing_signoff',
        'daily_operations_check'
      )
  ) AS t(
    dependency_name,
    dependency_type,
    owner_team,
    purpose,
    failure_mode,
    primary_control
  )
)
SELECT
  dependency_type,
  COUNT(*) AS dependency_count,
  STRING_AGG(owner_team, ', ' ORDER BY owner_team) AS owner_teams
FROM bi_dependency_register
GROUP BY dependency_type
ORDER BY dependency_type;
```

3. Confirm the output:

| dependency_type | dependency_count | owner_teams                                                   |
| --------------- | ---------------: | ------------------------------------------------------------- |
| control_table   |                1 | BI Operations                                                 |
| report          |                1 | BI Core                                                       |
| serving_view    |                1 | BI Core                                                       |
| source_table    |                3 | BI Data Engineering, BI Data Engineering, Branch Data Steward |

4. Run the freshness control. The report refresh timestamp is deterministic for
   this exercise:

```sql
WITH latest_source AS (
  SELECT
    DATE '2026-03-31' AS report_date,
    MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
freshness_control AS (
  SELECT
    report_date,
    'deposits executive daily' AS report_name,
    source_cutoff_timestamp,
    '2026-03-31T21:00:00Z' AS report_refresh_timestamp,
    90 AS sla_minutes,
    45 AS observed_lag_minutes
  FROM latest_source
)
SELECT
  report_date,
  report_name,
  source_cutoff_timestamp,
  report_refresh_timestamp,
  sla_minutes,
  observed_lag_minutes,
  CASE
    WHEN observed_lag_minutes <= sla_minutes THEN 'ok'
    ELSE 'late'
  END AS freshness_status
FROM freshness_control;
```

5. Confirm the output:

| report_date | report_name              | source_cutoff_timestamp | report_refresh_timestamp | sla_minutes | observed_lag_minutes | freshness_status |
| ----------- | ------------------------ | ----------------------- | ------------------------ | ----------: | -------------------: | ---------------- |
| 2026-03-31  | deposits executive daily | 2026-03-31T20:15:00Z    | 2026-03-31T21:00:00Z     |          90 |                   45 | ok               |

6. Record simulated job-byte evidence for the serving source:

```sql
WITH serving_job_events AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'scorecard_total_balance',
        'safe_governed_deposit_summary',
        480,
        6,
        5
      ),
      (
        DATE '2026-03-31',
        'currency_breakdown',
        'safe_governed_deposit_summary',
        288,
        6,
        3
      ),
      (
        DATE '2026-03-31',
        'branch_table_serving',
        'safe_governed_deposit_summary',
        480,
        6,
        5
      )
  ) AS t(
    report_date,
    chart_query,
    source_name,
    estimated_bytes_processed,
    rows_scanned,
    columns_scanned
  )
)
SELECT
  report_date,
  source_name,
  COUNT(*) AS query_count,
  SUM(estimated_bytes_processed) AS estimated_bytes_processed,
  SUM(rows_scanned) AS rows_scanned,
  MAX(columns_scanned) AS widest_select_list
FROM serving_job_events
GROUP BY
  report_date,
  source_name;
```

7. Confirm the output:

| report_date | source_name                   | query_count | estimated_bytes_processed | rows_scanned | widest_select_list |
| ----------- | ----------------------------- | ----------: | ------------------------: | -----------: | -----------------: |
| 2026-03-31  | safe_governed_deposit_summary |           3 |                      1248 |           18 |                  5 |

8. Run the reconciliation control against the governed source:

```sql
WITH safe_governed_deposit_summary AS (
  SELECT
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(b.ledger_balance) AS ledger_total
  FROM account_daily_balances b
  INNER JOIN accounts a
    ON b.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  WHERE b.business_date = DATE '2026-03-31'
  GROUP BY
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
),
dashboard_scorecard AS (
  SELECT
    DATE '2026-03-31' AS report_date,
    'deposits executive daily' AS report_name,
    95700 AS dashboard_total
),
source_control AS (
  SELECT
    SUM(ledger_total) AS source_total
  FROM safe_governed_deposit_summary
)
SELECT
  d.report_date,
  d.report_name,
  s.source_total,
  d.dashboard_total,
  d.dashboard_total - s.source_total AS reconciliation_delta,
  0 AS tolerance,
  CASE
    WHEN ABS(d.dashboard_total - s.source_total) <= 0 THEN 'pass'
    ELSE 'investigate'
  END AS reconciliation_status
FROM dashboard_scorecard d
CROSS JOIN source_control s;
```

9. Confirm the output:

| report_date | report_name              | source_total | dashboard_total | reconciliation_delta | tolerance | reconciliation_status |
| ----------- | ------------------------ | -----------: | --------------: | -------------------: | --------: | --------------------- |
| 2026-03-31  | deposits executive daily |        95700 |           95700 |                    0 |         0 | pass                  |

10. Classify operational events without copying private logs:

```sql
WITH operational_events AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'freshness_lag_minutes',
        110,
        90,
        'refresh_pipeline',
        'BI Operations'
      ),
      (
        DATE '2026-03-31',
        'control_total_delta',
        0,
        0,
        'serving_source_reconciliation',
        'BI Core'
      ),
      (
        DATE '2026-03-31',
        'sensitive_field_exposure_count',
        0,
        0,
        'data_source_field_review',
        'BI Core'
      )
  ) AS t(
    report_date,
    event_name,
    observed_value,
    threshold_value,
    evidence_area,
    owner_team
  )
)
SELECT
  report_date,
  event_name,
  observed_value,
  threshold_value,
  owner_team,
  CASE
    WHEN event_name = 'freshness_lag_minutes'
      AND observed_value > threshold_value
      THEN 'warn'
    WHEN event_name <> 'freshness_lag_minutes'
      AND observed_value > threshold_value
      THEN 'warn'
    ELSE 'ok'
  END AS event_status,
  CASE
    WHEN event_name = 'freshness_lag_minutes'
      AND observed_value > threshold_value
      THEN 'investigate_refresh_pipeline'
    WHEN event_name <> 'freshness_lag_minutes'
      AND observed_value > threshold_value
      THEN 'open_control_review'
    ELSE 'no_incident'
  END AS action
FROM operational_events
ORDER BY event_name;
```

11. Confirm the output:

| report_date | event_name                     | observed_value | threshold_value | owner_team    | event_status | action                       |
| ----------- | ------------------------------ | -------------: | --------------: | ------------- | ------------ | ---------------------------- |
| 2026-03-31  | control_total_delta            |              0 |               0 | BI Core       | ok           | no_incident                  |
| 2026-03-31  | freshness_lag_minutes          |            110 |              90 | BI Operations | warn         | investigate_refresh_pipeline |
| 2026-03-31  | sensitive_field_exposure_count |              0 |               0 | BI Core       | ok           | no_incident                  |

12. Add reference-date validation evidence:

```sql
WITH validation_evidence AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'V-DEPOSIT-CONTROL-001',
        'ledger_total_equals_dashboard_total',
        '3.5',
        95700,
        95700,
        0,
        'BI Core'
      ),
      (
        DATE '2026-03-31',
        'V-FRESHNESS-SLA-001',
        'source_cutoff_within_report_sla',
        '3.5',
        45,
        90,
        0,
        'BI Operations'
      )
  ) AS t(
    reference_date,
    validation_rule_id,
    validation_rule_name,
    framework_version,
    observed_value,
    expected_value,
    failing_rows,
    owner_team
  )
)
SELECT
  reference_date,
  validation_rule_id,
  validation_rule_name,
  framework_version,
  failing_rows,
  owner_team,
  CASE
    WHEN failing_rows = 0 THEN 'pass'
    ELSE 'fail'
  END AS validation_status
FROM validation_evidence
ORDER BY validation_rule_id;
```

13. Confirm the output:

| reference_date | validation_rule_id    | validation_rule_name                | framework_version | failing_rows | owner_team    | validation_status |
| -------------- | --------------------- | ----------------------------------- | ----------------- | -----------: | ------------- | ----------------- |
| 2026-03-31     | V-DEPOSIT-CONTROL-001 | ledger_total_equals_dashboard_total | 3.5               |            0 | BI Core       | pass              |
| 2026-03-31     | V-FRESHNESS-SLA-001   | source_cutoff_within_report_sla     | 3.5               |            0 | BI Operations | pass              |

14. Produce the daily operations summary:

```sql
WITH operations_summary AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'deposits executive daily',
        6,
        'ok',
        0,
        1248,
        1,
        'aggregate_no_private_logs'
      )
  ) AS t(
    report_date,
    report_name,
    dependency_count,
    freshness_status,
    reconciliation_delta,
    estimated_bytes_processed,
    open_items,
    evidence_rule
  )
)
SELECT
  report_date,
  report_name,
  dependency_count,
  freshness_status,
  reconciliation_delta,
  estimated_bytes_processed,
  open_items,
  evidence_rule
FROM operations_summary;
```

15. Confirm the output:

| report_date | report_name              | dependency_count | freshness_status | reconciliation_delta | estimated_bytes_processed | open_items | evidence_rule             |
| ----------- | ------------------------ | ---------------: | ---------------- | -------------------: | ------------------------: | ---------: | ------------------------- |
| 2026-03-31  | deposits executive daily |                6 | ok               |                    0 |                      1248 |          1 | aggregate_no_private_logs |

16. Record the operating decision:
    - keep the dashboard in service because freshness and reconciliation pass;
    - keep one open operations item for the simulated freshness breach event;
    - aggregate or redact job metadata before sharing evidence outside the
      operations review;
    - keep reference date, validation rule, owner, and outcome together;
    - never paste raw logs, user emails, private report links, credentials, or
      customer data into operations notes.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery and a sandbox
project containing the synthetic serving view.

1. Open BigQuery in the Google Cloud Console.
2. Confirm the dataset location. Query the matching regional
   `INFORMATION_SCHEMA` view for a bounded time window:

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

3. Confirm that the evidence you keep is bounded to the review window and
   excludes private user-level detail unless the operations review explicitly
   requires it.
4. Compare the job evidence for the serving source with the browser-first
   expected summary: three dashboard queries and `1248` simulated bytes.
5. Record only aggregate job counts, byte totals, source name, cache behavior,
   labels, review window, owner, and review result.

### Optional Looker Studio UI Path

Use this section only if you have browser UI access to Looker Studio and a
sandbox BigQuery data source.

1. Open the report data source for `safe_governed_deposit_summary`.
2. Inspect the data freshness setting.
3. Confirm that the setting matches the report SLA. For this tutorial, the
   operating SLA is `90` minutes or less from source cutoff to report refresh.
4. Open the report and confirm the visible freshness label or equivalent
   freshness note.
5. Record the data-source name, freshness setting, report refresh evidence,
   control total, and owner team. Do not copy private report links, user emails,
   access screenshots, credentials, or tokens.

## Checkpoints

- The dependency register contains six dependencies and every dependency has an
  owner team.
- The freshness control returns `freshness_status = ok` for the report summary.
- The serving-source job evidence totals `1248` simulated bytes across three
  dashboard queries.
- The reconciliation delta is `0`.
- Operational events create one open item for freshness investigation and no
  open item for the control total or sensitive-field exposure checks.
- Validation evidence includes reference date, rule ID, framework version,
  owner, failing rows, and status.

## Common Failure Modes

- Monitoring report uptime while ignoring source cutoff timestamps.
- Keeping job metadata at user or query text level when aggregate byte totals
  are enough for the review.
- Recording a dashboard number without the source control total.
- Treating a freshness breach as a chart formatting problem instead of an
  upstream data or refresh problem.
- Keeping validation rules in prose without reference dates, versions, owners,
  and failing-row counts.
- Copying real incident records, emails, report links, logs, keys, or customer
  fields into evidence notes.

## Recovery Checks

- If the dependency count is not six, rerun the register query and check that
  raw source tables, serving view, report, and control table are all present.
- If the source cutoff timestamp differs, confirm that the date filter is
  `DATE '2026-03-31'`.
- If the reconciliation total is not `95700`, rerun the governed-source query
  and confirm the branch join is a `LEFT JOIN` with `UNMAPPED_BRANCH`.
- If estimated bytes do not total `1248`, check that the three serving job
  events use `480`, `288`, and `480`.
- If open items do not equal one, check that only the freshness event has
  observed value greater than threshold.

## End Challenge

Prepare the daily operations handoff for the executive deposit dashboard. The
handoff passes when it includes exactly this evidence:

- `dependencies=6`
- `freshness_status=ok`
- `reconciliation_delta=0`
- `bytes_total=1248`
- `incident_open_items=1`
- `validation_failures=0`
- `evidence_rule=aggregate_no_private_logs`

## Deliverable

Create `notes/08-bi-operations.md`, if you keep external notes, with:

- the dependency register summary;
- the freshness control output;
- the simulated job-byte summary;
- the reconciliation control output;
- the incident triage output;
- the reference-date validation evidence;
- the end-challenge evidence string.
