# Dataset Expansion Roadmap

The MVP browser track remains deposits-first. These domains are documented expansion targets, not prerequisites for the first learner path.

## Lending And Credit Risk

- Synthetic loan accounts, customers, collateral, repayment schedules, arrears events, staging labels, and impairment inputs.
- BI traps: slowly changing credit status, vintage/cohort ambiguity, default-event timing, exposure-at-default grain, collateral fanout, and borrower/loan/account grain mismatch.
- Context tags: EBA, CRR/CRD, BNR, GDPR.

## Payments, Cards, PSD2, And Fraud

- Synthetic payment instructions, card authorizations, settlement events, merchant categories, consent records, strong-customer-authentication outcomes, and fraud case labels.
- BI traps: authorization versus settlement date, reversals, duplicate retries, multi-currency settlement, merchant hierarchy fanout, and consent validity windows.
- Context tags: PSD2, GDPR, BNR.

## AML/CFT And Sanctions

- Synthetic customer risk profiles, alerts, cases, watchlist-screening hits, transaction monitoring scenarios, and beneficial ownership links.
- BI traps: case lifecycle state, alert-to-case fanout, party resolution ambiguity, threshold tuning leakage, false positive rates by queue, and sensitive-field minimization.
- Context tags: AML/CFT, Romania Law 129, GDPR.

## Finance, GL, And Reconciliation

- Synthetic journal lines, product ledgers, trial balances, intercompany breaks, suspense accounts, and reconciliation controls.
- BI traps: debit/credit sign conventions, posting versus effective dates, month-end close snapshots, chart-of-account hierarchy changes, and unreconciled break aging.
- Context tags: BNR, EBA, FGDB.

## DORA, Operations, And BI Observability

- Synthetic BI jobs, dashboard views, data freshness checks, incident tickets, vendor dependencies, and operational control evidence.
- BI traps: event-time versus detection-time, partial refreshes, retries, incident severity rollups, service dependency fanout, and evidence completeness.
- Context tags: DORA, GDPR, BNR.

Each new domain should start with a small hand-authored version, a metadata contract, one validator-focused challenge, and one intentionally broken scenario before any larger generated fixture is considered.
