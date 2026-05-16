---
id: terminology-looker-studio
title: Looker Studio Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, looker-studio]
---

# Looker Studio Terminology

## aggregation

The operation used to summarize metric values in a chart.

Example: a table can aggregate balance with sum and transaction count with
count.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#aggregate">aggregate<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#aggregate-function">aggregate function<sup>SQL</sup></a>.

## blend join configuration

The join keys, join operator, source order, and selected fields used by a
blend.

Example: a blend can retain different rows depending on source order and join
keys.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-blend">Looker Studio blend<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## chart

A visual component such as a table, scorecard, bar chart, line chart, time
series, or geo chart.

Example: a scorecard chart can show one total balance metric.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#scorecard">scorecard<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#visualization">visualization<sup>BI</sup></a>.

## chart-level calculated field

A calculated field that exists only inside one chart.

Example: a one-chart ratio formula is chart-level and will not automatically
serve other charts.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-calculated-field">Looker Studio calculated field<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#report-level-calculated-field">report-level calculated field<sup>LS</sup></a>.

## connector

A component that connects a data source to an underlying system such as
BigQuery, Google Sheets, or another supported source.

Example: the BigQuery connector lets a report use fields from BigQuery data.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-data-source">Looker Studio data source<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-table">BigQuery table<sup>BQ</sup></a>.

## control

A report component that lets viewers filter or change report data.

Example: a date range control can change which rows contribute to charts on a
page.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#filter-context">filter context<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#parameter">parameter<sup>LS</sup></a>.

## data credentials

The credential setting that determines whose access is used when the report
reads data.

Example: a shared report can read data through owner credentials or through
each viewer's credentials.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#owner-credentials">owner credentials<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#viewer-credentials">viewer credentials<sup>LS</sup></a>.

## data freshness

The setting and behavior that determine how long cached report data may be
reused before querying again.

Example: a report can display cached values after the source changed if the
freshness setting allows it.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#report-refresh-time">report refresh time<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>.

## data source field

A field exposed by a Looker Studio data source, including its name, type,
aggregation, and calculated-field definition when applicable.

Example: a currency field can be a text dimension, while a balance field can be
a numeric metric.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-data-source">Looker Studio data source<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#field-id">field ID<sup>LS</sup></a>.

## dimension

A field that groups, filters, or describes chart data.

Example: branch, product, date, and currency can be dimensions in a report.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#metric">metric<sup>LS</sup></a>.

## embedded data source

A data source stored inside one report rather than managed as a reusable data
source.

Example: an embedded data source is useful for a single report but weaker for
shared metric governance.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#reusable-data-source">reusable data source<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## field ID

A stable internal identifier used for a field inside a data source.

Example: changing a visible field name does not necessarily mean the field ID
changed.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#data-source-field">data source field<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-data-source">Looker Studio data source<sup>LS</sup></a>.

## Looker Studio blend

A combined data source created from multiple sources using join keys and
selected fields.

Example: a blend can combine a metric source with a small mapping source, but
duplicate keys can change totals.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#blend-join-configuration">blend join configuration<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## Looker Studio calculated field

A formula field defined in a chart or data source.

Example: a calculated field can derive a ratio from two numeric fields.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#chart-level-calculated-field">chart-level calculated field<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#report-level-calculated-field">report-level calculated field<sup>LS</sup></a>.

## Looker Studio data source

The connection, field list, field types, and settings that charts, controls,
and report components use.

Example: a report can connect to a BigQuery view through a data source.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#connector">connector<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">BigQuery logical view<sup>BQ</sup></a>.

## metric

A field that is aggregated or calculated in a chart context.

Example: total balance and transaction count can be chart metrics.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#aggregation">aggregation<sup>LS</sup></a>.

## owner credentials

A credential mode where viewers see data through the report owner's access
path.

Example: owner credentials can allow viewers to see report data even when they
do not have direct source access.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#data-credentials">data credentials<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#viewer-credentials">viewer credentials<sup>LS</sup></a>.

## parameter

A user-provided or report-provided value that can be used by compatible data
sources, calculated fields, or controls.

Example: a selected currency value can be passed into a compatible query
parameter flow.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bigquery.md#query-parameter">query parameter<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#control">control<sup>LS</sup></a>.

## report

A Looker Studio document containing pages, charts, controls, data sources,
layout, and sharing settings.

Example: an executive report can contain several pages with shared data
sources.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/bi.md#dashboard">dashboard<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#chart">chart<sup>LS</sup></a>.

## report-level calculated field

A calculated field available at the data-source level for reuse across charts
that use that data source.

Example: a reusable margin percentage should usually live above a single chart
when multiple charts need it.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-calculated-field">Looker Studio calculated field<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## reusable data source

A data source that can be shared and reused across reports.

Example: governed field definitions can be reused by several reports through a
reusable data source.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#embedded-data-source">embedded data source<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-source-field">data source field<sup>LS</sup></a>.

## scorecard

A chart type that displays one or a small number of metric values.

Example: a scorecard can show total balance for a selected date.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#chart">chart<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#metric">metric<sup>LS</sup></a>.

## viewer credentials

A credential mode where each viewer's own access determines what the report can
read.

Example: viewer credentials can prevent a viewer from seeing rows they cannot
access in the source system.

Sources:

- [Looker Studio Help](https://support.google.com/looker-studio).

Related:
<a class="termRef" href="#/terminology/looker-studio.md#data-credentials">data credentials<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#owner-credentials">owner credentials<sup>LS</sup></a>.
