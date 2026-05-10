# 040 - Learning Surface Verification

Status: planned on branch `phase-7-learning-surface-verification`; PR not
opened yet.

## Goal

Begin Phase 7 by verifying that the deployed GitHub Pages learning surface lets
a learner navigate and use tutorials, flashcards, quizzes, exams, facts,
datasets/workbench, and challenges without opening repository files.

## Scope

- Verify the deployed GitHub Pages UI after the Phase 6 tutorial batch.
- Cover desktop and mobile layouts.
- Cover representative navigation across tutorials, learner tasks, flashcards,
  quizzes, exams, facts, workbench, and challenges.
- Record any missing learner path, broken route, confusing handoff, or content
  surface gap.
- Do not claim complete, comprehensive, or externally verified curriculum
  coverage until Phase 9 gates pass.

## Deliverables

- Browser walkthrough notes for the deployed app.
- Any focused fixes needed for learner navigation or surface visibility.
- Updated continuity docs with pass/fail results and unresolved gaps.

## Verification

- `bun run check`
- deployed GitHub Pages walkthrough
- desktop and mobile route checks
- stale scan for unsupported completeness claims

## Notes

- Safari second-browser verification remains blocked until Safari remote
  automation is enabled or a manual Safari pass is performed.
