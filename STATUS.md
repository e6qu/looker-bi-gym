# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `tutorial-verification-separation-sweep`, based on verified
  `main` at `ff283d7`.
- Current PR: #39,
  `https://github.com/e6qu/looker-bi-gym/pull/39`.
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

Task 054 - Curriculum Self-Reference Remediation.

Current state:

- Added `_development/tasks/054-curriculum-self-reference-remediation.md` and
  updated the task index.
- Claude second-opinion attempt:
  - `claude -s --print --permission-mode plan --output-format text ...`
    failed because this Claude CLI does not support `-s`;
  - `claude --print --permission-mode plan --output-format text ...` ran in
    non-TUI mode but returned `Not logged in · Please run /login`.
- Reworked the tutorial and practice-lab indexes into one browser-first path,
  including the ratio-null lab.
- Replaced visible `Source Facts` tutorial sections with `Evidence Basis`,
  removed `this website/page/task page` and `CTF-style` wording, and kept raw
  IDs in metadata rather than learner-facing prose.
- Reworked quiz-bank prose so it is a scenario self-check with answers hidden
  in expandable sections instead of inline recommended-task references.
- Reworked exam-mode prose to remove recommended-task references and include
  card-specific inputs.
- Stopped rendering recommended learner-task links and source-fact plumbing on
  quiz and exam prompts while keeping metadata for validation.
- Reworded the remaining flashcard challenge phrasing and source-review note.
- Updated content QA and rendered UI tests to enforce the assessment
  independence boundary.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:flashcards`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - stale scan for self-referential learner-facing wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 89
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 89
    Playwright tests passing.

## Blockers And Gaps

- Task 054 is locally verified and open in PR #39. CI is pending unless checked
  later.
- Claude CLI second-opinion/formal review remains blocked by authentication.
  Task 054 does not mark any phase complete.
- Curriculum completeness, external verification, and full assessment coverage
  remain Phase 9 gaps.
