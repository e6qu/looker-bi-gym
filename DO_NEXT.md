# Do Next

## Immediate Next Step

Start [017 - Content QA And Regulatory Disclaimer Pass](tasks/017-content-qa-and-regulatory-disclaimer-pass.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 017 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.
- Preserve the Task 015 fixture coverage rule: every released manifest needs a known-good solution fixture or a documented exception, and CTF/trap challenges need expected known-bad coverage.
- Preserve the Task 016 export boundary: progress export must stay local, user-controlled, and free of credentials, raw answers, pasted cloud evidence, sensitive synthetic field names, real banking data, storage keys, and hidden app internals.
- After Task 012 workflows run in GitHub, verify the Pages environment URL and hash deep links.
- If a Safari pass is required before release, ask the user to explicitly enable Safari "Allow remote automation" or perform the manual Safari QA checklist in `docs/10-app-quality-browser-qa.md`.

Task 017 implementation steps:

- Read the Task 017 deliverables and verification requirements.
- Review `docs/`, `regulations/`, `tutorials/`, app copy, and challenge manifests for stale claims, missing safety notes, and inconsistent terminology.
- Confirm regulatory summaries remain framed as training context, not advice.
- Add or adjust disclaimer language where learner-facing pages could be mistaken for legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Verify no content implies real banking data, production suitability, credentials, backend validation, or required cloud/local tooling outside the documented optional path.
- Run targeted text/search QA, `pnpm build`, and `make check`.

After Task 017:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 017 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [017 - Content QA And Regulatory Disclaimer Pass](tasks/017-content-qa-and-regulatory-disclaimer-pass.md)
- [018 - Release Versioning And Change Log](tasks/018-release-versioning-and-change-log.md)
