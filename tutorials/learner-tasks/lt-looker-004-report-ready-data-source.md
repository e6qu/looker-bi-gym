---
{
  "id": "LT-LOOKER-004",
  "title": "LT-LOOKER-004 - Prepare A Report-Ready Data Source",
  "content_type": "learner_task",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "source_facts":
    [
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# LT-LOOKER-004 - Prepare A Report-Ready Data Source

Area: Looker Studio mechanics. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: turn a browser-verified SQL result into a narrow, report-ready data
source design for Looker Studio without collecting credentials.

After this task, you will be able to:

- Describe the report-ready data-source layer between SQL and Looker Studio
  charts.
- Record synthetic evidence without pasting credentials or private exports into
  notes.
- Distinguish a format-verified local evidence pattern from a manually verified
  Looker Studio report.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Prerequisites

- Complete [LT-BI-001](lt-bi-001-profile-dataset-grain.md) and
  [LT-BI-002](lt-bi-002-detect-fanout.md).
- Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
- Treat this as a local evidence-pattern design exercise unless you also
  complete the optional Looker Studio recipe.
- Use this task page as the complete instruction source; the workbench is only
  where you validate the SQL shape.

## Steps

1. Draft this serving view SQL in your notes:

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
4. Run this validation query in the workbench to reproduce the latest-day
   control total:

```sql
SELECT
  CAST(SUM(ledger_balance) AS DOUBLE) AS latest_visible_total
FROM account_daily_balances
WHERE business_date = '2026-03-31';
```

5. Record a Looker Studio report URL shape in your notes without creating or
   pasting credentials: `https://lookerstudio.google.com/reporting/example`.
6. Add this credential-boundary statement to the design note: "The BI training
   evidence stores no BigQuery, Looker Studio, Google Cloud, or banking
   credentials; any live Looker Studio review is performed only in the browser
   UI."
7. Answer this tutorial check question in your notes: which layer should own
   reusable `ledger_total` logic before charts consume it?

Expected control output:

| business_date | currency_code | ledger_total |
| ------------- | ------------- | ------------ |
| 2026-03-31    | EUR           | 16400        |
| 2026-03-31    | RON           | 79300        |

## Checkpoints

- The SQL names `serving_deposit_dashboard`, `account_daily_balances`,
  `business_date`, `currency_code`, and `ledger_total`.
- The validation query returns `latest_visible_total = 95700`.
- Evidence is limited to SQL text, a tiny synthetic control output, a report URL
  shape, and local checkboxes.
- No cloud credentials, service account keys, OAuth tokens, exports from real
  banking systems, or private data are pasted into notes.

## Visualization Or Reporting Action

After this task, follow
[R-LOOKER-001 - Deposits Dashboard Recipe](../recipes/r-looker-001-deposits-dashboard.md)
if you want to manually reproduce the dashboard shape in Looker Studio. The
recipe is optional and browser-driven.

## Common Failure Modes

- Building `ledger_total` as a chart-only calculated field when a shared data
  source or upstream view should own reusable metric logic.
- Using owner credentials casually without documenting who can run the report
  query.
- Pasting credentials or private data into local evidence notes.

## Self-Assessment

Mark the task complete only if you can describe what a Looker Studio data source
adds between the source query and chart fields.

## End Challenge

Write a one-sentence CTF answer in this form:

`view=<view_name>; total=<latest_visible_total>; credential_boundary=<yes/no>; reusable_logic_layer=<layer>`

The expected answer is:

`view=serving_deposit_dashboard; total=95700; credential_boundary=yes; reusable_logic_layer=serving_view_or_data_source`

## Answer Reference

Use the serving-view SQL, expected control output, latest-day total, and
expected end-challenge answer on this page as the complete reference for
checking your work.
