# 041 - Curriculum Completeness Audit

Status: planned after Task 040.

## Goal

Run a critical, fact-based audit of the curriculum as an e-learning product
before scaling content volume or making completeness claims.

## Scope

- Build a competency matrix for BI foundations, SQL for BI, BigQuery serving
  patterns, Looker Studio mechanics, data quality controls, privacy/security,
  banking context, metric contracts, observability, and exam readiness.
- Audit every tutorial for self-contained setup, real files/routes, exact
  steps, expected outputs, recovery paths, and end challenges.
- Audit quiz questions, flashcards, and exam cards for practical usefulness,
  source support, and non-meta wording.
- Verify that every referenced download, command, route, dataset, and external
  page exists or is marked as blocked.
- Update `PLAN.md`, `docs/16-curriculum-critical-review.md`, and continuity
  docs with explicit gaps.

## Deliverables

- Curriculum competency matrix.
- Tutorial completeness matrix.
- Assessment coverage matrix for quizzes, flashcards, and exams.
- Source verification matrix tying claims to official or authoritative sources.
- Rewrite plan for shallow, fake, circular, or non-runnable material.

## Verification

- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run validate:static-links`
- stale scan for self-referential learner-facing text
- deployed browser walkthrough notes where learner routes are affected
- Claude CLI curriculum review, or an explicit blocker if it cannot complete

## Notes

- This task is a gate for future completeness claims, not a content-count
  expansion task.
- Do not mark the curriculum complete until Phase 9 artifacts and review gates
  pass.
