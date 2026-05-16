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
- Curriculum vocabulary must be grounded in rendered terminology pages. Specific
  words should be visibly distinguishable as BI concepts, SQL syntax, BigQuery
  terms, Looker Studio terms, banking terms, regulatory terms, or
  DuckDB/browser-runtime terms when precision matters. The terminology pages
  themselves landed in PR #44 but no learner-facing surface yet references
  them; Phase 10 stages the inline grounding rollout and the integrity,
  sourcing, search, and coverage gaps that the first pass left open.
- Quizzes and challenges are separate verification surfaces. Tutorial steps
  must not depend on completing a quiz, and quiz questions should verify the
  same competencies with distinct scenario prompts rather than duplicating the
  tutorial worksheet.
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
- Where a field or term could be ambiguous, assessment text must distinguish
  business terms, BI concepts, SQL syntax, BigQuery terms, Looker Studio terms,
  DuckDB/browser-runtime fields, and regulatory terms. Inline terminology links
  may use short superscript hints such as `BI`, `SQL`, `BQ`, `LS`, `BNK`, `REG`,
  or `DB`.
- Counts are minimum scale checks, not quality proof: at least 500 flashcards,
  200 quiz questions, and 30 exam cards must be reviewed against the competency
  matrix before any completeness claim.

Required external verification:

- Platform behavior must be backed by official vendor documentation where
  available. Terminology entries for `BQ`, `LS`, and `DB` terms must carry the
  citations defined in Phase 10.2 before this gate can pass.
- Regulatory and banking-domain context must be backed by regulator, official
  legal, standards-body, or clearly identified authoritative sources. The
  `REG` terminology entries must carry the citations defined in Phase 10.2
  before this gate can pass.
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

## Phase 10 - Terminology Grounding Follow-Through

PR #44 (`d88acc7`, merged 2026-05-12) landed a rendered terminology area but
delivered only the surface of the Phase 6 grounding requirement. The
follow-through work below is staged so each PR stays reviewable and so the
plan does not blur "glossary pages exist" with "curriculum is grounded in
them".

### Findings From The First Pass

These are the incomplete, shallow, or wrong parts of the merged terminology
work that this phase must address. They are not minor docs issues; several
of them are why Phase 6 and Phase 9 cannot yet move.

- No curriculum surface uses the new term-link convention. `class="termRef"`
  and `class="termBadge"` occur only inside `terminology/*.md` itself. No
  tutorial, quiz, flashcard, exam, fact, regulation, or challenge file
  references a terminology anchor. The stated purpose ("ground learner-facing
  vocabulary") was not delivered.
- Cross-link integrity is not enforced. Heading anchors are slugged at render
  time in `app/src/markdown.ts`. Nothing in `bun run check` validates that
  `<a class="termRef" href="#/terminology/.../#anchor">` resolves to a real
  heading; renaming any `## term` silently breaks links across ~250 inline
  references in the terminology files alone.
- No external sourcing. Vendor terms (BigQuery, Looker Studio, DuckDB-WASM)
  and regulatory terms (GDPR, DGSD, DORA) are written from memory. None
  carry a citation to official vendor documentation, regulator pages, or
  standards bodies. Phase 9 cannot accept these as externally verified.
- No fact linkage. The corpus has `FACT-*` IDs and a fact database, but
  terminology entries do not reference them. Term definitions and fact
  claims can drift independently.
- Search is page-level, not term-level. The "Search terminology" sidebar
  filters which terminology pages appear; it does not surface or jump to the
  matching `## term` heading on the page.
- Decorative redundancy. Every entry repeats a `<span class="termBadge">`
  domain label at the top, which duplicates the file's own scope. The badge
  earns its place inline (next to a referenced term), not as a leading
  decoration on the definition.
- Content QA only registers the section. `app/scripts/test-content-qa.ts`
  was extended to know terminology exists, but no scan checks for duplicate
  term IDs, mis-marked domain hints (`LS` pointing to `bigquery.md`), or
  unreachable Related cross-links.
- README convention is half-shown. The marker key advertises "normal Markdown
  or HTML link with a short superscript domain hint", but only the HTML form
  works through `marked` (Markdown links cannot embed `<sup>`). The README
  should drop the Markdown form or document an alternative.
- Continuity drift. Task 059, STATUS.md, and DO_NEXT.md still describe PR
  #44 as open. The local `terminology-grounding-glossary` branch is two
  pre-squash commits ahead of `origin/main` and should be deleted after the
  follow-through tasks are scheduled.

### Phase 10.1 - Terminology Integrity Checks

- Validate every `## term` heading is unique within its terminology file and
  that derived slugs are unique across the terminology section.
- Validate every `class="termRef" href="#/terminology/<file>#<anchor>"`
  resolves to a real heading on a real terminology page; fail
  `bun run content:check` (or a dedicated `validate:terminology-links`) on
  break.
- Validate marker hints match the linked file's domain (e.g. `LS` only on
  links to `looker-studio.md`).
