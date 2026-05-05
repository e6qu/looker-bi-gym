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
