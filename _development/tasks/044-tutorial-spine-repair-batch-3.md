# 044 - Tutorial Spine Repair Batch 3

Status: active on branch `tutorial-spine-repair-batch-3`.

## Goal

Continue repairing the top-level tutorial spine before scaling assessments or
making completeness claims.

## Scope

- Start with `tutorials/04-metrics-and-calculated-fields.md`, because Task 041
  identified it as missing exact Looker Studio field formulas, aggregation
  settings, expected chart values, and recovery paths.
- Make the tutorial browser-first and self-contained, with exact SQL, expected
  outputs, metric contracts, reusable calculated-field formulas, chart settings,
  and failure-mode checks.
- Keep optional cloud work out of the required path.
- Update the Task 041 matrix, agent content boundary, and continuity docs.

## Deliverables

- Self-contained tutorial 04 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
- Clear learner-facing rule that assessment and tutorial text must teach BI,
  BigQuery, Looker Studio, and thin regulatory context, not course
  implementation details.
- Explicit remaining gap for any optional BigQuery or Looker Studio UI
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

- Added the Task 044 file and task index entry.
- Rewrote `tutorials/04-metrics-and-calculated-fields.md` as a browser-first
  metric-contract lab with metric-source SQL, exact latest values, reusable
  calculated-field formulas, aggregation settings, chart checks, recovery
  checks, and an end challenge.
- Updated `AGENTS.md` to explicitly forbid self-referential learner-facing
  course/platform questions.
- Updated the Task 041 matrix to mark T041-TUT-04 as first-pass implemented.
- Local verification passed, including `bun run test:e2e` and `bun run check`
  after approved local Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` produced no
  output for about 40 seconds and was killed.
