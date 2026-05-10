# What We Did

## 2026-05-10

- After the user merged PR #11, confirmed it merged at
  `bd0be4505958f2e33706169dc7816096c7abc617`, switched to `main`, pulled the
  merge, and created branch `ci-ui-warning-checks`.
- Checked post-merge PR #11 automation:
  - main-branch CI run `25629510931` passed for merge commit
    `bd0be4505958f2e33706169dc7816096c7abc617`;
  - main-branch Pages deployment run `25629510924` passed for the same commit;
  - `curl -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Started a CI and browser-diagnostics hardening pass for Tasks 012 and 013.
- Expanded `.github/workflows/ci.yml` so GitHub Actions explicitly runs:
  - `bun run format:check`;
  - `bun run test:derived-expectations`;
  - `bun run test:browser-config`;
  - `bun run test:facts-db`;
  - `bun run test:llm-workbench`;
  - `bun run test:platform-boundary`.
- Added root package script aliases for `test:derived-expectations` and
  `test:browser-config`.
- Updated the app `check` script so `bun run check` starts with
  `bun run format:check`.
- Expanded the platform-boundary test so it enforces the new format,
  facts-database, and LLM-workbench check coverage in the app test pyramid.
- Updated Playwright rendered UI tests to collect and fail on:
  - browser console warnings;
  - browser console errors;
  - uncaught page errors;
  - failed network requests.
- Updated the browser QA and test-pyramid docs to document the diagnostics gate.
- Initial `bun run lint` caught unnecessary `async` on the new Playwright hooks;
  the hooks were corrected and lint then passed.
- Verification run:
  - `bun run format`;
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:e2e` after approved local preview binding;
  - `bun run test:platform-boundary`;
  - `bun run check` after approved local preview binding.
- The first sandboxed full `bun run check` rerun after continuity-doc updates
  reached Playwright and then failed because Vite preview could not bind
  `127.0.0.1:4173` (`listen EPERM`). The approved rerun passed.
- Full `bun run check` passed, including all 9 Playwright rendered UI tests with
  the new browser diagnostics guard. No browser console warnings, browser
  console errors, page errors, or failed network requests were found in the
  covered rendered flows.
- Committed the hardening pass as
  `4a2376d Strengthen CI and browser diagnostics`, pushed branch
  `ci-ui-warning-checks`, and opened PR #12:
  `https://github.com/e6qu/looker-bi-gym/pull/12`.
- After the user merged PR #12, confirmed it merged at
  `3edd840e1c749a453f2834d8684211069dceae1d` on 2026-05-10.
- Fast-forwarded local `main` to PR #12.
- Checked post-merge PR #12 automation:
  - main-branch CI run `25629932439` passed for merge commit
    `3edd840e1c749a453f2834d8684211069dceae1d`;
  - main-branch Pages deployment run `25629932430` passed for the same commit;
  - `curl -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
    `last-modified: Sun, 10 May 2026 13:28:52 GMT`.
- Created branch `record-pr12-postmerge` to record post-merge status and the
  next implementation phase options without pushing to `main`.
- Continued PR #13 with the next learning-surface phase.
- Added typed browser YAML loading for quiz banks and exam packs in
  `app/src/learningContent.ts`.
- Rendered quiz-bank YAML as an interactive static-app route at `#/quiz`, with
  difficulty groups, local answer checking, source-evidence links, recommended
  learner-task links, and self-assessment notes.
- Rendered exam-card YAML as `#/exam`, with independent self-assessed practical
  cards and deterministic expected outputs.
- Added `app/src/factCatalog.ts` and `#/facts` as a browser-local fact graph
  view parsed from committed fact Markdown.
- Changed source-evidence UI so learners see human-readable fact statements and
  areas; raw `FACT-*` IDs remain as metadata/link targets instead of the main
  visible label.
- Added synthetic learner-dataset source cards and facts for deterministic quiz
  controls:
  - `FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN`;
  - `FACT-DEPOSITS-FANOUT-CONTROL-TOTALS`;
  - `FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT`.
- Refined all quiz-bank questions so cited facts directly cover the prompt,
  answer, explanation, and numeric deterministic answers. Used subagent audit
  feedback to add missing dataset-control, credential, select-list, valuation,
  and fanout facts where needed.
- Extended the SQLite facts database with a `triples` table for
  source-support, reverse source-support, related-fact, and source-document
  graph rows.
- Added `bun run test:quiz-facts-db`, root script alias, Makefile target, CI
  step, and platform-boundary enforcement. The test builds the SQLite facts DB,
  loads quiz YAML into temporary quiz tables, verifies source fact nodes and
  graph/source edges, checks explanations mention every cited fact, and requires
  numeric answers to appear in cited fact text.
- Ran `bun run facts:build-db`; it produced ignored
  `app/src/generated/facts.sqlite` for local inspection.
- Moved `yaml` into app runtime dependencies because browser code now imports it
  for quiz/exam YAML parsing; `bun install --frozen-lockfile` passed with no
  lockfile changes after approved temp/cache access.
- Updated Playwright coverage for `#/quiz`, `#/exam`, and `#/facts`.
- Adjusted Vite `chunkSizeWarningLimit` from 1024 to 4096 to match the expected
  static DuckDB/YAML learning bundle and avoid noisy build warnings during
  Playwright preview.
- Added `AGENTS.md` type-safety rules: no `any`, `as any`, broad `object` type,
  `as object`, `@ts-ignore`, or `@ts-expect-error`; validate external parser
  inputs from `unknown` into domain types.
- Verification run so far:
  - `bun run test:quiz-facts-db`;
  - `bun run test:facts-db`;
  - `bun run test:content-qa`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run test:e2e` after approved local preview binding.
- Final local verification for PR #13:
  - `bun run format`;
  - `bun run check` after approved local Playwright/Vite preview port binding;
  - `git diff --check`;
  - type-safety scan across `app/src`, `app/scripts`, `app/tests`, and
    `app/configs`.
- `bun run check` passed with all 10 Playwright rendered UI tests, production
  build, static-link validation, fact DB checks, quiz facts DB verification,
  content QA, platform-boundary checks, typecheck, lint, and format check.
- The type-safety scan found no `any`, `as any`, broad `object` type,
  `as object`, `@ts-ignore`, or `@ts-expect-error` usage in app code; the only
  match was the ESLint rule name `@typescript-eslint/no-explicit-any`.
- Reviewed ignored/generated outputs after verification. `app/dist/`,
  `app/src/generated/`, `screenshots/`, and `var/` remain ignored and were not
  staged.
- Committed the PR #13 implementation as
  `69f2330 Render learning surfaces and verify quiz facts`, pushed
  `record-pr12-postmerge`, and updated PR #13:
  `https://github.com/e6qu/looker-bi-gym/pull/13`.
- PR #13 GitHub Actions `Validate, Test, And Build` passed for commit
  `69f2330ca46aaaa0ec10975e4d17dfa8a5653016` in 1m43s.
- Failed attempts during verification:
  - sandboxed `bun install --frozen-lockfile` could not write to Bun tempdir;
    approved rerun passed;
  - sandboxed `bun run test:e2e` could not bind `127.0.0.1:4173`; approved
    reruns executed Playwright;
  - early Playwright assertions were too broad or still assumed visible raw
    `FACT-*` IDs; tests were corrected to match human-readable evidence UI.
- User-requested next phase after this PR: rewrite tutorials to be
  self-contained. Tutorials may include prerequisite docs at the start, but the
  tutorial body itself should provide complete step-by-step instructions and not
  point learners to challenges as the way to understand the lesson.
- After the user asked to merge once CI was passing, confirmed final PR #13 CI
  passed, merged PR #13 with squash merge, and fast-forwarded local `main`.
- Confirmed PR #13 merged on 2026-05-10 at merge commit
  `f0deb549a3601559ffc1a6f81e386f95c5b36702`.
- Confirmed main CI run `25630673392` passed for merge commit
  `f0deb549a3601559ffc1a6f81e386f95c5b36702`.
- Confirmed main GitHub Pages deployment run `25630673398` passed for the same
  merge commit.
- Confirmed `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
  `last-modified: Sun, 10 May 2026 14:03:54 GMT`.
- Created branch `self-contained-tutorials` from updated `main`; no work was
  pushed directly to `main`.
- Started Task 030 - Self-Contained Tutorial Workbench.
- Added `#/workbench/deposits-seed/v0.1.0` and
  `#/workbench/lending-month-end/v0.1.0` as neutral browser SQL workbench
  routes for tutorial SQL. The workbench loads committed synthetic datasets
  through DuckDB-WASM and does not grade answers, request credentials, require a
  backend, or use challenge pages as the lesson surface.
- Updated released learner-task tutorials to point to the workbench routes for
  SQL execution and to keep the instructional path self-contained in the page:
  prerequisites, exact SQL, deterministic outputs, checkpoint questions,
  reporting/visualization actions, failure modes, self-assessment, and
  tutorial-internal CTF-style end checks.
- Added content QA coverage so learner-task tutorials must link to a workbench
  route, must not link to `#/challenges/`, and must not require capturing a
  local challenge flag for the tutorial.
- Added Playwright coverage for the workbench route and a real tutorial query
  returning `row_count = 18` and `latest_balance_date = 2026-03-31`.
- During Playwright verification, the first workbench test exposed that an
  uncast DuckDB `MAX(date)` result rendered as a numeric timestamp. Updated the
  tutorial queries and Playwright query to cast displayed date values to
  `VARCHAR`, matching the expected tutorial tables.
- During the second Playwright verification, the workbench table button selector
  matched both the schema-browser button and quick-query button. Tightened the
  test selector to the exact quick-query button.
- Verification so far for Task 030:
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:content-qa`;
  - `bun run format:check`;
  - `bun run test:e2e` after approved local preview binding; all 11 rendered UI
    tests passed.
- Final local verification for Task 030:
  - `bun run check` after approved local Playwright/Vite preview port binding;
  - `git diff --check`;
  - type-safety scan across `app/src`, `app/scripts`, `app/tests`, and
    `app/configs`.
- `bun run check` passed with all 11 Playwright rendered UI tests, production
  build, static-link validation, fact DB checks, quiz facts DB verification,
  content QA, platform-boundary checks, typecheck, lint, and format check.
- The type-safety scan found no `any`, `as any`, broad `object` type,
  `as object`, `@ts-ignore`, or `@ts-expect-error` usage in app code; the only
  match was the ESLint rule name `@typescript-eslint/no-explicit-any`.
- Reviewed ignored/generated outputs after verification. `app/dist/`,
  `app/src/generated/`, `screenshots/`, and `var/` remain ignored and were not
  staged.

- Merged PR #9 with `gh pr merge 9 --squash --delete-branch`, fast-forwarded
  local `main`, and created branch `task026-grading-contracts`.
- Implemented Task 026 - Challenge Grading Contract Expansion.
- Added `app/src/configEvidence.ts` with browser-local JSON artifact validators:
  required fields, exact field equality, required array entries, and forbidden
  array entries.
- Updated challenge rendering so `browser-config` challenges use the same local
  no-backend evidence page pattern as cloud-evidence challenges.
- Added released challenge `deposit-metric-contract`, a metric-contract review
  exercise that asks the learner to paste JSON and grades grain, owner, serving
  shape, and sensitive-field minimisation choices.
- Added known-good and known-bad browser-config solution fixtures for the metric
  contract challenge.
- Expanded fixture tests so browser-config exclusion checks require known-bad
  coverage.
- Added `bun run test:browser-config` and wired it into `bun run check` and the
  platform-boundary test.
- Expanded content QA so non-quiz checks must be supported by the declared
  challenge mode.
- Added Playwright coverage for completing the browser-config metric-contract
  learner flow locally and earning the local flag.
- Updated authoring, fixture, test-pyramid, and platform-component docs for the
  browser-config grading contract.
- Verification run:
  - `bun run format`;
  - `bun run format:check`;
  - `bun run validate:manifests`;
  - `bun run test:browser-config`;
  - `bun run test:content-qa`;
  - `bun run test:fixtures`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run check` after approved local preview binding.
