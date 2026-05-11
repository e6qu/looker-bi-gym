# 055 - Looker And BigQuery Corpus Expansion

Status: locally verified on branch `looker-bigquery-corpus-expansion`.

## Goal

Expand the learner corpus with externally verified Looker Studio and BigQuery
material while preserving the self-contained tutorial and assessment
independence boundaries.

## Scope

- Record PR #39 post-merge verification before starting new content work.
- Add official source cards and facts for BigQuery parameters, BigQuery
  dry-run/cost estimates, and Looker Studio controls.
- Add one browser-first practice lab that connects governed report controls to
  a report-ready serving query.
- Add flashcards, quiz questions, and an exam card grounded in the new facts.
- Update route and deployed-surface verification for the expanded learning
  surface and for hidden source/task metadata on quiz and exam prompts.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `bun run test:facts-db`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run test:platform-boundary`
- `bun run test:e2e`
- `bun run check`
- `bun run verify:deployed-surface`
- stale scans for learner-facing implementation wording and raw quiz/exam
  source IDs

## Progress Notes

- PR #39 was confirmed merged before this branch started.
- Main CI, Pages deployment, live HTTP 200, and no-open-PR state were checked
  before creating `looker-bigquery-corpus-expansion`.
- The deployed-surface verifier failed after PR #39 because it still expected a
  raw source fact ID to render on the quiz page. That verifier is stale and must
  check that quiz/exam metadata stays hidden instead.
- Added official source-backed facts for BigQuery parameterized queries,
  BigQuery pre-run byte estimates, and Looker Studio controls.
- Added `LT-LOOKER-007 - Design A Control Parameter Handoff`.
- Added five flashcards, three quiz questions, and one exam card for control,
  parameter, and cost-review coverage.
- Removed older learner-facing `CTF` wording from practice labs.
- Updated deployed-surface verification to check hidden assessment metadata.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:platform-boundary`;
  - stale scans for learner-facing implementation wording, raw metadata
    headings, challenge-route dependencies in learner tasks, and `CTF` wording;
  - `git diff --check`;
  - `bun run verify:deployed-surface`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 93
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
