# Do Next

## Immediate Next Step

Start [013 - App Quality And Accessibility Pass](tasks/013-app-quality-and-accessibility-pass.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 013 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- After Task 012 workflows run in GitHub, verify the Pages environment URL and hash deep links.

Task 013 implementation steps:

- Read the Task 013 deliverables and verification requirements.
- Inspect current app routes, challenge pages, form controls, loading states, keyboard behavior, and responsive layout.
- Add focused quality/accessibility fixes with the smallest reasonable scope.
- Add or document browser smoke coverage for route rendering, challenge index, SQL challenge loading, cloud-evidence route, and console cleanliness where feasible.
- Run `make check` and any practical browser verification.

After Task 013:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 013 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [013 - App Quality And Accessibility Pass](tasks/013-app-quality-and-accessibility-pass.md)
- [014 - Dataset Expansion And Versioning](tasks/014-dataset-expansion-and-versioning.md)
