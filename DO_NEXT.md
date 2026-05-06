# Do Next

## Immediate Next Step

Start [015 - Solution Fixtures And Golden Tests](tasks/015-solution-fixtures-and-golden-tests.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 015 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- After Task 012 workflows run in GitHub, verify the Pages environment URL and hash deep links.
- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.

Task 015 implementation steps:

- Read the Task 015 deliverables and verification requirements.
- Inspect existing manifest-backed SQL fixtures in `app/scripts/test-sql.ts` and validator tests in `app/scripts/test-validators.ts`.
- Define a committed fixture directory structure for known-good and known-bad challenge solutions.
- Move or duplicate the current inline known-good/known-bad SQL fixtures into committed fixture files.
- Ensure Challenge 020 has a known-bad naive owner fanout fixture that fails for the expected reason.
- Include dataset version pins in fixture metadata or paths so fixture expectations remain tied to `deposits-seed/v0.1.0`.
- Record that `deposits-seed/v0.1.1` would require refreshing `first-banking-dataset` and `account-owner-fanout` fixtures if either challenge is repointed.
- Add documentation for adding fixtures with a new challenge.
- Run fixture tests, build, and `make check`.

After Task 015:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 015 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [015 - Solution Fixtures And Golden Tests](tasks/015-solution-fixtures-and-golden-tests.md)
- [016 - Progress Export And Completion Evidence](tasks/016-progress-export-and-completion-evidence.md)
