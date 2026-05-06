# Do Next

## Immediate Next Step

Start [016 - Progress Export And Completion Evidence](tasks/016-progress-export-and-completion-evidence.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 016 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- Preserve the Task 015 fixture coverage rule: every released manifest needs a known-good solution fixture or a documented exception, and CTF/trap challenges need expected known-bad coverage.
- After Task 012 workflows run in GitHub, verify the Pages environment URL and hash deep links.
- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.

Task 016 implementation steps:

- Read the Task 016 deliverables and verification requirements.
- Inspect `app/src/progress.ts` and the existing Settings reset UI in `app/src/App.tsx`.
- Define a stable browser-local progress export JSON shape with completed challenge IDs, flags, timestamps, dataset versions, app/content version, and optional learner notes.
- Add a Settings export action that creates a user-controlled JSON download without sending data anywhere.
- Add preview/import behavior documentation; implement import only if it can stay simple and local.
- Add a privacy note that exports are local, user-controlled, and must not include credentials or real banking data.
- Add automated tests for export structure and content boundaries.
- Run targeted progress/export tests, build, and `make check`.

After Task 016:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 016 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [016 - Progress Export And Completion Evidence](tasks/016-progress-export-and-completion-evidence.md)
- [017 - Content QA And Regulatory Disclaimer Pass](tasks/017-content-qa-and-regulatory-disclaimer-pass.md)
