# 011 - Authoring Guide And Tutorial Conversion Rules

## Objective

Document how to add new tutorials and convert existing markdown tutorials into challenge format.

## Dependencies

- [009 - First Browser Challenges](009-first-browser-challenges.md)
- [010 - Cloud Evidence Challenge Pattern](010-cloud-evidence-challenge-pattern.md)

## Deliverables

- Authoring guide for new challenges.
- Manifest field reference.
- Validator reference.
- Dataset reference.
- Tutorial conversion checklist.
- Required-tools policy.
- Example challenge templates.

## Verification

- A new challenge author can identify required files and fields.
- The guide explains how to choose challenge mode.
- The guide explains how to define verification and tests.
- The guide prohibits real banking data and secrets.
- The guide requires exact tool lists for any non-browser task.
- The guide rejects esoteric or highly platform-specific tooling.

## Tests

- Use the guide to create a minimal draft challenge.
- Run manifest validation on the draft.
- Run app build with the draft included.
- Verify the guide links to dataset, regulation, and task references.
- Search the guide for explicit warnings against real data and credentials.
- Search the guide for required-tools policy language.

## Progress

- [x] Added the challenge authoring guide in `challenges/AUTHORING.md`.
- [x] Added a manifest field reference, validator reference, dataset reference, required-tools policy, tutorial conversion checklist, and example templates for quiz, browser SQL, and cloud-evidence challenges.
- [x] Added `challenges/drafts/minimal-authoring-draft.yaml` as a validation-only draft challenge created from the guide.
- [x] Updated manifest validation to validate draft manifests while keeping draft files out of the generated browser challenge catalog.
- [x] Updated `challenges/README.md` to link the guide and document draft validation behavior.

## Verification Notes

- `pnpm validate:manifests` passed with the draft manifest included in validation.
- `pnpm build` passed with draft validation included in the build path.
- `make check` passed, including manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, and production build.
- Verified with `rg` that the guide links to dataset, regulation, task, tutorial, and manifest-schema references.
- Verified with `rg` that the guide explicitly warns against real banking data, credentials, secrets, API keys, esoteric tooling, highly platform-specific tooling, and missing `required_tools` policy language.
- Verified with `rg` that `minimal-authoring-draft` is absent from `app/src/generated/challengeCatalog.json` after validation; only published manifests are emitted to the browser catalog.
- The production build still reports the known non-failing Vite large-chunk warning for DuckDB-WASM assets.
