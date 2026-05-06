# Do Next

## Immediate Next Step

Start [012 - CI And GitHub Pages Deployment](tasks/012-ci-and-github-pages-deployment.md).

Before continuing:

- Review `AGENTS.md`.
- Review `STATUS.md`.
- Review `PLAN.md`.
- Review `BUGS.md`.
- Review the Task 012 file.
- Use `make check` for the full local gate.
- Keep rebuildable generated outputs ignored; regenerate them from committed source instead of committing them.
- Keep DuckDB-WASM runtime files supplied by dependencies/local build output, not committed binary artifacts.

Task 012 implementation steps:

- Read the Task 012 deliverables and verification requirements.
- Inspect the current `pnpm` scripts, `Makefile`, Vite base-path behavior, ignored generated artifacts, and GitHub Pages requirements.
- Add GitHub Actions validation/build workflow using `pnpm`.
- Add a GitHub Pages deployment workflow or job that builds the static app and publishes `app/dist`.
- Document deployment setup and the `GITHUB_PAGES_BASE` override.
- Verify CI commands locally and, if practical, include a local invalid-manifest check without committing the invalid temporary change.

After Task 012:

- Update `STATUS.md`.
- Update `WHAT_WE_DID.md`.
- Update `DO_NEXT.md`.
- Update `BUGS.md` if any issues are found.
- Mark Task 012 progress and verification notes.
- Commit the task changes to git.

## Upcoming Tasks

- [012 - CI And GitHub Pages Deployment](tasks/012-ci-and-github-pages-deployment.md)
- [013 - App Quality And Accessibility Pass](tasks/013-app-quality-and-accessibility-pass.md)
