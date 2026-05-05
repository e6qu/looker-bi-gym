# 04 - CRR / CRD

## Coordinates

- Jurisdiction: European Union.
- Instruments: Capital Requirements Regulation and Capital Requirements Directive.
- Core CRR: Regulation (EU) No 575/2013.
- Core CRD: Directive 2013/36/EU.
- Later banking package changes include CRR3/CRD6. Validate current applicability with the bank's regulatory reporting team.
- EBA Single Rulebook: https://eba.europa.eu/single-rulebook
- EBA CRR page: https://eba.europa.eu/regulation-and-policy/single-rulebook/interactive-single-rulebook/12674
- EBA CRD page: https://eba.europa.eu/regulation-and-policy/single-rulebook/interactive-single-rulebook/11764

## Why A BI Developer Cares

CRR/CRD drive prudential reporting and management dashboards for own funds, capital requirements, credit risk, market risk, operational risk, counterparty risk, leverage, liquidity, large exposures, and governance.

BI developers usually do not implement regulatory calculations alone, but they build data marts, reconciliations, dashboards, exception queues, lineage, and evidence around those calculations.

## BI-Relevant CRR/CRD Areas

- Own funds.
- Risk-weighted assets.
- Credit risk exposure class and risk weights.
- Credit risk mitigation and collateral.
- Market risk.
- Counterparty credit risk and CVA.
- Operational risk.
- Large exposures.
- Leverage ratio.
- Liquidity coverage and stable funding.
- Asset encumbrance.
- Disclosure and reporting.
- Governance and SREP inputs.

## Critical Data Coordinates To Model

- Reporting entity and consolidation scope.
- Reference date and reporting period.
- Exposure ID and counterparty ID.
- Exposure class.
- Product/type of facility.
- Performing/non-performing status.
- Forbearance status.
- Collateral type and valuation date.
- Currency and FX conversion date/rate.
- Risk weight or model segment.
- Regulatory template mapping.
- GL/risk-system reconciliation status.

## Dashboards To Build

- Capital ratio management view.
- RWA bridge by exposure class.
- Large exposure limit monitoring.
- Leverage exposure trend.
- Liquidity management view aligned to LCR/NSFR data domains.
- Operational risk event/loss dashboard.
- Regulatory reporting validation breaks and signoff dashboard.

## Implementation Checklist

- Never mix management definitions with regulatory definitions without labeling them.
- Track reporting framework version and template version.
- Store source-system lineage and transformation version.
- Build reconciliation from GL to FINREP and from risk systems to COREP-like marts.
- Keep reference-date cuts immutable after signoff.
- Record manual adjustments separately with owner, reason, approval, and timestamp.
- Include threshold/limit breach workflows.

## Common BI Failure Modes

- A dashboard shows "capital ratio" without defining regulatory basis or consolidation scope.
- Exposure data changes after regulatory submission with no frozen reporting snapshot.
- FX rates differ between source, mart, and report.
- Manual adjustments are overwritten instead of versioned.
