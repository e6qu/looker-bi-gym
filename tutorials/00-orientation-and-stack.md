---
{
  "id": "tutorial-tutorials-00-orientation-and-stack",
  "title": "00 - Orientation And Stack",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.1",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-DGSD-100K-EU",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PERSONAL-DATA",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 00 - Orientation And Stack

Area: A - Orientation And Source Data

Synthetic-data boundary: use synthetic training data only. Do not use real,
masked, anonymized, or production-derived banking data.

Builds on: none.

Required tools: browser only.

Objective: confirm the browser-first, synthetic-data, BigQuery, Looker Studio,
and regulatory-context boundaries before starting banking BI work.

After this tutorial, you will be able to:

- Explain why the default path runs fully in the browser.
- Identify the sensitive fields that should stay out of BI serving outputs.
- Distinguish account-balance grain from depositor-bank guarantee grain.

Produces:

- An orientation decision log with the BI serving, reporting, data
  minimisation, and depositor-bank grain assumptions you will use in later
  tutorials.

## Goal

Confirm the BigQuery, Looker Studio, data minimisation, and
regulatory-context boundaries before you touch any banking BI examples.

## Steps

1. Create a short orientation decision log. Use four headings:
   `Serving layer`, `Reporting layer`, `Sensitive fields`, and
   `Banking grain`.
2. Under `Serving layer`, write that reusable dashboard logic belongs upstream
   in governed SQL. In BigQuery, a
   <a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">logical view<sup>BQ</sup></a>
   is a virtual table defined by a SQL query and queried like a table.
3. Under `Reporting layer`, write that Looker Studio charts read fields through
   a
   <a class="termRef" href="#/terminology/looker-studio.md#looker-studio-data-source">data source<sup>LS</sup></a>.
   Before charting, inspect the data-source fields,
   <a class="termRef" href="#/terminology/looker-studio.md#aggregation">aggregation<sup>LS</sup></a>
   defaults, and credential mode.
4. Under `Sensitive fields`, write that raw account, customer, and synthetic
   IBAN identifiers should stay out of dashboard-ready serving outputs unless a
   specific approved purpose requires them.
5. Under `Banking grain`, write that account balances are account-level facts
   for a business date, while deposit-guarantee checks require depositor-bank
   <a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>.
   The standard ceiling used in this course context is EUR 100,000 per
   depositor per bank
   (<a class="termRef" href="#/terminology/regulations.md#dgsd-guarantee-ceiling">DGSD guarantee ceiling<sup>REG</sup></a>).
6. Add one ready/not-ready rule: a dashboard source is not ready if it exposes
   raw identifiers, hides metric logic inside chart-only calculations, or
   compares account-balance totals to guarantee wording without changing grain.
7. Review the decision log and confirm that it uses only synthetic training
   data and browser-first work for the required path.

## Checkpoints

- You can explain why reusable BigQuery SQL belongs upstream of dashboard
  charts.
- You can explain why Looker Studio data-source fields, aggregation, and
  credentials must be inspected before charting.
- You can identify account, customer, and synthetic IBAN identifiers as fields
  that should be excluded from routine BI serving outputs.
- You can name the EUR 100,000 deposit guarantee ceiling and distinguish it from
  an account balance total.

## Common Failure Modes

- Treating a chart-only calculated field as the governed metric definition.
- Building Looker Studio charts before inspecting the data-source schema.
- Selecting branch geography as sensitive while missing account/customer
  identifiers.
- Confusing account-balance grain with depositor-bank guarantee grain.

## Self-Assessment

For each statement, mark ready or not ready:

- A dashboard page computes the official deposit total only in a chart formula.
- A reporting source exposes account and customer identifiers to a branch-level
  balance page.
- A guarantee note compares one account balance total directly to the
  per-depositor-per-bank ceiling.
- A governed serving source exposes branch, currency, business date, and
  documented aggregate measures.

Only the final statement is ready for the later beginner tutorials.

## End Challenge

A stakeholder asks for a branch balance dashboard and wants to include account
IDs so reviewers can drill into details. Write three corrections before work
starts:

- Move reusable metric logic into the governed serving layer.
- Keep raw identifiers out of the routine dashboard source.
- Treat guarantee-related wording as depositor-bank grain, not account-balance
  grain.

## Separate Verification

After the decision log is complete, use
[Start the separate orientation quiz](#/challenges/orientation-quiz) to verify
the concepts with scenario questions. The quiz is separate from this tutorial
and is not the tutorial deliverable.

## Deliverable

Keep the orientation decision log for reference when later tutorials ask you to
judge whether a serving source, dashboard field list, or guarantee-related
metric is ready.
