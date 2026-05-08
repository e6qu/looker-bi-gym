# 07 - EU AML Package And AMLA

Training boundary: this brief is technical orientation for synthetic BI training, not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production interpretations with the bank's institutional teams.

## Coordinates

- Jurisdiction: European Union.
- Framework: 2024 EU AML/CFT package.
- Authority: Authority for Anti-Money Laundering and Countering the Financing of Terrorism, AMLA.
- AMLA legal existence: 26 June 2024, per AMLA materials.
- EU AML/CFT tasks move from EBA to AMLA from 1 January 2026, per EBA AML/CFT page.
- AMLA overview: https://www.amla.europa.eu/about-amla_en
- EBA AML/CFT transition page: https://www.eba.europa.eu/regulation-and-policy/anti-money-laundering-and-countering-financing-terrorism
- Council adoption note: https://www.consilium.europa.eu/en/press/press-releases/2024/05/30/anti-money-laundering-council-adopts-package-of-rules/

## Why A BI Developer Cares

AML/CFT dashboards support customer due diligence, transaction monitoring, sanctions screening, beneficial ownership, risk scoring, investigation workflow, FIU reporting, and management oversight.

The EU AML framework is moving toward more harmonised rules and EU-level AMLA oversight, so local reports should be designed with structured, comparable data and evidence.

## BI-Relevant Themes

- Customer due diligence.
- Enhanced due diligence.
- Beneficial ownership.
- Customer risk assessment.
- Sanctions and restrictive measures screening.
- Transaction monitoring alerts.
- Suspicious transaction/report workflow.
- Cross-border cases and FIU cooperation.
- AML/CFT compliance officer and governance evidence.

## Data Domains To Include

- Customer and party master.
- KYC documents and refresh status.
- Beneficial owner relationships.
- Account and product holdings.
- Transactions and counterparties.
- Alerts and scenarios/rules.
- Watchlist/sanctions hits.
- Investigation cases.
- Decisions, escalations, and reports.
- Analyst, reviewer, and approval workflow.

## Dashboards To Build

- KYC/CDD refresh backlog.
- High-risk customer inventory.
- Beneficial ownership completeness.
- Alert volume and conversion to case.
- False positive and true positive rates.
- Sanctions hit aging and disposition.
- Suspicious reporting workflow aging.
- Analyst productivity with careful employee-monitoring controls.
- Scenario/rule effectiveness.

## Implementation Checklist

- Keep AML investigation data in restricted datasets.
- Avoid exposing suspicious reporting decisions outside authorized compliance audiences.
- Track every status transition with timestamp, actor, and reason.
- Link alerts to scenario/rule versions.
- Preserve customer risk score history, not just current score.
- Use case-level evidence retention.
- Separate operational management metrics from regulatory reportable events.

## Common BI Failure Modes

- A report exposes sensitive AML case notes to branch users.
- Customer risk score is overwritten with no history.
- Alerts cannot be linked back to rule versions.
- False-positive rate is computed on open alerts instead of closed/dispositioned alerts.
