# 010 - Cloud Evidence Challenge Pattern

## Objective

Define and implement the first cloud-evidence challenge pattern for tasks that involve BigQuery or Looker Studio but cannot be directly validated by GitHub Pages.

## Dependencies

- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)
- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)

## Deliverables

- `cloud-evidence` challenge mode.
- Evidence input components for:
  - SQL text
  - CSV/JSON pasted result
  - Numeric values
  - Report URL
  - Checklist confirmation
- First placeholder or simple Looker Studio evidence challenge.
- Clear statement of what is mechanically verified and what is self-attested.

## Verification

- The app does not request credentials.
- Evidence is processed locally only.
- Validators can inspect pasted SQL and tabular evidence.
- The challenge clearly marks any manual/self-attested evidence.

## Tests

- Run unit tests for evidence parsers.
- Validate SQL text contains required table/view names.
- Validate pasted CSV/JSON has expected columns.
- Validate numeric evidence against configured ranges.
- Verify an invalid report URL fails format validation.
- Run app build.

## Progress

- [x] Implemented `cloud-evidence` challenge rendering in the app.
- [x] Added evidence inputs for SQL text, pasted CSV/JSON result, numeric values, report URLs, and checklist confirmation.
- [x] Added local cloud-evidence parsers and validators for SQL text, tabular CSV/JSON, numeric ranges, URL format, checklist confirmation, and basic text evidence.
- [x] Updated the Looker Studio evidence manifest into `030 - Looker Studio Evidence Pattern`.
- [x] Clearly separated mechanically verified checks from self-attested checklist evidence in the challenge page.
- [x] Added cloud-evidence unit tests and included them in `make test` / `make check`.

## Verification Notes

- `bun validate:manifests` passed.
- `bun test:cloud-evidence` passed.
- `bun typecheck` passed.
- `bun lint` passed.
- `make check` passed, including manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, and production build.
- Verified by source inspection that cloud-evidence validation uses local state only: no `fetch`, `XMLHttpRequest`, or beacon calls were added.
- Verified by source inspection that the app asks for no credentials, tokens, secrets, or API keys; the only credential-related UI is the safety question that rejects credential storage.
- The production build still reports the known non-failing Vite large-chunk warning for DuckDB-WASM assets.
