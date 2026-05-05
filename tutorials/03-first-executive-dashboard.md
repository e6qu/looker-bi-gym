# 03 - First Executive Dashboard

Area: C - Looker Studio Dashboards

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)

Input sources:

- `serve.exec_monthly_bank_kpis`
- `serve.deposit_daily_branch_product`
- `serve.credit_risk_monthly_portfolio`

Produces:

- Executive Looker Studio page.
- `notes/03-executive-dashboard-definition.md`

## Problem

Create a dashboard page that answers one executive question without overwhelming the viewer.

## Outcome

You can design a decision-oriented dashboard with KPI cards, trends, breakdowns, and filters.

## Example Question

"Are deposit balances, loan delinquency, and operational backlog moving outside plan, and which regions or product families are driving the variance?"

## Tasks

- Define 3-5 primary KPIs, such as total deposits, average daily balance, 30+ DPD exposure rate, open case backlog, and reconciliation break value.
- Build a BigQuery serving view at daily or month-end grain depending on the metric.
- Connect Looker Studio to the serving view.
- Add KPI cards with comparison periods.
- Add trend and breakdown charts.
- Add date, region, branch, legal entity, product, and business-line controls.
- Add text documentation for definitions and freshness.

## Investigation Questions

- Does every chart support the core question?
- Is the dashboard grain appropriate?
- Are numerator and denominator definitions visible?
- What chart can be removed without losing decision value?
- Are balance and exposure metrics treated as snapshots rather than flows?

## Deliverable

A one-page executive dashboard and `notes/03-executive-dashboard-definition.md`.
