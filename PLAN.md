# Plan: Browser-Hosted Banking BI Tutorial Platform

## Purpose

Build a fully static GitHub Pages learning platform for technical BI in banking.
The default learner path runs in the browser with synthetic datasets,
DuckDB-WASM SQL practice, typed content catalogs, and browser-local progress.
Optional cloud-applied work may use Google Cloud Console, BigQuery UI, and
Looker Studio UI, but it must not require a backend, credentials, learner-data
upload, CLI tools for early tutorials, or real banking data.

This plan is the canonical multi-stage realignment plan. Broad claims such as
"complete", "comprehensive", "real", or "fact-backed" are not trusted for
curriculum quality unless they are supported by named automated checks, human
review notes, and Claude CLI review.

## Status Labels

- `planned`: accepted direction, not implemented.
- `implemented first pass`: code or content exists, but review gates have not
  all passed.
- `verified locally`: required local commands and documented manual checks
  passed.
- `CI passed`: GitHub Actions passed on the relevant branch or commit.
- `merged`: merged to `main`.
- `deployed`: GitHub Pages deployment and live URL were verified.
- `blocked`: work cannot proceed without an explicit dependency, approval, or
  external service.
- `known gap`: accepted unfinished work that must stay visible in continuity
  docs.

Continuity docs must stay concise, current, and actionable. Remove stale
history when it makes the current state harder to understand.

## Phase 0 - Truth And Continuity Reset

- Demote broad completion claims unless they are backed by automation, human
  review, and Claude CLI review.
- Keep `STATUS.md`, `DO_NEXT.md`, `BUGS.md`, and `WHAT_WE_DID.md` short enough
  for a new session to trust quickly.
- Record unresolved curriculum-quality gaps explicitly.
- Require acceptance notes that name what was checked and what remains open.

Review gates before this phase can be called complete:

- Automated checks: `bun run format:check`, path/reference scans, and relevant
  docs/content checks.
- Local judge or subagent review for shallow or fake work.
- Claude CLI formal review.
- Human-readable acceptance notes in continuity docs.
- Explicit unresolved gaps if any gate is missing.

## Phase 1 - Repository Layout Realignment

Top-level learner/source areas:

- `tutorials/{topic}/`
- `flashcards/{topic}/`
- `quizzes/{topic}/`
- `exams/{topic}/`
- `facts/{topic}/`
- `regulations/`
- `datasets/`
- `challenges/`

Keep `app/`, `docs/`, and `sources/`. Move repository implementation task docs
to `_development/tasks/`; these are not learner tasks.

Review gates before this phase can be called complete:

- Automated checks: `bun run check`, typecheck, lint, content QA, fact database
  tests, and Playwright where affected by route/path changes.
- Path/reference scans proving moved paths are updated.
- Local judge or subagent review for stale route/path risk.
- Claude CLI formal review.
- Acceptance notes in continuity docs.

## Phase 2 - Content Schema And Generated Catalogs

- Markdown with typed frontmatter is the durable source of truth.
- Generate typed catalogs for app consumption.
- CI fails on stale generated catalogs, duplicate IDs, missing facts, or
  missing sources.
- Generated artifacts that can be rebuilt locally stay out of git unless a
  later task explicitly justifies committing them.

## Phase 3 - `facts-db-app`

- Add a top-level Bun workspace package named `facts-db-app`.
- Scope this phase to CLI plus library only, not a web UI.
- Build a SQLite graph/triple index from Markdown facts and `sources/`.
- Markdown remains the durable source of truth; SQLite is an index and
  navigation layer.

## Phase 4 - Fact Corpus Expansion

- Move the current fact corpus from `docs/facts/` to root `facts/`.
- Expand toward at least 500 source-backed facts.
- Prioritize BI, BigQuery, Looker Studio, SQL, metric contracts, data quality,
  privacy/security, and banking context.
- Count targets do not prove quality; facts need source support and review.

## Phase 5 - Flashcards, Quizzes, Exams

- Move hardcoded flashcards into topic-grouped Markdown.
- Target at least 500 flashcards, 200 quiz questions, and 30 exam cards.
- Require fact/source support, deterministic checks where possible, and quality
  review, not only item counts.

## Phase 6 - Real Tutorials And Challenges

- Tutorials must be linear, self-contained, runnable, and tied to real learner
  outcomes.
- Challenges must have deterministic outputs, known-good fixtures, and
  known-bad trap coverage where relevant.
- Keep the first pass mechanics-first for a data analyst moving into BI and
  banking.

## Phase 7 - App Learning Surface Verification

- A learner can use tutorials, flashcards, quizzes, exams, facts,
  datasets/workbench, and challenges from the GitHub Pages UI without opening
  repository files.
- Browser verification must cover desktop and mobile layouts, navigation,
  state, and representative learning flows.

## Phase 8 - Release Readiness

Before saying a phase or release is complete, all of these must pass or be
documented as blocking:

- Automation: `bun run check`, typecheck, lint, content QA, facts DB tests, and
  Playwright.
- Human review for curriculum depth and learner usefulness.
- Local judge or subagent review for shallow or fake work.
- Claude CLI formal review.
- Browser walkthrough of the deployed GitHub Pages site when release-facing.
- Continuity docs updated with acceptance notes and unresolved gaps.

Claude CLI command shape:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

If Claude CLI hangs, is unavailable, or cannot authenticate, the phase is
`blocked` or `implemented but not Claude-reviewed`; do not call it complete.

## Split Plans

- [PLAN_BI_TUTORIAL_APP.md](PLAN_BI_TUTORIAL_APP.md): app skeleton, runtime,
  validation platform, storage, and GitHub Pages deployment.
- [PLAN_BI_TUTORIAL_TUTORIALS.md](PLAN_BI_TUTORIAL_TUTORIALS.md): curriculum,
  challenge model, data-source contract, verification patterns, and authoring
  rules.
- [\_development/tasks/README.md](_development/tasks/README.md): numbered
  repository implementation tasks with verification and tests.

## Non-Negotiables

- No backend.
- No real banking data.
- No credentials, secrets, service account keys, OAuth tokens, user tracking, or
  learner-data upload.
- No unspecified learner-installed tools.
- No hidden server-side validation.
- No legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Rebuildable generated outputs, package caches, build outputs, and WASM
  runtime artifacts stay out of git.
