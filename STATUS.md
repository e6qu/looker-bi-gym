# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `remove-tutorial-evidence-basis`, based on verified `main` at
  `0aec1f9`.
- Current PR: #41,
  `https://github.com/e6qu/looker-bi-gym/pull/41`.
- PR #40, `https://github.com/e6qu/looker-bi-gym/pull/40`, is squash-merged at
  `0aec1f970d20a3bb2bf29c9985679c71709fe60b`.
- Main CI for `0aec1f9` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25663392366`.
- GitHub Pages workflow for `0aec1f9` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25663392391`.
- Live Pages URL verified HTTP 200 on 2026-05-11:
  `https://e6qu.github.io/looker-bi-gym/`, with
  `last-modified: Mon, 11 May 2026 10:02:43 GMT`.
- Deployed learning-surface verifier passed on 2026-05-11:
  `bun run verify:deployed-surface`.
- No open PRs were present when Task 056 started.

## Active Task

Task 056 - Remove Tutorial Evidence Basis Headings.

Current state:

- Added `_development/tasks/056-remove-tutorial-evidence-basis.md` and updated
  the task index.
- Removed visible `## Evidence Basis` sections from released tutorials,
  practice labs, and the Looker Studio recipe.
- Updated content QA so tutorials no longer require the visible heading.
- Kept `source_facts` metadata requirements and fact-ID validation intact.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for `Evidence Basis` in tutorials and content QA;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.

## Blockers And Gaps

- Task 056 is locally verified and open in PR #41. CI is pending unless checked
  later.
- Claude CLI formal review remains blocked by authentication or prior hangs;
  Task 056 does not mark any phase complete.
- Curriculum completeness, external verification, and full assessment coverage
  remain Phase 9 gaps.
