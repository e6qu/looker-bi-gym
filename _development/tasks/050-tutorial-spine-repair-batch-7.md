# 050 - Tutorial Spine Repair Batch 7

Status: locally verified on branch `tutorial-spine-repair-batch-7`;
implemented but not Claude-reviewed.

## Goal

Continue repairing the top-level tutorial spine before scaling assessments or
making completeness claims.

## Scope

- Rewrite `tutorials/08-observability-and-operations.md`, because Task 041
  identified it as needing a runnable freshness, bytes, owner, incident, and
  reconciliation walkthrough.
- Make the required path browser-first and self-contained, with exact SQL,
  expected outputs, dependency register, freshness check, simulated job-byte
  evidence, reconciliation control, incident triage, validation evidence, and
  recovery paths.
- Keep optional cloud work out of the required path.
- Update the Task 041 matrix and continuity docs.
- Record PR #35 post-merge verification while opening this follow-on PR.

## Deliverables

- Self-contained tutorial 08 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
- Explicit remaining gap for optional BigQuery and Looker Studio UI
  verification.
- Continuity notes recording PR #35 main, Pages, live URL, and deployed-surface
  verification.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `bun run test:facts-db`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run test:platform-boundary`
- stale scan for learner-facing repo/app/source-ID implementation wording
- `git diff --check`
- `bun run test:e2e` if the change is ready for PR
- `bun run check` if the change is ready for PR
- Claude CLI curriculum review, or an explicit blocker if it cannot complete

## Notes

- This task repairs one tutorial-spine item only.
- Completeness claims remain blocked on Phase 9 targets and review gates.

## Progress Notes

- Added the Task 050 file and task index entry.
- Rewrote `tutorials/08-observability-and-operations.md` as a browser-first
  operations lab with dependency, freshness, job-byte, reconciliation,
  incident, validation, and daily handoff evidence.
- Updated the Task 041 matrix to mark T041-TUT-08 as first-pass implemented.
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
    tutorial 08;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` produced no
  output for about 30 seconds and was killed.
