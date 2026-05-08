# 01 - Connect Predefined Banking Data To Looker Studio

Area: A - Orientation And Source Data

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [Data Sources](data-sources.md)

Input sources:

- Preferred: `serve.deposit_daily_branch_product`
- Temporary fallback before marts exist: a simple synthetic view with `business_date`, `branch_id`, `product_family`, `currency_code`, `total_deposits`, and `account_count`.

Produces:

- First Looker Studio data source.
- First Looker Studio report page.
- `notes/01-connection-observations.md`

## Problem

Build the smallest useful dashboard from a predefined synthetic banking serving view to understand the connection workflow.

## Outcome

You can connect Looker Studio to BigQuery, create a data source, build a first page, and share or view it safely.

## Suggested Dataset

Use a public BigQuery dataset only if the synthetic banking source is not ready yet. For banking-domain practice, use the predefined synthetic dataset. Do not use real bank customer or transaction data in this repo.

## Tasks

- Query the dataset in BigQuery.
- Create a simple view with a clean business date field and a few dimensions.
- Connect Looker Studio to the view.
- Add KPI scorecards, a time series, a bar chart, and a table.
- Add a date range control and one dimension filter.
- Review the generated BigQuery jobs if available.

## Investigation Questions

- Does each chart issue a separate query?
- Which credentials are used?
- What field types did Looker Studio infer?
- What happens when you change the date range?
- What changes if the date represents posting date versus transaction date?

## Deliverable

A first Looker Studio report plus `notes/01-connection-observations.md` with screenshots or links, field definitions, and observations.
