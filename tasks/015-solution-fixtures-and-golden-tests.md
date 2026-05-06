# 015 - Solution Fixtures And Golden Tests

## Objective

Create known-good and known-bad solution fixtures so challenge validators can be tested mechanically before release.

## Dependencies

- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)
- [014 - Dataset Expansion And Versioning](014-dataset-expansion-and-versioning.md)

## Deliverables

- Fixture directory structure.
- At least one known-good fixture per released challenge.
- At least one known-bad fixture for each CTF/trap challenge.
- Fixture runner integrated with validator framework.
- CI command to run all golden tests.
- Documentation for adding fixtures with a new challenge.

## Verification

- Good fixtures pass.
- Bad fixtures fail for the expected reason.
- Challenge 020 includes a bad fixture for the naive account-owner fanout join.
- Fixtures are deterministic and do not depend on browser storage.
- A challenge cannot be marked release-ready without fixture coverage or a documented exception.

## Tests

- Run all fixture tests locally.
- Temporarily alter a good fixture and verify the test fails.
- Temporarily alter a bad fixture into a passing solution and verify the bad-fixture expectation fails.
- Run app build after fixture integration.
- Run CI validation command that includes fixture tests.

## Notes From Task 014

- `deposits-seed/v0.1.1` intentionally changes outputs from `v0.1.0`.
- If a challenge is repointed from `v0.1.0` to `v0.1.1`, refresh golden fixtures for `first-banking-dataset` and `account-owner-fanout` together with manifest checks.

## Status

Completed on 2026-05-06.

## Implementation Notes

- Added committed solution fixtures under `challenges/solution-fixtures/`:
  - one known-good fixture for each released challenge: `orientation-quiz`, `first-banking-dataset`, `account-owner-fanout`, and `looker-studio-evidence`;
  - known-bad SQL fixtures for `first-banking-dataset` and `account-owner-fanout`;
  - Challenge 020 includes `known-bad-naive-owner-fanout`, which fails for `correct_latest_total`, `fanout_delta`, and `overstatement_pct`.
- Added `app/scripts/test-solution-fixtures.ts` to load released manifests, enforce fixture coverage, run quiz/cloud-evidence/browser-SQL validators, verify dataset pins, and ensure known-bad fixtures fail for expected check IDs.
- Moved inline SQL golden cases out of `app/scripts/test-sql.ts`; that script now remains focused on DuckDB-WASM Node runtime smoke coverage.
- Added `pnpm test:fixtures`, Makefile `test-fixtures`, and a CI workflow step.
- Documented fixture structure and authoring expectations in `challenges/solution-fixtures/README.md`, `challenges/AUTHORING.md`, and `challenges/README.md`.

## Verification Notes

- `pnpm test:fixtures` passed with 6 solution fixtures for 4 released challenges.
- Temporarily changed `first-banking-dataset/known-good.sql` to return `COUNT(*) + 1`; `pnpm test:fixtures` failed as expected, then the fixture was restored.
- Temporarily changed `account-owner-fanout/known-bad-naive-owner-fanout.sql` into a passing solution; `pnpm test:fixtures` failed because the known-bad fixture passed, then the fixture was restored.
- `pnpm test:sql`, `pnpm test:quiz`, `pnpm test:cloud-evidence`, and `pnpm test:validators` passed.
- `pnpm typecheck` and `pnpm lint` passed.
- `pnpm build` passed; Vite still reports the existing non-failing large DuckDB-WASM chunk warning.
- `make check` passed and includes `pnpm test:fixtures`.
