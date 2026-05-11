# 047 - Tutorial Spine Repair Batch 5

Status: merged in PR #33 at `5636297`; post-merge main CI failed and Task 048
is active to repair it. Implemented but not Claude-reviewed.

## Goal

Continue repairing the top-level tutorial spine before scaling assessments or
making completeness claims.

## Scope

- Rewrite `tutorials/06-performance-and-cost-lab.md`, because Task 041
  identified it as needing concrete query/job evidence steps or a clearly
  labeled browser-local simulation with reproducible outputs.
- Make the required path browser-first and self-contained, with exact SQL,
  expected outputs, cost/freshness controls, optional BigQuery job metadata
  checks, and recovery paths.
- Keep optional cloud work out of the required path.
- Update the Task 041 matrix and continuity docs.

## Deliverables

- Self-contained tutorial 06 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
- Explicit remaining gap for optional BigQuery and Looker Studio UI
  verification.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- stale scan for learner-facing repo/app/source-ID implementation wording
- `git diff --check`
- `bun run check` if the change is ready for PR
- Claude CLI curriculum review, or an explicit blocker if it cannot complete

## Notes

- This task repairs one tutorial-spine item only.
- Completeness claims remain blocked on Phase 9 targets and review gates.

## Progress Notes

- Added the Task 047 file and task index entry.
- Rewrote `tutorials/06-performance-and-cost-lab.md` as a browser-first
  performance/cost lab with source-table profiling, safe serving-source
  profiling, deterministic job-evidence simulation, daily operations control,
  optional BigQuery and Looker Studio UI checks, recovery checks, and an end
  challenge.
- Updated the Task 041 matrix to mark T041-TUT-06 as first-pass implemented.
- Split the broad rendered route sweep into one Playwright test per viewport
  after PR #33 CI timed out at 180s while all route/viewport checks ran serially
  in one test.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 06;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding.
- PR #33 first CI run failed on the broad rendered route sweep timeout before
  the viewport split; local verification passed after the split.
- PR #33 was squash-merged at `5636297`, but post-merge main CI run
  `25646609440` failed in rendered UI after the mobile route sweep timed out.
  Task 048 is the follow-up hotfix.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` produced no
  output for about 40 seconds and was killed.
