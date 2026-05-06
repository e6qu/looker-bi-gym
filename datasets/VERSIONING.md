# Dataset Versioning

All repository datasets are static synthetic source fixtures. Dataset versions are part of the challenge contract because browser checks, flags, and solution fixtures depend on exact row counts and control totals.

## Version Rules

- Use `datasets/{dataset_id}/{version}/` with versions in `vMAJOR.MINOR.PATCH` format.
- Every version must include `metadata.json` and all referenced source files.
- Challenge manifests must pin both `dataset_id` and `dataset_version`.
- Once a version is used by released challenges, treat it as immutable.
- Do not edit a released version in place when expected outputs, flags, fixture solutions, screenshots, learner instructions, or evidence examples would change.
- If a data correction or expansion changes outputs, add a new version and update affected challenge manifests and fixtures in the same task.
- If a change is documentation-only and does not affect outputs, update the dataset README and record why checks do not need refresh.
- Do not commit generated extracts, warehouse exports, DuckDB files, WASM runtime artifacts, or real banking data.

## Metadata Contract

Each `metadata.json` must declare:

- `dataset_id`: directory-level stable dataset identifier.
- `version`: version directory name.
- `description`: short synthetic training purpose.
- `synthetic_only`: must be `true`.
- `regulatory_context`: context tags such as `BNR`, `FGDB`, `GDPR`, `PSD2`, `DORA`, `EBA`, or AML/CFT-specific local tags.
- `versioning`: release/change metadata when applicable:
  - `status`: `released`, `simulation`, or `draft`.
  - `immutable_after_release`: whether the version is frozen for released challenge use.
  - `supersedes_version`: prior version when this version intentionally changes outputs.
  - `output_changes`: learner-visible or validator-visible output changes.
  - `affected_challenge_fixtures`: challenge IDs whose expected checks or solution fixtures need refresh.
- `tables`: one object per source table:
  - `id`: logical table name.
  - `file`: committed source file name.
  - `grain`: row grain in business terms.
  - `row_count`: expected committed row count.
  - `primary_key`: one or more fields that must be unique.
  - `sensitive_fields`: sensitive fields to exclude from serving outputs.
  - `date_semantics`: lifecycle dates, snapshot dates, effective dates, cutoff timestamps, and semi-additive cautions.
- `relationships`: foreign-key-like checks and intentional missing mapping counts.
- `control_totals`: reconciliation totals used by validators or tutorials.
- `known_issues`: intentional BI/CTF traps with expected counts.
- Domain-specific negative tests, such as the deposits `fanout_negative_test`, when a tutorial relies on a known failure mode.

## Fixture Refresh Record

When a dataset version changes challenge outputs, refresh or explicitly review:

- Manifest scalar checks, row-count checks, date expectations, and flag criteria.
- SQL fixture tests and known-bad negative fixtures.
- Quiz answers that reference dataset facts.
- Cloud-evidence examples, CSV/JSON pasted-output samples, screenshots, and tutorial prose.
- Browser copy that names latest dates, totals, sensitive fields, or known issue counts.

Current changed-output simulation:

| Dataset | Change | Fixtures requiring refresh if adopted |
| --- | --- | --- |
| `deposits-seed/v0.1.1` | Adds `2026-04-01` balance snapshots. | `first-banking-dataset`, `account-owner-fanout` |

The released browser challenge sequence remains pinned to `deposits-seed/v0.1.0`.
