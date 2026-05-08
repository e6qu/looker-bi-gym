# 003 - Content Navigation And Markdown Rendering

## Status

Complete on 2026-05-05.

## Objective

Render existing project content inside the static app so learners can browse docs, regulations, and tutorial indexes from the web UI.

## Dependencies

- [002 - Static App Skeleton](002-static-app-skeleton.md)

## Deliverables

- Docs index page backed by `docs/`.
- Regulations index page backed by `regulations/`.
- Tutorials index page backed by `tutorials/`.
- Markdown or MDX rendering strategy selected and documented.
- Internal links handled correctly under GitHub Pages base path.

## Verification

- Learners can navigate from the app home page to docs, regulations, tutorials, and challenges.
- Existing markdown documents render legibly.
- Relative links do not break when deployed under a GitHub project path.
- External links are visibly external.

## Tests

- Run app build.
- Run link validation for rendered internal links where tooling exists.
- Manually open the built site and verify:
  - `docs/README.md` is reachable.
  - `regulations/README.md` is reachable.
  - `tutorials/README.md` is reachable.
- Verify browser console has no routing errors while navigating core pages.

## Verification Notes

- Added build-time Markdown loading for `docs/`, `regulations/`, and `tutorials/` with Vite raw imports.
- Added a content catalog with strong domain types for sections and documents.
- Added Markdown rendering with `marked`.
- Rewrote internal `.md` links to hash routes such as `#/docs/README.md`, keeping navigation GitHub Pages-compatible without server rewrites.
- Marked external links to open in a new tab with visible external labeling.
- Replaced static placeholder Docs, Regulations, and Tutorials pages with document indexes backed by existing Markdown files.
- Added strict TypeScript and type-aware ESLint gates:
  - no explicit `any`
  - no broad `object`, `Object`, or `{}` types
  - no TypeScript suppression comments
  - no non-null assertions
  - no unsafe assignments, calls, member access, arguments, or returns
  - no inline dynamic imports
  - separate type imports
  - zero lint warnings
- Added `bun lint` and `bun check` scripts at the root and app levels.
- Updated top-level package versions using live package registry checks instead of remembered versions.
- Pinned direct top-level dependencies exactly in `app/package.json`.
- Confirmed every imported external package is declared directly in `app/package.json`; only Node built-ins are implicit.
- `bun check` passed.
- `bun outdated --recursive` reported no outdated top-level packages after updates.
- Source scan of `app/src` and `app/vite.config.ts` found no `any`, no `object`, no `@ts-` suppression comments, and no dynamic inline imports.
- Full browser console verification was not automated in this task; add Playwright-based route smoke tests in a later quality task if this becomes required before CI.
