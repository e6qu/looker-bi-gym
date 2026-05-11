---
{
  "id": "tutorial-tutorials-data-sources",
  "title": "Predefined Synthetic Banking Data Sources",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Predefined Synthetic Banking Data Sources

This project uses synthetic banking data only. Do not use real customer,
account, transaction, employee, complaint, AML, fraud, or regulatory data in
this learning path.

Objective: understand which synthetic tables are available in the browser today
and which warehouse objects are applied-track design targets.

After this page, you will be able to:

- Name the browser-loaded tables used by the current SQL workbench exercises.
- Avoid writing tutorial steps against tables that are only design targets.
- Explain the intended raw, staging, mart, serving, and operations layers.

## Available In The Browser Now

The browser SQL workbench currently loads these committed synthetic datasets:

- `deposits-seed/v0.1.0`: `branches`, `products`, `accounts`,
  `account_owners`, and `account_daily_balances`.
- `lending-month-end/v0.1.0`: loan snapshot, collateral, property valuation,
  location-band, and Romania HPI context tables used by the month-end exercise.

Use those table names in the browser SQL workbench exercises.

## Warehouse Design Targets

The schemas below are design targets for the optional applied warehouse track.
They explain where the learning path is going, but they are not all loaded into
DuckDB-WASM today. Treat `raw_*`, `stg_*`, `mart_*`, `serve_*`, and `ops_*`
objects as modeling names you will design toward unless the workbench schema
browser lists the table for the current exercise.

## Dataset Layers

- `raw_*`: source-shaped synthetic tables, intentionally messy enough to teach modeling.
- `stg_*`: typed, cleaned, deduplicated staging views.
- `mart_*`: BI-friendly facts and dimensions with declared grain.
- `serve_*`: dashboard-specific tables/views with minimal fields and access-safe columns.
- `ops_*`: monitoring, freshness, cost, validation, and signoff metadata.

## Reference Sources

### `raw_ref.calendar`

Grain: one row per calendar date.

Key fields:

- `calendar_date`
- `business_date`
- `is_business_day`
- `is_month_end`
- `is_quarter_end`
- `year_month`
- `reporting_month`
- `romania_public_holiday_flag`

Used for: all tutorials.

### `raw_ref.legal_entities`

Grain: one row per legal entity.

Key fields:

- `legal_entity_id`
- `legal_entity_name`
- `country_code`
- `regulator_code`
- `consolidation_group_id`

Used for: regulatory context, finance, risk, access control.

### `raw_ref.branches`

Grain: one row per branch.

Key fields:

- `branch_id`
- `branch_name`
- `region_code`
- `county`
- `city`
- `legal_entity_id`

Used for: branch filters, row-level security examples, executive dashboards.

### `raw_ref.products`

Grain: one row per product.

Key fields:

- `product_id`
- `product_family`
- `product_name`
- `business_line`
- `balance_sheet_class`
- `regulatory_product_code`

Used for: product hierarchy, KPI grouping, regulatory mapping.

## Party And Account Sources

### `raw_party.customers`

Grain: one row per customer.

Key fields:

- `customer_id`
- `customer_type`
- `residency_country`
- `customer_since_date`
- `kyc_status`
- `customer_risk_rating`
- `pep_flag`
- `gdpr_delete_restricted_flag`
- `synthetic_name`
- `synthetic_national_id`

Sensitive fields:

- `synthetic_name`
- `synthetic_national_id`
- KYC/risk attributes.

BI rule:

- Use masked customer keys in `serve_*` views unless the tutorial explicitly concerns restricted compliance data.

### `raw_deposits.accounts`

Grain: one row per account.

Key fields:

- `account_id`
- `masked_account_number`
- `product_id`
- `branch_id`
- `legal_entity_id`
- `open_date`
- `close_date`
- `account_status`
- `currency_code`

Sensitive fields:

- Any account identifier that can map to a real account in production. Synthetic values still model the risk.

### `raw_deposits.account_owners`

Grain: one row per account-customer ownership relationship.

Key fields:

- `account_id`
- `customer_id`
- `ownership_role`
- `ownership_share_pct`
- `valid_from`
- `valid_to`

BI warning:

- This table is intentionally many-to-many. Joining it naively to transactions or balances can multiply facts.

### `raw_deposits.account_daily_balances`

Grain: one row per account per business date.

Key fields:

- `business_date`
- `account_id`
- `ledger_balance`
- `available_balance`
- `accrued_interest`
- `currency_code`

BI warning:

- Balances are semi-additive. Sum across accounts for one date; do not sum daily balances across time unless computing a defined average or flow.

## Transaction And Payment Sources

### `raw_payments.posted_transactions`

Grain: one row per posted transaction.

Key fields:

- `transaction_id`
- `account_id`
- `transaction_date`
- `posting_date`
- `value_date`
- `amount`
- `currency_code`
- `debit_credit_indicator`
- `channel_id`
- `counterparty_country`
- `transaction_type`
- `reversal_flag`

BI warning:

- Tutorials must explicitly choose transaction date, posting date, value date, or business date.

### `raw_cards.card_authorizations`

Grain: one row per card authorization attempt.

Key fields:

- `authorization_id`
- `account_id`
- `authorization_timestamp`
- `amount`
- `currency_code`
- `merchant_category_code`
- `merchant_country`
- `approval_status`
- `decline_reason`
- `sca_applied_flag`
- `sca_exemption_reason`
- `fraud_confirmed_flag`

Used for:

- PSD2, fraud, SCA, operational monitoring.

## Lending Sources

### `raw_lending.loans`

Grain: one row per loan/facility.

Key fields:

- `loan_id`
- `customer_id`
- `product_id`
- `branch_id`
- `origination_date`
- `maturity_date`
- `original_amount`
- `currency_code`
- `interest_rate_type`
- `collateral_type`

### `raw_lending.loan_monthly_snapshots`

Grain: one row per loan per month-end reporting date.

Key fields:

- `reporting_month`
- `loan_id`
- `outstanding_principal`
- `exposure_at_default_proxy`
- `days_past_due`
- `dpd_bucket`
- `performing_status`
- `forbearance_flag`
- `stage_ifrs9_proxy`
- `charge_off_amount`
- `recovery_amount`

BI warning:

- Snapshot metrics must not be summed across months unless producing a defined period aggregate.

## Finance And Back-Office Sources

### `raw_finance.gl_entries`

Grain: one row per GL posting line.

Key fields:

- `gl_entry_id`
- `posting_date`
- `legal_entity_id`
- `gl_account_code`
- `cost_center`
- `product_id`
- `amount`
- `currency_code`
- `source_system`
- `journal_type`

### `raw_finance.fx_rates`

Grain: one row per currency pair per rate date and rate source.

Key fields:

- `rate_date`
- `from_currency`
- `to_currency`
- `rate`
- `rate_source`

### `raw_ops.reconciliation_breaks`

Grain: one row per reconciliation exception per run.

Key fields:

- `recon_break_id`
- `run_id`
- `business_date`
- `source_system`
- `target_system`
- `break_type`
- `break_amount`
- `currency_code`
- `status`
- `owner_team`
- `sla_due_timestamp`

### `raw_ops.cases`

Grain: one row per case status event.

Key fields:

- `case_event_id`
- `case_id`
- `case_type`
- `created_timestamp`
- `event_timestamp`
- `status`
- `queue_name`
- `assigned_team`
- `sla_due_timestamp`

## Financial Crime Sources

### `raw_fincrime.aml_alerts`

Grain: one row per generated alert.

Key fields:

- `alert_id`
- `customer_id`
- `account_id`
- `scenario_id`
- `scenario_version`
- `generated_timestamp`
- `alert_amount`
- `risk_score`
- `status`
- `disposition`
- `closed_timestamp`

Sensitive fields:

- Alert/customer/account identifiers and dispositions.

### `raw_fincrime.sanctions_hits`

Grain: one row per screening hit.

Key fields:

- `hit_id`
- `screened_party_id`
- `screening_timestamp`
- `list_source`
- `match_score`
- `status`
- `disposition`
- `closed_timestamp`

## Target Marts Produced By Tutorials

- `mart.dim_date`
- `mart.dim_customer_masked`
- `mart.dim_account_masked`
- `mart.dim_product`
- `mart.dim_branch`
- `mart.fct_account_daily_balances`
- `mart.fct_posted_transactions`
- `mart.fct_loan_monthly_snapshot`
- `mart.fct_card_authorizations`
- `mart.fct_gl_entries`
- `mart.fct_reconciliation_breaks`
- `mart.fct_aml_alerts`
- `mart.fct_cases`

## Target Serving Views Produced By Tutorials

- `serve.exec_monthly_bank_kpis`
- `serve.deposit_daily_branch_product`
- `serve.credit_risk_monthly_portfolio`
- `serve.payments_fraud_daily`
- `serve.aml_alert_queue_daily`
- `serve.recon_breaks_daily`
- `serve.bi_ops_cost_daily`
- `serve.reg_context_register`

## Minimum Metadata Fields For Serving Views

Every `serve_*` object should include:

- `reporting_date` or `reporting_month`
- `source_cutoff_timestamp`
- `refresh_timestamp`
- `metric_contract_version`
- `data_quality_status`
- `regulatory_context_tag`
- `owner_team`
