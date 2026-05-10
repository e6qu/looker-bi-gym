---
{
  "id": "tutorial-tutorials-08-observability-and-operations",
  "title": "08 - Observability And Operations",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-DORA-ICT-IDENTIFICATION",
      "FACT-DORA-ICT-RISK-FRAMEWORK",
      "FACT-EBA-DPM-VALIDATION-RULES",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 08 - Observability And Operations

Area: D - Governance, Security, And Operations

Synthetic-data boundary: operational evidence is synthetic or sandbox-only. Do
not copy production incident records, job logs, reconciliation breaks, or user
data into this repo.

Builds on:

- [06 - Performance And Cost Lab](06-performance-and-cost-lab.md)
- [07 - Governance, Security, And Sharing](07-governance-security-and-sharing.md)

Required tools: browser docs path first; optional BigQuery and Looker Studio
browser UI.

Objective: treat a dashboard as an operated BI product with dependencies,
owners, freshness, reconciliation, and validation evidence.

After this tutorial, you will be able to:

- Build a BI dependency register.
- Define freshness and reconciliation controls.
- Describe operational evidence without copying production records.

Produces:

- BI dependency register.
- Freshness/reconciliation monitoring design.
- `notes/08-bi-operations.md`

## Source Facts

- `FACT-DORA-ICT-RISK-FRAMEWORK`
- `FACT-DORA-ICT-IDENTIFICATION`
- `FACT-EBA-DPM-VALIDATION-RULES`
- `FACT-BIGQUERY-LOGICAL-VIEW`

## Goal

Treat the dashboard as an operated BI product with dependencies, owners,
freshness, reconciliation, and validation evidence.

## Steps

1. List the dashboard, serving views, source tables, scheduled refreshes, and
   owner teams.
2. Classify each dependency as data source, transformation, report, evidence
   control, or downstream consumer.
3. Add freshness fields: source cutoff timestamp, refresh timestamp, expected
   SLA, and status.
4. Add reconciliation fields: control total, dashboard total, delta, tolerance,
   owner, and signoff status.
5. For regulatory-reporting-inspired examples, note which validation rule or
   reference date a data point would need.
6. Define what incident evidence should be kept locally in training notes.

## Checkpoints

- Every dashboard dependency has an owner.
- Freshness and reconciliation controls have expected values and tolerances.
- The note distinguishes BI operational evidence from legal/regulatory advice.

## Common Failure Modes

- Monitoring only dashboard uptime while ignoring source-table freshness.
- Keeping validation rules in prose without data-point or reference-date fields.
- Copying real incident or reconciliation records into training notes.

## Deliverable

Create `notes/08-bi-operations.md` with the dependency register and the
freshness/reconciliation control design.
