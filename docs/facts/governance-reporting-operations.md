# Governance Reporting And Operations Facts

These facts anchor reporting, validation, resilience, and operations tutorials.
They are technical training notes only, not legal, regulatory, accounting,
privacy, compliance, or model-risk advice.

### FACT-DORA-ICT-RISK-FRAMEWORK

- Statement: DORA Article 6 requires financial entities to maintain a sound,
  comprehensive, well-documented ICT risk management framework.
- Source: [EUR-Lex, Regulation (EU) 2022/2554](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554).
- Source quote: "well-documented ICT risk management framework".
- Derived implication: BI operations tutorials should require documented
  dependencies, owners, refresh jobs, and failure evidence.
- Related facts: [`FACT-DORA-ICT-IDENTIFICATION`](#fact-dora-ict-identification).

### FACT-DORA-ICT-IDENTIFICATION

- Statement: DORA Article 8 requires identifying, classifying, and documenting
  ICT-supported business functions, roles, assets, and dependencies.
- Source: [EUR-Lex, Regulation (EU) 2022/2554](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554).
- Source quote: "identify, classify and adequately document".
- Derived implication: BI observability lessons should map dashboards to source
  tables, jobs, owners, downstream users, and failure modes.
- Related facts: [`FACT-DORA-ICT-RISK-FRAMEWORK`](#fact-dora-ict-risk-framework).

### FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY

- Statement: DORA governance obligations include maintaining high standards of
  availability, authenticity, integrity, and confidentiality of data.
- Source: [EUR-Lex, Regulation (EU) 2022/2554 Article 5](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554).
- Source quote: "availability, authenticity, integrity and confidentiality".
- Derived implication: Dashboard operations exercises should cover freshness,
  reconciliation, access safety, and incident notes.
- Related facts: [`FACT-GDPR-PROCESSING-PRINCIPLES`](privacy-gdpr.md#fact-gdpr-processing-principles).

### FACT-DORA-YEARLY-REVIEW

- Statement: DORA Article 8 requires review of classification and relevant
  documentation as needed and at least yearly.
- Source: [EUR-Lex, Regulation (EU) 2022/2554 Article 8](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554).
- Source quote: "at least yearly".
- Derived implication: Capstone governance registers should include owner and
  review-date fields.
- Related facts: [`FACT-DORA-ICT-IDENTIFICATION`](#fact-dora-ict-identification).

### FACT-EBA-DPM-VALIDATION-RULES

- Statement: EBA reporting frameworks provide reporting requirements,
  validation rules, Data Point Models, and XBRL taxonomies for reference dates.
- Source: [European Banking Authority, Reporting frameworks](https://www.eba.europa.eu/risk-and-data-analysis/reporting/reporting-frameworks).
- Source quote: "Validation rules".
- Derived implication: Regulatory-reporting questions should test data points,
  validation rules, taxonomies, and reference dates rather than generic
  reporting importance.
- Related facts: [`FACT-EBA-DPM-STRUCTURED-REPRESENTATION`](#fact-eba-dpm-structured-representation).

### FACT-EBA-DPM-STRUCTURED-REPRESENTATION

- Statement: EBA describes the DPM as a structured representation of data,
  business concepts, relations, and validation rules.
- Source: [European Banking Authority, Reporting frameworks](https://www.eba.europa.eu/risk-and-data-analysis/reporting/reporting-frameworks).
- Source quote: "structured representation".
- Derived implication: Future config challenges can ask learners to map a
  synthetic metric to a data point, concept relation, and validation rule.
- Related facts: [`FACT-EBA-XBRL-TAXONOMY-TECHNICAL-FORMAT`](#fact-eba-xbrl-taxonomy-technical-format).

### FACT-EBA-XBRL-TAXONOMY-TECHNICAL-FORMAT

- Statement: EBA says XBRL taxonomies present DPM data items, concepts,
  relations, and validation rules in a technical format.
- Source: [European Banking Authority, Reporting frameworks](https://www.eba.europa.eu/risk-and-data-analysis/reporting/reporting-frameworks).
- Source quote: "technical format".
- Derived implication: Tutorials should distinguish human metric contracts from
  machine reporting formats.
- Related facts: [`FACT-EBA-DPM-VALIDATION-RULES`](#fact-eba-dpm-validation-rules).

### FACT-EBA-VALIDATION-RULES-CHANGE

- Statement: EBA validation rules can change through updated or small validation
  rules packages.
- Source: [European Banking Authority, Reporting frameworks](https://www.eba.europa.eu/risk-and-data-analysis/reporting/reporting-frameworks).
- Source quote: "subject to change".
- Derived implication: Facts and challenge answers tied to reporting packages
  must be versioned and reviewed.
- Related facts: [`FACT-EBA-FRAMEWORK-VERSIONING`](#fact-eba-framework-versioning).

### FACT-DORA-INCIDENTS

- Statement: DORA establishes ICT-related incident management, classification,
  and reporting obligations for financial entities.
- Source: [`SRC-DORA-ELI-2022-2554`](../../sources/law/eu-dora.md#src-dora-eli-2022-2554).
- Source quote: "ICT-related incidents".
- Derived implication: BI operations tutorials should include incident notes,
  broken-refresh evidence, severity labels, and recovery checkpoints.
- Related facts: [`FACT-DORA-ICT-RISK-FRAMEWORK`](#fact-dora-ict-risk-framework),
  [`FACT-DGSD-SEVEN-WORKING-DAYS`](banking-deposits-romania-eu.md#fact-dgsd-seven-working-days).

### FACT-DORA-BACKUP-RESTORE

- Statement: DORA includes backup, restoration, and recovery requirements for
  ICT systems and data supporting financial-entity operations.
- Source: [`SRC-DORA-ELI-2022-2554`](../../sources/law/eu-dora.md#src-dora-eli-2022-2554).
- Source quote: "backup policies and procedures".
- Derived implication: Tutorial datasets and expected results should be
  reproducible from committed sources rather than live external state.
- Related facts: [`FACT-BI-RECONCILIATION-WINDOWS`](bi-modeling-banking.md#fact-bi-reconciliation-windows),
  [`FACT-BIGQUERY-JOBS-BYTES`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-jobs-bytes).

### FACT-DORA-THIRD-PARTY-REGISTER

- Statement: DORA requires financial entities to maintain information related to
  contractual arrangements for ICT services supplied by third-party providers.
- Source: [`SRC-DORA-ELI-2022-2554`](../../sources/law/eu-dora.md#src-dora-eli-2022-2554).
- Source quote: "ICT third-party service providers".
- Derived implication: Cloud-applied BI tutorials should make learners document
  external platform dependencies, data sources, owners, and failure contacts.
- Related facts: [`FACT-DORA-ICT-IDENTIFICATION`](#fact-dora-ict-identification),
  [`FACT-LOOKER-STUDIO-DATA-SOURCE`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-data-source).

### FACT-EBA-FRAMEWORK-VERSIONING

- Statement: EBA reporting framework materials are organised by framework
  versions and reference dates, with associated templates, DPM artifacts, and
  validation rules.
- Source: [`SRC-EBA-REPORTING-FRAMEWORKS`](../../sources/regulators/eba-reporting-frameworks.md#src-eba-reporting-frameworks);
  [`SRC-EBA-VALIDATION-RULES-PACKAGES`](../../sources/regulators/eba-reporting-frameworks.md#src-eba-validation-rules-packages).
- Source quote: "framework version".
- Derived implication: Facts, datasets, and challenge answers that model
  regulatory reporting need explicit version and reference-date fields.
- Related facts: [`FACT-EBA-VALIDATION-RULES-CHANGE`](#fact-eba-validation-rules-change),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).

### FACT-EBA-REFERENCE-DATES

- Statement: EBA reporting framework documentation is structured around
  reporting requirements applicable for each reference date.
- Source: [`SRC-EBA-REPORTING-FRAMEWORKS`](../../sources/regulators/eba-reporting-frameworks.md#src-eba-reporting-frameworks).
- Source quote: "each reference date".
- Derived implication: Banking BI challenges should distinguish transaction
  dates, reporting reference dates, and dashboard refresh dates.
- Related facts: [`FACT-BIGQUERY-DATE-TRUNC-GRANULARITY`](bi-modeling-banking.md#fact-bigquery-date-trunc-granularity),
  [`FACT-GDPR-ACCURACY`](privacy-gdpr.md#fact-gdpr-accuracy).

### FACT-EBA-FILING-RULES

- Statement: EBA validation rules packages are part of the technical package for
  reporting requirements and are updated through release-specific packages.
- Source: [`SRC-EBA-VALIDATION-RULES-PACKAGES`](../../sources/regulators/eba-reporting-frameworks.md#src-eba-validation-rules-packages).
- Source quote: "integral part of the EBA technical package".
- Derived implication: Future regulatory-reporting labs should store source
  package version, validation rule version, and expected failing rows locally.
- Related facts: [`FACT-EBA-DPM-VALIDATION-RULES`](#fact-eba-dpm-validation-rules),
  [`FACT-BI-RECONCILIATION-WINDOWS`](bi-modeling-banking.md#fact-bi-reconciliation-windows).
