# 042 - Tutorial Spine Repair Batch 1

Status: active on branch `tutorial-spine-repair-batch-1`.

## Goal

Repair the next shallow top-level tutorials identified by Task 041 so the
tutorial spine becomes self-contained, practical, and verifiable before content
counts are scaled.

## Scope

- Start with `tutorials/03-first-executive-dashboard.md`, because it currently
  depends on an assumed Looker Studio report from tutorial 01.
- Make the tutorial runnable from committed synthetic data and browser SQL
  without requiring a pre-existing report.
- Add exact SQL, expected outputs, chart specifications, freshness checks,
  sensitive-field checks, recovery paths, and an end challenge.
- Keep optional BigQuery and Looker Studio work browser-UI based and clearly
  optional.
- Update the Task 041 matrix and continuity docs with what was repaired and
  what remains unverified.

## Deliverables

- Self-contained tutorial 03 first-pass rewrite.
- Updated tutorial-spine rewrite ticket status.
- Content QA remains clean for visible learner-facing prose.
- Explicit note that optional Looker Studio UI steps still need live UI
  verification if they cannot be performed locally.

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

- This task repairs the spine but does not make the whole curriculum complete.
- Completeness claims remain blocked on Phase 9 targets and review gates.

## Progress Notes

- Added the Task 042 file and task index entry.
- Rewrote `tutorials/03-first-executive-dashboard.md` so the browser-first path
  starts from committed synthetic data instead of an assumed existing Looker
  Studio report.
- Added exact dashboard source SQL, six-row expected output, KPI checks, trend
  checks, currency-breakdown checks, freshness label, chart specification,
  sensitive-field exclusions, recovery checks, and an end challenge.
- Updated the Task 041 matrix to mark T041-TUT-03 as first-pass implemented.
- Optional BigQuery and Looker Studio UI steps remain unverified against live
  browser UI.
- Local verification passed, including `bun run check` after approved local
  Vite preview binding.
- Claude CLI review is blocked: non-TUI
  `claude --print --permission-mode plan --output-format text ...` returned
  `Not logged in · Please run /login`.
