# Looker Studio Field Guide

Looker Studio is a reporting and dashboarding tool that can connect directly to BigQuery. It is useful for quick, shareable, low-cost dashboards, especially when the data has already been modeled for BI.

## Core Objects

Connector:

- The mechanism used to access a platform such as BigQuery, Google Sheets, Google Analytics, or a community connector.

Data source:

- A configured connection to a connector.
- Holds schema metadata, field names, data types, calculated fields, parameters, credentials, freshness settings, and reusable modeling choices.

Report:

- The dashboard or document containing pages, charts, controls, filters, text, images, themes, and embedded data sources or reusable data sources.

Chart:

- A visualization that issues queries against its data source or blend.

Control:

- An interactive input for filtering, date selection, parameter values, or data-control changes.

Blend:

- A report-level data source created by joining up to five data sources.

## BigQuery Connection Pattern

Typical workflow:

1. Create or select a BigQuery project, dataset, and table/view.
2. In Looker Studio, add a BigQuery data source.
3. Select table/view or use custom SQL.
4. Choose credentials.
5. Review field types and default aggregations.
6. Build charts and controls.
7. Configure data freshness and sharing.

For a maintainable BI project, prefer connecting to curated BigQuery tables or views rather than raw operational tables.

## Calculated Fields

Calculated fields can be created in a data source or in a chart.

Data-source calculated fields:

- Reusable across reports that use the data source.
- Better for shared definitions.
- Require edit rights on the data source.

Chart-specific calculated fields:

- Local to one chart.
- Useful for quick presentation logic.
- Risky for core business metrics because definitions fragment across charts.

Common patterns:

```text
Delinquency Rate = SUM(delinquent_exposure) / SUM(total_exposure)
```

```text
AML False Positive Rate = SUM(false_positive_alerts) / SUM(closed_alerts)
```

Prefer aggregated numerator/denominator calculations for ratios. Avoid row-level ratio averages unless explicitly intended.

## Parameters And Controls

Parameters can support user-controlled values, custom query inputs, and calculated-field behavior. Controls let users set filters, date ranges, and parameter values.

Useful tutorial examples:

- Date range control.
- Region filter.
- Branch, legal entity, or business-line filter.
- Product family filter: checking, savings, mortgage, consumer loan, card.
- Metric selector parameter.
- Target threshold parameter for KPI status.

## Data Blending

Blends are convenient for lightweight joins across sources, but they are a frequent source of correctness and performance issues.

Use blends when:

- Data is small.
- Join keys are clean.
- The analysis is exploratory.
- The blend fields are minimal.
- You understand the aggregation behavior.

Avoid blends when:

- Joining large BigQuery tables.
- Joining event-level facts from multiple processes.
- Using many fields that are not charted.
- Computing critical metrics.
- Needing reusable logic across reports.

Better pattern:

- Join and aggregate upstream in BigQuery.
- Publish one curated serving table or view.
- Connect Looker Studio to that object.

## Credentials And Sharing

Credentials determine who can see underlying data:

- Owner credentials: viewers can see data through the credential owner even if they lack direct BigQuery access.
- Viewer credentials: each viewer must have direct access.
- Service account credentials: organization-managed, BigQuery-only, useful for enterprise governance.

Risk pattern:

- A report shared broadly with owner credentials may expose data to users who cannot query the source directly.

Safer pattern:

- Use authorized views, row-level policies, column-level policy tags, masked fields, or dedicated serving datasets.
- Use viewer credentials when per-user access matters.
- Use service accounts where supported and governed.

## Freshness And Caching

Looker Studio data freshness controls how often it requests fresh data from sources. When cached results are valid, reports can load faster and reduce source query cost.

Practical guidance:

- Executive dashboards rarely need minute-level freshness.
- Daily or hourly freshness is enough for many finance, portfolio, and back-office reports.
- AML/fraud operations may need fresher queue data, with explicit cost and control tradeoffs.
- Operational dashboards need explicit freshness and cost tradeoffs.
- Extracted data sources can help when live data is unnecessary.

## Performance Guidance

Keep Looker Studio thin:

- Use BigQuery for joins, cleaning, deduping, metric logic, and heavy aggregations.
- Publish tables at the grain users need.
- Reduce fields in data sources and blends.
- Reduce charts per page.
- Avoid giant tables and pivots.
- Avoid high-cardinality controls unless needed.
- Use partition filters through date controls and prefiltered serving views.
- Monitor generated BigQuery jobs.

## Common Pitfalls

- Blended metrics change meaning after aggregation.
- Full outer blends expose duplicate join keys or null-side rows.
- Calculated fields behave differently depending on row-level vs aggregate context.
- Too many dashboard components create many BigQuery jobs.
- Custom SQL can hide inefficient queries from casual report editors.
- Copying reports can copy embedded data sources and drift definitions.

## Practical Takeaway

Looker Studio is strongest when BigQuery provides a clean, documented, aggregated, secure, and performant serving layer. Use Looker Studio for presentation and interaction; use BigQuery for semantics and computation.
