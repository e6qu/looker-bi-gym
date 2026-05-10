# Looker BI Gym

Browser-hosted training for Business Intelligence mechanics in a banking
context. The project is a static GitHub Pages app: no backend, no server
session, no real banking data, no credentials, and no learner-data upload.

The learner uses the website UI. Browser SQL challenges run with DuckDB-WASM,
authored learner content is bundled from Markdown frontmatter catalogs, dataset
inputs stay in CSV/JSON files, and progress stays on the learner's device in
`localStorage` plus a same-site cookie mirror.

## Main Sections

- `app/`: React + TypeScript + Vite GitHub Pages app.
- `docs/`: learner and maintainer documentation, including the
  [platform component map](docs/14-platform-components.md).
- `tutorials/`: learner-facing tutorial Markdown.
- `flashcards/`, `quizzes/`, and `exams/`: top-level Markdown learner content
  areas for generated app catalogs.
- `challenges/`: challenge manifests, schema, authoring guide, and solution
  fixtures.
- `datasets/`: deterministic synthetic datasets and dataset metadata.
- `facts/`: canonical source-backed fact corpus for tutorials, questions, and
  fact graph tooling.
- `sources/`: source cards and permitted source snapshots backing the fact
  corpus.
- `regulations/`: technical regulatory-context briefs for training context, not
  advice.
- `_development/tasks/`: implementation tasks for building the repository.
  These are not the same as learner tasks shown in the website.

## Development

Use Bun only:

```sh
bun install
bun run check
```

Do not push directly to `main`; use pull requests. Before opening or updating a
PR, check for existing open PRs and keep only one working PR unless explicitly
directed otherwise.

## State Boundary

The app is frontend-only. Challenge completion, local flags, and export notes
are created and stored in the browser. The Settings page can export progress as
JSON. JSON import is planned as an optional browser-local workflow, but it must
validate the same export format locally and must not upload learner data.
