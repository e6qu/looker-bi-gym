# 007 - Browser SQL Runtime

## Status

Complete on 2026-05-06.

## Objective

Add browser-side SQL execution over synthetic datasets.

## Dependencies

- [005 - Synthetic Dataset Seed](005-synthetic-dataset-seed.md)

## Deliverables

- [x] DuckDB-WASM integrated into the app.
- [x] Static dataset loader.
- [x] SQL editor/input component.
- [x] Query result table.
- [x] SQL error display.
- [x] Schema browser for loaded challenge tables.

## Verification

- [x] SQL runs fully in the browser.
- [x] No backend calls are required.
- [x] Seed datasets load correctly.
- [x] Query errors are visible and understandable.
- [x] Large accidental result sets are handled safely.

## Tests

- [x] Run app typecheck.
- [x] Run app build.
- [x] Run a smoke test query against each seed table.
- [x] Run a join query across accounts and balances.
- [x] Run an invalid SQL query and verify an error is shown.
- [x] Manually refresh the page and rerun a query.

## Notes

- Browser SQL runtime source: `app/src/sqlRuntime.ts`.
- Browser SQL page source: `app/src/App.tsx`.
- Seed dataset loader: `app/src/seedDataset.ts`.
- SQL smoke test command: `bun test:sql`.
- `bun test:sql`, `bun test:quiz`, and `bun check` passed on 2026-05-06.
- `bun dev` failed in the sandbox with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- An approved `bun dev` run started Vite at `http://127.0.0.1:5173/` on 2026-05-06.
- Headless Chrome completed the SQL challenge, verified completion persisted after reload, and confirmed a query could run after refresh on 2026-05-06.
