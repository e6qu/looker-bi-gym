# GitHub Pages Deployment

This project deploys as a static GitHub Pages app. There is no backend, credential exchange, server-side validation, analytics beacon, or learner-data upload in the default path.

## Workflows

CI is defined in `.github/workflows/ci.yml`. It runs on pushes, pull requests, and manual dispatch. The CI job uses `pnpm` and runs:

- dependency install with the committed lockfile;
- challenge manifest validation and catalog generation;
- synthetic dataset validation;
- ESLint;
- TypeScript checks;
- quiz, SQL, cloud-evidence, and validator tests;
- production build;
- built `index.html` asset-link validation.

Pages deployment is defined in `.github/workflows/pages.yml`. It runs on pushes to `main` and manual dispatch. The build job repeats the same local gate, uploads `app/dist` as the Pages artifact, and the deploy job publishes it to the `github-pages` environment.

## Repository Setup

In GitHub repository settings, configure Pages to use GitHub Actions as the source. The deployment job grants only the Pages permissions required for publishing.

The default production Vite base path is relative. That keeps the built app portable across project Pages paths such as `/looker-bi-gym/` and user or organization Pages roots.

Use `GITHUB_PAGES_BASE` only when a deployment needs absolute asset URLs:

```sh
GITHUB_PAGES_BASE=/looker-bi-gym/ pnpm build
```

## Verification

Before merging deployment changes, run:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm validate:static-links
```

To prove CI catches invalid challenge content, temporarily change a manifest dataset version or required field locally and run `pnpm validate:manifests`. Revert the temporary change after confirming the command fails.

After GitHub Pages publishes, verify:

- the environment URL opens the app;
- built JS, CSS, and DuckDB-WASM assets load successfully;
- hash routes load after refresh, including `#/docs`, `#/challenges`, and `#/challenges/first-banking-dataset`;
- challenge pages still state the synthetic-data and credential boundary.
