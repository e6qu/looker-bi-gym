---
{
  "id": "tutorial-tutorials-readme",
  "title": "Tutorials Index",
  "content_type": "tutorial_index",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Tutorials Index

The tutorial sequence is layered: each task consumes predefined synthetic
banking sources, produces a reusable artifact, and becomes the prerequisite for
later work.

Training boundary: use synthetic training data only. These tutorials are technical learning material, not legal, regulatory, accounting, privacy, compliance, or model-risk advice.

Objective: follow a browser-first learning path for BI fundamentals, Looker
Studio mechanics, BigQuery-style SQL, and banking dashboard controls without a
backend or real banking data.

After this page, you will be able to:

- Pick the next learner task in the intended browser-first order.
- Distinguish core learner tasks from optional applied Looker Studio recipes.
- Find the quiz, exam mode, data-source notes, and regulatory-context briefs.

## Start Here - Browser-First Path

1. [00 - Orientation And Stack](00-orientation-and-stack.md)
2. [LT-BI-001 - Profile Dataset Grain](learner-tasks/lt-bi-001-profile-dataset-grain.md)
3. [LT-BI-002 - Detect Fanout Before Reporting](learner-tasks/lt-bi-002-detect-fanout.md)
4. [LT-SQL-003 - Build A Month-End Serving Result](learner-tasks/lt-sql-003-month-end-serving-result.md)
5. [LT-LOOKER-004 - Prepare A Report-Ready Data Source](learner-tasks/lt-looker-004-report-ready-data-source.md)
6. [LT-DQ-005 - Reconcile Dashboard Controls](learner-tasks/lt-dq-005-reconcile-dashboard-controls.md)
7. [Quiz Bank](quiz-bank.md)
8. [Exam Mode](exam-mode.md)

The path above is the main learner sequence for GitHub Pages. It runs in the
browser, stores progress locally, and uses synthetic datasets. The numbered
00-09 tutorials below are reference and applied-track material; some later
items describe optional Google Cloud Console, BigQuery UI, and Looker Studio UI
work that happens outside this app.

## Shared Contracts

- [Data Sources](data-sources.md): canonical synthetic schemas, grains, sensitive fields, and target marts.
- [Curriculum Map](curriculum.md): dependency graph, areas, and artifacts.
- [Learner Tasks](learner-tasks/README.md): focused 15-20 minute browser-first
  exercise units with checkpoints and CTF-style endings.
- Browser SQL workbench:
  `#/workbench/deposits-seed/v0.1.0` and
  `#/workbench/lending-month-end/v0.1.0` run tutorial SQL against committed
  synthetic datasets without opening a graded challenge.
- [Looker Studio Recipes](recipes/r-looker-001-deposits-dashboard.md):
  optional browser-driven report-building follow-ons after the core tutorials.
- [Quiz Bank](quiz-bank.md): self-check questions grouped by difficulty.
- [Exam Mode](exam-mode.md): longer self-assessed practical cards.
- [Regulation Briefs](../regulations/README.md): regulatory context checklist for EU/Romania banking BI.

## Area A - Orientation And Source Data

- [00 - Orientation And Stack](00-orientation-and-stack.md): choose architecture, region, governance assumptions, and relevant regulation briefs.
- [01 - Connect Predefined Synthetic Banking Data](01-connect-public-data.md): connect Looker Studio to a prepared synthetic banking serving view and observe generated queries.

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

## Learner Artifact Rule

Each tutorial should leave you with a visible artifact: a SQL result, a metric
contract, a CTF-style end-check answer, a note, or a report recipe checkpoint.
Later tutorials reuse those artifacts instead of rebuilding the same logic in a
chart.
