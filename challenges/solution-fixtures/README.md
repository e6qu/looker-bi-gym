# Solution Fixtures

Solution fixtures are committed golden cases for released challenge manifests. They let the project test challenge validators before release without browser storage, real banking data, cloud credentials, or manual grading.

## Structure

Fixtures live under:

```text
challenges/solution-fixtures/{challenge_id}/
```

Each executable fixture is a JSON file with:

- `fixture_id`: stable fixture identifier within the challenge.
- `challenge_id`: manifest ID from `challenges/manifests/`.
- `mode`: challenge mode.
- `kind`: `known-good` or `known-bad`.
- `description`: short purpose.
- `expected.required_passed`: whether the complete fixture should pass required checks and required questions.

Browser SQL fixtures also include:

- `dataset_id` and `dataset_version`, pinned to the manifest dataset reference.
- `sql_file`, a sibling SQL file with the submitted query.
- `answers`, when the SQL challenge also has required questions.

Cloud-evidence fixtures include:

- `evidence`, keyed by evidence/check target IDs.
- `answers`, when the challenge has required questions.

Browser-config fixtures include:

- `evidence`, keyed by JSON evidence/check target IDs.
- `answers`, when the challenge has required questions.

Quiz fixtures include:

- `answers`, keyed by question IDs.

## Coverage Rule

Every released manifest under `challenges/manifests/` must have at least one
`known-good` fixture. CTF or trap challenges must also have at least one
`known-bad` fixture that fails for the expected check IDs. Browser-config
challenges with exclusion checks also need a known-bad fixture proving the
forbidden value is rejected.

A release-ready exception must be documented before the challenge is shipped. Do not add a released manifest without either executable fixture coverage or a documented exception in the task notes and continuity files.

## Dataset Version Pins

Browser SQL fixtures pin the dataset version explicitly. Current SQL fixtures use `deposits-seed/v0.1.0` for the deposits track and `lending-month-end/v0.1.0` for the lending month-end exposure challenge.

`deposits-seed/v0.1.1` intentionally changes expected outputs. If `first-banking-dataset` or `account-owner-fanout` is repointed to `v0.1.1`, refresh the fixture SQL, expected failing checks, and manifest validator values together.
