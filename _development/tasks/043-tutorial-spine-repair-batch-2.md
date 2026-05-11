# 043 - Tutorial Spine Repair Batch 2

Status: active on branch `tutorial-spine-repair-batch-2`.

## Goal

Continue repairing the top-level tutorial spine before scaling assessments or
making completeness claims.

## Scope

- Start with `tutorials/02-build-a-bi-friendly-model.md`, because Task 041
  identified it as a conceptual outline rather than a verified model-building
  lab.
- Make the tutorial browser-first and self-contained, with exact SQL, expected
  outputs, grain contracts, sensitive-field exclusions, and fanout warnings.
- Keep optional cloud work out of the required path.
- Update the Task 041 matrix and continuity docs.

## Deliverables

- Self-contained tutorial 02 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
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

- Added the Task 043 file and task index entry.
- Rewrote `tutorials/02-build-a-bi-friendly-model.md` as a browser-first
  model-building lab with source-grain profile, model-join health check, safe
  latest-day serving output, latest control total, sensitive-field exclusions,
  ownership fanout warning, recovery checks, and an end challenge.
- Updated the Task 041 matrix to mark T041-TUT-02 as first-pass implemented.
- Local verification passed, including `bun run check` after approved local
  Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` returned
  `Not logged in · Please run /login`.
