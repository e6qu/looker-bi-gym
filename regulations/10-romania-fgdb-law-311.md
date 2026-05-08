# 10 - Romania Deposit Guarantee, FGDB / Law 311/2015

Training boundary: this brief is technical orientation for synthetic BI training, not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production interpretations with the bank's institutional teams.

## Coordinates

- Jurisdiction: Romania.
- Instrument: Law no. 311/2015 on Deposit Guarantee Schemes and the Bank Deposit Guarantee Fund.
- Effective date: 14 December 2015, per FGDB page.
- Institution: Fondul de Garantare a Depozitelor Bancare, FGDB.
- FGDB depositor page: https://www.fgdb.ro/en/pages/pentru-deponenti
- FGDB Law 311/2015 page: https://www.fgdb.ro/en/pages/legea-nr-311-2015-privind-schemele-de-garantare-a-depozitelor-%C5%9Fi-fondul-de-garantare-a-depozitelor-bancare
- EU DGS overview: https://finance.ec.europa.eu/banking/banking-regulation/deposit-guarantee-schemes_en

## Why A BI Developer Cares

Deposit guarantee data requires precise depositor aggregation, identity verification, product classification, exclusions, currency handling, and payout readiness.

## Critical Coordinates From FGDB Public Materials

- General guarantee ceiling: RON equivalent of EUR 100,000 per depositor per bank.
- FGDB states this ceiling is the same in all EU countries.
- Banks that are Romanian legal persons are members of FGDB; EU branches operating in Romania are generally covered by home-country schemes.
- FGDB materials list deposit categories and exclusions; verify the current legal text before implementation.

## BI-Relevant Data Domains

- Depositor identity.
- Customer-to-account ownership.
- Deposit products.
- Current accounts, savings accounts, term deposits, card accounts.
- Joint accounts.
- Accrued interest.
- Currency and BNR exchange rate on unavailability date.
- Excluded deposit categories.
- Temporary high balances where applicable.
- Payout status.

## Dashboards To Build

- Covered deposit exposure by depositor.
- Depositor aggregation quality.
- Accounts missing verified identity.
- Excluded deposits report.
- Temporary high balance tracking.
- FGDB payout readiness dashboard.
- Deposit concentration by product, currency, and depositor segment.

## Implementation Checklist

- Model depositor, customer, party, and account ownership separately.
- Preserve ownership role and share where available.
- Aggregate by depositor per bank, not just by account.
- Include accrued interest according to policy.
- Track deposit eligibility/exclusion reason.
- Store currency and conversion-rate source.
- Flag unverified identities.
- Reconcile deposit totals to GL and core banking.

## Common BI Failure Modes

- Joint accounts double-count or undercount depositor coverage.
- Deposit guarantee is calculated at account level rather than depositor level.
- Excluded deposits are mixed with covered deposits.
- Currency conversion date is not controlled.
