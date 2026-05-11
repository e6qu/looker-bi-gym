---
{
  "id": "tutorial-tutorials-learner-tasks-readme",
  "title": "Practice Labs",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Practice Labs

These short practice labs build BI habits with synthetic banking datasets:
declare grain, control joins, shape serving outputs, reconcile dashboard
numbers, and document metric behavior before publishing a report.

Training boundary: use synthetic training data only. These tasks are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Objective: complete a browser-first sequence of BI tasks that builds from grain
profiling to reporting controls.

After this index, you will be able to:

- Choose the next practice lab in the browser-first path.
- See which BI area each lab belongs to.
- Keep SQL results, reporting checks, and self-assessment notes in a useful
  order.

## Area Groups

- BI fundamentals:
  [LT-BI-001 - Profile Dataset Grain](lt-bi-001-profile-dataset-grain.md) and
  [LT-BI-002 - Detect Fanout Before Reporting](lt-bi-002-detect-fanout.md).
- BigQuery and SQL mechanics:
  [LT-SQL-003 - Build A Month-End Serving Result](lt-sql-003-month-end-serving-result.md).
- Looker Studio mechanics:
  [LT-LOOKER-004 - Prepare A Report-Ready Data Source](lt-looker-004-report-ready-data-source.md)
  and
  [LT-LOOKER-007 - Design A Control Parameter Handoff](lt-looker-007-control-parameter-handoff.md).
- Data quality and controls:
  [LT-DQ-005 - Reconcile Dashboard Controls](lt-dq-005-reconcile-dashboard-controls.md).
- Ratio contracts:
  [LT-DQ-006 - Define A Ratio Null Contract](lt-dq-006-ratio-null-contract.md).

## Learning Path

Complete the practice labs in order:

1. Define the reporting grain before aggregating.
2. Prove a fanout error and repair it upstream.
3. Shape a month-end serving result with explicit reference dates.
4. Prepare a narrow data source for a Looker Studio dashboard.
5. Add reconciliation controls and failure-mode notes.
6. Define how a ratio behaves when the denominator is zero or unavailable.
7. Design a dashboard control handoff to a BigQuery parameter pattern.

Each lab is designed for a focused 15-20 minute session and is self-contained:
the instructions give the objective, SQL, expected outputs, checks, reporting
action, failure modes, and end challenge. Use the browser workbench routes to
run the SQL against the synthetic datasets.
