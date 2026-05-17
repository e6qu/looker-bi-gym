# Status

Last updated: 2026-05-17

## Current Branch And PR

- Current branch: `assessment-quality-and-expansion`, based on verified
  `main` at `4e26667`.
- Current PR: #46,
  `https://github.com/e6qu/looker-bi-gym/pull/46`.

## Active Task

Task 062 - Assessment Quality And Expansion. Covers all of Phase 12 from
`PLAN.md`, plus the compartmentalization rule from user direction, plus
the Codex CLI second-opinion review remediation
(`CODEX-REVIEW-FINDINGS-2026-05-17` in `BUGS.md`).

Current state:

- Audit recorded in `_development/assessment-audit.md` against a
  certification-track learner lens (pre- and post-fix counts both
  recorded).
- Compartmentalization rule applied: tutorials, learner-tasks, quizzes,
  flashcards, and exams do not assume each other exist. Terminology is
  the only shared spine. The platform itself is not a topic. The
  validator now scans tutorials/ and learner-tasks/ as well (130 files,
  0 hits).
- Codex CLI second-opinion review of 2026-05-17 surfaced 10 punch-list
  items; all addressed in this PR. Key remediation:
  - Looker Studio freshness rewritten as cache-staleness threshold
    (not auto-refresh interval).
  - BigQuery materialized view refresh wording softened to best-effort
    target with `max_staleness` / `refresh_interval_minutes` naming.
  - Row-access-policy distractor replaced invented
    `SESSION_USER_BRANCH(...)` with real BigQuery
    `ROW ACCESS POLICY ... FILTER USING (branch_id = 'BNN')`.
  - AML / KYC privacy wording reserves GDPR Article 9 "special
    category" for narratives that actually reveal Article 9 data.
  - PSD2, CRR, IFRS 9, BCBS 239 source cards expanded with
    article / section quotes that support the FACT claims.
  - IFRS 9 and AML exam cards are now fixture-backed with deterministic
    expected outputs (IFRS 9 uses the existing lending dataset with one
    cell flipped to create a real stage-1-to-stage-2 transition for
    L2002; AML uses an inline synthetic alert table inside the card).
  - `tutorials/quiz-bank.md` and `tutorials/exam-mode.md` rewritten as
    generic study-lens pages that do not enumerate or mirror any
    specific quiz question or exam card.
- Authoring scripts in place:
  - `bun run validate:quiz-distractors` flags weak distractor patterns
    plus invented BigQuery identifiers and known semantic
    anti-patterns (LS freshness as auto-refresh, MV refresh as hard
    SLA).
  - `bun run validate:compartmentalization` flags cross-surface
    references and platform-meta in quiz, flashcard, exam, AND
    tutorial / learner-task visible bodies (130 files scanned, 0 hits).
  - `bun run coverage:cert-track` parses frontmatter and counts
    unique authored items per topic (questions, flashcards, exam
    cards, terminology entries) into
    `_development/cert-track-coverage.md`.
- Surface tallies after this PR (final post-fix counts):
  - Quiz bank: **78** scenario-driven questions (was 60).
  - Flashcards: **105** cards across the 10 decks (was 64). All
    formerly under-served decks (banking-context, bi-fundamentals,
    privacy-security, controls-governance, performance-operations,
    metric-contracts) brought up; only real-estate-collateral remains
    at 4 cards.
  - Exam: **16** unified cards in
    `exams/bi-foundations/bi-foundations-exam.md` (was 5 YAML + 6 MD
    duplicated, only 2 overlapping). All cards now fixture-backed
    with deterministic expected outputs.
  - Facts: **133** `FACT-*` entries (was 117).
  - Terminology: **150** entries (was 148).
  - Sources: 40+ `SRC-*` cards, including new BigQuery
    (clustering, results cache, count semantics, RLS, CLS, MV refresh),
    Looker Studio (blend join types, freshness intervals), Kimball
    (SCD, conformed dims, surrogate keys), CRR, IFRS 9, BCBS 239, PSD2,
    AML/CFT.

## Phase 12 Follow-On

Phase 12 of `PLAN.md` is now largely landed; remaining items are
follow-on improvements:

- Continued quiz / flashcard / exam expansion toward Phase 9 minima
  (200 / 500 / 30).
- Deeper Looker Studio terminology citations (16 of 23 entries still
  cite the landing page).
- Decisions on the 53 zero-coverage terminology entries in
  `_development/terminology-coverage.md`.

## Blockers And Gaps

- Claude CLI formal review remains blocked by authentication; Task 062
  does not mark any phase complete.
- Phase 9 completeness gates remain open.
