# Plan: BI Tutorial App Skeleton

## Goal

Create a fully static, browser-hosted tutorial app that runs on GitHub Pages with no backend and no credentials. The default learner path should require no local install. Tutorials may optionally specify common, cross-platform local tools when they materially improve learning or mirror real workflows.

The first app milestone should be small but extensible: it should render documentation, list challenges, run at least one simple browser-verifiable tutorial, store local progress, and make it easy to add more tutorials later.

## Scope

This plan covers the application shell and platform mechanics.

It does not define the full tutorial curriculum. That is covered in [PLAN_BI_TUTORIAL_TUTORIALS.md](PLAN_BI_TUTORIAL_TUTORIALS.md).

Execution tasks are tracked in [tasks/README.md](tasks/README.md).

## Constraints

- Must run entirely from GitHub Pages.
- Must not require a backend.
- Must not store or request BigQuery credentials.
- Must not store or request Looker Studio credentials.
- Must not require unspecified local tools.
- Must avoid esoteric or highly platform-specific local tooling.
- Must use synthetic data only.
- Must support AI-assisted learning, but validation must still be deterministic where possible.

## Selected Stack

Frontend:

- React
- TypeScript
- Vite
- `bun` for repository development commands

Static hosting:

- GitHub Pages

In-browser data and SQL:

- DuckDB-WASM
- Static CSV/JSON/Parquet synthetic datasets

Content:

- Markdown for docs/tutorial text.
- YAML source manifests for authoring.
- Generated JSON challenge catalog for browser loading.

State:

- `localStorage` for lightweight progress, completed flags, and answers.
- IndexedDB later if saved SQL, uploaded evidence, or larger cached data becomes necessary.
- Future flashcard spaced-repetition state should also be browser-local and
  exportable/importable as a single JSON file; it is not part of the current
  post-merge cleanup phase.

CI/CD:

- GitHub Actions for static build and deployment.
- Repository validation for challenge manifests, dataset references, and links.

Tooling decisions:

- Repository development uses `bun`.
- Learner main path is browser-only.
- Optional cloud-applied tasks may use Google Cloud Console, BigQuery UI, and Looker Studio UI.
- Avoid requiring Google Cloud CLI, BigQuery CLI, Python, or Docker in early tutorials.
- Docker is not part of the default learner path.
- Source datasets live in `datasets/`.
- Published datasets are copied into the static app during build.
- Challenge manifests are authored as YAML and validated/generated into browser-loadable JSON.
- Progress export/import is not required for the first skeleton but is a planned feature.
- Flashcard state export/import is a future feature after tutorial, quiz, and
  exam foundations stabilize.
- Offline support after first load is not required for the first skeleton but may be added later.

Planning rule:

- Reassess the plan after each task. If implementation shows a blocker or wrong assumption, update the plan and downstream tasks before proceeding.

## App Requirements

### Hosting And Runtime

Must:

- Run as a static site on GitHub Pages.
- Work without a backend service.
- Work without learner-installed tools for the default browser challenges.
- Clearly specify any optional local tools required by an advanced/tutorial-specific path.
- Work without server-side secrets or API keys.
- Use relative/base paths compatible with GitHub project pages.
- Load all required starter content and synthetic data from static files.

Should:

- Continue working after refresh without losing learner progress.
- Be usable on current desktop Chrome, Edge, Firefox, and Safari.
- Fail gracefully if WebAssembly or browser storage is unavailable.
- Prefer common cross-platform tools for any optional local workflow.

### Navigation And Content

Must:

- Provide a home page explaining the project.
- Provide indexes for docs, regulations, tutorials, and challenges.
- Render challenge instructions.
- Show prerequisites and dependencies for each challenge.
- Show input data sources and expected outputs for each challenge.
- Show regulatory context where relevant.
- Make it clear when a task is browser-only versus cloud-evidence-based.

Should:

- Support search or filtering by area, difficulty, regulation, and challenge mode.
- Support deep links to a specific challenge.
- Support Markdown-based content so non-app code changes can add tutorials.

### Challenge Execution

Must:

