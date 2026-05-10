# 017 - Content QA And Regulatory Disclaimer Pass

## Objective

Review learning content for clarity, required-tool declarations, synthetic-data warnings, and regulatory disclaimer consistency.

## Dependencies

- [011 - Authoring Guide And Tutorial Conversion Rules](011-authoring-guide-and-tutorial-conversion-rules.md)
- [014 - Dataset Expansion And Versioning](014-dataset-expansion-and-versioning.md)

## Deliverables

- Content QA checklist.
- Required-tool declaration check across challenges.
- Synthetic-data warning check across tutorials and datasets.
- Regulatory disclaimer check across docs, regulations, and challenges.
- Link/reference review across:
  - `docs/`
  - `regulations/`
  - `tutorials/`
  - `_development/tasks/`
  - Challenge content.
- Bug entries for broken or ambiguous content found during review.

## Verification

- Every challenge declares required tools.
- Every challenge using regulatory context links to relevant regulation briefs.
- Every dataset/challenge states synthetic-data-only policy where appropriate.
- Content does not imply legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Broken links are fixed or documented in `BUGS.md`.

## Tests

- Run required-tools manifest validation.
- Run link validation where tooling exists.
- Run text search for real-data warning language in challenge/dataset content.
- Run text search for regulatory disclaimer language in regulation-dependent content.
- Manually review at least one browser-only and one cloud-evidence challenge for clarity.

## Status

Complete on 2026-05-06.

## Implementation Notes

- Added `docs/11-content-qa-checklist.md` and linked it from `docs/README.md`.
- Added a shared regulatory-context link map in the app and rendered regulation brief links on challenge detail pages.
- Added explicit training-boundary disclaimer language to every regulation brief and to docs that discuss credentials, warehouse access, regulatory sources, or production-style controls.
- Added synthetic-data boundary language to tutorial files that did not previously state it directly.
- Tightened challenge copy for the fanout and cloud-evidence challenges so their synthetic-data boundary is explicit.
- Added `bun test:content-qa` to validate:
  - challenge required-tool declarations;
  - challenge regulatory-context links;
  - regulation disclaimer language;
  - tutorial synthetic-data language;
  - dataset synthetic-only metadata and README language;
  - internal Markdown links across docs, regulations, tutorials, tasks, challenges, datasets, and app README.
- Wired content QA into `make test`, `make check`, app `check`, and CI.

## Verification Notes

- Every released and draft challenge declares `required_tools`.
- Every released challenge with `regulatory_context` now links to regulation briefs in the browser challenge instructions.
- Dataset versions declare `synthetic_only: true`; the changed-output fixture README now also states that it is not derived from real bank data.
- Browser-only manual review covered `010 - First Banking Dataset Inspection`.
- Cloud-evidence manual review covered `030 - Looker Studio Evidence Pattern`.
- No broken internal Markdown links were found by the new content QA gate after fixes.

## Test Runs

- `bun test:content-qa` initially failed because the new QA assertion rejected "no Google Cloud CLI"; fixed the assertion to allow explicit no-CLI boundary language.
- `bun test:content-qa` then failed because `regulations/README.md` did not include the model-risk disclaimer phrase; updated it and reran successfully.
- `bun validate:manifests` passed.
- `bun typecheck` passed.
- `bun lint` passed.
- `bun build` passed with Vite's existing non-failing DuckDB-WASM large chunk warning.
- `make check` passed, including manifest validation, dataset validation, lint, typecheck, quiz tests, SQL smoke tests, solution fixture tests, cloud-evidence tests, progress-export tests, content QA, validator tests, production build, and static-link validation.
