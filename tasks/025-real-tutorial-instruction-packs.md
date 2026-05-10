# 025 - Real Tutorial Instruction Packs

Status: planned; next PR #6 continuation.

Terminology:

- This file is an implementation task: a numbered repository work item.
- The content it asks us to build is a set of learner tasks: curriculum exercise
  units shown to learners in tutorials or app flows.

## Goal

Convert the tutorial sequence from good lesson outlines into full reproducible
instruction packs with exact commands, SQL, expected outputs, checks, and
fact-backed explanations.

Current agreed direction:

- Add this work to PR #6 before merge.
- Build several complete 15-20 minute learner tasks across multiple areas, not
  only a schema or placeholder proof of concept.
- Target learner: data analyst moving into BI and banking.
- Prioritize BI mechanics, BigQuery/SQL behavior, Looker Studio mechanics, data
  quality, and controls. Banking and real-estate context should make the work
  realistic without making legal theory or market expertise the first-pass
  learning goal.

## Deliverables

- For each released tutorial, add:
  - learner-task area grouping;
  - overall learning objective;
  - exact learner actions;
  - copyable SQL or evidence examples;
  - expected result tables or JSON/CSV snippets;
  - source facts;
  - failure-mode examples;
  - validation or grading steps;
  - visualization or reporting action;
  - self-assessment;
  - CTF-style end challenge;
  - solution notes tied to fixtures.
- Link tutorial pages to released challenge manifests and datasets.
- Add a useful in-app SQL result visualization path on task/challenge pages when
  the result has a dimension-like column and numeric column. Start with
  deterministic table/bar-chart rendering; avoid placeholder charts.
- Add a separate quiz-bank format rather than overloading challenge manifests.
  The first quiz should be one mixed approximately 20-minute quiz organized by
  `easy`, `medium`, and `hard`, with recommended learner-task IDs,
  `source_facts`, answers, explanations, estimated seconds, and
  self-assessment notes.
- Add Looker Studio recipes after tutorials as separate optional recipe content.
  Keep the first pass manual and browser-driven; do not introduce AWS CLI,
  Google CLI, BigQuery CLI, Python, Docker, or learner-facing shell upload
  scripts.
- Document exam mode as untimed independent challenge cards up to roughly 2
  hours each, selectable by the learner and self-assessed at first.
- Add Playwright coverage for at least one multi-challenge learner path through
  tutorial docs and challenge completion.

## Verification

- A learner can complete the browser-first path without guessing missing steps.
- Each tutorial has deterministic expected outputs.
- Every claim about law, platform behavior, browser storage, or dataset behavior
  cites facts from `docs/facts/`.
- Each learner task has an objective, steps, checkpoints,
  visualization/reporting action, self-assessment, and end challenge.
- Quiz questions link back to recommended learner-task IDs and source facts.
- Recipes are optional and do not require cloud CLI tooling.

## Tests

- `bun run test:content-qa`
- `bun run test:e2e`
- `bun run test:fixtures`
- `bun run check`
