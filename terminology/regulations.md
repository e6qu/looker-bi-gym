---
id: terminology-regulations
title: Regulatory Terminology
content_type: terminology
status: published
version: 0.1.0
topic: terminology
tags: [terminology, regulations]
---

# Regulatory Terminology

## accountability

The principle that an organization must be able to demonstrate responsible
handling of regulated obligations and controls.

Example: a BI source shared broadly should have an owner and a stated purpose.

Related:
<a class="termRef" href="#/terminology/regulations.md#gdpr-purpose-limitation">GDPR purpose limitation<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## data controller

The party that determines the purposes and means of personal-data processing.

Example: a bank can be a controller for customer reporting data.

Related:
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#data-processor">data processor<sup>REG</sup></a>.

## data processor

The party that processes personal data on behalf of a controller.

Example: a managed analytics platform can act as a processor depending on the
arrangement.

Related:
<a class="termRef" href="#/terminology/regulations.md#data-controller">data controller<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>.

## DGSD guarantee ceiling

The EU deposit-guarantee framework concept for the standard EUR 100,000 ceiling
per depositor per bank.

Example: deposit coverage modelling must aggregate by depositor and bank before
applying the ceiling.

Related:
<a class="termRef" href="#/terminology/banking.md#guarantee-ceiling">guarantee ceiling<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#depositor">depositor<sup>BNK</sup></a>.

## DORA ICT dependency register

An operational-resilience inventory context for important ICT assets,
dependencies, and evidence used by control reporting.

Example: a critical dashboard can need recorded source, owner, platform, and
monitoring dependencies.

Related:
<a class="termRef" href="#/terminology/regulations.md#ict-risk">ICT risk<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bigquery.md#job-metadata">job metadata<sup>BQ</sup></a>.

## DORA incident reporting

Operational-resilience reporting context for significant ICT-related incidents.

Example: a dashboard outage used in an incident review needs a clear incident
window and affected dependencies.

Related:
<a class="termRef" href="#/terminology/regulations.md#ict-risk">ICT risk<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## EBA validation rule

A rule used to validate regulatory reporting data or templates.

Example: a changed validation rule can explain why a submission passes in one
framework version and fails in another.

Related:
<a class="termRef" href="#/terminology/regulations.md#reporting-framework-version">reporting framework version<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reconciliation">reconciliation<sup>BI</sup></a>.

## FGDB compensation context

Romanian deposit-guarantee context, including RON compensation and
exchange-rate-date considerations.

Example: a coverage note may need to distinguish account currency from payment
currency.

Related:
<a class="termRef" href="#/terminology/banking.md#exchange-rate-date">exchange-rate date<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/banking.md#currency">currency<sup>BNK</sup></a>.

## GDPR data minimisation

The principle that personal-data processing should be limited to data necessary
for the stated purpose.

Example: a branch aggregate dashboard should not include customer identifiers
unless they are necessary for that purpose.

Related:
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>.

## GDPR purpose limitation

The principle that data should be used for specified, explicit, and legitimate
purposes rather than unrelated future possibilities.

Example: fields retained only because they might be useful later should be
challenged.

Related:
<a class="termRef" href="#/terminology/regulations.md#gdpr-data-minimisation">GDPR data minimisation<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#accountability">accountability<sup>REG</sup></a>.

## ICT risk

Risk related to information and communication technology systems, services,
dependencies, and operations.

Example: a dashboard pipeline dependency can be part of ICT risk review if it
supports an important process.

Related:
<a class="termRef" href="#/terminology/regulations.md#dora-ict-dependency-register">DORA ICT dependency register<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#dora-incident-reporting">DORA incident reporting<sup>REG</sup></a>.

## personal data

Information relating to an identified or identifiable natural person.

Example: a customer identifier can be personal data when it can be linked to a
person.

Related:
<a class="termRef" href="#/terminology/regulations.md#pseudonymised-data">pseudonymised data<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#gdpr-data-minimisation">GDPR data minimisation<sup>REG</sup></a>.

## pseudonymised data

Data transformed so it cannot be attributed to a person without additional
information. It can still be personal data when re-identification remains
possible.

Example: hashed customer IDs can still require personal-data handling.

Related:
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#gdpr-data-minimisation">GDPR data minimisation<sup>REG</sup></a>.

## reporting framework version

The version of a regulatory reporting framework used for a period, template, or
validation rule set.

Example: validation breaks should be compared against the framework version
used for each reporting period.

Related:
<a class="termRef" href="#/terminology/regulations.md#eba-validation-rule">EBA validation rule<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/bi.md#reference-date">reference date<sup>BI</sup></a>.

## special category personal data

Personal data requiring heightened protection because of its sensitive nature.

Example: a dashboard source should exclude unnecessary fields that could reveal
special-category data.

Related:
<a class="termRef" href="#/terminology/regulations.md#personal-data">personal data<sup>REG</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#gdpr-data-minimisation">GDPR data minimisation<sup>REG</sup></a>.

## temporary high balance

A deposit-guarantee treatment for qualifying balances above the standard
coverage ceiling for a limited period.

Example: event type and protected-until date are needed before modelling this
treatment.

Related:
<a class="termRef" href="#/terminology/banking.md#temporary-high-balance">temporary high balance<sup>BNK</sup></a>,
<a class="termRef" href="#/terminology/regulations.md#dgsd-guarantee-ceiling">DGSD guarantee ceiling<sup>REG</sup></a>.