- Full `bun run check` passed, including all 9 Playwright rendered UI tests and
  the production build.
- After PR #10 checks passed, recorded the user's post-merge requirement to
  actually click through the deployed GitHub Pages UI with screenshots and
  real learner-flow interactions after the PR is merged. This is a post-merge
  verification step, not a substitute for local or CI tests.
- After the user asked to finish the only non-post-merge Task 026 omission,
  added `bun run test:derived-expectations`. It executes known-good browser-SQL
  fixture SQL against pinned committed datasets, derives exact row counts and
  aggregate values, and verifies the manifest grading contract matches those
  derived values.
- Wired the derived-expectation check into `bun run check`, `make test`, and the
  platform-boundary test pyramid guard.
- Added `.gitignore` and `.prettierignore` protections for local generated
  expectation reports and screenshot artifacts:
  `derived-expectations/`, `screenshots/`, `app/derived-expectations/`, and
  `app/screenshots/`.
- Focused verification run:
  - `bun run test:derived-expectations`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run format:check`.
- Full `bun run check` passed after this follow-up, including the new
  derived-expectation step, all 9 Playwright rendered UI tests, the production
  build, and static-link validation.

- After the user merged PR #8, confirmed it merged at
  `5db7663ee0d76be809cb383a4dfeb4390eb5ed6f`, switched to `main`, and pulled
  the merge.
- Checked post-merge PR #8 automation:
  - main-branch CI run `25628017632` passed for merge commit
    `5db7663ee0d76be809cb383a4dfeb4390eb5ed6f`;
  - main-branch Pages deployment run `25628017630` passed for the same commit;
  - `curl -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Created branch `record-pr8-postmerge` to record the post-merge baseline without
  pushing to `main`.

- Continued on open PR #8 branch `record-pr7-postmerge` after PR #7 merged and
  implemented Task 025 - Real Tutorial Instruction Packs.
- Added area-grouped learner-task packs:
  - `LT-BI-001` profile dataset grain;
  - `LT-BI-002` detect fanout before reporting;
  - `LT-SQL-003` build a month-end serving result;
  - `LT-LOOKER-004` prepare a report-ready data source;
  - `LT-DQ-005` reconcile dashboard controls.
- Added `tutorials/learner-tasks/README.md` to keep learner tasks distinct from
  repository implementation tasks.
- Added optional browser-driven Looker Studio recipe
  `tutorials/recipes/r-looker-001-deposits-dashboard.md`.
- Added separate structured content:
  - `quizzes/bi-foundations-mixed.yaml`;
  - `exams/bi-foundations-exam.yaml`.
- Updated `app/src/content.ts` so tutorial Markdown is loaded recursively and
  nested learner-task/recipe pages render in the GitHub Pages UI.
- Added deterministic SQL result visualization in `app/src/App.tsx`: when a SQL
  result has a dimension-like column and numeric column, the app renders the
  existing table plus a bar chart.
- Added CSS for the SQL result visualization.
- Expanded `app/scripts/test-content-qa.ts` so content QA validates learner-task
  headings, objectives, timeboxes, SQL snippets, deterministic expected outputs,
  known source facts, quiz-bank difficulty groups, recommended learner-task IDs,
  and exam-card source facts/verification.
- Extended Playwright coverage to visit a learner-task tutorial page, continue
  to the browser SQL challenge, run a grouped SQL result, and verify the rendered
  chart values.
- Corrected an expected-output mistake found by Playwright/manual inspection:
  latest `deposits-seed/v0.1.0` currency totals for 2026-03-31 are `EUR = 16400`
  and `RON = 79300`, not `12500` and `83200`.
- Formatting note: sandboxed `bun run format` initially hit EPERM rewriting new
  Markdown files; rerunning with approved escalation succeeded.
- Verification run:
  - `bun run format`;
  - `bun run format:check`;
  - `bun run lint`;
  - `bun run typecheck`;
  - `bun run test:content-qa`;
  - `bun run test:fixtures`;
  - `bun run test:e2e` after approved local preview binding;
  - `bun run check` after approved local preview binding.
- Full `bun run check` passed, including all 8 Playwright rendered UI tests.

- After the user merged PR #7, confirmed it merged at
  `954a128fd65b2b117b5fe23a3295c722cd6ae3f5`, switched to `main`, and pulled
  the merge.
- Checked post-merge PR #7 automation:
  - main-branch CI run `25626931569` passed for merge commit
    `954a128fd65b2b117b5fe23a3295c722cd6ae3f5`;
  - main-branch Pages deployment run `25626931571` passed for the same commit;
  - `curl -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Created branch `record-pr7-postmerge` to record the post-merge baseline without
  pushing to `main`.

- After the user merged PR #6, confirmed it merged at
  `1da6272efb1c219bfcdf8981e4014af4b4a899e4`, switched to `main`, pulled the
  merge, and created branch `organize-platform-components`.
- Started implementation Task 028 to organize the merged platform components and
  sections around the GitHub Pages learner experience.
- Added root `README.md` with:
  - static GitHub Pages project summary;
  - no-backend/no-real-data/no-credential boundary;
  - repository component directory map;
  - Bun-only development commands;
  - browser-local state and JSON export/import direction.
- Added `docs/14-platform-components.md` as the component map for:
  - learner website sections;
  - current and planned learner-facing sections;
  - tutorials, challenges, fixtures, recipes, quizzes, and exam cards;
  - datasets, facts, sources, and regulations;
  - app shell, content, challenge runtime, dataset registry, DuckDB-WASM SQL
    runtime, validators, and progress state;
  - `localStorage`, same-site cookie mirror, JSON export, planned JSON import;
  - verification gates and implementation-task versus learner-task boundaries.
- Linked the component map from `docs/README.md` and `PLAN.md`.
- Updated `app/README.md` to rename the state section to "Progress Export And
  Planned Import" and document the intended browser-local import flow:
  choose JSON, validate `looker-bi-gym.progress-export.v1`, preview evidence,
  apply after confirmation, and never upload learner data.
- Added `tasks/028-platform-component-organization.md` and linked it from
  `tasks/README.md`.
- Updated `STATUS.md`, `DO_NEXT.md`, and `BUGS.md` to reflect:
  - PR #6 is merged;
  - Task 028 is active;
  - JSON export is implemented;
  - JSON import is planned, not implemented;
  - post-merge PR #6 Pages verification needed to be checked.
- Checked post-merge PR #6 automation:
  - main-branch CI run `25626695978` passed for merge commit
    `1da6272efb1c219bfcdf8981e4014af4b4a899e4`;
  - main-branch Pages deployment run `25626695981` passed for the same commit;
  - `curl -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Ran Task 028 verification:
  - `bun run format`;
  - `bun run format:check`;
  - `bun run test:content-qa`.
- Committed Task 028 as `de20dea Organize platform components`.
- Pushed branch `organize-platform-components` and opened PR #7:
  `https://github.com/e6qu/looker-bi-gym/pull/7`.
- Confirmed PR #7 is open and mergeable; GitHub Actions started
  `Validate, Test, And Build` for commit
  `de20dea8717a803aa64d9b3be29a4dd48753a479`.

- Discussed and pinned the next PR #6 tutorial direction after the dataset and
  LLM workbench expansion:
  - add implementation Task 025's learner-facing tutorial model to PR #6 instead
    of waiting for a separate PR;
  - explicitly distinguish implementation tasks under `tasks/*.md` from learner
    tasks shown to learners in the app/tutorials;
  - implement several complete learner tasks across multiple areas, not only one
    schema or placeholder proof of concept;
  - each learner task should be 15-20 focused minutes with an overall learning
    objective that is part of the learning path;
  - prioritize BI mechanics and Looker/BigQuery behavior for a data analyst
    moving into BI and banking;
  - keep banking and real-estate details as realistic context, not the main
    first-pass learning objective;
  - start from general BI fundamentals, preferably with the deposits dataset
    before relying on lending/real-estate specifics;
  - put Looker Studio recipes in a separate section after tutorials;
  - keep recipes manual/browser-driven for now, with no AWS CLI, Google CLI,
    BigQuery CLI, Python, Docker, or learner-facing shell upload scripts in the
    early path;
  - if scripts are later introduced, they must be uncomplicated,
    ShellCheck-verified, macOS/Linux compatible, and usable from both `bash` and
    `zsh`;
  - use a separate quiz-bank format instead of overloading challenge manifests;
  - first quiz target is one mixed approximately 20-minute quiz organized by
    `easy`, `medium`, and `hard`, with recommended learner-task IDs,
    `source_facts`, answers, explanations, estimated seconds, and
    self-assessment notes;
  - exam mode should begin as untimed independent challenge cards up to roughly
    2 hours, user-selected and self-assessed first.
- Agreed implementation recommendation for visualization:
  - add useful in-app visualization on SQL task/challenge result pages;
  - show it only when the SQL result has at least one dimension-like column and
    one numeric column;
  - start with deterministic table/bar-chart views that support BI mechanics;
  - avoid global dummy charts or placeholder visualization work.
- Checked PR #6 after the pushed dataset/workbench commit:
  - PR URL: `https://github.com/e6qu/looker-bi-gym/pull/6`;
  - head commit: `cc1957e7fc1ce8d771b0a07e14c903703d853717`;
  - state: open and mergeable;
  - GitHub Actions `Validate, Test, And Build` passed on 2026-05-10.
- Began finalizing continuity docs for the next session:
  - `PLAN.md` now records the task/quiz/exam/recipe/visualization decisions;
  - `AGENTS.md` now cross-links the continuity docs and gives a compact PR #6
    implementation guide.
- After the user warned not to confuse implementation work items with
  learner-facing curriculum units, updated the continuity language:
  - `implementation tasks` means numbered repo work under `tasks/*.md`;
  - `learner tasks` means tutorial/app exercise units for learners.

- Continued PR #6 after the user requested larger deterministic datasets,
  Romania-only real-estate prices/location context, official historical/current
  data, LLM generation plus review/refinement, and manual dreaming.
- Added deterministic Romania real-estate collateral support to
  `lending-month-end/v0.1.0`:
  - `generate-real-estate-collateral.ts`;
  - 60 synthetic collateral/property/location/attribute rows;
  - 180 synthetic property valuation rows;
  - 42 synthetic sector/city/neighborhood-tier/property-type price bands.
- Added official Eurostat Romania annual HPI observations for 2009-2025 in
  `official_house_price_index_ro_annual.csv`, with source cards and facts for
  HPI scope, historical/current observations, and market-index boundaries.
- Added Romania notarial-study source cards and facts to prevent treating
  notarial reference values as property-level appraisals or market advice.
- Updated lending dataset metadata with new tables, relationships, control
  totals, known traps, date semantics, synthetic-only boundaries, and fixture
  refresh rules.
- Expanded `lending-month-end-snapshots` with collateral freshness, latest
  property valuation, official HPI, notarial-reference, and sensitive
  `property_id` minimisation checks/questions.
- Updated the browser starter SQL and known-good fixture SQL/answers for the
  richer collateral controls.
