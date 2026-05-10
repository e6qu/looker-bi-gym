---
{
  "id": "tutorial-tutorials-05-blending-vs-upstream-joins",
  "title": "05 - Blending Vs Upstream Joins",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-FANOUT-JOIN-RISK",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 05 - Blending Vs Upstream Joins

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: reproduce blend and fanout examples on synthetic banking
sources only. Do not use real or masked production banking data.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [04 - Metrics And Calculated Fields](04-metrics-and-calculated-fields.md)

Required tools: browser SQL path first; optional Looker Studio browser UI.

Objective: prove a grain/fanout error with numbers, then move the safe logic
upstream so a dashboard cannot repeat the mistake.

After this tutorial, you will be able to:

- Reproduce a many-to-many fanout overstatement.
- Compare naive and corrected balance totals.
- Explain why the repair belongs in serving SQL or shared data-source logic.

Produces:

- Completed `020 - Account Owner Fanout CTF`.
- `notes/05-grain-and-fanout-findings.md`

## Source Facts

- `FACT-BI-FANOUT-JOIN-RISK`
- `FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`
- `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`
- `FACT-BIGQUERY-LOGICAL-VIEW`
- `FACT-BIGQUERY-VIEW-SCOPE`

## Goal

Prove a grain/fanout error with numbers, then move the safe logic upstream so a
dashboard cannot repeat the mistake.

## Steps

1. Open `#/challenges/account-owner-fanout`.
2. Inspect `account_daily_balances` and `account_owners`.
3. Run the fanout proof query and confirm the one-row result contains
   `correct_ledger_total`, `naive_joined_total`, `fanout_delta`, and
   `overstatement_pct`.
4. Record that latest account-grain total is 95700 and naive owner-joined total
   is 164800.
5. Explain why deposit-guarantee coverage must later resolve to depositor-bank
   grain rather than account-owner join rows.
6. Write the corrected logic as a serving-view rule so charts consume a safe
   source.

## Checkpoints

- `fanout_delta` is 69100.
- `overstatement_pct` is 72.20.
- The challenge displays `flag-account-owner-fanout`.
- Your note names the upstream serving-view pattern as the reusable fix.

## Common Failure Modes

- Joining owners before calculating latest account balances.
- Returning only the corrected total and not proving the wrong total.
- Fixing the metric in one chart while leaving raw join paths available.

## Deliverable

Create `notes/05-grain-and-fanout-findings.md` with the naive query result, the
corrected query result, the delta, and the serving-view recommendation.
