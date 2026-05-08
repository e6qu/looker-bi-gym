# 002 - Static App Skeleton

## Status

Complete on 2026-05-05.

## Objective

Create the first static browser app skeleton that can be built locally and later deployed to GitHub Pages.

## Dependencies

- [001 - Repository Structure And Planning Baseline](001-repository-structure-and-planning-baseline.md)

## Deliverables

- App directory created.
- React + TypeScript + Vite app initialized.
- `bun` configured as the repository package manager.
- Basic route/page structure created:
  - Home
  - Docs
  - Regulations
  - Tutorials
  - Challenges
  - Settings
- Static build command defined.
- GitHub Pages-compatible base-path strategy documented.

## Verification

- The app renders without a backend.
- The app can be built into static assets.
- The app has no credential or secret configuration.
- The app shell clearly states that data is synthetic and browser-local.
- The app shell explains that any optional local tools must be explicitly listed by a tutorial.

## Tests

- Run `bun install`.
- Run the app typecheck command.
- Run the app build command.
- Serve the built static assets locally and manually verify the home page loads.
- Search for credential-like strings in app config and confirm none are required.
- Verify no app page implies an unspecified local install requirement.

## Verification Notes

- Created `app/` with a React + TypeScript + Vite static app.
- Added root `package.json`, `legacy workspace file`, and app scripts for `dev`, `typecheck`, `build`, and `preview`.
- Added hash-based routes for Home, Docs, Regulations, Tutorials, Challenges, and Settings.
- Documented GitHub Pages base-path behavior in `app/README.md`.
- The app shell states the browser-local, synthetic-data, no-backend, no-credentials, and explicit-optional-tools boundaries.
- `bun install` passed after installing `bun` locally on the machine and allowing registry access.
- `bun typecheck` passed.
- `bun build` passed.
- `bun preview` served the built app at `http://127.0.0.1:4173/`; HTML and built JS assets returned HTTP 200.
- Credential-like string search found only user-facing statements that credentials are not required or stored.
