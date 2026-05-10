# 035 - Facts DB App Workspace

Status: implemented locally on branch `phase-3-facts-db-app`; PR #21 opened;
formal Claude review blocked by CLI hang.

## Goal

Start Phase 3 by moving the source-backed fact database library and CLI into a
top-level Bun workspace package named `facts-db-app`.

## Scope

- Add `facts-db-app/` as a workspace package.
- Keep the package CLI/library only; do not add a web UI.
- Move current fact database parsing, validation, SQLite build, and tests out of
  `app/scripts/`.
- Keep generated SQLite output ignored and rebuildable.
- Keep the main learner app frontend-only; this package is local development
  tooling, not a backend.
- Update app scripts that need fact cards or source cards to import the
  workspace package.

## Deliverables

- `facts-db-app/package.json`
- `facts-db-app/tsconfig.json`
- `facts-db-app/src/fact-database.ts`
- `facts-db-app/src/cli.ts`
- `facts-db-app/tests/test-fact-database.ts`
- Root/app package scripts route `test:facts-db` and `facts:build-db` through
  `facts-db-app`.
- Documentation and continuity files reflect the Phase 3 package boundary.

## Verification

- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:quiz-facts-db`
- `bun run test:llm-workbench`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run check`

Passed locally on 2026-05-10:

- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:quiz-facts-db`
- `bun run test:llm-workbench`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run format:check`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing

Blocked review:

- `claude --print --permission-mode plan --output-format text ...` was run in
  non-TUI mode for the Phase 3 formal review, produced no output for over 40
  seconds, and was terminated.

## Notes

- The fact source Markdown remains in `docs/facts/` for this task.
- Moving facts to root `facts/` remains Phase 4.
