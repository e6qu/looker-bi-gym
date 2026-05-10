# Learner Tasks

Learner tasks are curriculum exercise units for the website. They are separate
from repository implementation tasks under `tasks/`.

Training boundary: use synthetic training data only. These tasks are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

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

## Learning Path

Complete the learner tasks in order for the browser-first path:

1. Define the reporting grain before aggregating.
2. Prove a fanout error and repair it upstream.
3. Shape a month-end serving result with explicit reference dates.
4. Prepare a narrow data source for a Looker Studio dashboard.
5. Add reconciliation controls and failure-mode notes.

Each task is designed for a focused 15-20 minute session and ends with a
CTF-style challenge that can be checked with the browser challenge runtime or by
self-assessment against deterministic expected outputs.
