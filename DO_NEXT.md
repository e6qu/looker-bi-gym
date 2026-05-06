# Do Next

## Immediate Next Step

Start [014 - Dataset Expansion And Versioning](tasks/014-dataset-expansion-and-versioning.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 014 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- After Task 012 workflows run in GitHub, verify the Pages environment URL and hash deep links.
- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.

Task 014 implementation steps:

- Read the Task 014 deliverables and verification requirements.
- Inspect current dataset metadata, dataset validation, manifest dataset references, and SQL fixtures.
- Define the dataset versioning policy and metadata expectations without changing existing seed outputs in place.
- Add expansion roadmap notes for lending/credit risk, payments/cards, AML/CFT, finance/GL/reconciliation, and DORA/operations/BI observability.
- Add a simulated changed dataset version or validation fixture that proves old challenge references still resolve to the old version.
- Run dataset validation, manifest validation, relevant SQL fixtures, and `make check`.

After Task 014:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 014 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [014 - Dataset Expansion And Versioning](tasks/014-dataset-expansion-and-versioning.md)
- [015 - Solution Fixtures And Golden Tests](tasks/015-solution-fixtures-and-golden-tests.md)
