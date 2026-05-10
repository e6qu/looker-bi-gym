# Test Pyramid

The release gate uses a browser-first test pyramid for a static frontend app.

## Static Architecture Boundary

`bun run test:platform-boundary` scans app source for backend-style browser APIs and fails if the app introduces network/session surfaces such as `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, service workers, `sessionStorage`, or IndexedDB.

The allowed state surfaces are browser-local only:

- `localStorage` for challenge progress.
- A same-site progress cookie that mirrors the same completion state.
- User-triggered JSON export/import from Settings.

The app has no backend account system, server session, API database, server-side grading, analytics beacon, or learner-data upload.

## Domain And Contract Tests

The lower and middle layers run deterministic checks without a browser:

- `bun run test:quiz` covers quiz answer evaluation.
- `bun run test:sql` covers DuckDB-WASM SQL loading and query behavior.
- `bun run test:validators` covers browser challenge validators.
- `bun run test:cloud-evidence` covers local evidence parsing and validation.
- `bun run test:browser-config` covers local JSON config parsing and validation.
- `bun run test:progress-export` covers browser-local progress, cookie fallback,
  reset, export, import validation, and privacy boundaries.
- `bun run test:quiz-facts-db` builds the SQLite facts database, loads quiz YAML
  into temporary quiz tables, and verifies that quiz source facts resolve to
  sourced fact graph nodes. Numeric quiz answers must be backed by cited fact
  text.
- `bun run test:fixtures` covers known-good and known-bad challenge solution fixtures.
- `bun run test:derived-expectations` executes known-good browser-SQL fixtures
  against their pinned datasets and verifies manifest row-count and aggregate
  expectations match the dataset-derived values.
- `bun run test:content-qa` covers required-tool declarations, synthetic-data boundaries, regulatory links, disclaimers, and Markdown links.
- `bun run test:facts-db` verifies source snapshots, fact IDs, fact/source
  links, and triple-like fact/source/related-fact graph edges through the local
  SQLite facts database.
- `bun run test:llm-workbench` verifies that manual LLM question and dreaming
  prompts are assembled from local, source-backed context.
- `bun run test:platform-boundary` keeps the frontend-only no-backend boundary
  enforced in source and documentation.

## Rendered User Flows

`bun run test:e2e` uses Playwright against the built static app. These tests follow learner workflows through the UI:

- Start from the home page, navigate to Challenges, complete the orientation quiz, and verify browser-local progress is stored in `localStorage` and the same-site cookie.
- Clear `localStorage`, reload from the cookie mirror, and verify Settings still shows completion evidence.
- Run the browser SQL challenge, answer its grain question, and verify a local flag is produced.
- Fill cloud-evidence fields, answer the credential boundary question, and verify local completion without backend calls.
- Validate and apply a pasted progress JSON import in Settings, then verify it
  writes browser-local state.
- Fill browser-config metric contract JSON, answer contract questions, and
  verify local completion without backend calls.
- Render quiz-bank YAML, exam-card YAML, and the in-app fact graph as real
  learner surfaces rather than Markdown-only summaries.
- Run a self-contained tutorial query through the neutral browser SQL workbench
  and verify committed synthetic dataset values.
- Check responsive routes, rendered UI structure, nonblank screenshots, no horizontal overflow, and control text fit.
- Fail on browser console warnings, browser console errors, page errors, or
  failed network requests during rendered UI flows.

## Full Gate

`bun run check` is the merge gate. It runs formatting checks, validation, strict lint, TypeScript checks, domain tests, contract tests, architecture-boundary tests, rendered user-flow tests, production build, and static-link validation.

GitHub Actions CI mirrors this gate with explicit steps for format, manifest and
dataset validation, lint, typecheck, domain/runtime tests, fixture and derived
expectation tests, quiz fact grounding, content/fact/workbench/platform tests,
rendered UI tests, production build, and static-link validation.
