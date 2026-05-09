# 01 - Connect Predefined Banking Data To Looker Studio

Area: A - Orientation And Source Data

Synthetic-data boundary: use the predefined synthetic banking schemas only. Do
not connect Looker Studio to real customer, account, transaction, employee, or
regulatory data for this repo.

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [Data Sources](data-sources.md)

Required tools: optional browser UI access to BigQuery and Looker Studio. Do not
use Google Cloud CLI, BigQuery CLI, service account keys, Python, or Docker.

Produces:

- First Looker Studio data source.
- First Looker Studio report page.
- `notes/01-connection-observations.md`

## Source Facts

- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-SCOPE`
- `FACT-BIGQUERY-VIEW-LIMITATIONS`
- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-LOOKER-STUDIO-CREDENTIALS`
- `FACT-GDPR-DATA-MINIMISATION`

## Goal

Create the smallest useful dashboard source from a curated synthetic serving
view and inspect how Looker Studio sees the data.

## Steps

1. In BigQuery browser UI, create or inspect a synthetic serving view named
   `serving_deposit_dashboard` with `business_date`, `currency_code`, and
   `ledger_total`.
2. Confirm the view references synthetic source tables in the same BigQuery
   location and does not require runtime query parameters.
3. In Looker Studio, create a data source from that view.
4. Inspect the inferred fields before creating charts. Confirm that only
   dashboard-ready fields are present.
5. Create one scorecard for latest total, one time series by `business_date`, and
   one table by `currency_code`.
6. Check the data credentials setting and record whether it uses owner, viewer,
   or service account credentials. Do not paste credentials into this app or
   notes.

## Checkpoints

- The data source exposes the expected three dashboard fields.
- The report has a visible latest total and date/currency breakdown.
- The note explains which credential mode is used without storing tokens, keys,
  or private credentials.
- The serving view excludes raw account/customer identifiers.

## Common Failure Modes

- Connecting directly to raw tables because it is faster than defining a serving
  view.
- Creating chart fields before checking the data source schema.
- Assuming a BigQuery logical view can accept runtime parameters.
- Recording credentials or private URLs as evidence.

## Deliverable

Create `notes/01-connection-observations.md` with the serving view name, field
list, credential mode, and screenshots or links that do not expose secrets or
real banking data.
