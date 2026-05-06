# Bugs

No known app bugs after the Task 011 implementation and automated checks.

## Follow-Up Verification Gaps

- Add automated browser route smoke tests later, likely in Task 013, to verify rendered Markdown routes and browser console cleanliness under a real browser.
- Add browser smoke coverage for the generated challenge index later, likely in Task 013.
- Add browser smoke coverage for dataset-backed challenge loading after the SQL runtime exists.
- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Add automated browser route/challenge completion smoke tests later, likely in Task 013, so the Task 009 headless browser verification does not remain only an ad hoc CDP run.
- Add browser smoke coverage for the cloud-evidence route and local completion flow later, likely in Task 013. Task 010 verified the route through typecheck/build and parser/unit tests, but not a real browser interaction pass.

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