- Added the manual LLM question workbench:
  - `make questions-context`;
  - `make questions-generate-codex`;
  - `make questions-generate-claude`;
  - `make questions-review-codex`;
  - `make questions-review-claude`;
  - `make dream`;
  - `make dream-codex`;
  - `make dream-claude`.
- Added `docs/13-llm-question-and-dreaming-workbench.md` documenting that
  dreaming is manual, no-provider-capable, no-edit, ignored-artifact review
  tooling for now.
- Added `bun run test:llm-workbench` and included it in `bun run check` and
  `make test`.
- Updated `.gitignore` and `.prettierignore` so ignored workbench artifacts under
  `var/` are not committed or formatted.
- Fixed validation issues found during the local check pass:
  - removed a comma from generated CSV note text because the dataset validator
    intentionally uses simple CSV parsing;
  - made Bucharest price-band IDs sector-aware to avoid duplicate primary keys;
  - aligned fixture/starter SQL with the loaded table name
    `romania_house_price_index_annual`;
  - updated the deterministic latest property valuation total to `11801400`;
  - made the new notarial question explanation cite its `FACT-*` ID.
- Ran focused checks:
  - `bun run validate:datasets`;
  - `bun run validate:manifests`;
  - `bun run test:facts-db`;
  - `bun run test:llm-workbench`;
  - `bun run test:fixtures`;
  - `bun run test:content-qa`;
  - `bun run test:sql`;
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`.
- Ran full `bun run check` with approved local preview binding; it passed,
  including all 8 Playwright rendered user-flow tests.

- Resumed Task 027 wrap-up after sandbox git-index writes were blocked on
  2026-05-09.
- Reviewed the staged working tree and continuity files before committing.
- Committed Task 027 as `4efd833 Add source-backed banking BI fact database`.
- Pushed branch `source-backed-fact-database` and opened PR #5:
  `https://github.com/e6qu/looker-bi-gym/pull/5`.
- Confirmed PR #5 CI passed before merge.
- After the user merged PR #5, switched to `main`, pulled merge commit
  `c444172005e0d9c2a391d1e9c93b3ebae85cd3d3`, and verified the post-merge
  state.
- Watched post-merge CI run `25613823169`; `Validate, Test, And Build` passed.
- Checked post-merge GitHub Pages deployment run `25613823160`; it completed
  successfully.
- Ran `curl -I https://e6qu.github.io/looker-bi-gym/`; the deployed app returned
  HTTP 200.

## 2026-05-09

- Confirmed PR #4 was merged, switched to branch `source-backed-fact-database`, and implemented Task 027.
- Removed app/runtime/project-specific learner facts from `docs/facts/` and redirected challenge/tutorial source facts toward BigQuery, Looker Studio, banking BI modeling, and official banking/regulatory sources.
- Added `sources/` source cards for GDPR, DGSD, DORA, FGDB, EBA, FDIC, BigQuery, Looker Studio, and dimensional-modeling literature.
- Added sanitized, complete article HTML snapshots for core BigQuery and Looker Studio documentation under `sources/platforms/bigquery/full/` and `sources/platforms/looker-studio/full/`.
- Added `bun run sources:snapshot` to refresh permissively licensed official Google Cloud documentation snapshots with attribution and sanitizer rules.
- Added `docs/facts/bi-modeling-banking.md` and `docs/facts/banking-deposits-us.md`.
- Expanded and corrected facts for BigQuery views, jobs, aggregates, approximate aggregates, window functions, date functions, join/performance practices, Looker Studio data sources, calculated fields, credentials, blends, aggregation, dimensions, banking BI grain, fanout, semi-additive balances, date-role separation, EU/Romanian deposit guarantee, and US FDIC insurance grain.
- Added typed Bun SQLite facts database tooling:
  - `app/scripts/fact-database.ts`;
  - `app/scripts/build-fact-database.ts`;
  - `app/scripts/test-fact-database.ts`;
  - `app/scripts/bun-sqlite.d.ts`.
- The facts database builds `sources`, `source_documents`, `facts`, `fact_sources`, and `fact_links`, and fails on missing source links or broken related-fact IDs.
- Added `test:facts-db`, `facts:build-db`, and `sources:snapshot` scripts and included `test:facts-db` in `bun run check` and `make test`.
- Updated orientation, dataset inspection, fanout, and Looker evidence manifests away from app-runtime facts and toward BI/platform/domain facts.
- Updated orientation solution fixture and Playwright orientation flow to match the new BigQuery/Looker quiz.
- Updated `.gitignore` to ignore generated SQLite databases and `.prettierignore` to skip downloaded source snapshots.
- Ran `bun run --filter @looker-bi-gym/app sources:snapshot`; the first sandboxed run failed on network access, then the escalated run downloaded snapshots successfully.
- Ran `bun run --filter @looker-bi-gym/app test:facts-db`; it initially caught an unsupported project-specific fact and missing source-card entries for full Looker snapshots, then passed after fixes.
- Ran `bun run --filter @looker-bi-gym/app validate:manifests`; it initially caught a YAML colon issue in an explanation, then passed.
- Ran `bun run --filter @looker-bi-gym/app test:content-qa`; it initially exposed fact-register heading parsing that missed a self-only fact, then passed after the parser was fixed.
- Ran `bun run --filter @looker-bi-gym/app test:fixtures`; it passed.
- Ran `bun run --filter @looker-bi-gym/app typecheck`; it initially failed because Bun SQLite module types were not declared for TypeScript, then passed after adding local strong typings.
- Ran `bun run --filter @looker-bi-gym/app lint`; it initially found strict typing/lint issues in the new database scripts, then passed after fixes.
- Ran `bun run --filter @looker-bi-gym/app format`, then `bun run --filter @looker-bi-gym/app format:check`; formatting passed.
- Ran a source scan for obvious secrets in `sources`, facts, challenges, tutorials, and scripts; only deliberate credential-warning text and sanitizer regexes matched.
- Ran full `bun run check`; the first sandboxed run failed because Vite preview could not bind `127.0.0.1:4173`; the escalated rerun then found the stale Playwright orientation labels, those were fixed, and the final escalated `bun run check` passed with all 8 Playwright tests.

## 2026-05-09

- Confirmed PR #3 was merged into `main`, switched to `main`, pulled the merged baseline, and created branch `rich-fact-corpus-plan`.
- Started and completed Task 023 implementation.
- Replaced the single-table fact register with area-organized fact files under `docs/facts/`:
  - `privacy-gdpr.md`;
  - `banking-deposits-romania-eu.md`;
  - `bi-platforms-bigquery-looker-studio.md`;
  - `browser-runtime-storage.md`;
  - `governance-reporting-operations.md`;
  - `project-architecture.md`.
- Expanded the fact corpus with official-source and source-code-backed facts for GDPR, FGDB/DGSD deposit guarantee semantics, BigQuery views/jobs/materialized views, Looker Studio data sources/calculated fields/credentials/blends, DuckDB-WASM/browser SQL behavior, DORA/EBA reporting and operations, and local project architecture/dataset/fixture behavior.
- Preserved existing fact IDs already referenced by released manifests.
- Updated content QA so the fact register is collected from every Markdown file under `docs/facts/`.
- Rewrote `PLAN.md` to remove the old scaffold-era immediate execution order and replace it with current baseline, clarifications, and future phases for literature/facts, deterministic local datasets, real tutorial packs, grading contracts, and release discipline.
- Added Tasks 023 through 026 for literature/fact corpus expansion, deterministic local dataset packs, real tutorial instruction packs, and challenge grading contract expansion.
- Ran `bun run format:check`; it passed.
- Ran `bun run test:content-qa`; it passed.
- Ran `bun run validate:manifests`; it passed.
- Ran `bun run typecheck`; it passed.
- Ran `bun run lint`; it passed.
- Committed the Task 023 changes as `7a9cc0f Expand local fact corpus and future plan`.
- Pushed branch `rich-fact-corpus-plan`.
- Opened PR #4: `https://github.com/e6qu/looker-bi-gym/pull/4`.
- Watched PR #4 checks; `Validate, Test, And Build` passed in GitHub Actions.

## 2026-05-09

- Started and completed Tasks 020, 021, and 022 implementation on branch `fact-backed-tutorials`.
- Added `lesson_steps` and question `source_facts` to the challenge manifest schema and TypeScript challenge types.
- Rendered step-by-step challenge lessons in the app with instruction, expected checkpoint, why-it-matters text, common failure mode, and source fact links.
- Updated challenge question rendering to display source fact IDs.
- Updated app Markdown content loading so nested docs such as `docs/facts/README.md` are available in the static docs catalog.
- Rewrote released challenge manifests with fact-backed lesson steps and questions for DuckDB-WASM, browser-local storage, GDPR minimisation, FGDB/EU deposit guarantee amount/grain, BigQuery logical views, Looker Studio data sources/calculated fields/credentials, and local-only cloud evidence.
- Bumped released challenge versions to `v0.2.0` and updated the draft challenge version to `v0.1.1`.
- Updated known-good and known-bad solution fixtures for changed question IDs and answers.
- Rewrote released tutorial Markdown files `00` through `09` with Source Facts, Steps, Checkpoints, Common Failure Modes, and concrete deliverables.
- Extended content QA to parse the source fact register, validate known source fact IDs, require source facts on released challenge questions and lesson steps, require released challenge lesson steps, and require step/checkpoint/failure-mode sections in released tutorial Markdown.
- Updated `challenges/AUTHORING.md`, `docs/11-content-qa-checklist.md`, and `CHANGELOG.md` for the fact-backed instruction contract.
- Updated Playwright user-flow tests for the rewritten quiz and challenge questions.
- Ran `bun run validate:manifests`; it passed.
- Ran `bun run test:fixtures`; it passed.
- Ran `bun run typecheck`; it passed.
- Ran `bun run test:content-qa`; it initially caught an overly narrow executable-action assertion, the rule was fixed, and the rerun passed.
- Ran `bun run test:quiz`; it passed.
- Ran `bun run test:platform-boundary`; it passed.
- Ran `bun run lint`; it passed.
- Ran `bun run format:check`; it initially failed on formatting in `app/scripts/test-content-qa.ts` and `challenges/AUTHORING.md`.
- Ran `bun run format`; it fixed formatting.
- Reran `bun run format:check`; it passed.
- Ran `bun run test:e2e`; it initially failed because the sandbox blocked Vite preview from binding `127.0.0.1:4173`.
- After explicit user approval for local preview binding, reran `bun run test:e2e`; all 8 Playwright rendered user-flow tests passed.
- Ran `bun run build`; it passed.
- Ran `bun run test:validators`; it passed.
- Ran `bun run test:cloud-evidence`; it passed.
- Ran `bun run test:progress-export`; it passed.
- Ran `bun run validate:datasets`; it passed.
- Ran `bun run test:sql`; it passed.
- Ran `bun run validate:static-links`; it passed.
- Ran full `bun run check` with approved local preview binding; it passed, including all validation scripts, content QA, platform-boundary checks, all 8 Playwright rendered user-flow tests, production build, and static-link validation.
- Committed the implementation as `f606cae Implement fact-backed tutorial flows`.
- Pushed branch `fact-backed-tutorials`.
- Opened PR #3: `https://github.com/e6qu/looker-bi-gym/pull/3`.
- Watched PR #3 checks; `Validate, Test, And Build` passed in GitHub Actions.

## 2026-05-09

