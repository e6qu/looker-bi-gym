---
{
  "id": "tutorial-tutorials-learner-tasks-readme",
  "title": "Learner Tasks",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Learner Tasks

Learner tasks are curriculum exercise units for the website. They focus on BI
practice rather than how the course is built.

Training boundary: use synthetic training data only. These tasks are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Objective: give learners a browser-first sequence of short BI tasks that build
from grain profiling to reporting controls.

After this page, you will be able to:

- Choose the next task in the browser-first learning path.
- See which BI area each task belongs to.
- Separate BI practice tasks from course-building work.

## Area Groups

- BI fundamentals:
  [LT-BI-001 - Profile Dataset Grain](lt-bi-001-profile-dataset-grain.md) and
  [LT-BI-002 - Detect Fanout Before Reporting](lt-bi-002-detect-fanout.md).
- BigQuery and SQL mechanics:
  [LT-SQL-003 - Build A Month-End Serving Result](lt-sql-003-month-end-serving-result.md).
- Looker Studio mechanics:
  [LT-LOOKER-004 - Prepare A Report-Ready Data Source](lt-looker-004-report-ready-data-source.md).
- Data quality and controls:
  [LT-DQ-005 - Reconcile Dashboard Controls](lt-dq-005-reconcile-dashboard-controls.md).
- Ratio contracts:
  [LT-DQ-006 - Define A Ratio Null Contract](lt-dq-006-ratio-null-contract.md).

## Learning Path

Complete the learner tasks in order for the browser-first path:

1. Define the reporting grain before aggregating.
2. Prove a fanout error and repair it upstream.
3. Shape a month-end serving result with explicit reference dates.
4. Prepare a narrow data source for a Looker Studio dashboard.
5. Add reconciliation controls and failure-mode notes.

Each task is designed for a focused 15-20 minute session and is self-contained:
the lesson page gives the objective, SQL, expected outputs, checks, reporting
action, failure modes, and CTF-style end check. Use the browser workbench routes
only to run the SQL against committed synthetic datasets.
