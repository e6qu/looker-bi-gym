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
- Related facts: [`FACT-APP-PROGRESS-EXPORT-EVIDENCE`](project-architecture.md#fact-app-progress-export-evidence).

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
- Related facts: [`FACT-CHALLENGE-VERSIONED-MANIFESTS`](project-architecture.md#fact-challenge-versioned-manifests).

### FACT-BI-OPS-EVIDENCE-NOT-ADVICE

- Statement: Operational and regulatory facts in this repo are training context
  and must not be presented as legal, compliance, accounting, regulatory,
  privacy, or model-risk advice.
- Source: [regulations/README.md](../../regulations/README.md);
  [`FACT-GDPR-PROCESSING-PRINCIPLES`](privacy-gdpr.md#fact-gdpr-processing-principles).
- Source quote: "technical training content".
- Derived implication: Tutorials can teach evidence artifacts and controls, but
  production interpretation must be validated by institutional teams.
- Related facts: [`FACT-DORA-ICT-RISK-FRAMEWORK`](#fact-dora-ict-risk-framework).
