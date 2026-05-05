# EU And Romanian Banking Regulatory Context For BI

Date: 2026-05-05

This document lists EU and Romanian regulatory themes that matter when designing banking BI, back-office dashboards, and technical analytics applications. It is a technical orientation guide, not legal, regulatory, accounting, privacy, or compliance advice.

## Why This Matters For BI

Banking BI in the EU/Romania context is rarely just dashboarding. Reports often support prudential supervision, regulatory reporting, risk management, AML/CFT, payments controls, deposit protection, data protection, operational resilience, and internal governance.

For BI engineering, this means:

- Every important metric needs an owner, definition, lineage, and reconciliation path.
- Sensitive data must be minimized, masked, access-controlled, and auditable.
- Reporting cuts must be reproducible: business date, month-end date, reference date, and submission period cannot be vague.
- Operational dashboards should retain review/signoff evidence where they support controls.
- ICT, third-party, incident, and resilience reporting are now first-class financial-sector concerns under DORA.

## EU Prudential Framework

### EBA Single Rulebook

The European Banking Authority Single Rulebook aims to provide harmonised prudential rules for EU institutions. For BI, this creates a common language around own funds, capital requirements, leverage, liquidity, large exposures, operational risk, market risk, credit risk, SREP, remuneration, and disclosures.

BI implications:

- Keep prudential metrics distinct from management KPIs.
- Preserve regulatory calculation lineage from source data to template output.
- Store reference data for legal entity, consolidation scope, exposure class, counterparty type, product, currency, collateral, and risk weights.

### CRR / CRD

The Capital Requirements Regulation and Capital Requirements Directive are core EU banking prudential instruments. They drive data domains such as capital adequacy, own funds, risk-weighted assets, leverage ratio, liquidity, large exposures, governance, and supervisory review.

BI topics to include:

- Own funds and capital ratio dashboards.
- RWA by exposure class and business line.
- Leverage exposure monitoring.
- Liquidity metrics such as LCR/NSFR in management views.
- Large exposure limit monitoring.
- Operational-risk loss event reporting.

### COREP, FINREP, Pillar 3

EBA supervisory reporting includes COREP, FINREP, large exposures, leverage, liquidity, stable funding, asset encumbrance, forbearance, and non-performing exposures. Pillar 3 disclosure requirements aim at consistent public risk disclosures.

BI implications:

- Treat regulatory templates as data products with versioned mappings.
- Track reporting framework version, reference date, submission period, template ID, row/column code, validation rule, and signoff state.
- Build reconciliation dashboards between GL, risk marts, and submitted regulatory figures.
- Include resubmission history and validation breaks.

## EU Digital And Operational Resilience

### DORA

The Digital Operational Resilience Act, Regulation (EU) 2022/2554, applies from 17 January 2025. It harmonises digital operational resilience requirements for financial entities, including ICT risk management, incident reporting, resilience testing, third-party ICT risk, and oversight of critical ICT third-party providers.

BI/application topics:

- ICT asset inventory dashboard.
- Critical or important function mapping.
- ICT third-party register analytics.
- Incident classification and notification workflow monitoring.
- Vulnerability, patching, and resilience-testing evidence.
- Service availability, recovery time, and recovery point objective tracking.
- Concentration risk by cloud/vendor/system.

Looker Studio/BigQuery implication:

- Operational-resilience dashboards may contain sensitive security data. Use restricted serving datasets, masked fields, and audited access.

## EU Payments And Fraud

### PSD2

PSD2 governs payment services and includes topics such as strong customer authentication, secure communication, payment incident reporting, consumer rights, and payment fraud reporting. EBA guidelines support consistent payment fraud reporting and incident reporting.

BI/application topics:

- Payment transaction volume and value by channel/instrument.
- Fraud rate by payment instrument, authentication method, geography, merchant category, and customer segment.
- Strong customer authentication exemption monitoring.
- Major incident dashboard for payment services.
- Open banking/API availability and error-rate monitoring.

## EU AML/CFT

### AMLA And EU AML Package

