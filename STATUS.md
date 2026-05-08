# Status

Last updated: 2026-05-09

## Current State

Planning, documentation, task tracking, continuity protocol, the static app skeleton, Markdown content navigation, challenge manifest validation/catalog generation, the first synthetic deposits dataset, dataset versioning policy, a changed-output dataset simulation, the quiz challenge runtime, the browser SQL runtime, reusable browser validators, local flags, unified local progress storage, reset controls, the first three browser-verifiable challenges, the first cloud-evidence challenge pattern, the challenge authoring guide, CI validation, GitHub Pages deployment workflows, the app quality/accessibility pass, solution fixture golden tests, local progress export/completion evidence, the content QA/regulatory disclaimer pass, release versioning/change log, Bun-only repository tooling, typed TypeScript config files under `app/configs/`, Prettier formatting gates, and Playwright rendered UI tests are in place. Tasks 001 through 018 are complete except for live post-deploy URL verification, which requires a GitHub workflow run, and Safari second-browser smoke verification, which requires the user to explicitly enable Safari remote automation or perform a manual Safari pass. Git discipline requires `.gitignore` maintenance, no committed rebuildable artifacts, no committed WASM runtime artifacts, and a commit after each completed task. A root `Makefile` exposes the repository checks, formatting, and tests through `make` targets.

## Active Task

Active task: none. Numbered tasks 001 through 018 are complete locally.

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
- GitHub Pages deployment builds `app/dist` with Bun, uploads it as the Pages artifact, and deploys through the `github-pages` environment. `actions/configure-pages` is on the current `v6` major.
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
- Challenge detail pages render manifest-backed scenario, inputs, outputs, checks, flag criteria, and hints.
- Solution fixtures under `challenges/solution-fixtures/` run known-good coverage for every released challenge and expected known-bad coverage for SQL trap challenges.
- Browser SQL solution fixtures pin their dataset ID/version and currently target `deposits-seed/v0.1.0`.
- `bun run test:fixtures` enforces that every released manifest has a known-good fixture or documented exception, and that CTF/trap challenges have known-bad fixture coverage.
- The SQL smoke test remains focused on DuckDB-WASM table loading, basic totals, and invalid SQL handling.
- Cloud-evidence parser/validator tests run through `bun run test:cloud-evidence` and `make check`.
- Progress exports use the stable `looker-bi-gym.progress-export.v1` JSON format.
- Settings can export local completion evidence as a user-controlled JSON download and shows a JSON preview before download.
- Progress exports include completed challenge IDs, challenge versions, local flags, completion timestamps, dataset IDs/versions, app/content version, passed check/question IDs, privacy boundary fields, and optional learner notes.
- Progress exports are generated locally from normalized progress state and exclude credentials, raw answers, pasted cloud evidence, sensitive synthetic field names, real banking data, storage keys, and hidden app internals.
- Import is not implemented in the current static release; preview/review behavior is documented in Settings and `app/README.md`.
- `bun run test:progress-export` validates export structure, local-state matching, notes behavior, reset separation, and content boundaries; `make check` includes it.
- `bun run test:content-qa` validates required-tool declarations, regulatory-context links, disclaimer language, synthetic-data boundaries, dataset synthetic-only notes, and internal Markdown links; `make check` and CI include it.
- `bun run test:e2e` runs Playwright rendered UI tests against the built static app and covers desktop/mobile home rendering, primary route responsiveness, challenge metadata, DuckDB-WASM SQL execution, cloud-evidence controls, Settings export metadata, horizontal overflow, and control text fit.
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

High for planning direction, task structure, the app skeleton, Markdown content loading, challenge manifest validation, draft validation, dataset-reference validation, the initial deposits dataset, dataset versioning policy, changed-output dataset simulation, automated quiz grading, the browser SQL runtime, browser validators, local flags, unified progress storage, reset behavior, progress export/completion evidence, the first browser challenges, the cloud-evidence pattern, the authoring guide, solution fixture golden coverage, content QA/disclaimer coverage, release versioning/change log, Bun-only tooling, typed config layout, Prettier formatting gate, Playwright rendered UI coverage, the Makefile check harness, CI/Pages workflow structure, and Chrome app quality smoke coverage. Medium for live GitHub Pages reachability until the workflow runs in GitHub and for Safari verification until remote automation is explicitly enabled or a manual Safari pass is completed.
