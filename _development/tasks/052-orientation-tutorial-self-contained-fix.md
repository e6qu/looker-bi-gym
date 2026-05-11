# 052 - Orientation Tutorial Self-Contained Fix

Status: locally verified on branch `orientation-tutorial-self-contained-fix`;
ready for PR.

## Goal

Fix the first tutorial so it is self-contained instruction and does not use the
orientation quiz as the tutorial worksheet or deliverable.

## Scope

- Rewrite `tutorials/00-orientation-and-stack.md` so the required steps produce
  an orientation decision log, not a completed quiz.
- Keep the orientation quiz as a separate verification surface with a clickable
  link outside the tutorial steps.
- Revise the orientation quiz prompts so they verify the same competencies with
  scenario questions rather than duplicating the tutorial wording.
- Add a rendered UI regression test proving the verification route is a link,
  not inline code.
- Record PR #37 post-merge verification while opening this follow-on PR.

## Deliverables

- Self-contained tutorial 00 fix.
- Separate scenario-driven orientation quiz prompts.
- Rendered regression coverage for the tutorial-to-quiz verification link.
- Updated plan and agent instructions for tutorial/verification separation.
- Continuity notes recording PR #37 main, Pages, live URL, and deployed-surface
  verification.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run validate:manifests`
- `bun run test:quiz`
- `bun run test:fixtures`
- `bun run typecheck`
- `bun run lint`
- stale scan for tutorial 00 raw route code, raw source IDs, and quiz-as-step
  wording
- `git diff --check`
- `bun run test:e2e`
- `bun run check`

## Notes

- This task fixes one learner-facing bug and one associated curriculum boundary.
- Completeness claims remain blocked on Phase 9 targets and review gates.

## Progress Notes

- Added the Task 052 file and task index entry.
- Rewrote `tutorials/00-orientation-and-stack.md` as a self-contained
  orientation decision-log tutorial.
- Kept the orientation quiz as a separate verification section with a clickable
  Markdown link.
- Rewrote orientation quiz prompts as scenario-verification questions.
- Added rendered UI regression coverage for the clickable verification link and
  quiz/tutorial separation.
- Updated `PLAN.md`, `AGENTS.md`, and the curriculum completeness matrix with
  the tutorial/verification separation rule.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run validate:manifests`;
  - `bun run test:quiz`;
  - `bun run test:fixtures`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scans for raw route code, quiz-as-step wording, old direct quiz
    prompts, and visible raw source IDs in tutorial 00;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding.
