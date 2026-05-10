# 028 - Platform Component Organization

Status: implemented.

## Goal

Review the work merged through PR #6 and organize the project into clear
components and sections from the perspective of a learner using the static
GitHub Pages website.

## Deliverables

- Add or update a root project overview.
- Add a component map covering:
  - rendered website sections;
  - content components;
  - datasets;
  - facts and sources;
  - challenge runtime;
  - browser SQL runtime;
  - frontend-only state;
  - JSON export and planned JSON import;
  - verification components.
- Correct continuity docs after PR #6 merge.
- Preserve the terminology boundary between implementation tasks and learner
  tasks.

## Verification

- The docs clearly state that the app is frontend-only and browser-hosted.
- The docs clearly state that `localStorage` and a same-site cookie hold browser
  progress.
- The docs clearly state that JSON export is implemented and JSON import is
  planned as a browser-local workflow.
- Internal links pass content QA.

Verification notes:

- Added `README.md`, `docs/14-platform-components.md`, and cross-links from the
  docs and task indexes.
- Updated `app/README.md`, `PLAN.md`, `STATUS.md`, `DO_NEXT.md`,
  `WHAT_WE_DID.md`, and `BUGS.md`.
- Post-merge PR #6 CI and Pages deployment passed for merge commit
  `1da6272efb1c219bfcdf8981e4014af4b4a899e4`.
- `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 on 2026-05-10.

## Tests

- `bun run format:check`
- `bun run test:content-qa`
