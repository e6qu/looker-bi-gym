# 01 - GDPR

Training boundary: this brief is technical orientation for synthetic BI training, not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production interpretations with the bank's institutional teams.

## Coordinates

- Jurisdiction: European Union.
- Instrument: Regulation (EU) 2016/679, General Data Protection Regulation.
- CELEX: `32016R0679`.
- Official Journal: OJ L 119, 4 May 2016.
- Application date: 25 May 2018.
- Primary official text: https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32016R0679
- European Commission guide: https://commission.europa.eu/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en
- EDPB processing principles: https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/what-are-basic-processing_en

## Why A BI Developer Cares

Bank BI systems often process
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>:
names, addresses, account numbers, national identifiers, transactions, card events, complaints, employee assignments, fraud flags, and investigation metadata.

Even
<a class="termRef" href="#/terminology/regulations.md#pseudonymised-data">pseudonymised data<sup>REG</sup></a>
can remain personal data if re-identification is possible.

## Critical Article Coordinates

- Article 4: definitions, including personal data, processing, controller, processor, pseudonymisation, consent.
- Article 5: processing principles: lawfulness, fairness, transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity/confidentiality, accountability.
- Article 6: lawful bases for processing.
- Article 9: special categories of personal data.
- Articles 12-22: data subject rights.
- Article 25: data protection by design and by default.
- Article 30: records of processing activities.
- Article 32: security of processing.
- Articles 33-34: personal data breach notification and communication.
- Article 35: data protection impact assessment.
- Articles 44-49: transfers of personal data to third countries.

## BI-Relevant Design Rules

- Do not include personal data in a serving table unless the dashboard purpose requires it.
- Prefer synthetic data for development, demos, and training.
- Prefer aggregated, masked, tokenized, or pseudonymized data for BI.
- Avoid free-text fields by default: transaction narratives, complaint details, case notes, SAR/STR notes, call transcripts, and staff comments.
- Keep report-level calculated fields free of hidden personal-data logic.
- Document purpose, audience, owner, retention, and access rationale for each report.
- Treat cached/extracted Looker Studio data as data copies requiring retention and access review.

## Data Domains To Flag

- Customer master data.
- Account and card identifiers.
- Transaction and payment data.
- Credit application and creditworthiness attributes.
- Complaint and dispute data.
- Fraud/AML investigation data.
- Employee productivity and monitoring data.
- IP/device/session data.

## Implementation Checklist

- Define the processing purpose for the dashboard.
- Record whether the report contains personal data, pseudonymized data, or anonymous aggregate data.
- Confirm lawful basis with the bank's DPO/legal team.
- Minimize fields in BigQuery serving views.
- Apply BigQuery policy tags and masking for identifiers.
- Use row-level access policies where branch, legal entity, or business line restrictions apply.
- Disable exports or copying where policy requires it.
- Monitor Looker Studio and BigQuery access via job metadata and audit logs.
- Define retention for extracts, exports, screenshots, and derived datasets.

## Common BI Failure Modes

- A dashboard intended for aggregate KPIs includes customer-level drill tables.
- A Looker Studio extract persists data beyond the allowed retention window.
- A developer uses real customer transactions in a demo.
- A chart exposes complaint narratives or investigation notes to general operations users.
- Pseudonymized identifiers are joined with another dataset that re-identifies customers.