- Started and completed Task 019 planning/fact-register work after identifying that the current tutorials and quiz prompts are too generic.
- Added `docs/facts/README.md` as the source fact register for fact-backed tutorials and quiz questions, with official/primary source links for GDPR, FGDB/DGSD, DORA, EBA reporting frameworks, BigQuery views, Looker Studio data sources/calculated fields/credentials, DuckDB-WASM, `localStorage`, and cookies.
- Linked the source fact register from `docs/README.md`.
- Expanded `PLAN_BI_TUTORIAL_TUTORIALS.md` so released lessons require step-by-step learner actions, expected checkpoints, common failure modes, browser-local verification, and cited source fact IDs.
- Updated `docs/11-content-qa-checklist.md` with the new fact-backed tutorial/question expectations.
- Added Tasks 020 through 022 for step-by-step tutorial rewrites, fact-backed question rewrites, and content QA automation.
- Recorded the generic-instruction gap as `CONTENT-2026-05-09-001` in `BUGS.md`.
- Ran `bun run format:check`; it initially failed on Markdown formatting in `docs/facts/README.md` and `PLAN_BI_TUTORIAL_TUTORIALS.md`.
- Ran `bun run format`; it fixed the Markdown formatting.
- Reran `bun run format:check`; it passed.
- Ran `bun run test:content-qa`; it passed.
- Ran `bun run validate:manifests`; it passed.
- Ran `bun run typecheck`; it passed.

## 2026-05-09

- Investigated the failed post-merge `Deploy GitHub Pages` run. The build/test gate passed, but `actions/configure-pages@v6` failed with `Get Pages site failed ... Not Found` because the repository did not yet have a Pages site enabled.
- Enabled GitHub Pages for workflow deployments through the GitHub API. The Pages site is now configured at `https://e6qu.github.io/looker-bi-gym/` with HTTPS enforced and `build_type: workflow`.
- Reran the failed post-merge Pages workflow after enabling Pages; the rerun passed, including Configure GitHub Pages, artifact upload, and Deploy To GitHub Pages.
- Verified `https://e6qu.github.io/looker-bi-gym/` returns HTTP 200.
- Added top-level `pages: write` and `id-token: write` permissions to the Pages workflow so the build job can configure/upload Pages artifacts with the same explicit permissions model as the deploy job.
- Implemented the frontend-only state boundary instead of only documenting it:
  - progress still writes to browser `localStorage`;
  - progress is mirrored to a same-site browser cookie for local recovery;
  - reading progress restores `localStorage` from the cookie if local storage was cleared;
  - reset clears both `localStorage` and the progress cookie;
  - progress exports declare browser-only state scope and storage media.
- Added `bun run test:platform-boundary` to block backend/session/network APIs in app source and to verify the documented test pyramid remains wired into `bun run check`.
- Added `docs/12-test-pyramid.md` and linked it from the docs index.
- Expanded Playwright from rendered route checks to rendered user-flow tests:
  - navigate from Home to Challenges and complete the orientation quiz;
  - verify progress in `localStorage` and the same-site cookie;
  - clear `localStorage` and verify Settings recovers progress from the cookie;
  - reset progress and verify both storage surfaces clear;
  - run the browser SQL challenge, answer its grain question, and earn the local flag;
  - complete the cloud-evidence challenge without backend calls or credentials;
  - assert no unexpected external network requests during learner flows.
- Ran `bun run test:progress-export`; it passed.
- Ran `bun run test:platform-boundary`; it passed.
- Ran `bun run lint`; it passed.
- Ran `bun run typecheck`; it passed.
- Ran `bun run test:e2e` with approved local preview binding; all 8 rendered user-flow tests passed.
- Ran `bun run format:check`; it passed.
- Ran `bun run check` with approved local preview binding; it passed, including the new platform-boundary test, all 8 Playwright rendered user-flow tests, production build, and static-link validation.
- Opened PR #2: `https://github.com/e6qu/looker-bi-gym/pull/2`.
- GitHub CI for PR #2 passed: `Validate, Test, And Build`.
- PR #2 was merged into `main`.
- Verified post-merge `main` CI passed: `https://github.com/e6qu/looker-bi-gym/actions/runs/25599622925`.
- Verified post-merge `main` Pages deployment passed: `https://github.com/e6qu/looker-bi-gym/actions/runs/25599622931`.
- Verified the live Pages URL returns HTTP 200 after the post-merge deployment: `https://e6qu.github.io/looker-bi-gym/`.

## 2026-05-09

