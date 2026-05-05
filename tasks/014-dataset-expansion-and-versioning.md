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
