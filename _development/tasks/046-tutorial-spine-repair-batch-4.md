# 046 - Tutorial Spine Repair Batch 4

Status: active on branch `tutorial-spine-repair-batch-4`.

## Goal

Continue repairing the top-level tutorial spine before scaling assessments or
making completeness claims.

## Scope

- Rewrite `tutorials/05-blending-vs-upstream-joins.md`, because Task 041
  identified it as needing deterministic upstream SQL results and an externally
  verified Looker Studio blend setup comparison.
- Make the tutorial browser-first and self-contained, with exact SQL, expected
  outputs, safe upstream patterns, optional Looker Studio blend checks, and
  recovery paths.
- Keep optional cloud work out of the required path.
- Update the Task 041 matrix and continuity docs.

## Deliverables

- Self-contained tutorial 05 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
- Explicit remaining gap for optional Looker Studio UI verification.

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

- Added the Task 046 file and task index entry.
- Rewrote `tutorials/05-blending-vs-upstream-joins.md` as a browser-first
  blend/fanout lab with account-grain control SQL, unsafe owner-join proof,
  safe branch/currency serving output, normalized owner allocation, Looker
  Studio blend guardrails, recovery checks, and an end challenge.
- Updated the Task 041 matrix to mark T041-TUT-05 as first-pass implemented.
- Local verification passed, including `bun run check` after approved local
  Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` produced no
  output for about 40 seconds and was killed.
