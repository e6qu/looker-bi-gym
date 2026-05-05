# Do Next

## Immediate Next Step

Continue [010 - Cloud Evidence Challenge Pattern](tasks/010-cloud-evidence-challenge-pattern.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 010 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.

Task 010 implementation steps:

- Read the Task 010 deliverables and verification requirements.
- Inspect the existing `looker-studio-evidence` manifest and unsupported challenge page.
- Define the cloud-evidence challenge pattern without adding credentials, CLIs, backend validation, or required early-path local tools.
- Add any focused schema, manifest, app, or documentation updates needed for cloud-evidence evidence capture.
- Document manual verification gaps if the cloud UI workflow cannot be fully automated yet.

After Task 010:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 010 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [010 - Cloud Evidence Challenge Pattern](tasks/010-cloud-evidence-challenge-pattern.md)
- [011 - Authoring Guide And Tutorial Conversion Rules](tasks/011-authoring-guide-and-tutorial-conversion-rules.md)
