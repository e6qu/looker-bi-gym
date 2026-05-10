# 00 - Orientation And Stack

Area: A - Orientation And Source Data

Synthetic-data boundary: use synthetic training data only. Do not use real,
masked, anonymized, or production-derived banking data.

Builds on: none.

Required tools: browser only.

Objective: confirm the static-app, browser-storage, synthetic-data, BigQuery,
Looker Studio, and regulatory-context boundaries before starting banking BI
work.

After this tutorial, you will be able to:

- Explain why the default path runs fully in the browser.
- Identify the sensitive fields that should stay out of BI serving outputs.
- Distinguish account-balance grain from depositor-bank guarantee grain.

Produces:

- Completed `000 - Orientation Quiz`.
- `notes/00-stack-decisions.md`, if you are keeping external notes.

## Source Facts

- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-SCOPE`
- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-GDPR-PERSONAL-DATA`
- `FACT-GDPR-DATA-MINIMISATION`
- `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`
- `FACT-DGSD-100K-EU`

## Goal

Confirm the BigQuery, Looker Studio, data minimisation, and
regulatory-context boundaries before you touch any banking BI examples.

## Steps

1. Open `#/challenges/orientation-quiz`.
2. Read the scenario and the step-by-step work section.
3. Identify BigQuery logical views as SQL-defined virtual tables used for
   governed dashboard serving layers.
4. Identify the Looker Studio data source as the conduit and field-schema layer
   between external data and report charts.
5. Review the seed sensitive fields: `account_id`, `customer_id`, and
   `synthetic_iban`.
6. Answer the data-minimisation question by selecting the raw identifiers that
   should not appear in serving outputs.
7. Answer the deposit-guarantee ceiling question using the FGDB/EU fact IDs.

## Checkpoints

- The quiz completes locally and displays `flag-orientation-quiz`.
- You can explain why reusable BigQuery SQL belongs upstream of dashboard
  charts.
- You can explain why Looker Studio data-source fields, aggregation, and
  credentials must be inspected before charting.
- You can name the EUR 100,000 deposit guarantee ceiling and distinguish it from
  an account balance total.

## Common Failure Modes

- Treating a chart-only calculated field as the governed metric definition.
- Building Looker Studio charts before inspecting the data-source schema.
- Selecting branch geography as sensitive while missing account/customer
  identifiers.
- Confusing account-balance grain with depositor-bank guarantee grain.

## Deliverable

Complete the browser quiz. Optional note: record the runtime, storage, synthetic
data, BigQuery, Looker Studio, and depositor-bank grain assumptions in
`notes/00-stack-decisions.md`.
