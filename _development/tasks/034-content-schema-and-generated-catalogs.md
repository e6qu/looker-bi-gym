# 034 - Content Schema And Generated Catalogs

Status: implemented locally on branch `phase-2-content-schema-catalogs`;
blocked from completion by hung Claude CLI formal review.

## Goal

Start Phase 2 by making Markdown with typed frontmatter the authored source for
learner-facing content catalogs, then generate typed app catalogs from those
sources.

## Scope

- Add one shared frontmatter contract for learner content with required `id`,
  `title`, `content_type`, `status`, and `version`.
- Add typed frontmatter to tutorials and `docs/facts/` while keeping facts in
  `docs/facts/` until the later fact-path migration.
- Move flashcard deck/card authoring from `app/src/flashcards.ts` into
  `flashcards/{topic}/` Markdown.
- Move quiz and exam authoring from YAML into `quizzes/{topic}/` and
  `exams/{topic}/` Markdown.
- Add a catalog generator that validates required frontmatter, duplicate IDs,
  source fact references, learner-task links for quizzes/exams, and generated
  app data shapes.
- Keep runtime scheduling, evaluation, and rendering logic in TypeScript.
- Keep generated TypeScript catalogs ignored and rebuildable from committed
  Markdown sources.

## Deliverables

- `app/scripts/generate-content-catalog.ts`.
- Package scripts run catalog generation before lint, typecheck, build, and
  catalog-dependent tests.
- `app/src/content.ts`, `app/src/factCatalog.ts`, `app/src/flashcards.ts`, and
  `app/src/learningContent.ts` consume generated catalog exports.
- Authored learner content exists under:
  - `tutorials/**/*.md`;
  - `docs/facts/*.md`;
  - `flashcards/{topic}/*.md`;
  - `quizzes/{topic}/*.md`;
  - `exams/{topic}/*.md`.
- Old quiz/exam YAML authoring files are removed.

## Verification

- PR #19 post-merge verification is recorded in continuity docs.
- Main CI, Pages workflow, and live Pages URL are checked before this branch.
- Generated catalogs validate without duplicate IDs or missing required
  metadata.
- Quiz and exam questions still resolve recommended learner tasks and source
  facts.
- Flashcards still resolve source facts and recommended app-route links.
- Stale references to the old quiz/exam YAML content path are removed or marked
  as historical migration notes.
- Claude CLI review is attempted with the documented command. Non-TUI
  `claude --print` works for a tiny prompt, but the Task 034 formal review hung
  with no output and was stopped; Phase 2 must not be marked complete until a
  completed formal review is recorded.

## Tests

- `bun run format:check`
- `bun run typecheck`
- `bun run lint`
- `bun run test:content-qa`
- `bun run test:facts-db`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run test:platform-boundary`
- `bun run test:e2e`
- `bun run check`
- stale path scans for removed YAML/TS content assumptions and future
  `docs/facts` canonical wording

## Verification Notes

- Local verification passed on 2026-05-10, including `bun run check` after
  approved local Vite preview binding for Playwright.
- The first sandboxed `bun run test:e2e` failed only because Vite preview could
  not bind `127.0.0.1:4173`; the approved rerun passed.
- The first post-migration e2e run found the BI Fundamentals deck opened on a
  different first card after generated sorting; adding `sort_order` metadata for
  the authored grain card fixed the regression.
- Claude CLI formal review did not complete; keep this task and Phase 2 as
  implemented locally but not formally Claude-reviewed.