- Moved app tool configs into typed TypeScript files under `app/configs/` and updated Vite, ESLint, Playwright, scripts, and node tsconfig paths accordingly.
- Replaced the deprecated TypeScript ESLint config helper with ESLint's supported `defineConfig`.
- Added Prettier as the repository formatter with `bun run format`, `bun run format:check`, and matching Makefile targets.
- Ran whole-repository formatting and tightened ignore files so rebuildable generated files, local caches, Playwright output, logs, TypeScript build info, and DuckDB-WASM runtime artifacts are not committed.
- Ran `bun update --latest`; Bun reported no dependency changes beyond the added formatter tooling.
- Verified package manager references are Bun-only outside `bun.lock`.
- Checked GitHub action releases; updated `actions/configure-pages` to `v6`, while `actions/checkout@v6`, `oven-sh/setup-bun@v2`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5` were already on current major tracks.
- Ran `bun run format:check`; it passed.
- Ran `bun run lint`; it passed with zero warnings.
- Ran `bun run typecheck`; it passed.
- Ran `bun run check`; the sandboxed run reached Playwright and failed only because local preview binding to `127.0.0.1:4173` was blocked.
- Reran `bun run check` with approved local preview binding; it passed, including all 5 Playwright rendered UI tests, production build, and static-link validation.

## 2026-05-09

- Fixed remaining local warnings after the PR was opened.
- Added `app/scripts/test-e2e.ts` to run Playwright with `NO_COLOR` removed from the spawned environment, eliminating the Node `NO_COLOR`/`FORCE_COLOR` warning during rendered UI tests.
- Raised Vite `chunkSizeWarningLimit` to `1024` KiB so expected DuckDB-WASM worker chunks no longer emit the non-actionable large-chunk warning.
- Ran `bun run typecheck`; it passed.
- Ran `bun run lint`; it passed.
- Ran `bun run test:e2e` with approved local preview binding; all 5 rendered UI tests passed without the previous warning lines.
- Ran final `bun run check` with approved local preview binding; it passed without the previous warning lines.
- Checked failed GitHub Actions log; CI installed Playwright Chromium from the repository root, which resolved the wrong Playwright browser revision. Updated CI and Pages workflow Playwright install steps to run from `app/`, matching the pinned app Playwright dependency.

## 2026-05-09

- Switched active repository tooling from the prior package manager to Bun only after user direction.
- Updated root and app package scripts to use `bun run`, added root workspaces to `package.json`, removed `legacy lockfile` and `legacy workspace file`, and generated committed `bun.lock`.
- Removed `tsx` as a direct app dev dependency because Bun now runs TypeScript scripts directly.
- Added `@playwright/test` and `bun run test:e2e`.
- Updated CI and Pages workflows to use `oven-sh/setup-bun`, `bun install --frozen-lockfile`, Bun commands, and Playwright Chromium installation.
- Updated Makefile targets to call Bun and added `test-e2e`.
- Tightened `.gitignore` for generated TypeScript, Playwright output, test output, caches, logs, editor files, and local package-manager cache noise.
- Added `app/playwright.config.ts` and `app/tests/rendered-ui.spec.ts`.
- Playwright coverage now verifies:
  - desktop and mobile home rendering with nonblank screenshots;
  - primary routes across mobile, tablet, and desktop viewports;
  - no horizontal page overflow;
  - visible control text fitting inside controls;
  - challenge catalog/detail metadata and regulatory links;
  - DuckDB-WASM SQL challenge query execution and results;
  - cloud-evidence controls and Settings export/version metadata.
- Updated current docs and continuity files to describe Bun-only tooling and rendered UI tests.
- Ran `bun install`; the sandboxed run failed because Bun could not write temp/cache files, then the approved run succeeded and wrote `bun.lock`.
- Ran `bun run validate:manifests`; it passed.
- Ran `bun run typecheck`; it initially failed because Playwright tests needed DOM libs in the node tsconfig; added DOM libs and reran successfully.
- Ran `bun run lint`; it initially failed on explicit env narrowing and test nullable text handling; fixed both and reran successfully.
- Ran `bun run test:e2e`; the first sandboxed run failed because preview could not bind `127.0.0.1:4173`.
- Reran `bun run test:e2e` with approval; it then failed because the pinned Playwright Chromium browser was not installed.
- Ran `bunx playwright install chromium` from the app workspace with approval; it installed the pinned Chromium revision.
- Reran `bun run test:e2e`; selector strictness failures exposed ambiguous assertions, so the tests were tightened to target table column/cell roles and actual cloud-evidence labels.
- Reran `bun run test:e2e`; all 5 rendered UI tests passed.
- Ran final `bun run check`; it passed, including manifest validation, lint, typecheck, dataset validation, quiz tests, SQL tests, solution fixture tests, cloud-evidence tests, progress-export tests, content QA, validator tests, Playwright rendered UI tests, production build, and static-link validation.

## 2026-05-09

- Started and completed Task 018 implementation.
- Set the first tracked app/content release version to `0.1.0` in root and app package metadata.
- Added `VERSIONING.md` with app/content, challenge catalog, dataset, regulation-brief, and release-checklist policy.
- Added `CHANGELOG.md` with the `0.1.0` release contents, verification gates, known verification gaps, and breaking-change notes.
- Added `app/src/release.ts` so the static app exposes app version, content version, and optional `VITE_BUILD_REF` build reference.
- Updated the app footer and Settings page to display app/content/build metadata.
- Required top-level challenge `version` metadata in `challenges/schema/challenge-manifest.schema.json`.
- Added `version: v0.1.0` to released challenge manifests and the validation-only draft manifest.
- Added challenge versions to challenge list cards, challenge detail pages, and progress export completed-challenge entries.
- Updated progress export tests for `0.1.0` and challenge version metadata.
- Updated quiz, validator, and cloud-evidence test challenge fixtures to include challenge versions.
- Updated `challenges/AUTHORING.md`, `app/README.md`, and `docs/README.md` for release metadata and links.
- Ran `bun validate:manifests`; it passed.
- Ran `bun validate:datasets`; it passed.
- Ran `bun test:progress-export`; it passed.
- Ran `bun test:content-qa`; it passed.
- Ran `bun typecheck`; it initially failed because `VITE_BUILD_REF` needed indexed access under `noPropertyAccessFromIndexSignature`.
- Ran `bun lint`; it initially failed on unsafe env assignment in `app/src/release.ts`.
- Fixed release env handling by reading `VITE_BUILD_REF` through indexed access and narrowing it from `unknown`.
- Reran `bun typecheck`; it passed.
- Reran `bun lint`; it passed.
- Ran `bun build`; it passed with Vite's existing non-failing DuckDB-WASM large chunk warning.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture golden tests, cloud-evidence tests, progress-export tests, content QA, validator tests, production build, and static-link validation passed.
- Checked ignored generated artifacts: `app/dist/`, `app/src/generated/challengeCatalog.json`, and `node_modules/` remain ignored; no WASM runtime artifacts are listed as normal git changes.
- Updated Task 018 with completion and verification notes.
- Reran `bun test:content-qa` after updating continuity/task Markdown; it passed.
- Committed the completed Task 017 and Task 018 changes with message `Complete content QA and release versioning`.

## 2026-05-06

- Started and completed Task 017 implementation.
- Added `docs/11-content-qa-checklist.md` and linked it from `docs/README.md`.
- Added `app/src/regulatoryContext.ts` with regulation brief links for BNR, DORA, EBA, FGDB, GDPR, PSD2, and Romania Law 190.
- Updated challenge instructions in `app/src/App.tsx` and `app/src/styles.css` so regulatory-context tags render as links to the relevant regulation briefs with a visible training-context note.
- Tightened challenge copy in `account-owner-fanout.yaml` and `looker-studio-evidence.yaml` so the synthetic-data boundary is explicit.
- Added training-boundary disclaimers to every individual regulation brief and tightened the regulations index disclaimer to include model-risk advice.
- Added training-boundary notes to docs that discuss credentials, warehouse access, regulatory sources, or production-style controls.
- Added synthetic-data boundary notes to tutorial files that did not previously state the boundary directly.
- Updated `datasets/deposits-seed/v0.1.1/README.md` to state that the changed-output fixture is not derived from real bank data.
- Added `app/scripts/test-content-qa.ts`, which validates required-tool declarations, optional-tool boundary language, regulatory-context link coverage, regulation disclaimer language, tutorial synthetic-data language, dataset synthetic-only README/metadata language, and internal Markdown links.
- Added `bun test:content-qa` at root and app levels.
- Added Makefile `test-content-qa` and included it in `make test` / `make check`.
- Added a CI workflow step for `bun test:content-qa`.
- Ran `bun test:content-qa`; the first run failed because the new check rejected "no Google Cloud CLI" wording, so the assertion was tightened to block required CLI/key wording while allowing explicit no-CLI boundaries.
- Ran `bun test:content-qa`; the second run failed because `regulations/README.md` did not include the exact model-risk disclaimer boundary, so the disclaimer was updated and the test reran successfully.
- Ran text-search checks for tutorial synthetic-data language and regulation disclaimer language; no gaps remained.
- Ran `bun validate:manifests`, `bun typecheck`, `bun lint`, and `bun build`; they passed.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture golden tests, cloud-evidence tests, progress-export tests, content QA, validator tests, production build, and static-link validation passed.
- The production build still reports Vite's existing non-failing large DuckDB-WASM chunk warning.
- Updated Task 017 with completion and verification notes.

- Started and completed Task 016 implementation.
- Added `looker-bi-gym.progress-export.v1` via `buildLearnerProgressExport` in `app/src/progress.ts`.
- The export includes completed challenge IDs, local flags, completion timestamps, dataset IDs and versions, app/content version, passed check/question IDs, privacy boundary fields, and optional learner notes only when the learner types them.
- Added a Settings progress export panel in `app/src/App.tsx` with:
  - optional learner notes;
  - JSON preview before download;
  - local JSON download action;
  - explicit privacy copy;
  - documented import behavior: import is not implemented in this static release.
- Updated Settings reset copy to clarify that resetting browser progress does not delete exported JSON files already saved outside the browser.
- Added export styling in `app/src/styles.css`.
- Added `app/scripts/test-progress-export.ts`, which completes a representative challenge in memory, validates the export JSON structure, checks IDs/flags/timestamps/dataset versions, verifies optional notes behavior, resets local progress, confirms the built export remains separate from storage, and checks that credentials, storage keys, raw answers, sensitive synthetic field names, and hidden internals are not exported.
- Added `bun test:progress-export` at root and app levels.
- Added Makefile `test-progress-export` and included it in `make test` / `make check`.
- Added a CI workflow step for `bun test:progress-export`.
- Updated `app/README.md` with the progress export format, local-only privacy boundary, preview behavior, and no-import note.
- Ran `bun test:progress-export`; the first run failed because the test incorrectly rejected the explicit privacy field name `includes_credentials: false`; tightened the assertion to reject actual secret-like content and reran successfully.
- Ran `bun typecheck`; it passed.
- Ran `bun lint`; the first run failed on unnecessary optional chaining in `test-progress-export.ts`; tightened the test fixture narrowing and reran successfully.
- Ran `bun build`; it passed with Vite's existing non-failing large DuckDB-WASM chunk warning.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture golden tests, cloud-evidence tests, progress-export tests, validator tests, production build, and static-link validation passed.
- Updated Task 016 with completion and verification notes.

- Started and completed Task 015 implementation.
- Added committed solution fixtures under `challenges/solution-fixtures/`:
  - `orientation-quiz/known-good.json`;
  - `first-banking-dataset/known-good.json` and `known-good.sql`;
  - `first-banking-dataset/known-bad-account-grain.json` and `known-bad-account-grain.sql`;
  - `account-owner-fanout/known-good.json` and `known-good.sql`;
  - `account-owner-fanout/known-bad-naive-owner-fanout.json` and `known-bad-naive-owner-fanout.sql`;
  - `looker-studio-evidence/known-good.json`.
- Added `challenges/solution-fixtures/README.md` documenting fixture structure, coverage requirements, dataset version pins, and `deposits-seed/v0.1.1` refresh implications.
- Added `app/scripts/test-solution-fixtures.ts`, which:
  - loads released YAML manifests;
  - loads committed fixture JSON/SQL files;
  - enforces known-good fixture coverage for every released manifest;
  - enforces known-bad fixture coverage for CTF/trap challenges;
  - verifies browser SQL fixture dataset pins against manifest dataset references;
  - evaluates quiz answers, browser SQL result validators, cloud-evidence checks, and challenge questions without browser storage.
- Moved inline SQL known-good/known-bad golden cases out of `app/scripts/test-sql.ts`; that script now remains focused on DuckDB-WASM Node runtime smoke coverage.
- Added `bun test:fixtures` at the root and app package levels.
- Added Makefile `test-fixtures` and included it in `make test` / `make check`.
- Added a CI workflow step for `bun test:fixtures`.
- Updated `challenges/AUTHORING.md` and `challenges/README.md` to point authors at solution fixtures and the new release coverage rule.
- Ran `bun test:fixtures`; it passed with 6 solution fixtures for 4 released challenges.
- Ran `bun typecheck`; it initially failed on strict JSON narrowing and exact optional property handling in `test-solution-fixtures.ts`; tightened parsing and reran successfully.
- Ran `bun lint`; it initially failed on unsafe narrowing, exhaustive switch handling, boolean template formatting, and console output in `test-solution-fixtures.ts`; fixed those issues and reran successfully.
- Ran `bun test:sql`, `bun test:quiz`, `bun test:cloud-evidence`, and `bun test:validators`; they passed.
- Temporarily changed `first-banking-dataset/known-good.sql` to return `COUNT(*) + 1`; `bun test:fixtures` failed as expected, then the fixture was restored.
- Temporarily changed `account-owner-fanout/known-bad-naive-owner-fanout.sql` into a passing solution; `bun test:fixtures` failed because the known-bad fixture passed, then the fixture was restored.
- Ran `bun build`; it passed with Vite's existing non-failing large DuckDB-WASM chunk warning.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture golden tests, cloud-evidence tests, validator tests, production build, and static-link validation passed.
- Updated Task 015 with completion and verification notes.

- Started and completed Task 014 implementation.
- Added `datasets/VERSIONING.md` with dataset immutability rules, metadata expectations, changed-output rules, and fixture-refresh records.
- Added `datasets/EXPANSION_ROADMAP.md` covering:
  - lending and credit risk;
  - payments/cards, PSD2, and fraud;
  - AML/CFT and sanctions;
  - finance, GL, and reconciliation;
  - DORA, operations, and BI observability.
- Updated `datasets/README.md` to link versioning/roadmap docs and list the changed-output simulation.
- Marked `datasets/deposits-seed/v0.1.0/metadata.json` as released and immutable.
- Added `datasets/deposits-seed/v0.1.1/` as a synthetic changed-output simulation:
  - copied the seed dataset structure;
  - added `2026-04-01` account daily balance rows;
  - updated row counts, control totals, and fanout negative-test totals;
  - recorded that `first-banking-dataset` and `account-owner-fanout` fixtures/checks would need refresh if challenges are repointed.
- Generalized `app/scripts/validate-datasets.ts` so it discovers every committed `datasets/{dataset_id}/{version}/metadata.json` and validates identity, version format, synthetic-only flags, regulatory tags, table grains, primary keys, sensitive-field declarations, row counts, relationships, control totals, known issues, fanout negative tests, and versioning metadata.
- Updated Task 015 notes to carry forward the fixture-refresh implications of `deposits-seed/v0.1.1`.
- Ran `bun validate:datasets`; it passed.
- Ran `bun validate:manifests`; it passed and confirmed released manifests still resolve dataset references.
- Ran `bun typecheck`; it passed.
- Ran `bun test:sql`; it passed with released challenges still pinned to `deposits-seed` `v0.1.0`.
- Ran `bun lint`; the first post-edit run failed on a `@typescript-eslint/array-type` style issue in `validate-datasets.ts`; changed the non-simple array type to `ReadonlyArray`.
- Reran `bun lint`; it passed.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, production build, and static-link validation passed.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- Updated Task 014 with completion and verification notes.

- Started and completed Task 013 implementation.
- Added app quality/accessibility improvements:
  - skip link to main content;
  - route-change focus management for hash navigation;
  - stronger shared focus-visible styles for links, buttons, inputs, textareas, and details summaries;
  - visible labels for numeric challenge answers and the SQL editor;
  - clearer SQL runtime loading, error, disabled, and running status messages.
- Added `app/public/favicon.svg` and linked it from `app/index.html`, fixing the production-preview browser console/network 404 for `/favicon.ico`.
- Added browser compatibility and no-third-party-analytics notes to `app/README.md`.
- Added `docs/10-app-quality-browser-qa.md` and linked it from `docs/README.md`.
- Ran `bun typecheck`; it passed.
- Ran `bun lint`; it passed.
- Ran `make check`; it passed before the favicon fix and again after the final rebuild.
- Ran `bun preview`; the sandboxed run failed with `listen EPERM: operation not permitted 127.0.0.1:4173`.
- Reran `bun preview` with approval; Vite preview served the built app at `http://127.0.0.1:4173/`.
- Created temporary Chrome DevTools Protocol smoke tooling under `/private/tmp` for verification only.
- Ran the Chrome smoke once; it failed because Chrome requested `/favicon.ico` and the built preview returned 404.
- Added the favicon, rebuilt with `bun build`, and reran the Chrome smoke successfully.
- Chrome 148 smoke verification covered home, docs, challenge index, orientation quiz, SQL challenge, cloud-evidence route, skip-link focus, route focus, unlabeled controls, SQL query execution, 390 px responsive layout, console errors, and unexpected external/mutation network requests.
- Ran `rg` source inspection for `fetch`, `XMLHttpRequest`, `sendBeacon`, WebSocket, analytics, telemetry, and local storage boundaries. No external learner-data transmission paths were found; the app uses browser-local `localStorage`, DuckDB `registerFileText`, and a local DuckDB Web Worker.
- Tried Safari verification through `safaridriver`; it failed because Safari's persistent "Allow remote automation" setting is disabled.
- Tried `safaridriver --enable`; the escalation was rejected because enabling Safari WebDriver remote automation is a persistent security-setting change requiring explicit user authorization.
- Stopped the approved Vite preview server and confirmed `127.0.0.1:4173` was no longer reachable.
- Updated Task 013 with implementation and verification notes.

- Started and completed Task 012 implementation.
- Added `.github/workflows/ci.yml` with a `bun` CI gate for:
  - frozen-lockfile install
  - challenge manifest validation
  - synthetic dataset validation
  - lint
  - typecheck
  - quiz, SQL, cloud-evidence, and validator tests
  - production build
  - built static asset-link validation
