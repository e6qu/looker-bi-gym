# Status

Last updated: 2026-05-10

## Current Branch And PR

- Current branch: `realignment-continuity-layout`, based on `origin/main`.
- Current PR: not opened yet in this session.
- Last merged PR observed on `origin/main`: PR #18,
  `bd27014 Improve flashcard study workflow (#18)`.
- Main-branch CI, Pages deployment, and live URL for `bd27014` have not been
  verified in this session.

## Active Task

Realignment continuity and repository layout PR:

- Rewrite `PLAN.md` into the staged truth-and-continuity realignment plan.
- Streamline `STATUS.md`, `DO_NEXT.md`, `BUGS.md`, and `WHAT_WE_DID.md`.
- Move implementation task docs into `_development/tasks/`.
- Update affected docs, scripts, and references.
- Do not implement the full content migration in this PR.

## Open Blockers

- Claude CLI formal review is required before any phase can be marked complete.
  A previous Claude run was approved but hung and was stopped.
- Safari second-browser verification remains open until Safari remote
  automation is explicitly enabled or a manual Safari pass is performed.

## Known Gaps

- Prior curriculum depth claims are not trusted without deeper review gates.
- Route/path risk exists because implementation tasks moved and future fact
  content is planned to move from `docs/facts/` to root `facts/`.
- Phase 0 and Phase 1 are being implemented first pass in this PR; they are not
  Claude-reviewed yet.

## Verification

Local verification passed on 2026-05-10:

- `bun run format:check`
- `bun run typecheck`
- `bun run lint`
- `bun run test:content-qa`
- `bun run test:facts-db`
- `bun run test:llm-workbench`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run check` after approved local Vite preview binding for Playwright
- stale implementation-task path scan
- fact-canonical wording scan
- `git diff --check`

The first sandboxed `bun run check` failed only when Vite preview could not
bind `127.0.0.1:4173`; the approved rerun passed with all 12 Playwright tests.

## Confidence

Medium-high for the local implementation and path migration. Keep Phase 0 and
Phase 1 at `implemented first pass`/`verified locally` until CI and Claude CLI
review are done.
