---
{
  "id": "tutorial-tutorials-curriculum",
  "title": "Layered Curriculum Map",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Layered Curriculum Map

Each tutorial is a learning task that builds on previous artifacts. The goal is not to create disconnected dashboards; the goal is to build a small banking BI platform incrementally.

Objective: see how the browser-first tasks, optional applied-track tutorials,
and capstone artifacts fit into one learning progression.

After this map, you will be able to:

- Identify which artifacts unlock later tutorial areas.
- Separate browser-first work from optional Google Cloud and Looker Studio UI
  work.
- Use the curriculum map to choose what to revisit before quiz or exam mode.

## Area A - Orientation And Source Data

### 00 - Orientation And Stack

Input:

- Docs and regulation briefs.

Produces:

- `notes/00-stack-decisions.md`
- Browser-only training boundary notes.
- Optional GCP project/region/naming conventions if you later use the cloud
  applied track.
- Chosen regulatory-context tags.

Unlocks:

- All later tutorials.

### 01 - Connect Predefined Synthetic Banking Data

Input:

- `serve.deposit_daily_branch_product` or a temporary equivalent prepared from synthetic data.

Produces:

- First Looker Studio data source.
- First Looker Studio report page.
- `notes/01-connection-observations.md`

Unlocks:

- Dashboard construction patterns used in Area C.

## Area B - Warehouse Modeling And Metrics

### 02 - Build A BI-Friendly Model

Input:

- `raw_ref.*`
- `raw_party.customers`
- `raw_deposits.accounts`
- `raw_deposits.account_owners`
- `raw_deposits.account_daily_balances`
- Optional: `raw_payments.posted_transactions`

Produces:

- `mart.dim_date`
- `mart.dim_customer_masked`
- `mart.dim_account_masked`
- `mart.dim_product`
- `mart.dim_branch`
- `mart.fct_account_daily_balances`
- Optional: `mart.fct_posted_transactions`

Unlocks:

- Metrics tutorial.
- Executive dashboard.
- Governance/security tutorial.

### 04 - Metrics And Calculated Fields

Input:

- Mart tables from tutorial 02.
- `raw_lending.loan_monthly_snapshots`
- `raw_fincrime.aml_alerts`
- `raw_ops.cases`

Produces:

- `metrics/banking_metric_contracts.md`
- `serve.exec_monthly_bank_kpis`
- `serve.credit_risk_monthly_portfolio`
- `serve.aml_alert_queue_daily`

Unlocks:

- Executive dashboard.
- Capstone.

### 05 - Blending Vs Upstream Joins

Input:

- `mart.fct_loan_monthly_snapshot`
- `raw_lending.loan_monthly_snapshots`
- `raw_lending.loans`
- `raw_deposits.account_owners` or equivalent many-to-many table for fanout demo.

Produces:

- A documented incorrect Looker Studio blend.
- A corrected BigQuery serving view, such as `serve.credit_risk_monthly_portfolio`.
- `notes/05-grain-and-fanout-findings.md`

Unlocks:

- Capstone modeling standards.

## Area C - Looker Studio Dashboards

### 03 - First Executive Dashboard

Input:

- `serve.exec_monthly_bank_kpis`
- `serve.deposit_daily_branch_product`
- `serve.credit_risk_monthly_portfolio`

Produces:

- Executive Looker Studio page.
- Dashboard definition note with KPI definitions and freshness.

Unlocks:

- Performance lab.
- Capstone report shell.

### 06 - Performance And Cost Lab

Input:

- `mart.fct_posted_transactions`
- `mart.fct_account_daily_balances`
- `serve.deposit_daily_branch_product`
- BigQuery `INFORMATION_SCHEMA.JOBS`

Produces:

- `serve.bi_ops_cost_daily`
- Before/after dashboard cost report.
- Optimized serving-table recommendation.

Unlocks:

- Observability tutorial.

## Area D - Governance, Security, And Operations

### 07 - Governance, Security, And Sharing

Input:

- `mart.dim_customer_masked`
- `mart.dim_account_masked`
- `mart.fct_account_daily_balances`
- `mart.fct_aml_alerts`
- Regulation briefs for GDPR, Romania Law 190, AML, BNR, FGDB.

Produces:

- Access-safe serving views.
- Masking and row-level security design note.
- `serve.reg_context_register`

Unlocks:

- Capstone governance model.

### 08 - Observability And Operations

Input:

- BigQuery `INFORMATION_SCHEMA.JOBS`
- `serve.*` refresh metadata.
- `raw_ops.reconciliation_breaks`
- `raw_ops.cases`
- DORA regulation brief.

Produces:

- BI operations dashboard.
- Freshness/reconciliation monitoring views.
- DORA-style BI dependency and incident register.

Unlocks:

- Capstone operational readiness.

## Area E - Capstone

### 09 - Technical BI Capstone

Input:

- All previous `mart_*`, `serve_*`, `metrics/*`, and `notes/*` artifacts.

Produces:

- Multi-page banking Looker Studio report.
- Final architecture and governance README.
- Synthetic data and metric contract inventory.
- Regulation context register per dashboard page.

Completion Criteria:

- Metrics are defined once in BigQuery or contract docs.
- Dashboards use curated `serve_*` objects.
- Sensitive data is masked or excluded.
- Cost and freshness are monitored.
- Regulatory context is documented.
- Reconciliation/signoff evidence exists for finance/control pages.