- Added `.github/workflows/pages.yml` to build `app/dist`, upload it as the GitHub Pages artifact, and deploy through the `github-pages` environment.
- Added `app/scripts/validate-static-links.ts`.
- Added root/app `validate:static-links` scripts and the Makefile target.
- Updated `make check` and `bun check` to run built static asset-link validation after the production build.
- Updated `app/scripts/validate-challenge-manifests.ts` so declared dataset IDs and versions must resolve to `datasets/{dataset_id}/{dataset_version}/metadata.json`.
- Added `docs/09-github-pages-deployment.md` and linked it from `docs/README.md`.
- Expanded `app/README.md` with GitHub Actions, Pages setup, `GITHUB_PAGES_BASE`, and post-deploy verification notes.
- Ran `bun validate:manifests`; it passed with dataset-reference validation.
- Ran `bun validate:datasets`; it passed.
- Ran `bun lint`; the first run failed because `validate-static-links.ts` threw a replacement error without preserving the caught cause. Added the cause and reran successfully.
- Ran `bun typecheck`; it passed.
- Ran `bun test:quiz`, `bun test:sql`, `bun test:cloud-evidence`, and `bun test:validators`; they passed.
- Ran `bun build`; it passed with Vite's non-failing large DuckDB-WASM chunk warning.
- Ran `CI=true bun install --frozen-lockfile`; the sandboxed run failed with `ENOTFOUND package registry`, then the approved network run passed. The first plain `bun install --frozen-lockfile` attempt also failed because bun refused a non-TTY module purge without `CI=true`.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, production build, and static-link validation passed.
- Temporarily changed `challenges/manifests/first-banking-dataset.yaml` to reference `dataset_version: v9.9.9`; `bun validate:manifests` failed with the expected missing dataset reference error. Restored the manifest and reran `bun validate:manifests`; it passed.
- Ran `GITHUB_PAGES_BASE=/looker-bi-gym/ bun build`; it passed.
- Ran `GITHUB_PAGES_BASE=/looker-bi-gym/ bun validate:static-links`; it passed.
- Reran default `bun build` and `bun validate:static-links`; both passed.
- Updated Task 012 with implementation and verification notes. Live GitHub Pages URL and deep-link verification remain pending until the workflow runs in GitHub.

- Started and completed Task 011.
- Added `challenges/AUTHORING.md` with:
  - challenge mode selection rules
  - manifest field reference
  - validator reference
  - dataset reference for `deposits-seed` `v0.1.0`
  - required-tools policy
  - tutorial conversion checklist
  - quiz, browser SQL, and cloud-evidence templates
  - explicit warnings against real banking data, credentials, secrets, API keys, esoteric tooling, and highly platform-specific tooling
- Added validation-only draft manifest `challenges/drafts/minimal-authoring-draft.yaml` created from the guide.
- Updated `app/scripts/validate-challenge-manifests.ts` so `challenges/drafts/` YAML files are schema-validated and included in unique-ID checks, but only `challenges/manifests/` files are emitted to ignored `app/src/generated/challengeCatalog.json`.
- Updated `challenges/README.md` to link the authoring guide and explain draft validation behavior.
- Ran `bun validate:manifests`; it passed with the draft included.
- Ran `bun build`; it passed with draft validation in the build path.
- Verified with `rg` that the draft ID is absent from the generated browser catalog.
- Verified with `rg` that the guide links to dataset, regulation, task, tutorial, and manifest-schema references.
- Verified with `rg` that the guide includes required safety and required-tools policy language.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, and production build passed.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- Updated Task 011 with completion and verification notes.

- Started and completed Task 010.
- Added local cloud-evidence parsing and validation in `app/src/cloudEvidence.ts`.
- Added validators for:
  - SQL text containing required table/view names.
  - pasted CSV/JSON tabular evidence with required columns.
  - numeric evidence within configured ranges.
  - report URL format with HTTPS and allowed host checks.
  - checklist confirmation.
  - basic text evidence matching.
- Added the cloud-evidence challenge page to `app/src/App.tsx`.
- Added evidence input components for:
  - SQL text.
  - pasted CSV/JSON result.
  - numeric value.
  - report URL.
  - checklist confirmation.
- The cloud-evidence page renders challenge instructions, evidence fields, credential-boundary questions, validation results, local completion flags, and a visible separation between mechanically verified and self-attested evidence.
- Expanded the challenge manifest schema and shared manifest types for richer evidence fields and cloud-evidence check types.
- Updated `challenges/manifests/looker-studio-evidence.yaml` into `030 - Looker Studio Evidence Pattern`.
- Added `app/scripts/test-cloud-evidence.ts` and wired `bun test:cloud-evidence` into root/app scripts and `make test` / `make check`.
- Ran `bun validate:manifests`; it passed.
- Ran `bun test:cloud-evidence`; it passed.
- Ran `bun typecheck`; the first attempt failed because a test fixture accessed `control_result` through dot notation and did not narrow an optional indexed value. Updated the test to use bracket access and explicit narrowing, then it passed.
- Ran `bun lint`; the first attempt failed because of unnecessary parse-result conditionals and a possible undefined string concatenation in the CSV parser. Updated the parser/test structure, then it passed.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, and production build passed.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- Verified by source inspection that cloud-evidence processing added no network calls and uses local React state plus the existing local progress storage only.
- Verified by source inspection that the app does not request credentials, tokens, secrets, API keys, service account keys, or OAuth tokens.
- Updated Task 010 with completion and verification notes.

- Started and completed Task 009.
- Added Challenge 020, `020 - Account Owner Fanout CTF`, in `challenges/manifests/account-owner-fanout.yaml`.
- Updated Challenge 000 and 010 titles to match the numbered browser challenge sequence:
  - `000 - Orientation Quiz`
  - `010 - First Banking Dataset Inspection`
  - `020 - Account Owner Fanout CTF`
- Corrected the first dataset inspection challenge:
  - The starter SQL now uses `currency_code` instead of a non-existent `currency` column.
  - The scalar row-count check now expects the actual 18 seed balance rows instead of 12.
  - The next challenge points to the fanout CTF.
- Added manifest-backed learner instructions to quiz and SQL challenge detail pages:
  - scenario
  - inputs
  - outputs
  - required checks
  - flag criteria
  - hints
- Added challenge-specific starter SQL for the fanout challenge.
- Sorted the app challenge catalog by numbered title so the browser sequence appears as 000, 010, 020, then the later cloud-evidence challenge.
- Expanded `app/scripts/test-sql.ts` so it runs manifest-backed known-good and known-bad SQL fixtures for:
  - `first-banking-dataset`
  - `account-owner-fanout`
- Ran `bun validate:manifests`; it passed.
- Ran `bun test:quiz`; it passed.
- Ran `bun test:validators`; it passed.
- Ran `bun test:sql`; the first attempt failed because DuckDB aggregate `SUM` values were not plain numeric values in the Node test runtime.
- Updated the fanout starter and SQL fixtures to cast aggregate totals to `DOUBLE`.
- Reran `bun test:sql`; it passed.
- Ran `bun lint`; the first attempt failed while testing a broader validator numeric coercion change, then passed after removing that unnecessary validator change and casting fanout aggregates explicitly.
- Ran `bun typecheck`; it passed.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, validator tests, and production build passed.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- Tried `bun preview` in the sandbox; it failed with `listen EPERM: operation not permitted 127.0.0.1:4173`.
- Reran `bun preview` with approval; Vite preview served the built app at `http://127.0.0.1:4173/`.
- Launched headless Chrome with approval for built-site verification.
- Ran a Chrome DevTools Protocol verification against the built preview:
  - completed `000 - Orientation Quiz`
  - completed `010 - First Banking Dataset Inspection`
  - completed `020 - Account Owner Fanout CTF`
  - verified all three browser challenge flags were stored in local progress
  - verified the challenge index showed all three browser challenges as complete
- Stopped the Vite preview and headless Chrome processes after verification.
- Confirmed the preview server was no longer reachable on `127.0.0.1:4173`.
- Updated Task 009 with completion and verification notes.

- Started and completed Task 008.
- Added reusable browser-side SQL/data validation in `app/src/validators.ts`.
- Added validators for:
  - required columns
  - forbidden columns
  - row count
  - unique key
  - scalar aggregate / aggregate total
  - sensitive-field exclusion
- Added unified browser-local progress storage and local flag generation in `app/src/progress.ts`.
- Migrated completion state away from the old quiz-only storage key, while still reading legacy quiz progress when present.
- Updated quiz completion to write unified progress with local flags.
- Updated the SQL challenge page to:
  - run manifest-backed validators against the submitted result set
  - show pass/fail explanations for every check
  - require the challenge question and required SQL checks before generating a flag
  - persist SQL challenge completion and flags in local storage
- Added Settings reset controls that clear unified progress and legacy quiz progress.
- Expanded the first SQL challenge manifest with row-count, unique-key, scalar-aggregate, and sensitive-field-exclusion checks.
- Expanded the challenge manifest schema with `scalar-aggregate` and `sensitive-field-exclusion` check types.
- Added validator and progress fixtures in `app/scripts/test-validators.ts`.
- Added `test:validators` scripts and Makefile target.
- Ran `bun test:validators`; it passed.
- Ran `bun typecheck`; it passed after removing a node-test import path that pulled Vite browser-only types into the node TypeScript project.
- Ran `bun lint`; it passed.
- Ran `make check`; manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, validator tests, and production build passed.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- Tried `bun dev` in the sandbox; it failed with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- Reran `bun dev` with approval; Vite started at `http://127.0.0.1:5173/`.
- Confirmed the dev server returned HTTP 200 with an approved local `curl`.
- Ran a headless Chrome verification through the Chrome DevTools protocol:
  - completed the orientation quiz
  - verified the orientation flag persisted after reload
  - completed the SQL challenge
  - verified the SQL flag persisted after reload
  - reset progress in Settings
  - verified local progress was cleared
- The first headless Chrome verification attempt completed the app path but failed during temporary Chrome profile cleanup; fixed the cleanup race and reran successfully.
- Stopped the Vite dev server after verification.
- Updated Tasks 006 and 007 to close the prior manual refresh verification gaps.
- Updated Task 008 with completion notes.

- Retried `bun dev`; the sandboxed run still failed with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- Reran `bun dev` with approval; Vite started at `http://127.0.0.1:5173/`.
- Checked for existing browser automation tooling:
  - `bun exec playwright --version` failed because Playwright is not installed.
  - `bun exec vitest --version` failed because Vitest is not installed.
- Confirmed the dev server was no longer reachable after the session ended.
- Added Git discipline to `AGENTS.md`: keep `.gitignore` current and commit after each completed task.
- Expanded `.gitignore` with coverage and local environment file exclusions.
- Updated continuity files so the active task is Task 008 and the commit-after-task rule is recorded.
- Created baseline commit `0ff5263` with the existing verified project state.
- Added a root `Makefile` with targets for:
  - `install`
  - `lint`
  - `typecheck`
  - `validate`
  - `validate-manifests`
  - `validate-datasets`
  - `test`
  - `test-quiz`
  - `test-sql`
  - `build`
  - `check`
  - `dev`
  - `preview`
