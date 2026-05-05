# What We Did

## 2026-05-06

- Retried `pnpm dev`; the sandboxed run still failed with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- Reran `pnpm dev` with approval; Vite started at `http://127.0.0.1:5173/`.
- Checked for existing browser automation tooling:
  - `pnpm exec playwright --version` failed because Playwright is not installed.
  - `pnpm exec vitest --version` failed because Vitest is not installed.
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
- Added root `package.json`, `pnpm-workspace.yaml`, and `.gitignore`.
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
- Installed `pnpm@10.12.1` globally because `pnpm` and `corepack` were not available on PATH.
- Ran `pnpm install`; the first sandboxed attempt failed with `ENOTFOUND registry.npmjs.org`, then the approved network run succeeded.
- Ran `pnpm typecheck`; initial run failed because `vite.config.ts` needed Node type definitions. Added `@types/node` and reran successfully.
- Ran `pnpm build`; it passed.
- Ran `pnpm preview`; the sandboxed attempt failed with `listen EPERM` on localhost, then the approved run served the app at `http://127.0.0.1:4173/`.
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
- Queried npm registry live for current top-level package versions and updated exact pins:
  - `react@19.2.5`
  - `react-dom@19.2.5`
  - `vite@8.0.10`
  - `@vitejs/plugin-react@6.0.1`
  - `typescript@6.0.3`
  - `pnpm@10.33.3`
  - plus current direct lint/type packages used by app/tooling code.
- Moved build/tooling imports to top-level `devDependencies` and kept runtime imports in top-level `dependencies`.
- Verified every external package imported by app source, Vite config, or ESLint config is directly declared in `app/package.json`.
- Ran `pnpm check`; lint, typecheck, and build passed.
- Ran `pnpm outdated --recursive`; no outdated top-level packages were reported.

## Tried And Failed

- The first `pnpm install` attempt failed in the sandbox because registry DNS/network access was blocked. Reran with approval and succeeded.
- The first `pnpm typecheck` attempt failed because `vite.config.ts` referenced `process.env` without Node types. Added `@types/node` and succeeded.
- The first `pnpm preview` attempt failed in the sandbox because localhost binding was blocked. Reran with approval and succeeded.
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
- Added direct app dev dependencies for validation tooling after live npm registry checks:
  - `ajv@8.20.0`
  - `tsx@4.21.0`
  - `yaml@2.8.4`
- Updated `pnpm-lock.yaml` with `pnpm install`.
- Ran `pnpm validate:manifests`; it passed and regenerated the challenge catalog.
- Ran `pnpm check`; lint, typecheck, manifest validation, and Vite build passed.
- Confirmed built assets and generated catalog contain the three example challenge titles.
- Confirmed generated manifests include required fields and `required_tools`.

## Task 004 Tried And Failed

- The first `pnpm view ajv version && pnpm view yaml version && pnpm view tsx version` attempt failed in the sandbox with `ENOTFOUND registry.npmjs.org`. Reran with approved network access and confirmed current exact versions.
- The first `pnpm install` attempt failed because pnpm could not purge modules without a TTY.
- The `CI=true pnpm install` attempt failed because CI mode enabled frozen lockfile checks after package metadata changed.
- The `CI=true pnpm install --no-frozen-lockfile` attempt failed in the sandbox with registry DNS errors. Reran with approved network access and succeeded.
- The first `pnpm validate:manifests` attempt failed because the `tsx` CLI opened an IPC pipe blocked by the sandbox. Switched the script to `node --import tsx scripts/validate-challenge-manifests.ts`, which runs in the sandbox.
- The first direct validator run exposed Ajv strict schema handling for union `type` arrays. Enabled `allowUnionTypes` explicitly.
- The first `pnpm check` attempt failed lint because the validator function was typed too loosely around `validate.errors`. Switched to Ajv's `ValidateFunction`.
- The second `pnpm check` attempt failed typecheck because the parsed JSON Schema was still `unknown`. Typed that boundary as Ajv's `AnySchema`.

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
- Updated app build to run `pnpm validate:manifests`, `pnpm validate:datasets`, typecheck, and Vite build.
- Aligned `challenges/manifests/first-banking-dataset.yaml` with the final seed table names:
  - `account_owners`
  - `account_daily_balances`
- Regenerated `app/src/generated/challengeCatalog.json`.
- Ran `pnpm validate:datasets`; it passed.
- Ran `pnpm validate:manifests`; it passed after manifest alignment.
- Ran `pnpm check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 005 Tried And Failed

- The first `pnpm validate:datasets` run failed because `A1006` had balances but no owner row, so the naive owner join dropped that account and produced `159800` instead of the expected `164800`. Added owner `C0008` for `A1006` and updated the owner row count.
- The first `pnpm check` after adding dataset validation failed lint on a nested readonly array type in `validate-datasets.ts`. Changed it to `ReadonlyArray<Readonly<Record<string, string>>>`.

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
- Regenerated `app/src/generated/challengeCatalog.json` with `pnpm validate:manifests`.
- Updated the Challenges page so cards link to `#/challenges/{challenge-id}` detail routes.
- Added a quiz challenge detail renderer for `quiz` manifests.
- Added browser-local answer state and per-question feedback.
- Added a narrow quiz completion store in browser `localStorage` under `looker-bi-gym.quiz-progress.v1`.
- Added a non-quiz challenge detail placeholder for later runtime tasks.
- Ran `pnpm test:quiz`; it passed.
- Ran `pnpm validate:manifests`; it passed.
- Ran `pnpm check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 006 Tried And Failed

- The first `pnpm check` after adding quiz UI failed lint because `Array.isArray` narrowed a quiz response to an unsafe array type. Reworked the helper to narrow the `QuizResponse` union without unsafe array return.
- `pnpm dev` failed in the sandbox with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- An escalated `pnpm dev` request was rejected by the environment, so manual browser completion and refresh verification could not be run in this turn.

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
- Ran `pnpm test:sql`; it passed.
- Ran `pnpm test:quiz`; it passed.
- Ran `pnpm check`; lint, typecheck, manifest validation, dataset validation, and Vite build passed.

## Task 007 Tried And Failed

- The first `pnpm test:sql` run failed because the node-blocking bindings needed an explicit instantiate step before `connect()`. Added the instantiate call and reran successfully.
- The first `pnpm check` after adding the SQL runtime failed lint on array type conventions, direct React state updates in an effect, and object stringification. Tightened the types, removed the effect-local loading reset, and switched the result formatter to explicit primitive handling.
- `pnpm dev` still cannot bind `127.0.0.1:5173` in the sandbox, so manual browser refresh verification remains pending.
- The escalated `pnpm dev` request was rejected by the environment, so the browser refresh check could not be run here.
