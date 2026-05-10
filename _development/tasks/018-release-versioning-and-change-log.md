# 018 - Release Versioning And Change Log

## Objective

Define how app versions, dataset versions, challenge versions, and release notes are tracked.

## Dependencies

- [012 - CI And GitHub Pages Deployment](012-ci-and-github-pages-deployment.md)
- [014 - Dataset Expansion And Versioning](014-dataset-expansion-and-versioning.md)
- [015 - Solution Fixtures And Golden Tests](015-solution-fixtures-and-golden-tests.md)

## Deliverables

- Versioning policy for:
  - App.
  - Challenge catalog.
  - Datasets.
  - Regulation briefs.
- `CHANGELOG.md` or equivalent release notes.
- App displays current version/build information.
- Challenge manifests include version or revision metadata.
- Dataset metadata includes version.
- Release checklist includes fixture tests and content QA.

## Verification

- A learner can tell which app/content version they used.
- Progress export references app/content/dataset versions.
- Releases do not silently change old challenge expected outputs.
- Release notes describe breaking changes to datasets or challenges.

## Tests

- Run build and confirm version/build metadata is present.
- Run manifest validation and confirm challenge versions exist.
- Run dataset metadata validation and confirm dataset versions exist.
- Run golden fixture tests before release.
- Confirm `CHANGELOG.md` records the release contents.

## Status

Complete on 2026-05-09.

## Implementation Notes

- Set the first tracked release version to `0.1.0` in root and app package metadata.
- Added [Release Versioning](../../VERSIONING.md) covering app/content, challenge catalog, datasets, regulation briefs, and the release checklist.
- Added [Changelog](../../CHANGELOG.md) with the `0.1.0` release contents, verification gates, known verification gaps, and breaking-change notes.
- Added `app/src/release.ts` so the static app exposes app version, content version, and optional `VITE_BUILD_REF`.
- Displayed version/build metadata in the app footer and Settings page.
- Required top-level challenge `version` metadata in the manifest schema and added `v0.1.0` to released and draft challenge manifests.
- Added challenge versions to challenge cards, challenge detail pages, and progress export completed-challenge entries.
- Updated authoring guidance, app README, test fixtures, and docs links for the new release metadata.
- Confirmed generated catalog JSON, build output, dependency directories, and WASM runtime assets remain ignored and are not listed as normal git changes.

## Verification Notes

- Learners can see app/content/build metadata in the footer and Settings.
- Progress exports now include app/content versions, challenge versions, and dataset versions.
- Released challenges remain pinned to `deposits-seed/v0.1.0`; `deposits-seed/v0.1.1` remains a changed-output fixture only.
- Release notes state that this first tracked release has no breaking changes.
- Live GitHub Pages URL/hash deep-link verification remains pending until the workflow runs in GitHub.
- Safari second-browser verification remains pending until Safari remote automation is explicitly enabled or the manual checklist is completed.

## Test Runs

- `bun validate:manifests` passed and required challenge versions through the schema.
- `bun validate:datasets` passed and confirmed dataset metadata versions.
- `bun test:progress-export` passed after updating expectations to `0.1.0` and challenge versions.
- `bun test:content-qa` passed with the new release links.
- `bun typecheck` initially failed because `VITE_BUILD_REF` needed indexed access under `noPropertyAccessFromIndexSignature`; fixed by narrowing the env value.
- `bun lint` initially failed on unsafe env assignment; fixed by narrowing the env value from `unknown`.
- `bun typecheck` passed after the fix.
- `bun lint` passed after the fix.
- `bun build` passed with Vite's existing non-failing DuckDB-WASM large chunk warning.
- `make check` passed, including manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture tests, cloud-evidence tests, progress-export tests, content QA, validator tests, production build, and static-link validation.
