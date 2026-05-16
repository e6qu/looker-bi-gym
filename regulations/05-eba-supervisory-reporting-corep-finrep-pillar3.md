# 05 - EBA Supervisory Reporting, COREP, FINREP, Pillar 3

Training boundary: this brief is technical orientation for synthetic BI training, not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production interpretations with the bank's institutional teams.

## Coordinates

- Jurisdiction: European Union.
- Authority: European Banking Authority.
- Instrument type: Implementing Technical Standards, reporting frameworks, templates, validation rules, Data Point Model, XBRL taxonomy, Pillar 3 disclosure requirements.
- EBA ITS on supervisory reporting: https://eba.europa.eu/activities/single-rulebook/regulatory-activities/supervisory-reporting/implementing-technical-standards-supervisory-reporting
- EBA reporting frameworks: https://eba.europa.eu/risk-and-data-analysis/reporting/reporting-frameworks
- EBA Pillar 3 disclosure ITS: https://eba.europa.eu/activities/single-rulebook/regulatory-activities/transparency-and-pillar-3/implementing-technical-standards-institutions-public-disclosures-information-referred-titles-ii-and
- EBA Pillar 3 data hub: https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/transparency-and-pillar-3/implementing-technical-standards-pillar-3-data-hub

## Why A BI Developer Cares

Regulatory reporting is one of the most BI-like activities in a bank, but with stricter requirements: exact template coordinates, validation rules, lineage, reproducibility, and signoff.

## Main Reporting Families

- COREP: own funds, capital requirements, credit/market/operational risk, large exposures, leverage, liquidity, stable funding, asset encumbrance and related prudential domains.
- FINREP: financial information, balance sheet, P&L, asset quality, non-performing exposures, forbearance, and accounting-oriented reporting.
- Pillar 3: public prudential disclosures designed for consistency and market discipline.

## Coordinates A BI Model Should Store

- <a class="termRef" href="#/terminology/regulations.md#reporting-framework-version">Reporting framework version<sup>REG</sup></a>
  release.
- Taxonomy version.
- Reporting reference date.
- Submission due date.
- Submission timestamp.
- Template ID.
- Row code.
- Column code.
- Data point ID where applicable.
- Validation rule ID.
- Source system.
- Source extraction timestamp.
- Transformation job/version.
- Adjustment ID.
- Owner and approver.
- Submission/resubmission sequence.

## Data Domains To Include

- GL balances and movements.
- Exposure-level credit data.
- Counterparty and connected-client data.
- Collateral and guarantees.
- Product and portfolio hierarchy.
- Performing/non-performing and forbearance status.
- Off-balance-sheet items.
- Own funds instruments.
- Liquidity inflows/outflows.
- Encumbered assets.
- ESG/Pillar 3 data where applicable.

## Dashboards To Build

- Reporting calendar and status.
- Template completeness.
- Validation-rule breaks.
- Data-quality issues by source system.
- GL-to-FINREP reconciliation.
- Risk-mart-to-COREP reconciliation.
- Manual adjustments and approvals.
- Submission/resubmission history.
- Pillar 3 disclosure readiness and evidence.

## Implementation Checklist

- Freeze submitted reporting snapshots.
- Never overwrite submitted values without versioning.
- Separate raw regulatory values, transformed values, validated values, adjusted values, and submitted values.
- Store validation results as data, not screenshots.
- Keep exception workflow metadata.
- Make template coordinates visible in BI drill-throughs.
- Align data retention with regulatory evidence requirements.

## Common BI Failure Modes

- A report has values but no row/column/template coordinates.
- Validation failures are tracked in email, not data.
- The BI mart cannot reproduce a prior submission.
- Manual adjustments are not attributable to a person and approval.
