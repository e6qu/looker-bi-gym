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
- Tutorials: rendered Markdown from `tutorials/`, including nested learner tasks
  and optional recipes.
- Workbench: neutral browser SQL workspace routes for committed synthetic
  datasets, used by self-contained tutorials.
- Challenges: generated challenge catalog and challenge detail pages.
- Quiz: rendered quiz-bank Markdown from generated catalogs.
- Exam: rendered exam-card Markdown from generated catalogs.
- Flashcards: browser-local topic decks with spaced-repetition review state.
- Facts: rendered source-fact graph.
- Regulations: rendered context briefs from `regulations/`.
- Settings: browser-local state, JSON export, and reset controls.

Learner-facing content shapes:

- Practice labs: area-grouped 15-20 minute BI exercise units with an objective,
  steps, checkpoints, visualization/reporting action, self-assessment, and an
  end challenge.
- Recipes: optional Looker Studio follow-ons after browser-first tutorials.
- Quiz bank: mixed 20-minute quizzes organized by difficulty with scenario
  prompts, explanations, and hidden grounding metadata for validation.
- Exam cards: untimed independent longer challenges, up to roughly 2 hours,
  self-assessed at first.
- Flashcards: topic-separated recall decks with browser-local Anki-style
  spaced repetition and JSON state export/import.

## Content Components

Tutorials:

- Current location: `tutorials/**/*.md`.
- Role: learner-facing lessons and narrative guidance.
- Learner-task packs live under `tutorials/learner-tasks/`.
- Self-contained boundary: released learner-task pages should provide the full
  instruction in the page body and use workbench routes for SQL execution rather
  than pointing learners to challenge pages for the lesson.

Workbench:

- App routes: `#/workbench/deposits-seed/v0.1.0` and
  `#/workbench/lending-month-end/v0.1.0`.
- Role: neutral DuckDB-WASM SQL execution against committed synthetic dataset
  packs for tutorial steps.
- Boundary: no grading, no backend, no credential collection, no learner-data
  upload, and no real banking data.
- Verification: Playwright runs a real tutorial query through the workbench, and
  content QA prevents learner-task tutorials from using `#/challenges/` as the
  instructional path.

Challenges:

- Location: `challenges/manifests/*.yaml`.
- Role: browser-rendered challenge contracts, questions, checks, flags, inputs,
  outputs, lesson steps, and hints.
- Validation: `bun run validate:manifests`, `bun run test:fixtures`, and
  `bun run test:derived-expectations`.

Solution fixtures:

- Location: `challenges/solution-fixtures/`.
- Role: known-good and known-bad expected behavior for released challenges.
- Dataset-derived expectation checks execute known-good browser-SQL fixture SQL
  against the pinned dataset and compare derived row counts and aggregate values
  to manifest expectations.

Recipes:

- Current location: `tutorials/recipes/`.
- Role: optional Looker Studio browser UI instructions after the core
  browser-first tutorial path.
- Constraint: no cloud CLI or shell upload scripts in the early path.

Quizzes:

- Current location: `quizzes/`.
- App route: `#/quiz`.
- Role: reusable question banks separate from challenge manifests, rendered as
  first-class browser quiz surfaces.
- First bank: one mixed 20-minute quiz with `easy`, `medium`, and `hard`
  scenario questions, answers, explanations, estimated seconds, and
  self-assessment notes. Grounding metadata remains available for validation
  but is not rendered as part of the quiz prompt.
- Verification: `bun run test:quiz-facts-db` loads generated quiz catalog
  content into SQLite temp tables and verifies question facts against the local
  facts graph.

Exam cards:

- Current location: `exams/`.
- App route: `#/exam`.
- Role: optional independent longer challenge specifications rendered as
  learner-pickable self-assessment cards.
- First pack: untimed, self-assessed cards with deterministic verification
  where feasible.

Flashcards:

- Current route: `#/flashcards`.
- Current implementation: committed deck content lives in `flashcards/{topic}/`
  Markdown; typed scheduler state lives in `app/src/flashcards.ts`; the rendered
  route lives in `app/src/App.tsx`.
- Role: topic-separated recall and review for facts, BI mechanics, platform
  behavior, tutorial checkpoints, and deterministic dataset outputs.
- State: browser-local timestamped review state with one JSON export/import
  file.
- Boundary: no backend, no learner-data upload, and no real banking data.
- Study controls: selected-deck search, due-only/all-card modes, deck/card/due
  counts, export/import, and flashcard-only reset.
- Source-review metadata: selected decks can expose reviewed Anki/shared
  flashcard sources, coverage notes, and incorporation notes while keeping card
  text fact-backed and locally authored.
- Current decks: BI fundamentals, BigQuery/SQL, Looker Studio,
  controls/governance, banking context, dataset controls, metric contracts,
  performance/operations, privacy/security, and real-estate collateral.
- Verification: `bun run test:flashcards` validates scheduler transitions, deck
  structure, source fact IDs, and JSON import behavior; Playwright covers a real
  review flow, search, study-mode switching, export preview,
  validate/preview/apply import flow, and reset.

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

