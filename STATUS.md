# Status

Last updated: 2026-05-10

## Current State

Planning, documentation, task tracking, continuity protocol, the static app skeleton, Markdown content navigation, challenge manifest validation/catalog generation, the first synthetic deposits dataset, dataset versioning policy, a changed-output dataset simulation, the quiz challenge runtime, the browser SQL runtime, reusable browser validators, local flags, browser-local progress storage with same-site cookie fallback, reset controls, the first three browser-verifiable challenges, the first cloud-evidence challenge pattern, the challenge authoring guide, CI validation, GitHub Pages deployment workflows, the app quality/accessibility pass, solution fixture golden tests, dataset-derived SQL expectation checks, local progress export/completion evidence, the content QA/regulatory disclaimer pass, release versioning/change log, Bun-only repository tooling, typed TypeScript config files under `app/configs/`, Prettier formatting gates, a documented/enforced test pyramid, Playwright rendered user-flow tests, a source-fact register for fact-backed tutorials and quiz questions, rendered step-by-step challenge lesson steps, fact-backed challenge questions, rewritten step-by-step tutorial Markdown, content QA enforcement for source facts, area-organized banking BI facts, downloaded BigQuery/Looker Studio official documentation snapshots, a local SQLite facts database builder/test, deterministic deposits plus lending month-end dataset packs, the platform component map, real learner-task packs, the first separate quiz bank, the first exam-card pack, a Looker Studio recipe, SQL result bar-chart visualization, browser-config JSON grading, and the first metric-contract grading challenge are in place. PR #3 through PR #11 were merged. Tasks 001 through 028 are complete except for Safari second-browser smoke verification from Task 013, which requires the user to explicitly enable Safari remote automation or perform a manual Safari pass. PR #11 merged on 2026-05-10 at merge commit `bd0be4505958f2e33706169dc7816096c7abc617`; main CI and GitHub Pages deployment passed, the live Pages URL returned HTTP 200, and PR #11 recorded the deployed UI manual pass, learner-flow review, subagent feedback, tutorial objective/outcome cleanup, quiz/exam rendered content pages, and corrected lending DQ tutorial checkpoint. The current branch `ci-ui-warning-checks` strengthens CI and rendered UI diagnostics so format checks, fact/workbench/platform tests, derived SQL expectations, and browser-config runtime tests are explicit CI gates, and Playwright rendered UI tests fail on browser console warnings, browser console errors, page errors, and failed network requests. Git discipline requires `.gitignore` maintenance, no committed rebuildable artifacts, no committed WASM runtime artifacts, and a commit after each completed task. A root `Makefile` exposes the repository checks, formatting, tests, question workbench, and manual dreaming targets through `make`.

## Active Task

Active implementation task: CI and browser-warning hardening in PR #12
(`https://github.com/e6qu/looker-bi-gym/pull/12`) from branch
`ci-ui-warning-checks`. PR #11
(`https://github.com/e6qu/looker-bi-gym/pull/11`) is merged and post-merge
verified. This branch is a Task 012/013 follow-up: strengthen GitHub Actions
and the local test pyramid, add automated rendered-browser diagnostics for
warnings/errors/page failures/network failures, and document the new QA
standard. The first local full `bun run check` passed on 2026-05-10 after the
user-approved local Vite/Playwright port binding.

## Current Decisions

