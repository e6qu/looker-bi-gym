# Looker BI Gym App

This directory contains the static React + TypeScript + Vite app.

## Commands

Run from the repository root:

- `pnpm install`
- `pnpm dev`
- `pnpm typecheck`
- `pnpm build`
- `pnpm preview`

## GitHub Pages Base Path

The Vite config uses `/` while running the dev server and relative asset paths for production builds by default. This works when the built `dist/` directory is served from a GitHub Pages project path such as `/looker-bi-gym/`.

Override the production base path when a deployment needs absolute asset URLs:

```sh
GITHUB_PAGES_BASE=/your-repo-name/ pnpm build
```

The app uses hash routes such as `#/docs`, so deep links do not require server rewrite rules.

## Runtime Boundary

The app is static and browser-hosted. It does not require a backend, credentials, user tracking, Google Cloud CLI, BigQuery CLI, Python, or Docker for the default learner path. Datasets and challenge content must remain synthetic.

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
