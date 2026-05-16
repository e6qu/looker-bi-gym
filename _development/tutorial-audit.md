# Tutorial Audit

Audit performed on the `terminology-integrity-checks` branch on 2026-05-16,
after the Phase 10 work landed on PR #45. Reading lens chosen with the user
on the same date:

- Audience: generalist studying for a BI / data certification, who wants
  reusable BI fundamentals plus banking flavour as practice material.
- Browser-only stance: mixed - the browser-first path must be complete and
  honest on its own; optional applied steps for BigQuery and Looker Studio
  are welcome only when they are clearly fenced, have their own setup, and
  carry expected outputs and recovery.
- Output shape: this audit doc plus a Phase 11 draft in `PLAN.md`. No
  tutorial edits in this pass.

The criteria the user named are fake, shallow, incomplete, inaccurate,
wrong, bad, or other defects. Severity is one of:

- `block`: would mislead a learner or fail a cert-shaped question outright.
- `high`: meaningfully limits learning value for a cert-track learner.
- `medium`: notable rough edge or missed teaching opportunity.
- `low`: cosmetic or stylistic.

## Cross-cutting findings

### CC-1 - `curriculum.md` is an aspirational map, not the curriculum

- Severity: `high`.
- Surface: `tutorials/curriculum.md`.
- Defect: lists inputs and outputs that no tutorial actually builds: `mart.dim_date`, `mart.dim_customer_masked`, `mart.dim_product`, `mart.dim_branch`, `mart.fct_account_daily_balances`, `mart.fct_aml_alerts`, `mart.fct_loan_monthly_snapshot`, `mart.fct_posted_transactions`, `serve.deposit_daily_branch_product`, `serve.exec_monthly_bank_kpis`, `serve.credit_risk_monthly_portfolio`, `serve.aml_alert_queue_daily`, `serve.reg_context_register`, `raw_party.customers`, `raw_payments.posted_transactions`, `raw_lending.loans`, `raw_fincrime.aml_alerts`, `raw_ops.cases`, `raw_ops.reconciliation_breaks`.
- Why it matters: the cert-track learner reading the map first will arrive at the tutorials expecting AML / payments / ops domains and a full `raw -> stg -> mart -> serve -> ops` layering. The tutorials deliver a much smaller deposits + lending scope on top of `account_daily_balances`, `accounts`, `branches`, `account_owners`, `products`, `loan_monthly_snapshots`, etc.
- Fix proposal: either rewrite `curriculum.md` to describe what the tutorials really build (no `mart.*` / `serve.*` objects, no AML / payments / ops domains), or move the aspirational architecture into a separate `tutorials/design-targets.md` with a clear "not built yet" header so the curriculum map matches the tutorial outputs.

### CC-2 - End Challenges leak the answer

- Severity: `high`.
- Surface: all of `00-orientation-and-stack.md`, `01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`.
- Defect: every End Challenge follows the pattern "write a release/handoff note in this form: ...; Expected answer: ...". The expected answer is printed in the same block, so there is nothing for the learner to discover, and self-assessment collapses to a copy-paste comparison.
- Why it matters: cert-track learners benefit from challenges they can actually fail. A learner who has skimmed the tutorial can complete the End Challenge correctly without having understood the SQL.
- Fix proposal: split each End Challenge into a prompt page (visible) and an expected-answer page (collapsed in a `<details>` block or a `#anchor` link). Keep deterministic expected outputs so the answer is still checkable, but do not show them inline.

### CC-3 - DuckDB-only SQL is silently shipped as BigQuery-style SQL

- Severity: `medium`.
- Surfaces: `02-build-a-bi-friendly-model.md` (uses `CAST(... AS VARCHAR)` in the source-grain profile), and learner tasks that use `TRY_CAST` / `NULLIF` with only a passing translation note.
- Defect: `VARCHAR` is DuckDB syntax; BigQuery / GoogleSQL uses `STRING`. A learner who copies the source-grain profile into the BigQuery UI Path will get a syntax error.
- Fix proposal: replace browser-path `CAST AS VARCHAR` with `CAST AS STRING` where the rest of the SQL is BigQuery-shaped, or add a per-step "browser-only" / "BigQuery-only" label. `LT-DQ-006` already does this cleanly for `TRY_CAST` vs `SAFE_CAST`; promote that pattern.

