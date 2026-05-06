# Do Next

## Immediate Next Step

Start [011 - Authoring Guide And Tutorial Conversion Rules](tasks/011-authoring-guide-and-tutorial-conversion-rules.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 011 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.

Task 011 implementation steps:

- Read the Task 011 deliverables and verification requirements.
- Inspect existing challenge manifests, validators, dataset docs, and tutorial sketches.
- Add an authoring guide that explains challenge modes, manifest fields, validator choices, required-tools policy, synthetic-data constraints, and verification/test expectations.
- Include example templates for quiz, browser SQL, and cloud-evidence challenges.
- Use the guide to create and validate a minimal draft challenge if needed by the task tests, without committing rebuildable generated artifacts.

After Task 011:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 011 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [011 - Authoring Guide And Tutorial Conversion Rules](tasks/011-authoring-guide-and-tutorial-conversion-rules.md)
- [012 - CI And GitHub Pages Deployment](tasks/012-ci-and-github-pages-deployment.md)
