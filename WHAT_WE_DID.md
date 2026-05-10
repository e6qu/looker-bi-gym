# What We Did

## 2026-05-10 - Phase 6 Tutorial Challenge Expansion Batch 1

- Verified PR #24 post-merge state:
  - PR #24 was squash-merged at
    `22ff713374382341bbc11474a2501ab9d5325908`.
  - Main CI passed for `22ff713`.
  - GitHub Pages workflow passed for `22ff713`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Sun, 10 May 2026 21:11:23 GMT`.
- Confirmed no open PRs before starting the Phase 6 branch.
- Created branch `phase-6-tutorial-challenge-expansion` from verified `main`.
- Added `_development/tasks/039-tutorial-challenge-expansion.md`.
- Added `LT-DQ-006 - Define A Ratio Null Contract` as a self-contained learner
  task with browser-runnable SQL, expected outputs, checkpoints,
  visualization/reporting action, common failure modes, self-assessment, and
  an end challenge.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - stale scan for unsupported completeness claims;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - the Task 039 formal Claude CLI review used non-TUI
    `claude --print --permission-mode plan --output-format text ...`, produced
    no output for about 50 seconds, and was terminated.
- Acceptance note: this is a first Phase 6 tutorial/challenge batch only. It
  does not satisfy Phase 9 completeness targets.
- Committed `a3be749 Add ratio null contract learner task`.
- Pushed branch `phase-6-tutorial-challenge-expansion` and opened PR #25:
  `https://github.com/e6qu/looker-bi-gym/pull/25`.

## 2026-05-10 - Phase 5 Assessment Content Expansion Batch 1

- Verified PR #23 post-merge state:
  - PR #23 was squash-merged at
    `1ba5fefdb169c74b633b02d6ef0a66014bf96006`.
  - Main CI passed for `1ba5fef`.
  - GitHub Pages workflow passed for `1ba5fef`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Sun, 10 May 2026 20:53:44 GMT`.
- Confirmed no open PRs before starting the Phase 5 branch.
- Created branch `phase-5-assessment-content-expansion` from verified `main`.
- Added `_development/tasks/038-assessment-content-expansion.md`.
- Started a first assessment expansion batch:
  - 10 flashcards for BigQuery `SAFE_DIVIDE`, `SAFE_CAST`, `QUALIFY`, Looker
    Studio freshness/cost/blend behavior, ratio contracts, and refresh
    operations;
  - 6 quiz questions across easy, medium, and hard;
  - 2 exam cards for ratio null contracts and dashboard refresh operations.
- Raised guardrails to at least 59 flashcards, 14 quiz questions, and 4 exam
  cards.
- Fixed a rendered UI e2e regression by deriving the expected flashcard count
  from the generated catalog instead of hardcoding the previous 49-card count.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - `bun run format:check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - stale scan for unsupported completeness claims;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - the first approved `bun run check` failed on a stale e2e expectation for
    the old 49-card flashcard count;
  - the Task 038 formal Claude CLI review used non-TUI
    `claude --print --permission-mode plan --output-format text ...`, produced
    no output for about 50 seconds, and was terminated.
- Acceptance note: this is a first Phase 5 expansion batch only. It does not
  satisfy the 500 flashcard, 200 quiz question, 30 exam card, or Phase 9
  completeness targets.
- Committed `fdb6f5f Expand assessment content coverage`.
- Pushed branch `phase-5-assessment-content-expansion` and opened PR #24:
  `https://github.com/e6qu/looker-bi-gym/pull/24`.

## 2026-05-10 - Phase 4 Fact Corpus Expansion Batch 1

- Continued Task 037 on branch `phase-4-fact-corpus-expansion`.
- Verified official Google Cloud source pages on 2026-05-10 for:
  - BigQuery `SAFE_DIVIDE`;
  - BigQuery `SAFE_CAST`;
  - BigQuery `QUALIFY`;
  - Looker Studio data freshness.
- Added 4 source cards under `sources/platforms/` for those official docs.
- Added 8 new source-backed fact cards:
  - `FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD`;
  - `FACT-BIGQUERY-SAFE-CAST-DQ-NULL`;
  - `FACT-BIGQUERY-QUALIFY-WINDOW-FILTER`;
  - `FACT-BIGQUERY-QUALIFY-TRUE-ONLY`;
  - `FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF`;
  - `FACT-LOOKER-STUDIO-FRESHNESS-MEMORY`;
  - `FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST`;
  - `FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM`.
- Raised fact database guardrails to at least 50 source cards and 109
  executable fact cards.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run test:facts-db`;
  - `bun run facts:build-db`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - `bun run format:check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - stale scan for old fact path and unsupported completeness claims;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - the Task 037 formal Claude CLI review used non-TUI
    `claude --print --permission-mode plan --output-format text ...`, produced
    no output for over 40 seconds, and was terminated.
- Acceptance note: this is a first stable expansion batch only. It does not
  satisfy the Phase 4 500-fact target or Phase 9 completeness gate.
- Committed `428f4cc Expand source-backed fact corpus`.
- Pushed branch `phase-4-fact-corpus-expansion` and opened PR #23:
  `https://github.com/e6qu/looker-bi-gym/pull/23`.