- Ran `make check`; lint, typecheck, manifest validation, dataset validation, quiz tests, SQL tests, and production build passed.
- The build still reports Vite's non-failing large chunk warning for bundled DuckDB-WASM assets.
- Applied the "do not bundle what can be built locally" rule:
  - Added it to `AGENTS.md`.
  - Ignored locally generated challenge catalog JSON.
  - Changed the manifest validator to create `app/src/generated/` when needed.
  - Updated lint, typecheck, check, and Makefile paths so the generated catalog is rebuilt locally before it is needed.
  - Removed `app/src/generated/challengeCatalog.json` from git tracking.
- Confirmed no `.wasm`, DuckDB worker, or `app/dist/` artifacts are tracked by git.
- Added `*.wasm` to `.gitignore` and recorded that WASM runtime artifacts must come from package dependencies or local build output rather than committed binary files.
- Reran `make check`; lint, typecheck, manifest validation, dataset validation, quiz tests, SQL tests, and production build passed with the generated catalog ignored.

## 2026-05-05

- Created initial BI research docs under `docs/`.
- Reoriented the guide to banking, financial operations, back-office BI, and EU/Romanian context.
- Added `regulations/` with one regulation/framework brief per document.
- Added `tutorials/` with a layered curriculum, predefined data-source contract, and tutorial sketches.
- Created split planning docs:
  - `PLAN.md`
  - `PLAN_BI_TUTORIAL_APP.md`
  - `PLAN_BI_TUTORIAL_TUTORIALS.md`
- Created `tasks/` with numbered implementation tasks.
- Captured project continuity protocol in `AGENTS.md`.
- Added continuity files:
  - `STATUS.md`
  - `WHAT_WE_DID.md`
  - `DO_NEXT.md`
  - `BUGS.md`
- Updated task rules to require reviewing/updating continuity docs before and after each task.
- Verified task files include required verification/test sections.
- Audited the plan/task backlog for missing details before implementation.
- Added plan details for YAML source manifests, generated JSON catalog, source dataset location, dataset versioning, golden solution fixtures, progress export, content QA, release versioning, and iterative plan readjustment.
- Added tasks 014-018 for dataset expansion/versioning, solution fixtures/golden tests, progress export, content QA, and release/version tracking.
- Closed Task 001 after running its required verification commands:
  - `rg -n "PLAN_BI_TUTORIAL_APP|PLAN_BI_TUTORIAL_TUTORIALS|tasks/README" PLAN.md`
  - `rg --files tasks`
  - `rg -L "^## Tests" tasks/*.md`
  - `rg -L "^## Verification" tasks/*.md`
  - `rg -n "Before starting any task|After finishing or pausing any task|BUGS.md" AGENTS.md tasks/README.md`
- Added Task 001 verification notes and marked it complete.
- Started and completed Task 002.
- Added root `package.json`, `legacy workspace file`, and `.gitignore`.
- Created the static app under `app/`:
  - `app/package.json`
  - `app/index.html`
  - `app/vite.config.ts`
  - `app/tsconfig.json`
  - `app/tsconfig.node.json`
  - `app/src/main.tsx`
  - `app/src/App.tsx`
  - `app/src/styles.css`
  - `app/README.md`
- Built a React + TypeScript + Vite shell with hash routes for Home, Docs, Regulations, Tutorials, Challenges, and Settings.
- Added visible UI statements for synthetic data, browser-local state, no backend, no credentials, and explicit optional-tool requirements.
- Installed `Bun` globally because `bun` and `corepack` were not available on PATH.
- Ran `bun install`; the first sandboxed attempt failed with `ENOTFOUND package registry`, then the approved network run succeeded.
- Ran `bun typecheck`; initial run failed because `vite.config.ts` needed Node type definitions. Added `@types/node` and reran successfully.
- Ran `bun build`; it passed.
- Ran `bun preview`; the sandboxed attempt failed with `listen EPERM` on localhost, then the approved run served the app at `http://127.0.0.1:4173/`.
- Changed the default production Vite base path from `/looker-bi-gym/` to relative `./` after local preview showed absolute project-path assets were awkward to verify locally. `GITHUB_PAGES_BASE` remains available for deployments that require absolute asset URLs.
- Verified served HTML and built JS assets returned HTTP 200 from the local preview server.
- Started and completed Task 003.
- Added `marked` for Markdown rendering.
- Added `app/src/content.ts` to load `docs/`, `regulations/`, and `tutorials/` Markdown files via Vite raw imports.
- Added `app/src/markdown.ts` to render Markdown, rewrite internal `.md` links to hash routes, and label external links.
- Replaced the placeholder Docs, Regulations, and Tutorials pages with document indexes backed by existing Markdown source files.
- Added strong domain types for content sections, content documents, routes, and work items.
- Added type-aware ESLint with pedantic rules:
  - no `any`
  - no broad `object`, `Object`, or `{}` types
  - no TypeScript suppression comments
  - no non-null assertions
  - no unsafe assignments/calls/member access/arguments/returns
  - no inline dynamic imports
  - separate type imports
  - zero warnings
- Tightened TypeScript compiler settings with additional strict flags including `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and `noPropertyAccessFromIndexSignature`.
- Added root/app `lint` and `check` scripts.
- Queried package registry live for current top-level package versions and updated exact pins:
  - `react@19.2.5`
  - `react-dom@19.2.5`
  - `vite@8.0.10`
  - `@vitejs/plugin-react@6.0.1`
  - `typescript@6.0.3`
  - `Bun`
  - plus current direct lint/type packages used by app/tooling code.
- Moved build/tooling imports to top-level `devDependencies` and kept runtime imports in top-level `dependencies`.
- Verified every external package imported by app source, Vite config, or ESLint config is directly declared in `app/package.json`.
- Ran `bun check`; lint, typecheck, and build passed.
- Ran `bun outdated --recursive`; no outdated top-level packages were reported.

## Tried And Failed

- The first `bun install` attempt failed in the sandbox because registry DNS/network access was blocked. Reran with approval and succeeded.
- The first `bun typecheck` attempt failed because `vite.config.ts` referenced `process.env` without Node types. Added `@types/node` and succeeded.
- The first `bun preview` attempt failed in the sandbox because localhost binding was blocked. Reran with approval and succeeded.
- The initial absolute GitHub Pages base path made Vite preview serve awkward asset URLs locally. Switched the default build base to relative paths and documented the override.
- Initial strict lint/typecheck runs surfaced issues with optional properties, nullable checks, broad environment access, and TypeScript project scoping. Fixed the code/config instead of relaxing the rules.
- Initial large patch for the plan/task additions failed because one context block in `PLAN_BI_TUTORIAL_APP.md` did not match exactly. Reapplied the changes in smaller patches successfully.

## Task 004 - Challenge Manifest Schema

- Started and completed Task 004.
- Added challenge manifest authoring docs in `challenges/README.md`.
- Added machine-readable JSON Schema in `challenges/schema/challenge-manifest.schema.json`.
- Added valid YAML example manifests for:
  - `quiz`: `challenges/manifests/orientation-quiz.yaml`
  - `browser-sql`: `challenges/manifests/first-banking-dataset.yaml`
  - `cloud-evidence`: `challenges/manifests/looker-studio-evidence.yaml`
- Added intentionally invalid validation fixture: `challenges/fixtures/invalid-manifest.yaml`.
- Added shared challenge manifest types in `app/src/challengeTypes.ts`.
- Added app challenge catalog loader/formatters in `app/src/challenges.ts`.
- Added generated browser catalog at `app/src/generated/challengeCatalog.json`.
- Added TypeScript manifest validation/generation script at `app/scripts/validate-challenge-manifests.ts`.
- Added root and app `validate:manifests` scripts.
- Updated the app Challenges page to render from generated manifests instead of hard-coded placeholder challenge cards.
- Added direct app dev dependencies for validation tooling after live package registry checks:
  - `ajv@8.20.0`
  - `tsx@4.21.0`
  - `yaml@2.8.4`
- Updated `legacy lockfile` with `bun install`.
- Ran `bun validate:manifests`; it passed and regenerated the challenge catalog.
- Ran `bun check`; lint, typecheck, manifest validation, and Vite build passed.
- Confirmed built assets and generated catalog contain the three example challenge titles.
- Confirmed generated manifests include required fields and `required_tools`.

## Task 004 Tried And Failed

- The first `bun view ajv version && bun view yaml version && bun view tsx version` attempt failed in the sandbox with `ENOTFOUND package registry`. Reran with approved network access and confirmed current exact versions.
- The first `bun install` attempt failed because bun could not purge modules without a TTY.
- The `CI=true bun install` attempt failed because CI mode enabled frozen lockfile checks after package metadata changed.
- The `CI=true bun install --no-frozen-lockfile` attempt failed in the sandbox with registry DNS errors. Reran with approved network access and succeeded.
- The first `bun validate:manifests` attempt failed because the `tsx` CLI opened an IPC pipe blocked by the sandbox. Switched the script to `node --import tsx scripts/validate-challenge-manifests.ts`, which runs in the sandbox.
- The first direct validator run exposed Ajv strict schema handling for union `type` arrays. Enabled `allowUnionTypes` explicitly.
- The first `bun check` attempt failed lint because the validator function was typed too loosely around `validate.errors`. Switched to Ajv's `ValidateFunction`.
- The second `bun check` attempt failed typecheck because the parsed JSON Schema was still `unknown`. Typed that boundary as Ajv's `AnySchema`.

## Task 005 - Synthetic Dataset Seed

- Started and completed Task 005.
- Added dataset root documentation in `datasets/README.md`.
- Added the first dataset under `datasets/deposits-seed/v0.1.0/`.
- Added CSV source files for:
  - `raw_ref.branches`: `branches.csv`
  - `raw_ref.products`: `products.csv`
  - `raw_deposits.accounts`: `accounts.csv`
  - `raw_deposits.account_owners`: `account_owners.csv`
  - `raw_deposits.account_daily_balances`: `account_daily_balances.csv`
- Added dataset metadata in `datasets/deposits-seed/v0.1.0/metadata.json`.
- Added the dataset data dictionary, control totals, and BI trap notes in `datasets/deposits-seed/v0.1.0/README.md`.
- Included Romanian/EU banking flavor:
  - RON/EUR balances.
  - Bucuresti, Cluj-Napoca, Iasi, Timisoara, and Brasov branch geography.
  - BNR, FGDB, and GDPR context tags.
- Included intentional BI/CTF traps:
  - Many-to-many account ownership that multiplies balances under naive joins.
  - Sensitive serving-output fields: `account_id`, `customer_id`, and `synthetic_iban`.
  - Missing branch mapping: account `A1006` references branch `B999`.
  - Ownership share issue: account `A1005` totals 110 percent ownership.
  - Semi-additive daily balance snapshots.
- Added `app/scripts/validate-datasets.ts`.
- Added root and app `validate:datasets` scripts.
- Updated app build to run `bun validate:manifests`, `bun validate:datasets`, typecheck, and Vite build.
- Aligned `challenges/manifests/first-banking-dataset.yaml` with the final seed table names:
  - `account_owners`
  - `account_daily_balances`
- Regenerated `app/src/generated/challengeCatalog.json`.
- Ran `bun validate:datasets`; it passed.
- Ran `bun validate:manifests`; it passed after manifest alignment.
- Ran `bun check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 005 Tried And Failed

- The first `bun validate:datasets` run failed because `A1006` had balances but no owner row, so the naive owner join dropped that account and produced `159800` instead of the expected `164800`. Added owner `C0008` for `A1006` and updated the owner row count.
- The first `bun check` after adding dataset validation failed lint on a nested readonly array type in `validate-datasets.ts`. Changed it to `ReadonlyArray<Readonly<Record<string, string>>>`.

## Task 006 - Quiz Challenge Runtime

