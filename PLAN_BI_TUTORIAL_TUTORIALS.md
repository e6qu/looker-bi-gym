# Plan: BI Tutorial Curriculum And Challenge Authoring

## Goal

Design a layered banking BI curriculum where each tutorial is a mechanically verifiable learning task. The curriculum should be easy to expand with new tutorials, challenges, datasets, checks, and regulatory context.

The tutorial app is covered separately in [PLAN_BI_TUTORIAL_APP.md](PLAN_BI_TUTORIAL_APP.md).

Execution tasks are tracked in [tasks/README.md](tasks/README.md).

The default tutorial path should work in the browser. Tutorials may require local tools only when explicitly listed in the tutorial setup and when those tools are common, cross-platform, and justified by the learning objective.

Repository development uses `pnpm`. Learner-facing tutorials should not assume `pnpm` unless the tutorial explicitly targets local development of the app itself.

Plans and tasks should be readjusted after each task if implementation uncovers a true blocker, wrong assumption, or better path. The overall objective is stable; the route to get there is expected to evolve.

## Learning Principles

Tutorials should be active tasks, not passive walkthroughs.

Each tutorial should:

- Start with a realistic banking BI scenario.
- Declare predefined input data sources.
- Declare required tools, including `none` for browser-only tasks.
- Require concrete work.
- Produce artifacts.
- Ask concept questions.
- Run deterministic checks where possible.
- Produce a local flag after completion.
- Encourage AI use while still requiring the learner to understand and verify results.

## Tutorial Areas

Area A - Orientation And Source Data:

- Stack orientation.
- Synthetic data boundaries.
- Banking-domain overview.
- EU/Romania regulatory context.
- First predefined serving dataset.

Area B - Warehouse Modeling And Metrics:

- Facts and dimensions.
- Grain declarations.
- Semi-additive balances.
- Snapshot metrics.
- Metric contracts.
- Fanout detection and repair.
- Regulatory mapping fields.

Area C - Looker Studio And Dashboard Design:

- Serving-view-driven dashboards.
- Executive KPI page.
- Metric definitions and freshness labels.
- Chart-layer vs warehouse-layer calculations.
- Dashboard performance and cost.

Area D - Governance, Security, And Operations:

- Sensitive fields.
- Masking and access-safe views.
- GDPR/Romania Law 190 implications.
- AML/fraud restricted data handling.
- Freshness, reconciliation, and signoff.
- DORA-style resilience and dependency monitoring.

Area E - Capstone:

- Multi-page banking BI product.
- Executive, finance/treasury, credit risk, compliance/operations pages.
- Regulation-context register.
- Metric contracts.
- Monitoring and governance evidence.

## Challenge Modes

`browser-sql`:

- Learner writes SQL in the app.
- DuckDB-WASM runs the query over static synthetic data.
- Validators check results.

`browser-config`:

- Learner writes or edits structured text such as metric contracts, regulatory mappings, or YAML-like configs.
- Validators check required fields, allowed values, and consistency.

`quiz`:

- Learner answers numeric, multiple-choice, select-all, or matching questions.
- Answers are mechanically graded.

`cloud-evidence`:

- Learner performs work in BigQuery or Looker Studio through browser instructions.
- Learner pastes or uploads evidence.
- App validates what can be validated locally.

`capstone`:

- Combines previous artifacts and checks.

## Standard Tutorial Template

Each tutorial should include:

- ID.
- Title.
- Area.
- Difficulty.
- Estimated time.
- Prerequisites.
- Business scenario.
- Regulatory context.
- Input sources.
- Required work.
- Required artifacts.
- Required tools.
- Validation checks.
- Questions.
- Flag criteria.
- Hints.
- AI usage guidance.
- Completion notes.

## Standard Challenge Manifest Fields

Required fields:

- `id`
- `title`
- `area`
- `mode`
- `difficulty`
- `estimated_minutes`
- `prerequisites`
- `inputs`
- `outputs`
- `checks`
- `questions`
- `flag`

Optional fields:

- `regulatory_context`
- `business_scenario`
- `required_tools`
- `hints`
- `evidence`
- `rubric`
- `next_challenges`

Manifest source format:

- Authors write YAML.
- CI validates YAML against the schema.
- Build tooling emits a JSON catalog for the app.

## Data Source Contract

Tutorials should use the predefined synthetic sources in [tutorials/data-sources.md](tutorials/data-sources.md).

Core domains:

- Reference data.
- Party and customer.
- Deposits and accounts.
- Payments and cards.
- Lending.
- Finance and GL.
- Operations and reconciliation.
- Financial crime.

Every tutorial must declare:

- Which input tables it uses.
- Which output tables/views/artifacts it expects.
- Which fields are sensitive.
- Which date semantics matter.
- Which grain is required.

Dataset lifecycle:

- Datasets have stable IDs and versions.
- Challenge manifests pin dataset versions.
- Dataset metadata declares table grain, primary keys, sensitive fields, date semantics, and known intentional issues.
- Dataset changes require updating golden solution fixtures and affected challenge checks.

## Mechanical Verification Patterns

SQL/data checks:

- Row count.
- Required columns.
- Forbidden columns.
- Unique keys.
- Aggregate totals.
- Reconciliation against control totals.
- Null thresholds.
- Accepted value domains.
- Snapshot-period consistency.
- No fanout.

Metric checks:

- Metric has owner.
- Metric has grain.
- Metric has formula.
- Metric has numerator/denominator where needed.
- Metric has allowed dimensions.
- Metric has regulatory context.
- Metric has freshness SLA.

Governance checks:

- Sensitive columns excluded.
- Masked identifiers used.
- Regulatory context tag present.
- Owner team present.
- Refresh timestamp present.
- Source cutoff timestamp present.

