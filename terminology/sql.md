---
id: terminology-sql
title: SQL Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, sql]
---

# SQL Terminology

## aggregate function

<span class="termBadge">SQL</span>

A function that combines values from multiple rows into one result per group.

Example: `SUM`, `COUNT`, `AVG`, `MIN`, and `MAX` are aggregate functions.

Related:
<a class="termRef" href="#/terminology/bi.md#aggregate">aggregate<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#group-by">GROUP BY<sup>SQL</sup></a>.

## AVG

<span class="termBadge">SQL</span>

Calculates the average of non-NULL numeric values in a group.

Example: `AVG(transaction_amount)` returns the average non-NULL transaction
amount in each group.

Related:
<a class="termRef" href="#/terminology/sql.md#aggregate-function">aggregate function<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#null">NULL<sup>SQL</sup></a>.

## CASE

<span class="termBadge">SQL</span>

Applies conditional logic and returns different values for different
conditions.

Example: `CASE WHEN amount < 0 THEN 'outflow' ELSE 'inflow' END` classifies
signed amounts.

Related:
<a class="termRef" href="#/terminology/bi.md#derived-metric">derived metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#filter-predicate">filter predicate<sup>SQL</sup></a>.

## CAST

<span class="termBadge">SQL</span>

Converts a value from one data type to another and can fail when the value is
not valid for the target type.

Example: `CAST('2026-03-31' AS DATE)` converts text to a date.

Related:
<a class="termRef" href="#/terminology/sql.md#safe-cast">SAFE_CAST<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#missing-value-policy">missing-value policy<sup>BI</sup></a>.

## common table expression

<span class="termBadge">SQL</span>

A named temporary query block introduced with `WITH` and used inside a larger
SQL statement.

Example: `WITH monthly AS (...) SELECT ... FROM monthly` separates monthly
preparation from the final result.

Related:
<a class="termRef" href="#/terminology/sql.md#select-list">SELECT list<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>.

## COUNT

<span class="termBadge">SQL</span>

Counts rows or non-NULL values, depending on the expression used.

Example: `COUNT(*)` counts rows; `COUNT(customer_key)` counts rows where
`customer_key` is not NULL.

Related:
<a class="termRef" href="#/terminology/sql.md#count-distinct">COUNT DISTINCT<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#null">NULL<sup>SQL</sup></a>.

## COUNT DISTINCT

<span class="termBadge">SQL</span>

Counts unique values inside each result group.

Example: `COUNT(DISTINCT depositor_id)` counts each depositor value once in the
group.

Related:
<a class="termRef" href="#/terminology/bi.md#cardinality">cardinality<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>.

## DATE_TRUNC

<span class="termBadge">SQL</span>

Converts a date or timestamp to a chosen period boundary.

Example: `DATE_TRUNC(transaction_date, MONTH)` creates a month bucket.

Related:
<a class="termRef" href="#/terminology/bi.md#aggregation-level">aggregation level<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## filter predicate

<span class="termBadge">SQL</span>

A Boolean condition in a `WHERE`, `HAVING`, `ON`, or similar clause.

Example: `business_date = DATE '2026-03-31'` is a filter predicate.

Related:
<a class="termRef" href="#/terminology/bi.md#filter-context">filter context<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#where">WHERE<sup>SQL</sup></a>.

## GROUP BY

<span class="termBadge">SQL</span>

Defines the grouping level for aggregate results.

Example: `GROUP BY branch_id, currency_code` calculates one aggregate row for
each branch and currency combination.

Related:
<a class="termRef" href="#/terminology/bi.md#aggregation-level">aggregation level<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#aggregate-function">aggregate function<sup>SQL</sup></a>.

## HAVING

<span class="termBadge">SQL</span>

Filters grouped rows after aggregation.

Example: `HAVING SUM(balance_amount) <> 0` keeps only groups with non-zero
totals.

Related:
<a class="termRef" href="#/terminology/sql.md#group-by">GROUP BY<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#where">WHERE<sup>SQL</sup></a>.

## JOIN

<span class="termBadge">SQL</span>

Combines rows from two inputs according to join conditions.

Example: joining accounts to branches can add branch attributes to account
rows.

Related:
<a class="termRef" href="#/terminology/bi.md#key">key<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## LEFT JOIN

<span class="termBadge">SQL</span>

Keeps all rows from the left input and matches rows from the right input when
the join condition succeeds.

Example: a left join from accounts to optional branch metadata keeps accounts
even when metadata is missing.