- Location: root `facts/`.
- App route: `#/facts`.
- Role: durable `FACT-*` IDs for sourced tutorials, quiz questions, challenge
  explanations, and LLM workbench context.
- Learner UI: show human-readable fact statements and area labels first; keep
  raw `FACT-*` IDs as metadata/links rather than primary learner-facing text.
- Validation: `bun run test:facts-db` and `bun run test:quiz-facts-db`.
- Local SQLite graph: the `facts-db-app` workspace package provides the
  CLI/library behind `bun run facts:build-db`, which builds ignored
  `app/src/generated/facts.sqlite` with facts, sources, source documents,
  fact-source edges, related-fact edges, and triple-like graph rows for local
  inspection and LLM-assisted review. It is development tooling only, not a web
  UI or backend.

Sources:

- Location: `sources/`.
- Role: local source cards and permitted official documentation snapshots used
  by the fact corpus.
- Boundary: source cards and short quotes for non-permissive sources; full
  snapshots only where licensing and project rules allow.

## App Components

App shell:

- `app/src/App.tsx`: routes, rendered pages, challenge views, Settings, and the
  browser SQL challenge/workbench UI, including a deterministic result bar chart
  when a query returns at least one dimension-like column and one numeric
  column.
- `app/src/content.ts`: generated Markdown catalog access for docs,
  regulations, and recursive tutorial content.
- `app/src/learningContent.ts`: generated catalog access for quiz banks and
  exam packs.
- `app/src/factCatalog.ts`: generated browser fact index parsed from local fact
  Markdown for source-evidence links and the `#/facts` graph browser.
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
- `app/src/configEvidence.ts`: frontend-only browser-config checks for JSON
  metric contracts and similar structured local artifacts.

Dataset and SQL runtime:

- `app/src/datasetRegistry.ts`: maps committed dataset metadata/files into the
  browser runtime.
- `app/src/sqlRuntime.ts`: DuckDB-WASM loading, CSV registration, query
  execution, and schema discovery.

State and export:

- `app/src/progress.ts`: browser-local progress model, local flags,
  `localStorage`, same-site cookie mirror, reset, JSON export, and JSON import
  validation.
- `app/src/flashcards.ts`: generated flashcard deck catalog access, typed
  review state, SM-2-inspired scheduler transitions, and flashcard JSON import
  validation.
- Storage keys:
  - `looker-bi-gym.progress.v1`;
  - `looker-bi-gym.quiz-progress.v1` for legacy migration;
  - `looker-bi-gym-progress-v1` for the same-site cookie mirror.
  - `looker-bi-gym.flashcards.v1` for flashcard review state.
- Export/import format: `looker-bi-gym.progress-export.v1`.
- Flashcard export/import format: `looker-bi-gym.flashcards.v1`.

## State Model

The canonical state path is browser-local:

1. The app reads progress from `localStorage`.
2. If `localStorage` is missing, it can restore from the same-site progress
   cookie.
3. Completing a challenge writes both `localStorage` and the cookie mirror.
4. Reset clears both browser storage surfaces.
5. Export creates a JSON file locally in the browser and does not upload it.
6. Import accepts pasted JSON in Settings, validates
   `looker-bi-gym.progress-export.v1` locally, previews imported completion
   evidence, and writes browser-local progress only after user confirmation.
7. Import never contacts a backend and never uploads learner data.
8. Flashcard review state uses a separate `localStorage` key and a separate
   JSON export/import flow on `#/flashcards`; challenge completion state and
   spaced-repetition state remain independent.

Current flashcard state behavior:

- committed deck content is generated from `flashcards/{topic}/` Markdown;
- per-card review state is stored locally in the browser;
- export creates one JSON file containing the review state format, update time,
  and per-card review state;
- import validates schema/version locally, previews the reviewed-card count, and
  applies only to flashcard state after an explicit learner action;
- flashcard reset is scoped to flashcard review state; challenge progress reset
  does not implicitly delete flashcard state.
- review events should store explicit datetime timestamps for rating time,
  previous due timestamp, next due timestamp, and import/export time.

## Verification Components

Core local gate:

- `bun run check`.

Focused gates:

- `bun run validate:manifests`;
- `bun run validate:datasets`;
- `bun run test:fixtures`;
- `bun run test:derived-expectations`;
- `bun run test:content-qa`;
- `bun run test:facts-db`;
- `bun run test:progress-export`;
- `bun run test:flashcards`;
- `bun run test:platform-boundary`;
- `bun run test:e2e`.

Rendered UI verification:

- Playwright builds and previews the static app.
- Tests cover real rendered routes, challenge pages, browser SQL completion,
  cloud-evidence completion, Settings export/reset behavior, storage fallback,
  network boundary, and responsive overflow.

## Implementation Task Boundary

`_development/tasks/*.md` files are implementation tasks for the repository.
They are not learner tasks. Learner tasks are curriculum exercise units
rendered from `tutorials/learner-tasks/`.

When updating this project, keep these two meanings separate in plans, status,
PR descriptions, and user-facing content.
