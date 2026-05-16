---
id: terminology-bi
title: BI Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, bi]
---

# BI Terminology

## aggregate

A value calculated from multiple rows, such as a sum, count, average, minimum,
or maximum.

Example: total deposits by branch is an aggregate if it sums account balances
inside each branch.

Related:
<a class="termRef" href="#/terminology/sql.md#aggregate-function">aggregate function<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>.

## aggregation level

The grouping level used to calculate a metric, such as by day, branch, product,
customer segment, or currency.

Example: total balance by currency has a different aggregation level from total
balance by branch and currency.

Related:
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#group-by">GROUP BY<sup>SQL</sup></a>.

## attribute

A descriptive field used to explain or classify a record. An attribute may
become a dimension when it is used for grouping or filtering.

Example: product type is an attribute of an account and can be used as a report
dimension.

Related:
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#dimension">dimension<sup>LS</sup></a>.

## cardinality

The number of distinct values in a field or relationship.

Example: customer identifier usually has higher cardinality than currency code.

Related:
<a class="termRef" href="#/terminology/sql.md#count-distinct">COUNT DISTINCT<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>.

## conformed dimension

A shared dimension used consistently across fact tables or reporting areas.

Example: a common calendar dimension lets deposit, loan, and transaction reports
use the same month and quarter labels.

Related:
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fact-table">fact table<sup>BI</sup></a>.

## control total

A trusted comparison number used to detect broken joins, filters, missing rows,
or stale data.

Example: a warehouse total of EUR balances can be compared with a dashboard
scorecard total before release.

Related:
<a class="termRef" href="#/terminology/bi.md#reconciliation">reconciliation<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## dashboard

A visual reporting surface that combines metrics, dimensions, filters, and
context for repeated use.

Example: a liquidity dashboard may show balances by branch, currency, and
business date.

Related:
<a class="termRef" href="#/terminology/looker-studio.md#report">report<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#visualization">visualization<sup>BI</sup></a>.

## derived metric

A metric calculated from other metrics or fields, such as a ratio, rate,
variance, or rolling total.

Example: missing-balance rate is derived from missing-balance count divided by
total row count.

Related:
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#case">CASE<sup>SQL</sup></a>.

## dimension

A field used to group, filter, or describe data.

Example: branch, currency, product, customer segment, and business date are
common BI dimensions.

Related:
<a class="termRef" href="#/terminology/looker-studio.md#dimension">dimension<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>.

## drill-down

Moving from a summarized view to a more detailed level of analysis.

Example: a regional total can drill down to branch totals, then to product
totals.

Related:
<a class="termRef" href="#/terminology/bi.md#hierarchy">hierarchy<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#aggregation-level">aggregation level<sup>BI</sup></a>.

## fact table

A table containing measurable business events or snapshots, usually with keys
to dimensions and numeric measures.

Example: a payment transaction table is a fact table when each row records one
payment event.

Related:
<a class="termRef" href="#/terminology/bi.md#transaction-fact">transaction fact<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#snapshot-fact">snapshot fact<sup>BI</sup></a>.

## fanout

Row multiplication caused by a join. Fanout is dangerous when a measure is
duplicated before aggregation.

Example: joining account balances to multiple account owners can duplicate the
balance rows.

Related:
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#control-total">control total<sup>BI</sup></a>.

## filter context

The set of active filters that determines which rows contribute to a visual or
metric.

Example: a date filter and currency filter together define the filter context
for a scorecard.

Related:
<a class="termRef" href="#/terminology/looker-studio.md#control">control<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/sql.md#filter-predicate">filter predicate<sup>SQL</sup></a>.

## grain

The level of detail represented by one row before aggregation.

Example: one row per transaction is a different grain from one row per customer
per month.

Related:
<a class="termRef" href="#/terminology/bi.md#aggregation-level">aggregation level<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## hierarchy

Ordered levels used for analysis.

Example: country, region, branch is a geographic hierarchy; year, quarter,
month, day is a calendar hierarchy.

Related:
<a class="termRef" href="#/terminology/bi.md#drill-down">drill-down<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>.

## key

A field used to identify or join records. Keys need clear uniqueness and
relationship rules before they are used in joins.

Example: an account key may be unique in an account table but repeat in a daily
balance table.

Related:
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## measure

A numeric field that can be aggregated or used in a metric.

Example: balance amount, transaction amount, exposure amount, and fee amount
are measures.

Related:
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#semi-additive-metric">semi-additive metric<sup>BI</sup></a>.

## metric

A numeric result that is calculated or aggregated for analysis.

Example: total balance, count of depositors, non-performing exposure ratio, and
missing-value rate are metrics.

Related:
<a class="termRef" href="#/terminology/looker-studio.md#metric">metric<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## metric contract

A documented definition for a metric, including grain, calculation, filters,
NULL handling, ownership, and reconciliation rules.

Example: a balance metric contract states the reference date, allowed
aggregation, currency handling, and control total.

Related:
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#missing-value-policy">missing-value policy<sup>BI</sup></a>.

## missing-value policy

A rule for how NULL, blank, missing, invalid, or zero values are treated in
calculations and displays.

Example: an all-NULL branch group may display as blank with a warning instead
of silently becoming zero.

Related:
<a class="termRef" href="#/terminology/sql.md#null">NULL<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#safe-cast">SAFE_CAST<sup>SQL</sup></a>.

## reference date

The business date attached to the data itself. It is separate from report
refresh time or query execution time.

Example: a report refreshed at 09:00 can still show balances for the previous
business date.

Related:
<a class="termRef" href="#/terminology/bi.md#report-refresh-time">report refresh time<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-freshness">data freshness<sup>LS</sup></a>.

## reconciliation

A control process that compares a dashboard or query result to a known expected
total, count, or rule.

Example: comparing a dashboard total to a warehouse control total is a
reconciliation step.

Related:
<a class="termRef" href="#/terminology/bi.md#control-total">control total<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#job-metadata">job metadata<sup>BQ</sup></a>.

## report refresh time

The time a report or dashboard last queried, cached, or refreshed data.

Example: refresh time explains when a report last loaded data, not which
business date the data represents.

Related:
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-freshness">data freshness<sup>LS</sup></a>.

## semi-additive metric

A metric that can be summed across some dimensions but not across all
dimensions.

Example: an end-of-day balance can usually be summed across accounts for one
date, but not blindly summed across several dates.

Related:
<a class="termRef" href="#/terminology/bi.md#snapshot-fact">snapshot fact<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#sum">SUM<sup>SQL</sup></a>.

## snapshot fact

A fact table row that records state at a point in time rather than a transaction
event.

Example: a month-end loan exposure row is a snapshot fact.

Related:
<a class="termRef" href="#/terminology/bi.md#semi-additive-metric">semi-additive metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## slicing

Filtering or grouping a metric by one or more dimensions to inspect a subset of
the data.

Example: viewing total balance for one currency is a slice of the full balance
metric.

Related:
<a class="termRef" href="#/terminology/bi.md#filter-context">filter context<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>.

## transaction fact

A fact table row that records an event.

Example: a card payment, fee posting, transfer, or balance movement can be a
transaction fact.

Related:
<a class="termRef" href="#/terminology/bi.md#fact-table">fact table<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#snapshot-fact">snapshot fact<sup>BI</sup></a>.

## visualization

A chart, table, scorecard, or other visual representation of data.

Example: a line chart for monthly deposits is a visualization.

Related:
<a class="termRef" href="#/terminology/looker-studio.md#chart">chart<sup>LS</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dashboard">dashboard<sup>BI</sup></a>.
