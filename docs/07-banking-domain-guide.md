# Banking Domain Guide For BI

This guide reframes the project around bank analytics, back-office reporting, risk/compliance operations, and financial-control dashboards. It is for technical BI learning, not legal, accounting, regulatory, or model-risk advice.

## Banking BI Audiences

Executive management:

- Balance sheet, deposit trends, loan portfolio trends, fee income, margin proxies, risk appetite metrics, operational risk, audit issues, and strategic KPIs.

Finance and treasury:

- General ledger reconciliations, balance movement, liquidity proxies, product profitability, branch/channel performance, regulatory reporting support, and period close controls.
- EU/Romanian examples: COREP/FINREP support views, BNR reporting inventory, minimum reserve requirement evidence, FX reporting controls, and local statutory/reporting mappings.

Credit risk:

- Loan origination quality, exposure, delinquency, non-performing loans, probability-of-default segments, charge-offs, recoveries, forbearance, collateral coverage, and expected-credit-loss inputs.

Financial crime compliance:

- AML alerts, sanctions screening queues, suspicious activity investigation aging, SAR/STR workflow metrics, high-risk customer populations, transaction monitoring rules, and false positive analysis.
- EU/Romanian examples: AMLA/EU AML package transition awareness, Law 129/2019 reporting-entity obligations, ONPCSB reporting workflow evidence, customer due diligence, beneficial ownership, and sanctions restrictions.

Fraud operations:

- Fraud alerts, confirmed fraud losses, recovery, dispute aging, cards/payment anomalies, mule-risk indicators, and queue productivity.
- EU examples: PSD2 payment fraud reporting, strong customer authentication monitoring, SCA exemption analytics, and payment incident reporting.

Retail/back-office operations:

- Account servicing, payment exceptions, reconciliation breaks, failed postings, case queues, complaints, SLAs, branch workload, and operational controls.
- EU examples: DORA operational-resilience evidence, ICT incident workflow analytics, critical function mapping, and third-party ICT service monitoring.

Consumer compliance:

- Complaint trends, fee assessment monitoring, overdraft program analytics, fair lending monitoring inputs, UDAAP/UDAP risk indicators, and remediation tracking.

## Core Entities

Party and customer:

- Individual, organization, household, beneficial owner, customer relationship, KYC status, risk rating, consent/privacy attributes.

Account:

- Deposit account, loan account, card account, account status, product, branch, opening/closing dates, ownership role.

Transaction:

- Monetary movement, posting event, authorization event, channel, counterparty, merchant, currency, amount, debit/credit indicator, reversal flag, posting date, effective date.

Balance:

- End-of-day balance, average daily balance, available balance, ledger balance, exposure, accrued interest.

Loan:

- Facility, draw, installment, collateral, repayment schedule, delinquency bucket, days past due, charge-off/recovery, allowance segment.

Case and alert:

- AML alert, fraud alert, complaint, dispute, back-office work item, investigation status, queue, assignment, SLA clock, disposition.

Finance/reference:

- GL account, cost center, product hierarchy, branch hierarchy, legal entity, currency, calendar, holiday, regulatory report line mapping.

## Fact Table Examples

- `fct_transactions`: one row per posted transaction.
- `fct_authorizations`: one row per card/payment authorization.
- `fct_account_daily_balances`: one row per account per business date.
- `fct_loan_monthly_snapshot`: one row per loan per month-end.
- `fct_gl_entries`: one row per general ledger posting line.
- `fct_reconciliation_breaks`: one row per unresolved recon exception per run.
- `fct_aml_alerts`: one row per generated AML alert.
- `fct_cases`: one row per case lifecycle event or one row per case snapshot.
- `fct_complaints`: one row per customer complaint.

## Dimension Examples

- `dim_date`
- `dim_customer`
- `dim_account`
- `dim_product`
- `dim_branch`
- `dim_channel`
- `dim_merchant`
- `dim_counterparty`
- `dim_employee`
- `dim_case_status`
- `dim_gl_account`
- `dim_currency`
- `dim_risk_segment`

## Metric Examples

Deposits and accounts:

- Total deposits.
- Average daily balance.
- New accounts opened.
- Account closure rate.
- Dormant account count.

Payments and cards:

- Transaction count and value.
- Authorization approval rate.
- Decline rate by reason.
- Reversal rate.
- Dispute rate.

