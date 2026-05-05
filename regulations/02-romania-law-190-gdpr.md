# 02 - Romania Law 190/2018 For GDPR Implementation

## Coordinates

- Jurisdiction: Romania.
- Instrument: Law no. 190/2018 on measures for applying Regulation (EU) 2016/679.
- Publication: Monitorul Oficial no. 651, 26 July 2018.
- Entry into force: 31 July 2018, per ANSPDCP note.
- Authority: Autoritatea Naţională de Supraveghere a Prelucrării Datelor cu Caracter Personal, ANSPDCP.
- ANSPDCP source: https://www.dataprotection.ro/?lang=en&page=Legea_nr_190_2018
- Text reference: https://www.legex.ro/Legea-190-18.07.2018-160491.aspx

## Why A BI Developer Cares

Romanian banking BI must apply GDPR and local Romanian implementation rules. Law 190/2018 is especially relevant where BI processes national identification numbers, special categories of data, employee monitoring data, or public-authority-related processing.

## Critical Coordinates From ANSPDCP Summary

ANSPDCP states that Law 190/2018 establishes national measures mainly for GDPR:

- Article 6(2): member-state provisions for lawful processing.
- Article 9(4): additional conditions for special categories of data.
- Articles 37-39: Data Protection Officer.
- Articles 42-43: certification.
- Article 83(7): administrative fines for public authorities.
- Articles 85 and 87-89: expression/information, national identification number, archiving/research/statistics.

## BI-Relevant Romanian Concepts

- National identification number: includes identifiers such as CNP, identity document series/number, passport number, driving licence number, and health insurance number as described in Romanian references to Law 190/2018.
- Employee monitoring: analytics involving employee activity, productivity, branch/user queues, investigation assignments, or system usage needs DPO review.
- Statistics and archiving: analytical processing may still require documented safeguards, minimisation, and access control.

## Implementation Checklist

- Flag every dataset containing CNP or Romanian identity-document data.
- Do not expose national identifiers in Looker Studio unless explicitly approved.
- Use masked/tokenized customer keys in BI serving layers.
- Avoid employee productivity dashboards without HR/legal/DPO review.
- Track DPIA status for high-risk analytics.
- Document data subject rights process if report outputs are used to answer access/correction requests.
- Confirm whether any BI exports leave Romania/EU or are processed by non-EU providers.

## Common BI Failure Modes

- CNP appears as a filter/control in a report.
- A branch performance dashboard becomes employee surveillance without review.
- A developer exports customer-level BI data to spreadsheets for testing.
- Pseudonymized keys are reversible by too many analysts.