- Static GitHub Pages app.
- No backend.
- React + TypeScript + Vite.
- `bun` for repository development.
- Root Bun workspace with app package under `app/`.
- Exact top-level dependency pins are based on live package registry checks.
- Every imported external package must be declared directly in `app/package.json`; do not rely on transitive dependencies.
- Strong TypeScript and type-aware ESLint gates are required for app code.
- App tool configs live in `app/configs/` as TypeScript and are included in `tsconfig.node.json`.
- Prettier is the repository formatter; `bun run format:check` must pass with `bun run lint`, `bun run typecheck`, and `bun run check`.
- Source-backed tutorial and quiz facts live under `docs/facts/`; regulation, banking, BigQuery, Looker Studio, and BI-tooling questions should cite fact IDs.
- Source facts are organized by area files under `docs/facts/`; content QA reads all fact Markdown files, not only the index.
- `sources/` stores source cards and permissively licensed complete official documentation snapshots used by the fact corpus.
- BigQuery and Looker Studio official documentation snapshots are stored as sanitized article HTML inside Markdown files under `sources/platforms/*/full/`.
- Non-permissive BI literature remains source-card-and-short-quote only unless the source license allows full snapshots.
- App-specific implementation facts are not learner facts; the corpus should focus on banking BI, BigQuery, Looker Studio, and official regulatory/banking source material.
- `bun run test:facts-db` builds a local SQLite facts database from `sources/` and `docs/facts/` and validates source/fact links.
- Future challenge datasets must be fully local and deterministic: committed synthetic files or committed deterministic generators, metadata, control totals, known traps, and fixture coverage.
- Romania real-estate collateral exercises use synthetic property/location/valuation data only; official data is limited to committed source-context tables such as Eurostat HPI, not real property rows.
- Optional LLM question generation, LLM review/refinement, and manual dreaming are draft/review aids only. They are manual, write ignored artifacts under `var/llm-workbench/`, and must not auto-edit files or run on a background schedule until explicitly designed later.
- Browser SQL challenges now load the dataset declared by their manifest input instead of assuming only `deposits-seed/v0.1.0`.
- Released tutorials are not considered instruction-complete if they only list generic tasks or investigation questions; they need explicit learner actions, objectives, "after this tutorial/task" outcomes, expected checkpoints, failure modes, and fact-backed explanations.
- The learner-task model is area-grouped, objective-driven, and mechanics-first for a data analyst moving into BI and banking. Current areas are BI fundamentals, BigQuery/SQL for BI, Looker Studio mechanics, and data quality and controls, with banking applications as context.
- Terminology is explicit: `implementation tasks` are numbered repo work items under `tasks/*.md`; `learner tasks` are curriculum exercise units rendered in tutorials/app flows.
- Each learner task takes about 15-20 focused minutes and includes an objective, prerequisites, input dataset, step-by-step instructions, verification checkpoints, visualization/reporting action, optional recipe pointer, self-assessment, and a CTF-style end challenge.
- In-app SQL result visualization is implemented for query results with at least one dimension-like column and one numeric column, using a deterministic table plus bar chart.
- Looker Studio recipes live in `tutorials/recipes/`. They are manual browser-driven recipes first; do not add AWS CLI, Google CLI, or shell upload scripts for the early path.
- If learner-facing scripts are later added, they must be uncomplicated, ShellCheck-verified, work on macOS and Linux, and work from both `bash` and `zsh`.
- The first quiz-bank model is separate from challenge manifests, answerable in about 20 minutes, organized by `easy`, `medium`, and `hard`, and includes recommended learner tasks, source facts, answers, explanations, and self-assessment notes.
- Exam mode starts as untimed, independent challenge cards that a learner can choose from, each up to roughly 2 hours, with self-assessment first and deterministic verification where feasible.
- Flashcards with Anki-style spaced repetition are planned as future Task 029,
  not current PR #11 implementation scope. The intended future model is
  topic-separated decks, fact-backed card content, browser-local review state,
  explicit datetime timestamps for review events and due dates, and single-JSON
  flashcard state export/import.
