# Plan: Browser-Hosted Banking BI Tutorial Platform

## Purpose

Build a fully static GitHub Pages learning platform for technical BI in banking.
The default learner path runs in the browser with synthetic datasets,
DuckDB-WASM SQL practice, typed content catalogs, and browser-local progress.
Optional cloud-applied work may use Google Cloud Console, BigQuery UI, and
Looker Studio UI, but it must not require a backend, credentials, learner-data
upload, CLI tools for early tutorials, or real banking data.

This plan is the canonical multi-stage realignment plan. Broad claims such as
"complete", "comprehensive", "real", "reality-verified",
"externally verified", or "fact-backed" are not trusted for curriculum quality
unless they are supported by named automated checks, coverage matrices, external
source review, human review notes, and Claude CLI review.

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
- Move current tutorial metadata, facts metadata, flashcards, quiz banks, and
  exam cards onto the shared Markdown-frontmatter contract.
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

- Use root `facts/` as the canonical authored fact corpus.
- Expand toward at least 500 source-backed facts.
- Prioritize BI, BigQuery, Looker Studio, SQL, metric contracts, data quality,
  privacy/security, and banking context.
- Count targets do not prove quality; facts need source support and review.

## Phase 5 - Flashcards, Quizzes, Exams

- Expand generated Markdown catalogs toward at least 500 flashcards, 200 quiz
  questions, and 30 exam cards.
- Require fact/source support, deterministic checks where possible, and quality
  review, not only item counts.

## Phase 6 - Real Tutorials And Challenges

- Tutorials must be linear, self-contained, runnable, and tied to real learner
  outcomes.
- Challenges must have deterministic outputs, known-good fixtures, and
  known-bad trap coverage where relevant.
- Keep the first pass mechanics-first for a data analyst moving into BI and
  banking.
- Learner-facing questions, flashcards, challenge prompts, and exam cards must
  ask about the curriculum domain, not about the repository, app internals,
  training meta-policy, or what "the learner" should do.

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

This phase can release an implemented learning platform, but it still must not
claim the full curriculum is complete or comprehensive unless Phase 9 has
passed.

## Phase 9 - Curriculum Completeness And External Verification

This phase is the only gate that may permit claims such as "complete",
"comprehensive", "reality-verified", or "externally verified" for the learning
materials.

Required coverage artifacts:

- A competency matrix for the full target learner path: BI foundations, SQL for
  BI, BigQuery serving patterns, Looker Studio mechanics, data quality controls,
  privacy/security boundaries, banking-domain context, metric contracts,
  observability/operations, and exam readiness.
- A content coverage matrix tying every competency to at least one tutorial,
  one deterministic challenge or workbench exercise, quiz questions,
  flashcards, source facts, and expected outputs.
- A gap matrix that explicitly lists missing or weak competencies, shallow
  content, unverified claims, missing learner tasks, missing challenge fixtures,
  and missing external sources.
- A source coverage matrix tying every factual, platform, regulatory, and
  banking-domain claim to `FACT-*` IDs and external source cards.

Required tutorial standard:

- Every tutorial must be step-by-step, self-contained, runnable by a learner
  from the website, and tied to a named learner outcome.
- Every tutorial must include objective, prerequisites, exact steps,
  checkpoints, expected outputs, visualization/reporting action,
  self-assessment, common failure modes, and an end challenge.
- Every tutorial must start from a real, verified setup state: browser-only
  where possible; otherwise exact cross-platform setup, exact tool versions or
  acceptable version ranges, exact account/interface prerequisites, and a
  recovery path for common failures.
- If a tutorial requires a file, the page must provide exact browser download
  or `curl` instructions, expected file name/location, row counts or checksums
  where practical, and a recovery path for common download/import failures.
- Every referenced dataset, route, file, external page, report recipe, and
  command must be verified to exist at review time. Nonexistent downloads,
  placeholder files, vague "open the report from tutorial 01" dependencies, or
  unverified setup steps are blockers, not minor docs issues.
- Every SQL, Looker Studio, or BigQuery action must include the expected result:
  row counts, field names, totals, screenshots/checkpoints where appropriate,
  and an explanation of what to do when the result differs.
- Early learner paths must remain browser-first and must not require Google
  Cloud CLI, BigQuery CLI, Python, Docker, credentials, learner-data upload, or
  real banking data.

Required question, exam, and flashcard standard:

- Quiz banks must cover each competency at multiple difficulties, with clear
  explanations, recommended learner tasks, source facts, and deterministic
  evidence where the answer is numeric or dataset-derived.
- Exam cards must represent realistic end-to-end BI work products with
  expected outputs, known-good fixtures where applicable, and self-assessment
  rubrics.
- Flashcards must cover definitions, traps, platform mechanics, dataset
  controls, source-backed facts, and troubleshooting patterns without copying
  third-party deck text.
- Assessment items must be scenario-driven and useful for BI work. Avoid
  circular or meta questions about the course, repository, generated catalogs,
  storage implementation, source IDs, task IDs, or "what learners should do
  about learners."
- Counts are minimum scale checks, not quality proof: at least 500 flashcards,
  200 quiz questions, and 30 exam cards must be reviewed against the competency
  matrix before any completeness claim.

Required external verification:

- Platform behavior must be backed by official vendor documentation where
  available.
- Regulatory and banking-domain context must be backed by regulator, official
  legal, standards-body, or clearly identified authoritative sources.
- Dataset-derived claims must be reproducible from committed synthetic data and
  deterministic fixtures.
- External review notes must identify which official or authoritative sources
  were checked, what was accepted, what was rejected, and what remains uncertain.
- Third-party community material may be used only as coverage signal unless its
  licensing and provenance permit direct reuse.

Required review gates:

- Automation: `bun run check`, content QA, facts DB tests, quiz/fact grounding,
  flashcard tests, static-link validation, and stale-reference scans.
- Browser walkthrough of every learner surface on the deployed GitHub Pages
  site.
- Human curriculum review for accuracy, completeness, and learner usefulness.
- Local judge or subagent review for shallow, fake, circular, or non-runnable
  content.
- Claude CLI formal review, or an explicitly documented blocker if the CLI
  cannot complete.
- Continuity docs updated with acceptance notes and unresolved gaps.

Until every Phase 9 artifact and review gate passes, continuity docs and user
responses must say the curriculum is implemented first pass or partially
verified, not complete or comprehensive.

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
