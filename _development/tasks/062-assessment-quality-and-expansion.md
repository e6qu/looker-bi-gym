# 062 - Assessment Quality And Expansion

Status: in progress on branch `assessment-quality-and-expansion`.

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
  `exams/bi-foundations/bi-foundations-exam.md`; trim the Markdown doc to
  a study guide that points at the interactive surface.

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

- 14 new hard quiz questions on the cert-track gap topics above; quiz
  bank moves from 60 to 74 questions.
- 18 new flashcards across four under-served decks (privacy-security,
  banking-context, bi-fundamentals, controls-governance), each going
  from 4 to 10 cards. Total flashcards: 64 to 82.
- 4 new exam cards (Weighted Ratio Metric Contract, Governance Release
  Decision, BigQuery Cost Triage, DORA Operations Evidence) folded into
  the canonical YAML pack so exam count is 9 (was 5 in YAML, 6 in MD,
  with only 2 overlapping).

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
