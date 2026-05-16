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

Precise terms use an HTML anchor with the `termRef` class and a short
superscript domain hint. Plain Markdown links cannot embed the `<sup>` hint
through the rendered Markdown pipeline, so the HTML form is the canonical
convention. The visible hint is one to three letters:

| Hint  | Area                          |
| ----- | ----------------------------- |
| `BI`  | BI                            |
| `SQL` | SQL syntax or query behaviour |
| `BQ`  | BigQuery                      |
| `LS`  | Looker Studio                 |
| `BNK` | banking                       |
| `REG` | regulations                   |
| `DB`  | DuckDB or browser SQL runtime |

The hint must match the target file's domain. `bun run validate:terminology`
checks that every `termRef` anchor resolves to a real heading and that the
hint matches the linked terminology page.

Authoring shape:

```html
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>
```

Rendered example:

Confirm the
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>
before applying
<a class="termRef" href="#/terminology/sql.md#sum">SUM<sup>SQL</sup></a>.

The `termBadge` class is reserved for inline scope hints when an unambiguous
short label is needed without linking to a definition; the per-entry leading
badge that the first pass added under every heading was decorative and has
been removed.

## Area Pages

- [BI terms](bi.md)
- [SQL terms](sql.md)
- [BigQuery terms](bigquery.md)
- [Looker Studio terms](looker-studio.md)
- [Banking terms](banking.md)
- [Regulatory terms](regulations.md)
- [DuckDB and browser runtime terms](duckdb.md)
