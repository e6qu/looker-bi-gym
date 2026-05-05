# Research Map: BI With BigQuery And Looker Studio

Date: 2026-05-05

This project investigates technical business intelligence for banking and financial operations using Google BigQuery as the analytical warehouse and Looker Studio as the self-service reporting surface. The focus is practical: model bank data for BI, publish trustworthy metrics, keep dashboards fast and cheap, and understand where Looker Studio is strong or weak compared with fuller semantic-layer BI tools such as Looker.

## Core Stack

BigQuery is the execution and storage layer. It is where raw data is loaded, transformed, modeled, secured, cached, monitored, and optimized.

Looker Studio is the visualization and lightweight report-modeling layer. It connects to BigQuery tables, views, materialized views, or custom SQL, then builds charts, controls, calculated fields, blends, and shareable reports.

Looker, distinct from Looker Studio, is the enterprise semantic-modeling BI platform. It uses LookML to define dimensions, measures, joins, access rules, and governed Explores. This project focuses on Looker Studio, but includes Looker/LookML as a comparison point because many Looker Studio limitations are semantic-layer limitations.

## Key Findings

The most reliable architecture is to do heavy modeling in BigQuery and keep Looker Studio thin. Community discussions repeatedly report that dashboards become slow or expensive when Looker Studio performs too much blending, row-level calculation, custom SQL over raw event tables, or excessive chart querying.

Banking BI success depends more on grain, metric definitions, data lineage, and control evidence than chart mechanics. A useful dashboard starts with a decision or control question, declares metric definitions, and publishes data at the grain users actually need.

BigQuery design matters directly to dashboard cost. Partitioning, clustering, materialized views, summary tables, BI Engine, data freshness settings, and query-result caching all affect Looker Studio report latency and spend.

Governance is not optional in a bank. BI requires controlled data credentials, reusable data sources, row-level and column-level policies, masked sensitive fields, ownership transfer procedures, lineage, reconciliation, auditability through BigQuery `INFORMATION_SCHEMA` and Cloud Audit Logs, and clear separation between production reporting and exploratory analysis.

Looker Studio has a lightweight data model, not a full semantic layer. It can define fields and parameters in data sources, but it does not provide the same governed cross-table metric model as Looker/LookML. For this project, BigQuery views and documented metric contracts act as the semantic layer.

## Research Themes

### BI Foundations

- Decision-oriented dashboard design.
- Dimensional modeling, star schemas, fact/dimension separation, and grain.
- Additive, semi-additive, and non-additive metrics.
- Conformed dimensions and cross-process reporting.
- Metric governance, semantic layers, and metrics layers.
- Banking domains: deposits, lending, payments, cards, treasury, finance, risk, compliance, fraud, operations, and customer service.
- Regulatory-reporting mindset: lineage, controls, signoff, data quality, and reproducibility.

### Looker Studio

- Connectors, data sources, embedded vs reusable sources.
- BigQuery connector workflow and custom query usage.
- Dimensions, metrics, calculated fields, parameters, controls, filters, and data blending.
- Sharing, credentials, ownership, report/data-source permissions.
- Performance controls: freshness, extracts, lower chart count, fewer fields, upstream aggregation.

### BigQuery For BI

- Partitioned and clustered serving tables.
- Logical views vs materialized views vs scheduled summary tables.
- BI Engine acceleration.
- Query-plan and job-cost diagnosis.
- Public datasets for demo work.
- Security: IAM, authorized views, row-level policies, column-level policy tags, masking.
- Sensitive data controls for nonpublic personal information, account identifiers, transaction details, credit attributes, and staff-only operational data.

### Technical BI

- BI as a product: requirements, contracts, tests, documentation, release notes.
- Metrics as code: SQL views, YAML/data contracts, checked definitions.
- Observability: identify expensive dashboards, expensive users, query patterns, cache misses.
- Data quality: null handling, fanout detection, metric reconciliation, freshness checks.
- Operational workflow: dashboard review, deprecation, ownership handoff, access recertification.
- Control workflow: evidence capture, maker/checker review, issue tracking, attestation, and audit traceability.
- Model and analytics risk: distinguish descriptive BI, rules, scorecards, statistical models, and regulated model outputs.

## Suggested Demo Domain

Use a synthetic retail-bank model because it supports most BI and banking-control lessons without requiring real financial data:

- Customers, parties, accounts, balances, deposits, withdrawals, payments, card transactions, loans, repayments, delinquencies, fees, complaints, cases, alerts, branches, channels, products, GL entries, and reference data.
- Metrics such as deposits under management, average daily balance, net interest margin proxy, fee income, transaction volume/value, delinquency rate, non-performing exposure, charge-off rate, suspicious-activity alert volume, false positive rate, case aging, operational SLA breaches, reconciliation breaks, and complaint resolution time.
- Security examples such as regional/branch row access, masked customer identifiers, masked account numbers, restricted credit attributes, and separate compliance/risk datasets.
- Performance examples at transaction grain, account-day balance grain, monthly finance grain, and executive/risk KPI grain.

Public BigQuery datasets can be used for initial tool practice, but a synthetic banking dataset is better for repeatable tutorials because it can encode known fanouts, late-arriving postings, reversals, PII/NPI, regulatory reporting cuts, back-office queues, risk events, and metric edge cases.

## Banking Reference Frame

This is a technical learning project, not legal, accounting, regulatory, or model-risk advice. Banking examples should be treated as training scenarios and validated against a specific institution's policies, jurisdiction, control framework, and regulatory obligations before real use.

Useful external anchors:

- BCBS 239: risk data aggregation and risk reporting principles.
- EBA Single Rulebook, CRR/CRD, COREP, FINREP, and Pillar 3: EU prudential and regulatory reporting context.
- DORA: EU digital operational resilience and ICT third-party risk context.
- PSD2: EU payment services, strong customer authentication, fraud reporting, and payment incident context.
- GDPR: EU personal-data protection context for BI minimisation, masking, retention, and accountability.
- AMLA / EU AML package: EU AML/CFT harmonisation and AMLA transition.
- FFIEC BSA/AML Manual: BSA/AML risk assessment, suspicious activity reporting, OFAC, and transaction monitoring concepts.
- Federal Reserve/OCC SR 11-7: model risk management expectations for quantitative models.
- FTC GLBA and Safeguards Rule resources: financial customer information protection.
- OCC/CFPB/FFIEC consumer-compliance materials: fair lending, UDAAP/UDAP, CRA, and related examination concepts.
- CECL/IFRS 9: expected credit loss analytics where applicable.
- FR Y-9C/Call Report-style reporting: regulatory reporting lineage and reconciliation mindset.
- Romanian context: BNR statute and prudential role, Law 129/2019 and ONPCSB AML/CFT materials, Law 190/2018 and ANSPDCP data-protection materials, and FGDB deposit guarantee materials.

## Source Notes

Official Google docs are treated as authoritative for product behavior. Blogs, Reddit, Medium, Stack Overflow, and other community sources are used as field reports: useful for recurring pain points and workaround patterns, but not authoritative for exact product limits.

Primary sources are collected in [06-bibliography.md](06-bibliography.md).
