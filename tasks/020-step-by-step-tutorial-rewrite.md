# 020 - Step-By-Step Tutorial Rewrite

Status: complete on 2026-05-09.

## Goal

Rewrite the released learner path so tutorials are actual guided lessons instead
of generic outlines.

## Deliverables

- Rewrite `tutorials/00-orientation-and-stack.md` as a browser-first lesson with
  explicit steps, expected checkpoints, source fact IDs, and local-state
  behavior.
- Rewrite the first dataset inspection lesson with exact DuckDB SQL inspection
  steps, expected result shapes, sensitive-field warnings, and fact-backed
  checkpoints.
- Rewrite the account-owner fanout lesson with a naive query, a corrected query,
  a reconciliation delta, and depositor-bank grain explanation.
- Rewrite the Looker Studio evidence lesson with optional browser UI steps,
  BigQuery view constraints, Looker Studio data source checks, credential
  boundaries, and local-only evidence capture.
- Update tutorial indexes and curriculum docs so the dependency path points to
  the step-by-step lessons.

## Verification

- Each lesson names source fact IDs from `docs/facts/README.md`.
- Each lesson tells the learner what to open, what to do, what result to expect,
  why the checkpoint matters, and what common failure mode it prevents.
- Browser-only lessons still require no installed local tools.
- Cloud-applied steps remain optional, browser UI only, and do not request
  credentials, CLI usage, backend storage, or real banking data.

## Tests

- `bun run test:content-qa`
- `bun run validate:manifests`
- `bun run test:e2e`
- `bun run check`

## Notes

- Rewrote released tutorial Markdown files `00` through `09` with source facts,
  concrete steps, checkpoints, common failure modes, and deliverables.
- Added rendered `lesson_steps` to released challenge manifests so the app itself
  now shows step-by-step work, expected checkpoints, why-it-matters notes, and
  common failure modes.
- Updated content routing so nested docs such as `docs/facts/README.md` render
  in the static app.
