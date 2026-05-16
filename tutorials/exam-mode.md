---
{
  "id": "tutorial-tutorials-exam-mode",
  "title": "Exam Mode",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Exam Mode

Exam mode is a set of longer practical cards. Pick one card, work in your own
time, and use the expected outputs to self-assess the result.

Objective: practice longer BI review tasks that combine SQL results,
reconciliation controls, and written self-assessment.

After this exam guide, you will be able to:

- Pick an independent exam card that matches your current learning goal.
- Compare your work against deterministic expected outputs.
- Decide whether your explanation is strong enough before moving to the next
  area.

Training boundary: use synthetic training data only. These cards are technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Use the [interactive exam surface](#/exam) to pick a card and compare your
written work against the deterministic expected outputs.

## Card 1 - Grain And Fanout Review

Objective: produce a one-page review note and SQL result proving that current
balance reporting stays at latest account-date grain before ownership analysis
is introduced.

Inputs: synthetic account balances and account ownership rows. Treat balances
as one row per account and business date before any owner join.

Expected outputs:

| Metric               | Expected value |
| -------------------- | -------------- |
| correct_ledger_total | 95700          |
| naive_joined_total   | 164800         |
| fanout_delta         | 69100          |

Self-assessment:

- You can identify the join that duplicates the measure.
- You can explain why the repair belongs upstream of dashboard charts.
- You can describe why depositor-bank guarantee analysis is a different grain
  from latest account balance reporting.

## Card 2 - Month-End Controls Review

Objective: build a currency-level month-end exposure result and attach controls
for non-month-end rows, stale collateral valuation, and output minimisation.

Inputs: synthetic lending snapshots, collateral valuation dates, and currency
codes. Treat exposure date, valuation date, and dashboard control date as
separate concepts.

Expected outputs:

| Metric                           | Expected value |
| -------------------------------- | -------------- |
| EUR latest_principal_total       | 55000          |
| RON latest_principal_total       | 396000         |
| non_month_end_snapshot_count     | 1              |
| stale_collateral_valuation_count | 3              |

Self-assessment:

- You can distinguish exposure date, valuation date, and dashboard control
  dates.
- You can explain why naive time sums are controls, not KPIs.
- You can keep loan and property identifiers out of the report-serving result.

## Card 3 - Weighted Ratio Metric Contract

Objective: define a reusable Average Account Balance metric and prove it is
weighted by account count rather than averaged over already-aggregated rows.

Inputs: the deposits seed dataset.

Expected outputs:

| Metric                           | Expected value |
| -------------------------------- | -------------- |
| latest_ledger_total              | 95700          |
| latest_account_count             | 6              |
| weighted_average_account_balance | 15950.00       |
| average_of_averages_anti_pattern | 14012.50       |
| currency_share_ron               | 82.86%         |

Self-assessment:

- You can show the weighted formula `SUM(ledger_total) / SUM(account_count)`
  and explain why it is stable under any chart filter context.
- You can name the LS data-source aggregation settings that let the
  formula stay correct across filters (`Sum` on `ledger_total`, `Sum` on
  `account_count`, `Auto` on the calculated field).
- You can describe at least one scenario where
  `SUM(COUNT(DISTINCT account_id))` would overstate the account count, and
  the cert-correct recompute that avoids the trap.

## Card 4 - Governance Release Decision

Objective: write a release decision for the executive deposit dashboard that
keeps personal-data identifiers out of the report data source while preserving
the aggregate KPI.

Inputs: the deposits seed dataset and the candidate-field table from
tutorial 07.

Expected outputs:

| Metric                           | Expected value                        |
| -------------------------------- | ------------------------------------- |
| kept_fields                      | 6                                     |
| excluded_sensitive_fields        | 4                                     |
| sensitive_fields_kept            | 0                                     |
| restriction_flag_in_public_chart | 0                                     |
| control_total                    | 95700                                 |
| credential_mode_for_internal_use | viewer_credentials_or_authorized_view |

Self-assessment:

- You can name the four sensitive fields that must be excluded
  (`account_id`, `customer_id`, `synthetic_iban`, `masked_account_number`).
- You can explain when authorized views, row-level security, and
  column-level security each apply, and which one solves which problem.
- You can describe the cert-track default credential mode for an internal
  BI report and why owner credentials are not it.

## Card 5 - BigQuery Cost Triage

Objective: explain why a serving view costs less than a broad raw scan, and
list three real BigQuery cost mechanics that the simulated proxy in
tutorial 06 does not model.

Inputs: tutorial 06 outputs.

Expected outputs:

| Metric                            | Expected value          |
| --------------------------------- | ----------------------- |
| simulated_raw_estimated_bytes     | 11232                   |
| simulated_serving_estimated_bytes | 1248                    |
| simulated_reduction_pct           | 88.89                   |
| named_real_cost_mechanic_examples | partition filter; query |
|                                   | results cache;          |
|                                   | materialized view cache |

Self-assessment:

- You can describe what `total_bytes_processed`,
  `total_bytes_billed`, and `cache_hit` in `INFORMATION_SCHEMA.JOBS`
  mean.
- You can explain when a partition filter saves cost and when it does
  not (predicate must be on the partition column).
- You can explain why a logical view does not avoid a re-scan but a
  materialized view sometimes does.

## Card 6 - DORA Operations Evidence

Objective: produce one daily operations evidence row plus a DORA-shaped ICT
third-party register entry for the deposits executive dashboard, then
identify what would force a hold on a non-zero reconciliation delta day.

Inputs: tutorial 08 outputs.

Expected outputs:

| Metric                              | Expected value           |
| ----------------------------------- | ------------------------ |
| reconciliation_delta_in_service_day | 0                        |
| reconciliation_delta_break_day      | 40                       |
| operations_status_in_service_day    | in_service               |
| operations_status_break_day         | hold_publish_investigate |
| dora_critical_service               | BigQuery                 |
| dora_important_service              | Looker Studio            |

Self-assessment:

- You can describe the difference between freshness lag and reconciliation
  delta as two independent controls.
- You can explain why a non-zero delta or a failed validation rule must
  hold the publish rather than have the dashboard adjusted to match the
  source.
- You can write one row of an ICT third-party register that records
  service, provider, criticality, function supported, data location, and
  an exit-plan summary.

## Completion Evidence

For now, exam evidence is learner-controlled. Keep a short note with the SQL
result, expected-output comparison, and self-assessment bullets. Do not paste
credentials, private URLs, or real banking data into the app or notes.
