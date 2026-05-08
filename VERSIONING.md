# Release Versioning

This repository uses one public release version for the static app and content bundle, plus pinned versions for challenge and dataset contracts.

## App And Content

- `package.json` and `app/package.json` carry the public app release version.
- The browser displays the app version, content version, and build reference in the footer and Settings page.
- `VITE_BUILD_REF` may be set by CI or a local release build to expose a commit SHA, tag, or workflow run label. If it is unset, the app shows `build local`.
- The progress export records `app_version` and `content_version` so a reviewer can identify the content bundle used by the learner.

Use semantic versioning:

- Patch: copy, styling, docs, or non-breaking validation fixes that do not change challenge expected outputs.
- Minor: new challenges, new optional tutorials, new dataset versions, or additive app features.
- Major: breaking storage/export changes, removed challenges, changed released challenge flags, or repointed challenge outputs that require learner rework.

## Challenge Catalog

- Every released or draft challenge manifest must include top-level `version` in `vMAJOR.MINOR.PATCH` format.
- Challenge IDs are stable route, progress, flag, and fixture keys. Do not rename a released challenge ID.
- Bump a challenge version when learner-visible instructions, required tools, checks, flags, expected outputs, required evidence, or pinned dataset versions change.
- Do not silently edit released expected outputs. If a dataset or validator change alters expected answers, update the challenge version, fixtures, task notes, and `CHANGELOG.md` together.
- The generated browser catalog is rebuildable from YAML manifests and must remain ignored.

## Datasets

Dataset versioning lives in [datasets/VERSIONING.md](datasets/VERSIONING.md). In short:

- Challenge manifests pin both `dataset_id` and `dataset_version`.
- Released dataset versions are immutable when challenge outputs, flags, fixtures, or learner-visible evidence depend on them.
- Output-changing corrections require a new dataset version and refreshed affected fixtures.

## Regulation Briefs

- Regulation briefs are training context, not legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Briefs follow the app/content release version unless a future task adds per-brief front matter.
- Material changes to a regulation brief must be recorded in `CHANGELOG.md` under content/regulatory notes.
- If a regulation tag is added to a challenge, the app regulatory-context link map and content QA test must cover it.

## Release Checklist

Before tagging or publishing a release:

1. Update package versions and challenge manifest versions as needed.
2. Update `CHANGELOG.md` with app, content, challenge, dataset, and known verification gaps.
3. Run `pnpm validate:manifests` and confirm every challenge has a version.
4. Run `pnpm validate:datasets`.
5. Run `pnpm test:fixtures` for known-good and known-bad challenge coverage.
6. Run `pnpm test:content-qa`.
7. Run `pnpm build`.
8. Run `make check`.
9. Confirm `git status --short` does not include rebuildable generated artifacts, build output, WASM runtime files, dependency directories, or local OS/editor files.