Related:
<a class="termRef" href="#/terminology/sql.md#join">JOIN<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/bi.md#missing-value-policy">missing-value policy<sup>BI</sup></a>.

## NULL

<span class="termBadge">SQL</span>

A missing or unknown value marker, not zero and not an empty string.

Example: `SUM(amount)` and `COUNT(amount)` handle NULL differently from
`COUNT(*)`.

Related:
<a class="termRef" href="#/terminology/bi.md#missing-value-policy">missing-value policy<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#safe-cast">SAFE_CAST<sup>SQL</sup></a>.

## ORDER BY

<span class="termBadge">SQL</span>

Sorts result rows or defines ordering within a window function.

Example: `ORDER BY business_date DESC` sorts newest dates first.

Related:
<a class="termRef" href="#/terminology/sql.md#row-number">ROW_NUMBER<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#window-function">window function<sup>SQL</sup></a>.

## partition predicate

<span class="termBadge">SQL</span>

A filter on a partitioning column that lets the warehouse skip irrelevant
partitions.

Example: filtering a date-partitioned table by date can reduce scanned data.

Related:
<a class="termRef" href="#/terminology/bigquery.md#partitioned-table">partitioned table<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#dry-run">dry run<sup>BQ</sup></a>.

## QUALIFY

<span class="termBadge">SQL</span>

Filters rows after window functions are evaluated.

Example: `QUALIFY ROW_NUMBER() OVER (...) = 1` keeps the first ranked row in
each window partition.

Related:
<a class="termRef" href="#/terminology/sql.md#row-number">ROW_NUMBER<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#window-function">window function<sup>SQL</sup></a>.

## ROW_NUMBER

<span class="termBadge">SQL</span>

Assigns a sequence number to rows inside a window partition.

Example: `ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY business_date
DESC)` ranks rows from newest to oldest inside each account.

Related:
<a class="termRef" href="#/terminology/sql.md#qualify">QUALIFY<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#partition-by">PARTITION BY<sup>SQL</sup></a>.

## SAFE_CAST

<span class="termBadge">SQL</span>

Converts a value to a type and returns NULL instead of failing when conversion
is invalid.

Example: `SAFE_CAST(raw_amount AS NUMERIC)` returns NULL for invalid numeric
text.

Related:
<a class="termRef" href="#/terminology/sql.md#cast">CAST<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#null">NULL<sup>SQL</sup></a>.

## SELECT list

<span class="termBadge">SQL</span>

The output expressions or columns returned by a query.

Example: `SELECT branch_id, SUM(balance_amount) AS total_balance` has two
output expressions.

Related:
<a class="termRef" href="#/terminology/bigquery.md#bigquery-column">BigQuery column<sup>BQ</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## SUM

<span class="termBadge">SQL</span>

Adds numeric values.

Example: `SUM(balance_amount)` is valid only when the balance amount is at a
grain where adding it is meaningful.

Related:
<a class="termRef" href="#/terminology/bi.md#semi-additive-metric">semi-additive metric<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/sql.md#group-by">GROUP BY<sup>SQL</sup></a>.

## WHERE

<span class="termBadge">SQL</span>

Filters rows before aggregation.

Example: `WHERE currency_code = 'EUR'` keeps only EUR rows before grouping.

Related:
<a class="termRef" href="#/terminology/sql.md#filter-predicate">filter predicate<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#having">HAVING<sup>SQL</sup></a>.

## window frame

<span class="termBadge">SQL</span>

The subset of rows within a window partition used by some window functions.

Example: a running total frame can include all rows from the start of the
partition through the current row.

Related:
<a class="termRef" href="#/terminology/sql.md#window-function">window function<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#order-by">ORDER BY<sup>SQL</sup></a>.

## window function

<span class="termBadge">SQL</span>

A function evaluated over related rows while preserving one output row for each
input row.

Example: `ROW_NUMBER`, running totals, and moving averages are common window
function patterns.

Related:
<a class="termRef" href="#/terminology/sql.md#row-number">ROW_NUMBER<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#window-frame">window frame<sup>SQL</sup></a>.

## PARTITION BY

<span class="termBadge">SQL</span>

Divides rows into independent groups for a window function.

Example: `PARTITION BY customer_key` restarts the window calculation for each
customer.

Related:
<a class="termRef" href="#/terminology/sql.md#window-function">window function<sup>SQL</sup></a>,
<a class="termRef" href="#/terminology/sql.md#row-number">ROW_NUMBER<sup>SQL</sup></a>.
