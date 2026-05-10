# 040 - Learning Surface Verification

Status: implemented first pass locally on branch
`phase-7-learning-surface-verification`; PR not opened yet. Deployed Pages
verification must be rerun after merge because the live site still serves the
previous build.

## Goal

Begin Phase 7 by verifying that the deployed GitHub Pages learning surface lets
a learner navigate and use tutorials, flashcards, quizzes, exams, facts,
datasets/workbench, and challenges without opening repository files.

## Scope

- Verify the deployed GitHub Pages UI after the Phase 6 tutorial batch.
- Cover desktop and mobile layouts.
- Cover representative navigation across tutorials, learner tasks, flashcards,
  quizzes, exams, facts, workbench, and challenges.
- Record any missing learner path, broken route, confusing handoff, or content
  surface gap.
- Do not claim complete, comprehensive, or externally verified curriculum
  coverage until Phase 9 gates pass.

## Deliverables

- Browser walkthrough notes for the deployed app.
- Any focused fixes needed for learner navigation or surface visibility.
- Updated continuity docs with pass/fail results and unresolved gaps.

## Verification

- `bun run check`
- deployed GitHub Pages walkthrough
- desktop and mobile route checks
- stale scan for unsupported completeness claims

## Notes

- Safari second-browser verification remains blocked until Safari remote
  automation is enabled or a manual Safari pass is performed.

## Implementation Notes

- Added `bun run verify:deployed-surface` for Playwright-based learning-surface
  verification across mobile and desktop routes plus representative workbench,
  flashcard, quiz, and exam flows.
- Added Markdown CSS containment for wide code and table content so mobile
  tutorial pages do not create horizontal overflow.
- Added content QA that blocks raw source fact IDs, raw learner-task IDs,
  repository references, app internals, and learner-meta phrasing in visible
  challenge questions, quiz questions, exam cards, and flashcards.
- Cleaned existing visible assessment text to ask about BI, BigQuery, Looker
  Studio, data quality, and regulatory context instead of implementation
  details.
- Added `docs/16-curriculum-critical-review.md` and Task 041 to make the
  remaining curriculum-completeness audit explicit.

## Verification Notes

- `bun run content:check` passed.
- `bun run test:content-qa` passed with the stricter visible-text boundary.
- `bun run test:quiz-facts-db` passed after moving fact grounding to metadata
  and fact graph checks instead of visible explanation IDs.
- `bun run test:flashcards` passed.
- `bun run test:e2e` passed after approved local Vite preview binding.
- `bun run check` passed after approved local Vite preview binding.
- `DEPLOYED_BASE_URL=http://127.0.0.1:4174/ bun run verify:deployed-surface`
  passed against a patched local preview.
- Initial live deployed run failed on the previous build because the
  `LT-DQ-006` mobile route had horizontal overflow. Rerun the deployed command
  after this branch is merged and Pages redeploys.
- Claude CLI formal review was attempted with
  `claude --print --permission-mode plan --output-format text ...`; it produced
  no output for about one minute and was killed. Treat Task 040 as not
  Claude-reviewed.
- Codex CLI non-TUI mode works: `codex exec --json ...` returned
  `codex-cli-ok`.
