# Quiz Bank

Use this page after the learner tasks when you want a 20-minute self-check.
Questions are grouped by difficulty and reference the learner tasks that teach
the underlying skill.

Objective: check whether you can recall and apply the core BI mechanics from
the learner tasks without opening the answers first.

After this page, you will be able to:

- Answer easy, medium, and hard self-check questions in about 20 minutes.
- Trace each question back to the learner task that teaches the concept.
- Identify which tutorial to revisit before attempting exam-mode cards.

Training boundary: use synthetic training data only. This quiz is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Source file in the repository: `quizzes/bi-foundations-mixed.yaml`.

## Easy

### Grain Before Aggregation

Recommended task: [LT-BI-001](learner-tasks/lt-bi-001-profile-dataset-grain.md).

Question: before summing `ledger_balance`, what must you declare for the
balance rows?

Answer: one row per account and business date.

Why it matters: BI aggregates are only trustworthy after the row grain is known.

### Sensitive Fields

Recommended tasks: [LT-BI-001](learner-tasks/lt-bi-001-profile-dataset-grain.md)
and [LT-LOOKER-004](learner-tasks/lt-looker-004-report-ready-data-source.md).

Question: which fields should stay out of a currency-level dashboard output
unless a specific purpose requires them?

Answer: `account_id`, `customer_id`, and `synthetic_iban`.

Why it matters: serving outputs should stay narrow and avoid unnecessary
identifier exposure.

### Looker Studio Data Source Role

Recommended task:
[LT-LOOKER-004](learner-tasks/lt-looker-004-report-ready-data-source.md).

Question: what role does a Looker Studio data source play between source data
and charts?

Answer: it connects data and provides the report field schema.

Why it matters: field types, aggregation, and credentials are inspected at the
data-source layer before charts are trusted.

## Medium

### Fanout Delta

Recommended task: [LT-BI-002](learner-tasks/lt-bi-002-detect-fanout.md).

Question: in the synthetic deposits fanout exercise, what is the overstatement
delta between the naive owner-joined total and the correct latest account-grain
total?

Answer: `69100`.

Why it matters: the wrong join can produce a convincing but overstated KPI.

### BigQuery View Purpose

Recommended task:
[LT-LOOKER-004](learner-tasks/lt-looker-004-report-ready-data-source.md).

Question: why is a BigQuery logical view a useful serving-layer shape for
reusable dashboard SQL?

Answer: it is a SQL-defined virtual table queried like a table.

Why it matters: shared dashboard logic should be inspectable before it reaches
Looker Studio charts.

### Month-End Control

Recommended tasks:
[LT-SQL-003](learner-tasks/lt-sql-003-month-end-serving-result.md) and
[LT-DQ-005](learner-tasks/lt-dq-005-reconcile-dashboard-controls.md).

Question: how many synthetic lending snapshot rows are not on an accepted
month-end date?

Answer: `1`.

Why it matters: a control can be visible in a serving result without becoming a
business KPI.

## Hard

### Semi-Additive Exposure

Recommended task:
[LT-SQL-003](learner-tasks/lt-sql-003-month-end-serving-result.md).

Question: which result should be used as the dashboard KPI for March exposure?

Answer: latest-period principal by currency, with time sums kept as controls.

Why it matters: balances and exposures are safe across entities at one date, not
across multiple dates.

### Metric Ownership

Recommended tasks: [LT-BI-002](learner-tasks/lt-bi-002-detect-fanout.md) and
[LT-LOOKER-004](learner-tasks/lt-looker-004-report-ready-data-source.md).

Question: where should the fanout-safe `ledger_total` metric be repaired for a
shared executive dashboard?

Answer: upstream serving SQL or a reusable data-source field.

Why it matters: a hidden chart-only repair lets later charts reintroduce the
same grain error.
