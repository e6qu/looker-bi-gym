---
id: terminology-index
title: Vocabulary Reference
content_type: terminology_index
status: published
version: 0.1.0
topic: terminology
tags: [terminology]
---

# Vocabulary Reference

Reference terms for technical BI, SQL, BigQuery, Looker Studio, banking,
regulatory, and DuckDB/browser-runtime work.

Area labels:

- BI, such as grain, dimension, metric, fanout, and reconciliation;
- SQL syntax, such as `SUM`, `COUNT(DISTINCT)`, `DATE_TRUNC`, `ROW_NUMBER`, and
  `QUALIFY`;
- BigQuery, Looker Studio, and DuckDB/browser-runtime vocabulary;
- banking, such as ledger balance, depositor, branch liquidity, and joint
  account;
- regulations, such as GDPR data minimisation, DGSD guarantee ceiling, and DORA
  ICT dependency register.

## Marker Key

Precise terms can use a normal Markdown or HTML link with a short superscript
domain hint. The visible hint should be one to three letters:

| Hint  | Area                          |
| ----- | ----------------------------- |
| `BI`  | BI                            |
| `SQL` | SQL syntax or query behaviour |
| `BQ`  | BigQuery                      |
| `LS`  | Looker Studio                 |
| `BNK` | banking                       |
| `REG` | regulations                   |
| `DB`  | DuckDB or browser SQL runtime |

Example:

```html
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>
```

Rendered example:

Confirm the
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>
before applying
<a class="termRef" href="#/terminology/sql.md#sum">`SUM`<sup>SQL</sup></a>.

## Area Pages

- [BI terms](bi.md)
- [SQL terms](sql.md)
- [BigQuery terms](bigquery.md)
- [Looker Studio terms](looker-studio.md)
- [Banking terms](banking.md)
- [Regulatory terms](regulations.md)
- [DuckDB and browser runtime terms](duckdb.md)
