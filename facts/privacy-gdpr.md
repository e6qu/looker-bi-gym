---
{
  "id": "facts-privacy-gdpr",
  "title": "Privacy And GDPR Facts",
  "content_type": "fact_register",
  "status": "published",
  "version": "0.1.0",
  "topic": "facts",
  "tags": ["facts", "source-backed"],
}
---

# Privacy And GDPR Facts

These facts anchor privacy-sensitive BI exercises. They are technical training
notes only, not legal, regulatory, accounting, privacy, compliance, or model-risk
advice.

### FACT-GDPR-PERSONAL-DATA

- Statement: Personal data includes information relating to an identified or
  identifiable living individual.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en);
  [GDPR ELI record](http://data.europa.eu/eli/reg/2016/679/oj).
- Source quote: "identified or identifiable living individual".
- Derived implication: Banking BI tutorials should treat raw customer, account,
  device, cookie, and synthetic re-identification fields as sensitive serving
  output risks.
- Related facts: [`FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL`](#fact-gdpr-pseudonymized-still-personal),
  [`FACT-GDPR-DATA-MINIMISATION`](#fact-gdpr-data-minimisation).

### FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL

- Statement: Pseudonymised or encrypted data can remain personal data when it can
  be used to re-identify a person.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en);
  [EDPB FAQ on pseudonymised and anonymised data](https://www.edpb.europa.eu/sme-data-protection-guide/faq-frequently-asked-questions/answer/what-difference-between_en).
- Source quote: "can be used to re-identify a person".
- Derived implication: Tutorials should not teach that masked account numbers or
  synthetic national IDs are automatically safe for broad dashboards.
- Related facts: [`FACT-GDPR-PERSONAL-DATA`](#fact-gdpr-personal-data),
  [`FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-authorized-view-access-control).

### FACT-GDPR-ANONYMISED-IRREVERSIBLE

- Statement: Data is outside personal-data scope only when anonymisation prevents
  identification in an irreversible way.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en).
- Source quote: "anonymisation must be irreversible".
- Derived implication: Challenge datasets can be synthetic, but tutorial language
  should still model production caution around re-identification.
- Related facts: [`FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL`](#fact-gdpr-pseudonymized-still-personal).

### FACT-GDPR-DATA-MINIMISATION

- Statement: Data minimisation requires personal data to be adequate, relevant,
  and limited to what is necessary for the purpose.
- Source: [European Commission, How much data can be collected?](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/how-much-data-can-be-collected_en);
  [GDPR ELI record](http://data.europa.eu/eli/reg/2016/679/oj).
- Source quote: "limited to what is necessary".
- Derived implication: Challenge checks should reject unnecessary `customer_id`,
  `account_id`, and `synthetic_iban` columns in dashboard serving outputs.
- Related facts: [`FACT-BIGQUERY-VIEW-SCOPE`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-view-scope),
  [`FACT-BIGQUERY-SELECT-LIST-NARROWING`](bi-modeling-banking.md#fact-bigquery-select-list-narrowing).

### FACT-GDPR-PROCESSING-PRINCIPLES

- Statement: GDPR processing principles include lawfulness, purpose limitation,
  data minimisation, accuracy, storage limitation, integrity/confidentiality, and
  accountability.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en).
- Source quote: "7 key principles".
- Derived implication: Governance quizzes should ask which BI artifact
  demonstrates purpose, minimisation, freshness, or accountability instead of
  asking generic privacy trivia.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](#fact-gdpr-data-minimisation),
  [`FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY`](governance-reporting-operations.md#fact-dora-data-confidentiality-integrity).

### FACT-GDPR-COOKIE-ID-PERSONAL-DATA-EXAMPLE

- Statement: The European Commission lists cookie IDs as examples of personal
  data.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en).
- Source quote: "a cookie ID".
- Derived implication: Banking BI tutorials should treat browser identifiers,
  analytics IDs, and dashboard usage identifiers as potentially personal data
  when designing observability examples.
- Related facts: [`FACT-GDPR-PERSONAL-DATA`](#fact-gdpr-personal-data),
  [`FACT-LOOKER-STUDIO-CREDENTIALS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-credentials).

### FACT-GDPR-ACCOUNTABILITY

- Statement: Accountability is one of the GDPR processing principles described
  by the European Commission.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en).
- Source quote: "Accountability".
- Derived implication: Tutorials should make learners produce inspectable notes,
  metric contracts, fact IDs, and validation evidence rather than only final
  dashboard screenshots.
- Related facts: [`FACT-EBA-DPM-VALIDATION-RULES`](governance-reporting-operations.md#fact-eba-dpm-validation-rules),
  [`FACT-DORA-ICT-RISK-FRAMEWORK`](governance-reporting-operations.md#fact-dora-ict-risk-framework).

### FACT-GDPR-PURPOSE-LIMITATION

- Statement: GDPR Article 5 requires personal data to be collected for
  specified, explicit, and legitimate purposes and not further processed in an
  incompatible way.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679);
  [`SRC-GDPR-EC-MINIMISATION`](../sources/law/eu-gdpr.md#src-gdpr-ec-minimisation).
- Source quote: "specified, explicit and legitimate purposes".
- Derived implication: BI exercises should ask learners to state the dashboard
  purpose before choosing identifiers, dimensions, and retention evidence.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](#fact-gdpr-data-minimisation),
  [`FACT-BIGQUERY-VIEW-SCOPE`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-view-scope).

### FACT-GDPR-ACCURACY

- Statement: GDPR Article 5 includes an accuracy principle requiring personal
  data to be accurate and kept up to date where needed.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679).
- Source quote: "accurate and, where necessary, kept up to date".
- Derived implication: Banking BI lessons should include freshness and
  reconciliation checks before presenting learner outputs as usable evidence.
- Related facts: [`FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY`](governance-reporting-operations.md#fact-dora-data-confidentiality-integrity),
  [`FACT-BI-RECONCILIATION-WINDOWS`](bi-modeling-banking.md#fact-bi-reconciliation-windows).

### FACT-GDPR-STORAGE-LIMITATION

- Statement: GDPR Article 5 includes storage limitation: personal data should
  not permit identification for longer than necessary for the processing purpose.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679).
- Source quote: "no longer than is necessary".
- Derived implication: Progress exports and challenge evidence should avoid
  retaining raw answers, credentials, or pasted cloud evidence.
- Related facts: [`FACT-LOOKER-STUDIO-CREDENTIALS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-credentials),
  [`FACT-GDPR-DATA-MINIMISATION`](#fact-gdpr-data-minimisation).

### FACT-GDPR-INTEGRITY-CONFIDENTIALITY

- Statement: GDPR Article 5 includes integrity and confidentiality through
  security against unauthorised processing and accidental loss, destruction, or
  damage.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679).
- Source quote: "integrity and confidentiality".
- Derived implication: Tutorials should frame access control, field exclusion,
  and local-only evidence as part of BI delivery quality, not as optional polish.
- Related facts: [`FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY`](governance-reporting-operations.md#fact-dora-data-confidentiality-integrity),
  [`FACT-LOOKER-STUDIO-CREDENTIALS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-credentials).

### FACT-GDPR-SECURITY-PROCESSING

- Statement: GDPR Article 32 requires security measures appropriate to the risk,
  including technical and organisational measures.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679).
- Source quote: "appropriate technical and organisational measures".
- Derived implication: Cloud-applied BI challenges should ask for access,
  dependency, and credential-boundary evidence without collecting credentials in
  the static app.
- Related facts: [`FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL`](bi-platforms-bigquery-looker-studio.md#fact-bigquery-authorized-view-access-control),
  [`FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-owner-credentials-risk).

### FACT-GDPR-SPECIAL-CATEGORIES

- Statement: GDPR Article 9 gives special-category personal data separate
  handling rules, including data revealing racial or ethnic origin, political
  opinions, religious beliefs, health, or biometric identifiers.
- Source: [`SRC-GDPR-ELI-2016-679`](../sources/law/eu-gdpr.md#src-gdpr-eli-2016-679).
- Source quote: "special categories of personal data".
- Derived implication: Synthetic banking datasets should not introduce
  unnecessary protected-category fields for BI practice scenarios.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](#fact-gdpr-data-minimisation),
  [`FACT-BIGQUERY-SELECT-LIST-NARROWING`](bi-modeling-banking.md#fact-bigquery-select-list-narrowing).