- Released challenge manifests include rendered `lesson_steps`; every released question and lesson step must cite known `source_facts`.
- Released challenge contracts changed to `v0.2.0` for the fact-backed instruction rewrite.
- The app remains frontend-only: no backend account system, server session, API database, server-side grading, analytics beacon, or learner-data upload.
- Challenge progress is stored in browser `localStorage` and mirrored to a same-site browser cookie for local recovery; reset clears both.
- Settings JSON export is implemented with format `looker-bi-gym.progress-export.v1`.
- JSON import is planned but not implemented: it should be browser-local, validate the export format locally, preview imported evidence, apply only after confirmation, and never upload learner data.
- Vite production builds use relative asset paths by default, with `GITHUB_PAGES_BASE` available for absolute GitHub Pages paths.
- Existing Markdown source files are loaded at build time and routed through hash URLs.
- Challenge manifests are authored as YAML under `challenges/manifests/`.
- Challenge manifests are validated against `challenges/schema/challenge-manifest.schema.json`.
- `bun run validate:manifests` validates YAML examples, verifies the intentionally invalid fixture remains invalid, and locally generates ignored `app/src/generated/challengeCatalog.json`.
- The app challenge index is generated from the static challenge catalog instead of a hard-coded placeholder list.
- Every challenge manifest must declare `required_tools`; browser-only tasks use `none`.
- The first dataset lives at `datasets/deposits-seed/v0.1.0/` and is synthetic CSV only.
- Dataset versions live at `datasets/{dataset_id}/{version}/`, use `vMAJOR.MINOR.PATCH`, and are immutable once used by released challenges.
- `deposits-seed/v0.1.1` is a synthetic changed-output simulation that adds `2026-04-01` balance snapshots; released challenges remain pinned to `v0.1.0`.
- `bun run validate:datasets` discovers committed dataset versions and validates metadata identity, synthetic-only flags, table grains, primary keys, sensitive-field declarations, row counts, expected missing mappings, control totals, known issue counts, versioning metadata, and the deposits owner-join fanout negative test.
- The Vite build runs both manifest and dataset validation before compiling the app.
- `make check` runs lint, typecheck, manifest validation, dataset validation, quiz tests, SQL smoke tests, solution fixture golden tests, cloud-evidence tests, progress-export tests, content QA, validator tests, the production build, and built static asset-link validation.
- GitHub Actions CI runs the same Bun validation, test, build, Playwright, and static-link gates.
- GitHub Pages deployment builds `app/dist` with Bun, uploads it as the Pages artifact, and deploys through the `github-pages` environment. The repository Pages site is enabled for GitHub Actions at `https://e6qu.github.io/looker-bi-gym/`, and `actions/configure-pages` is on the current `v6` major.
- Manifest validation now fails when a declared dataset ID/version does not resolve to a committed dataset metadata file.
- The app quality pass added a skip link, route-change focus management, visible labels for numeric challenge answers and the SQL editor, stronger focus styles, clearer SQL loading/error/running states, a static favicon, browser compatibility notes, and a repeatable browser QA checklist.
- Quiz challenge details render from generated manifests at `#/challenges/{challenge-id}`.
- The quiz runtime grades multiple-choice, select-all, and numeric answers deterministically in the browser.
- Challenge completion state and local flags are stored in browser `localStorage` under `looker-bi-gym.progress.v1`.
- Legacy quiz progress under `looker-bi-gym.quiz-progress.v1` is migrated when present.
- The browser SQL runtime loads the synthetic deposits dataset into DuckDB-WASM, exposes table schemas, and caps preview output for safety.
- Browser SQL result validators support required columns, forbidden columns, row count, unique key, scalar aggregate, and sensitive-field exclusion checks.
- Completing all required checks and questions generates the challenge flag locally.
- Settings includes a reset progress control that clears local progress and legacy quiz progress.
- The first browser challenge sequence is:
  - 000 - Orientation Quiz.
  - 010 - First Banking Dataset Inspection.
  - 020 - Account Owner Fanout CTF.
- The first cloud-evidence challenge is `030 - Looker Studio Evidence Pattern`.
- Cloud-evidence challenges collect evidence locally in the browser and do not request or store credentials.
- Cloud-evidence checks support SQL text contains checks, pasted CSV/JSON required-column checks, numeric ranges, report URL format validation, checklist confirmation, and basic evidence text matching.
- Cloud-evidence challenge detail pages explicitly separate mechanically verified checks from self-attested evidence.
- Browser-config challenges collect learner-authored JSON artifacts locally in
  the browser and grade them without a backend.
- Browser-config checks support required JSON fields, exact field values,
  required array entries, and forbidden array entries.
- Challenge detail pages render manifest-backed scenario, inputs, outputs, checks, flag criteria, and hints.
- Solution fixtures under `challenges/solution-fixtures/` run known-good coverage for every released challenge and expected known-bad coverage for SQL trap challenges.
- Browser SQL solution fixtures pin their dataset ID/version and currently target `deposits-seed/v0.1.0`.
- `bun run test:fixtures` enforces that every released manifest has a known-good fixture or documented exception, and that CTF/trap challenges have known-bad fixture coverage.
- `bun run test:derived-expectations` executes known-good browser-SQL fixtures
  against their pinned committed datasets and verifies exact row-count,
  scalar-aggregate, and aggregate-total manifest expectations.
