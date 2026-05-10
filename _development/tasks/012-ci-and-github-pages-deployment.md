# 012 - CI And GitHub Pages Deployment

## Objective

Automate validation, static build, and GitHub Pages deployment.

## Dependencies

- [002 - Static App Skeleton](002-static-app-skeleton.md)
- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)

## Deliverables

- [x] GitHub Actions workflow for validation and build.
- [x] GitHub Actions workflow or job for GitHub Pages deployment.
- [x] CI commands for:
  - Typecheck
  - Build
  - Manifest validation
  - Dataset validation
  - Link validation where feasible
- [x] Deployment instructions.
- [x] CI uses `bun`.

## Verification

- [x] CI fails on invalid manifests.
- [x] CI fails on broken static build.
- [x] CI fails on missing dataset references.
- [ ] GitHub Pages deployment produces a reachable static app.

## Tests

- [x] Run all CI commands locally with `bun` where possible.
- [x] Push or simulate workflow and confirm build job succeeds.
- [x] Introduce a temporary invalid manifest in a local branch and verify validation fails.
- [ ] Verify deployed app loads under the GitHub Pages URL.
- [ ] Verify deep links work after deployment.

## Notes

- Added `.github/workflows/ci.yml` with `bun install --frozen-lockfile`, manifest validation, dataset validation, lint, typecheck, quiz/SQL/cloud-evidence/validator tests, production build, and static asset-link validation.
- Added `.github/workflows/pages.yml` to run the local gate, upload `app/dist`, and deploy through GitHub Pages.
- Added `bun validate:static-links` and the matching Makefile target.
- Extended `bun validate:manifests` so manifest inputs with `dataset_id` and `dataset_version` must resolve to `datasets/{dataset_id}/{dataset_version}/metadata.json`.
- Documented deployment setup and `GITHUB_PAGES_BASE` behavior in `app/README.md` and `docs/09-github-pages-deployment.md`.
- `make check` passed on 2026-05-06. The production build still reports Vite's non-failing large DuckDB-WASM chunk warning.
- `CI=true bun install --frozen-lockfile` passed after rerunning with approved network access. The first non-TTY install attempt failed, then a sandboxed CI-mode install failed with `ENOTFOUND package registry`.
- Temporary negative manifest check passed: changing `first-banking-dataset` to `dataset_version: v9.9.9` made `bun validate:manifests` fail with a missing dataset reference error, then the manifest was restored and validation passed.
- `GITHUB_PAGES_BASE=/looker-bi-gym/ bun build` and `GITHUB_PAGES_BASE=/looker-bi-gym/ bun validate:static-links` passed.
- Live GitHub Pages URL and post-deploy deep-link verification remain pending until these workflows run in GitHub.
- Follow-up on 2026-05-10: PR #11 was merged and post-merge main CI run
  `25629510931` plus Pages deployment run `25629510924` passed for merge commit
  `bd0be4505958f2e33706169dc7816096c7abc617`; the live Pages URL returned
  HTTP 200.
- Follow-up branch `ci-ui-warning-checks` expands CI with explicit format,
  derived SQL expectation, browser-config runtime, fact database, LLM workbench,
  and platform-boundary steps. Local full `bun run check` passed with the
  expanded gate on 2026-05-10 after approved Playwright/Vite port binding.