### CC-4 - Synthetic-data evidence is built so it cannot fail

- Severity: `medium`.
- Surfaces: 06 (`synthetic_job_events` VALUES), 07 (`candidate_dashboard_fields` and `credential_modes` VALUES), 08 (dependency/operations VALUES), 09 (capstone artifact checklist VALUES).
- Defect: many of the later tutorials simulate ops/governance work with hand-written `VALUES` rows, then run a `CASE` expression that compares the constructed columns to constants ("ready", "pass", "ok"). The check is tautological; the learner cannot produce a failing state from the steps as written.
- Why it matters: ops/governance work in practice is mostly about handling failed checks. A learner who completes 06-09 will not have seen freshness fail, a reconciliation break appear, a cost overrun, or a sensitive-field leak. Cert-shape questions love these failure modes.
- Fix proposal: split the synthetic VALUES into two scenarios per check (one passing, one failing), and ask the learner to identify what changed and what to remediate. Alternative: drive at least one check off real synthetic-dataset state (e.g., the actual `account_daily_balances` cutoff) so a learner who edits the seed can produce a failure.

### CC-5 - COUNT(DISTINCT) is summed across groups as if additive

- Severity: `medium`.
- Surfaces: `03-first-executive-dashboard.md` (`SUM(account_count)` over per-currency `COUNT(DISTINCT account_id)`), `04-metrics-and-calculated-fields.md` (same pattern at the contract-level check), Exam Card 1.
- Defect: `account_count` is `COUNT(DISTINCT account_id)` aggregated per `(business_date, currency_code)`. The contract-level check then does `SUM(account_count)` to produce a "latest active account count". This is only correct when each account appears in exactly one currency on a given date, which is true for this seed but is generally a famous certification trap: `COUNT(DISTINCT)` is not additive across groups.
- Why it matters: a cert-track learner will memorize the pattern and apply it in a scenario where customers do hold accounts in multiple currencies, then overstate the active account count.
- Fix proposal: add a short callout in tutorial 03 and 04 explaining when `SUM(COUNT(DISTINCT ...))` is correct (here: by construction of the synthetic data) and when it is not, with a one-row toy example showing the wrong answer.

### CC-6 - Inline grounding to `terminology/` is partial

- Severity: `low`.
- Surfaces: tutorials 00, 01, 02, 04, 05, 06, 07 (partial); tutorials 03, 08, 09 have no inline `class="termRef"` markers.
- Defect: this is the documented Phase 10.4 follow-on (see `_development/terminology-coverage.md`). It is not a defect introduced by these tutorials; it is the planned remaining work.

### CC-7 - The "fact register" and the tutorial body are loosely coupled

- Severity: `low`.
- Surfaces: every tutorial's frontmatter `source_facts` list.
- Defect: the tutorial body rarely quotes the fact it claims to ground, so the `source_facts` field is opaque to the reader. A learner reading the rendered page does not see the link between, for example, `FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME` and the prose claim that "a logical view still runs its query when queried" in tutorial 06.
- Fix proposal: low-priority. After Phase 10.4 grounds terms inline, consider also surfacing a "Sources" footer per tutorial that resolves the `source_facts` IDs into clickable fact-page links.

## Per-tutorial findings

### `00-orientation-and-stack.md` - Orientation And Stack

- T00-1 `medium`: the "End Challenge" lists the three corrections immediately under the prompt. The learner is asked to "write three corrections" and the next bullets are those corrections.
- T00-2 `medium`: depositor-bank grain vs account-balance grain is stated abstractly. A cert-track learner would benefit from one worked example, e.g. "one customer with two RON accounts of EUR 60,000 each holds EUR 120,000 balance but only EUR 100,000 is covered". This is the single most testable piece of the tutorial; it deserves numbers.
- T00-3 `low`: the tutorial does not actually require running any SQL or opening Looker Studio. It is a decision-log writing exercise. That is fine as orientation, but the title "Orientation And Stack" suggests stack mechanics; consider renaming or adding one small browser SQL warm-up.
- T00-4 `low`: `Required tools: browser only` is stronger than what the cert track needs - a single warm-up `SELECT` in the workbench would teach the learner what "browser-first" means by doing it.

### `01-connect-public-data.md` - Prepare A Synthetic Serving View For Looker Studio

