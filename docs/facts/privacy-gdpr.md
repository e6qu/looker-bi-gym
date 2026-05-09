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
  [`FACT-DATASET-SENSITIVE-FIELDS-DECLARED`](project-architecture.md#fact-dataset-sensitive-fields-declared).

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
  [`FACT-APP-SENSITIVE-EXCLUSION-CHECKS`](project-architecture.md#fact-app-sensitive-exclusion-checks).

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
- Derived implication: The app's progress cookie must remain same-site,
  local-recovery state, not learner tracking or analytics identity.
- Related facts: [`FACT-WEB-COOKIE-SYNC`](browser-runtime-storage.md#fact-web-cookie-sync),
  [`FACT-APP-PROGRESS-LOCAL-ONLY`](project-architecture.md#fact-app-progress-local-only).

### FACT-GDPR-ACCOUNTABILITY

- Statement: Accountability is one of the GDPR processing principles described
  by the European Commission.
- Source: [European Commission, Data protection explained](https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en).
- Source quote: "Accountability".
- Derived implication: Tutorials should make learners produce inspectable notes,
  metric contracts, fact IDs, and validation evidence rather than only final
  dashboard screenshots.
- Related facts: [`FACT-EBA-DPM-VALIDATION-RULES`](governance-reporting-operations.md#fact-eba-dpm-validation-rules),
  [`FACT-CHALLENGE-SOLUTION-FIXTURES`](project-architecture.md#fact-challenge-solution-fixtures).
