# 058 - Quiz Standalone Question Polish

Status: locally verified on branch `quiz-standalone-question-polish`; PR not
opened yet.

## Goal

Fix remaining quiz prompts that read like worksheet scaffolding instead of
standalone BI assessment questions.

## Scope

- Rewrite weak learner-facing quiz wording, starting with the balance-grain
  question that referenced building a scorecard and writing `SUM(...)`.
- Keep question metadata factual and hidden from learners.
- Add content QA guardrails against course-scaffolded assessment wording such as
  "you are asked to" and "before writing".
- Update rendered and deployed-surface expectations for the rewritten prompt.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `bun run test:e2e`
- `bun run check`
- stale scans for course-scaffolded quiz wording

## Progress Notes

- Confirmed PR #42 was merged and post-merge main CI, Pages deployment, live
  HTTP 200, and deployed learning-surface verification passed before starting.
- Confirmed no open PRs before creating the follow-up branch.
- Rewrote the first quiz prompt into a concrete branch-dashboard balance-grain
  scenario.
- Added a content QA guardrail for course-scaffolded assessment wording.
- Updated rendered and deployed-surface checks for the new standalone prompt.

## Verification Notes

- Passed `bun run content:generate`.
- Passed `bun run content:check`.
- Passed `bun run format:check`.
- Passed `bun run test:content-qa`.
- Passed `bun run test:quiz-facts-db`.
- Passed `bun run validate:static-links`.
- Passed `bun run typecheck`.
- Passed `bun run lint`.
- Passed stale scan for course-scaffolded quiz wording in quiz-facing surfaces.
- Passed `bun run test:e2e` after approved local Vite preview binding, with all
  93 Playwright tests passing.
- Passed `bun run check` after approved local Vite preview binding, with all 93
  Playwright tests passing.

Blocked review:

- Claude CLI formal review is still not complete; prior non-TUI attempts either
  required login or hung. This task does not mark a phase complete.
