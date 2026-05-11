# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `orientation-tutorial-self-contained-fix`, based on verified
  `main` at `cf6d2bc`.
- Current PR: not opened yet.
- No open PRs were present when Task 052 started.
- PR #37, `https://github.com/e6qu/looker-bi-gym/pull/37`, is squash-merged
  at `cf6d2bc`.
- Main CI for `cf6d2bc` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25648126551`.
- GitHub Pages workflow for `cf6d2bc` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25648126549`.
- Live Pages URL verified HTTP 200 on 2026-05-11:
  `https://e6qu.github.io/looker-bi-gym/`, with
  `last-modified: Mon, 11 May 2026 03:08:05 GMT`.
- Deployed learning-surface verifier passed on 2026-05-11:
  `bun run verify:deployed-surface`.

## Active Task

Task 052 - Orientation Tutorial Self-Contained Fix.

Current state:

- Added `_development/tasks/052-orientation-tutorial-self-contained-fix.md` and
  updated the task index.
- Rewrote `tutorials/00-orientation-and-stack.md` so the required tutorial
  produces an orientation decision log instead of requiring the orientation quiz.
- Moved the orientation quiz into a separate verification section with a
  clickable Markdown link to `#/challenges/orientation-quiz`.
- Rewrote the orientation quiz prompts as scenario-verification questions so
  they do not duplicate the tutorial worksheet.
- Added rendered regression coverage proving the orientation quiz route is a
  link, not inline code, and that quiz completion is not the tutorial
  deliverable.
- Updated `PLAN.md` and `AGENTS.md` to record that tutorials and verification
  surfaces must remain separate.
- Updated `docs/17-curriculum-completeness-matrix.md` to record the first
  tutorial fix.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run validate:manifests`;
  - `bun run test:quiz`;
  - `bun run test:fixtures`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scans for raw route code, quiz-as-step wording, old direct quiz
    prompts, and visible raw source IDs in tutorial 00;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 66
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 66
    Playwright tests passing.

## Blockers And Gaps

- No blocker for opening the Task 052 PR.
- Claude CLI formal review remains blocked from prior attempts that either hung
  with no output or could not authenticate. Task 052 did not mark any phase
  complete.
- Curriculum completeness, external verification, and full assessment coverage
  remain Phase 9 gaps.
