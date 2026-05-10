# Exam Mode

Exam mode is a set of longer practical cards. Pick one card, work in your own
time, and use the expected outputs to self-assess before comparing your notes to
the learner tasks.

Objective: practice longer BI review tasks that combine SQL results,
reconciliation controls, and written self-assessment.

After this page, you will be able to:

- Pick an independent exam card that matches your current learning goal.
- Compare your work against deterministic expected outputs.
- Decide whether your explanation is strong enough before moving to the next
  area.

Training boundary: use synthetic training data only. These cards are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Source file in the repository: `exams/bi-foundations-exam.yaml`.

## Card 1 - Grain And Fanout Review

Recommended tasks:

- [LT-BI-001 - Profile Dataset Grain](learner-tasks/lt-bi-001-profile-dataset-grain.md)
- [LT-BI-002 - Detect Fanout Before Reporting](learner-tasks/lt-bi-002-detect-fanout.md)

Objective: produce a one-page review note and SQL result proving that current
balance reporting stays at latest account-date grain before ownership analysis
is introduced.

Expected outputs:

| Metric               | Expected value |
| -------------------- | -------------- |
| correct_ledger_total | 95700          |
| naive_joined_total   | 164800         |
| fanout_delta         | 69100          |

Self-assessment:

- You can identify the join that duplicates the measure.
- You can explain why the repair belongs upstream of dashboard charts.
- You can describe why depositor-bank guarantee analysis is a different grain
  from latest account balance reporting.

## Card 2 - Month-End Controls Review

Recommended tasks:

- [LT-SQL-003 - Build A Month-End Serving Result](learner-tasks/lt-sql-003-month-end-serving-result.md)
- [LT-DQ-005 - Reconcile Dashboard Controls](learner-tasks/lt-dq-005-reconcile-dashboard-controls.md)

Objective: build a currency-level month-end exposure result and attach controls
for non-month-end rows, stale collateral valuation, and output minimisation.

Expected outputs:

| Metric                           | Expected value |
| -------------------------------- | -------------- |
| EUR latest_principal_total       | 55000          |
| RON latest_principal_total       | 396000         |
| non_month_end_snapshot_count     | 1              |
| stale_collateral_valuation_count | 3              |

Self-assessment:

- You can distinguish exposure date, valuation date, and dashboard control
  dates.
- You can explain why naive time sums are controls, not KPIs.
- You can keep loan and property identifiers out of the report-serving result.

## Completion Evidence

For now, exam evidence is learner-controlled. Keep a short note with the SQL
result, expected-output comparison, and self-assessment bullets. Do not paste
credentials, private URLs, or real banking data into the app or notes.
