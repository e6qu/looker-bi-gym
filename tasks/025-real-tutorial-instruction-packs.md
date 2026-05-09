# 025 - Real Tutorial Instruction Packs

Status: planned.

## Goal

Convert the tutorial sequence from good lesson outlines into full reproducible
instruction packs with exact commands, SQL, expected outputs, checks, and
fact-backed explanations.

## Deliverables

- For each released tutorial, add:
  - exact learner actions;
  - copyable SQL or evidence examples;
  - expected result tables or JSON/CSV snippets;
  - source facts;
  - failure-mode examples;
  - validation or grading steps;
  - solution notes tied to fixtures.
- Link tutorial pages to released challenge manifests and datasets.
- Add Playwright coverage for at least one multi-challenge learner path through
  tutorial docs and challenge completion.

## Verification

- A learner can complete the browser-first path without guessing missing steps.
- Each tutorial has deterministic expected outputs.
- Every claim about law, platform behavior, browser storage, or dataset behavior
  cites facts from `docs/facts/`.

## Tests

- `bun run test:content-qa`
- `bun run test:e2e`
- `bun run test:fixtures`
- `bun run check`
