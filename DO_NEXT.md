# Do Next

## Immediate Next Step

Numbered implementation tasks 001 through 028 are implemented. PR #3, PR #4,
PR #5, PR #6, PR #7, PR #8, and PR #9 were merged. PR #9 merged on 2026-05-10
as squash commit `b583b77`.

Current implementation step:

- Task 026 - Challenge Grading Contract Expansion is implemented on branch
  `task026-grading-contracts` and ready for PR review.
- Read `README.md`, `docs/14-platform-components.md`, `PLAN.md`, `STATUS.md`,
  `BUGS.md`, `tasks/025-real-tutorial-instruction-packs.md`, and
  `tasks/026-challenge-grading-contract-expansion.md` first.
- Keep terminology precise: `implementation tasks` are numbered repo work items
  under `tasks/*.md`; `learner tasks` are curriculum exercise units shown to
  learners.

1. Open the PR for branch `task026-grading-contracts`.
2. Watch PR checks and keep the branch mergeable.
3. After merge, verify main-branch CI, GitHub Pages deployment, and the live
   Pages URL.
4. After the merge and Pages deployment, perform a real deployed-UI click-through
   with Playwright/browser automation and screenshots. Do not infer from build
   output alone. At minimum open the deployed GitHub Pages app, capture the home
   page, challenge catalog, `deposit-metric-contract`, one browser SQL flow,
   one cloud-evidence flow, Settings export/reset surfaces, and a mobile
   viewport. Follow actual controls and record screenshots/checkpoints in the
   continuity notes.
5. Then choose the next implementation task. Good candidates are a browser-local
   JSON import flow for Settings, richer browser-config/metric-contract
   challenges, or dataset-derived expected-answer generation for challenges
   where generated targets add real value.

Preservation and verification steps:

- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- Keep config files in `app/configs/` as TypeScript and covered by `tsconfig.node.json`.
- Keep `bun run format:check`, `bun run lint`, `bun run typecheck`, and `bun run check` clean before merging. Full `bun run check` passed locally for the Task 026 branch on 2026-05-10.
- Preserve the frontend-only boundary: no backend calls, server session, API database, analytics beacon, or learner-data upload.
- Preserve browser-local progress behavior: `localStorage` plus same-site cookie fallback, with reset clearing both.
- Preserve Settings export behavior and implement future import as browser-local JSON validation/preview/apply only.
- Preserve the test pyramid documented in `docs/12-test-pyramid.md` and enforced by `bun run test:platform-boundary`.
- Preserve the Task 015 fixture coverage rule: every released manifest needs a known-good solution fixture or a documented exception, and CTF/trap challenges need expected known-bad coverage.
- Preserve the Task 026 grading-contract rule: browser-config challenges use
  local JSON evidence only, supported checks must be covered by content QA, and
  exclusion-style artifact checks need known-bad fixture coverage.
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
- [028 - Platform Component Organization](tasks/028-platform-component-organization.md)
- Use the SQLite fact database to draft richer fact-backed questions and tutorial steps.
