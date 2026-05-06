# Looker BI Gym App

This directory contains the static React + TypeScript + Vite app.

## Commands

Run from the repository root:

- `pnpm install`
- `pnpm dev`
- `pnpm typecheck`
- `pnpm build`
- `pnpm validate:static-links`
- `pnpm preview`

## GitHub Pages Base Path

The Vite config uses `/` while running the dev server and relative asset paths for production builds by default. This works when the built `dist/` directory is served from a GitHub Pages project path such as `/looker-bi-gym/`.

Override the production base path when a deployment needs absolute asset URLs:

```sh
GITHUB_PAGES_BASE=/your-repo-name/ pnpm build
```

The app uses hash routes such as `#/docs`, so deep links do not require server rewrite rules.

## GitHub Pages Deployment

The repository uses GitHub Actions with `pnpm` for CI and Pages publishing:

- `.github/workflows/ci.yml` installs dependencies, validates manifests and datasets, runs lint/typecheck/tests, builds the app, and checks the built `index.html` asset references.
- `.github/workflows/pages.yml` repeats the same build gate, uploads `app/dist`, and deploys it to the `github-pages` environment.

In the GitHub repository settings, set Pages source to GitHub Actions. The default workflow build uses relative production asset paths, which works for project Pages and user/organization Pages. If a deployment needs absolute asset paths, set `GITHUB_PAGES_BASE` for the build step, for example:

```sh
GITHUB_PAGES_BASE=/looker-bi-gym/ pnpm build
```

After deployment, verify:

- the Pages environment URL opens the app;
- `#/docs`, `#/challenges`, and a challenge route such as `#/challenges/first-banking-dataset` load after refresh;
- browser developer tools show built JS/CSS/WASM assets loading from the expected Pages path.

## Runtime Boundary

The app is static and browser-hosted. It does not require a backend, credentials, user tracking, Google Cloud CLI, BigQuery CLI, Python, or Docker for the default learner path. Datasets and challenge content must remain synthetic.

No third-party analytics, telemetry beacon, session replay, advertising tag, or learner-data upload is enabled by default. Browser-only challenge answers, local flags, and reset state stay in `localStorage` on the learner's device.

## Browser Compatibility

The target release browsers are current stable Chrome and Safari on desktop, with responsive layouts checked at common desktop, tablet, and narrow mobile widths. DuckDB-WASM SQL challenges require a browser with WebAssembly, Web Worker, Blob URL, and modern ES module support.

If a browser blocks WebAssembly workers or local storage, Markdown/content routes remain readable, but browser SQL challenges or local progress flags may not complete. The app should show a DuckDB-WASM loading or error state instead of failing silently.

## Markdown Rendering

Existing Markdown files are loaded at build time with Vite raw imports from `docs/`, `regulations/`, and `tutorials/`. The app renders them with `marked` and rewrites internal `.md` links to hash routes such as `#/docs/README.md`, which keeps navigation compatible with GitHub Pages project paths and avoids server rewrite rules.

External Markdown links open in a new tab and are visibly labeled as external in rendered content.

## Type, Lint, And Dependency Policy

Run the full local gate from the repository root:

- `pnpm check`

This runs ESLint, TypeScript, and the static build.

The app uses strict TypeScript plus additional compiler checks: `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, unused checks, implicit-return checks, and fallthrough checks.

ESLint is type-aware and intentionally pedantic. It bans explicit `any`, broad `object`/`Object`/`{}` types, TypeScript suppression comments, non-null assertions, unsafe calls/assignments/member access/returns, inline dynamic imports, console logging, and warnings.

All external packages imported by app source code, Vite config, or ESLint config must be declared directly in `app/package.json`. Do not rely on transitive dependencies. Node built-ins such as `node:path` are the only exception.
