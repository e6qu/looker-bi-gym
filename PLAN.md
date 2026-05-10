# Plan: Browser-Hosted Banking BI Tutorial Platform

## Purpose

Build a fully static GitHub Pages learning platform for technical BI in banking.
The platform combines browser-only SQL practice, deterministic synthetic banking
datasets, fact-backed tutorials, mechanically graded challenges, EU/Romanian
regulatory context, and optional cloud-applied evidence workflows.

The default learner path runs entirely in the browser. Optional cloud work may
use Google Cloud Console, BigQuery UI, and Looker Studio UI, but the app must not
collect credentials, require a backend, require CLI tools for the early path, or
use real banking data.

## Current Baseline

The first platform release and PR #3 established:

- Static React + TypeScript + Vite app on GitHub Pages.
- Bun-only repository tooling.
- DuckDB-WASM browser SQL runtime.
- Browser-local progress with `localStorage` and same-site cookie fallback.
- Synthetic deposits seed dataset committed under `datasets/`.
- YAML challenge manifests, fixture tests, validators, and rendered Playwright
  user flows.
- Source fact register under `docs/facts/`.
- Step-by-step rendered challenge lesson steps.
- Fact-backed challenge questions.
- Content QA for required tools, disclaimers, synthetic-data boundaries,
  Markdown links, source fact references, and tutorial structure.
- Deterministic lending month-end dataset pack and browser SQL challenge for
  semi-additive exposure snapshots.
- Post-merge PR #6 adds the larger lending/collateral dataset pack, official
  Romania HPI context, manual LLM question/dreaming workbench, and the
  terminology/plan boundary for learner tasks.
- [docs/14-platform-components.md](docs/14-platform-components.md) is the
  component map for the GitHub Pages website, content, datasets, facts, runtime,
  browser-local state, JSON export/import direction, and verification gates.
- PR #8 added the first real learner-task packs, a separate quiz bank, an
  exam-card pack, an optional Looker Studio recipe, recursive tutorial
  rendering, and SQL result bar-chart visualization for browser SQL challenge
  results.
- Task 026 on branch `task026-grading-contracts` adds browser-config JSON
  grading, the first metric-contract artifact challenge, known-good/known-bad
  fixtures for that mode, content QA for supported checks, and a rendered
  Playwright learner flow.

## Split Plans

- [PLAN_BI_TUTORIAL_APP.md](PLAN_BI_TUTORIAL_APP.md): app skeleton, technical
  stack, runtime requirements, validation platform, storage, and GitHub Pages
  deployment.
- [PLAN_BI_TUTORIAL_TUTORIALS.md](PLAN_BI_TUTORIAL_TUTORIALS.md): curriculum,
  challenge model, data-source contract, verification patterns, and authoring
  rules.
- [tasks/README.md](tasks/README.md): numbered execution tasks with verification
  and tests.

## Non-Negotiables

- No backend.
- No real banking data.
- No credentials, secrets, service account keys, OAuth tokens, user tracking, or
  learner-data upload.
- No unspecified learner-installed tools.
- Avoid esoteric or highly platform-specific tooling.
- No hidden server-side validation.
- No legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Rebuildable generated outputs, package caches, build outputs, and WASM runtime
  artifacts stay out of git.

## Clarifications

- "Local literature" means local source cards, short quotes, citations, and
  derived fact records. It does not mean copying whole external web pages into
  the repository.
- Fact IDs are durable curriculum primitives. Tutorials, questions, manifests,
  fixtures, and validators should cite fact IDs rather than re-summarizing
  official docs differently in every file.
- Challenge datasets must be reproducible and deterministic. Browser-first
  datasets should be committed as synthetic CSV/JSON or generated from committed
  deterministic scripts with metadata, control totals, and fixture coverage.
- Tutorials must be real lessons: exact learner action, expected result, why the
  step matters, common failure mode, and check or evidence produced.
- Challenge definitions must be rich enough to grade: inputs, outputs, source
  facts, checks, fixtures, expected wrong answers or known-bad SQL where useful,
  and stable versioning.
- Optional LLM question generation is draft-only. LLM review/refinement and
  manual "dreaming" passes may help find weak facts, better sources, generic
  questions, dataset realism gaps, and possible bugs, but they do not replace
  committed source facts, deterministic fixtures, human review, or passing tests.
- Dreaming is currently manual only through `make` targets. Do not enable an
  automatic 3-6 hour background scheduler until a later explicit task designs
  permissions, artifact review, cost controls, and merge discipline.
