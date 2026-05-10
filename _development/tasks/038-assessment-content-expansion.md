# 038 - Assessment Content Expansion

Status: implemented locally on branch `phase-5-assessment-content-expansion`;
PR #24 open; formal Claude review blocked by CLI hang.

## Goal

Begin Phase 5 by expanding flashcards, quiz questions, and exam cards from the
typed Markdown catalog sources while preserving fact grounding and explicit
learner-task links.

## Scope

- Add a first stable batch of authored Markdown flashcards.
- Add a first stable batch of quiz questions across easy, medium, and hard
  difficulty.
- Add exam cards that represent realistic self-assessed BI work products.
- Raise automated guardrail counts so future changes cannot silently shrink the
  authored assessment corpus.
- Do not claim complete, comprehensive, or externally verified coverage until
  Phase 9 artifacts and review gates pass.

## Deliverables

- Additional flashcards under existing topic decks.
- Additional quiz questions in the generated Markdown quiz bank.
- Additional exam cards in the generated Markdown exam pack.
- Updated tests for minimum flashcard, quiz-question, and exam-card counts.
- Continuity notes that state current counts and remaining gaps.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run check`
- stale scan for unsupported completeness claims

Passed locally on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for unsupported completeness claims
- `git diff --check`

Acceptance notes:

- Added 10 flashcards, raising the authored flashcard count from 49 to 59.
- Added 6 quiz questions, raising the authored quiz question count from 8 to 14.
- Added 2 exam cards, raising the authored exam card count from 2 to 4.
- Raised local guardrails to at least 59 flashcards, 14 quiz questions, and 4
  exam cards.
- Fixed the rendered UI flashcard test to derive the expected card count from
  the generated catalog instead of hardcoding `49`.
- This is a first Phase 5 expansion batch only; it does not satisfy the 500
  flashcard, 200 quiz question, 30 exam card, or Phase 9 completeness targets.

Blocked review:

- `claude --print --permission-mode plan --output-format text ...` was run in
  non-TUI mode for the Task 038 formal review, produced no output for about 50
  seconds, and was terminated.

## Notes

- Phase 5 targets are at least 500 flashcards, 200 quiz questions, and 30 exam
  cards. This task is a first expansion batch, not the full target.
- Each authored assessment item must cite existing `FACT-*` IDs and, where
  applicable, link back to learner tasks shown in the app.
