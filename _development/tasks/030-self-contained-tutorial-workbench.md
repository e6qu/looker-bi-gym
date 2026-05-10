# 030 - Self-Contained Tutorial Workbench

Status: complete locally on branch `self-contained-tutorials`; PR pending.

Terminology:

- This file is an implementation task: a numbered repository work item.
- The content it asks us to build is a set of learner tasks: curriculum exercise
  units shown to learners in tutorials or app flows.

## Goal

Make the browser-first learner-task tutorials self-contained. A learner should
be able to read a tutorial page, run the supplied SQL in a neutral browser SQL
workbench, verify deterministic outputs, and complete the tutorial-internal
end check without using a challenge page as the instruction source.

## Deliverables

- Add a static app browser SQL workbench route for committed synthetic datasets.
- Update released learner-task pages so prerequisites point to the workbench,
  not graded challenge pages.
- Keep every learner task complete in the page body: objective, prerequisites,
  SQL, expected outputs, checkpoint questions, reporting action, failure modes,
  self-assessment, and tutorial-internal CTF-style end check.
- Keep challenge manifests and fixtures as reviewer references, not as the
  learner's required tutorial instructions.
- Add content QA that prevents learner-task tutorials from linking to challenge
  pages as the teaching path.
- Add Playwright coverage for the workbench route and a real tutorial query.

## Verification

- A learner can follow each released learner-task page without opening a
  challenge page.
- Workbench routes load the expected synthetic dataset tables.
- A tutorial query runs in the workbench and returns the expected deterministic
  values.
- The content QA test fails if a learner-task page points to `#/challenges/`.
- The strict typing boundary remains intact: no `any`, broad `object` type,
  type-ignore comments, or avoidable casts.

## Tests

- `bun run test:content-qa` passed on 2026-05-10.
- `bun run test:e2e` passed on 2026-05-10 after approved local Vite preview
  port binding.
- `bun run typecheck` passed on 2026-05-10.
- `bun run lint` passed on 2026-05-10.
- `bun run check` passed on 2026-05-10 after approved local Vite preview port
  binding, including all 11 Playwright rendered UI tests.
