# Challenge Authoring Guide

This guide is the working contract for adding browser-first banking BI tutorials and converting tutorial sketches into validated challenge manifests.

Start from these references:

- [Task index](../tasks/README.md) and the current task file for execution order.
- [Manifest schema](schema/challenge-manifest.schema.json) for the machine-readable field contract.
- [Published manifests](manifests/) for released challenge examples.
- [Draft manifests](drafts/) for validation-only authoring smoke tests.
- [Solution fixtures](solution-fixtures/) for release-ready known-good and known-bad validator coverage.
- [Deposits seed dataset](../datasets/deposits-seed/v0.1.0/README.md) and [dataset metadata](../datasets/deposits-seed/v0.1.0/metadata.json).
- [Tutorial data-source contract](../tutorials/data-sources.md) and [tutorial index](../tutorials/README.md).
- [Regulation briefs](../regulations/README.md) for EU/Romanian context notes.

These materials are technical training content, not legal, regulatory, accounting, privacy, compliance, or model-risk advice.

## Authoring Flow

1. Pick a learning objective and challenge mode.
2. Declare the input data grain, sensitive fields, date semantics, outputs, checks, questions, required tools, and flag criteria.
3. Author YAML in `challenges/manifests/` for a released challenge, or `challenges/drafts/` for a validation-only draft.
4. Add or update solution fixtures and tests when the challenge uses SQL, validators, cloud evidence, or a new dataset expectation.
5. Run `bun run validate:manifests`, `bun run validate:datasets` when datasets are referenced, and `make check` before considering the task done.

Draft manifests are validated with the same schema as published manifests, but only files in `challenges/manifests/` are emitted to the browser catalog.

## Safety Rules

Do not use real banking data. Challenge files, datasets, evidence examples, screenshots, URLs, SQL outputs, and docs must use synthetic training data only.

Do not add credentials, secrets, API keys, OAuth tokens, service account keys, private URLs, or user tracking. Cloud-evidence challenges may ask for inspectable evidence, but the static app must not collect or store credentials.

Do not require esoteric or highly platform-specific tooling. The default learner path is browser-first. If a challenge cannot run fully in the browser, it must explain why and list exact tools in `required_tools`.

Do not require Google Cloud CLI, BigQuery CLI, Python, Docker, or alternate package managers in early learner tutorials. Repository development uses Bun; learner-facing tutorials only require it when the task explicitly targets local app development.

## Choosing Mode

Use `quiz` when the work is conceptual and can be graded through multiple-choice, select-all, or numeric answers. The current browser runtime grades those three question types.

Use `browser-sql` when the learner writes SQL over static synthetic CSV datasets loaded into DuckDB-WASM. Prefer this for grain, fanout, reconciliation, semi-additive balance, and sensitive-field exclusion exercises.

Use `browser-config` when the learner edits structured text such as a metric contract, mapping, or governance register. This mode is planned in the schema; do not release a browser-config challenge until rendering and validators exist or the task documents the manual gap.

Use `cloud-evidence` when the learner optionally works in Google Cloud Console, BigQuery UI, or Looker Studio UI and pastes local evidence into the static app. Checks must clearly separate mechanically validated evidence from self-attested checklist items.

Use `capstone` when completion depends on multiple artifacts from earlier challenges. Do not release a capstone until its local checks and any manual-review boundaries are explicit.

## Manifest Field Reference

Every manifest must include:

