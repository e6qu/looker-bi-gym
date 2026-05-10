# What We Did

## 2026-05-10 - Realignment Decision And Continuity Reset

- Fetched `origin/main`; it had advanced to
  `bd27014 Improve flashcard study workflow (#18)`.
- Created branch `realignment-continuity-layout` from updated `origin/main`.
- Started the realignment continuity and layout PR as an implementation PR, not
  a docs-only PR.
- Moved repository implementation task docs into `_development/tasks/`.
- Rewrote `PLAN.md` as the staged realignment plan:
  - Phase 0 - Truth And Continuity Reset.
  - Phase 1 - Repository Layout Realignment.
  - Phase 2 - Content Schema And Generated Catalogs.
  - Phase 3 - `facts-db-app`.
  - Phase 4 - Fact Corpus Expansion.
  - Phase 5 - Flashcards, Quizzes, Exams.
  - Phase 6 - Real Tutorials And Challenges.
  - Phase 7 - App Learning Surface Verification.
  - Phase 8 - Release Readiness.
- Streamlined `STATUS.md`, `DO_NEXT.md`, and `BUGS.md` so they no longer treat
  PR #18 as active.
- Recorded that prior broad curriculum-quality claims are not trusted without
  deeper review gates.
- Updated task-path references to `_development/tasks/`.
- Updated content QA so repository Markdown validation walks `_development/`
  instead of the removed top-level implementation task directory.
- Fixed relative links inside moved implementation task docs.
- Checked for existing open PRs with `gh pr list --state open --limit 10`; no
  open PRs were returned.
- Verification passed:
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:content-qa`;
  - `bun run test:facts-db`;
  - `bun run test:llm-workbench`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - stale implementation-task path scan;
  - fact-canonical wording scan;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed attempt recorded: the first sandboxed `bun run check` reached
  Playwright but Vite preview could not bind `127.0.0.1:4173`; the approved
  rerun passed.
- Committed `7958f52 Realign continuity and task layout`.
- Pushed branch `realignment-continuity-layout` and opened PR #19:
  `https://github.com/e6qu/looker-bi-gym/pull/19`.

## Recent Prior Work Kept For Context

- PR #18 improved flashcard study usability on branch `agent-pr-discipline` and
  was observed merged on `origin/main` at `bd27014`.
- PR #17 previously merged at
  `d7ace564745b9f160679d5c8a3583ff4fd43cc34`; main CI and Pages were verified
  at that time.
- The user required stricter PR discipline: one working PR at a time, no direct
  pushes to `main`, rebase on `origin/main` before merge, merge only after CI
  passes, then verify main CI, Pages deployment, and the live URL.

## Review Findings To Preserve

- Local/subagent judge review found the prior continuity docs overstated
  curriculum quality and completion. Existing content may be useful first-pass
  material, but it must not be called complete or comprehensive without named
  review gates.
- Claude CLI review is required for each phase before marking it complete.
  Previous Claude CLI setup was installed and the user approved an external
  review, but the elevated run hung and was stopped. Retry only with explicit
  approval and a ready session.

## Archived History

Older PR and task chronology was intentionally compressed. Use git history,
merged PRs, and `_development/tasks/*.md` for detailed implementation history.
