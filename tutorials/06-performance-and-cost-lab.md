# 06 - Performance And Cost Lab

Area: C - Looker Studio Dashboards

Synthetic-data boundary: measure query behavior on synthetic demo sources only.
Do not inspect or export production billing, jobs, user, or customer data.

Builds on:

- [03 - First Executive Dashboard](03-first-executive-dashboard.md)
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)

Required tools: optional BigQuery and Looker Studio browser UI.

Objective: connect dashboard design choices to query work and define an
operational control for BI cost and refresh behavior.

After this tutorial, you will be able to:

- Tie dashboard queries back to report sources.
- Compare broad/raw sources with narrower serving views.
- Draft a cost/freshness control table for BI operations.

Produces:

- `serve.bi_ops_cost_daily`
- `notes/06-performance-cost-findings.md`

## Source Facts

- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-LIMITATIONS`
- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-DORA-ICT-RISK-FRAMEWORK`

## Goal

Measure how dashboard design affects query work and document an operational
control for BI refresh/cost behavior.

## Steps

1. Open the executive dashboard and load the page once with default filters.
2. In BigQuery browser UI, inspect job metadata available to your sandbox
   project; do not export private user/job evidence.
3. Record how many chart queries ran and which data source they used.
4. Compare a dashboard backed by raw or broad fields with one backed by a
   narrower serving view.
5. Write a synthetic `serve.bi_ops_cost_daily` design with date, report name,
   data source, query count, bytes processed, and owner team.
6. Add a control recommendation: stable serving views, fewer unused fields, and
   documented owners.

## Checkpoints

- Your note identifies which report/data source produced the measured jobs.
- The optimized path uses a curated serving view.
- The control recommendation names an owner and refresh/cost evidence.

## Common Failure Modes

- Treating Looker Studio performance as only a visual design issue.
- Measuring jobs without tying them back to a dashboard source.
- Recording private billing or user details instead of synthetic/sandbox
  evidence.

## Deliverable

Create `notes/06-performance-cost-findings.md` and a draft schema for
`serve.bi_ops_cost_daily`.
