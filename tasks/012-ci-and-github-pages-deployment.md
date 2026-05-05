# 012 - CI And GitHub Pages Deployment

## Objective

Automate validation, static build, and GitHub Pages deployment.

## Dependencies

- [002 - Static App Skeleton](002-static-app-skeleton.md)
- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)

## Deliverables

- GitHub Actions workflow for validation and build.
- GitHub Actions workflow or job for GitHub Pages deployment.
- CI commands for:
  - Typecheck
  - Build
  - Manifest validation
  - Dataset validation
  - Link validation where feasible
- Deployment instructions.
- CI uses `pnpm`.

## Verification

- CI fails on invalid manifests.
- CI fails on broken static build.
- CI fails on missing dataset references.
- GitHub Pages deployment produces a reachable static app.

## Tests

- Run all CI commands locally with `pnpm` where possible.
- Push or simulate workflow and confirm build job succeeds.
- Introduce a temporary invalid manifest in a local branch and verify validation fails.
- Verify deployed app loads under the GitHub Pages URL.
- Verify deep links work after deployment.
