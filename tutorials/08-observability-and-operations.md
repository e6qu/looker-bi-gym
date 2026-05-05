# 08 - Observability And Operations

Area: D - Governance, Security, And Operations

Builds on:

- [06 - Performance And Cost Lab](06-performance-and-cost-lab.md)
- [07 - Governance, Security, And Sharing](07-governance-security-and-sharing.md)

Input sources:

- BigQuery `INFORMATION_SCHEMA.JOBS`
- `serve.*` refresh metadata.
- `raw_ops.reconciliation_breaks`
- `raw_ops.cases`
- `serve.reg_context_register`

Produces:

- BI operations Looker Studio page.
- Freshness/reconciliation monitoring views.
- DORA-style BI dependency and incident register.
- `notes/08-bi-operations-runbook.md`

## Problem

A banking dashboard is a production artifact. Owners need to know when it is stale, expensive, broken, unused, unreconciled, or accessed by the wrong audience.

## Outcome

You can build a monitoring view for BI jobs, freshness, and dashboard usage signals.

## Tasks

- Query `INFORMATION_SCHEMA.JOBS` for recent Looker Studio jobs.
- Extract report and data source IDs from labels where available.
- Aggregate bytes billed by report, user, and day.
- Create freshness and reconciliation checks for serving tables.
- Create a basic cost-monitoring Looker Studio dashboard.
- Define an incident checklist for broken, stale, unreconciled, or over-shared dashboards.
- Add a DORA-style operational-resilience view for BI-critical datasets, jobs, third-party dependencies, incidents, and recovery evidence.

## Investigation Questions

- Which report is most expensive?
- Which users or data sources generate the most queries?
- Are cache hits visible?
- How will owners be alerted about stale data?
- Which dashboards should be deprecated?
- Which dashboards require maker/checker review evidence?
- Which dashboards support regulatory reporting or DORA/PSD2/AML/GDPR evidence and therefore need stronger retention?

## Deliverable

A BI operations dashboard and `notes/08-bi-operations-runbook.md` for cost, freshness, reconciliation, DORA-style resilience, and access issues.
