# 04 - Metrics And Calculated Fields

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: implement metric examples on synthetic banking sources only. Do not use real or masked production banking data.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)

Input sources:

- `mart.fct_account_daily_balances`
- `mart.fct_posted_transactions`
- `raw_lending.loans`
- `raw_lending.loan_monthly_snapshots`
- `raw_fincrime.aml_alerts`
- `raw_ops.cases`

Produces:

- `metrics/banking_metric_contracts.md`
- `serve.exec_monthly_bank_kpis`
- `serve.credit_risk_monthly_portfolio`
- `serve.aml_alert_queue_daily`

## Problem

Looker Studio calculated fields can be useful, but metric logic can drift or aggregate incorrectly.

## Outcome

You can distinguish row-level calculations, aggregate calculations, and warehouse-defined metrics.

## Tasks

- Create base columns for transaction value, active accounts, total exposure, delinquent exposure, closed alerts, false positive alerts, and open cases.
- Define ratios such as delinquency rate, alert false positive rate, SLA breach rate, authorization approval rate, and average daily balance.
- Implement each metric once in BigQuery SQL and once as a Looker Studio calculated field.
- Compare outputs across date/category grains.
- Document which implementation is safer.

## Investigation Questions

- When does `AVG(row_ratio)` differ from `SUM(numerator) / SUM(denominator)`?
- Which calculated fields are reusable?
- Which chart-level fields are hidden maintenance risk?
- How does Looker Studio type inference affect output?
- Which metrics are balances/snapshots and should not be summed across time?

## Deliverable

`metrics/banking_metric_contracts.md` with 5-10 metrics and a comparison table showing BigQuery vs Looker Studio calculations.