- Load challenge manifests from static files.
- Render challenge-specific inputs.
- Run at least `quiz` and `browser-sql` challenge modes in the MVP.
- Allow learners to submit SQL or structured answers.
- Run deterministic browser-side validators.
- Display pass/fail status per check.
- Generate a completion flag after required checks and questions pass.
- Store challenge completion locally.

Should:

- Support hints.
- Support retry without page reload.
- Support reset for one challenge or all progress.
- Support exporting progress as JSON.
- Support importing progress JSON later.

### SQL/Data Runtime

Must:

- Load small synthetic datasets in the browser.
- Execute SQL against those datasets using DuckDB-WASM.
- Show query results in a table.
- Show useful SQL/runtime errors to the learner.
- Keep datasets synthetic and bundled/static.
- Load datasets from versioned static dataset metadata.
- Keep generated catalogs, WASM runtime files, and build output reproducible from committed source/dependencies instead of committed as binary or generated artifacts.

Should:

- Cache loaded datasets for repeated use.
- Support CSV and JSON initially.
- Support Parquet later for larger analytical datasets.
- Provide schema browsing for input tables.
- Provide sample starter queries.

### Validation

Must:

- Validate multiple-choice and numeric answers.
- Validate SQL outputs using configured checks.
- Validate required columns.
- Validate forbidden columns.
- Validate row counts or scalar totals.
- Validate uniqueness/grain checks.
- Validate sensitive-field exclusion checks.
- Avoid relying on free-text answers as the only pass/fail gate.
- Validate known-good and known-bad solution fixtures in CI before challenge release.

Should:

- Validate metric-contract completeness.
- Validate regulatory-context tags.
- Validate evidence pasted from BigQuery or Looker Studio.
- Produce human-readable explanations for failed checks.
- Produce stable local flags from successful validation results.

### Progress And Learner State

Must:

- Store completed challenge IDs and flags locally.
- Store learner answers locally where practical.
- Avoid transmitting learner data anywhere.
- Provide reset progress controls.

Should:

- Store draft SQL per challenge.
- Store last validator output.
- Export/import progress file.
- Export/import flashcard spaced-repetition state as one JSON file later.
- Show curriculum completion by area.

### Flashcards And Spaced Repetition

Future scope, not current phase:

- Render topic-separated flashcard decks from committed content.
- Provide study/review/browse views, due-card counts, and deck progress.
- Implement a typed, deterministic Anki-style spaced repetition scheduler in the
  browser.
- Record timestamped review events and due timestamps in the browser-local
  flashcard state.
- Store review state locally and keep it separate from committed deck content.
- Export/import flashcard review state as one JSON file with local validation
  and preview before apply.
- Keep the same frontend-only, no-credentials, no-backend, no-tracking boundary
  as challenge progress.

### Privacy And Security

Must:

- Use synthetic data only.
- Avoid real banking data.
- Avoid credentials and tokens.
- Avoid hidden backend calls.
- Avoid collecting analytics by default.
- Clearly state that local flags are educational and not anti-cheat proof.
- Clearly state when a tutorial uses optional local tools and why.

Should:

- Allow the app to work offline after initial load if practical.
- Make external links explicit.
- Avoid third-party runtime dependencies that phone home.

### Authoring And Maintainability

Must:

- Allow adding a challenge without editing core app code for common modes.
- Keep challenge content separate from app runtime code.
- Validate manifests in CI.
- Validate static dataset references in CI.
- Validate solution fixtures in CI.
- Keep app-specific code separate from docs/tutorial source material.

Should:

- Provide an authoring guide.
- Provide sample challenge manifests.
- Provide reusable validator definitions.
- Provide clear error messages for invalid manifests.

### Deployment And CI

Must:

- Build with GitHub Actions.
- Deploy to GitHub Pages.
- Run static build validation.
- Run challenge manifest validation.
- Run dataset-reference validation.
- Run solution fixture validation.

Should:

- Run link checks.
- Run basic browser smoke tests if feasible.
- Publish build artifacts for inspection.

## App Capabilities For Skeleton

Minimum app shell:

- Home page.
- Docs index.
- Regulations index.
- Tutorials/challenges index.
- Challenge detail page.
- Local progress indicator.
- Basic settings/reset-progress page.

Challenge runtime:

