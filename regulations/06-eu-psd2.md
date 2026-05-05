# 06 - PSD2

## Coordinates

- Jurisdiction: European Union.
- Instrument: Directive (EU) 2015/2366, revised Payment Services Directive.
- CELEX: `32015L2366`.
- Entry into force: 12 January 2016, per EBA materials.
- Application date: 13 January 2018, per EBA materials.
- Official text: https://eur-lex.europa.eu/eli/dir/2015/2366/oj
- European Commission payment services overview: https://finance.ec.europa.eu/consumer-finance-and-payments/payment-services/payment-services_en
- EBA PSD2 page: https://eba.europa.eu/regulation-and-policy/single-rulebook/interactive-single-rulebook/14575
- EBA fraud reporting guidelines: https://eba.europa.eu/publications-and-media/press-releases/eba-publishes-final-guidelines-fraud-reporting-under-psd2
- EBA SCA/secure communication RTS page: https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/regulatory-technical-standards-on-strong-customer-authentication-and-secure-communication-under-psd2

## Why A BI Developer Cares

Payment BI often supports fraud reporting, strong customer authentication monitoring, incident reporting, customer impact metrics, open banking/API monitoring, and payment operations.

## Critical Article Coordinates

- Article 96: operational and security incident notification and fraud statistical data reporting.
- Article 97: strong customer authentication.
- Article 98: regulatory technical standards for strong customer authentication and secure communication.
- Articles 66-67: payment initiation and account information services.

## BI-Relevant Data Domains

- Payment transactions.
- Payment instrument and channel.
- Authentication method and SCA exemption.
- Payment fraud flags and confirmed fraud.
- Payment service provider role.
- Open banking/API traffic.
- Incident and outage records.
- Customer impact counts.
- Refund/liability workflow.

## Dashboards To Build

- Payment volume/value by instrument and channel.
- Fraud rate by instrument, channel, geography, merchant category, SCA status.
- SCA exemption usage and outcome.
- Open banking API availability and error rates.
- Payment incident classification and reporting workflow.
- Customer-impact and remediation tracking.

## Implementation Checklist

- Separate attempted, authorised, cleared, settled, returned, reversed, and disputed transactions.
- Preserve fraud classification date and confirmation date.
- Track payer/payee geography and payment instrument consistently.
- Store SCA applied/exempt/not-applied with reason codes.
- Version fraud reporting methodology.
- Align incident dashboards with notification thresholds and workflow.

## Common BI Failure Modes

- Fraud rate denominator changes between dashboards.
- Card authorisations are mixed with settled transactions.
- SCA exemption counts cannot be reconciled to payment totals.
- Incident start/end timestamps are manually edited without audit trail.