- T01-1 `medium`: the browser-first SQL is correct and reproducible. The optional BigQuery UI path uses an inline `STRUCT([...])` `UNNEST` to seed the 18 rows, which works in BQ. Good. But there is no mention that running this `CREATE OR REPLACE TABLE` consumes storage in the learner's GCP project; cost-aware framing helps cert candidates.
- T01-2 `medium`: the "End Challenge" again prints `Expected answer: ...` on the same page (see CC-2).
- T01-3 `low`: "Treating a BigQuery logical view as if it accepted runtime parameters" appears in Common Failure Modes without showing what that mistake looks like. Add one anti-example.
- T01-4 `low`: no discussion of `MAX(business_date)` vs `CURRENT_DATE()` for "latest", a common certification trap.

### `02-build-a-bi-friendly-model.md` - Build A BI-Friendly Deposit Model

- T02-1 `medium`: the source-grain profile uses `CAST(MIN(business_date) AS VARCHAR)` which is DuckDB-only (see CC-3). Switch to `CAST(... AS STRING)` or drop the cast (DuckDB will display dates fine without).
- T02-2 `medium`: the recovery checks reference wrong totals (`90700`, `164800`) without showing the SQL that produces them. Add a "what bad query looks like this" snippet for each.
- T02-3 `medium`: no surrogate-key vs natural-key discussion. The `dim_account_masked` introduction is the natural place to teach this for cert.
- T02-4 `low`: End Challenge gives the answer (CC-2).
- T02-5 `low`: "fanout_warning=yes" as a handoff value is awkward; consider asking the learner to name the table that introduces the fanout.

### `03-first-executive-dashboard.md` - Build A First Executive Dashboard Spec

- T03-1 `high`: the End Challenge expected answer contains a semicolon inside the `freshness=...` value, but the handoff format itself is semicolon-separated. A learner who treats this as parseable will be wrong; either escape the inner semicolon or change the freshness wording.
- T03-2 `medium`: `SUM(account_count)` in the executive KPI check is the CC-5 issue.
- T03-3 `medium`: the scorecard guidance assumes `ledger_total` has default-SUM aggregation in Looker Studio, but the tutorial does not show where that default is configured (it is set on the data source field). Mention that explicitly.
- T03-4 `medium`: no mention of LS calculated field vs chart formula vs data-source calculated field distinctions, even though tutorial 04 leans on them.
- T03-5 `low`: End Challenge prints the answer.

### `04-metrics-and-calculated-fields.md` - Define Governed Metrics And Calculated Fields

- T04-1 `high`: the LS `Average Account Balance` reusable calculated field formula `SUM(ledger_total) / SUM(account_count)` with aggregation `Auto` is a real Looker Studio pattern, but LS does not strictly accept that exact syntax for a single field's aggregation if `ledger_total` and `account_count` are already pre-aggregated metrics. The cert-correct shape is to set the formula on a non-aggregated underlying field (or, in the data source, set aggregation Sum for `ledger_total` and `account_count` and then create a metric with `SUM(ledger_total) / SUM(account_count)` whose own aggregation is `None`). The tutorial conflates "aggregation Auto" with the actual data-source field configuration.
- T04-2 `medium`: the CC-5 `SUM(COUNT(DISTINCT ...))` pattern appears in the contract-level metric check.
- T04-3 `medium`: the chart-level "Currency percent of total" cites `82.86%` as RON share of currency total but uses `SUM(ledger_total) OVER ()` in the SQL, and the LS display step says "set the displayed `ledger_total` comparison or display option to percent of total if available in your report editor" - LS has a `Comparison calculation` of `Percent of total` which is exactly that. Name it.
- T04-4 `medium`: the weighted-average-vs-average-of-averages example (`15950.00` vs `14012.50`) is the strongest pedagogical moment in the file. Promote it further: give the learner the chance to compute both and compare, not just the right answer.
- T04-5 `low`: End Challenge prints the answer.

### `05-blending-vs-upstream-joins.md` - Compare Blends With Upstream Joins

