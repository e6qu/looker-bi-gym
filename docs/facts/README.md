# Source Fact Register

This directory is the local fact and source-card corpus for fact-backed tutorials,
quiz questions, challenge checks, and dataset design. It stores short, cited
source notes and derived training facts; it does not mirror full external
documents.

Facts here are technical training anchors, not legal, regulatory, accounting,
privacy, compliance, or model-risk advice.

## Area Files

- [privacy-gdpr.md](privacy-gdpr.md): GDPR, personal data, minimisation, masking,
  and browser identifiers.
- [banking-deposits-romania-eu.md](banking-deposits-romania-eu.md): Romanian/EU
  deposit guarantee facts and banking-domain grain implications.
- [bi-platforms-bigquery-looker-studio.md](bi-platforms-bigquery-looker-studio.md):
  BigQuery, Looker Studio, serving views, credentials, blends, and performance.
- [browser-runtime-storage.md](browser-runtime-storage.md): DuckDB-WASM,
  browser storage, cookies, and local validation boundaries.
- [governance-reporting-operations.md](governance-reporting-operations.md):
  DORA, EBA reporting frameworks, validation rules, and operational evidence.
- [project-architecture.md](project-architecture.md): facts derived from this
  repository's source code, manifests, validators, and fixtures.

## Fact Format

Each fact should use this shape:

```md
### FACT-AREA-STABLE-ID

- Statement: One verifiable assertion.
- Source: Official docs, official law, local source code, or another fact.
- Source quote: Short quote or exact identifier from the source.
- Derived implication: What this means for tutorials, datasets, checks, or UI.
- Related facts: Cross-links to nearby fact IDs.
```

## Authoring Contract

- Every fact-backed tutorial step should cite one or more `FACT-*` IDs.
- Every quiz question about regulation, platform behavior, data privacy, storage,
  BI tooling, datasets, or grading should cite one or more `FACT-*` IDs in the
  manifest or lesson notes.
- The prompt should ask about a concrete consequence of the source fact.
- The explanation should identify the source fact, the learner action, and the
  specific mistake the wrong answers represent.
- If a source changes, update the fact first, then update dependent tutorials,
  manifests, solution fixtures, Playwright flows, and content QA.

## Existing Challenge Usage

- Orientation uses `FACT-DUCKDB-WASM-BROWSER`,
  `FACT-WEB-LOCALSTORAGE-PERSISTENCE`, `FACT-WEB-COOKIE-SYNC`,
  `FACT-GDPR-DATA-MINIMISATION`,
  `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`, and `FACT-DGSD-100K-EU`.
- Dataset inspection uses `FACT-GDPR-PERSONAL-DATA`,
  `FACT-GDPR-DATA-MINIMISATION`,
  `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`, and
  `FACT-DUCKDB-WASM-BROWSER`.
- Fanout uses `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`,
  `FACT-DUCKDB-WASM-BROWSER`, `FACT-BIGQUERY-LOGICAL-VIEW`, and
  `FACT-BIGQUERY-VIEW-SCOPE`.
- Looker Studio evidence uses `FACT-LOOKER-STUDIO-DATA-SOURCE`,
  `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`,
  `FACT-LOOKER-STUDIO-CREDENTIALS`, `FACT-BIGQUERY-VIEW-SCOPE`,
  `FACT-BIGQUERY-LOGICAL-VIEW`, `FACT-BIGQUERY-VIEW-LIMITATIONS`, and
  `FACT-WEB-LOCALSTORAGE-PERSISTENCE`.

## Expansion Rule

Add new facts to the area file where the source belongs. If a fact combines
multiple areas, put the primary source in one area and cross-link related facts
instead of duplicating the source note.