Credit:

- Outstanding exposure.
- Days past due distribution.
- Delinquency rate.
- Non-performing loan ratio.
- Charge-off rate.
- Recovery rate.
- Allowance coverage proxy.

Compliance and fraud:

- AML alert volume.
- Alert-to-case conversion rate.
- False positive rate.
- Case aging.
- SAR/STR decision queue aging.
- Sanctions screening hit disposition time.
- Confirmed fraud loss.

Operations and finance:

- Reconciliation break count/value.
- SLA breach rate.
- Backlog by queue.
- Complaint resolution time.
- GL balance variance.
- Period-close task completion rate.

## Grain Warnings

Banking data frequently has multiple valid dates:

- Transaction date.
- Authorization date.
- Posting date.
- Effective date.
- Value date.
- Statement date.
- Business date.
- Month-end reporting date.

Every fact table and metric must declare which date is used.

Balances are semi-additive:

- You can sum balances across accounts for one date.
- You generally cannot sum daily balances across time unless computing a defined flow or average.

Transactions often have reversals and adjustments:

- Decide whether metrics use gross, net, settled, posted, or effective activity.

Customers and accounts are many-to-many:

- Joint accounts, authorized signers, beneficial owners, and householding can create fanout.

Loan metrics are snapshot-sensitive:

- Month-end exposure, delinquency, and allowance metrics should use a consistent reporting cut.

## Security And Privacy

Treat these as sensitive by default:

- Customer identifiers, account numbers, tax identifiers, names, addresses, phone/email, transaction narratives, counterparties, credit scores, income, KYC documents, complaint narratives, employee investigation notes, SAR/STR-related information, fraud investigation details, and sanctions-screening details.

Technical controls to practice:

- Masked identifiers in serving views.
- Column-level policy tags for NPI/PII and credit attributes.
- Row-level policies by branch, region, legal entity, or business line.
- Separate datasets for executive, finance, risk, compliance, and operations views.
- Viewer credentials where per-user BigQuery entitlements matter.
- Service account credentials where enterprise governance supports them.
- Audit queries for data access and dashboard usage.
- GDPR-style purpose limitation, data minimisation, retention, and accountability.
- Romania-specific caution for national identification numbers under Law 190/2018.

## Control And Audit Expectations

Banking BI artifacts should include:

- Metric owner.
- Data owner.
- Business process owner.
- Source-to-report lineage.
- Refresh SLA.
- Reconciliation procedure.
- Data quality checks.
- Access-control rationale.
- Change history.
- Evidence retention location.
- Known limitations.
- Regulatory context tag, such as management BI, COREP, FINREP, Pillar 3, DORA, PSD2 fraud, AML/CFT, GDPR/privacy, BNR reporting, ONPCSB workflow, or FGDB deposit guarantee.

## EU/Romania-Specific BI Topics

- EBA Single Rulebook / CRR / CRD: own funds, RWA, leverage, liquidity, large exposures, operational risk, governance, and supervisory-review support.
- COREP / FINREP / Pillar 3: regulatory template mapping, validation checks, submission workflow, resubmission history, and reconciliation.
- DORA: ICT incident reporting, asset inventory, third-party ICT providers, critical or important functions, resilience testing, and cyber/availability evidence.
- PSD2: payment fraud reporting, strong customer authentication, SCA exemptions, open banking/API availability, and major payment incidents.
- GDPR and Romanian Law 190/2018: personal data minimisation, pseudonymisation, retention, data subject rights, national identification number handling, and DPIA inventory.
- AMLA / EU AML package and Romanian Law 129/2019: CDD/KYC, beneficial ownership, sanctions, high-risk customers, transaction monitoring, suspicious reporting workflow, and ONPCSB evidence.
- BNR: prudential supervision context, minimum reserve requirements, FX regime/reporting, payment system oversight, and local regulatory submissions.
- FGDB: covered deposits, depositor aggregation, excluded deposits, temporary high balances, and payout-readiness data quality.

## Demo Data Strategy

Use synthetic data. Do not use real customer, employee, account, transaction, alert, complaint, or investigation data in this repo.

Recommended synthetic domains:

- Retail deposit portfolio.
- Consumer loan portfolio.
- Card/payment transactions.
- AML/fraud alert queue.
- Back-office reconciliation and case management.
- GL period-close reporting.
