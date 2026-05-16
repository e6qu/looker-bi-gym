---
id: terminology-bigquery
title: BigQuery Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, bigquery]
---

# BigQuery Terminology

## authorized view

A view configured to expose selected data without granting direct access to the
underlying table.

Example: a report can read a curated view while raw account-level tables remain
restricted.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">BigQuery logical view<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#gdpr-data-minimisation">GDPR data minimisation<sup>REG</sup></a>.

## BigQuery column

A named field in a BigQuery table or view.

Example: a `currency_code` column can be used as a dashboard dimension.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-table">BigQuery table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-source-field">data source field<sup>LS</sup></a>.

## BigQuery dataset

A container for BigQuery tables, views, routines, and access controls in a
location.

Example: EU-region reporting tables are commonly grouped into a dataset located
in the EU.

Related:
<a class="termRef" href="#/terminology/bigquery.md#data-location">data location<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-table">BigQuery table<sup>BQ</sup></a>.

## BigQuery job

A unit of work submitted to BigQuery, such as a query job, load job, extract
job, or copy job.

Example: each executed dashboard query can create a query job.

Related:
<a class="termRef" href="#/terminology/bigquery.md#job-metadata">job metadata<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-freshness">data freshness<sup>LS</sup></a>.

## BigQuery logical view

A virtual table defined by SQL. The defining query runs when the view is
queried.

Example: a view can expose governed dashboard fields without creating another
physical table.

Related:
<a class="termRef" href="#/terminology/sql.md#select-list">SELECT list<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-materialized-view">BigQuery materialized view<sup>BQ</sup></a>.

## BigQuery materialized view

A view-like object that can store precomputed results for compatible query
patterns and refresh rules.

Example: a repeatedly used aggregate may be a candidate for a materialized view
if its SQL fits the restrictions.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">BigQuery logical view<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#materialized-result-cache">materialized result cache<sup>BQ</sup></a>.

## BigQuery reservation

A capacity-management resource used to allocate slots for workloads.

Example: production BI queries and ad hoc analyst queries can be assigned to
different capacity arrangements.

Related:
<a class="termRef" href="#/terminology/bigquery.md#slot">slot<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>.

## BigQuery table

A physical table stored in a BigQuery dataset.

Example: a warehouse table can store daily balances, transaction events, or
customer reference data.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-dataset">BigQuery dataset<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#partitioned-table">partitioned table<sup>BQ</sup></a>.

## clustering

Table organization by one or more columns to improve filtering and reduce data
scanned for suitable queries.

Example: clustering by customer or account fields can help queries that filter
on those fields.

Related:
<a class="termRef" href="#/terminology/bigquery.md#partitioned-table">partitioned table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#dry-run">dry run<sup>BQ</sup></a>.

## data location

The geographic location where BigQuery data is stored and processed.

Example: a view and the tables it references need compatible locations.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-dataset">BigQuery dataset<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">BigQuery logical view<sup>BQ</sup></a>.

## dry run

A query validation mode that estimates bytes processed without running the
query.

Example: a dry run can show whether a dashboard query will scan too much data
before it is published.

Related:
<a class="termRef" href="#/terminology/bigquery.md#query-validator">query validator<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#partition-predicate">partition predicate<sup>SQL</sup></a>.

## external table

A table definition that lets BigQuery query data stored outside native BigQuery
storage.

Example: an external table can query files in cloud storage without loading
them into native storage first.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-table">BigQuery table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#data-location">data location<sup>BQ</sup></a>.

## INFORMATION_SCHEMA

Metadata views that expose information about datasets, tables, jobs,
reservations, and other BigQuery resources.

Example: job metadata views can support cost and activity review.

Related:
<a class="termRef" href="#/terminology/bigquery.md#job-metadata">job metadata<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reconciliation">reconciliation<sup>BI</sup></a>.

## job metadata

Metadata about executed jobs, such as creation time, bytes processed, and user
identity fields.

Example: bytes processed and creation time can support a dashboard cost review.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>.

## legacy SQL

BigQuery's older SQL dialect.

Example: modern BI queries should normally use BigQuery standard SQL rather
than legacy SQL.

Related:
<a class="termRef" href="#/terminology/bigquery.md#standard-sql">standard SQL<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>.

## materialized result cache

Cached query results that can reduce repeated query work when cache rules are
satisfied.

Example: repeated identical queries may reuse cached results depending on
BigQuery cache eligibility.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-materialized-view">BigQuery materialized view<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#data-freshness">data freshness<sup>LS</sup></a>.

## nested field

A field inside a STRUCT or repeated structure.

Example: an address STRUCT may contain city, region, and country fields.

Related:
<a class="termRef" href="#/terminology/bigquery.md#repeated-field">repeated field<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-column">BigQuery column<sup>BQ</sup></a>.

## parameterized query

A query that accepts typed parameter values while keeping SQL structure fixed.

Example: a report can pass a selected currency value into a parameterized
predicate.

Related:
<a class="termRef" href="#/terminology/bigquery.md#query-parameter">query parameter<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/looker-studio.md#parameter">parameter<sup>LS</sup></a>.

## partitioned table

A table divided into partitions, commonly by date or timestamp, so filters can
reduce scanned data.

Example: a date-partitioned fact table should receive a date predicate from a
dashboard date range.

Related:
<a class="termRef" href="#/terminology/sql.md#partition-predicate">partition predicate<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#clustering">clustering<sup>BQ</sup></a>.

## query parameter

A named or positional value supplied to a query. Parameters are for values, not
table names, column names, or raw SQL fragments.

Example: `@selected_currency` can hold `EUR`; it should not hold a table name.

Related:
<a class="termRef" href="#/terminology/bigquery.md#parameterized-query">parameterized query<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#filter-predicate">filter predicate<sup>SQL</sup></a>.

## query validator

BigQuery validation behavior that checks SQL and can estimate bytes before
execution.

Example: validation can catch invalid SQL before the query is run.

Related:
<a class="termRef" href="#/terminology/bigquery.md#dry-run">dry run<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#job-metadata">job metadata<sup>BQ</sup></a>.

## repeated field

A field that can contain an array of values within a row.

Example: an account row could contain a repeated list of flags or attributes.

Related:
<a class="termRef" href="#/terminology/bigquery.md#nested-field">nested field<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>.

## scheduled query

A query configured to run on a schedule and write or refresh results.

Example: a daily scheduled query can prepare a serving table before business
users open dashboards.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bi.md#report-refresh-time">report refresh time<sup>BI</sup></a>.

## slot

A unit of computational capacity used to execute BigQuery queries.

Example: more slots can increase parallel query execution capacity.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-reservation">BigQuery reservation<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>.

## standard SQL

BigQuery's GoogleSQL dialect used for modern query work.

Example: standard SQL supports familiar constructs such as CTEs, window
functions, and typed query parameters.

Related:
<a class="termRef" href="#/terminology/bigquery.md#legacy-sql">legacy SQL<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#window-function">window function<sup>SQL</sup></a>.

## table snapshot

A read-only copy of a table at a point in time.

Example: a snapshot can preserve a table state for audit or recovery workflows.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-table">BigQuery table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bi.md#snapshot-fact">snapshot fact<sup>BI</sup></a>.

## wildcard table

A query pattern that uses a wildcard to match multiple similarly named tables.

Example: a wildcard query can read several sharded daily tables, though
partitioned tables are usually easier to govern.

Related:
<a class="termRef" href="#/terminology/bigquery.md#partitioned-table">partitioned table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/sql.md#filter-predicate">filter predicate<sup>SQL</sup></a>.
