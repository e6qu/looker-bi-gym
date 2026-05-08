# 07 - Governance, Security, And Sharing

Area: D - Governance, Security, And Operations

Synthetic-data boundary: governance and sharing exercises use synthetic banking sources only. Do not use real or masked production banking data.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)
- [Regulation Briefs](../regulations/README.md)

Input sources:

- `mart.dim_customer_masked`
- `mart.dim_account_masked`
- `mart.fct_account_daily_balances`
- `mart.fct_aml_alerts`
- `serve.exec_monthly_bank_kpis`
- `serve.aml_alert_queue_daily`

Produces:

- Access-safe serving views.
- `serve.reg_context_register`
- `notes/07-governance-security-design.md`

## Problem

BI reports often need broad sharing without broad access to raw data.

## Outcome

You can choose credentials and BigQuery access controls appropriate to a dashboard audience.

## Tasks

- Create a safe serving dataset.
- Create an authorized view that excludes sensitive customer, account, credit, and investigation fields.
- Add a row-level policy or simulate regional, branch, or legal-entity filtering if permissions allow.
- Add column masking or document the required setup for customer identifiers, account numbers, tax identifiers, and credit attributes.
- Connect Looker Studio using appropriate credentials.
- Test report behavior as a viewer.
- Document sharing and ownership choices.
- Add EU/Romania context tags to the report, such as GDPR, Law 190/2018, BNR, ONPCSB, DORA, PSD2, or FGDB where applicable.

## Investigation Questions

- Should this report use owner, viewer, or service account credentials?
- Can a viewer access source tables directly?
- What data is visible in report metadata?
- Who owns the report if the author leaves?
- Which banking data is too sensitive for Looker Studio report-level modeling?
- Does GDPR-style data minimisation change what fields should be present in the serving table?
- Does the report need Romanian national identification number handling constraints?

## Deliverable

`notes/07-governance-security-design.md` plus a governance checklist for the demo dashboard.