- The SQL smoke test remains focused on DuckDB-WASM table loading, basic totals, and invalid SQL handling.
- Cloud-evidence parser/validator tests run through `bun run test:cloud-evidence` and `make check`.
- Progress exports use the stable `looker-bi-gym.progress-export.v1` JSON format.
- Settings can export local completion evidence as a user-controlled JSON download and shows a JSON preview before download.
- Progress exports include completed challenge IDs, challenge versions, local flags, completion timestamps, dataset IDs/versions, app/content version, passed check/question IDs, privacy boundary fields, and optional learner notes.
- Progress exports are generated locally from normalized progress state and exclude credentials, raw answers, pasted cloud evidence, sensitive synthetic field names, real banking data, storage keys, and hidden app internals.
- Import is not implemented in the current static release; preview/review behavior is documented in Settings and `app/README.md`.
- `bun run test:progress-export` validates export structure, local-state matching, notes behavior, reset separation, and content boundaries; `make check` includes it.
- `bun run test:content-qa` validates required-tool declarations, regulatory-context links, disclaimer language, synthetic-data boundaries, dataset synthetic-only notes, internal Markdown links, and learner-task objective/outcome blocks; `make check` and CI include it.
- `bun run test:platform-boundary` enforces the frontend-only architecture boundary and verifies the documented test pyramid.
- `bun run test:e2e` runs Playwright rendered user-flow tests against the built static app and covers desktop/mobile home rendering, primary route responsiveness, challenge metadata, orientation quiz completion, localStorage/cookie progress fallback, browser SQL completion, cloud-evidence completion, browser-config metric-contract completion, Settings export/reset behavior, no unexpected external requests, horizontal overflow, control text fit, and no browser console warnings/errors, page errors, or failed network requests during covered flows.
- Challenge detail pages render regulation brief links for regulatory-context tags.
- The first tracked app/content release is `0.1.0`.
- The app footer and Settings page display app version, content version, and build reference. `VITE_BUILD_REF` can provide a CI build label; otherwise the app displays `build local`.
- Challenge manifests now require top-level `version` metadata in `vMAJOR.MINOR.PATCH` format.
- Released and draft challenge manifests currently use `v0.1.0`.
- Release policy lives in `VERSIONING.md`, and release notes live in `CHANGELOG.md`.
- The release checklist requires manifest validation, dataset validation, fixture tests, content QA, Playwright rendered UI tests, `bun run build`, `make check`, and a generated-artifact/git-status review.
- Challenge authoring rules live in `challenges/AUTHORING.md`.
- Draft manifests live in `challenges/drafts/` and are validated by `bun run validate:manifests`, but only `challenges/manifests/` files are emitted to the browser catalog.
- DuckDB-WASM for browser SQL challenges.
- Browser-first learner path.
- Optional cloud-applied track through Google Cloud Console, BigQuery UI, and Looker Studio UI.
- First dataset: small hand-authored CSV deposits/account ownership dataset.
- Synthetic data only.
- Before and after every task, review/update `STATUS.md`, `PLAN.md`, `WHAT_WE_DID.md`, `DO_NEXT.md`, and `BUGS.md`.
- After every task, readjust plans and downstream tasks if implementation shows a blocker or wrong assumption.
- After each completed task, keep `.gitignore` current and commit the task changes to git.
- Do not commit bundled or generated artifacts that can be rebuilt locally from committed source files and repository scripts.
- Do not commit WASM or other binary runtime artifacts when package dependencies or local build commands can supply them.

## Blockers

None known.

## Confidence

High for planning direction, task structure, the app skeleton, Markdown content loading, challenge manifest validation, draft validation, dataset-reference validation, the initial deposits dataset, dataset versioning policy, changed-output dataset simulation, automated quiz grading, the browser SQL runtime, browser validators, local flags, browser-local progress/cookie fallback, reset behavior, progress export/completion evidence, the first browser challenges, the cloud-evidence pattern, the authoring guide, solution fixture golden coverage, content QA/disclaimer coverage, release versioning/change log, Bun-only tooling, typed config layout, Prettier formatting gate, test-pyramid coverage, Playwright rendered user-flow coverage, the Makefile check harness, CI/Pages workflow structure, live GitHub Pages reachability, post-merge workflow health, Chrome app quality smoke coverage, the source-fact-backed tutorial plan, Tasks 020 through 028 local/CI verification, PR #10 deployed UI click-through, and the post-merge learner-flow cleanup branch. Medium for Safari verification until remote automation is explicitly enabled or a manual Safari pass is completed.
