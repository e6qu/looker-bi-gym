# Do Next

## Immediate Next Step

Numbered implementation tasks 001 through 028 are implemented. PR #3, PR #4, PR #5, PR #6, and PR #7 were merged. PR #7 merged on 2026-05-10 at `954a128fd65b2b117b5fe23a3295c722cd6ae3f5`. Post-merge CI and GitHub Pages deployment for PR #7 passed, and the live Pages URL returned HTTP 200.

Current implementation step:

- Start implementation Task 025 - Real Tutorial Instruction Packs.
- Read `README.md`, `docs/14-platform-components.md`, `PLAN.md`, `STATUS.md`,
  `BUGS.md`, and `tasks/025-real-tutorial-instruction-packs.md` first.
- Keep terminology precise: `implementation tasks` are numbered repo work items
  under `tasks/*.md`; `learner tasks` are curriculum exercise units shown to
  learners.

1. Update or add learner-task content/schema for several complete 15-20 minute
   learner tasks across multiple areas:
   - BI fundamentals;
   - BigQuery/SQL for BI;
   - Looker Studio mechanics;
   - data quality and controls;
   - banking BI applications as realistic context, not legal/market theory.
2. Each learner task must include:
   - overall learning objective;
   - prerequisites;
   - input dataset;
   - exact step-by-step learner actions;
   - verification checkpoints;
   - visualization/reporting action;
   - optional recipe pointer;
   - self-assessment;
   - CTF-style end challenge.
3. Start from general BI fundamentals, preferably using `deposits-seed/v0.1.0`
   before leaning on lending/real-estate specifics.
4. Add a useful in-app SQL result visualization path on task/challenge pages:
   when a SQL result contains a dimension-like column and numeric column, allow a
   simple deterministic table/bar-chart visualization. Avoid dummy or placeholder
   visualization work.
5. Add a separate quiz-bank format rather than overloading challenge manifests.
   First quiz target: one mixed approximately 20-minute quiz, internally grouped
   by `easy`, `medium`, and `hard`, with recommended learner-task IDs,
   `source_facts`, answers, explanations, estimated seconds, and
   self-assessment notes.
6. Add a separate tutorials recipes section for Looker Studio recipes after the
   browser-first tutorials. For PR #6, keep recipes manual/browser-driven and do
   not introduce AWS CLI, Google CLI, BigQuery CLI, Python, Docker, or shell
   upload scripts.
7. Document exam mode as untimed independent challenge cards up to about 2 hours
   each, selectable by the learner and self-assessed first. Defer full app exam
   rendering unless it falls naturally out of the task/quiz data model.
8. Cross-link learner-task docs with the platform component map so future
   implementation does not confuse learner tasks with implementation tasks.

Preservation and verification steps:

- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- Keep config files in `app/configs/` as TypeScript and covered by `tsconfig.node.json`.
- Keep `bun run format:check`, `bun run lint`, `bun run typecheck`, and `bun run check` clean before merging. Full `bun run check` passed locally for the Task 024 branch on 2026-05-10.
- Preserve the frontend-only boundary: no backend calls, server session, API database, analytics beacon, or learner-data upload.
- Preserve browser-local progress behavior: `localStorage` plus same-site cookie fallback, with reset clearing both.
- Preserve Settings export behavior and implement future import as browser-local JSON validation/preview/apply only.
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
- [028 - Platform Component Organization](tasks/028-platform-component-organization.md)
- Use the SQLite fact database to draft richer fact-backed questions and tutorial steps.