## 2026-05-10 - Phase 4 Root Facts Corpus Migration

- Verified PR #21 post-merge state:
  - PR #21 was squash-merged at
    `b65ccdd34578f914462430b29bc3dd124da9a397`.
  - Main CI passed for `b65ccdd`.
  - GitHub Pages workflow passed for `b65ccdd`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Confirmed no open PRs before starting the Phase 4 branch.
- Created branch `phase-4-root-facts-corpus` from verified `main`.
- Added `_development/tasks/036-root-facts-corpus-migration.md`.
- Moved the authored fact corpus to root `facts/`.
- Updated relative source links inside fact Markdown for the new root path.
- Updated catalog generation to read facts from root `facts/`.
- Updated content QA, flashcard fact checks, and `facts-db-app` to read root
  `facts/`.
- Updated app fact fallback UI and docs links away from the old nested docs
  route.
- Updated current documentation so root `facts/` is canonical, with fact-count
  expansion left as a follow-up after the migration stabilizes.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run test:facts-db`;
  - `bun run facts:build-db`;
  - `bun run test:content-qa`;
  - `bun run test:flashcards`;
  - `bun run test:quiz-facts-db`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - stale scan for old fact path/future-canonical wording in current docs, app,
    source, and content paths;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - the Task 036 formal Claude CLI review used non-TUI
    `claude --print --permission-mode plan --output-format text ...`, produced
    no output for over 40 seconds, and was terminated.
- Committed `93e8a4f Move fact corpus to root facts`.
- Pushed branch `phase-4-root-facts-corpus` and opened PR #22:
  `https://github.com/e6qu/looker-bi-gym/pull/22`.
- PR #22 CI passed, then PR #22 was squash-merged at
  `9e9e709ff76eb90f21f837a3d0c2570200c34d7a`.
- Main CI passed for `9e9e709`.
- GitHub Pages workflow passed for `9e9e709`.
- Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
  after the PR #22 deployment.
- Created branch `phase-4-fact-corpus-expansion` from verified `main`.
- Added `_development/tasks/037-fact-corpus-expansion.md` as the next
  implementation task. No fact expansion has been implemented yet.

## 2026-05-10 - Phase 3 Facts DB App Workspace

- Verified PR #20 post-merge state:
  - PR #20 was squash-merged at
    `1539350e05f58de84ac94db4c44e6c0702f83a6e`.
  - Main CI passed for `1539350`.
  - GitHub Pages workflow passed for `1539350`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Confirmed there were no open PRs before starting the Phase 3 branch.
- Created branch `phase-3-facts-db-app` from verified `main`.
- Added `_development/tasks/035-facts-db-app-workspace.md`.
- Added the top-level Bun workspace package `facts-db-app`.
- Moved the fact database library from `app/scripts/fact-database.ts` to
  `facts-db-app/src/fact-database.ts`.
- Moved the fact database CLI from `app/scripts/build-fact-database.ts` to
  `facts-db-app/src/cli.ts`.
- Moved the fact database test from `app/scripts/test-fact-database.ts` to
  `facts-db-app/tests/test-fact-database.ts`.
- Added `facts-db-app/package.json`, `facts-db-app/tsconfig.json`,
  `facts-db-app/README.md`, and a local `bun:sqlite` declaration so the
  package typechecks independently.
- Updated root and app package scripts so `test:facts-db` and `facts:build-db`
  run through the workspace package.
- Updated root `typecheck` and `check` so the `facts-db-app` package typechecks
  before app verification.
- Updated app-side LLM workbench and quiz fact-grounding scripts to import fact
  cards and source cards from `facts-db-app`.
- Updated platform documentation to describe `facts-db-app` as local
  development tooling, not a web UI or backend.
- Verification passed:
  - `bun run test:facts-db`;
  - `bun run facts:build-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:llm-workbench`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:platform-boundary`;
  - `bun run format:check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - the Task 035 formal Claude CLI review used non-TUI
    `claude --print --permission-mode plan --output-format text ...`, produced
    no output for over 40 seconds, and was terminated.
- Committed `4832312 Add facts db app workspace`.
- Pushed branch `phase-3-facts-db-app` and opened PR #21:
  `https://github.com/e6qu/looker-bi-gym/pull/21`.

## 2026-05-10 - Phase 2 Content Schema And Generated Catalogs

- Added `PLAN.md` Phase 9 - Curriculum Completeness And External Verification,
  which defines the required competency matrix, content coverage matrix,
  tutorial standard, question/exam/flashcard standard, external verification,
  and review gates before the project may claim complete or comprehensive
  learning materials.
- Verified PR #19 post-merge state:
  - PR #19 is merged at `1484ca1159f494421ab857107ef4d49d017fdd00`.
  - Main CI passed for `1484ca1`.
  - GitHub Pages workflow passed for `1484ca1`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Confirmed no open PRs before starting the Phase 2 branch.
- Created branch `phase-2-content-schema-catalogs` from updated `main`.
- Added `_development/tasks/034-content-schema-and-generated-catalogs.md`.
- Added typed frontmatter to tutorial Markdown and the then-current fact
  Markdown path.
