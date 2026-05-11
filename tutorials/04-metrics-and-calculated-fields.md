---
{
  "id": "tutorial-tutorials-04-metrics-and-calculated-fields",
  "title": "04 - Metrics And Calculated Fields",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 04 - Metrics And Calculated Fields

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: define metrics over synthetic data only. Do not use
real balances, real customer attributes, or production regulatory outputs.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [03 - First Executive Dashboard](03-first-executive-dashboard.md)

Required tools: browser SQL path first; optional BigQuery and Looker Studio
browser UI for applied work.

Objective: decide where each metric belongs: upstream serving SQL, reusable
data-source logic, or a chart-only visual calculation.

After this tutorial, you will be able to:

- Write a metric contract with owner, grain, formula, and allowed dimensions.
- Identify which calculations are reusable business logic.
- Explain why deposit-guarantee examples need depositor-bank grain.

Produces:

- `metrics/banking_metric_contracts.md`
- Updated serving views or data-source calculated fields.

## Source Facts

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Goal

Decide where each metric belongs: upstream serving SQL, reusable data-source
field, or one-chart visual calculation.

## Steps

1. Pick three synthetic metrics: latest ledger total, account count, and average
   balance by branch.
2. For each metric, write owner, grain, formula, allowed dimensions, freshness,
   and regulatory-context tags.
3. Put reusable business logic in a serving view or shared data-source field.
4. Reserve chart-specific calculated fields for visual formatting, not governed
   metric definitions.
5. For any deposit guarantee example, write the grain as depositor-bank before
   calculating coverage.
6. Compare one chart using the shared metric with a deliberately different
   chart-only formula and record the risk.

## Checkpoints

- Every metric contract has grain and formula.
- Reusable metrics are not hidden in a single chart.
- Deposit guarantee examples do not use account-balance rows as the final
  coverage grain.

## Common Failure Modes

- Defining the same metric differently in two charts.
- Treating semi-additive balances as additive across dates.
- Using account-owner join rows as if they were depositor-bank rows.

## Deliverable

Create `metrics/banking_metric_contracts.md` with metric contracts and the chosen
implementation location for each calculation.
