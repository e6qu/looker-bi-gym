---
{
  "id": "tutorial-tutorials-exam-mode",
  "title": "Exam Mode",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.3.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Exam Mode

Exam mode is a set of longer practical cards. Pick one card, work in your own
time, and use the expected outputs to self-assess the result.

Objective: practice longer BI review tasks that combine SQL results,
reconciliation controls, and written self-assessment.

After this exam guide, you will be able to:

- Pick an independent exam card that matches your current learning goal.
- Compare your work against deterministic expected outputs.
- Decide whether your explanation is strong enough before moving to the next
  area.

Training boundary: use synthetic training data only. These cards are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Where The Cards Live

The cards are defined in
[`exams/bi-foundations/bi-foundations-exam.md`](../exams/bi-foundations/bi-foundations-exam.md)
and rendered by the [interactive exam surface](#/exam). This page is a short
study guide: it lists the cards and what each one verifies, but the
authoritative expected outputs live in the YAML pack so the interactive
surface and this document cannot drift.

## Card Index

| Card                                | Focus area                                      | Verification anchor                                 |
| ----------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| Grain And Fanout Review             | Account-day grain, owner-join fanout repair     | `correct_ledger_total=95700`, `fanout_delta=69100`  |
| Month-End Controls Review           | Semi-additive lending exposure + reconciliation | `EUR latest_principal_total=55000`, controls 1 / 3  |
| Ratio Null Contract Review          | Numerator / denominator contract + NULL display | Numerator and denominator named before aggregation  |
| Dashboard Refresh Operations Review | LS freshness, BigQuery refresh cost evidence    | SLA + cost-observability inputs stated              |
| Control Parameter Handoff Review    | LS controls + BigQuery named-parameter pattern  | `RON 2026-03-31 total=79300`, dry-run noted         |
| Weighted Ratio Metric Contract      | Weighted vs average-of-averages                 | `weighted_average=15950.00`, antipattern `14012.50` |
| Governance Release Decision         | Field minimisation + credential mode            | `kept_fields=6`, `excluded_sensitive_fields=4`      |
| BigQuery Cost Triage                | Cost mechanics beyond the browser-first proxy   | `serving_bytes=1248`, `reduction_pct=88.89`         |
| DORA Operations Evidence            | Reconciliation break + ICT third-party register | `break_day_delta=40`, `operations_status=hold`      |

## How To Use It

Open the [interactive exam surface](#/exam) to pick a card and compare your
written work against the deterministic expected outputs. For each card:

1. Read the objective and the expected outputs.
2. Work the SQL or design problem in your own time, against the synthetic
   datasets and tutorials you have already completed.
3. Compare each expected output line to your own result.
4. Write the self-assessment paragraph in your own notes.

## Completion Evidence

For now, exam evidence is learner-controlled. Keep a short note with the SQL
result, expected-output comparison, and self-assessment bullets. Do not paste
credentials, private URLs, or real banking data into the app or notes.
