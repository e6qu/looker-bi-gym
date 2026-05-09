# Changelog

All notable release changes are recorded here.

## Unreleased

### Added

- Source fact register for fact-backed tutorial steps and quiz questions.
- Area-organized fact corpus under `docs/facts/` with short source quotes,
  cross-links, and project-architecture facts.
- Rendered challenge lesson steps with instructions, checkpoints, failure modes,
  and source fact IDs.
- Content QA enforcement for source fact references and step-by-step tutorial
  sections.
- Future tasks for deterministic local dataset packs, real tutorial instruction
  packs, and expanded grading contracts.

### Changed

- Replaced the old early-execution `PLAN.md` sequence with current baseline,
  clarifications, and future phases.
- Rewrote the released tutorial Markdown path as concrete browser-first lessons.
- Replaced generic challenge questions with fact-backed questions tied to
  regulation, product documentation, browser storage, and synthetic dataset
  checkpoints.
- Bumped released challenge contracts to `v0.2.0`.

## 0.1.0 - 2026-05-09

Initial static training release.

### Added

- Static React + TypeScript + Vite app for GitHub Pages.
- Markdown navigation for docs, regulation briefs, and tutorials.
- Validated YAML challenge manifests and generated browser challenge catalog.
- Synthetic deposits seed dataset `deposits-seed/v0.1.0`.
- Changed-output dataset simulation `deposits-seed/v0.1.1`; released challenges remain pinned to `v0.1.0`.
- Browser quiz runtime.
- DuckDB-WASM browser SQL runtime.
- Browser validators, local flags, local progress storage, and progress reset.
- Released challenge sequence:
  - `orientation-quiz` `v0.1.0`
  - `first-banking-dataset` `v0.1.0`
  - `account-owner-fanout` `v0.1.0`
  - `looker-studio-evidence` `v0.1.0`
- Cloud-evidence challenge pattern with local evidence checks and no credential collection.
- Challenge authoring guide and draft manifest validation.
- Solution fixtures and golden tests for released challenge coverage.
- Progress export format `looker-bi-gym.progress-export.v1`.
- Content QA checks for required tools, regulatory links, disclaimers, synthetic-data boundaries, and internal Markdown links.
- CI and GitHub Pages workflows.
- App quality/accessibility pass, browser QA checklist, and static favicon.
- Release versioning policy and visible app/content/build metadata.

### Verification

- Local `bun run build` and `make check` are required release gates.
- Fixture tests cover known-good released challenge solutions and known-bad SQL trap coverage.
- Content QA validates synthetic-data and regulatory-training boundaries.

### Known Verification Gaps

- Live GitHub Pages URL and hash deep-link verification remain pending until the Pages workflow runs in GitHub.
- Safari second-browser smoke verification remains pending until Safari remote automation is explicitly enabled by the user or the manual Safari checklist is completed.

### Breaking Changes

- None. This is the first tracked release.
