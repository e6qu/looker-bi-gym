# Plan: Browser-Hosted Banking BI Tutorial Platform

## Purpose

Build a fully static GitHub Pages learning platform for technical BI in banking. The platform should combine documentation, synthetic banking datasets, mechanically verifiable CTF-style tutorials, EU/Romanian regulatory context, and browser-only execution.

The default learner path should run in the browser. If a tutorial requires local tools, those tools must be explicitly specified, common, cross-platform, and not esoteric. AI assistance is allowed and encouraged, but every tutorial must require verifiable work.

## Split Plans

- [PLAN_BI_TUTORIAL_APP.md](PLAN_BI_TUTORIAL_APP.md): app skeleton, technical stack, runtime requirements, validation platform, storage, and GitHub Pages deployment.
- [PLAN_BI_TUTORIAL_TUTORIALS.md](PLAN_BI_TUTORIAL_TUTORIALS.md): curriculum, challenge model, data-source contract, verification patterns, and authoring rules.
- [tasks/README.md](tasks/README.md): numbered execution tasks with verification and tests.

## Chosen Direction

- Static browser app hosted on GitHub Pages.
- React, TypeScript, Vite.
- `pnpm` for repository development commands.
- DuckDB-WASM for browser SQL challenges.
- Markdown for long-form content.
- YAML source manifests with a locally generated JSON catalog for the app.
- Static synthetic banking datasets only.
- Local browser storage for progress and flags.
- GitHub Actions for build, validation, and publishing.

## Non-Negotiables

- No backend.
- No real banking data.
- No unspecified learner-installed tools.
- Avoid esoteric or highly platform-specific tooling.
- No BigQuery or Looker Studio credentials in the app.
- No hidden server-side validation.
- No legal, regulatory, accounting, privacy, or compliance advice.

## Iteration Rule

The plan and task list are expected to evolve. After each task, review whether implementation uncovered a true blocker, wrong assumption, or better path. If so, update `PLAN.md`, the split plans, `tasks/`, and continuity docs before continuing.

## Immediate Execution Order

1. Establish repository structure and task tracking.
2. Scaffold the static app.
3. Add content navigation.
4. Define challenge manifests.
5. Add first synthetic datasets.
6. Add quiz and browser-SQL challenge runtime.
7. Add validators, flags, and progress.
8. Add first working challenges.
9. Add solution fixtures and golden validation tests.
10. Add CI and GitHub Pages publishing.
11. Add dataset expansion/versioning, progress export, content QA, and release tracking.

See [tasks/README.md](tasks/README.md) for the detailed task list.