The EU AML package adopted in 2024 creates AMLA, a new EU AML/CFT authority, and a more harmonised AML/CFT rulebook. AMLA has legal existence from 26 June 2024 and EU-level AML/CFT responsibilities move from EBA to AMLA from 1 January 2026, while existing EBA AML/CFT guidelines remain valid until replaced.

BI/application topics:

- Customer due diligence status and refresh timeliness.
- Beneficial ownership completeness.
- High-risk customer and product exposure.
- Transaction monitoring alert volume and quality.
- Sanctions screening hit disposition.
- Suspicious transaction/report workflow aging.
- FIU/reporting evidence tracking.

## EU Data Protection

### GDPR

GDPR applies to personal data processing in the EU. The European Commission highlights principles such as lawfulness, fairness and transparency, purpose limitation, data minimisation, storage limitation, accuracy, integrity/confidentiality, and accountability.

BI implications:

- Prefer synthetic data in training.
- Minimize personal data in BI serving tables.
- Pseudonymize or mask customer, employee, and counterparty identifiers.
- Document processing purpose for each dashboard.
- Avoid free-text fields such as transaction narratives, complaint details, SAR/STR notes, and call transcripts unless explicitly needed and controlled.
- Track retention policy for BI extracts and cached datasets.
- Treat pseudonymized data as still potentially personal if re-identification is possible.

## Romanian Banking Context

### BNR Role

The National Bank of Romania is Romania's central bank. Law 312/2004 gives BNR responsibilities including monetary policy, exchange-rate policy, currency issuance, foreign-exchange regime, administration of international reserves, prudential authorisation/supervision of credit institutions, and monitoring payment systems.

BI/application topics:

- Prudential reporting inventory and submission status.
- Minimum reserve requirement calculations and evidence.
- FX exposure and exchange-rate reporting controls.
- Payment systems operational monitoring.
- Supervisory finding and remediation dashboards.

### Romanian AML/CFT

Romanian Law 129/2019 establishes the national AML/CFT framework. ONPCSB is Romania's FIU and publishes AML/CFT legislation and guidance. ONPCSB materials identify credit institutions and branches of foreign credit institutions among reporting entities under Law 129/2019.

BI/application topics:

- Romanian AML reporting-entity obligations inventory.
- Suspicious transaction/report workflow tracking.
- Customer-risk assessment dashboards.
- KYC/CDD refresh status by customer risk class.
- Sanctions/international restrictions monitoring.
- Evidence of review, escalation, and reporting decisions.

### Romanian Data Protection

Romania applies GDPR directly and has Law 190/2018 for national implementation measures. ANSPDCP is the Romanian data protection authority.

BI/application topics:

- Romanian national identification number handling.
- Employee monitoring analytics constraints.
- Data protection impact assessment inventory for BI/analytics apps.
- Data subject request tracking if BI systems expose personal data.
- Breach/incident reporting evidence linked to operational dashboards.

### Deposit Guarantee

The Bank Deposit Guarantee Fund (FGDB) is Romania's recognized deposit guarantee scheme. Public FGDB materials describe the general guarantee ceiling as the RON equivalent of EUR 100,000 per depositor per bank, with specific coverage rules and exclusions.

BI/application topics:

- Covered deposits by depositor and bank.
- Deposit aggregation by depositor identity.
- Excluded deposit categories.
- Temporary high balance tracking where applicable.
- Depositor payout readiness dashboards.
- Data quality checks for depositor identity verification.

## BI Design Checklist For EU/Romania

- Identify whether the dashboard is management BI, regulatory reporting support, operational control, AML/fraud monitoring, DORA evidence, or privacy/security monitoring.
- Record the applicable jurisdiction and regulatory context: EU, Romania, group-level, local branch, subsidiary, or cross-border.
- Declare reporting reference date and submission period.
- Preserve source-to-report lineage and transformation version.
- Keep a template/mapping table for regulatory reporting metrics.
- Build reconciliation checks to GL, risk systems, source ledgers, and prior submissions.
- Apply GDPR-style minimisation and access control by default.
- Separate AML/fraud/investigation data from general BI datasets.
- Add maker/checker signoff where reports support controls or external reporting.
- Maintain evidence retention and report ownership metadata.

## Source Anchors

Primary links are listed in [06-bibliography.md](06-bibliography.md).
