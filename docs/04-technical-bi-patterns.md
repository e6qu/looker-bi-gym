# Technical BI Patterns

Technical BI is the discipline of making analytics systems reliable enough for repeated decisions. The work is closer to software/data product engineering than ad hoc dashboarding.

## Pattern: Thin BI, Thick Warehouse

Problem:

- Looker Studio dashboards become slow, inconsistent, or expensive when they perform joins, blends, raw-event scans, and core metric calculations.

Solution:

- Build curated BigQuery serving tables/views.
- Precompute core metrics.
- Keep Looker Studio fields simple.
- Use chart calculations for presentation-only logic.

Deliverable:

- A `mart_*` layer for facts/dimensions and a `serve_*` layer for dashboards.

## Pattern: Metric Contract

Problem:

- Different dashboards define the same KPI differently.

Solution:

- Write a metric contract with name, description, owner, grain, formula, filters, numerator, denominator, allowed dimensions, freshness, and known caveats.

Example:

```yaml
metric: delinquency_rate_30_plus
owner: credit_risk_analytics
grain: loan_month_end_snapshot
formula: exposure_30_plus_dpd / total_exposure
allowed_dimensions:
  [reporting_month, product_family, branch_region, risk_segment]
freshness_sla: 24h
```

Deliverable:

- Markdown or YAML metric dictionary checked into the repo.

## Pattern: Dashboard Serving Table

Problem:

- A single generic fact table exposes too many dimensions and causes expensive dashboard queries.

Solution:

- Create one table per dashboard audience or use case.
- Aggregate to the lowest grain needed by that dashboard.
- Include only required dimensions and metrics.

Example:

- `serve_exec_monthly_bank_kpis`
- `serve_credit_risk_monthly_portfolio`
- `serve_aml_alert_queue_daily`
- `serve_backoffice_recon_daily`
- `serve_branch_ops_daily`

## Pattern: Grain Ladder

Problem:

- Users ask for both executive KPIs and drill-down detail from the same dashboard.

Solution:

- Provide multiple serving grains.
- Start high-level, link or drill to detail pages.
- Avoid making every chart scan the most detailed table.

Example:

- Monthly executive and finance summary.
- Daily branch/product/account trends.
- Transaction-level or case-level exception table with restricted access.

## Pattern: Fanout Guard

Problem:

- Joining fact tables or one-to-many dimensions multiplies measures.

Solution:

- Test join cardinality.
- Aggregate facts to a common grain before joining.
- Use bridge tables carefully.
- Avoid fact-to-fact joins in BI tools.

Diagnostic query:

```sql
SELECT key, COUNT(*) AS rows_per_key
FROM dimension_or_bridge
GROUP BY key
HAVING rows_per_key > 1;
```

## Pattern: Access-Safe Serving Dataset

Problem:

- Report sharing can expose too much data through owner credentials.

Solution:

- Publish only safe views/tables to a dedicated dataset.
- Apply authorized views, row-level policies, column-level tags, and masking.
- Connect Looker Studio only to the serving dataset.

## Pattern: Cost Attribution

Problem:

- BigQuery bills grow but dashboard owners do not know which reports are responsible.

Solution:

- Query `INFORMATION_SCHEMA.JOBS` for Looker Studio labels.
- Attribute bytes billed by report ID, data source ID, user, and date.
- Create a cost-monitoring dashboard.

## Pattern: BI Release Checklist

Before publishing:

- Metric definitions reviewed.
- Data source credential choice reviewed.
- Masking and row-level policy reviewed for customer/account data.
- BigQuery jobs tested with representative filters.
- Dashboard load time measured.
- Access model tested as a viewer.
- Data freshness shown or documented.
- Owner and support channel listed.
- Reconciliation and signoff process documented.
- Deprecation path defined.

## Pattern: Dashboard Triage

When a dashboard is slow:

- Count charts per page.
- Identify the slowest BigQuery jobs.
- Check bytes billed and slot time.
- Check whether filters prune partitions.
- Check custom SQL and blends.
- Check high-cardinality tables or controls.
- Move joins/calculations upstream.
- Replace raw source with summary table or materialized view.
- Adjust freshness/extracts if live data is not needed.

## Practical Takeaway

Good technical BI makes the common path fast, cheap, secure, and boring. The hard work is in contracts, grain, serving models, and monitoring.
