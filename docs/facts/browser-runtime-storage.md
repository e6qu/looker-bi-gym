# Browser Runtime And Storage Facts

These facts anchor the frontend-only runtime. They are technical training notes
only, not legal, regulatory, accounting, privacy, compliance, or model-risk
advice.

### FACT-DUCKDB-WASM-BROWSER

- Statement: DuckDB-WASM is DuckDB compiled to WebAssembly so it can run inside a
  browser.
- Source: [DuckDB, DuckDB Wasm overview](https://duckdb.org/docs/current/clients/wasm/overview.html).
- Source quote: "run inside any browser".
- Derived implication: Browser SQL tutorials can be deterministic and local when
  datasets are small enough for browser memory.
- Related facts: [`FACT-DUCKDB-WASM-MEMORY-LIMIT`](#fact-duckdb-wasm-memory-limit),
  [`FACT-APP-SQL-RUNTIME-LOCAL`](project-architecture.md#fact-app-sql-runtime-local).

### FACT-DUCKDB-WASM-MEMORY-LIMIT

- Statement: DuckDB-WASM has limited browser memory; WebAssembly memory is capped
  at 4 GB and browsers may impose stricter limits.
- Source: [DuckDB, DuckDB Wasm overview](https://duckdb.org/docs/current/clients/wasm/overview.html).
- Source quote: "limited amount of memory".
- Derived implication: Deterministic challenge datasets should be committed,
  small, and versioned; larger public datasets need sampled local packs.
- Related facts: [`FACT-DATASET-COMMITTED-SYNTHETIC-CSV`](project-architecture.md#fact-dataset-committed-synthetic-csv).

### FACT-DUCKDB-WASM-SINGLE-THREAD-DEFAULT

- Statement: DuckDB-WASM uses a single thread by default.
- Source: [DuckDB, DuckDB Wasm overview](https://duckdb.org/docs/current/clients/wasm/overview.html).
- Source quote: "single thread".
- Derived implication: SQL challenges should grade correctness over large-scale
  speed and should avoid requiring browser-heavy workloads.
- Related facts: [`FACT-DUCKDB-WASM-MEMORY-LIMIT`](#fact-duckdb-wasm-memory-limit).

### FACT-DUCKDB-WASM-REGISTER-FILE-TEXT

- Statement: DuckDB-WASM data ingestion registers files into a local file system
  using register functions such as `registerFileText`, then imports them into
  DuckDB.
- Source: [DuckDB-WASM, Data ingestion](https://duckdb.org/docs/lts/clients/wasm/data_ingestion.html).
- Source quote: "`registerFileText`".
- Derived implication: The app can load committed CSV text into DuckDB without a
  backend API.
- Related facts: [`FACT-APP-SQL-RUNTIME-LOCAL`](project-architecture.md#fact-app-sql-runtime-local).

### FACT-DUCKDB-CSV-AUTO-DETECTION

- Statement: DuckDB `read_csv` can auto-detect dialect, types, and whether a CSV
  has a header row, but options can be overridden.
- Source: [DuckDB, CSV auto detection](https://duckdb.org/docs/current/data/csv/auto_detection.html).
- Source quote: "auto-detect all options".
- Derived implication: Dataset validation should still declare schemas and types
  explicitly instead of relying only on inference.
- Related facts: [`FACT-DATASET-METADATA-CONTRACT`](project-architecture.md#fact-dataset-metadata-contract).

### FACT-DUCKDB-AGGREGATES-CARDINALITY

- Statement: DuckDB aggregate functions combine multiple rows into a single value
  and can change result cardinality.
- Source: [DuckDB, Aggregate functions](https://duckdb.org/docs/current/sql/functions/aggregates).
- Source quote: "combine multiple rows into a single value".
- Derived implication: SQL tutorial questions should ask learners to recognize
  when `GROUP BY`, `COUNT(DISTINCT ...)`, and scalar aggregates are changing
  grain.
- Related facts: [`FACT-DATASET-OWNER-FANOUT-TRAP`](project-architecture.md#fact-dataset-owner-fanout-trap).

### FACT-DUCKDB-ORDER-SENSITIVE-AGGREGATES

- Statement: DuckDB order-sensitive aggregates such as `first`, `last`, and
  `string_agg` can be made deterministic by ordering arguments.
- Source: [DuckDB, Aggregate functions](https://duckdb.org/docs/current/sql/functions/aggregates).
- Source quote: "made deterministic by ordering".
- Derived implication: Future grading fixtures should require deterministic
  ordering when learners return lists or representative rows.
- Related facts: [`FACT-CHALLENGE-SOLUTION-FIXTURES`](project-architecture.md#fact-challenge-solution-fixtures).

### FACT-WEB-LOCALSTORAGE-PERSISTENCE

- Statement: MDN documents `localStorage` as origin-scoped storage saved across
  browser sessions without an expiration time.
- Source: [MDN, Window: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- Source quote: "no expiration time".
- Derived implication: The frontend-only progress model should say progress is
  browser-local until the learner clears it or resets progress.
- Related facts: [`FACT-APP-PROGRESS-LOCAL-ONLY`](project-architecture.md#fact-app-progress-local-only).

### FACT-WEB-COOKIE-SYNC

- Statement: MDN documents `document.cookie` as a getter/setter for document
  cookies and warns that it is synchronous.
- Source: [MDN, Document: cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).
- Source quote: "synchronous API".
- Derived implication: Cookie mirroring should remain a small same-site fallback,
  not a backend session or analytics mechanism.
- Related facts: [`FACT-GDPR-COOKIE-ID-PERSONAL-DATA-EXAMPLE`](privacy-gdpr.md#fact-gdpr-cookie-id-personal-data-example).