- Learner tasks must have an explicit overall learning objective. The
  objective should explain what the learner will be able to do and how it fits
  the broader data-analyst-to-banking-BI path.
- Learner tasks should be grouped by learning area and timeboxed to roughly
  15-20 focused minutes. Each learner task should include step-by-step
  instructions, verification checkpoints, a meaningful visualization or reporting
  step where appropriate, self-assessment, and an end challenge.
- Early tutorial work should prioritize BI mechanics and Looker/BigQuery
  behavior over legal theory or specific market-condition expertise. Banking
  and real-estate data provide realistic context, not the main first-pass
  learning goal.
- Looker Studio recipes belong after the core browser-first tutorials as
  optional follow-on recipes. Prefer manual browser/UI workflows first; defer
  shell scripts until there is a clear need. Any learner-facing shell scripts
  must be uncomplicated, ShellCheck-verified, work on macOS and Linux, and work
  from both `bash` and `zsh`.
- Quiz content should use a separate quiz-bank format instead of overloading
  challenge manifests. The first quiz bank should support one mixed
  approximately 20-minute quiz organized internally by `easy`, `medium`, and
  `hard`, with recommended learner-task links, source facts, answers,
  explanations, and self-assessment notes.
- Exam mode should start as independent optional challenge cards, not a timed
  enforced browser exam. Each exam challenge can be up to roughly 2 hours, is
  user-selected, and is self-assessed at first with as much deterministic
  verification as the current static app can support.
- Flashcards now have a first browser implementation: topic-separated decks for
  BI, BigQuery, Looker Studio, controls, banking context, and dataset controls,
  with an SM-2-inspired spaced repetition UI and browser-local flashcard state
  that can be exported and imported as a single JSON file. Future work should
  expand coverage across all released tutorials, quizzes, exams, and challenge
  traps.
- JSON export and import are implemented in Settings. Import is a browser-local
  workflow: validate the export format locally, preview imported evidence, apply
  only after user confirmation, and never upload learner data.
- Quiz banks and exam cards should be rendered as first-class app surfaces when
  they become core learner flows. Markdown summaries are useful navigation aids,
  but the website should not require the learner to read repository YAML or a
  secondary summary to use a quiz or exam card.
- Source facts should be learner-readable in the UI. Raw `FACT-*` IDs are useful
  for validation, linking, fixtures, and LLM workbench context, but the primary
  learner label should be a human-readable statement or title with the ID kept
  as metadata.
- Tutorials should be self-contained. They may list prerequisite docs or facts
  near the start, but step-by-step learner instructions should live inside the
  tutorial itself rather than sending learners to challenge pages to understand
  the lesson.
- Terminology must stay precise:
  - `implementation tasks` are numbered repository work items under `tasks/*.md`
    such as Task 024 and Task 025;
  - `learner tasks` are curriculum exercise units shown to learners in the app
    or tutorial content.
    Do not use unqualified "task" when it could confuse implementation work with
    learner-facing curriculum.

## Future Phases

### Phase A - Literature And Fact Corpus

Grow `docs/facts/` into a large area-organized corpus:

- Privacy/GDPR.
- EU/Romanian deposit guarantee and banking domain.
- BigQuery and Looker Studio.
- Browser runtime, storage, and DuckDB-WASM.
- Governance, reporting, DORA, EBA, and operations.
- Project architecture, datasets, challenge contracts, and grading behavior.

Each fact has a unique `FACT-*` ID, source link, short quote or local source
identifier, derived tutorial implication, and cross-links to related facts.

### Phase B - Deterministic Local Dataset Packs

Expand beyond the deposits seed with committed synthetic datasets and metadata:

- Deposits and depositor guarantee coverage pack.
- Payments/card activity pack for date semantics and PSD2-style dimensions.
- Lending/month-end exposure pack for semi-additive snapshots and DPD buckets.
- Finance/GL reconciliation pack.
- Operations/freshness/reconciliation pack.
- Real-estate collateral and mortgage-evaluation support packs with synthetic
  property/location/valuation rows plus official historical/current market
  context tables where licensing and source availability allow.

Every dataset pack needs versioned files, metadata, synthetic-only declarations,
schema/grain contracts, row counts, control totals, known traps, and fixture
coverage.

First implementation: `lending-month-end/v0.1.0` provides the lending
month-end exposure seed pack with committed CSV/JSON, validation, and fixture
coverage.

### Phase C - Real Tutorial Instruction Packs

Initial implementation is in place on PR #8. Continue replacing remaining
sketch-like lessons with full lesson packs and app-rendered learning surfaces:

