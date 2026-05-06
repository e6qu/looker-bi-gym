# Status

Last updated: 2026-05-06

## Current State

Planning, documentation, task tracking, continuity protocol, the static app skeleton, Markdown content navigation, challenge manifest validation/catalog generation, the first synthetic deposits dataset, the quiz challenge runtime, the browser SQL runtime, reusable browser validators, local flags, unified local progress storage, reset controls, the first three browser-verifiable challenges, the first cloud-evidence challenge pattern, the challenge authoring guide, CI validation, and GitHub Pages deployment workflows are in place. Tasks 001 through 012 are complete except for live post-deploy URL verification, which requires a GitHub workflow run. Git discipline requires `.gitignore` maintenance, no committed rebuildable artifacts, no committed WASM runtime artifacts, and a commit after each completed task. A root `Makefile` exposes the repository checks and tests through `make` targets.

## Active Task

Active task: [013 - App Quality And Accessibility Pass](tasks/013-app-quality-and-accessibility-pass.md).

## Current Decisions

- Static GitHub Pages app.
- No backend.
- React + TypeScript + Vite.
- `pnpm` for repository development.
- Root `pnpm` workspace with app package under `app/`.
- Exact top-level dependency pins are based on live npm registry checks.
- Every imported external package must be declared directly in `app/package.json`; do not rely on transitive dependencies.
- Strong TypeScript and type-aware ESLint gates are required for app code.
- Vite production builds use relative asset paths by default, with `GITHUB_PAGES_BASE` available for absolute GitHub Pages paths.
- Existing Markdown source files are loaded at build time and routed through hash URLs.
- Challenge manifests are authored as YAML under `challenges/manifests/`.
- Challenge manifests are validated against `challenges/schema/challenge-manifest.schema.json`.
- `pnpm validate:manifests` validates YAML examples, verifies the intentionally invalid fixture remains invalid, and locally generates ignored `app/src/generated/challengeCatalog.json`.
- The app challenge index is generated from the static challenge catalog instead of a hard-coded placeholder list.
- Every challenge manifest must declare `required_tools`; browser-only tasks use `none`.
- The first dataset lives at `datasets/deposits-seed/v0.1.0/` and is synthetic CSV only.
- `pnpm validate:datasets` validates dataset row counts, primary keys, expected missing mappings, control totals, known issue counts, and the owner-join fanout negative test.
- The Vite build runs both manifest and dataset validation before compiling the app.
- `make check` runs lint, typecheck, manifest validation, dataset validation, quiz tests, SQL tests, cloud-evidence tests, validator tests, the production build, and built static asset-link validation.
- GitHub Actions CI runs the same `pnpm` validation, test, build, and static-link gates.
- GitHub Pages deployment builds `app/dist` with `pnpm`, uploads it as the Pages artifact, and deploys through the `github-pages` environment.
- Manifest validation now fails when a declared dataset ID/version does not resolve to a committed dataset metadata file.
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
- SQL fixture tests run known-good and known-bad manifest-backed solutions for the dataset inspection and fanout challenges.
- Cloud-evidence parser/validator tests run through `pnpm test:cloud-evidence` and `make check`.
- Challenge authoring rules live in `challenges/AUTHORING.md`.
- Draft manifests live in `challenges/drafts/` and are validated by `pnpm validate:manifests`, but only `challenges/manifests/` files are emitted to the browser catalog.
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

High for planning direction, task structure, the app skeleton, Markdown content loading, challenge manifest validation, draft validation, dataset-reference validation, the initial deposits dataset, automated quiz grading, the browser SQL runtime, browser validators, local flags, unified progress storage, reset behavior, the first browser challenges, the cloud-evidence pattern, the authoring guide, the Makefile check harness, and CI/Pages workflow structure. Medium for live GitHub Pages reachability until the workflow runs in GitHub.
