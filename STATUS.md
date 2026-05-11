# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `looker-bigquery-corpus-expansion`, based on verified `main`
  at `241e449`.
- Current PR: #40,
  `https://github.com/e6qu/looker-bi-gym/pull/40`.
- PR #39, `https://github.com/e6qu/looker-bi-gym/pull/39`, is squash-merged
  at `241e4499dbe1aed43d30d4ec81fc65d7940a894e`.
- Main CI for `241e449` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25661265061`.
- GitHub Pages workflow for `241e449` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25661265090`.
- Live Pages URL verified HTTP 200 on 2026-05-11:
  `https://e6qu.github.io/looker-bi-gym/`, with
  `last-modified: Mon, 11 May 2026 09:17:22 GMT`.
- Deployed learning-surface verifier passed on 2026-05-11 after updating the
  local verifier to assert hidden quiz/exam metadata:
  `bun run verify:deployed-surface`.
- No open PRs were present when Task 055 started.

## Active Task

Task 055 - Looker And BigQuery Corpus Expansion.

Current state:

- Added `_development/tasks/055-looker-bigquery-corpus-expansion.md` and
  updated the task index.
- Added official source cards and source-backed facts for:
  - BigQuery parameterized queries;
  - BigQuery query validator and dry-run byte estimates;
  - Looker Studio controls, field IDs, and parameter input.
- Added `LT-LOOKER-007 - Design A Control Parameter Handoff`, a
  browser-first, self-contained lab that validates a RON currency control result
  and documents the applied BigQuery parameter pattern.
- Added five flashcards, three quiz questions, and one exam card covering
  controls, parameters, and pre-run cost review.
- Removed stale `CTF` wording from existing learner-task end summaries.
- Updated rendered UI coverage for the new lab route.
- Updated deployed-surface verification so quiz and exam surfaces prove source
  and task metadata stays hidden while visible prompts remain independent.
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

## Blockers And Gaps

- Task 055 is locally verified and open in PR #40. CI is pending unless checked
  later.
- Claude CLI formal review remains blocked by authentication or prior hangs;
  Task 055 does not mark any phase complete.
- Curriculum completeness, external verification, and full assessment coverage
  remain Phase 9 gaps.