| Field                | Rule                                                                                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | Stable kebab-case identifier used by routes, progress, flags, and fixtures. Do not rename after release.                                                                                  |
| `version`            | Challenge contract version in `vMAJOR.MINOR.PATCH` format. Bump when instructions, checks, flags, expected outputs, required evidence, required tools, or pinned dataset versions change. |
| `title`              | Human-readable title, usually prefixed with the sequence number.                                                                                                                          |
| `area`               | One of the schema areas: orientation/source data, warehouse/metrics, dashboard design, governance/operations, or capstone.                                                                |
| `mode`               | One of `quiz`, `browser-sql`, `browser-config`, `cloud-evidence`, or `capstone`.                                                                                                          |
| `difficulty`         | `intro`, `beginner`, `intermediate`, `advanced`, or `capstone`.                                                                                                                           |
| `estimated_minutes`  | Realistic learner time from 1 to 480 minutes.                                                                                                                                             |
| `prerequisites`      | Challenge IDs that should be complete first, or `[]`.                                                                                                                                     |
| `business_scenario`  | Banking BI scenario with enough context to make the task realistic.                                                                                                                       |
| `regulatory_context` | Any relevant tags from `BNR`, `DORA`, `EBA`, `FGDB`, `GDPR`, `PSD2`, or `Romania Law 190`. Use an empty list only when no tag matters.                                                    |
| `inputs`             | Datasets, tables, markdown, browser forms, or cloud UI sources. Include grain, date semantics, dataset version, and sensitive fields where relevant.                                      |
| `outputs`            | The artifact the learner creates, such as `answer-set`, `sql-result`, `sql-text`, `dashboard-evidence`, `metric-contract`, or `written-note`.                                             |
| `checks`             | Deterministic or manual checks tied to outputs or evidence. Required checks gate completion unless marked advisory.                                                                       |
| `questions`          | At least one question. Use supported runtime types for released challenges unless the mode has custom handling.                                                                           |
| `required_tools`     | `none` for browser-only work, otherwise an exact tool array.                                                                                                                              |
| `flag`               | Local flag ID and criteria. Criteria must match what the app or documented review can verify.                                                                                             |

Optional fields:

| Field             | Rule                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `hints`           | Staged help, with `level` from 1 to 5. Do not reveal the full solution in the first hint.               |
| `evidence`        | Required for most cloud-evidence challenges. Describe the pasted value and whether it is self-attested. |
| `rubric`          | Use for manual-review or capstone scoring notes.                                                        |
| `next_challenges` | Challenge IDs that continue the path.                                                                   |

## Required Tools Policy

Browser-only challenges must set:

```yaml
required_tools: none
```

Any non-browser task must use an array with exact tools:

```yaml
required_tools:
  - name: Looker Studio
    purpose: Build browser UI report evidence.
    required: false
    platform_notes: Browser UI only; no CLI, service account key, or app-stored credential.
```

For required tools, include `version` or a version range when tool behavior matters. Include platform notes for operating-system differences. Reject tools that are uncommon, paid-only, vendor-locked without a browser alternative, hard to install cross-platform, or unnecessary for the learning objective.

## Dataset Reference

The first released dataset is `deposits-seed` `v0.1.0` under `datasets/deposits-seed/v0.1.0/`.

Use manifest input fields to pin it:

```yaml
inputs:
  - id: deposits_seed
    type: dataset
    description: Static deposits dataset with Romanian branch geography and RON/EUR balances.
    dataset_id: deposits-seed
    dataset_version: v0.1.0
    tables:
      - accounts
      - account_daily_balances
    sensitive_fields:
      - account_id
      - customer_id
      - synthetic_iban
    date_semantics:
      - business_date is a daily balance snapshot date.
    grain: One row per account per business_date in account_daily_balances.
```

Current DuckDB table names available to browser SQL challenges are the CSV file names without extensions: `branches`, `products`, `accounts`, `account_owners`, and `account_daily_balances`.

Known traps in `deposits-seed`:

- `account_owners` is many-to-many and can multiply balances.
- `account_daily_balances` is semi-additive across time.
- `account_id`, `customer_id`, and `synthetic_iban` model sensitive serving-output fields.
- Account `A1006` has a missing branch mapping.
- Account `A1005` ownership shares total above 100 percent.

Do not change an existing dataset version in place when expected outputs, flags, or challenge checks would change. Add a new version and update affected manifests and fixtures.

## Validator Reference

Quiz checks use `quiz-answer`; the quiz runtime currently supports `multiple-choice`, `select-all`, and `numeric` questions.

