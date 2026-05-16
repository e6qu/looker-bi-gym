# 03 - DORA

Training boundary: this brief is technical orientation for synthetic BI training, not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production interpretations with the bank's institutional teams.

## Coordinates

- Jurisdiction: European Union.
- Instrument: Regulation (EU) 2022/2554, Digital Operational Resilience Act.
- CELEX: `32022R2554`.
- Official Journal: OJ L 333, 27 December 2022.
- Entry into force: 16 January 2023.
- Application date: 17 January 2025.
- Official text: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554
- ESMA overview: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora
- EBA overview: https://www.eba.europa.eu/activities/direct-supervision-and-oversight/digital-operational-resilience-act
- European Commission delegated/implementing acts: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en

## Why A BI Developer Cares

DORA makes ICT operational resilience a financial-sector control domain. BI systems may be used to evidence
<a class="termRef" href="#/terminology/regulations.md#ict-risk">ICT risk<sup>REG</sup></a>
management, incidents,
<a class="termRef" href="#/terminology/regulations.md#dora-ict-dependency-register">third-party ICT dependency<sup>REG</sup></a>,
resilience testing, and recovery readiness.

BI platforms themselves may also become part of the operational reporting chain and must be governed as technology assets.

## Critical Chapter / Article Coordinates

- Chapter II, Articles 5-16: ICT risk management.
- Articles 17-23: ICT-related incident management, classification, and reporting.
- Articles 24-27: digital operational resilience testing.
- Articles 28-30: ICT third-party risk management and contractual arrangements.
- Articles 31-44: oversight framework for critical ICT third-party service providers.

## BI-Relevant Data Domains

- ICT asset inventory.
- Critical or important function inventory.
- Application/service ownership.
- Incident records and severity classification.
- Cyber and operational resilience test results.
- Vulnerability, patching, backup, restore, RTO/RPO metrics.
- ICT third-party providers and contracts.
- Cloud concentration and subcontracting.
- Control exceptions and remediation plans.

## Dashboards To Build

- ICT incident register and reporting timeline.
- Critical function to application/system mapping.
- Third-party ICT provider exposure and concentration dashboard.
- Resilience testing calendar and findings.
- Recovery evidence dashboard: RTO/RPO, backup success, restore tests.
- DORA control remediation backlog.

## Implementation Checklist

- Classify whether the BI dashboard itself is critical to control reporting.
- Link incidents to affected systems, critical functions, vendors, and business services.
- Preserve event timestamps and workflow state transitions.
- Restrict security-sensitive details: vulnerability names, attack vectors, architecture details, privileged systems.
- Track evidence source, reviewer, signoff, and retention.
- Model third-party and subcontractor relationships as many-to-many.
- Keep DORA reporting cuts separate from generic operational metrics.

## Common BI Failure Modes

- Incident metrics omit clock start/stop definitions.
- Vendor dashboards cannot distinguish group-level vendor from local Romanian contract.
- Resilience testing evidence is stored in free text or attachments with no structured status.
- BI users get access to sensitive cyber details they do not need.
