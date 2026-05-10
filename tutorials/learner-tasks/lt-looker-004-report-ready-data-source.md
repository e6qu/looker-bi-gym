# LT-LOOKER-004 - Prepare A Report-Ready Data Source

Area: Looker Studio mechanics. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: turn a browser-verified SQL result into a narrow, report-ready data
source design for Looker Studio without collecting credentials in this app.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-SCOPE`
- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
- `FACT-LOOKER-STUDIO-CREDENTIALS`

## Prerequisites

- Complete [LT-BI-001](lt-bi-001-profile-dataset-grain.md) and
  [LT-BI-002](lt-bi-002-detect-fanout.md).
- Open `#/challenges/looker-studio-evidence`.

## Steps

1. Draft this serving view SQL in the evidence field:

```sql
CREATE OR REPLACE VIEW serving_deposit_dashboard AS
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total
FROM account_daily_balances
GROUP BY business_date, currency_code;
```

2. Paste this deterministic control result:

```csv
business_date,currency_code,ledger_total
2026-03-31,EUR,16400
2026-03-31,RON,79300
```

3. Enter `95700` as the visible latest-day total.
4. Enter a Looker Studio URL shaped like
   `https://lookerstudio.google.com/reporting/example`.
5. Check the dashboard confirmation and credential-boundary checkbox.
6. Answer the fact-backed question about reusable metric logic.

Expected control output:

| business_date | currency_code | ledger_total |
| ------------- | ------------- | ------------ |
| 2026-03-31    | EUR           | 16400        |
| 2026-03-31    | RON           | 79300        |

## Checkpoints

- The SQL names `serving_deposit_dashboard`, `account_daily_balances`,
  `business_date`, `currency_code`, and `ledger_total`.
- Evidence is limited to SQL text, a tiny synthetic control output, a report URL
  shape, and local checkboxes.
- No cloud credentials, service account keys, OAuth tokens, exports from real
  banking systems, or private learner data are pasted into the app.

## Visualization Or Reporting Action

After the browser challenge, follow
[R-LOOKER-001 - Deposits Dashboard Recipe](../recipes/r-looker-001-deposits-dashboard.md)
if you want to manually reproduce the dashboard shape in Looker Studio. The
recipe is optional and browser-driven.

## Common Failure Modes

- Building `ledger_total` as a chart-only calculated field when a shared data
  source or upstream view should own reusable metric logic.
- Using owner credentials casually without documenting who can run the report
  query.
- Pasting credentials or private data into local challenge evidence.

## Self-Assessment

Mark the task complete only if you can describe what a Looker Studio data source
adds between the source query and chart fields.

## End Challenge

Capture the local flag for `030 - Looker Studio Evidence Pattern`.

## Solution Notes

The released challenge manifest is
[`challenges/manifests/looker-studio-evidence.yaml`](../../challenges/manifests/looker-studio-evidence.yaml).
