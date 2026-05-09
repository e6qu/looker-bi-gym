# Source Fact Register

This directory is the local fact and source-card corpus for fact-backed banking
BI tutorials, quiz questions, and challenge design. It stores short, cited
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
- [bi-modeling-banking.md](bi-modeling-banking.md): BI grain, aggregation,
  fanout, semi-additive balances, date semantics, and reconciliation.
- [governance-reporting-operations.md](governance-reporting-operations.md):
  DORA, EBA reporting frameworks, validation rules, and operational evidence.
- [banking-deposits-us.md](banking-deposits-us.md): US FDIC deposit insurance
  facts for banking BI comparison with EU/Romanian deposit guarantee concepts.

## Fact Format

Each fact should use this shape:

```md
### FACT-AREA-STABLE-ID

- Statement: One verifiable assertion.
- Source: Official docs, official law, recognized BI literature, or another
  fact.
- Source quote: Short quote or exact identifier from the source.
- Derived implication: What this means for tutorials, datasets, checks, or UI.
- Related facts: Cross-links to nearby fact IDs.
```

## Authoring Contract

- Every fact-backed tutorial step should cite one or more `FACT-*` IDs.
- Every quiz question about regulation, platform behavior, data privacy, banking
  BI semantics, source systems, or BI tooling should cite one or more `FACT-*`
  IDs in the manifest or lesson notes.
- The prompt should ask about a concrete consequence of the source fact.
- The explanation should identify the source fact, the learner action, and the
  specific mistake the wrong answers represent.
- If a source changes, update the fact first, then update dependent tutorials,
  manifests, solution fixtures, Playwright flows, and content QA.

## Existing Challenge Usage

- Orientation uses `FACT-GDPR-DATA-MINIMISATION`,
  `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`, `FACT-DGSD-100K-EU`,
  `FACT-BIGQUERY-LOGICAL-VIEW`, and `FACT-LOOKER-STUDIO-DATA-SOURCE`.
- Dataset inspection uses `FACT-GDPR-PERSONAL-DATA`,
  `FACT-GDPR-DATA-MINIMISATION`, `FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`,
  and `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`.
- Fanout uses `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`,
  `FACT-BI-FANOUT-JOIN-RISK`, `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`,
  `FACT-BIGQUERY-LOGICAL-VIEW`, and `FACT-BIGQUERY-VIEW-SCOPE`.
- Looker Studio evidence uses `FACT-LOOKER-STUDIO-DATA-SOURCE`,
  `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`,
  `FACT-LOOKER-STUDIO-CREDENTIALS`, `FACT-BIGQUERY-VIEW-SCOPE`,
  `FACT-BIGQUERY-LOGICAL-VIEW`, and `FACT-BIGQUERY-VIEW-LIMITATIONS`.

## Expansion Rule

Add new facts to the area file where the source belongs. If a fact combines
multiple areas, put the primary source in one area and cross-link related facts
instead of duplicating the source note.