Browser SQL result validators:

| Check type                  | Expected shape                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `required-column`           | String or string array of result columns that must exist.                                      |
| `forbidden-column`          | String or string array of result columns that must not exist.                                  |
| `row-count`                 | Integer for exact count, or `{ operator: equals                                                | at-least | at-most, value: integer }`. |
| `unique-key`                | String or string array of columns that must uniquely identify rows.                            |
| `aggregate-total`           | `{ column, value, tolerance }` checked against one result row.                                 |
| `scalar-aggregate`          | Same shape as `aggregate-total`; use for one-row aggregate outputs.                            |
| `sensitive-field-exclusion` | String array of forbidden sensitive fields, combined with sensitive fields declared on inputs. |

Cloud evidence validators:

| Check type                 | Expected shape                                                 |
| -------------------------- | -------------------------------------------------------------- |
| `sql-text-contains`        | String or string array that pasted SQL must contain.           |
| `tabular-required-columns` | String array of required CSV/JSON evidence columns.            |
| `numeric-range`            | `{ min, max }` with at least one bound.                        |
| `report-url-format`        | `{ require_https: boolean, allowed_hosts: [...] }`.            |
| `checklist-confirmed`      | `true` when the learner must confirm an inspectable condition. |
| `evidence-format`          | String or string array that text evidence must mention.        |

Schema-only or future/manual checks include `reconciliation`, `manual-review`, and some question types such as `matching` and `short-evidence`. Do not rely on them as the only release gate until a runtime or manual procedure is documented in the task file.

## Verification And Tests

A release-ready challenge must document how it is verified. Prefer automated tests:

- `bun run validate:manifests` for schema validity, unique IDs, invalid-fixture failure, and catalog generation.
- `bun run validate:datasets` when the challenge references dataset facts, relationships, control totals, or known issues.
- `bun run test:quiz` for quiz grading changes.
- `bun run test:sql` for browser SQL runtime smoke coverage.
- `bun run test:fixtures` for released challenge known-good and expected known-bad solution fixtures.
- `bun run test:cloud-evidence` for cloud evidence parser and validator changes.
- `bun run test:validators` for shared validator behavior.
- `make check` before marking a task complete.

Every released manifest under `challenges/manifests/` must have at least one known-good solution fixture under `challenges/solution-fixtures/{challenge_id}/`. Golden fixtures should prove both sides of a trap: one known-good solution passes and one known-bad solution fails for the expected check IDs. If a task cannot automate a check yet, write the manual procedure and residual risk in the relevant `tasks/*.md` file and continuity docs.

## Tutorial Conversion Checklist

When converting a markdown tutorial into a challenge:

- Keep the scenario, but rewrite passive walkthrough steps into concrete learner work.
- Pin every input table, file, dataset ID, and dataset version.
- Declare grain and date semantics for every fact-like input.
- Declare sensitive fields and add a check that excludes them from serving outputs when relevant.
- Convert prose outcomes into `outputs`, `checks`, `questions`, and `flag.criteria`.
- Add regulatory context tags only where the challenge actually depends on that context, then link to the matching [regulation briefs](../regulations/README.md).
- Keep browser-first tasks at `required_tools: none`.
- For cloud-applied tasks, list exact browser UI tools and state that no credentials, secrets, API keys, service account keys, OAuth tokens, or private data should be pasted into the app.
- Add hints that guide reasoning before revealing implementation details.
- Add or update solution fixtures/tests for any SQL, data, or evidence validation behavior.
- Run the validation commands and record results in the task file and continuity docs.

## Example Templates

### Quiz

