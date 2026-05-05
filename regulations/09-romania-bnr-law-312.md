# 09 - Romania BNR Law 312/2004

## Coordinates

- Jurisdiction: Romania.
- Instrument: Law no. 312/2004 on the Statute of the National Bank of Romania.
- Publication: Monitorul Oficial no. 582, 30 June 2004.
- Official legislative portal: https://legislatie.just.ro/Public/DetaliiDocument/81502
- BNR unofficial English translation: https://www.bnr.ro/files/d/Legislatie/Lege_statut_bnr/L_StatBNR.pdf

## Why A BI Developer Cares

BNR is central to Romanian banking supervision, payment systems, monetary/FX context, and regulatory reporting. BI systems in Romanian banks often support BNR-facing reporting, controls, and evidence.

## Critical Article Coordinates

- Article 2: BNR's fundamental objective and main tasks, including monetary policy, exchange-rate policy, prudential authorisation/supervision of credit institutions, payment-system monitoring, currency issuance, FX regime, and international reserves.
- Article 8: minimum reserve requirements.
- Article 10: FX regime.
- Article 11: monitoring and reporting of FX transactions by authorised legal persons.
- Article 25: regulation, authorisation, and prudential supervision of credit institutions.

## BI-Relevant Data Domains

- Regulatory reporting inventory.
- Prudential reporting submissions.
- Minimum reserve calculations.
- FX transactions and positions.
- Payment systems operations.
- Supervisory findings and remediation.
- Legal entity and branch structure.
- BNR communications and reporting calendar.

## Dashboards To Build

- BNR regulatory submission calendar.
- Submission status and validation breaks.
- Minimum reserve requirement evidence.
- FX transaction/reporting control dashboard.
- Payment system incident and availability dashboard.
- Supervisory finding remediation tracker.

## Implementation Checklist

- Distinguish BNR-facing reports from internal management dashboards.
- Keep reporting reference dates immutable after signoff.
- Preserve evidence snapshots for submitted values.
- Track rule/regulation version and internal procedure version.
- Reconcile reporting outputs to GL, payment systems, and source ledgers.
- Store maker/checker approvals.

## Common BI Failure Modes

- Internal management values are reused for BNR reporting without regulatory mapping.
- Reporting snapshots are overwritten after submission.
- FX rates or currency conversions are not tied to an approved source and date.
- Supervisory remediation status is tracked outside governed systems.
