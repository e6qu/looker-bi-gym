# 059 - Terminology Grounding Glossary

Status: merged. PR #44 squash-merged to `main` as `d88acc7` on 2026-05-12.
The task scope shipped only the rendered terminology pages and their app
route; the inline grounding, build-time integrity, sourcing, fact linkage,
deeper search, and reverse coverage gaps are tracked under Phase 10 in
`PLAN.md` and start with [task 060](060-terminology-integrity-checks.md).

## Goal

Add a rendered terminology area that can ground learner-facing vocabulary
without requiring questions to refer directly to implementation metadata.

## Scope

- Add `terminology/` Markdown pages grouped by BI, SQL, BigQuery, Looker
  Studio, banking, regulations, and DuckDB/browser runtime.
- Render terminology pages as first-class static app content.
- Add searchable content navigation so terminology pages can be searched in the
  browser.
- Add a reusable inline term-link convention with short superscript domain
  hints such as `BI`, `SQL`, `BQ`, `LS`, `BNK`, `REG`, and `DB`.
- Keep terminology domain/platform focused: no schema-only glossary, no
  app-specific training table or column entries, and no self-referential course
  terminology.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- rendered UI test for terminology route, search, and inline term markers

## Progress Notes

- Added `terminology/README.md` plus grouped terminology pages.
- Expanded term entries with examples and related cross-links where suitable.
- Removed schema-only terminology and app-specific training dataset entries.
- Added `terminology` as a generated content section and app route.
- Added content sidebar search across titles, filenames, and Markdown body.
- Added `.termRef` styling for clickable terminology anchors with superscript
  domain hints.
- Added Markdown heading IDs so links like `#/terminology/bi.md#grain` target
  stable anchors.
- Added rendered UI and deployed-surface coverage for the terminology route.

## Verification Notes

- Passed `bun run content:generate`.
- Passed `bun run content:check`.
- Passed `bun run format:check`.
- Passed `bun run test:content-qa`.
- Passed `bun run validate:static-links`.
- Passed `bun run typecheck`.
- Passed `bun run lint`.
- Passed stale scan for schema-only, self-referential, and app-specific
  terminology wording.
- Passed `bun run test:e2e` after approved local Vite preview binding, with all
  100 Playwright tests passing.
- Passed `bun run check` after approved local Vite preview binding, with all 100
  Playwright tests passing.

Blocked review:

- Claude CLI formal review is still not complete; prior non-TUI attempts either
  required login or hung. This task does not mark a phase complete.
