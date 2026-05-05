# 004 - Challenge Manifest Schema

## Status

Complete on 2026-05-05.

## Objective

Define the static challenge manifest format used by the app to render and validate tutorials.

## Dependencies

- [002 - Static App Skeleton](002-static-app-skeleton.md)
- [003 - Content Navigation And Markdown Rendering](003-content-navigation-and-markdown-rendering.md)

## Deliverables

- [x] Manifest schema documented.
- [x] Machine-readable schema added.
- [x] Example manifests added for:
  - `quiz`
  - `browser-sql`
  - `cloud-evidence`
- [x] Manifest support for `required_tools`, with `none` as a valid value for browser-only tasks.
- [x] Manifest loader added to the app.
- [x] Manifest validation command added.

## Verification

- [x] Required fields match `PLAN_BI_TUTORIAL_TUTORIALS.md`.
- [x] Invalid manifests fail validation with clear errors.
- [x] Valid manifests load in the app.
- [x] Challenge indexes are generated from manifests rather than hard-coded page lists.
- [x] Challenges explicitly declare required tools.

## Tests

- [x] Run manifest validation against all valid examples.
- [x] Add or keep one intentionally invalid fixture and verify validation fails.
- [x] Run app build and confirm challenge index renders from manifests.
- [x] Verify each manifest has:
  - `id`
  - `title`
  - `area`
  - `mode`
  - `inputs`
  - `outputs`
  - `checks`
  - `questions`
- [x] Verify every manifest declares `required_tools`.

## Notes

- Schema source: `challenges/schema/challenge-manifest.schema.json`.
- YAML examples: `challenges/manifests/`.
- Invalid fixture: `challenges/fixtures/invalid-manifest.yaml`.
- Generated app catalog: `app/src/generated/challengeCatalog.json`.
- The generated app catalog is a local build artifact and is ignored by git; run `pnpm validate:manifests` or `make check` to regenerate it from YAML manifests.
- Validation command: `pnpm validate:manifests`.
- `pnpm validate:manifests`, `pnpm build`, and `pnpm check` passed on 2026-05-05.
