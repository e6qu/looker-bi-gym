---
{
  "id": "tutorial-tutorials-curriculum",
  "title": "Layered Curriculum Map",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Layered Curriculum Map

Each tutorial is a learning task that builds on previous artifacts. The map
below names what the tutorials actually build on the browser-first path
today.

Objective: see how the browser-first tasks, optional applied-track tutorials,
and capstone artifacts fit into one learning progression.

After this map, you will be able to:

- Identify which artifacts unlock later tutorial areas.
- Separate browser-first work from optional Google Cloud and Looker Studio UI
  work.
- Use the curriculum map to choose what to revisit before quiz or exam mode.

The map intentionally references only the synthetic datasets and SQL
artifacts the tutorials actually produce. Longer-horizon warehouse,
operations, and payments / AML / GL schemas live separately in
[Warehouse Design Targets](data-sources.md#warehouse-design-targets) and are
not built by these tutorials.

## Datasets

The browser SQL workbench loads two synthetic datasets:

- `deposits-seed/v0.1.0`: `branches`, `products`, `accounts`,
  `account_owners`, `account_daily_balances`.
- `lending-month-end/v0.1.0`: `loan_monthly_snapshots`, `collateral`,
  property valuation, location-band, and Romania HPI context tables.

Every tutorial below names which dataset it uses and which artifacts it
produces.

## Area A - Orientation And Source Data

### 00 - Orientation And Stack

Dataset: none. Decision-log only.

Produces:

- `notes/00-orientation-decision-log.md` covering serving layer, reporting
  layer, sensitive fields, and banking grain assumptions.

Unlocks: all later tutorials.

### 01 - Prepare A Synthetic Serving View For Looker Studio

Dataset: `deposits-seed`.

Produces:

- Browser-first SQL result for the 6-row `serving_deposit_dashboard`
  shape (one row per `business_date`, `currency_code`) with control totals.
- Optional BigQuery view `serving_deposit_dashboard` (UI path).
- Optional Looker Studio data source and report page (UI path).
- `notes/01-serving-view-check.md`.

Unlocks: tutorial 03 (executive dashboard spec).

## Area B - Warehouse Modeling And Metrics

### 02 - Build A BI-Friendly Deposit Model

Dataset: `deposits-seed`.

Produces:

- Grain contract for `dim_branch`, `dim_product`, `dim_account_masked`,
  `fct_account_daily_balances`, and `serving_deposit_branch_daily`.
- Browser-first SQL result for the safe latest-day branch/currency serving
  output (6 rows, total `95700`, preserves `UNMAPPED_BRANCH`).
- `notes/02-grain-and-model-contract.md`.

Unlocks: tutorials 04, 05, 07.

### 04 - Define Governed Metrics And Calculated Fields

Dataset: `deposits-seed`.

Produces:

- Browser-first SQL result for the metric contract source (6 rows).
- Reusable Looker Studio calculated-field specification (weighted
  `Average Account Balance`, `Branch Mapping Status`, `Balance Band`).
- Chart settings and expected values for a metric QA page.
- `notes/04-metric-contracts-and-fields.md`.

Unlocks: tutorials 03, 06.

### 05 - Compare Blends With Upstream Joins

Dataset: `deposits-seed`.

Produces:

- Browser-first fanout proof: wrong total `164800` vs correct `95700`,
  delta `69100`, overstatement `72.20%`.
- Safe `safe_branch_currency` SQL result (6 rows, total `95700`).
- Allocated owner balances SQL result (8 rows, total `95700.00`).
- `notes/05-blend-and-upstream-join-check.md`.

Unlocks: tutorial 06, 09.

## Area C - Looker Studio Dashboards

### 03 - Build A First Executive Dashboard Spec

Dataset: `deposits-seed`.

Produces:

- Browser-first dashboard source SQL result (6 rows).
- Executive KPI, trend, and currency-breakdown SQL outputs with exact
  expected values (`95700`, `6`, daily totals, EUR/RON splits).
- Optional Looker Studio report page (UI path).
- `notes/03-executive-dashboard-check.md`.

Unlocks: tutorials 06, 09.

### 06 - Measure Dashboard Performance And Cost Signals

Dataset: `deposits-seed`.

Produces:

- Browser-first source-profile and cost-signal SQL outputs.
- Deterministic simulated job-bytes comparison (`11232` raw vs `1248`
  serving).
- Draft `bi_ops_cost_daily` design.
- Optional BigQuery `INFORMATION_SCHEMA.JOBS_BY_PROJECT` query notes (UI
  path).
- `notes/06-performance-cost-findings.md`.

Unlocks: tutorial 08.

## Area D - Governance, Security, And Operations

### 07 - Govern Dashboard Access, Fields, And Sharing

Dataset: `deposits-seed`.

Produces:

- Browser-first field-classification output and minimisation check.
- Draft `safe_governed_deposit_summary` design.
- Draft `bi_report_sharing_register` design.
- Optional BigQuery authorized-view and Looker Studio credential-mode
  notes.
- `notes/07-governance-sharing.md`.

Unlocks: tutorials 08, 09.

### 08 - Operate Dashboard Freshness, Cost, And Controls

Dataset: `deposits-seed`.

Produces:

- Browser-first dependency, freshness, cost, reconciliation, incident, and
  validation outputs.
- Draft `bi_dependency_register` design.
- Draft `bi_operations_daily` design.
- Optional BigQuery job-metadata and Looker Studio freshness notes.
- `notes/08-bi-operations.md`.

Unlocks: tutorial 09.

## Area E - Capstone

### 09 - Assemble The Banking BI Capstone Package

Dataset: `deposits-seed` (and the prior-tutorial artifact files).

Produces:

- Browser-first capstone package checklist.
- Metric contract register.
- Dashboard page specification.
- Governance and operations evidence summary.
- Rubric score and review workflow.
- `notes/09-capstone-package.md`.

The capstone is the place to consume the `notes/0X-*.md` files produced by
earlier tutorials, not to rebuild them.

## Learner Tasks And Recipes

The 15-20 minute browser-first practice labs and the optional Looker Studio
recipe are listed separately:

- [Learner Tasks](learner-tasks/README.md): focused BI fundamentals, SQL,
  data quality, and Looker Studio practice.
- [Recipes](recipes/r-looker-001-deposits-dashboard.md): optional Looker
  Studio UI follow-ons.

## Browser-First Completion Criteria

By the end of the numbered tutorials, a learner should have produced:

- Six `notes/0X-*.md` files (one per tutorial that produces a deliverable).
- Browser SQL results matching the deterministic expected outputs in each
  tutorial.
- A metric contract register, sharing register, ops register, and capstone
  checklist whose totals reconcile to `95700` for the latest deposits day.

## Applied-Track Notes

Optional BigQuery UI and Looker Studio UI paths are layered on top of the
browser-first path. They are not required for the cert-track learning goal
but they map every browser-first artifact to its applied-track equivalent.
