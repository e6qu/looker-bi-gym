# Platform Components

This document organizes the current project into product and implementation
components. It is written from the assumption that learners interact with the
project through the static GitHub Pages website.

## Runtime Boundary

The app is frontend-only:

- static GitHub Pages deployment;
- no backend account system;
- no server session;
- no API database;
- no server-side grading;
- no analytics beacon or learner-data upload;
- no real banking data;
- no credentials, service account keys, OAuth tokens, or cloud secrets.

The default learner path runs in the browser. Optional cloud-applied work may
use Google Cloud Console, BigQuery UI, and Looker Studio UI, but the website
must not collect credentials or private data.

## Learner Website Sections

Current rendered sections:

- Home: entry point, scope, and navigation.
- Docs: rendered Markdown from `docs/`.
- Tutorials: rendered Markdown from `tutorials/`.
- Challenges: generated challenge catalog and challenge detail pages.
- Regulations: rendered context briefs from `regulations/`.
- Settings: browser-local state, JSON export, and reset controls.

Planned learner-facing sections:

- Learner tasks: area-grouped 15-20 minute curriculum exercise units with an
  objective, steps, checkpoints, visualization/reporting action,
  self-assessment, and an end challenge.
- Recipes: optional Looker Studio follow-ons after browser-first tutorials.
- Quiz bank: mixed 20-minute quizzes organized by difficulty and linked to
  recommended learner tasks.
- Exam cards: untimed independent longer challenges, up to roughly 2 hours,
  self-assessed at first.

## Content Components

Tutorials:

- Current location: `tutorials/*.md`.
- Role: learner-facing lessons and narrative guidance.
- Next shape: structured learner-task packs produced by implementation Task 025.

Challenges:

- Location: `challenges/manifests/*.yaml`.
- Role: browser-rendered challenge contracts, questions, checks, flags, inputs,
  outputs, lesson steps, and hints.
- Validation: `bun run validate:manifests` and `bun run test:fixtures`.

Solution fixtures:

- Location: `challenges/solution-fixtures/`.
- Role: known-good and known-bad expected behavior for released challenges.

Recipes:

- Planned location: `tutorials/recipes/` or a dedicated `recipes/` directory.
- Role: optional Looker Studio browser UI instructions after the core
  browser-first tutorial path.
- Constraint: no cloud CLI or shell upload scripts in the early path.

Quizzes:

- Planned location: `quizzes/`.
- Role: reusable question banks separate from challenge manifests.
- First target: one mixed 20-minute quiz with `easy`, `medium`, and `hard`
  questions, recommended learner-task IDs, source facts, answers, explanations,
  estimated seconds, and self-assessment notes.

Exam cards:

- Planned location: `exams/`.
- Role: optional independent longer challenge specifications.
- First target: untimed, self-assessed cards with deterministic verification
  where feasible.

## Data Components

Datasets:

- Location: `datasets/{dataset_id}/{version}/`.
- Current packs:
  - `deposits-seed/v0.1.0`;
  - `deposits-seed/v0.1.1`;
  - `lending-month-end/v0.1.0`.
- Role: deterministic synthetic CSV data and metadata for browser SQL and
  challenge fixtures.
- Validation: `bun run validate:datasets`.

Facts:

- Location: `docs/facts/`.
- Role: durable `FACT-*` IDs for fact-backed tutorials, quiz questions,
  challenge explanations, and LLM workbench context.
- Validation: `bun run test:facts-db`.

Sources:

- Location: `sources/`.
- Role: local source cards and permitted official documentation snapshots used
  by the fact corpus.
- Boundary: source cards and short quotes for non-permissive sources; full
  snapshots only where licensing and project rules allow.

## App Components

App shell:

- `app/src/App.tsx`: routes, rendered pages, challenge views, Settings, and the
  current browser SQL challenge UI.
- `app/src/content.ts`: Markdown discovery for docs, regulations, and
  tutorials.
- `app/src/markdown.ts`: Markdown rendering and internal link rewriting for
  GitHub Pages hash routes.

Challenge runtime:

- `app/src/challenges.ts`: generated challenge catalog access.
- `app/src/challengeTypes.ts`: challenge manifest TypeScript types.
- `app/src/quiz.ts`: deterministic question evaluation.
- `app/src/validators.ts`: SQL result validators and challenge check
  evaluation.
- `app/src/cloudEvidence.ts`: frontend-only evidence checks for optional cloud
  workflows.

Dataset and SQL runtime:

- `app/src/datasetRegistry.ts`: maps committed dataset metadata/files into the
  browser runtime.
- `app/src/sqlRuntime.ts`: DuckDB-WASM loading, CSV registration, query
  execution, and schema discovery.

State and export:

- `app/src/progress.ts`: browser-local progress model, local flags,
  `localStorage`, same-site cookie mirror, reset, and JSON export.
- Storage keys:
  - `looker-bi-gym.progress.v1`;
  - `looker-bi-gym.quiz-progress.v1` for legacy migration;
  - `looker-bi-gym-progress-v1` for the same-site cookie mirror.
- Export format: `looker-bi-gym.progress-export.v1`.

## State Model

The canonical state path is browser-local:

1. The app reads progress from `localStorage`.
2. If `localStorage` is missing, it can restore from the same-site progress
   cookie.
3. Completing a challenge writes both `localStorage` and the cookie mirror.
4. Reset clears both browser storage surfaces.
5. Export creates a JSON file locally in the browser and does not upload it.

Planned import behavior:

- user chooses a JSON file in Settings;
- the app validates `looker-bi-gym.progress-export.v1` locally;
- the app previews imported completion evidence before applying it;
- import writes browser-local progress only after user confirmation;
- import never contacts a backend and never uploads learner data.

## Verification Components

Core local gate:

- `bun run check`.

Focused gates:

- `bun run validate:manifests`;
- `bun run validate:datasets`;
- `bun run test:fixtures`;
- `bun run test:content-qa`;
- `bun run test:facts-db`;
- `bun run test:progress-export`;
- `bun run test:platform-boundary`;
- `bun run test:e2e`.

Rendered UI verification:

- Playwright builds and previews the static app.
- Tests cover real rendered routes, challenge pages, browser SQL completion,
  cloud-evidence completion, Settings export/reset behavior, storage fallback,
  network boundary, and responsive overflow.

## Implementation Task Boundary

`tasks/*.md` files are implementation tasks for the repository. They are not
learner tasks. Learner tasks are curriculum exercise units that will be shown in
the website after implementation Task 025 creates the model and content.

When updating this project, keep these two meanings separate in plans, status,
PR descriptions, and user-facing content.
