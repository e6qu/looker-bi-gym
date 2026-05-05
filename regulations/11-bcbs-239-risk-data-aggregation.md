# 11 - BCBS 239 Risk Data Aggregation And Reporting

## Coordinates

- Framework: Basel Committee on Banking Supervision, Principles for effective risk data aggregation and risk reporting.
- Common name: BCBS 239.
- Publication date: 9 January 2013.
- Status: Current, per BIS page reviewed.
- Official source: https://www.bis.org/publ/bcbs239.htm

## Why A BI Developer Cares

BCBS 239 is not an EU regulation or Romanian law, but it is foundational for banking risk data architecture. It is directly relevant to BI developers because it defines expectations for risk data aggregation and reporting: accuracy, completeness, timeliness, adaptability, governance, and infrastructure.

## Principle Groups

BCBS 239 is organized around:

- Governance and infrastructure.
- Risk data aggregation capabilities.
- Risk reporting practices.
- Supervisory review, tools, and cooperation.

## BI-Relevant Principle Themes

- Data architecture and IT infrastructure must support risk reporting in normal and stress conditions.
- Risk data should be accurate and reliable.
- Risk data should be complete.
- Risk data should be timely.
- Aggregation should be adaptable to ad hoc requests and stress/crisis reporting.
- Reports should be clear, useful, accurate, comprehensive, frequent enough, and distributed to the right recipients.

## Data Domains To Include

- Credit exposure.
- Market exposure.
- Liquidity exposure.
- Operational risk events.
- Concentrations.
- Counterparties and connected groups.
- Collateral.
- Legal entity and consolidation structure.
- Risk limits and breaches.
- Stress scenarios.

## Dashboards To Build

- Risk data quality dashboard.
- Exposure concentration dashboard.
- Limit breach dashboard.
- Stress reporting readiness.
- Risk report inventory and distribution list.
- Data lineage coverage.
- Manual adjustment dashboard.

## Implementation Checklist

- Document data lineage from source to risk report.
- Track completeness by source, portfolio, legal entity, and date.
- Reconcile risk figures to finance where required.
- Measure report timeliness against SLA.
- Version risk metrics and aggregation logic.
- Preserve historical values and adjustments.
- Make data quality exceptions visible and owned.

## Common BI Failure Modes

- Risk dashboards cannot reconcile to finance dashboards.
- Aggregations omit a legal entity or branch.
- Manual adjustments are invisible.
- Stress reports require new manual extracts because data architecture is not adaptable.
