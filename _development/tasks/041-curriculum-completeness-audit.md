# 041 - Curriculum Completeness Audit

Status: active on branch `curriculum-completeness-audit`.

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

## Progress Notes

- Added `docs/17-curriculum-completeness-matrix.md` with first-pass inventory,
  competency, tutorial, assessment, source-verification, and rewrite-gate
  matrices.
- Current inventory confirms the curriculum is not complete: 10 top-level
  tutorials, 6 self-contained learner tasks, 6 released challenges, 59
  flashcards, 14 quiz questions, 4 exam cards, and 185 unique fact IDs.
- The most important near-term finding is that the tutorial spine must be
  rewritten and verified before scaling content counts.
- Added rewrite tickets to the curriculum matrix so the shallow tutorial spine
  has explicit acceptance notes before future content scaling.
- Rewrote `tutorials/01-connect-public-data.md` as the first concrete repair:
  it now has a self-contained browser SQL path, exact expected outputs, inline
  optional BigQuery SQL, Looker Studio setup checks, recovery checks, and an end
  challenge.
- Updated content QA so released tutorials cite source fact IDs from typed
  metadata instead of showing raw `FACT-*` identifiers in learner-facing prose.
- Extended the cleanup across tutorial, learner-task, recipe, orientation
  challenge, and flashcard deck wording so visible course prose no longer uses
  source-fact IDs or repo/app implementation phrasing for those scanned
  surfaces.
- Local verification passed, including `bun run check` after approved local
  Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` returned
  `Not logged in · Please run /login`.
