# Changelog

All notable release changes are recorded here.

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

- Local `pnpm build` and `make check` are required release gates.
- Fixture tests cover known-good released challenge solutions and known-bad SQL trap coverage.
- Content QA validates synthetic-data and regulatory-training boundaries.

### Known Verification Gaps

- Live GitHub Pages URL and hash deep-link verification remain pending until the Pages workflow runs in GitHub.
- Safari second-browser smoke verification remains pending until Safari remote automation is explicitly enabled by the user or the manual Safari checklist is completed.

### Breaking Changes

- None. This is the first tracked release.
