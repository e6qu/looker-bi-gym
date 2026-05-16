---
{
  "id": "tutorial-tutorials-exam-mode",
  "title": "BI Foundations Practical Review Topics",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.4.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# BI Foundations Practical Review Topics

This page describes longer, end-to-end BI review tasks a learner is
expected to be able to design and verify on a synthetic banking
scenario. Each topic combines SQL results, reconciliation controls,
and a written self-assessment.

Objective: identify which longer practical task to attempt next based
on your current weak spot, and recognise what deterministic evidence
would close the task.

After this exam guide, you will be able to:

- Pick a practical review topic that matches your current learning goal.
- State what deterministic outputs a competent learner would produce.
- Decide whether your explanation is strong enough before moving on.

Training boundary: use synthetic training data only. The topics are
technical learning material, not legal, regulatory, accounting, privacy,
compliance, or model-risk advice.

## Review Topic Index

| Topic                          | Focus area                                      | Deterministic evidence shape                        |
| ------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| Grain And Fanout               | Account-day grain, owner-join fanout repair     | `correct_ledger_total=95700`, `fanout_delta=69100`  |
| Month-End Controls             | Semi-additive lending exposure + reconciliation | `EUR latest_principal_total=55000`, control counts  |
| Ratio Null Contract            | Numerator / denominator contract + NULL display | Numerator and denominator named before aggregation  |
| Dashboard Refresh Operations   | Cache-staleness threshold + cost evidence       | Freshness, SLA, and cost-observability inputs       |
| Control Parameter Handoff      | Report control to BigQuery named parameter      | `RON 2026-03-31 total=79300`, dry-run noted         |
| Weighted Ratio Metric Contract | Weighted vs average-of-averages                 | `weighted_average=15950.00`, antipattern `14012.50` |
| Governance Release Decision    | Field minimisation + credential mode            | `kept_fields=6`, `excluded_sensitive_fields=4`      |
| BigQuery Cost Triage           | Cost mechanics beyond the browser-first proxy   | `serving_bytes=1248`, `reduction_pct=88.89`         |
| Operations Evidence            | Reconciliation break + ICT third-party register | `break_day_delta=40`, `operations_status=hold`      |

## How To Use This Map

For each topic:

1. Read the focus area and the deterministic evidence shape. Note which
   numbers, counts, or statuses a competent answer must produce.
2. Plan the SQL or design work in your own time, against a synthetic
   banking scenario.
3. Compare your numeric / schema / list evidence to the deterministic
   shape above. Numbers that drift indicate the rule was misapplied.
4. Write a short self-assessment paragraph in your own notes:
   what the topic tested, where you struggled, and what to review next.

## Self-Assessment Pattern

A topic is consolidated when you can:

- Produce the deterministic evidence without reference material.
- Explain the underlying rule in one sentence.
- Identify the pitfall a less-careful answer would fall into and the
  reconciliation step that would catch it.

If any of the three is shaky, revisit the relevant terminology or BI
mechanic before claiming the topic is owned.

## Completion Evidence

Practical review evidence is learner-controlled. Keep a short note per
topic with the SQL result, the expected-output comparison, and the
self-assessment bullets. Do not paste credentials, private URLs, or
real banking data into any notes.