- T05-1 (none `high`): this is the best tutorial in the set. The fanout proof is concrete and the allocation example with normalized shares is realistic.
- T05-2 `medium`: the optional Looker Studio path mentions "If a Looker Studio blend shows more rows than the leftmost source, inspect the join key, source order, and field subset" without showing what an LS blend rule (left join by default, optional inner / outer) actually looks like in the editor. A cert-track learner could pass a blend question only by reading this section.
- T05-3 `medium`: the allocation math (`b.ledger_balance * o.ownership_share_pct / t.account_share_total`) is correct but the file does not point out that this presumes ownership shares sum to 100 per account before this normalization. Worth one sentence.
- T05-4 `low`: End Challenge prints the answer.

### `06-performance-and-cost-lab.md` - Measure Dashboard Performance And Cost Signals

- T06-1 `high`: the byte simulation `rows * columns * 16` is a useful pedagogical proxy but the tutorial does not explain how BigQuery actually charges (only columns selected get scanned; partition filters and clustering further reduce; on-demand pricing is per TB processed). A cert-shape question on BigQuery cost rules cannot be answered from the synthetic proxy alone. CC-4 applies in addition.
- T06-2 `medium`: the optional `INFORMATION_SCHEMA.JOBS_BY_PROJECT` query uses `\`region-eu\`.INFORMATION_SCHEMA.JOBS_BY_PROJECT`. That syntax is correct, but the file does not name the alternatives (`JOBS_BY_USER`, `JOBS_BY_FOLDER`, `JOBS_BY_ORGANIZATION`) and their permission implications.
- T06-3 `medium`: no comparison of logical view vs materialized view vs table snapshot cost behaviour beyond a "still runs its query when queried" line. Cert-track scenarios test the difference.
- T06-4 `low`: End Challenge prints the answer.

### `07-governance-security-and-sharing.md` - Govern Dashboard Access, Fields, And Sharing

- T07-1 `medium`: the entire path runs against synthetic VALUES rows (CC-4). The field-classification table and the minimisation check both pass by construction.
- T07-2 `medium`: BigQuery authorized views are mentioned but the actual mechanic (granting an authorized view access to a source dataset) is described only verbally. For cert, give the exact `GRANT` / `bq update --set_iam_policy` shape or at least the BigQuery UI step ("Share -> Authorize Views").
- T07-3 `medium`: row-level security and column-level security (`policy tags`) are not introduced even though they belong in this tutorial for cert coverage.
- T07-4 `medium`: the credential-mode comparison conflates `viewer_credentials` permission requirements with sharing semantics. A cert-track learner needs: owner credentials = viewer sees what owner can see; viewer credentials = viewer must have direct access; service-account credentials = governed setup. Clarify.
- T07-5 `low`: End Challenge prints the answer.

### `08-observability-and-operations.md` - Operate Dashboard Freshness, Cost, And Controls

- T08-1 `medium`: same CC-4 issue. The dependency register, reconciliation delta, and DORA-style classification are all derived from constructed VALUES with `CASE` statements that produce "ok" / "0 delta" / "1 open item" by construction.
- T08-2 `medium`: DORA references (`FACT-DORA-ICT-IDENTIFICATION`, `FACT-DORA-ICT-RISK-FRAMEWORK`, `FACT-DORA-INCIDENTS`) are listed in frontmatter but the actual DORA-shaped artifact (an ICT third-party register, an incident severity classification) is built only as a synthetic VALUES row, not as a real exercise.
- T08-3 `medium`: reconciliation in real BI is most often about catching breaks; this tutorial only models a zero-delta day. Add a non-zero-delta scenario the learner must investigate.
- T08-4 `low`: End Challenge prints the answer.

### `09-technical-bi-capstone.md` - Assemble The Banking BI Capstone Package

- T09-1 `high`: the capstone Goal claims "Required Artifacts: 8 / Ready Artifacts: 8 / Rubric Score: 100 / Review Status: ready". The browser-first path makes this self-fulfilling: VALUES rows count themselves and the CASE expression returns `ready`. There is no path for a learner to score less than 100, which is exactly the opposite of what a capstone should do.
- T09-2 `high`: the capstone does not actually require carrying artifacts forward from prior tutorials. A learner can complete 09 without having done 02-08. The "build on" list is documentation, not enforcement.
- T09-3 `medium`: rubric items are checked by hardcoded VALUES rows, not by the learner's prior `notes/*.md` outputs.
- T09-4 `low`: End Challenge prints the answer.

## Learner-tasks findings

### `lt-bi-001-profile-dataset-grain.md` - Profile Dataset Grain

