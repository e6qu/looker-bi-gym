# 007 - Browser SQL Runtime

## Status

Implementation complete on 2026-05-06. Manual browser refresh verification is still pending because the sandbox cannot bind the Vite dev server and the escalated server request was rejected by the environment.

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
- [ ] Manually refresh the page and rerun a query.

## Notes

- Browser SQL runtime source: `app/src/sqlRuntime.ts`.
- Browser SQL page source: `app/src/App.tsx`.
- Seed dataset loader: `app/src/seedDataset.ts`.
- SQL smoke test command: `pnpm test:sql`.
- `pnpm test:sql`, `pnpm test:quiz`, and `pnpm check` passed on 2026-05-06.
- `pnpm dev` failed in the sandbox with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- The escalated `pnpm dev` request was rejected by the environment, so manual browser refresh verification remains pending.