- Moved flashcard authoring from `app/src/flashcards.ts` into
  `flashcards/{topic}/` Markdown.
- Moved quiz and exam authoring from YAML into:
  - `quizzes/bi-foundations/bi-foundations-mixed.md`;
  - `exams/bi-foundations/bi-foundations-exam.md`.
- Removed old authored YAML files:
  - `quizzes/bi-foundations-mixed.yaml`;
  - `exams/bi-foundations-exam.yaml`.
- Added `app/scripts/generate-content-catalog.ts`, which validates required
  frontmatter, content IDs, source facts, quiz/exam learner-task links, and
  stale generated catalog parity.
- Updated app loaders so docs/tutorials/facts, flashcards, quiz banks, and exam
  packs consume generated catalog exports.
- Updated package scripts to run catalog generation before lint, typecheck,
  build, and catalog-dependent tests.
- Updated docs and implementation task references away from old quiz/exam YAML
  and hardcoded flashcard assumptions.
- Updated `test-platform-boundary` so ignored generated catalog data is not
  scanned as handwritten runtime source.
- Fixed a post-migration e2e ordering regression by adding authored
  `sort_order` metadata to the first BI Fundamentals flashcard.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:content-qa`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - stale quiz/exam YAML and hardcoded-flashcard reference scan;
  - fact-canonical wording scan;
  - type-safety scan for banned casts/types;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run test:e2e` failed only because Vite preview could
    not bind `127.0.0.1:4173`;
  - first post-migration e2e run failed because generated sorting changed the
    first BI Fundamentals flashcard;
  - initial Claude CLI formal review attempt was rejected by escalation policy;
  - after explicit user approval, non-TUI `claude --print` and `codex exec`
    both worked for tiny prompts, but the Task 034 Claude formal review hung
    with no output for about one minute and was terminated.

## 2026-05-10 - Realignment Decision And Continuity Reset

- Fetched `origin/main`; it had advanced to
  `bd27014 Improve flashcard study workflow (#18)`.
- Created branch `realignment-continuity-layout` from updated `origin/main`.
- Started the realignment continuity and layout PR as an implementation PR, not
  a docs-only PR.
- Moved repository implementation task docs into `_development/tasks/`.
- Rewrote `PLAN.md` as the staged realignment plan:
  - Phase 0 - Truth And Continuity Reset.
  - Phase 1 - Repository Layout Realignment.
  - Phase 2 - Content Schema And Generated Catalogs.
  - Phase 3 - `facts-db-app`.
  - Phase 4 - Fact Corpus Expansion.
  - Phase 5 - Flashcards, Quizzes, Exams.
  - Phase 6 - Real Tutorials And Challenges.
  - Phase 7 - App Learning Surface Verification.
  - Phase 8 - Release Readiness.
- Streamlined `STATUS.md`, `DO_NEXT.md`, and `BUGS.md` so they no longer treat
  PR #18 as active.
- Recorded that prior broad curriculum-quality claims are not trusted without
  deeper review gates.
- Updated task-path references to `_development/tasks/`.
- Updated content QA so repository Markdown validation walks `_development/`
  instead of the removed top-level implementation task directory.
- Fixed relative links inside moved implementation task docs.
- Checked for existing open PRs with `gh pr list --state open --limit 10`; no
  open PRs were returned.
- Verification passed:
  - `bun run format:check`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:content-qa`;
  - `bun run test:facts-db`;
  - `bun run test:llm-workbench`;
  - `bun run test:platform-boundary`;
  - `bun run validate:static-links`;
  - stale implementation-task path scan;
  - fact-canonical wording scan;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed attempt recorded: the first sandboxed `bun run check` reached
  Playwright but Vite preview could not bind `127.0.0.1:4173`; the approved
  rerun passed.
- Committed `7958f52 Realign continuity and task layout`.
- Pushed branch `realignment-continuity-layout` and opened PR #19:
  `https://github.com/e6qu/looker-bi-gym/pull/19`.

## Recent Prior Work Kept For Context

- PR #18 improved flashcard study usability on branch `agent-pr-discipline` and
  was observed merged on `origin/main` at `bd27014`.
- PR #17 previously merged at
  `d7ace564745b9f160679d5c8a3583ff4fd43cc34`; main CI and Pages were verified
  at that time.
- The user required stricter PR discipline: one working PR at a time, no direct
  pushes to `main`, rebase on `origin/main` before merge, merge only after CI
  passes, then verify main CI, Pages deployment, and the live URL.

## Review Findings To Preserve

- Local/subagent judge review found the prior continuity docs overstated
  curriculum quality and completion. Existing content may be useful first-pass
  material, but it must not be called complete or comprehensive without named
  review gates.
- Claude CLI review is required for each phase before marking it complete.
  Previous Claude CLI setup was installed and the user approved an external
  review, but the elevated run hung and was stopped. Retry only with explicit
  approval and a ready session.

## Archived History

Older PR and task chronology was intentionally compressed. Use git history,
merged PRs, and `_development/tasks/*.md` for detailed implementation history.
