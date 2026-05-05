# Bugs

No known app bugs after the Task 007 implementation and automated checks.

No new app bugs found during the 2026-05-06 Git discipline update.

No new app bugs found after adding the Makefile check harness. `make check` passed.

## Follow-Up Verification Gaps

- Add automated browser route smoke tests later, likely in Task 013, to verify rendered Markdown routes and browser console cleanliness under a real browser.
- Add browser smoke coverage for the generated challenge index later, likely in Task 013.
- Add browser smoke coverage for dataset-backed challenge loading after the SQL runtime exists.
- Complete Tasks 006 and 007 manual browser verification: finish the orientation quiz, refresh the page, verify quiz completion persists from `localStorage`, open the SQL challenge page, run a query, refresh, and rerun the query. This was blocked because the sandbox could not bind the Vite dev server and the escalated server request was rejected by the environment.

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
