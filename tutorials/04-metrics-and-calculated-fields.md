# 04 - Metrics And Calculated Fields

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: define metrics over synthetic data only. Do not use
real balances, real customer attributes, or production regulatory outputs.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [03 - First Executive Dashboard](03-first-executive-dashboard.md)

Required tools: browser SQL path first; optional BigQuery and Looker Studio
browser UI for applied work.

Produces:

- `metrics/banking_metric_contracts.md`
- Updated serving views or data-source calculated fields.

## Source Facts

- `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-SCOPE`
- `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`

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
