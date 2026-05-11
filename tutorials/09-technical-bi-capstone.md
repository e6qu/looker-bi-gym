---
{
  "id": "tutorial-tutorials-09-technical-bi-capstone",
  "title": "09 - Assemble The Banking BI Capstone Package",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-FANOUT-JOIN-RISK",
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BI-RECONCILIATION-WINDOWS",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
      "FACT-BIGQUERY-JOBS-BYTES",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY",
      "FACT-DORA-ICT-IDENTIFICATION",
      "FACT-DORA-ICT-RISK-FRAMEWORK",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
      "FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK",
      "FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 09 - Assemble The Banking BI Capstone Package

Area: E - Capstone

Synthetic-data boundary: use only the predefined synthetic datasets and
deterministic evidence in this lesson. Do not use real banking data,
credentials, private report links, customer screenshots, production exports,
private IAM evidence, user emails, or raw operational logs.

Builds on:

- [02 - Build A BI-Friendly Deposit Model](02-build-a-bi-friendly-model.md)
- [03 - Build The First Executive Dashboard](03-first-executive-dashboard.md)
- [04 - Define Governed Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)
- [05 - Compare Blends With Upstream Joins](05-blending-vs-upstream-joins.md)
- [06 - Measure Dashboard Performance And Cost Signals](06-performance-and-cost-lab.md)
- [07 - Govern Dashboard Access, Fields, And Sharing](07-governance-security-and-sharing.md)
- [08 - Operate Dashboard Freshness, Cost, And Controls](08-observability-and-operations.md)

Required tools:

- Browser-first path: this website and the browser SQL workbench.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: assemble a reviewer-ready banking BI capstone package with governed
serving outputs, metric contracts, dashboard page specifications, privacy and
credential controls, operations evidence, and a scored review rubric.

After this tutorial, you will be able to:

- Build a capstone artifact checklist from concrete BI deliverables.
- Produce deterministic source totals, model totals, and dashboard controls.
- State metric contracts with grain, formula, owner, allowed dimensions, and
  release status.
- Attach governance, credential, and sensitive-field controls to each page.
- Score a capstone package with an explicit rubric and remediation rule.

Produces:

- Browser-first capstone package checklist.
- Metric contract register.
- Dashboard page specification.
- Governance and operations evidence summary.
- Rubric score and review workflow.
- `notes/09-capstone-package.md`, if you keep external notes.

## Source Facts

This material is backed by source notes for BI grain and fanout, semi-additive
balances, reconciliation windows, BigQuery views and job evidence, Looker Studio
data sources and credential modes, GDPR minimisation and pseudonymisation, FGDB
depositor-bank grain context, and DORA-style dependency and operations
documentation.

## Goal

Create this capstone review result:

| Package Date | Package Name             | Required Artifacts | Ready Artifacts | Rubric Score | Review Status |
| ------------ | ------------------------ | -----------------: | --------------: | -----------: | ------------- |
| 2026-03-31   | deposits executive BI v1 |                  8 |               8 |          100 | ready         |

The browser-first path builds the evidence with deterministic SQL. The optional
applied path maps the same package to BigQuery views and Looker Studio report
checks if a sandbox cloud environment exists.

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Build the capstone artifact checklist:

```sql
WITH capstone_artifacts AS (
  SELECT * FROM (
    VALUES
      (
        'A01',
        'source_profile',
        'table grains, row counts, and latest snapshot controls',
        'ready',
        10
      ),
      (
        'A02',
        'safe_serving_source',
        'branch/currency aggregate with no account or customer identifiers',
        'ready',
        15
      ),
      (
        'A03',
        'metric_contracts',
        'grain, formula, owner, allowed dimensions, and caveats',
        'ready',
        15
      ),
      (
        'A04',
        'dashboard_page_specs',
        'executive KPI, branch/currency table, and freshness label',
        'ready',
        15
      ),
      (
        'A05',
        'fanout_proof',
        'owner-join overstatement and upstream repair decision',
        'ready',
        10
      ),
      (
        'A06',
        'governance_controls',
        'sensitive-field exclusion and credential-mode decision',
        'ready',
        15
      ),
      (
        'A07',
        'operations_evidence',
        'freshness, bytes, dependencies, reconciliation, and open items',
        'ready',
        15
      ),
      (
        'A08',
        'review_handoff',
        'rubric score, remediation rule, and credential-free evidence',
        'ready',
        5
      )
  ) AS t(
    artifact_id,
    artifact_name,
    required_evidence,
    artifact_status,
    rubric_points
  )
)
SELECT
  artifact_status,
  COUNT(*) AS artifact_count,
  SUM(rubric_points) AS rubric_points
FROM capstone_artifacts
GROUP BY artifact_status;
```

3. Confirm the output:

| artifact_status | artifact_count | rubric_points |
| --------------- | -------------: | ------------: |
| ready           |              8 |           100 |

4. Produce the governed capstone source:

```sql
WITH latest_balances AS (
  SELECT
    business_date,
    account_id,
    ledger_balance,
    currency_code,
    source_cutoff_timestamp
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
capstone_serving_source AS (
  SELECT
    b.business_date,
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
    b.business_date,
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  business_date,
  currency_code,
  branch_city,
  ledger_total,
  account_count,
  source_cutoff_timestamp
FROM capstone_serving_source
ORDER BY
  currency_code,
  branch_city;
```

5. Confirm the output:

| business_date | currency_code | branch_city     | ledger_total | account_count | source_cutoff_timestamp |
| ------------- | ------------- | --------------- | -----------: | ------------: | ----------------------- |
| 2026-03-31    | EUR           | Brasov          |         7100 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | EUR           | Cluj-Napoca     |         9300 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Bucuresti       |        43000 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Iasi            |        19000 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Timisoara       |        12300 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | UNMAPPED_BRANCH |         5000 |             1 | 2026-03-31T20:15:00Z    |

6. Run the capstone source controls:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance,
    currency_code
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
source_controls AS (
  SELECT
    SUM(ledger_balance) AS control_total,
    COUNT(DISTINCT account_id) AS account_count,
    SUM(CASE WHEN currency_code = 'RON' THEN ledger_balance ELSE 0 END) AS ron_total,
    SUM(CASE WHEN currency_code = 'EUR' THEN ledger_balance ELSE 0 END) AS eur_total
  FROM latest_balances
),
unsafe_owner_join AS (
  SELECT
    SUM(b.ledger_balance) AS naive_owner_join_total
  FROM latest_balances b
  INNER JOIN account_owners o
    ON b.account_id = o.account_id
)
SELECT
  s.control_total,
  s.account_count,
  s.ron_total,
  s.eur_total,
  u.naive_owner_join_total,
  u.naive_owner_join_total - s.control_total AS fanout_delta
FROM source_controls s
CROSS JOIN unsafe_owner_join u;
```

7. Confirm the output:

| control_total | account_count | ron_total | eur_total | naive_owner_join_total | fanout_delta |
| ------------: | ------------: | --------: | --------: | ---------------------: | -----------: |
|         95700 |             6 |     79300 |     16400 |                 164800 |        69100 |

8. Draft the metric contract register:

```sql
WITH metric_contracts AS (
  SELECT * FROM (
    VALUES
      (
        'M01',
        'latest_total_ledger_balance',
        'account_daily_balance_snapshot',
        'SUM(ledger_balance) at business_date 2026-03-31',
        'BI Core',
        'currency_code, branch_city',
        95700,
        'ready'
      ),
      (
        'M02',
        'latest_account_count',
        'account_daily_balance_snapshot',
        'COUNT(DISTINCT account_id) at business_date 2026-03-31',
        'BI Core',
        'currency_code, branch_city',
        6,
        'ready'
      ),
      (
        'M03',
        'ron_ledger_total',
        'account_daily_balance_snapshot',
        'SUM(ledger_balance) where currency_code = RON',
        'BI Core',
        'branch_city',
        79300,
        'ready'
      ),
      (
        'M04',
        'eur_ledger_total',
        'account_daily_balance_snapshot',
        'SUM(ledger_balance) where currency_code = EUR',
        'BI Core',
        'branch_city',
        16400,
        'ready'
      )
  ) AS t(
    metric_id,
    metric_name,
    grain,
    formula,
    owner_team,
    allowed_dimensions,
    expected_value,
    release_status
  )
)
SELECT
  metric_id,
  metric_name,
  grain,
  owner_team,
  expected_value,
  release_status
FROM metric_contracts
ORDER BY metric_id;
```

9. Confirm the output:

| metric_id | metric_name                 | grain                          | owner_team | expected_value | release_status |
| --------- | --------------------------- | ------------------------------ | ---------- | -------------: | -------------- |
| M01       | latest_total_ledger_balance | account_daily_balance_snapshot | BI Core    |          95700 | ready          |
| M02       | latest_account_count        | account_daily_balance_snapshot | BI Core    |              6 | ready          |
| M03       | ron_ledger_total            | account_daily_balance_snapshot | BI Core    |          79300 | ready          |
| M04       | eur_ledger_total            | account_daily_balance_snapshot | BI Core    |          16400 | ready          |

10. Build the dashboard page specification:

```sql
WITH dashboard_pages AS (
  SELECT * FROM (
    VALUES
      (
        'Executive KPI Overview',
        'capstone_serving_source',
        'scorecard_total_balance, scorecard_account_count, freshness_label',
        95700,
        6,
        '2026-03-31T20:15:00Z',
        'ready'
      ),
      (
        'Branch Currency Details',
        'capstone_serving_source',
        'branch_currency_table, currency_filter',
        95700,
        6,
        '2026-03-31T20:15:00Z',
        'ready'
      ),
      (
        'Governance And Operations',
        'capstone_registers',
        'field_exclusion_table, credential_mode, operations_summary',
        95700,
        6,
        '2026-03-31T20:15:00Z',
        'ready'
      )
  ) AS t(
    page_name,
    approved_source,
    required_components,
    control_total,
    account_count,
    source_cutoff_timestamp,
    page_status
  )
)
SELECT
  page_name,
  approved_source,
  control_total,
  account_count,
  source_cutoff_timestamp,
  page_status
FROM dashboard_pages
ORDER BY page_name;
```

11. Confirm the output:

| page_name                 | approved_source         | control_total | account_count | source_cutoff_timestamp | page_status |
| ------------------------- | ----------------------- | ------------: | ------------: | ----------------------- | ----------- |
| Branch Currency Details   | capstone_serving_source |         95700 |             6 | 2026-03-31T20:15:00Z    | ready       |
| Executive KPI Overview    | capstone_serving_source |         95700 |             6 | 2026-03-31T20:15:00Z    | ready       |
| Governance And Operations | capstone_registers      |         95700 |             6 | 2026-03-31T20:15:00Z    | ready       |

12. Build the governance and operations evidence summary:

```sql
WITH capstone_controls AS (
  SELECT * FROM (
    VALUES
      (
        'field_minimisation',
        'excluded_sensitive_fields',
        4,
        4,
        'pass'
      ),
      (
        'credential_boundary',
        'viewer_credentials_or_authorized_view',
        1,
        1,
        'pass'
      ),
      (
        'operations_freshness',
        'freshness_status_ok',
        1,
        1,
        'pass'
      ),
      (
        'operations_reconciliation',
        'reconciliation_delta_zero',
        0,
        0,
        'pass'
      ),
      (
        'operations_cost',
        'serving_source_estimated_bytes',
        1248,
        1248,
        'pass'
      ),
      (
        'operations_open_items',
        'freshness_investigation_items',
        1,
        1,
        'pass'
      )
  ) AS t(
    control_area,
    control_name,
    observed_value,
    expected_value,
    control_status
  )
)
SELECT
  control_area,
  control_name,
  observed_value,
  expected_value,
  control_status
FROM capstone_controls
ORDER BY control_area;
```

13. Confirm the output:

| control_area              | control_name                          | observed_value | expected_value | control_status |
| ------------------------- | ------------------------------------- | -------------: | -------------: | -------------- |
| credential_boundary       | viewer_credentials_or_authorized_view |              1 |              1 | pass           |
| field_minimisation        | excluded_sensitive_fields             |              4 |              4 | pass           |
| operations_cost           | serving_source_estimated_bytes        |           1248 |           1248 | pass           |
| operations_freshness      | freshness_status_ok                   |              1 |              1 | pass           |
| operations_open_items     | freshness_investigation_items         |              1 |              1 | pass           |
| operations_reconciliation | reconciliation_delta_zero             |              0 |              0 | pass           |

14. Score the capstone rubric:

```sql
WITH capstone_rubric AS (
  SELECT * FROM (
    VALUES
      ('source_profile', 10, 10, 'row counts, latest snapshot, and grain documented'),
      ('serving_source', 15, 15, 'safe branch/currency source matches control total'),
      ('metric_contracts', 15, 15, 'metric grain, formula, owner, and dimensions stated'),
      ('dashboard_spec', 15, 15, 'pages list approved source, components, and controls'),
      ('fanout_review', 10, 10, 'owner-join overstatement and upstream repair shown'),
      ('governance', 15, 15, 'sensitive fields excluded and credential mode justified'),
      ('operations', 15, 15, 'freshness, bytes, reconciliation, dependencies, and open item recorded'),
      ('handoff', 5, 5, 'review note avoids credentials, private links, and raw logs')
  ) AS t(rubric_area, max_points, awarded_points, evidence)
),
score AS (
  SELECT
    SUM(max_points) AS max_points,
    SUM(awarded_points) AS awarded_points
  FROM capstone_rubric
)
SELECT
  max_points,
  awarded_points,
  ROUND(100.0 * awarded_points / max_points, 2) AS score_pct,
  CASE
    WHEN awarded_points >= 85 THEN 'ready'
    WHEN awarded_points >= 70 THEN 'remediate_then_review'
    ELSE 'not_ready'
  END AS review_status
FROM score;
```

15. Confirm the output:

| max_points | awarded_points | score_pct | review_status |
| ---------: | -------------: | --------: | ------------- |
|        100 |            100 |    100.00 | ready         |

16. Record the review workflow:
    - rerun the source controls before every review;
    - compare each metric contract with the dashboard page specification;
    - reject the package if a dashboard page uses raw identifiers or a
      chart-only metric with no contract;
    - reject the package if the reconciliation delta is not `0` and no
      approved tolerance explains it;
    - reject the package if evidence contains credentials, private links, user
      emails, customer data, or raw operational logs;
    - pass only when the rubric score is at least `85` and every governance
      control is `pass`.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery and a sandbox
dataset containing the synthetic source tables.

1. Create or inspect the serving view for `capstone_serving_source`.
2. Confirm the selected fields are limited to `business_date`, `currency_code`,
   `branch_city`, `ledger_total`, `account_count`, and
   `source_cutoff_timestamp`.
3. Run the source controls from the browser-first path against the sandbox
   tables and confirm the same values: `control_total = 95700`,
   `account_count = 6`, `ron_total = 79300`, `eur_total = 16400`,
   `fanout_delta = 69100`.
4. Query a bounded BigQuery job-metadata window if job evidence is part of the
   review. Keep aggregate bytes and query counts; do not copy private query
   text or user-level metadata into the package.

### Optional Looker Studio UI Path

Use this section only if you have browser UI access to Looker Studio and a
sandbox BigQuery data source.

1. Build or inspect three pages: `Executive KPI Overview`, `Branch Currency
Details`, and `Governance And Operations`.
2. Confirm every chart uses the approved serving source or a register table
   derived from the same synthetic evidence.
3. Confirm scorecard total is `95700`, account count is `6`, RON total is
   `79300`, EUR total is `16400`, and freshness evidence is visible.
4. Inspect data-source credentials and record viewer credentials or authorized
   view access for the internal report review.
5. Record only field lists, settings, aggregate values, owners, and review
   outcomes. Do not paste private report links, user emails, screenshots with
   permissions, credentials, tokens, or keys.

## Checkpoints

- The artifact checklist has eight ready artifacts and `100` rubric points.
- The governed source returns six rows and no raw account or customer
  identifiers.
- The source controls match `control_total = 95700`, `account_count = 6`,
  `ron_total = 79300`, `eur_total = 16400`, and `fanout_delta = 69100`.
- Every metric contract has a grain, formula, owner, allowed dimensions, and
  expected value.
- Dashboard pages name approved sources and reproduce the control total.
- Governance and operations controls all pass.
- The rubric score is at least `85`; this first-pass package scores `100`.

## Common Failure Modes

- Treating a polished dashboard as complete when metric contracts are missing.
- Using an owner-joined table for current-balance KPIs after proving the fanout.
- Allowing raw or masked identifiers into an aggregate executive source.
- Recording a credential-mode decision without checking report audience and
  governed source access.
- Recording cost, freshness, or incident evidence without owner and review
  status.
- Copying private report links, user emails, credentials, raw logs, or customer
  data into capstone evidence.

## Recovery Checks

- If the artifact count is not eight, rerun the artifact checklist and add the
  missing package component before review.
- If the source total is not `95700`, confirm the date filter is
  `DATE '2026-03-31'` and each account balance appears once.
- If the fanout delta is not `69100`, confirm the unsafe proof joins latest
  balances to `account_owners` on `account_id`.
- If a metric is missing an owner, formula, or grain, hold the package until the
  contract is fixed.
- If the rubric score is below `85`, use the review workflow to identify the
  failed area and rerun only after remediation.

## End Challenge

Prepare the capstone README. The package passes when it includes exactly this
evidence:

- `required_artifacts=8`
- `ready_artifacts=8`
- `control_total=95700`
- `account_count=6`
- `ron_total=79300`
- `eur_total=16400`
- `fanout_delta=69100`
- `excluded_sensitive_fields=4`
- `credential_mode=viewer_credentials_or_authorized_view`
- `estimated_bytes=1248`
- `reconciliation_delta=0`
- `rubric_score=100`
- `review_status=ready`
- `evidence_rule=no_credentials_no_private_links_no_raw_logs`

## Deliverable

Create `notes/09-capstone-package.md`, if you keep external notes, with:

- the artifact checklist;
- the governed serving-source output;
- the source control output;
- the metric contracts;
- the dashboard page specification;
- the governance and operations evidence summary;
- the rubric score;
- the review workflow decision;
- the end-challenge evidence string.
