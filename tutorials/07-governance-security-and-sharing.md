---
{
  "id": "tutorial-tutorials-07-governance-security-and-sharing",
  "title": "07 - Govern Dashboard Access, Fields, And Sharing",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
      "FACT-BIGQUERY-SELECT-LIST-NARROWING",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-INTEGRITY-CONFIDENTIALITY",
      "FACT-GDPR-PERSONAL-DATA",
      "FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL",
      "FACT-GDPR-PROCESSING-PRINCIPLES",
      "FACT-GDPR-PURPOSE-LIMITATION",
      "FACT-GDPR-SECURITY-PROCESSING",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
      "FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES",
      "FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK",
      "FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 07 - Govern Dashboard Access, Fields, And Sharing

Area: D - Governance, Security, And Operations

Synthetic-data boundary: use only the predefined synthetic deposits dataset.
Do not use real customer fields, real account numbers, production IAM
screenshots, report sharing links, credentials, tokens, keys, private emails, or
production policy text.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [03 - First Executive Dashboard](03-first-executive-dashboard.md)
- [05 - Compare Blends With Upstream Joins](05-blending-vs-upstream-joins.md)
- [06 - Measure Dashboard Performance And Cost Signals](06-performance-and-cost-lab.md)

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: turn a safe aggregate dashboard source into a governed release plan
with field minimisation, access boundaries, credential-mode decisions, and
review evidence.

After this tutorial, you will be able to:

- Classify candidate dashboard fields by purpose and privacy risk.
- Exclude raw and masked identifiers from an aggregate executive dashboard.
- Build a governed branch/currency serving result with exact controls.
- Choose a Looker Studio credential mode for an internal BI report.
- Draft a sharing register that links report pages, source views, owners,
  controls, and review dates without collecting secrets.

Produces:

- Browser-first field-classification and governed-source outputs.
- A draft `serve.safe_governed_deposit_summary` design.
- A draft `serve.bi_report_sharing_register` design.
- Optional BigQuery
  <a class="termRef" href="#/terminology/bigquery.md#authorized-view">authorized view<sup>BQ</sup></a>
  and Looker Studio
  <a class="termRef" href="#/terminology/looker-studio.md#viewer-credentials">credential-mode<sup>LS</sup></a>
  notes.
- `notes/07-governance-sharing.md`, if you keep external notes.

## Goal

Create this governed dashboard release record:

| Page                    | Approved Source               | Credential Mode                       | Allowed Fields | Excluded Sensitive Fields | Control Total | Review Status |
| ----------------------- | ----------------------------- | ------------------------------------- | -------------: | ------------------------: | ------------: | ------------- |
| Executive KPI Overview  | safe_governed_deposit_summary | viewer_credentials_or_authorized_view |              6 |                         4 |         95700 | ready         |
| Branch Currency Details | safe_governed_deposit_summary | viewer_credentials_or_authorized_view |              6 |                         4 |         95700 | ready         |

The browser-first path models the release decision with deterministic SQL. The
optional applied path shows where the same decision maps to BigQuery views,
authorized access, and Looker Studio data-source credentials.

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Classify the fields that could appear in an executive deposit dashboard:

```sql
WITH candidate_dashboard_fields AS (
  SELECT * FROM (
    VALUES
      (
        'business_date',
        'date_filter',
        'aggregate_dashboard',
        'keep',
        'reference_date_filter',
        'not_personal_data'
      ),
      (
        'currency_code',
        'dimension',
        'aggregate_dashboard',
        'keep',
        'business_breakdown',
        'not_personal_data'
      ),
      (
        'branch_city',
        'dimension',
        'aggregate_dashboard',
        'keep',
        'geography_breakdown',
        'not_personal_data'
      ),
      (
        'ledger_total',
        'metric',
        'aggregate_dashboard',
        'keep',
        'kpi_metric',
        'not_personal_data'
      ),
      (
        'account_count',
        'metric',
        'aggregate_dashboard',
        'keep',
        'denominator_control',
        'not_personal_data'
      ),
      (
        'source_cutoff_timestamp',
        'freshness_control',
        'aggregate_dashboard',
        'keep',
        'freshness_evidence',
        'not_personal_data'
      ),
      (
        'account_id',
        'raw_identifier',
        'account_detail',
        'exclude',
        'not_needed_for_executive_dashboard',
        'personal_data_risk'
      ),
      (
        'customer_id',
        'raw_identifier',
        'customer_detail',
        'exclude',
        'not_needed_for_executive_dashboard',
        'personal_data_risk'
      ),
      (
        'synthetic_iban',
        'raw_identifier',
        'account_detail',
        'exclude',
        'never_needed_for_aggregate_dashboard',
        'personal_data_risk'
      ),
      (
        'masked_account_number',
        'masked_identifier',
        'account_detail',
        'exclude',
        'pseudonymized_still_sensitive',
        'personal_data_risk'
      ),
      (
        'gdpr_restricted_flag',
        'restriction_indicator',
        'access_control',
        'exclude_from_public_chart',
        'access_rule_input_only',
        'special_handling'
      )
  ) AS t(
    field_name,
    field_role,
    dashboard_purpose,
    release_decision,
    reason,
    privacy_class
  )
)
SELECT
  release_decision,
  privacy_class,
  COUNT(*) AS field_count
FROM candidate_dashboard_fields
GROUP BY
  release_decision,
  privacy_class
ORDER BY
  release_decision,
  privacy_class;
```

3. Confirm the output:

| release_decision          | privacy_class      | field_count |
| ------------------------- | ------------------ | ----------: |
| exclude                   | personal_data_risk |           4 |
| exclude_from_public_chart | special_handling   |           1 |
| keep                      | not_personal_data  |           6 |

4. Run the minimisation control. This proves that identifiers are excluded
   before a dashboard source is approved:

```sql
WITH candidate_dashboard_fields AS (
  SELECT * FROM (
    VALUES
      ('business_date', 'keep', 'not_personal_data'),
      ('currency_code', 'keep', 'not_personal_data'),
      ('branch_city', 'keep', 'not_personal_data'),
      ('ledger_total', 'keep', 'not_personal_data'),
      ('account_count', 'keep', 'not_personal_data'),
      ('source_cutoff_timestamp', 'keep', 'not_personal_data'),
      ('account_id', 'exclude', 'personal_data_risk'),
      ('customer_id', 'exclude', 'personal_data_risk'),
      ('synthetic_iban', 'exclude', 'personal_data_risk'),
      ('masked_account_number', 'exclude', 'personal_data_risk'),
      ('gdpr_restricted_flag', 'exclude_from_public_chart', 'special_handling')
  ) AS t(field_name, release_decision, privacy_class)
)
SELECT
  SUM(CASE WHEN release_decision = 'keep' THEN 1 ELSE 0 END) AS kept_fields,
  SUM(
    CASE
      WHEN release_decision = 'exclude'
        AND privacy_class = 'personal_data_risk'
        THEN 1
      ELSE 0
    END
  ) AS excluded_sensitive_fields,
  SUM(
    CASE
      WHEN field_name IN (
        'account_id',
        'customer_id',
        'synthetic_iban',
        'masked_account_number'
      )
        AND release_decision = 'keep'
        THEN 1
      ELSE 0
    END
  ) AS sensitive_fields_kept,
  CASE
    WHEN SUM(
      CASE
        WHEN field_name IN (
          'account_id',
          'customer_id',
          'synthetic_iban',
          'masked_account_number'
        )
          AND release_decision = 'keep'
          THEN 1
        ELSE 0
      END
    ) = 0
      THEN 'pass'
    ELSE 'fail'
  END AS minimisation_check
FROM candidate_dashboard_fields;
```

5. Confirm the output:

| kept_fields | excluded_sensitive_fields | sensitive_fields_kept | minimisation_check |
| ----------: | ------------------------: | --------------------: | ------------------ |
|           6 |                         4 |                     0 | pass               |

6. Build the governed branch/currency source. This source keeps only the
   fields needed for aggregate dashboard pages:

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
safe_governed_deposit_summary AS (
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
FROM safe_governed_deposit_summary
ORDER BY
  currency_code,
  branch_city;
```

7. Confirm the governed source output:

| business_date | currency_code | branch_city     | ledger_total | account_count | source_cutoff_timestamp |
| ------------- | ------------- | --------------- | -----------: | ------------: | ----------------------- |
| 2026-03-31    | EUR           | Brasov          |         7100 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | EUR           | Cluj-Napoca     |         9300 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Bucuresti       |        43000 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Iasi            |        19000 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Timisoara       |        12300 |             1 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | UNMAPPED_BRANCH |         5000 |             1 | 2026-03-31T20:15:00Z    |

8. Run the release control for the governed source:

```sql
WITH safe_governed_deposit_summary AS (
  SELECT
    b.business_date,
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(b.ledger_balance) AS ledger_total,
    COUNT(DISTINCT b.account_id) AS account_count,
    MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM account_daily_balances b
  INNER JOIN accounts a
    ON b.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  WHERE b.business_date = DATE '2026-03-31'
  GROUP BY
    b.business_date,
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  COUNT(*) AS serving_rows,
  6 AS allowed_fields,
  SUM(ledger_total) AS control_total,
  SUM(account_count) AS account_count,
  MAX(source_cutoff_timestamp) AS source_cutoff_timestamp,
  CASE
    WHEN SUM(ledger_total) = 95700
      AND SUM(account_count) = 6
      THEN 'ready'
    ELSE 'hold'
  END AS release_status
FROM safe_governed_deposit_summary;
```

9. Confirm the output:

| serving_rows | allowed_fields | control_total | account_count | source_cutoff_timestamp | release_status |
| -----------: | -------------: | ------------: | ------------: | ----------------------- | -------------- |
|            6 |              6 |         95700 |             6 | 2026-03-31T20:15:00Z    | ready          |

10. Compare Looker Studio credential modes for the report data source:

```sql
WITH credential_modes AS (
  SELECT * FROM (
    VALUES
      (
        'owner_credentials',
        'no',
        'high',
        'not_default_for_restricted_internal_data',
        'viewers_can_see_data_through_owner_access'
      ),
      (
        'viewer_credentials',
        'yes',
        'lower',
        'preferred_when_viewers_have_authorized_view_access',
        'viewer_data_access_must_match_their_own_permissions'
      ),
      (
        'service_account_credentials',
        'no',
        'medium',
        'only_with_formal_platform_control',
        'non_human_identity_needs_governed_setup'
      )
  ) AS t(
    credential_mode,
    viewer_needs_bigquery_access,
    oversharing_risk,
    release_decision,
    reason
  )
)
SELECT
  credential_mode,
  viewer_needs_bigquery_access,
  oversharing_risk,
  release_decision
FROM credential_modes
ORDER BY
  CASE credential_mode
    WHEN 'viewer_credentials' THEN 1
    WHEN 'owner_credentials' THEN 2
    ELSE 3
  END;
```

11. Confirm the output:

| credential_mode             | viewer_needs_bigquery_access | oversharing_risk | release_decision                                   |
| --------------------------- | ---------------------------- | ---------------- | -------------------------------------------------- |
| viewer_credentials          | yes                          | lower            | preferred_when_viewers_have_authorized_view_access |
| owner_credentials           | no                           | high             | not_default_for_restricted_internal_data           |
| service_account_credentials | no                           | medium           | only_with_formal_platform_control                  |

12. Draft the report sharing register:

```sql
WITH bi_report_sharing_register AS (
  SELECT * FROM (
    VALUES
      (
        DATE '2026-03-31',
        'Executive KPI Overview',
        'safe_governed_deposit_summary',
        'viewer_credentials_or_authorized_view',
        'BI Core',
        DATE '2026-04-15',
        6,
        4,
        95700,
        'branch_currency_aggregate',
        'no_credentials_no_private_links',
        'ready'
      ),
      (
        DATE '2026-03-31',
        'Branch Currency Details',
        'safe_governed_deposit_summary',
        'viewer_credentials_or_authorized_view',
        'BI Core',
        DATE '2026-04-15',
        6,
        4,
        95700,
        'branch_currency_aggregate',
        'no_credentials_no_private_links',
        'ready'
      )
  ) AS t(
    report_date,
    dashboard_page,
    approved_source,
    credential_mode,
    owner_team,
    next_review_date,
    allowed_fields,
    excluded_sensitive_fields,
    control_total,
    purpose,
    evidence_boundary,
    review_status
  )
)
SELECT
  report_date,
  dashboard_page,
  approved_source,
  credential_mode,
  owner_team,
  next_review_date,
  allowed_fields,
  excluded_sensitive_fields,
  control_total,
  review_status
FROM bi_report_sharing_register
ORDER BY dashboard_page;
```

13. Confirm the output:

| report_date | dashboard_page          | approved_source               | credential_mode                       | owner_team | next_review_date | allowed_fields | excluded_sensitive_fields | control_total | review_status |
| ----------- | ----------------------- | ----------------------------- | ------------------------------------- | ---------- | ---------------- | -------------: | ------------------------: | ------------: | ------------- |
| 2026-03-31  | Branch Currency Details | safe_governed_deposit_summary | viewer_credentials_or_authorized_view | BI Core    | 2026-04-15       |              6 |                         4 |         95700 | ready         |
| 2026-03-31  | Executive KPI Overview  | safe_governed_deposit_summary | viewer_credentials_or_authorized_view | BI Core    | 2026-04-15       |              6 |                         4 |         95700 | ready         |

14. Record the release decision:
    - publish only the governed aggregate source;
    - exclude raw account identifiers, customer identifiers, IBAN-like values,
      and masked account numbers from the report data source;
    - treat the restriction flag as an access-control input, not as a public
      chart dimension;
    - prefer viewer credentials when each viewer has access to the authorized
      view or equivalent governed source;
    - do not record secrets, screenshots of credentials, private links, or user
      identities in release notes.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery and a sandbox
dataset containing the synthetic deposits tables.

1. Open BigQuery in the Google Cloud Console.
2. Confirm that the raw synthetic tables and the view dataset are in the same
   location.
3. Create a logical view for the governed aggregate source:

```sql
CREATE OR REPLACE VIEW
  `PROJECT_ID.looker_bi_gym_synthetic_serve.safe_governed_deposit_summary`
AS
SELECT
  b.business_date,
  b.currency_code,
  COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
  SUM(b.ledger_balance) AS ledger_total,
  COUNT(DISTINCT b.account_id) AS account_count,
  MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
FROM `PROJECT_ID.looker_bi_gym_synthetic_raw.account_daily_balances` b
INNER JOIN `PROJECT_ID.looker_bi_gym_synthetic_raw.accounts` a
  ON b.account_id = a.account_id
LEFT JOIN `PROJECT_ID.looker_bi_gym_synthetic_raw.branches` br
  ON a.branch_id = br.branch_id
WHERE b.business_date = DATE '2026-03-31'
GROUP BY
  b.business_date,
  b.currency_code,
  COALESCE(br.city, 'UNMAPPED_BRANCH');
```

4. Query the view and confirm it returns the six governed rows listed in the
   browser-first path.
5. Grant dashboard users access to the governed view or use an authorized-view
   pattern. Do not grant broad raw-table access just to make a dashboard chart
   work.
6. Keep the selected columns to `business_date`, `currency_code`, `branch_city`,
   `ledger_total`, `account_count`, and `source_cutoff_timestamp`.
7. Record the view name, dataset location, selected field list, owner team,
   review date, and control total. Do not record private user identifiers,
   screenshots of IAM bindings, tokens, or keys.

### Optional Looker Studio UI Path

Use this section only if you have browser UI access to Looker Studio and a
sandbox BigQuery source.

1. Create or edit the BigQuery data source that points to
   `safe_governed_deposit_summary`.
2. In the data-source field list, confirm that only these fields are available:
   `business_date`, `currency_code`, `branch_city`, `ledger_total`,
   `account_count`, and `source_cutoff_timestamp`.
3. Confirm that `ledger_total` and `account_count` use numeric aggregation
   settings suitable for the report. Confirm that `business_date` is a date and
   `source_cutoff_timestamp` is visible as freshness evidence.
4. Inspect the data-credentials setting.
5. For an internal report where each viewer has governed view access, choose
   viewer credentials or record the equivalent authorized-view access control.
6. If owner credentials are selected for a specific sandbox test, record the
   oversharing risk and the trust boundary before sharing the report. Do not use
   owner credentials to bypass missing viewer access to restricted data.
7. Share only the report or data source needed for the test audience. Do not
   paste report links, access tokens, private emails, or screenshots containing
   permissions into evidence notes.

## Checkpoints

- Field classification shows six kept aggregate fields, four excluded
  identifier fields, and one restriction flag kept out of public charts.
- The governed source returns six branch/currency rows and a control total of
  `95700`.
- No raw account ID, customer ID, IBAN-like value, or masked account number is
  available to the dashboard data source.
- The sharing register records page, approved source, credential mode, owner,
  review date, field counts, control total, and review status.
- Credential behavior is described as a data-source access decision, not as a
  copied credential or private report artifact.

## Common Failure Modes

- Sharing a report while the data source still exposes identifiers.
- Treating masked account numbers or synthetic IBAN-like values as automatically
  safe for broad dashboard use.
- Using owner credentials to hide the fact that viewers lack governed source
  access.
- Treating a raw restriction flag as a public report dimension instead of an
  access-control input.
- Copying private report links, permission screenshots, tokens, keys, or user
  identities into review notes.
- Forgetting to rerun the control total after removing fields or changing the
  source query.

## Recovery Checks

- If the field count is not six kept fields, rerun the classification query and
  check that only aggregate dashboard fields have `release_decision = 'keep'`.
- If the governed source total is not `95700`, confirm that the date filter is
  `DATE '2026-03-31'` and that each latest balance appears once.
- If `UNMAPPED_BRANCH` is missing, confirm that the branch join is a `LEFT JOIN`
  and uses `COALESCE(br.city, 'UNMAPPED_BRANCH')`.
- If the data source exposes identifiers, remove them upstream and reconnect or
  refresh the data-source schema before sharing.
- If viewers cannot open the report with viewer credentials, fix governed
  source access rather than switching to owner credentials by default.

## End Challenge

Prepare a release note for the two-page executive deposit dashboard. The note
passes when it includes exactly this evidence:

- `kept_fields=6`
- `excluded_sensitive_fields=4`
- `sensitive_fields_kept=0`
- `control_total=95700`
- `release_source=safe_governed_deposit_summary`
- `credential_mode=viewer_credentials_or_authorized_view`
- `evidence_rule=no_credentials_no_private_links`

## Deliverable

Create `notes/07-governance-sharing.md`, if you keep external notes, with:

- the field classification summary;
- the governed source output and release control;
- the credential-mode decision;
- the draft `serve.bi_report_sharing_register` rows;
- the end-challenge evidence string.
