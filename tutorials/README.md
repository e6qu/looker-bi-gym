---
{
  "id": "tutorial-tutorials-readme",
  "title": "Lessons",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.3.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Lessons

Numbered banking BI lessons. Each lesson is self-contained and ends
with a concrete artefact (a SQL result, a metric contract, or a
governed dashboard spec). Read them in order on a first pass; on
later passes, jump to whichever lesson targets the habit you want to
strengthen.

Training boundary: every dataset is synthetic. The lessons are
technical training material, not legal, regulatory, accounting,
privacy, compliance, or model-risk advice.

## Lessons In Order

- [00 - Orientation And Stack](00-orientation-and-stack.md): profile
  the deposits dataset, name the grain you will report on, and write
  down the boundaries (synthetic data, no credentials, depositor-bank
  vs account-balance grain).
- [01 - Prepare A Synthetic Serving View For Looker Studio](01-connect-public-data.md):
  build a narrow `serving_deposit_dashboard` result from account-day
  balance rows.
- [02 - Build A BI-Friendly Deposit Model](02-build-a-bi-friendly-model.md):
  dimensional model with declared grain and a safe branch / currency
  serving output.
- [03 - Build A First Executive Dashboard Spec](03-first-executive-dashboard.md):
  KPI, trend, and currency-breakdown spec with deterministic expected
  values.
- [04 - Define Governed Metrics And Calculated Fields](04-metrics-and-calculated-fields.md):
  metric contract, weighted average, reusable Looker Studio calculated
  fields.
- [05 - Compare Blends With Upstream Joins](05-blending-vs-upstream-joins.md):
  fanout proof and upstream repair vs chart-blend traps.
- [06 - Measure Dashboard Performance And Cost Signals](06-performance-and-cost-lab.md):
  cost mechanics, simulated job-bytes evidence, budget-overrun
  scenarios.
- [07 - Govern Dashboard Access, Fields, And Sharing](07-governance-security-and-sharing.md):
  minimisation, authorized views, row-level and column-level security,
  credential modes.
- [08 - Operate Dashboard Freshness, Cost, And Controls](08-observability-and-operations.md):
  dependency register, freshness vs reference date, reconciliation
  break-day, DORA third-party register.
- [09 - Assemble The Banking BI Capstone Package](09-technical-bi-capstone.md):
  synthesis of grain, governance, cost, and operations evidence into
  a scored package.

## Shared References

- [Data Sources](data-sources.md): the synthetic dataset schemas the
  lessons use as exercise targets.

## What Each Lesson Produces

Each lesson leaves you with a visible artefact: a SQL result you
just ran, a metric contract you wrote down, a dashboard field list,
or a governance decision. The artefact is for your own future
reference; the lessons themselves do not depend on a prior lesson's
artefact being saved somewhere.
