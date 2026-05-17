---
{
  "id": "tutorial-tutorials-readme",
  "title": "Tutorials Index",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Tutorials Index

Topic index for browser-first tutorials on banking BI, BigQuery serving
patterns, Looker Studio mechanics, dimensional modelling, governance,
operations, and capstone synthesis. Each tutorial stands alone; prior
knowledge it assumes is stated as concepts in its own header rather than
as a pointer to another tutorial.

Training boundary: use synthetic training data only. These tutorials are
technical learning material, not legal, regulatory, accounting, privacy,
compliance, or model-risk advice.

## Area A - Orientation And Source Data

- [00 - Orientation And Stack](00-orientation-and-stack.md): orientation
  decision log covering serving layer, reporting layer, sensitive fields,
  and depositor-bank grain.
- [01 - Prepare A Synthetic Serving View For Looker Studio](01-connect-public-data.md):
  build a narrow `serving_deposit_dashboard` result from account-day
  balance rows.

## Area B - Warehouse Modeling And Metrics

- [02 - Build A BI-Friendly Deposit Model](02-build-a-bi-friendly-model.md):
  dimensional model with declared grain and a safe branch/currency
  serving output.
- [04 - Define Governed Metrics And Calculated Fields](04-metrics-and-calculated-fields.md):
  metric contract, weighted average, reusable Looker Studio calculated
  fields.
- [05 - Compare Blends With Upstream Joins](05-blending-vs-upstream-joins.md):
  fanout proof and upstream repair vs chart-blend traps.

## Area C - Looker Studio Dashboards

- [03 - Build A First Executive Dashboard Spec](03-first-executive-dashboard.md):
  KPI, trend, and currency-breakdown spec with deterministic expected
  values.
- [06 - Measure Dashboard Performance And Cost Signals](06-performance-and-cost-lab.md):
  cost mechanics, simulated job-bytes evidence, budget-overrun scenarios.

## Area D - Governance, Security, And Operations

- [07 - Govern Dashboard Access, Fields, And Sharing](07-governance-security-and-sharing.md):
  minimisation, authorized views, row-level and column-level security,
  credential modes.
- [08 - Operate Dashboard Freshness, Cost, And Controls](08-observability-and-operations.md):
  dependency register, freshness vs reference date, reconciliation
  break-day, DORA third-party register.

## Area E - Capstone

- [09 - Assemble The Banking BI Capstone Package](09-technical-bi-capstone.md):
  synthesis of grain, governance, cost, operations evidence into a
  scored package.

## Shared References

- [Data Sources](data-sources.md): the synthetic dataset schemas that
  the tutorials use as exercise targets.

## Learner Artifact Rule

Each tutorial should leave you with a visible artifact: a SQL result, a
metric contract, an end-challenge answer, or a note. A tutorial's
artifact is for your own future reference and may inform later
synthesis work, but the tutorials themselves do not depend on each
other's outputs being completed first.