- Started Task 006.
- Added browser quiz grading logic in `app/src/quiz.ts`.
- Added support for:
  - Multiple-choice answers.
  - Select-all answers with order-insensitive exact matching.
  - Numeric answers with configured tolerance.
- Added `app/scripts/test-quiz.ts` for deterministic quiz evaluator tests.
- Added root and app `test:quiz` scripts.
- Updated the orientation quiz manifest with select-all and numeric questions so all supported quiz answer types are represented.
- Regenerated `app/src/generated/challengeCatalog.json` with `bun validate:manifests`.
- Updated the Challenges page so cards link to `#/challenges/{challenge-id}` detail routes.
- Added a quiz challenge detail renderer for `quiz` manifests.
- Added browser-local answer state and per-question feedback.
- Added a narrow quiz completion store in browser `localStorage` under `looker-bi-gym.quiz-progress.v1`.
- Added a non-quiz challenge detail placeholder for later runtime tasks.
- Ran `bun test:quiz`; it passed.
- Ran `bun validate:manifests`; it passed.
- Ran `bun check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 006 Tried And Failed

- The first `bun check` after adding quiz UI failed lint because `Array.isArray` narrowed a quiz response to an unsafe array type. Reworked the helper to narrow the `QuizResponse` union without unsafe array return.
- `bun dev` failed in the sandbox with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- An escalated `bun dev` request was rejected by the environment, so manual browser completion and refresh verification could not be run in this turn.

## Task 007 - Browser SQL Runtime

- Started Task 007.
- Added a browser-side DuckDB-WASM runtime in `app/src/sqlRuntime.ts`.
- Added a static seed dataset loader in `app/src/seedDataset.ts` that imports the synthetic deposits CSV files.
- Integrated DuckDB-WASM into the app using local Vite-bundled worker and wasm assets.
- Added browser SQL support to the Challenges page for `browser-sql` manifests.
- Added a schema browser, SQL editor, query result table, and SQL error display.
- Added bounded preview-query execution so large result sets are capped in the UI.
- Added `app/scripts/test-sql.ts` for offline SQL smoke tests using the node-blocking DuckDB-WASM bindings.
- Added root and app `test:sql` scripts.
- Added the `@duckdb/duckdb-wasm` dependency.
- Ran `bun test:sql`; it passed.
- Ran `bun test:quiz`; it passed.
- Ran `bun check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 007 Tried And Failed

- The first `bun test:sql` run failed because the node-blocking bindings needed an explicit instantiate step before `connect()`. Added the instantiate call and reran successfully.
- The first `bun check` after adding the SQL runtime failed lint on array type conventions, direct React state updates in an effect, and object stringification. Tightened the types, removed the effect-local loading reset, and switched the result formatter to explicit primitive handling.
- `bun dev` still cannot bind `127.0.0.1:5173` in the sandbox, so manual browser refresh verification remains pending.
- The escalated `bun dev` request was rejected by the environment, so the browser refresh check could not be run here.

## Task 024 - Deterministic Local Dataset Packs

- Continued Task 024 on branch `deterministic-local-dataset-packs`.
- Added `datasets/lending-month-end/v0.1.0/` with committed synthetic CSVs for:
  - `branches.csv`
  - `loan_products.csv`
  - `loan_accounts.csv`
  - `loan_monthly_snapshots.csv`
  - `collateral.csv`
- Added lending metadata with synthetic-only declaration, schema/grain contracts,
  row counts, primary keys, sensitive fields, date semantics, relationships,
  generic control-total checks, known-trap checks, regulatory context tags, and
  fixture refresh rules.
- Added `app/src/datasetRegistry.ts` so browser SQL challenges can load the
  dataset declared in their manifest from committed dataset metadata.
- Updated `app/src/sqlRuntime.ts` to cache DuckDB runtimes per dataset pack
  instead of loading only the deposits seed.
- Updated `app/src/App.tsx` so SQL challenges display the active dataset, load
  challenge tables, offer table sample buttons from the runtime schema, and
  start the lending snapshot challenge with a relevant SQL starter query.
- Extended `app/scripts/validate-datasets.ts` with generic control-total checks
  and known-trap checks while preserving deposits-specific control checks when
  present.
- Added released challenge
  `challenges/manifests/lending-month-end-snapshots.yaml` with fact-backed
  questions, step-by-step lesson instructions, deterministic SQL checks, and
  browser-only required tools.
- Added a known-good solution fixture under
  `challenges/solution-fixtures/lending-month-end-snapshots/`.
- Corrected `aggregate-total` validator behavior to sum a numeric column across
  result rows while keeping `scalar-aggregate` as the one-row validator.
- Improved solution fixture assertion messages so failed fixture checks list
  their check statuses and messages.
- Updated dataset, fixture, authoring, roadmap, changelog, and continuity
  documentation.
- Confirmed `.gitignore` already excludes generated catalogs, generated SQLite,
  build output, dependency directories, logs, environment files, TypeScript build
  info, and WASM runtime artifacts.
- Confirmed generated outputs remain ignored:
  - `app/dist/`
  - `app/src/generated/challengeCatalog.json`
  - `app/src/generated/facts.sqlite`
- Confirmed no package-lock, pnpm lockfile, yarn lockfile, generated app output,
  or WASM runtime artifacts are tracked.
- Committed the work as `98aaeb4 Add deterministic lending dataset pack`.
- Pushed branch `deterministic-local-dataset-packs`.
- Opened PR #6: `https://github.com/e6qu/looker-bi-gym/pull/6`.
- GitHub Actions `Validate, Test, And Build` passed for the first PR commit in
  1m33s.
- Ran and passed:
  - `bun run validate:datasets`
  - `bun run validate:manifests`
  - `bun run test:fixtures`
  - `bun run test:sql`
  - `bun run test:validators`
  - `bun run test:quiz`
  - `bun run test:cloud-evidence`
  - `bun run test:progress-export`
  - `bun run test:content-qa`
  - `bun run test:facts-db`
  - `bun run test:platform-boundary`
  - `bun run format`
  - `bun run format:check`
  - `bun run lint`
  - `bun run typecheck`
  - `bun run build`
  - `bun run validate:static-links`
  - `bun run check`

## Task 024 Tried And Failed

- The first `bun run test:fixtures` attempt failed because the new challenge
  used `aggregate-total`, but the validator still treated it as a one-row scalar
  check. Split aggregate and scalar validator behavior, added validator coverage,
  and reran successfully.
- The next `bun run test:fixtures` attempt failed because the combined
  `time_sum_delta` expected value was `631500`, while the actual deterministic
  fixture total is `576000`. Corrected the challenge expected value and lesson
  checkpoint, then reran successfully.
- The first `bun run test:content-qa` attempt failed because the new dataset
  README did not match the existing exact real-bank-data rejection pattern.
  Updated the README and relaxed the test pattern to tolerate Markdown line
  wrapping inside "not derived from real bank data".
- The first `bun run check` escalation was rejected by the environment before
  the command started. After the user explicitly approved continuing, reran
  `bun run check`; it passed, including all 8 Playwright rendered UI tests,
  production build, and static-link validation.

## PR #10 Post-Merge Verification And Follow-Up

- Confirmed PR #10 was merged into `main` on 2026-05-10 at merge commit
  `cf8a6bd6b6bb4353bf2f5a15a59e0a4c031d5d59`.
- Confirmed main CI run `25628794041` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25628794041`.
- Confirmed main GitHub Pages deployment run `25628794045` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25628794045`.
- Confirmed the live Pages app returned HTTP 200 at
  `https://e6qu.github.io/looker-bi-gym/`.
- Created follow-up branch `record-pr10-postmerge` from updated `main`; no
  work was pushed to `main`.
- Ran deployed UI click-through scripts against the live GitHub Pages app and
  saved screenshots locally under ignored `screenshots/post-merge-pr10/`.
- Manually reviewed screenshots for:
  - desktop and mobile home rendering;
  - challenge catalog and `050 - Deposit Metric Contract Review`;
  - metric-contract completion with local flag;
  - learner task rendering;
  - browser-SQL chart rendering and completed SQL flag path;
  - cloud-evidence completion;
  - Settings export/reset UI and local JSON preview.
- Asked subagent `019e11e5-8c33-7ea3-b8a4-7cab11969cbf` for learner-flow and
  exam feedback. Key findings:
  - the main browser-first learner path needed to be more visible;
  - optional cloud/applied-track pages needed clearer labeling;
  - `tutorials/data-sources.md` overmixed available browser tables and planned
    warehouse design targets;
  - `LT-SQL-003` omitted required expected-result columns;
  - `LT-DQ-005` and `LT-SQL-003` referenced the wrong challenge title;
  - some learner-facing text still sounded like implementation notes;
  - the Looker Studio evidence challenge needed clearer "local format evidence"
    wording.
- Updated tutorial pages so tutorial-like content has a top `Objective:` and
  "After this tutorial/task/recipe/page, you will be able to:" block.
- Added a visible browser-first path in `tutorials/README.md`:
  orientation, LT-BI-001, LT-BI-002, LT-SQL-003, LT-LOOKER-004, LT-DQ-005,
  quiz bank, and exam mode.
- Added rendered learner-facing pages for:
  - `tutorials/quiz-bank.md`
  - `tutorials/exam-mode.md`
- Clarified that the 00-09 tutorial sequence includes reference/applied-track
  material and that the browser-first path is the main GitHub Pages learner
  sequence.
- Split `tutorials/data-sources.md` between browser-loaded tables available now
  and warehouse design targets.
- Corrected `LT-SQL-003` expected-result table to include
  `stage3_principal_total` and `latest_property_valuation_total_eur`.
- Corrected `LT-DQ-005` expected snapshot control output to match the committed
  lending CSV: `snapshot_row_count = 11` and
  `latest_snapshot_row_count = 5`.
- Renamed learner-facing `Solution Notes` sections to `Answer Reference` and
  replaced "fixture-backed repair query" wording with "checked repair query".
- Clarified `030 - Looker Studio Evidence Pattern` as a local evidence-pattern
  simulation unless the learner also completes the optional Looker Studio
  recipe.
- Added rendered-route Playwright coverage for `#/tutorials/quiz-bank.md` and
  `#/tutorials/exam-mode.md`.
- Expanded `bun run test:content-qa` so learner tasks must include the
  objective/outcome block and `Answer Reference`.
- Updated continuity docs and `tasks/026-challenge-grading-contract-expansion.md`
  with the post-merge verification state.
- Committed the follow-up work as `1758111 Polish post-merge learner flows`.
- Pushed branch `record-pr10-postmerge`.
- Opened PR #11: `https://github.com/e6qu/looker-bi-gym/pull/11`.
- Confirmed PR #11 CI run `25629294229` passed in 1m33s.
- After the current PR #11 verification was done, added future-only planning for
  Task 029 - Flashcards And Spaced Repetition. This records topic-separated
  flashcard decks, an Anki-style browser scheduler, browser-local review state,
  explicit review/due datetime timestamps, and single-JSON flashcard state
  export/import as a later phase, not current implementation scope.
- Ran and passed:
  - `bun run validate:manifests`
  - `bun run test:content-qa`
  - `bun run format`
  - `bun run check` after allowing Vite preview port binding for Playwright.

## PR #10 Post-Merge Tried And Failed

- The first `bun run check` attempt failed when Playwright tried to start Vite
  preview because the sandbox blocked binding `127.0.0.1:4173` with
  `listen EPERM`. Reran the same command with local port binding allowed; it
  passed, including all 9 Playwright rendered UI tests, production build, and
  static-link validation.
