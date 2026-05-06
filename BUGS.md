# Bugs

No known app bugs after the Task 015 implementation and automated checks.

## Follow-Up Verification Gaps

- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Verify the live GitHub Pages environment URL and hash deep links after the Task 012 workflows run in GitHub. Local build and static-link validation passed, but live deployment cannot be confirmed from the local workspace.
- Complete Safari second-browser verification for Task 013. `safaridriver` is installed with Safari 26.1, but Safari's persistent "Allow remote automation" setting is disabled. Enabling it requires explicit user authorization because it changes a persistent browser security setting. The manual checklist lives in `docs/10-app-quality-browser-qa.md`.

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
