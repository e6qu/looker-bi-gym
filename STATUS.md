# Status

Last updated: 2026-05-06

## Current State

Planning, documentation, task tracking, continuity protocol, the static app skeleton, Markdown content navigation, challenge manifest validation/catalog generation, the first synthetic deposits dataset, the quiz challenge runtime implementation, and the browser SQL runtime implementation are in place. Tasks 001, 002, 003, 004, and 005 are complete. Tasks 006 and 007 implementation and automated checks are complete, with manual browser refresh verification still pending. Git discipline now requires `.gitignore` maintenance and a commit after each completed task.

## Active Task

Active task: [008 - Validators, Flags, And Progress](tasks/008-validators-flags-and-progress.md).

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
- `pnpm validate:manifests` validates YAML examples, verifies the intentionally invalid fixture remains invalid, and generates `app/src/generated/challengeCatalog.json`.
- The app challenge index is generated from the static challenge catalog instead of a hard-coded placeholder list.
- Every challenge manifest must declare `required_tools`; browser-only tasks use `none`.
- The first dataset lives at `datasets/deposits-seed/v0.1.0/` and is synthetic CSV only.
- `pnpm validate:datasets` validates dataset row counts, primary keys, expected missing mappings, control totals, known issue counts, and the owner-join fanout negative test.
- The Vite build runs both manifest and dataset validation before compiling the app.
- Quiz challenge details render from generated manifests at `#/challenges/{challenge-id}`.
- The quiz runtime grades multiple-choice, select-all, and numeric answers deterministically in the browser.
- Quiz completion state is stored in browser `localStorage` under `looker-bi-gym.quiz-progress.v1`.
- The browser SQL runtime loads the synthetic deposits dataset into DuckDB-WASM, exposes table schemas, and caps preview output for safety.
- DuckDB-WASM for browser SQL challenges.
- Browser-first learner path.
- Optional cloud-applied track through Google Cloud Console, BigQuery UI, and Looker Studio UI.
- First dataset: small hand-authored CSV deposits/account ownership dataset.
- Synthetic data only.
- Before and after every task, review/update `STATUS.md`, `PLAN.md`, `WHAT_WE_DID.md`, `DO_NEXT.md`, and `BUGS.md`.
- After every task, readjust plans and downstream tasks if implementation shows a blocker or wrong assumption.
- After each completed task, keep `.gitignore` current and commit the task changes to git.

## Blockers

- Manual browser verification for Tasks 006 and 007 remains pending because `pnpm dev` cannot bind `127.0.0.1:5173` in the sandbox and the escalated server request was rejected by the environment.

## Confidence

High for planning direction, task structure, the initial app skeleton, Markdown content loading, challenge manifest validation, the initial deposits dataset, automated quiz grading, and the browser SQL runtime. Medium for browser persistence until the manual refresh verification is run.
