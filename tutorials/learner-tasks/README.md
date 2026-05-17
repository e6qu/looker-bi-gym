---
{
  "id": "tutorial-tutorials-learner-tasks-readme",
  "title": "Practice Labs",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.2.0",
  "topic": "learner-tasks",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Practice Labs

These short practice labs build BI habits with synthetic banking
datasets: declare grain, control joins, shape serving outputs,
reconcile dashboard numbers, and document metric behavior before
publishing a report. Each lab is self-contained and does not assume
any other lab has been completed.

Training boundary: use synthetic training data only. These tasks are
technical learning material, not legal, regulatory, accounting,
privacy, compliance, or model-risk advice.

Objective: pick the lab that targets the BI habit you want to
strengthen and complete it as a standalone exercise.

After this index, you will be able to:

- Choose a practice lab by the BI habit it builds.
- See which BI area each lab belongs to.
- Keep SQL results, reporting checks, and self-assessment notes in a
  useful order.

## Areas

Each link below opens a self-contained 15-20 minute lab against a
synthetic banking dataset. Order is alphabetical by area; the labs do
not assume each other.

- BI fundamentals
  - [Profile Dataset Grain](lt-bi-001-profile-dataset-grain.md): declare
    the reporting grain before aggregating.
  - [Detect Fanout Before Reporting](lt-bi-002-detect-fanout.md): prove
    a many-to-many join inflates totals and repair it upstream.
- BigQuery and SQL mechanics
  - [Build A Month-End Serving Result](lt-sql-003-month-end-serving-result.md):
    shape a month-end serving query with explicit reference dates.
- Looker Studio mechanics
  - [Prepare A Report-Ready Data Source](lt-looker-004-report-ready-data-source.md):
    expose a narrow serving result as a Looker Studio data source.
  - [Design A Control Parameter Handoff](lt-looker-007-control-parameter-handoff.md):
    design a report control that drives a BigQuery named parameter.
- Data quality and controls
  - [Reconcile Dashboard Controls](lt-dq-005-reconcile-dashboard-controls.md):
    add reconciliation controls and failure-mode notes to a serving
    result.
- Metric contracts
  - [Define A Ratio Null Contract](lt-dq-006-ratio-null-contract.md):
    define how a ratio behaves when the denominator is zero or
    unavailable.

Each lab is designed for a focused 15-20 minute session and is
self-contained: the instructions give the objective, SQL, expected
outputs, checks, reporting action, failure modes, and a final
summary. Use the browser workbench routes named in each lab to run
the SQL against the synthetic datasets.
