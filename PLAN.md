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

Replace remaining sketch-like lessons with full lesson packs:

- Narrative lesson page.
- Browser-rendered challenge lesson steps.
- Exact SQL/evidence snippets.
- Expected result tables.
- Source fact IDs.
- Known failure modes.
- Automatically graded checks and question fixtures.
- Optional cloud-applied branch only after browser-first equivalent exists.

### Phase D - Stronger Challenge And Grading Contracts

Add richer challenge modes and validators:

- Browser config/metric contract validators.
- Dataset-derived expected answer generation.
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

## Iteration Rule

The plan and task list are expected to evolve. After each task, review whether
implementation uncovered a true blocker, wrong assumption, or better path. If so,
update `PLAN.md`, split plans, `tasks/`, and continuity docs before continuing.
