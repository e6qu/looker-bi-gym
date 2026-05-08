# Community Notes And Pitfalls

These notes summarize recurring issues from Stack Overflow, Reddit, Medium, and practitioner blogs. Treat them as field reports, not product guarantees.

## Looker Studio Blending Is Convenient But Fragile

Stack Overflow questions repeatedly show confusion around blends:

- Full outer blends can leave duplicated join fields that users then need to coalesce.
- Date aggregation can behave unexpectedly after blending.
- Percent-of-total and already-aggregated metrics can change meaning after blending.
- Calculated controls against blended data can be limited or sensitive to where fields are created.

Practical response:

- Use BigQuery SQL joins for important joins.
- Publish blended results as views or tables.
- Keep Looker Studio blends for small exploratory cases.

## Dashboard Cost Scales With Users And Charts

Reddit discussions from BigQuery/data engineering users describe a common pattern: each report page can generate many BigQuery queries, and active users multiply that query load.

Typical advice:

- Partition and cluster serving tables.
- Pre-aggregate to the grain users need.
- Avoid unnecessary dimensions.
- Avoid large custom SQL per chart.
- Reduce page/chart count.
- Use data freshness, extracts, BI Engine, or summary tables.
- Use `INFORMATION_SCHEMA.JOBS` to identify expensive reports.

The most important point: do not expose raw event tables to dashboards by default.

## Looker Studio Has A Semantic-Layer Gap

Community discussions often compare Looker Studio favorably for cost and ease, but identify a limitation: it lacks a robust governed semantic model like Looker or Power BI.

Practical response:

- Define metrics in BigQuery SQL.
- Use reusable data sources for shared fields.
- Document metrics in the repo.
- Avoid metric definitions hidden in individual charts.

## Calculated Fields Need Aggregation Discipline

Common mistakes:

- Dividing pre-aggregated metrics incorrectly.
- Using row-level formulas where aggregate formulas are intended.
- Re-aggregating metrics after they have already been aggregated.
- Mixing integer/number behavior or field types without checking output.

Rule of thumb:

- For ratios, use `SUM(numerator) / SUM(denominator)` at the desired chart grain.
- For business-critical formulas, prefer BigQuery SQL views.

## Performance Recommendations Recur Across Sources

Repeated practitioner advice:

- Push transformations upstream.
- Precompute joins and aggregates.
- Avoid many charts per page.
- Prefer simpler visualizations.
- Cache or extract when real-time is unnecessary.
- Use BigQuery materialized views or scheduled summary tables for repeated workloads.

This advice is consistent with official BigQuery guidance on doing less work, partitioning, clustering, materialized views, and BI Engine.

## Medium And Blog Tutorials Are Useful For Workflow, Not Authority

Medium posts are useful for screenshots, beginner flow, and end-to-end examples such as connecting BigQuery to Looker Studio or using materialized views. Use official Google docs for exact feature behavior, limits, and security.

## Hacker News Signal

Searches for this exact Looker Studio + BigQuery BI workflow on Hacker News were comparatively low-signal. The strongest practical discussions were on Reddit, Stack Overflow, Google docs, and BI/data-engineering blogs.

## Practical Takeaway

Most real-world pain points trace back to the same few causes: unclear grain, too much chart-layer logic, dashboard-layer joins, raw-table exposure, and missing cost observability. In banking, add four more recurring risks: sensitive-data exposure, unreconciled metrics, ambiguous date semantics, and missing review/signoff evidence.
