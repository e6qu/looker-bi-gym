---
id: terminology-banking
title: Banking Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, banking]
---

# Banking Terminology

## account

A banking product instance that records balances, transactions, ownership, and
status over time.

Example: a current account and a term deposit account are different account
types.

Related:
<a class="termRef" href="#/terminology/banking.md#depositor">depositor<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>.

## account holder

A person or entity recorded as holding an account.

Example: a joint account can have two or more account holders.

Related:
<a class="termRef" href="#/terminology/banking.md#joint-account">joint account<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#depositor">depositor<sup>BNK</sup></a>.

## balance snapshot

A recorded balance at a reference date or time.

Example: a month-end balance snapshot supports period-end exposure reporting.

Related:
<a class="termRef" href="#/terminology/bi.md#snapshot-fact">snapshot fact<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## branch

A banking location or organizational unit used for customer service, ownership,
management, or reporting.

Example: branch-level reporting can summarize balances by city or region.

Related:
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
<a class="termRef" href="#/terminology/banking.md#branch-liquidity">branch liquidity<sup>BNK</sup></a>.

## branch liquidity

A reporting theme for monitoring balances, flows, and funding indicators by
branch, currency, and reference date.

Example: branch liquidity monitoring can compare deposit balances across
branches for a month-end date.

Related:
<a class="termRef" href="#/terminology/banking.md#branch">branch<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dashboard">dashboard<sup>BI</sup></a>.

## collateral

An asset pledged to support a credit exposure.

Example: real estate collateral may have a valuation date distinct from a loan
exposure date.

Related:
<a class="termRef" href="#/terminology/banking.md#exposure">exposure<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#valuation-date">valuation date<sup>BNK</sup></a>.

## covered deposit

A deposit amount that falls within applicable deposit-guarantee coverage rules.

Example: covered deposit calculations require depositor-level aggregation
before applying a ceiling.

Related:
<a class="termRef" href="#/terminology/banking.md#eligible-deposit">eligible deposit<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#dgsd-guarantee-ceiling">DGSD guarantee ceiling<sup>REG</sup></a>.

## currency

The monetary unit in which an account, transaction, balance, or compensation
amount is denominated.

Example: a dashboard can show balances separately for EUR and RON.

Related:
<a class="termRef" href="#/terminology/banking.md#exchange-rate-date">exchange-rate date<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>.

## deposit

Money placed with a bank under a deposit product or account relationship.

Example: current accounts and term deposits can both contribute to deposit
reporting, depending on the definition.

Related:
<a class="termRef" href="#/terminology/banking.md#depositor">depositor<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#eligible-deposit">eligible deposit<sup>BNK</sup></a>.

## depositor

The person or entity whose deposits are being considered for coverage or
reporting.

Example: several accounts can belong to the same depositor and may need to be
aggregated together.

Related:
<a class="termRef" href="#/terminology/banking.md#account-holder">account holder<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#dgsd-guarantee-ceiling">DGSD guarantee ceiling<sup>REG</sup></a>.

## eligible deposit

A deposit that satisfies the eligibility conditions for a guarantee or reporting
treatment.

Example: excluded deposits should not be mixed into covered-balance
calculations.

Related:
<a class="termRef" href="#/terminology/banking.md#covered-deposit">covered deposit<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#excluded-deposit">excluded deposit<sup>BNK</sup></a>.

## excluded deposit

A deposit excluded from a guarantee or reporting treatment.

Example: excluded rows should be separated before applying a coverage ceiling.

Related:
<a class="termRef" href="#/terminology/banking.md#eligible-deposit">eligible deposit<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## exchange-rate date

The reference date for converting amounts between currencies.

Example: compensation reporting may need a payment currency and exchange-rate
date distinct from the original account currency.

Related:
<a class="termRef" href="#/terminology/banking.md#currency">currency<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## exposure

The amount at risk or outstanding for a customer, facility, product, or
portfolio.

Example: loan principal outstanding is often part of credit exposure reporting.

Related:
<a class="termRef" href="#/terminology/banking.md#collateral">collateral<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#semi-additive-metric">semi-additive metric<sup>BI</sup></a>.

## guarantee ceiling

The maximum standard amount applied by a deposit-guarantee rule before special
cases are considered.

Example: coverage analysis compares depositor-bank totals to the applicable
ceiling.

Related:
<a class="termRef" href="#/terminology/regulations.md#dgsd-guarantee-ceiling">DGSD guarantee ceiling<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/banking.md#depositor">depositor<sup>BNK</sup></a>.

## joint account

An account with more than one holder.

Example: joint ownership can change how account balances are allocated before
depositor-level coverage is calculated.

Related:
<a class="termRef" href="#/terminology/banking.md#account-holder">account holder<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>.

## ledger balance

The recorded account balance at a reference point according to the bank's
ledger.

Example: a ledger balance may be reported as an end-of-day balance snapshot.

Related:
<a class="termRef" href="#/terminology/banking.md#balance-snapshot">balance snapshot<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#semi-additive-metric">semi-additive metric<sup>BI</sup></a>.

## product

A banking offering or account category.

Example: current account, savings account, term deposit, mortgage, and credit
card are product categories.

Related:
<a class="termRef" href="#/terminology/banking.md#account">account<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>.

## temporary high balance

A balance above the standard guarantee ceiling that may receive temporary
protection under defined event conditions.

Example: a qualifying event can require event date and protected-until date
fields before modelling coverage.

Related:
<a class="termRef" href="#/terminology/banking.md#guarantee-ceiling">guarantee ceiling<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#temporary-high-balance">temporary high balance<sup>REG</sup></a>.

## valuation date

The date on which an asset or collateral value is assessed.

Example: collateral market value and loan principal can have different
reference dates.

Related:
<a class="termRef" href="#/terminology/banking.md#collateral">collateral<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.
