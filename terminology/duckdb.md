---
id: terminology-duckdb
title: DuckDB And Browser Runtime Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, duckdb, browser-runtime]
---

# DuckDB And Browser Runtime Terminology

## browser-loaded column

A named field in a table loaded into a browser SQL runtime.

Example: a browser-loaded CSV table can expose text, numeric, and date columns
for SQL practice.

Related:
<a class="termRef" href="#/terminology/duckdb.md#browser-loaded-table">browser-loaded table<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/sql.md#select-list">SELECT list<sup>SQL</sup></a>.

## browser-loaded table

A table available inside a browser SQL runtime, usually created from an
in-memory data source, local file, or fetched static asset.

Example: a CSV file can be loaded into a DuckDB-WASM connection as a queryable
table.

Related:
<a class="termRef" href="#/terminology/duckdb.md#csv-backed-table">CSV-backed table<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/duckdb.md#duckdb-wasm">DuckDB-WASM<sup>DB</sup></a>.

## browser SQL workbench

An in-browser SQL surface for running queries without a separate database
server.

Example: a browser SQL workbench can run `SELECT` queries against
browser-loaded tables.

Related:
<a class="termRef" href="#/terminology/duckdb.md#duckdb-wasm">DuckDB-WASM<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/duckdb.md#local-query-result">local query result<sup>DB</sup></a>.

## CSV-backed table

A queryable table created from CSV data.

Example: a comma-separated file with a header row can become a table for local
SQL analysis.

Related:
<a class="termRef" href="#/terminology/duckdb.md#browser-loaded-table">browser-loaded table<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>.

## DuckDB

An analytical SQL database engine that can run embedded in applications and
process columnar analytical workloads.

Example: DuckDB can query local files and in-memory data without a separate
database server.

Related:
<a class="termRef" href="#/terminology/duckdb.md#duckdb-wasm">DuckDB-WASM<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/sql.md#aggregate-function">aggregate function<sup>SQL</sup></a>.

## DuckDB-WASM

A WebAssembly build of DuckDB that runs SQL in the browser.

Example: DuckDB-WASM can execute analytical SQL over browser-loaded data.

Related:
<a class="termRef" href="#/terminology/duckdb.md#duckdb">DuckDB<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/duckdb.md#browser-sql-workbench">browser SQL workbench<sup>DB</sup></a>.

## in-memory table

A table held in runtime memory rather than persisted in a remote warehouse.

Example: a temporary analysis table can disappear when the browser session ends.

Related:
<a class="termRef" href="#/terminology/duckdb.md#browser-loaded-table">browser-loaded table<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/duckdb.md#local-query-result">local query result<sup>DB</sup></a>.

## local query result

A query result computed in the browser or local embedded runtime, not by a
remote cloud warehouse.

Example: a result grid returned by DuckDB-WASM is local to the browser runtime.

Related:
<a class="termRef" href="#/terminology/duckdb.md#browser-sql-workbench">browser SQL workbench<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#bigquery-job">BigQuery job<sup>BQ</sup></a>.

## WASM

WebAssembly, a portable binary format that can run compiled code in the
browser.

Example: DuckDB-WASM uses WebAssembly to run DuckDB query execution in browser
contexts.

Related:
<a class="termRef" href="#/terminology/duckdb.md#duckdb-wasm">DuckDB-WASM<sup>DB</sup></a>,
<a class="termRef" href="#/terminology/duckdb.md#local-query-result">local query result<sup>DB</sup></a>.
