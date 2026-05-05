# 05 - Blending Vs Upstream Joins

Area: B - Warehouse Modeling And Metrics

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)

Input sources:

- `raw_lending.loans`
- `raw_lending.loan_monthly_snapshots`
- `raw_deposits.account_owners`
- `mart.dim_customer_masked`
- `serve.credit_risk_monthly_portfolio`

Produces:

- Incorrect blend example in Looker Studio.
- Corrected upstream BigQuery view: `serve.credit_risk_monthly_portfolio`.
- `notes/05-grain-and-fanout-findings.md`

## Problem

Looker Studio blends are easy to create but can cause wrong totals, slow dashboards, and non-reusable logic.

## Outcome

You can reproduce a blending issue and solve it by moving the join into BigQuery.

## Scenario

Loan balances exist by account/month-end. Delinquency events exist by account/event date. You need 30+ DPD exposure rate by product, branch, and month-end.

## Tasks

- Create or select two tables at different grains.
- Blend them in Looker Studio on account and date.
- Build 30+ DPD exposure rate.
- Inspect duplicated exposure, totals, date mismatches, and null rows.
- Rebuild the join in BigQuery at account/month-end grain.
- Reconnect Looker Studio to the curated view.
- Compare correctness, performance, and maintainability.

## Investigation Questions

- What grain is each source before blending?
- Which join type did the blend use?
- Did any metric get duplicated?
- How many fields are included in the blend but not charted?
- Which approach is easier to test?
- Does the event date align to the reporting month-end cut?

## Deliverable

`notes/05-grain-and-fanout-findings.md` explaining the blend issue, the BigQuery fix, and the recommended pattern.