- Area-grouped task packs for:
  - BI fundamentals;
  - BigQuery/SQL for BI;
  - Looker Studio mechanics;
  - data quality and controls;
  - banking BI applications as realistic context.
- Several complete 15-20 minute learner tasks across multiple areas, not only a
  schema proof of concept.
- Each learner task includes an objective, prerequisites, input dataset, exact
  learner steps, verification checkpoints, visualization/reporting action,
  optional recipe pointer, self-assessment, and a CTF-style end challenge.
- Narrative lesson page.
- Browser-rendered challenge lesson steps.
- Exact SQL/evidence snippets.
- Expected result tables.
- Source fact IDs.
- Known failure modes.
- Automatically graded checks and question fixtures.
- Optional cloud-applied branch only after browser-first equivalent exists.
- A useful first in-app visualization feature attached to SQL challenge results:
  when a result has at least one dimension-like column and one numeric column,
  the app renders a deterministic table plus bar chart that supports BI
  mechanics. Avoid dummy placeholder charts.
- Separate Looker Studio recipe pages after tutorials, with field mapping,
  calculated-field instructions, chart configuration, and user-driven
  verification.
- A separate quiz-bank model for mixed 20-minute quizzes with difficulty,
  recommended learner tasks, source facts, answers, explanations, and
  self-assessment.
- Exam mode defined as untimed, independent, longer challenge cards; richer app
  rendering can follow after task and quiz models stabilize.
- Task 030 direction: tutorials are self-contained lessons. Released
  learner-task tutorials should use neutral workbench routes such as
  `#/workbench/deposits-seed/v0.1.0` for SQL execution and keep the objective,
  steps, verification, expected outputs, common failures, self-assessment, and
  CTF-style end check in the tutorial body instead of relying on challenge pages
  as the instruction.

### Phase D - Stronger Challenge And Grading Contracts

Add richer challenge modes and validators:

- Browser config/metric contract validators. Initial browser-config JSON
  validators and a metric-contract challenge are implemented in Task 026.
- Dataset-derived expected answer generation. Initial browser-SQL row-count and
  aggregate expectation checks are implemented in Task 026 through known-good
  fixture SQL executed against pinned committed datasets.
- Golden answer explanations.
- Known-bad fixtures for every CTF/trap challenge.
- Fact ID coverage checks for every released lesson step and question.
- Playwright flows for actual learner paths across challenge sequences.

### Phase E - Release And Evidence Discipline

Keep each release reproducible:

- Version challenge contracts when instructions, checks, datasets, or answers
  change.
- Run local and CI check pyramids before merge.
- Verify post-merge GitHub Pages deployment.
- Keep continuity files current.

### Phase F - Flashcards And Spaced Repetition

First browser slice implemented. Continue expanding flashcards as a first-class
learning mode as the tutorial, quiz, and exam models grow:

- Create topic-separated decks for BI fundamentals, grain/fanout,
  semi-additive snapshots, BigQuery SQL/view behavior, Looker Studio data-source
  mechanics, metric contracts, data quality controls, privacy/governance, and
  banking-context facts.
- Source every non-project-preference card from `docs/facts/` or deterministic
  dataset outputs. Each card should carry source fact IDs and recommended
  tutorial links.
- Maintain the browser-local flashcards UI with deck browsing, answer reveal,
  review buttons, due-card counts, and JSON export/import.
- Maintain the typed SM-2-inspired scheduler with ease factor, interval,
  repetitions, lapses, due date, and timestamped review history. Keep the
  scheduler contract replaceable.
- Store flashcard progress only in the browser. Do not add a backend, account
  system, analytics, or learner-data upload.
- Keep export/import for flashcard state as one JSON file. Import must validate
  schema/version locally and remain explicitly learner-triggered.
- Keep flashcard content and flashcard review state separate: decks are
  committed curriculum content; learner review state is browser-local and
  user-controlled.
- Record explicit datetime timestamps for review events, scheduler state
  updates, due dates, imports, and exports so the spaced repetition state is
  inspectable and reproducible after JSON export/import.
- Keep content QA and Playwright coverage: deck validation, fact-link
  validation, scheduler tests, JSON import/export tests, responsive UI tests,
  and no-backend network-boundary tests.

## Iteration Rule

The plan and task list are expected to evolve. After each task, review whether
implementation uncovered a true blocker, wrong assumption, or better path. If so,
update `PLAN.md`, split plans, `tasks/`, and continuity docs before continuing.
