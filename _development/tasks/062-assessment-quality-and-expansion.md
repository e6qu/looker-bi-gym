# 062 - Assessment Quality And Expansion

Status: in progress on branch `assessment-quality-and-expansion`,
including all Codex CLI second-opinion remediation
(`CODEX-REVIEW-FINDINGS-2026-05-17` in `BUGS.md`).

## Goal

Address the assessment defects recorded in
[\_development/assessment-audit.md](../assessment-audit.md) and begin
expansion toward the Phase 9 minima (500 flashcards / 200 quiz questions /
30 exam cards). Quality leads count; honest expansion only.

## Scope

### Quality fixes

- Quiz distractor sharpening: replace ~20 weak distractors (Q-1) with
  plausible-but-wrong options that test real cert-track misconceptions.
- Reconcile divergent exam surfaces (E-1): move the 4 cards that lived
  only in `tutorials/exam-mode.md` into the canonical
  `exams/bi-foundations/bi-foundations-exam.md`. The Markdown doc was
  later rewritten as a generic banking BI practical review lens (no
  enumeration of specific exam cards) after Codex review.
- Codex CLI second-opinion review remediation
  (`BUGS.md` :: `CODEX-REVIEW-FINDINGS-2026-05-17`):
  - Extended `validate:compartmentalization` to scan tutorials/ and
    learner-tasks/.
  - Rewrote LS freshness wording as cache-staleness threshold.
  - Softened MV refresh wording to best-effort target.
  - Replaced invented `SESSION_USER_BRANCH(...)` with real BigQuery
    RLS shape.
  - Tightened AML / KYC privacy wording to reserve GDPR Article 9 for
    actual special-category reveals.
  - Expanded PSD2 / CRR / IFRS 9 / BCBS 239 source cards with
    article / section quotes.
  - Refit `coverage:cert-track` to count unique authored items.
  - Extended `validate:quiz-distractors` with invented-SQL and
    semantic-anti-pattern rules.
  - Fixture-backed both design-exercise exam cards (IFRS 9 stage
    transition uses the existing lending dataset with L2002 stage
    flipped to create a real 1->2 transition; AML alert governance
    uses an inline synthetic alert table in the card body).
  - Rewrote `tutorials/quiz-bank.md` and `tutorials/exam-mode.md` as
    generic banking BI study lenses.
  - Updated stale tallies in `STATUS.md`,
    `_development/assessment-audit.md`, and this task file.

### Expansion: facts and sources

- Add 14 new `FACT-*` corpus entries backing the cert-track gaps the
  quiz needed to test: BigQuery clustering, results cache, count-star vs
  count-column, row access policy, column policy tag, materialized view
  refresh; Looker Studio blend join types and freshness intervals; BI
  SCD types, conformed dimension, surrogate key; banking CRR CET1
  ratio, IFRS 9 stages, BCBS 239 RDARR principles.
- Add the matching `SRC-*` source cards in
  `sources/literature/kimball-dimensional-modeling.md`,
  `sources/platforms/bigquery.md`, `sources/platforms/looker-studio.md`,
  `sources/law/eu-crr.md`, `sources/law/ifrs9.md`, and
  `sources/regulators/bcbs-239.md` so facts-db link validation passes.

### Expansion: quiz, flashcards, exam

- 18 new hard quiz questions on the cert-track gap topics above; quiz
  bank final state is **78 questions** (was 60).
- New flashcards across the formerly under-served decks; final state
  is **105 cards** across 10 decks (was 64). All decks except
  real-estate-collateral are at >= 6 cards; the under-served four
  (banking-context, bi-fundamentals, privacy-security,
  controls-governance) are each >= 10.
- Unified exam pack final state is **16 fixture-backed cards** (was
  5 in YAML, 6 in MD, with only 2 overlapping). Every card now
  produces deterministic numeric, schema, or field-list expected
  outputs.
- Facts final state: **133 `FACT-*` entries** (was 117).
- Terminology final state: **150 entries** (was 148).

## Verification

- `bun run validate:terminology` passes.
- `bun run content:generate`, `content:check`, `test:content-qa`,
  `test:flashcards`, `test:quiz`, `test:quiz-facts-db`, `test:facts-db`
  all pass.
- `bun run format:check`, `typecheck`, `lint` pass.
- `bun run test:e2e` to run in the final verification step.

## Out Of Scope For This PR

- Full expansion toward Phase 9 minima (500 / 200 / 30). Phase 12 of
  `PLAN.md` stages the remainder.
- Phase 10.4 follow-on inline grounding for quizzes / flashcards / exams
  (the YAML-bound surfaces; needs a renderer change first).
- T-1 / T-2 terminology deep-link replacement for every Looker Studio /
  DuckDB / regulator landing page (kept as Phase 12.4).
- New PSD2 / AML / KYC / COREP / FINREP quiz coverage (Phase 12.1).
