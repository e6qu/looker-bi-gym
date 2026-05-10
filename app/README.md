# Looker BI Gym App

This directory contains the static React + TypeScript + Vite app.

## Commands

Run from the repository root:

- `bun install`
- `bun run dev`
- `bun run typecheck`
- `bun run build`
- `bun run test:e2e`
- `bun run validate:static-links`
- `bun run preview`

## GitHub Pages Base Path

The Vite config uses `/` while running the dev server and relative asset paths for production builds by default. This works when the built `dist/` directory is served from a GitHub Pages project path such as `/looker-bi-gym/`.

Override the production base path when a deployment needs absolute asset URLs:

```sh
GITHUB_PAGES_BASE=/your-repo-name/ bun run build
```

The app uses hash routes such as `#/docs`, so deep links do not require server rewrite rules.

## GitHub Pages Deployment

The repository uses GitHub Actions with Bun for CI and Pages publishing:

- `.github/workflows/ci.yml` installs dependencies, validates manifests and datasets, runs lint/typecheck/tests, runs Playwright rendered UI tests, builds the app, and checks the built `index.html` asset references.
- `.github/workflows/pages.yml` repeats the same build gate, uploads `app/dist`, and deploys it to the `github-pages` environment.

In the GitHub repository settings, set Pages source to GitHub Actions before the first deployment. The default workflow build uses relative production asset paths, which works for project Pages and user/organization Pages. If a deployment needs absolute asset paths, set `GITHUB_PAGES_BASE` for the build step, for example:

```sh
GITHUB_PAGES_BASE=/looker-bi-gym/ bun run build
```

After deployment, verify:

- the Pages environment URL opens the app;
- `#/docs`, `#/challenges`, and a challenge route such as `#/challenges/first-banking-dataset` load after refresh;
- browser developer tools show built JS/CSS/WASM assets loading from the expected Pages path.

## Runtime Boundary

The exercises are frontend-only. The app is static and browser-hosted, with no backend account system, server session, API database, credential exchange, or server-side grading. It does not require credentials, user tracking, Google Cloud CLI, BigQuery CLI, Python, or Docker for the default learner path. Datasets and challenge content must remain synthetic.

No third-party analytics, telemetry beacon, session replay, advertising tag, or learner-data upload is enabled by default. Browser-only challenge answers, local flags, and reset state stay in browser-controlled storage on the learner's device. This release uses `localStorage` for challenge progress and mirrors progress to a same-site browser cookie so state can be recovered if `localStorage` is cleared while the browser cookie remains. The cookie is frontend state only; it is not a backend login, analytics identifier, or server session.

## Version And Build Metadata

The app displays the app version, content version, and build reference in the footer and Settings page. The app/content version comes from `app/package.json`; CI or a local release build may set `VITE_BUILD_REF` to show a commit, tag, or workflow run label. If unset, the displayed build reference is `local`.

## Progress Export And Planned Import

The Settings page can export local completion evidence as a JSON file. The export is generated in the browser from the current local progress state and is not uploaded by the app.

The export format is `looker-bi-gym.progress-export.v1` and includes completed challenge IDs, challenge versions, local flags, completion timestamps, dataset IDs and versions, app/content version, privacy boundary fields, and optional learner notes typed into the export form. It excludes credentials, raw quiz answers, pasted cloud evidence, sensitive synthetic dataset columns, real banking data, storage keys, and hidden app internals.

The Settings page shows a JSON preview before download. Import is not implemented in this static release; learners should review the JSON before sharing it for completion review. Planned import should remain browser-local: the learner chooses a JSON file, the app validates the `looker-bi-gym.progress-export.v1` structure locally, previews the imported completion evidence, and applies it only after confirmation. Import must not upload learner data or contact a backend.

Resetting browser progress clears `localStorage` and the same-site progress cookie. Reset does not delete exported JSON files already saved outside the browser.

## Browser Compatibility

The target release browsers are current stable Chrome and Safari on desktop, with responsive layouts checked at common desktop, tablet, and narrow mobile widths. DuckDB-WASM SQL challenges require a browser with WebAssembly, Web Worker, Blob URL, and modern ES module support.

If a browser blocks WebAssembly workers or local storage, Markdown/content routes remain readable, but browser SQL challenges or local progress flags may not complete. The app should show a DuckDB-WASM loading or error state instead of failing silently.

## Rendered UI Tests

Playwright tests live in `app/tests/` and run with `bun run test:e2e`. They build and preview the static app, then verify real rendered routes, responsive overflow boundaries, challenge metadata, DuckDB-WASM SQL execution, cloud-evidence controls, Settings export metadata, and nonblank desktop/mobile rendering.

## Markdown Rendering

Existing Markdown files are loaded at build time with Vite raw imports from `docs/`, `regulations/`, and `tutorials/`. The app renders them with `marked` and rewrites internal `.md` links to hash routes such as `#/docs/README.md`, which keeps navigation compatible with GitHub Pages project paths and avoids server rewrite rules.

External Markdown links open in a new tab and are visibly labeled as external in rendered content.

## Type, Lint, And Dependency Policy

Run the full local gate from the repository root:

- `bun run check`

This runs ESLint, TypeScript, and the static build.

The app uses strict TypeScript plus additional compiler checks: `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, unused checks, implicit-return checks, and fallthrough checks.

ESLint is type-aware and intentionally pedantic. It bans explicit `any`, broad `object`/`Object`/`{}` types, TypeScript suppression comments, non-null assertions, unsafe calls/assignments/member access/returns, inline dynamic imports, console logging, and warnings.

All external packages imported by app source code, Vite config, or ESLint config must be declared directly in `app/package.json`. Do not rely on transitive dependencies. Node built-ins such as `node:path` are the only exception.
