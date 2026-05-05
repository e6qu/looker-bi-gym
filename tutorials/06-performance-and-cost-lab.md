# 06 - Performance And Cost Lab

Area: C - Looker Studio Dashboards

Builds on:

- [03 - First Executive Dashboard](03-first-executive-dashboard.md)

Input sources:

- `mart.fct_posted_transactions`
- `mart.fct_account_daily_balances`
- `serve.deposit_daily_branch_product`
- BigQuery `INFORMATION_SCHEMA.JOBS`

Produces:

- `serve.bi_ops_cost_daily`
- `notes/06-performance-cost-report.md`

## Problem

Banking BI dashboards can become expensive when many users and charts query large transaction, balance, alert, or case tables repeatedly.

## Outcome

You can measure Looker Studio-generated BigQuery jobs and reduce query cost through modeling and caching.

## Tasks

- Build a deliberately inefficient dashboard page over a detailed banking table, such as posted transactions or alert events.
- Record load time and BigQuery bytes billed.
- Identify Looker Studio jobs in `INFORMATION_SCHEMA.JOBS`.
- Add partition filters and reduce chart fields.
- Create a summary table or materialized view at account-day, product-day, branch-day, or month-end portfolio grain.
- Repoint the dashboard to the optimized serving object.
- Compare cost and latency.

## Investigation Questions

- Which chart is most expensive?
- Does the date filter prune partitions?
- Are custom SQL queries hiding repeated work?
- Would BI Engine help this workload?
- What freshness interval is acceptable?
- What dimensions are unnecessary for the report audience and should be removed from the serving table?

## Deliverable

`notes/06-performance-cost-report.md` with before/after bytes billed, load time, query count, and recommended dashboard limits.
