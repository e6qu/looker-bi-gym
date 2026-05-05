# Bugs

No known app bugs after the Task 008 implementation, automated checks, and headless browser verification.

## Follow-Up Verification Gaps

- Add automated browser route smoke tests later, likely in Task 013, to verify rendered Markdown routes and browser console cleanliness under a real browser.
- Add browser smoke coverage for the generated challenge index later, likely in Task 013.
- Add browser smoke coverage for dataset-backed challenge loading after the SQL runtime exists.
- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.

## Template

When adding a bug, include:

- ID.
- Date found.
- Area.
- Severity.
- Description.
- Expected behavior.
- Actual behavior.
- Reproduction steps.
- Suspected cause.
- Fix plan.
- Status.
