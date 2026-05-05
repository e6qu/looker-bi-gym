# 08 - Romania Law 129/2019 AML/CFT

## Coordinates

- Jurisdiction: Romania.
- Instrument: Law no. 129/2019 for preventing and combating money laundering and terrorist financing.
- Publication: Monitorul Oficial no. 589, 18 July 2019.
- Authority / FIU: Oficiul Național de Prevenire și Combatere a Spălării Banilor, ONPCSB.
- ONPCSB legislation page: https://www.onpcsb.ro/en/a/126/legislation
- Official legislative portal: https://legislatie.just.ro/Public/DetaliiDocument/230127
- ONPCSB mission: https://www.onpcsb.ro/en/a/90/onpcsb-mission

## Why A BI Developer Cares

Romanian banking AML BI must support reporting-entity obligations, risk-based CDD, suspicious reporting workflows, sanctions/international restrictions monitoring, evidence retention, and ONPCSB/FIU-facing processes.

## Critical Coordinates

- Article 1: national framework for preventing and combating money laundering and terrorist financing; identifies categories of authorities and institutions, including Romania's FIU and sectoral supervisory/control authorities.
- Article 5: reporting entities. ONPCSB FAQ materials list credit institutions that are Romanian legal persons and branches of foreign credit institutions among entities under Law 129/2019.

Always verify the consolidated law and secondary regulations for production implementation.

## BI-Relevant Data Domains

- Customer identification and verification.
- Beneficial ownership.
- Customer risk rating.
- CDD/EDD refresh status.
- Transactions and counterparties.
- Sanctions/international restrictions screening.
- Transaction monitoring alerts.
- Suspicious transaction/report workflow.
- Internal escalation and review decisions.
- ONPCSB reporting evidence.

## Dashboards To Build

- CDD refresh backlog by risk class.
- High-risk customer inventory.
- Beneficial ownership completeness.
- Transaction monitoring alerts by scenario.
- Suspicious report workflow aging.
- Sanctions hit disposition.
- Reporting-decision evidence dashboard.
- AML control issue/remediation tracker.

## Implementation Checklist

- Use restricted datasets for AML reports.
- Keep customer/account identifiers masked unless the user role requires them.
- Preserve status transition history for alerts and cases.
- Store decision not to report with reason, reviewer, approval, and timestamp where policy requires.
- Link reports to evidence snapshots.
- Keep scenario/rule version metadata.
- Align retention with bank AML policy and legal requirements.

## Common BI Failure Modes

- Investigation notes appear in general BI reports.
- Alert aging resets when cases are reassigned.
- Customer risk class history is lost.
- Sanctions hits and AML alerts are mixed without clear typology.
