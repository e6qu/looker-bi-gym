# facts-db-app

CLI and library package for building the local source/fact SQLite graph.

This package is not a web UI and is not a backend. It reads committed Markdown
source cards from `sources/` and fact cards from root `facts/`, validates their
links, and can build an ignored SQLite index for local inspection,
question-review tooling, and deterministic tests.

## Commands

From the repository root:

```sh
bun run test:facts-db
bun run facts:build-db
```

The default build command writes `app/src/generated/facts.sqlite`, which is
ignored and rebuildable.
