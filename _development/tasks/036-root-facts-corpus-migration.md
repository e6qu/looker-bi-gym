# 036 - Root Facts Corpus Migration

Status: implemented locally on branch `phase-4-root-facts-corpus`; PR #22
opened; formal Claude review blocked by CLI hang.

## Goal

Start Phase 4 by moving the committed fact corpus from the old nested docs path
to root `facts/`, then update app routes, loaders, tests, docs, and local
tooling so root `facts/` is the canonical authored fact source.

## Scope

- Move fact Markdown from `docs/facts/` to `facts/`.
- Keep fact Markdown as the authored source of truth.
- Keep generated catalogs and generated SQLite outputs ignored and rebuildable.
- Update catalog generation, content QA, flashcard checks, fact database tests,
  app fallbacks, and documentation for the root path.
- Do not expand the fact count in this migration PR; scale the corpus only
  after the root path is stable.

## Deliverables

- Root `facts/` corpus with existing fact files.
- Updated relative source links inside fact Markdown.
- Updated app and script path assumptions.
- Updated documentation and continuity files.
- Stale-path scans for current docs/app/source references.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:content-qa`
- `bun run test:flashcards`
- `bun run test:quiz-facts-db`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run check`
- stale scan for `docs/facts` and future-canonical wording in current docs,
  app, source, and content paths

Passed locally on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:content-qa`
- `bun run test:flashcards`
- `bun run test:quiz-facts-db`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for old fact path/future-canonical wording in current docs, app,
  source, and content paths
- `git diff --check`

Blocked review:

- `claude --print --permission-mode plan --output-format text ...` was run in
  non-TUI mode for the Phase 4 formal review, produced no output for over 40
  seconds, and was terminated.

## Notes

- Fact corpus expansion toward the Phase 4 count target remains a follow-up
  after this migration is merged and verified on main.
