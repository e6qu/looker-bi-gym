# Bugs

No known app bugs after the Bun-only tooling, typed config, formatting, rendered UI, and automated check passes.

## Follow-Up Verification Gaps

- The first post-merge Pages run failed because GitHub Pages had not yet been enabled for this repository and `actions/configure-pages@v6` could not read a Pages site. Pages has now been enabled for GitHub Actions at `https://e6qu.github.io/looker-bi-gym/`; rerunning the failed workflow passed and the live Pages URL returned HTTP 200. Verify the next Pages workflow after PR #2 merges so the updated workflow and tests publish from `main`.
- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Verify the live GitHub Pages environment URL and hash deep links after the next Pages workflow run. Local build and static-link validation passed, but the new workflow commit still needs to publish through GitHub.
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
