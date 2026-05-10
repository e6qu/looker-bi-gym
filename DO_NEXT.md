# Do Next

## Immediate Next Step

Numbered tasks 001 through 027 are implemented. PR #3, PR #4, and PR #5 were merged. Post-merge CI and GitHub Pages deployment for PR #5 passed, and the live Pages URL returned HTTP 200.

Current implementation step:

- Review and merge PR #6: `https://github.com/e6qu/looker-bi-gym/pull/6`.
- PR #6 now includes the expanded Romania lending/real-estate collateral dataset
  support, official Eurostat HPI source table, fact-backed collateral questions,
  and the manual LLM question review/dreaming workbench. Local `bun run check`
  passed on 2026-05-10 after the expansion.

Next implementation step after the Task 024 PR:

- After PR #6 merges, start [025 - Real Tutorial Instruction Packs](tasks/025-real-tutorial-instruction-packs.md), using the source-backed BigQuery/Looker/BI facts database from [027 - Source-Backed BI Fact Database](tasks/027-source-backed-bi-fact-database.md) and the new deterministic lending pack from [024 - Deterministic Local Dataset Packs](tasks/024-deterministic-local-dataset-packs.md).

Preservation and verification steps:

- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- Keep config files in `app/configs/` as TypeScript and covered by `tsconfig.node.json`.
- Keep `bun run format:check`, `bun run lint`, `bun run typecheck`, and `bun run check` clean before merging. Full `bun run check` passed locally for the Task 024 branch on 2026-05-10.
- Preserve the frontend-only boundary: no backend calls, server session, API database, analytics beacon, or learner-data upload.
- Preserve browser-local progress behavior: `localStorage` plus same-site cookie fallback, with reset clearing both.
- Preserve the test pyramid documented in `docs/12-test-pyramid.md` and enforced by `bun run test:platform-boundary`.
- Preserve the Task 015 fixture coverage rule: every released manifest needs a known-good solution fixture or a documented exception, and CTF/trap challenges need expected known-bad coverage.
- Preserve the Task 016 export boundary: progress export must stay local, user-controlled, and free of credentials, raw answers, pasted cloud evidence, sensitive synthetic field names, real banking data, storage keys, and hidden app internals.
- Preserve the Task 017 content QA boundary: `bun run test:content-qa` must keep required tools, regulatory-context links, disclaimer language, synthetic-data warnings, dataset synthetic-only notes, and internal Markdown links covered.
- Preserve the rendered UI boundary: `bun run test:e2e` must keep the real built app, responsive layout, challenge pages, DuckDB-WASM SQL execution, cloud-evidence controls, Settings export metadata, and overflow checks covered.
- Preserve the Task 018 release boundary: `CHANGELOG.md`, `VERSIONING.md`, app/content version display, challenge versions, fixture tests, content QA, rendered UI tests, and generated-artifact review must stay aligned.
- Preserve the Task 019 fact-backed instruction boundary: source facts belong in `docs/facts/README.md`, and future regulation/product/browser-storage/BI-tooling questions should cite fact IDs.
- Preserve the Task 020-022 instruction boundary: released manifests need rendered `lesson_steps`; released questions and steps need known `source_facts`; released tutorial Markdown needs Source Facts, Steps, Checkpoints, and Common Failure Modes sections.
- Preserve the Task 027 fact corpus boundary: learner facts should be banking BI, BigQuery, Looker Studio, and official regulatory/banking facts, not app implementation facts.
- Preserve downloaded Google Cloud documentation snapshots under `sources/platforms/*/full/` as sanitized article-only Markdown wrappers with attribution.
- Preserve `bun run test:facts-db` in the check pyramid so fact-source links, fact cross-links, and source snapshots stay queryable through SQLite.
- Preserve the manual-only LLM workbench boundary: `var/llm-workbench/` stays
  ignored, generated/reviewed questions are draft-only, and dreaming stays
  manual through `make dream`, `make dream-codex`, or `make dream-claude` unless
  a future task explicitly designs scheduler controls.

## Upcoming Tasks

- [024 - Deterministic Local Dataset Packs](tasks/024-deterministic-local-dataset-packs.md)
- [025 - Real Tutorial Instruction Packs](tasks/025-real-tutorial-instruction-packs.md)
- [026 - Challenge Grading Contract Expansion](tasks/026-challenge-grading-contract-expansion.md)
- Use the SQLite fact database to draft richer fact-backed questions and tutorial steps.
