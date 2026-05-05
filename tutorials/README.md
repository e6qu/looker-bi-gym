# Tutorials Index

The tutorial sequence is now layered: each task consumes predefined synthetic banking sources, produces a reusable artifact, and becomes the prerequisite for later work.

Start with the shared contracts:

- [Data Sources](data-sources.md): canonical synthetic schemas, grains, sensitive fields, and target marts.
- [Curriculum Map](curriculum.md): dependency graph, areas, and artifacts.
- [Regulation Briefs](../regulations/README.md): regulatory context checklist for EU/Romania banking BI.

## Area A - Orientation And Source Data

- [00 - Orientation And Stack](00-orientation-and-stack.md): choose architecture, region, governance assumptions, and relevant regulation briefs.
- [01 - Connect Predefined Banking Data](01-connect-public-data.md): connect Looker Studio to a prepared synthetic banking serving view and observe generated queries.

## Area B - Warehouse Modeling And Metrics

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md): build core dimensions and facts from the synthetic raw schemas.
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md): implement governed banking metrics and compare BigQuery vs chart-layer calculations.
- [05 - Blending Vs Upstream Joins](05-blending-vs-upstream-joins.md): reproduce a grain/blending error and fix it upstream in BigQuery.

## Area C - Looker Studio Dashboards

- [03 - First Executive Dashboard](03-first-executive-dashboard.md): build an executive KPI page from curated serving tables.
- [06 - Performance And Cost Lab](06-performance-and-cost-lab.md): measure and optimize dashboard query cost.

## Area D - Governance, Security, And Operations

- [07 - Governance, Security, And Sharing](07-governance-security-and-sharing.md): implement masking/access/sharing patterns for banking BI.
- [08 - Observability And Operations](08-observability-and-operations.md): build BI job, freshness, reconciliation, and DORA-style operations monitoring.

## Area E - Capstone

- [09 - Technical BI Capstone](09-technical-bi-capstone.md): assemble a production-shaped banking BI product across executive, finance, credit-risk, and compliance/operations pages.

## Build Rule

Each tutorial should end with committed SQL/docs/config artifacts. Later tutorials should depend on those artifacts rather than recreating logic inside Looker Studio.
