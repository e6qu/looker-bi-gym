# Business Intelligence Foundations

Business Intelligence is the practice of turning operational data into trusted, decision-oriented measurements. The technical work includes data modeling, metric design, access control, dashboard design, performance engineering, and lifecycle management.

## What BI Is Trying To Produce In A Bank

BI artifacts should answer business questions, not merely display available data. Common dashboard types are:

- Strategic dashboards: executive KPI monitoring, risk appetite, balance sheet, liquidity, credit quality, operational risk, usually weekly/monthly and highly aggregated.
- Analytical dashboards: diagnosis, comparisons, trends, cohorts, drivers, segmentation, branch/channel performance, portfolio analysis, and customer behavior.
- Operational dashboards: near-real-time monitoring and exception handling for payments, cards, AML/fraud queues, complaints, reconciliations, and service SLAs.
- Control dashboards: period close, reconciliation breaks, policy exceptions, remediation status, access reviews, and audit evidence.
- Self-service semantic interfaces: governed dimensions and metrics that users can combine safely.

The practical test is whether the dashboard changes a decision. If a chart has no decision path, owner, or action, it is usually decoration.

## Modeling Concepts

### Grain

Grain is the exact meaning of one row. It must be declared before choosing dimensions or facts. Examples:

- One row per customer per day.
- One row per posted transaction.
- One row per account per business date.
- One row per loan per month-end.
- One row per AML alert.
- One row per back-office case status event.

Metric correctness usually fails when grain is vague. For example, joining posted transactions to multi-owner account relationships can multiply transaction value if the relationship grain and ownership role are not controlled.

### Facts And Dimensions

Facts store events and measurements. Dimensions provide descriptive context.

Facts:

- `fct_transactions`
- `fct_account_daily_balances`
- `fct_loan_monthly_snapshot`
- `fct_card_authorizations`
- `fct_gl_entries`
- `fct_aml_alerts`
- `fct_cases`
- `fct_reconciliation_breaks`

Dimensions:

- `dim_date`
- `dim_customer`
- `dim_account`
- `dim_product`
- `dim_branch`
- `dim_channel`
- `dim_gl_account`
- `dim_risk_segment`

### Metric Types

Additive metrics can be summed across dimensions, such as transaction value, fee amount, charge-off amount, or GL posting amount.

Semi-additive metrics can be summed across some dimensions but not all, such as account balances or loan exposure across accounts for a single reporting date but not across time.

Non-additive metrics cannot be summed meaningfully, such as delinquency rate, approval rate, false positive rate, average daily balance, percent of total, or distinct customer count.

Ratios should usually be computed from base components:

```sql
SAFE_DIVIDE(SUM(delinquent_exposure), SUM(total_exposure))
```

not by averaging precomputed row-level ratios unless that is explicitly intended.

## Dimensional Modeling

The Kimball dimensional-modeling tradition remains useful for BigQuery-backed BI because it aligns schema design with analyst questions. The central process is:

1. Select a business process.
2. Declare the grain.
3. Identify dimensions.
4. Identify facts.

Star schemas are usually easier for BI users and tools than highly normalized OLTP schemas. In BigQuery, denormalized tables, nested/repeated fields, and star schemas can all be valid; the right choice depends on query patterns and serving needs.

## Semantic And Metrics Layers

A semantic layer centralizes business meaning: metrics, dimensions, joins, relationships, access logic, labels, descriptions, and approved drill paths.

A metrics layer is a narrower concept focused on metric definitions: aggregation logic, filters, grain, and dimensional compatibility.

Looker provides a semantic layer through LookML. Looker Studio has data-source modeling but does not provide the same governed cross-table model. For a Looker Studio + BigQuery project, the practical semantic layer often lives in:

- BigQuery views and materialized views.
- Shared SQL definitions.
- Documented metric contracts.
- Reusable Looker Studio data sources.
- Data tests and reconciliation queries.

## Dashboard Design Principles

Start with the question:

- "Are deposit balances moving outside plan by segment or branch?"
- "Which loan segments are driving delinquency or charge-off movement?"
- "Which AML/fraud queues are breaching SLA?"
- "Where did fee income or GL variance change this month?"
- "Which reconciliation breaks need escalation before close?"

Then define:

- Audience.
- Refresh cadence.
- Primary KPI.
- Supporting diagnostics.
- Required filters.
- Drill-down paths.
- Accepted latency.
- Data owner and dashboard owner.

Layout pattern:

- Top: KPI cards with target/context.
- Middle: trend and variance drivers.
- Lower: breakdowns and diagnostic tables.
- Side/top controls: date range and major business filters.

Avoid:

- Too many visuals on one page.
- Mixing operational and executive grains.
- Undocumented filters.
- Percentages without numerator/denominator definitions.
- Chart-layer calculations that duplicate warehouse metrics.

## BI Failure Modes

- Metric drift: each dashboard defines delinquency, deposits, fee income, or operational backlog differently.
- Fanout: joins multiply facts.
- Over-granularity: dashboards expose event-level data when users only need monthly aggregates.
- Hidden filters: numbers cannot be reconciled.
- Dashboard sprawl: obsolete reports remain trusted by accident.
- Performance debt: each chart triggers expensive queries.
- Access leakage: owner credentials expose data too broadly.
- No ownership: no one knows who can change or retire a report.
- Control weakness: dashboards cannot produce evidence for who reviewed which metric, when, and against what source.
- Date ambiguity: transaction, posting, effective, value, and reporting dates are mixed.
- Snapshot misuse: month-end balances or delinquency states are summed across periods.

## Practical Takeaway

Technical BI is an engineering discipline. Treat dashboards as production data products: define contracts, version logic, test metrics, monitor cost, secure access, and retire stale assets.
