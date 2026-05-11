# 057 - Quiz Question Quality Expansion

Status: locally verified on branch `quiz-question-quality-expansion`; open in
PR #42.

## Goal

Rewrite the main quiz bank so questions are less awkward, more scenario-driven,
and broader across BI, BigQuery, Looker Studio, controls, privacy, and banking
context while keeping factual grounding in hidden metadata.

## Scope

- Review every authored question in `quizzes/bi-foundations/bi-foundations-mixed.md`.
- Rewrite prompts, options, explanations, and self-assessment text for clearer
  BI practice scenarios.
- Expand the main quiz bank from 17 to 60 questions, with 20 questions per
  difficulty.
- Keep `recommended_learner_tasks` and `source_facts` in metadata only.
- Update the tutorial quiz-bank page so it describes coverage instead of
  duplicating stale question text.
- Raise content QA guardrails so the bank cannot shrink below 60 questions.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `bun run test:e2e`
- `bun run check`
- stale scans for visible `FACT-*`, `LT-*`, and implementation wording in quiz
  prompts

## Progress Notes

- Confirmed no open PRs before starting Task 057.
- Reworked the bank to use fully formed standalone scenarios rather than prompts
  that depend on tutorial steps or internal course references.
- Expanded the authored quiz bank to 60 questions: 20 easy, 20 medium, and 20
  hard.
- Updated the quiz guide to describe broad BI, BigQuery, Looker Studio,
  governance, and banking coverage without exposing hidden fact/task metadata.
- Raised content QA guardrails to require at least 60 quiz questions and 20 per
  difficulty.
- Updated rendered and deployed learning-surface expectations for the rewritten
  quiz prompt.
- Fixed quiz-route mobile overflow by letting long question and answer text wrap
  inside fieldsets and option rows.

## Verification Notes

- Passed `bun run content:generate`.
- Passed `bun run content:check`.
- Passed `bun run format:check`.
- Passed `bun run test:content-qa`.
- Passed `bun run test:quiz-facts-db`.
- Passed `bun run validate:static-links`.
- Passed `bun run typecheck`.
- Passed `bun run lint`.
- Passed stale scans for learner-facing implementation/source metadata wording.
- Passed `bun run test:e2e` after approved local Vite preview binding, with all
  93 Playwright tests passing.
- Passed `bun run check` after approved local Vite preview binding, with all 93
  Playwright tests passing.

Blocked review:

- Claude CLI formal review is still not complete; prior non-TUI attempts either
  required login or hung. This task does not mark a phase complete.