Cloud evidence checks:

- SQL text includes required serving view.
- SQL text includes partition/date filter.
- Pasted result has expected columns.
- Pasted row counts match required ranges.
- Bytes billed decreased after optimization.
- Report URL format is plausible.

Question checks:

- Multiple choice.
- Select all that apply.
- Numeric answer from query result.
- Match metric to grain.
- Match regulation to BI implication.
- Identify unsafe field.

Golden solution checks:

- Each released challenge should have at least one known-good fixture.
- CTF-style challenges should have at least one known-bad fixture proving the trap is caught.
- CI should run fixtures through validators.
- A challenge is not release-ready if the good fixture fails or the bad fixture passes.

## First Challenge Set

Challenge 000 - Orientation Quiz:

- Mode: `quiz`.
- Goal: confirm stack, synthetic-data rule, and regulation-context awareness.

Challenge 010 - First Banking Dataset:

- Mode: `browser-sql`.
- Goal: inspect predefined account/balance data and answer basic grain questions.

Challenge 020 - Account Owner Fanout CTF:

- Mode: `browser-sql`.
- Goal: detect and fix balance multiplication caused by many-to-many ownership.

Challenge 030 - Semi-Additive Balances:

- Mode: `browser-sql`.
- Goal: compute average daily balance and month-end balance correctly.

## Dataset Rollout

Start with deposits only:

- Reference data.
- Branches/products/legal entities.
- Customers.
- Accounts.
- Account ownership.
- Account daily balances.

Then expand into:

- Lending and credit risk.
- Payments/cards and PSD2/fraud.
- AML/CFT and sanctions.
- Finance, GL, and reconciliation.
- DORA/operations and BI observability.

Dataset defaults:

- CSV first for transparency.
- Parquet later for larger analytical/performance challenges.
- Small hand-authored fixtures first.
- Data generator later when the challenge structure is stable.
- Romanian/EU flavor from the beginning: RON/EUR currencies, Romanian cities/counties, BNR/FGDB/GDPR context tags.
- Include intentional bad records and BI traps: duplicate keys, missing mappings, owner fanout, date ambiguity, sensitive fields, stale KYC, false positives, and reconciliation breaks.

Dataset expansion rule:

- Keep the first complete track deposits-only until the challenge runtime, validators, and fixture tests are stable.
- Add new domains only when they introduce a new learning objective that cannot be taught with the deposits track.
- Every new domain must include dataset metadata, at least one challenge, and golden fixtures.

Challenge 040 - Metric Contract:

- Mode: `browser-config`.
- Goal: define a governed deposit metric contract.

Challenge 050 - Sensitive Field Leak:

- Mode: `browser-sql`.
- Goal: create an access-safe serving view without leaking customer/account identifiers.

Challenge 060 - Looker Studio Evidence:

- Mode: `cloud-evidence`.
- Goal: connect a serving view to Looker Studio and answer evidence-based questions.

## Capstone Direction

The capstone should require:

- At least one executive dashboard page.
- At least one finance/treasury or GL reconciliation artifact.
- At least one credit-risk metric artifact.
- At least one compliance/operations artifact.
- Regulatory context register.
- Metric contracts.
- Access-safe serving views.
- Freshness and cost monitoring notes.

The app should validate as many artifacts as possible locally and clearly mark any self-assessed or manually reviewed evidence.

## Authoring Rules

- Do not require real banking data.
- Do not require paid cloud resources for browser challenges.
- Do not require unspecified local tools.
- Do not require esoteric or highly platform-specific tooling.
- If local tools are required, list exact tools, versions/ranges, platform notes, and a browser-only fallback when practical.
- Do not make free-text explanation the only completion gate.
- Do not put secrets or real credentials in challenge files.
- Do not hide critical business logic only in Looker Studio.
- Prefer BigQuery/SQL-style logic in browser SQL challenges.
- Keep challenge data small enough for fast browser execution.
- Make every challenge outcome inspectable and explainable.
- Do not release a challenge without golden good/bad fixtures unless the reason is documented.
- Do not change a dataset version in place if existing flags or expected outputs would change.

## Milestones

Milestone T1 - Authoring Standard:

- Finalize tutorial template.
- Finalize challenge manifest shape.
- Finalize first small synthetic dataset contract.

Milestone T2 - First Three Challenges:

- Orientation quiz.
- First dataset inspection.
- Account-owner fanout CTF.

Milestone T3 - Core Modeling Challenges:

- Semi-additive balances.
- Metric contract.
- Sensitive-field leak.
- Golden good/bad solution fixtures for all released challenges.

Milestone T4 - Cloud Evidence Pattern:

- First Looker Studio evidence challenge.
- First BigQuery evidence challenge.

Milestone T5 - Full Banking BI Track:

- Add lending/credit-risk challenges.
- Add payments/PSD2/fraud challenges.
- Add AML/CFT challenges.
- Add GL/reconciliation challenges.
- Add DORA/operations challenges.
- Add dataset versioning and generated larger fixtures when needed.

Milestone T6 - Capstone:

- Add final multi-area project.
- Require artifacts and local checks from previous areas.

Milestone T7 - Content QA:

- Review challenge instructions for required tools, synthetic-data warnings, regulatory disclaimers, and measurable completion criteria.
- Validate links and references across docs, regulations, tutorials, datasets, and challenges.

## Resolved Tutorial Choices

- The first complete track is deposits-only before adding loans, AML, payments, and GL.
- Regulation briefs are required only when a challenge depends on that context; otherwise they are optional references.
- Each challenge has one completion flag initially; sub-flags may be added for capstones later.
- Learners should eventually be able to export a completion file, but it is not required for the first skeleton.
- Hints should be staged so learners can request help without immediately revealing the full solution.
