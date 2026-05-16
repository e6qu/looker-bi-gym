# 061 - Tutorial Audit Remediation

Status: in progress on branch `terminology-integrity-checks` in PR #45.
Folded into the same PR by user direction so the Phase 10 follow-through
and the Phase 11 tutorial fixes land together.

## Goal

Address the tutorial defects recorded in
[\_development/tutorial-audit.md](../tutorial-audit.md). The reading lens is
a generalist studying for a BI / data certification, with a browser-first
path that must stand on its own and explicit applied-track paths.

## Scope

All six Phase 11 sub-phases from `PLAN.md`:

### Phase 11.1 - Cross-cutting structural fixes

- Rewrite `tutorials/curriculum.md` so it documents what the tutorials
  actually build. The aspirational mart* / serve* / AML / payments / ops
  architecture lived in this index but never matched the numbered
  tutorials. Where the schemas remain useful as forward-looking targets,
  they stay in `tutorials/data-sources.md` under "Warehouse Design
  Targets".
- Wrap every "Expected answer:" / "passes when it includes this evidence:"
  block in tutorials 00 through 09 inside a
  `<details><summary>Reveal expected answer</summary>...</details>` block.
  Learners now attempt the challenge before the answer appears.
- Replace `CAST(... AS VARCHAR)` with `CAST(... AS STRING)` so the SQL
  renders in both DuckDB-WASM and BigQuery without dialect drift.
- Fix tutorial 03 freshness label so the inner separator no longer
  collides with the `;` separator in the End Challenge format.

### Phase 11.2 - Failure scenarios in tutorials 06-09

- 06: add a cost-budget failure scenario. A chart that joins broad raw
  source overruns a 20 KB byte budget and triggers
  `over_budget_hold_release`.
- 07: add a minimisation-failure scenario. `customer_id` flipped to keep
  triggers `fail_hold_release` on the minimisation check.
- 08: add a reconciliation-break scenario and a DORA ICT third-party
  register row exercise.
- 09: replace the capstone's "8/8 rubric score 100 by construction" with
  a cross-tutorial consistency check that the learner fills from their
  own `notes/0X-*.md` outputs. Skipping a prior tutorial moves the
  package to `hold_for_remediation`.

### Phase 11.3 - Tighten LS+BQ mechanics for cert

- 03: add an Aggregation Notes section for data-source vs chart-level
  aggregation, and the `COUNT(DISTINCT)` non-additivity trap.
- 04: clarify the LS reusable calculated-field guidance for
  `SUM(ledger_total) / SUM(account_count)` with `Aggregation: Auto`.
- 06: add a BigQuery Cost Mechanics section that names per-column
  scanning, partition filters, clustering, materialized view cache,
  query results cache, and reservations.
- 07: add a BigQuery Access Mechanics section (authorized views, RLS,
  CLS) and a Looker Studio Credential Modes section.

### Phase 11.4 - Banking-domain depth

- 00: add a numeric depositor-bank worked example (EUR 60k + EUR 60k vs
  EUR 100k ceiling).
- 05: explain the ownership-share normalization assumption before the
  allocation query.

### Phase 11.5 - Index pages and exam mode

- `tutorials/README.md`: separate the practice (LT-\*) path and the
  tutorial (00-09) path with explicit Start Here sections and a short
  paragraph on when to use which.
- `tutorials/exam-mode.md`: expand from 2 to 6 cards. New cards cover
  weighted ratio metrics, governance release decisions, BigQuery cost
  triage, and DORA operations evidence. Add the missing interactive
  exam-surface link.

### Phase 11.6 - Learner-task and recipe polish

- LT-BI-001: expected row-grain inventory per table.
- LT-SQL-003: Dataset Orientation section plus an Expected Serving
  Result table.
- LT-LOOKER-004: drop "format-verified local evidence pattern" jargon.
- LT-LOOKER-007: explain the BigQuery UI Query parameters dialog.
- R-LOOKER-001: Account Requirement banner plus a Describe Without An
  Account fallback path.

## Verification

- `bun run validate:terminology` (passes: 8 files, 158 headings, 300
  termRef references, 75 sourced entries, 30 FACT-\* links, 27 inline
  curriculum termRefs).
- `bun run content:generate`, `bun run content:check`, `bun run typecheck`,
  `bun run lint`, `bun run test:content-qa`, `bun run format:check` all
  pass.
- `bun run test:e2e`: 102 / 102 Playwright tests pass.

## Out Of Scope For This PR

- Renderer changes that would let quiz prompts, flashcard front/back,
  exam card statements, fact statements, and challenge manifests render
  inline HTML termRef markers (tracked separately as Phase 10.4
  follow-on).
- Backfilling the remaining ~120 tutorials' inline termRef markers from
  prose, beyond the representative slice that Phase 10.4 already added.
- Replacing landing-page citations with deep-link citations on every
  vendor / regulatory term (Phase 10.2 follow-on).
