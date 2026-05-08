# 014 - Dataset Expansion And Versioning

## Objective

Define and implement dataset versioning so synthetic data can expand beyond the first deposits seed without breaking existing challenges.

## Dependencies

- [005 - Synthetic Dataset Seed](005-synthetic-dataset-seed.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)

## Deliverables

- Dataset versioning policy.
- Dataset metadata format for:
  - Dataset ID.
  - Version.
  - Tables.
  - Grain.
  - Primary keys.
  - Sensitive fields.
  - Date semantics.
  - Known intentional data issues.
  - Regulatory context tags.
- Challenge manifests pin dataset versions.
- Expansion roadmap for:
  - Lending and credit risk.
  - Payments/cards and PSD2/fraud.
  - AML/CFT and sanctions.
  - Finance, GL, and reconciliation.
  - DORA/operations and BI observability.
- Rule that existing dataset versions are not changed in place when expected outputs would change.

## Verification

- Seed dataset has version metadata.
- Challenge manifests reference dataset versions.
- Dataset metadata declares sensitive fields and grains.
- Dataset changes that affect outputs require new version IDs.
- Expansion domains are documented but not required for the MVP browser track.

## Tests

- Run dataset metadata validation.
- Run manifest validation and confirm dataset version references resolve.
- Record which challenge fixtures must be refreshed when dataset versions change.
- Add a simulated changed dataset version and verify old challenge references still resolve to the old version.

## Progress

Completed on 2026-05-06.

Implementation notes:

- Added [Dataset Versioning](../datasets/VERSIONING.md) with the immutable-version policy, metadata contract, and fixture-refresh record.
- Added [Expansion Roadmap](../datasets/EXPANSION_ROADMAP.md) for lending/credit risk, payments/cards/PSD2/fraud, AML/CFT/sanctions, finance/GL/reconciliation, and DORA/operations/BI observability.
- Marked `deposits-seed/v0.1.0` metadata as released and immutable.
- Added `deposits-seed/v0.1.1` as a synthetic changed-output simulation with an added `2026-04-01` balance snapshot.
- Generalized `app/scripts/validate-datasets.ts` so `bun validate:datasets` discovers and validates every committed `datasets/{dataset_id}/{version}/metadata.json` instead of only the original seed version.
- Recorded that adopting `deposits-seed/v0.1.1` would require refreshing `first-banking-dataset` and `account-owner-fanout` checks/fixtures.
- Confirmed released challenge manifests still pin `deposits-seed` `v0.1.0`.

Verification:

- `bun validate:datasets` passed.
- `bun validate:manifests` passed and resolved existing manifest dataset references.
- `bun typecheck` passed.
- `bun test:sql` passed with released challenges still using `v0.1.0` expected outputs.
- `bun lint` passed after fixing the new validator type style.
- `make check` passed, including manifest validation, dataset validation, lint, typecheck, quiz tests, SQL tests, cloud-evidence tests, validator tests, production build, and static-link validation.
- The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