- Render challenge metadata from manifest.
- Render instructions from Markdown/MDX.
- Load small static synthetic dataset.
- Provide SQL editor or text input for the first browser challenge.
- Run browser-side checks.
- Render pass/fail results.
- Ask mechanically graded questions.
- Generate a local flag after all required checks pass.

Developer experience:

- Adding a new challenge should require adding a manifest, challenge content, and optional validator configuration.
- The app should not require custom React code for every new tutorial.
- Challenge manifests should be validated in CI.

## Challenge Modes Supported Initially

Initial mode:

- `browser-sql`: learner writes SQL against synthetic data loaded in DuckDB-WASM.

Near-term modes:

- `quiz`: mechanically graded conceptual questions.
- `browser-config`: validate structured YAML/JSON/metric-contract text.
- `cloud-evidence`: validate pasted evidence from BigQuery or Looker Studio.

Capstone mode can be added later as composition of the other modes.

## First Skeleton Tutorials

The first version should include:

- One orientation/quiz challenge with no data dependency.
- One browser SQL challenge using a small synthetic banking dataset.
- One evidence-style placeholder challenge showing how cloud-applied tasks will work, without requiring BigQuery yet.

Recommended first SQL challenge:

- Topic: account-owner fanout.
- Data: accounts, account owners, account daily balances, branches/products.
- Task: produce correct branch/product balance totals without multiplying balances by ownership rows.
- Checks: expected totals, grain uniqueness, no sensitive columns, concept questions.

## Data Strategy For App Skeleton

Use very small synthetic datasets first.

Initial data format:

- CSV for readability.

Later data format:

- Parquet for larger analytical challenges if needed.

Initial domains:

- `raw_ref.branches`
- `raw_ref.products`
- `raw_deposits.accounts`
- `raw_deposits.account_owners`
- `raw_deposits.account_daily_balances`

The data should intentionally include:

- Joint accounts.
- Multiple owners.
- Closed accounts.
- Month-end and non-month-end dates.
- At least one sensitive column that must not appear in the final serving output.
- Romanian/EU banking flavor from day one: RON/EUR, Romanian branch geography, local regulatory context tags.

## Verification Strategy

Browser-side validators should support:

- Required output columns.
- Forbidden output columns.
- Row count checks.
- Unique key checks.
- Aggregate reconciliation checks.
- Expected scalar answers.
- Multiple-choice and select-all questions.
- Flag generation based on successful checks.

Flags:

- Local educational flags only.
- Computed after checks pass.
- Not intended as anti-cheat security.

## GitHub Pages Deployment

Deployment should:

- Build static assets.
- Publish to GitHub Pages.
- Use relative/base paths compatible with project pages.
- Validate that the site can be served as static files.

## App Milestones

Milestone A1 - Scaffold:

- Create Vite React TypeScript app.
- Add routing/navigation.
- Render static Markdown/docs indexes.
- Add GitHub Pages build configuration.

Milestone A2 - Challenge Manifest Runtime:

- Define manifest schema.
- Render challenge list and detail pages from manifests.
- Add local progress storage.

Milestone A3 - First Browser SQL Challenge:

- Add DuckDB-WASM.
- Load small synthetic datasets.
- Run first SQL challenge.
- Add validator output and flag generation.

Milestone A4 - Static Publishing:

- Add GitHub Actions build/deploy.
- Add manifest/link/data-reference validation.
- Publish first working GitHub Pages site.

Milestone A5 - Extensibility:

- Add reusable question components.
- Add browser-config validation.
- Add cloud-evidence input pattern.
- Document how to add a new challenge.

## Non-Goals For App Skeleton

- No backend.
- No login.
- No scoreboard.
- No BigQuery API calls.
- No Looker Studio API calls.
- No real banking data.
- No production-grade anti-cheat.
- No complete BI curriculum in the first app milestone.
- No unspecified, esoteric, or platform-specific learner tooling.

## Resolved App Choices

- Content uses Markdown initially. Interactive challenge UI comes from manifests and app components, not MDX.
- Challenge manifests are authored as YAML and converted/collected into JSON for browser loading.
- Source datasets live in `datasets/`; the static app serves copied/generated dataset assets.
- Progress export/import is a later feature, not part of the first skeleton.
- Offline support after first load is a later feature, not part of the first skeleton.