- Detect dead `Related:` entries and reciprocal gaps (term A links to term B
  but B does not link back when both share a domain).
- Drop or justify the leading per-entry `<span class="termBadge">` block;
  keep badges as inline hints only.

### Phase 10.2 - Terminology Sourcing And Fact Linkage

- Add a `sources` field (frontmatter list or a trailing `Sources:` block)
  per term. Required for vendor (`BQ`, `LS`, `DB`) and regulatory (`REG`)
  terms; encouraged for `BI`, `SQL`, `BNK`.
- Backfill citations to official vendor docs, regulator pages,
  standards-body publications, or clearly identified authoritative sources.
  Coverage is judged by named-domain term count, not total entry count.
- Where a term overlaps an existing `FACT-*` claim, add the fact ID and add
  a content-QA check that the term definition and fact wording stay
  compatible.
- Reject "memory-only" entries during review; mark unsourced vendor and
  regulatory terms as known gaps until backfilled.

### Phase 10.3 - Terminology Search Depth

- Surface matching `## term` headings in the sidebar search result list, not
  only the parent page, with a direct jump-to-anchor link.
- Support `#/terminology/?q=...` deep links for sharing or learner-task
  prompts.
- Add rendered UI coverage for term-level search and anchor jumps.

### Phase 10.4 - Curriculum Grounding Rollout

Inline `class="termRef"` markers must be added across learner-facing surfaces
so Phase 6's grounding requirement is actually met. Stage the rollout one
surface per PR; each PR must include a stale scan that no inline marker
links to a missing anchor:

1. Tutorials.
2. Quizzes.
3. Flashcards.
4. Exams.
5. Facts.
6. Regulations.
7. Challenges.

Each rollout PR must:

- Identify the precise terms that need marking (ambiguous, vendor-specific,
  regulatory, grain/metric/contract-shaped) rather than blanket-marking
  prose.
- Mark on first or salient mention only, to keep prose readable.
- Add (or extend) a content-QA scan that fails on broken
  `terminology/.../#anchor` references inside that surface.

### Phase 10.5 - Reverse Coverage Matrix

- Generate a coverage matrix: every named term occurrence across tutorials,
  quizzes, flashcards, exams, facts, regulations, and challenges, mapped
  back to its terminology entry (or flagged as missing).
- Flag terminology entries that are never referenced; treat them as either
  drift or candidates for removal.
- Treat unresolved coverage entries as explicit Phase 9 gaps until closed.

### Phase 10.6 - Continuity Reconciliation

- Mark task 059 `merged` and record the squash commit `d88acc7` on `main`.
- Update `STATUS.md`, `DO_NEXT.md`, `BUGS.md`, and `WHAT_WE_DID.md` so PR
  #44 reads as merged and the Phase 10 sub-phases are the active scope.
- Delete the local `terminology-grounding-glossary` branch once the
  follow-through tasks are scheduled and recorded.

Phase 10 does not graduate Phase 6 or Phase 9. The Phase 9 completeness
gate still requires the competency, content, gap, and source matrices,
human review, automated coverage, and a recorded formal review.

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
