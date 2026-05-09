# Project Architecture And Dataset Facts

These facts are derived from this repository's source code, manifests, datasets,
and validation scripts. They are technical training notes only, not legal,
regulatory, accounting, privacy, compliance, or model-risk advice.

### FACT-APP-FRONTEND-ONLY

- Statement: The platform boundary is static and frontend-only: no backend
  account system, server session, API database, server-side grading, analytics
  beacon, or learner-data upload.
- Source: [STATUS.md](../../STATUS.md); [app/scripts/test-platform-boundary.ts](../../app/scripts/test-platform-boundary.ts).
- Source quote: "frontend-only architecture boundary".
- Derived implication: Challenges must be gradable in browser code or by local
  evidence, not hidden server validation.
- Related facts: [`FACT-WEB-LOCALSTORAGE-PERSISTENCE`](browser-runtime-storage.md#fact-web-localstorage-persistence).

### FACT-APP-PROGRESS-LOCAL-ONLY

- Statement: Challenge progress is stored in browser `localStorage` and mirrored
  to a same-site cookie fallback.
- Source: [STATUS.md](../../STATUS.md); [app/src/progress.ts](../../app/src/progress.ts).
- Source quote: "`looker-bi-gym.progress.v1`".
- Derived implication: Tutorials should tell learners that progress is local to
  the browser origin and reset clears both storage surfaces.
- Related facts: [`FACT-WEB-LOCALSTORAGE-PERSISTENCE`](browser-runtime-storage.md#fact-web-localstorage-persistence),
  [`FACT-WEB-COOKIE-SYNC`](browser-runtime-storage.md#fact-web-cookie-sync).

### FACT-APP-SQL-RUNTIME-LOCAL

- Statement: Browser SQL challenges load committed synthetic CSV text into
  DuckDB-WASM and evaluate checks locally.
- Source: [app/src/sqlRuntime.ts](../../app/src/sqlRuntime.ts);
  [app/src/seedDataset.ts](../../app/src/seedDataset.ts).
- Source quote: "`registerFileText`".
- Derived implication: Deterministic SQL challenges need committed dataset files,
  manifest pins, fixtures, and browser-safe row counts.
- Related facts: [`FACT-DUCKDB-WASM-REGISTER-FILE-TEXT`](browser-runtime-storage.md#fact-duckdb-wasm-register-file-text).

### FACT-DATASET-COMMITTED-SYNTHETIC-CSV

- Statement: The first released dataset is committed as synthetic CSV under
  `datasets/deposits-seed/v0.1.0/`.
- Source: [datasets/deposits-seed/v0.1.0/README.md](../../datasets/deposits-seed/v0.1.0/README.md);
  [datasets/deposits-seed/v0.1.0/metadata.json](../../datasets/deposits-seed/v0.1.0/metadata.json).
- Source quote: "`synthetic_only`".
- Derived implication: Future external or generated challenge datasets should be
  locally committed or reproducibly generated from committed scripts, not fetched
  live during grading.
- Related facts: [`FACT-DUCKDB-WASM-MEMORY-LIMIT`](browser-runtime-storage.md#fact-duckdb-wasm-memory-limit).

### FACT-DATASET-METADATA-CONTRACT

- Statement: Dataset metadata declares identity, table grains, primary keys,
  sensitive fields, row counts, control totals, known issues, and validation
  expectations.
- Source: [app/scripts/validate-datasets.ts](../../app/scripts/validate-datasets.ts);
  [datasets/deposits-seed/v0.1.0/metadata.json](../../datasets/deposits-seed/v0.1.0/metadata.json).
- Source quote: "`control_totals`".
- Derived implication: Fully deterministic challenge datasets need metadata that
  can be validated before build and replayed in fixtures.
- Related facts: [`FACT-DUCKDB-CSV-AUTO-DETECTION`](browser-runtime-storage.md#fact-duckdb-csv-auto-detection).

### FACT-DATASET-SENSITIVE-FIELDS-DECLARED

- Statement: The deposits dataset declares `customer_id`, `account_id`, and
  `synthetic_iban` as sensitive fields for serving-output checks.
- Source: [challenges/manifests/first-banking-dataset.yaml](../../challenges/manifests/first-banking-dataset.yaml);
  [datasets/deposits-seed/v0.1.0/metadata.json](../../datasets/deposits-seed/v0.1.0/metadata.json).
- Source quote: "`sensitive_fields`".
- Derived implication: Challenge validators can reject raw identifiers even when
  the data is synthetic.
- Related facts: [`FACT-GDPR-DATA-MINIMISATION`](privacy-gdpr.md#fact-gdpr-data-minimisation).

### FACT-APP-SENSITIVE-EXCLUSION-CHECKS

- Statement: Browser SQL validators include sensitive-field exclusion and
  forbidden-column checks.
- Source: [app/src/validators.ts](../../app/src/validators.ts);
  [challenges/schema/challenge-manifest.schema.json](../../challenges/schema/challenge-manifest.schema.json).
- Source quote: "`sensitive-field-exclusion`".
- Derived implication: Tutorials can teach privacy-aware serving outputs with
  deterministic mechanical grading.
- Related facts: [`FACT-DATASET-SENSITIVE-FIELDS-DECLARED`](#fact-dataset-sensitive-fields-declared).

### FACT-DATASET-OWNER-FANOUT-TRAP

- Statement: The deposits seed intentionally contains a many-to-many ownership
  table that can multiply balances in naive joins.
- Source: [tutorials/data-sources.md](../../tutorials/data-sources.md);
  [challenges/manifests/account-owner-fanout.yaml](../../challenges/manifests/account-owner-fanout.yaml).
- Source quote: "can multiply facts".
- Derived implication: Fanout challenges should require both naive and corrected
  totals, plus a reconciliation delta.
- Related facts: [`FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`](bi-platforms-bigquery-looker-studio.md#fact-looker-studio-blend-more-rows).

### FACT-DATASET-CURRENCY-CONTROLS

- Statement: The deposits seed includes RON/EUR balances and control totals used
  by validators and fixture tests.
- Source: [datasets/deposits-seed/v0.1.0/metadata.json](../../datasets/deposits-seed/v0.1.0/metadata.json);
  [challenges/solution-fixtures/first-banking-dataset/known-good.sql](../../challenges/solution-fixtures/first-banking-dataset/known-good.sql).
- Source quote: "`currency_code`".
- Derived implication: Currency-aware tutorials can be deterministic if expected
  totals and dates are pinned in metadata.
- Related facts: [`FACT-FGDB-PAYS-RON`](banking-deposits-romania-eu.md#fact-fgdb-pays-ron).

### FACT-DATASET-LEGAL-ENTITY-GRAIN

- Statement: The tutorial data-source contract includes legal entities and branch
  legal-entity fields for regulatory context and access-control examples.
- Source: [tutorials/data-sources.md](../../tutorials/data-sources.md).
- Source quote: "`legal_entity_id`".
- Derived implication: Future Romania/EU guarantee and reporting challenges need
  legal-entity grain before cross-border or scheme-membership logic.
- Related facts: [`FACT-FGDB-MEMBER-BANKS`](banking-deposits-romania-eu.md#fact-fgdb-member-banks).

### FACT-CHALLENGE-VERSIONED-MANIFESTS

- Statement: Released challenge manifests require top-level semantic contract
  versions.
- Source: [challenges/schema/challenge-manifest.schema.json](../../challenges/schema/challenge-manifest.schema.json);
  [VERSIONING.md](../../VERSIONING.md).
- Source quote: "`vMAJOR.MINOR.PATCH`".
- Derived implication: Question, check, dataset, or evidence changes must bump
  challenge versions and refresh fixtures.
- Related facts: [`FACT-EBA-VALIDATION-RULES-CHANGE`](governance-reporting-operations.md#fact-eba-validation-rules-change).

### FACT-CHALLENGE-SOLUTION-FIXTURES

- Statement: Released challenge manifests need known-good solution fixtures, and
  trap challenges need known-bad coverage.
- Source: [challenges/solution-fixtures/README.md](../../challenges/solution-fixtures/README.md);
  [app/scripts/test-solution-fixtures.ts](../../app/scripts/test-solution-fixtures.ts).
- Source quote: "`known-good`".
- Derived implication: Future tutorials should ship grading fixtures with the
  dataset and challenge contract.
- Related facts: [`FACT-DUCKDB-ORDER-SENSITIVE-AGGREGATES`](browser-runtime-storage.md#fact-duckdb-order-sensitive-aggregates).

### FACT-APP-PROGRESS-EXPORT-EVIDENCE

- Statement: Progress exports include completed challenges, versions, flags,
  timestamps, dataset IDs/versions, and privacy-boundary fields while excluding
  credentials and raw answers.
- Source: [app/src/progress.ts](../../app/src/progress.ts);
  [app/scripts/test-progress-export.ts](../../app/scripts/test-progress-export.ts).
- Source quote: "`progress-export.v1`".
- Derived implication: Capstone completion evidence can remain local and
  inspectable without becoming a backend record.
- Related facts: [`FACT-BI-OPS-EVIDENCE-NOT-ADVICE`](governance-reporting-operations.md#fact-bi-ops-evidence-not-advice).
