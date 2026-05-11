# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `tutorial-verification-separation-sweep`, based on verified
  `main` at `ff283d7`.
- Current PR: none. The user asked not to open a new PR.
- No open PRs were present when Task 053 started.
- PR #38, `https://github.com/e6qu/looker-bi-gym/pull/38`, is squash-merged at
  `ff283d7`.
- Main CI for `ff283d7` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25658994647`.
- GitHub Pages workflow for `ff283d7` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25658994653`.
- Live Pages URL verified HTTP 200 on 2026-05-11:
  `https://e6qu.github.io/looker-bi-gym/`, with
  `last-modified: Mon, 11 May 2026 08:29:59 GMT`.
- Deployed learning-surface verifier passed on 2026-05-11:
  `bun run verify:deployed-surface`.
- Targeted live check for tutorial 00 passed: the separate orientation quiz link
  is clickable, not rendered in `code`, and the old open-route step is absent.

## Active Task

Task 053 - Tutorial Verification Separation Sweep.

Current state:

- Added `_development/tasks/053-tutorial-verification-separation-sweep.md` and
  updated the task index.
- Converted tutorial workbench hash routes from inline code into clickable
  links.
- Removed learner-facing references to challenge manifests, solution fixtures,
  repository paths, and challenge internals from learner-task pages.
- Removed meta wording such as "no separate quiz" and "hidden reference file."
- Added rendered UI coverage across tutorial routes to catch inline hash-route
  code and learner-facing implementation wording.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for inline hash-route code and learner-facing challenge/fixture
    implementation wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 89
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 89
    Playwright tests passing.

## Blockers And Gaps

- Task 053 is locally verified and local by user request; no PR should be
  opened unless explicitly directed.
- Claude CLI formal review remains blocked from prior attempts that either hung
  with no output or could not authenticate. Task 053 does not mark any phase
  complete.
- Curriculum completeness, external verification, and full assessment coverage
  remain Phase 9 gaps.
