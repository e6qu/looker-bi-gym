# 053 - Tutorial Verification Separation Sweep

Status: locally verified on branch `tutorial-verification-separation-sweep`;
no PR opened by user request.

## Goal

Apply the tutorial/verification separation rule across tutorial pages, not only
the orientation tutorial.

## Scope

- Keep tutorial steps self-contained and independent from quiz content.
- Convert workbench hash routes shown as inline code into clickable links.
- Remove learner-facing references to challenge manifests, solution fixtures,
  repository paths, or challenge internals from tutorial pages.
- Avoid learner-facing meta assurances about missing quizzes or hidden files.
- Add rendered regression coverage across tutorial routes.
- Record PR #38 post-merge verification.

## Deliverables

- Tutorial and learner-task page cleanup.
- Rendered UI regression coverage for tutorial route-link and verification
  boundary issues.
- Updated continuity notes.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- stale scan for inline hash-route code and learner-facing challenge/fixture
  implementation wording
- `git diff --check`
- `bun run test:e2e`
- `bun run check`

## Notes

- PR #38 is already merged. The user asked not to open a new PR, so this task
  remains local until explicitly directed otherwise.
- Completeness claims remain blocked on Phase 9 targets and review gates.

## Progress Notes

- Added the Task 053 file and task index entry.
- Recorded PR #38 post-merge verification.
- Converted workbench hash routes in tutorial pages to clickable Markdown
  links.
- Removed learner-facing challenge manifest, solution fixture, repository path,
  and challenge-internal references from learner-task pages.
- Removed meta wording about separate quizzes or hidden reference files.
- Added rendered UI regression coverage across tutorial routes for inline
  hash-route code and learner-facing implementation wording.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for inline hash-route code and learner-facing challenge/fixture
    implementation wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 89
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 89
    Playwright tests passing.
- One parallel `bun run content:check` raced another command that regenerated
  ignored catalogs; rerunning serially passed.
