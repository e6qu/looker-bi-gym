# BigQuery For Business Intelligence

BigQuery is well suited to BI because it stores large analytical datasets, executes SQL at scale, supports views and materialized views, integrates with Looker Studio and Looker, and exposes job metadata for cost/performance monitoring.

## Serving-Layer Pattern

A BI-friendly BigQuery project should separate layers:

- Raw: source-shaped ingested data.
- Staging: cleaned, typed, deduplicated data.
- Marts: fact and dimension models.
- Serving: dashboard-specific or audience-specific tables/views.
- Monitoring: job, cost, freshness, and data-quality tables/views.

For Looker Studio, the serving layer should usually be the connection target.

## Tables, Views, Materialized Views, Summary Tables

Logical views:

- Store SQL only.
- Always compute at query time.
- Useful for lightweight abstraction, security, and reusable logic.
- Can be expensive if they hide complex joins over large data.

Materialized views:

- Store precomputed query results.
- Can reduce latency and scan cost for repeated patterns.
- BigQuery may rewrite compatible queries to use them.
- Best for predictable BI patterns such as pre-aggregation, pre-filtering, and pre-joining.
- Have SQL and feature limitations.

Scheduled summary tables:

- Run arbitrary SQL on a schedule and store results.
- More flexible than materialized views.
- Less fresh unless scheduled frequently.
- Good for complex marts and dashboard-specific aggregates.

Extracted Looker Studio sources:

- Snapshot data into Looker Studio.
- Useful when low latency and low source-query cost matter more than live data.
- Less suitable for governed enterprise data if source-of-truth semantics must remain in BigQuery.

## Partitioning And Clustering

Partition tables on a frequently filtered date or ingestion timestamp when queries can prune partitions.

Cluster tables on commonly filtered or grouped dimensions, especially high-cardinality fields such as customer, account, branch, region, legal entity, product, merchant, counterparty, or case identifiers.

Dashboard design should align with storage design:

- Date controls should map to partition columns.
- Common filters should map to clustered columns.
- Serving tables should avoid unnecessary dimensions that increase scan cost and cardinality.

## Nested And Repeated Data

BigQuery supports nested `STRUCT` and repeated `ARRAY` fields. These can improve performance for hierarchical relationships by reducing shuffling and joins.

For BI tools, however, nested data can be harder to expose directly. Use nested data in raw or intermediate models when helpful, then flatten or aggregate into Looker Studio-friendly serving tables.

## BI Engine

BI Engine is BigQuery's in-memory acceleration service for BI queries. It can accelerate repeated dashboard queries and integrates with Looker Studio and Looker.

Useful conditions:

- Repeated dashboard workloads.
- Frequently queried subsets.
- Partitioned tables where dashboard users mostly query recent data.
- Materialized views or summary tables that fit acceleration patterns.

BI Engine is not a substitute for good modeling. Poorly designed dashboards can still issue too many queries or request too much data.

## Cost And Performance Engineering

Optimize for less work:

- Select only needed columns.
- Filter partitions.
- Pre-aggregate.
- Avoid repeated raw joins.
- Avoid unnecessary `COUNT(DISTINCT ...)` at dashboard load time.
- Consider approximate aggregations where acceptable.
- Prefer `LIKE` over regex when regex power is unnecessary.
- Use materialized views or summary tables for repeated heavy queries.

Measure:

- `INFORMATION_SCHEMA.JOBS` for job metadata, bytes billed, cache hits, users, labels, and BI Engine stats.
- Query plan/timeline for execution stages and bottlenecks.
- Audit logs for security and operational questions.

Looker Studio jobs include labels that can identify report and data source IDs, which enables dashboard-level cost attribution.

## Security For BI

BigQuery supports multiple access-control layers:

- IAM at project, dataset, table, and view levels.
- Authorized views to share query results without exposing source tables.
- Row-level access policies to filter rows per principal.
- Column-level access with policy tags.
- Dynamic data masking to obscure sensitive fields.

Banking use cases:

- Regional managers see only their region.
- Analysts see hashed or masked customer and account identifiers.
- Executives see aggregate views, not customer-level transaction details.
- External partners query authorized views only.
- AML/fraud users get restricted investigation datasets with audited access.
- Finance users get GL and reconciliation views scoped to close processes.

## Data Quality And Reconciliation

BI serving models need tests:

- Primary key uniqueness in dimensions.
- No duplicate posted transaction identifiers unless source semantics allow corrections.
- No negative transaction amounts unless debit/credit or reversal logic explains them.
- Fact row counts reconcile to staging.
- GL posting totals reconcile to source ledgers and reporting cuts.
- Balance totals reconcile across account-day, product, branch, and legal entity grains.
- Null rates for join keys.
- Freshness checks for each source.
- Fanout checks before joining facts.
- Snapshot checks for month-end loan exposure and delinquency.
- Reversal/adjustment checks for transaction metrics.

## Practical Takeaway

In a Looker Studio + BigQuery BI system, BigQuery is not just a database. It is the modeling, governance, semantic, performance, and observability backbone.
