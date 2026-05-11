# 054 - Curriculum Self-Reference Remediation

Status: locally verified on branch `tutorial-verification-separation-sweep`;
no PR opened by user request.

## Goal

Remove learner-facing curriculum scaffolding from tutorials, quiz pages, exam
pages, flashcards, and assessment UI so the learning material stays focused on
BI theory and practice, Looker Studio, BigQuery, synthetic banking controls, and
thin regulatory context.

## Scope

- Make the tutorial index and practice-lab index present one coherent
  browser-first sequence.
- Keep quiz and exam surfaces independent from tutorial/task references.
- Preserve source and task metadata for validation while hiding internal IDs
  and task links from assessment prompts.
- Remove visible wording such as "this website", "this page", "Source Facts",
  "CTF-style", and challenge/course scaffolding where it appears in
  learner-facing content.
- Try Claude CLI second-opinion review in non-TUI mode and record whether it
  works.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `bun run test:flashcards`
- `bun run test:quiz-facts-db`
- `bun run test:platform-boundary`
- `bun run check`
- stale scans for self-referential learner-facing wording

## Progress Notes

- `claude -s --print --permission-mode plan --output-format text ...` failed
  immediately because the installed Claude CLI does not support `-s`.
- `claude --print --permission-mode plan --output-format text ...` ran in
  non-TUI mode but returned `Not logged in · Please run /login`.
- Reworked the tutorial and practice-lab indexes into one browser-first path
  and added the ratio-null lab to that path.
- Replaced visible `Source Facts` sections with `Evidence Basis`, and removed
  `this website/page/task page` plus `CTF-style` learner-facing wording.
- Reworked quiz-bank prose so answers are hidden in expandable sections and the
  questions no longer show recommended-task references.
- Reworked exam-mode prose so cards stand on their own with inputs and expected
  outputs instead of recommended-task references.
- Removed rendered recommended-task links and source-fact plumbing from quiz
  and exam prompts while preserving metadata for validation.
- Reworded the fanout flashcard from a challenge frame to a BI control check.
- Updated content QA and rendered UI tests for the new boundary.
- Local verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:flashcards`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - stale scan for self-referential learner-facing wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 89
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 89
    Playwright tests passing.
- The first sandboxed `bun run test:e2e` failed because Vite preview could not
  bind `127.0.0.1:4173` (`EPERM`); rerunning with approved local binding
  passed.
