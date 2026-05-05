# 02 - Build A BI-Friendly Model

Area: B - Warehouse Modeling And Metrics

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [Data Sources](data-sources.md)

Input sources:

- `raw_ref.calendar`
- `raw_ref.legal_entities`
- `raw_ref.branches`
- `raw_ref.products`
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
- `notes/02-grain-declarations.md`

## Problem

Raw tables are rarely ideal for dashboards. Build a simple dimensional model that declares grain and separates facts from dimensions.

## Outcome

You can design a star schema and explain why it is easier for BI than a raw operational schema.

## Tasks

- Choose a banking demo domain: deposits, consumer loans, card transactions, AML/fraud alerts, GL reconciliation, complaints, or back-office case operations.
- Define the business process.
- Declare the fact-table grain.
- Identify dimensions and facts.
- Create BigQuery views or tables for one fact and three dimensions.
- Add a `dim_date` or date spine if useful.

## Investigation Questions

- What is one row in each table?
- Which facts are additive?
- Which metrics are ratios?
- Which dimensions are safe to group by?
- What joins can create fanout?
- Which date column drives reporting: transaction, posting, effective, value, or month-end date?

## Deliverable

SQL files or saved BigQuery views for the listed `mart.*` objects, plus `notes/02-grain-declarations.md`.