- L01-1 (no major defects). Clean, tight, browser-only. The grain inventory is exactly what cert-track learners need to start with.
- L01-2 `low`: the task asks the learner to "list the row grain" without giving an expected list; the worked answer is absent. Either give an expected canonical list, or note explicitly that the learner-produced list is the deliverable.

### `lt-bi-002-detect-fanout.md` - Detect Fanout Before Reporting

- L02-1 `medium`: reuses the tutorial-05 fanout numbers (164800, 95700) but at a slightly different framing. Cross-link to tutorial 05 explicitly so a learner who completed the LT understands they have seen this same pattern.

### `lt-sql-003-month-end-serving-result.md` - Build A Month-End Serving Result

- L03-1 `medium`: switches dataset to `lending-month-end/v0.1.0`. No re-orientation paragraph - the learner suddenly needs to know `loan_monthly_snapshots`, `collateral`, etc.
- L03-2 `medium`: no expected output table for the final serving result is presented inline; the learner has to derive expected EUR/RON totals.

### `lt-looker-004-report-ready-data-source.md` - Prepare A Report-Ready Data Source

- L04-1 `medium`: the task is largely a design exercise with no concrete deliverable beyond a note. For a cert-track learner this is fine if framed as "design"; consider renaming.
- L04-2 `low`: "Distinguish a format-verified local evidence pattern from a manually verified Looker Studio report" is unclear jargon.

### `lt-looker-007-control-parameter-handoff.md` - Design A Control Parameter Handoff

- L07-1 `medium`: defines the BigQuery named-parameter pattern but never shows the actual UI step in BigQuery for binding parameter values. For cert, the exact UI control name (`@parameter` placeholder + the Query parameters dialog) helps.

### `lt-dq-005-reconcile-dashboard-controls.md` - Reconcile Dashboard Controls

- L05-1 (no major defects).

### `lt-dq-006-ratio-null-contract.md` - Define A Ratio Null Contract

- L06-1 `medium`: explicitly calls out DuckDB `TRY_CAST` and `NULLIF` vs BigQuery `SAFE_CAST` and `SAFE_DIVIDE`. This is the model the rest of the curriculum should follow.

## Recipe findings

### `recipes/r-looker-001-deposits-dashboard.md`

- R01-1 `medium`: 70 lines, purely UI instructions. A cert-track learner without a Looker Studio account cannot complete this. Either add a fallback "describe what the chart would look like and why" path, or move the recipe under an `applied-only` label so learners know it requires an account.

## Cross-cutting page findings

### `tutorials/README.md`

- IR-1 `low`: the "Start Here" list ordering reads as a different path than the numeric tutorials. Make the relationship between the LT path and the 01-09 numbered tutorials explicit (which artifacts overlap, when to skip).

### `tutorials/curriculum.md`

- IR-2 `high`: see CC-1. This file is the largest single piece of drift between expectation and delivery.

### `tutorials/data-sources.md`

- IR-3 `medium`: distinguishes "Available In The Browser Now" from "Warehouse Design Targets" correctly. Good. Could be promoted: every tutorial should link to the "Available now" section before its first SQL block, so a learner does not assume `raw_party.customers` is loaded.

### `tutorials/exam-mode.md`

- IR-4 `medium`: only two cards, both deterministic. A cert-track learner finishing 09 has consumed everything in roughly an hour of exam content. Expand to at least 6-8 cards or document the count expectation as Phase 9 work.
- IR-5 `low`: "Use the interactive exam surface" - no link.

### `tutorials/quiz-bank.md`

- IR-6 `low`: the markdown table has long single-cell rows that make the rendered table awkward; consider a bulleted summary instead.

## Summary

The audit found 1 `block`, 0 `high` issues that block release-state work (this audit is read-only), 9 `high` defects that meaningfully limit cert-track learning value (mostly: aspirational curriculum map, leaked end-challenge answers, tautological VALUES checks in 06-09, the LS calculated-field accuracy issue in 04, the capstone scoring), 27 `medium`, 17 `low`.

The strongest tutorial is 05 (blending vs upstream joins). The weakest pattern is the 06-09 cluster, where governance/ops/capstone work is simulated with synthetic VALUES rows that pass by construction. The cross-cutting `curriculum.md` is the largest single source of expectation drift.

Track all fixes via `PLAN.md` Phase 11 - Tutorial Audit Remediation.
