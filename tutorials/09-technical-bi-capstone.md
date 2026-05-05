# 09 - Technical BI Capstone

Area: E - Capstone

Builds on:

- All previous tutorials.

Input sources:

- All `mart.*` and `serve.*` objects produced in Areas B-D.
- `metrics/banking_metric_contracts.md`
- `serve.reg_context_register`
- Notes and runbooks from tutorials 00-08.

Produces:

- Multi-page Looker Studio report.
- `README.md` or `notes/09-capstone-readme.md`
- Final architecture, metric, security, operations, and regulation-context inventory.

## Problem

Design and deliver a small but production-shaped BI product using BigQuery and Looker Studio.

## Outcome

You can apply modeling, metrics, dashboard design, performance, governance, and observability in one coherent demo.

## Capstone Brief

Build a retail-bank technical BI product for four audiences:

- Executive: monthly balance sheet, risk, and operations KPI performance.
- Finance/Treasury: GL reconciliation, deposit trends, and liquidity proxy reporting.
- Credit Risk: portfolio exposure, delinquency, charge-off, and allowance-input monitoring.
- Compliance/Operations: AML/fraud alert queues, complaints, reconciliation breaks, and SLA breaches.
- EU/Romania overlay: one page or appendix showing how selected metrics map to COREP/FINREP/Pillar 3, DORA, PSD2 fraud, AML/CFT, GDPR, BNR, ONPCSB, or FGDB topics.

## Required Components

- BigQuery raw/staging/mart/serving layers.
- Declared grain for every fact and serving table.
- Metric contracts for core KPIs.
- One Looker Studio report with at least four pages.
- BigQuery summary tables or materialized views for performance.
- Access/governance notes.
- Monitoring queries for Looker Studio jobs.
- Final README explaining how to reproduce and evaluate the project.
- Synthetic data only, with documented masking and access-control assumptions.
- EU/Romania regulatory-context register for every dashboard page.

## Investigation Questions

- Which metrics are shared across audiences?
- Which serving tables are audience-specific?
- What is the acceptable freshness for each page?
- What dashboard cost is acceptable?
- What access model prevents raw-data leakage?
- Which outputs need reconciliation evidence and maker/checker signoff?
- Which analytics are descriptive BI versus model outputs subject to model-risk governance?
- Which pages support EU or Romanian regulatory workflows, and what evidence must they retain?

## Deliverable

A complete banking-oriented demo project suitable for portfolio review or internal technical BI training, documented in `notes/09-capstone-readme.md`.