```yaml
id: example-orientation-check
version: v0.1.0
title: 000 - Example Orientation Check
area: orientation-and-source-data
mode: quiz
difficulty: intro
estimated_minutes: 5
prerequisites: []
business_scenario: Confirm a project rule before opening a banking BI challenge.
regulatory_context:
  - GDPR
required_tools: none
inputs:
  - id: authoring_guide
    type: markdown
    description: Challenge authoring guide for safe training content.
    path: challenges/AUTHORING.md
outputs:
  - id: quiz_answers
    type: answer-set
    description: Browser-local answers to authoring questions.
checks:
  - id: synthetic_only
    type: quiz-answer
    description: Learner confirms only synthetic data is allowed.
    target: q_synthetic_only
    expected: synthetic_only
questions:
  - id: q_synthetic_only
    type: multiple-choice
    prompt: What data may be committed to challenge files?
    options:
      - id: synthetic_only
        label: Synthetic training data only.
      - id: production_extract
        label: A masked production extract.
    answer: synthetic_only
    explanation: Real banking data is not allowed in this repository.
flag:
  id: flag-example-orientation-check
  criteria:
    - Answer the synthetic-data question correctly.
```

### Browser SQL

```yaml
id: example-balance-profile
version: v0.1.0
title: 010 - Example Balance Profile
area: orientation-and-source-data
mode: browser-sql
difficulty: beginner
estimated_minutes: 15
prerequisites:
  - orientation-quiz
business_scenario: Profile the latest synthetic deposit balance snapshot before dashboard work.
regulatory_context:
  - BNR
  - GDPR
required_tools: none
inputs:
  - id: deposits_seed
    type: dataset
    description: Static deposits dataset with daily balance snapshots.
    dataset_id: deposits-seed
    dataset_version: v0.1.0
    tables:
      - account_daily_balances
    sensitive_fields:
      - account_id
    date_semantics:
      - business_date is a daily balance snapshot date.
    grain: One row per account per business_date.
outputs:
  - id: profile_result
    type: sql-result
    description: One row with latest business date and ledger total.
checks:
  - id: required_columns
    type: required-column
    description: Result includes the expected profile columns.
    target: profile_result
    expected:
      - latest_business_date
      - ledger_total
  - id: one_row
    type: row-count
    description: Result returns one profile row.
    target: profile_result
    expected: 1
questions:
  - id: q_snapshot
    type: multiple-choice
    prompt: Why should balances not be summed across business dates?
    options:
      - id: semi_additive
        label: They are semi-additive snapshots.
      - id: missing_currency
        label: They do not include currency codes.
    answer: semi_additive
    explanation: Snapshot balances are additive across accounts for one date, not across time.
flag:
  id: flag-example-balance-profile
  criteria:
    - SQL checks pass.
    - Snapshot question is answered correctly.
```

### Cloud Evidence

```yaml
id: example-dashboard-evidence
version: v0.1.0
title: 030 - Example Dashboard Evidence
area: looker-studio-and-dashboard-design
mode: cloud-evidence
difficulty: intermediate
estimated_minutes: 25
prerequisites:
  - first-banking-dataset
business_scenario: Collect local evidence that a browser-built dashboard uses the governed serving view.
regulatory_context:
  - GDPR
required_tools:
  - name: Looker Studio
    purpose: Build browser UI report evidence.
    required: false
    platform_notes: Browser UI only; no service account keys or app-stored credentials.
inputs:
  - id: cloud_ui
    type: cloud-ui
    description: Optional browser UI workflow for dashboard evidence.
outputs:
  - id: report_url
    type: dashboard-evidence
    description: Report URL format evidence.
checks:
  - id: report_url_format
    type: report-url-format
    description: Report URL uses a plausible Looker Studio host.
    target: report_url
    expected:
      require_https: true
      allowed_hosts:
        - lookerstudio.google.com
questions:
  - id: q_credentials
    type: multiple-choice
    prompt: What credential material should be pasted into the static app?
    options:
      - id: none
        label: None.
      - id: token
        label: OAuth token.
    answer: none
    explanation: The static app must not collect credentials or tokens.
evidence:
  - id: report_url
    type: report-url
    description: Paste the public-format Looker Studio report URL only.
    required: true
flag:
  id: flag-example-dashboard-evidence
  criteria:
    - Report URL format check passes.
    - Credential question is answered correctly.
```
