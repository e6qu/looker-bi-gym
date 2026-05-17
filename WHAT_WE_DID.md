# What We Did

## 2026-05-17 - Task 062 Codex CLI re-review remediation (second pass)

The first remediation pass (commits `cff8f96` and `bb7a5f5`) was
re-reviewed by `codex exec` on 2026-05-17 (`/tmp/codex-review-2.md`).
The re-review confirmed the original 10-item punch list is mostly
closed and surfaced 5 new items (recorded as
`CODEX-RE-REVIEW-FINDINGS-2026-05-17` in `BUGS.md`). All 5 closed in
this commit.

Compartmentalization (sub-issue 1)

- `tutorials/learner-tasks/README.md` rewritten as an alphabetical-
  by-area topic index. No LT-\* prefixes in visible link text, no
  ordering claim, no "browser-first sequence" framing. The labs are
  now described as standalone exercises in their own right.
- The `tutorialAllowlist` in
  `app/scripts/validate-assessment-compartmentalization.ts:28` is
  now empty, so the validator actively covers the README rather
  than skipping it. `validate:compartmentalization` reports
  130 files scanned and 0 hits.

Exam-pack fixture backing (sub-issue 2)

- `exam-card-ratio-null-contract`: inline 5-row ratio components
  table with NULL and zero edge cases; expected outputs include
  per-period ratios, the aggregate sum-of-components ratio, and
  the antipattern (average of per-period ratios).
- `exam-card-dashboard-refresh-ops`: inline 8-row
  `INFORMATION_SCHEMA.JOBS` sample for one hour; expected outputs
  include extrapolated daily job and byte counts at both the
  current 5-minute and a proposed 30-minute freshness threshold,
  plus the explicit cache-staleness-not-auto-refresh modelling
  claim.
- `exam-card-rls-cls-design`: explicit named base-table schema
  with branches B01 / B02 / B03 and named manager groups; expected
  outputs are concrete policy-tag column lists, three named
  `FILTER USING` predicates, three named GRANT TO groups, the
  authorized-view exposed-column list, and the dashboard
  credential mode.
- `exam-card-scd2-historical-reporting`: explicit dim_branch and
  fct_account_daily_balances rows (one branch is renamed mid-year);
  expected outputs are the historical chart labels per month under
  SCD type 2, plus the named antipatterns (SCD type 1 overwrite
  data loss, natural-key-only join).
- `exam-card-bcbs-239-lineage-walkthrough`: explicit named source /
  staging / mart tables and owner role; expected outputs are the
  per-currency control totals (RON = 396000, EUR = 55000 at
  2026-03-31) that read directly from the committed lending dataset.

Exam-card rendering CSS

- `ExamCardView` now renders `objective` in a
  `<pre className="examCardObjective">` block. New CSS rules
  (`.examCardObjective` and `.examCard ul li`) apply
  `white-space: pre-wrap`, `overflow-wrap: anywhere`, and
  `overflow-x: auto` so the wider inline tables and long
  identifiers no longer cause horizontal overflow on the mobile
  exam route.

Source-card depth (sub-issue 3)

- `SRC-BIGQUERY-MATERIALIZED-VIEW-REFRESH` expanded with quotes for
  `enable_refresh`, `refresh_interval_minutes`, `max_staleness`,
  and the explicit best-effort framing; URL updated to the
  materialized-views-manage page with the create page as
  companion.
- `SRC-LOOKER-STUDIO-FRESHNESS-INTERVALS` expanded with the
  cache-staleness-threshold definition, the query-frequency-and-
  cost link, and the connector-specific minimum freshness;
  URL updated to the manage-data-freshness page.

PSD2 fact wording (sub-issue 4)

- `FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION` rephrased so it
  matches what `SRC-PSD2-ELI-2015-2366` actually quotes (Articles
  4(30), 95, 96, 97): SCA application, framework with mitigation
  measures and control mechanisms, evidence of those measures, and
  incident reporting. The earlier event-level retention claim was
  removed.

Continuity docs (sub-issue 5)

- `DO_NEXT.md` rewritten to point at PR #46 on
  `assessment-quality-and-expansion`, with the Codex review loop
  recorded as a recurring discipline. Stale 74-quiz / 82-flashcard /
  9-exam-card tallies replaced with the final post-fix numbers.

Verification

- `bun run check` green: format, content QA, validators, lint,
  typecheck, datasets, all unit suites, Playwright rendered UI
  suite (101 passed), vite build, static-link sweep.
- Codex re-review queued for after the commit + push.

## 2026-05-17 - Task 062 Codex CLI second-opinion remediation (full sweep)

Codex CLI was invoked for a fresh read-only review of PR #46 on
2026-05-17. The review produced a 10-item punch list (`/tmp/codex-review.md`,
recorded in `BUGS.md` as `CODEX-REVIEW-FINDINGS-2026-05-17`). All 10
items plus the low-severity "stale tallies" item are closed in this PR.

Compartmentalization scope

- Extended `validate:compartmentalization` to also scan `tutorials/`
  and `tutorials/learner-tasks/` (130 files, 0 hits).
- Stripped `LT-XYZ-NNN` prefix from learner-task H1 lines and the
  `title` frontmatter field; the canonical ID lives only in
  frontmatter `id` and in `recommended_learner_tasks` cross-references.
- Fixed tutorial-N cross-references in tutorials 03/04/05/06/08 and
  the recipe `r-looker-001`; reworded `tutorials/data-sources.md`
  "This project ..." to "These exercises ...".
- Rewrote `tutorials/quiz-bank.md` as a generic banking BI
  self-assessment lens (no enumeration of specific quiz questions).
- Rewrote `tutorials/exam-mode.md` as a generic banking BI practical
  review lens (no enumeration of specific exam cards).

Product-mechanics fixes

- Looker Studio data freshness rewritten as a cache-staleness
  threshold across the affected quiz question, exam card, fact, and
  flashcard. Report auto-refresh is documented as a separate setting.
- BigQuery materialized view refresh softened to a best-effort target
  (`max_staleness` / `refresh_interval_minutes`), not a hard SLA, in
  the same surfaces.
- Row-access-policy distractor replaced the invented pseudo-SQL
  `SESSION_USER_BRANCH(...)` with the real BigQuery shape:
  `CREATE ROW ACCESS POLICY ... GRANT TO ('group:branch-NN-managers@...')
FILTER USING (branch_id = 'BNN')`.
- AML / KYC "special category" language tightened to reserve GDPR
  Article 9 framing for narratives that actually reveal Article 9
  data; the broader confidentiality / minimisation framing carries
  the AML / CFT context.

Source-card depth

- Expanded `SRC-PSD2-ELI-2015-2366` with article-specific quotes
  (4(30), 95, 96, 97), `SRC-CRR-ELI-2013-575` with 92(1)(a),
  92(2)(a), 92(3), and 26, `SRC-IFRS9-STANDARD` with sections 5.5 /
  5.5.3 / 5.5.5 / 5.5.13, `SRC-BCBS-239-PRINCIPLES` with sections
  II-V and the 14 named principles.

Validator + coverage refit

- `coverage:cert-track` now parses frontmatter, iterates authored
  items (quiz questions, flashcard files, exam cards, terminology
  entries), and counts the number of unique items per topic. The
  prior whole-file regex approach inflated counts via frontmatter,
  source_facts lists, and identifier echoes.
- `validate:quiz-distractors` extended with an invented-SQL-identifier
  rule set and a semantic-anti-pattern rule set; the scope and
  limits of the validator are now documented in a leading comment
  block.

Fixture-backed exam cards

- `exam-card-ifrs9-stage-transition` rewritten. The lending dataset
  (`datasets/lending-month-end/v0.1.0/loan_monthly_snapshots.csv`)
  was changed at one cell: L2002 on 2026-02-28 moves from stage 2 /
  DPD 35 to stage 1 / DPD 12, so the loan now records a real
  stage 1 -> stage 2 transition between the two committed
  month-ends. The change does not affect any committed control
  total or known-trap check (`validate:datasets` and `test:fixtures`
  pass). The exam card now produces deterministic transition counts
  and outstanding-principal totals.
- `exam-card-aml-alert-dashboard-governance` rewritten with an
  inline synthetic AML alert table (eight rows; pseudonymous customer
  and account hashes). Expected outputs are deterministic counts by
  type, ageing bucket, status, and KYC-review flag, plus the named
  field-exclusion list for the aggregate page and the named
  access-mechanic (authorized view + IAM grant) for the investigation
  page.

Stale tallies

- `STATUS.md`, `_development/assessment-audit.md`, and
  `_development/tasks/062-assessment-quality-and-expansion.md` all
  refreshed to the post-fix counts (78 quiz / 105 flashcards /
  16 exam cards / 133 facts / 150 terminology entries).

Verification

- `bun run check` green (format, content QA, validators, lint,
  typecheck, datasets, all unit suites, Playwright rendered UI
  suite, vite build, static-link sweep).
- Codex re-review queued for after the commit + push.

## 2026-05-16 - Task 062 Phase 12 follow-through + compartmentalization

User direction added on the open PR #46: surfaces must not assume each
other exist; terminology is the only shared spine; the platform itself
must not be a topic; test data must not be in questions; no
`looker-bi-gym` self-reference. Phase 12 of `PLAN.md` was also folded
into the same PR.

- Compartmentalization sweep:
  - Replaced tutorial `Builds on:` sections (which named other
    tutorials by file) with `Prior knowledge expected:` sections
    naming concepts the learner should already understand.
  - Renamed learner-task `## Prerequisites` to `## Setup` and dropped
    `Complete LT-XXX` cross-task references, replacing them with
    concept-level assumptions.
  - Rewrote the capstone (tutorial 09) cross-tutorial "values from
    notes/0X.md" placeholder into a self-contained derivation directly
    from the dataset.
  - Deleted `tutorials/curriculum.md` (pure platform-meta), rewrote
    `tutorials/README.md` as a topic index, rewrote
    `tutorials/quiz-bank.md` as a short pointer to the interactive
    quiz surface with coverage notes.
  - Replaced `this course context` phrasing in tutorial 00 and the
    orientation-quiz prompt with the harmonised EU deposit-guarantee
    wording.
  - Fixed tutorial-number references in two flashcards and the BigQuery
    Cost Triage exam card.

- Authoring scripts (Phase 12.5):
  - Added `app/scripts/validate-quiz-distractor-quality.ts` and wired
    it into `bun run check`. Scans every quiz option label for known
    weak-distractor patterns ("chart color", "font size", "decorative
    theme", "viewer history", etc.). Caught 4 regressions on the
    initial PR commit; current state is 78 questions / 268 options
    scanned with 0 weak hits.
  - Added `app/scripts/validate-assessment-compartmentalization.ts`
    and wired it into `bun run check`. Scans quiz / flashcard / exam
    visible bodies for cross-surface references (`tutorial N`,
    `LT-X-NNN`), platform self-references (`looker-bi-gym`, "this
    course"), and "see other surface" phrases. Current state: 107
    files scanned, 0 hits.
  - Added `app/scripts/generate-cert-track-coverage.ts` exposed as
    `bun run coverage:cert-track`. Writes
    `_development/cert-track-coverage.md` mapping 40 named cert-track
    topics across quiz / flashcards / exam / terminology hit counts
    and listing under-served topics per area.

- Quiz expansion (60 -> 78):
  - 14 hard questions added in the first commit covering CLS, RLS,
    clustering, MV refresh, results cache, blend join types, freshness
    intervals, SCD, conformed dim, surrogate key, CRR, IFRS 9, BCBS
    239, COUNT(\*) vs COUNT(column).
  - 5 medium questions added in the follow-on commit: weighted average
    vs avg-of-avgs ratio, SUM(COUNT(DISTINCT)) additive trap, PSD2 SCA
    evidence, AML / CFT alert page governance, COREP / FINREP framework
    versioning.

- Flashcard expansion (64 -> 95):
  - 18 cards across privacy-security, banking-context, bi-fundamentals,
    controls-governance bringing each formerly-4-card deck to 10.
  - 7 more cards: PSD2 SCA, AML alert dashboard, COREP / FINREP
    versioning, BigQuery results cache, clustering impact, conformed
    dimension, account_owners fanout.

- Exam expansion (5 + 6 divergent surfaces, 9 reconciled, then 17):
  - First wave reconciled YAML pack with the 4 Phase 11.5 MD cards
    into a unified 9-card pack.
  - Second wave added 8 cards covering RLS / CLS design walkthrough,
    SCD-2 historical reporting, MV refresh interval review, COREP /
    FINREP CET1 alignment, IFRS 9 stage-transition reporting, BCBS 239
    lineage walkthrough, AML alert dashboard governance, and the
    existing Cost Triage / DORA cards.

- Fact corpus expansion (117 -> 133 entries):
  - 14 new FACT entries on BigQuery (clustering, results cache,
    COUNT-star vs column, RLS, CLS, MV refresh), Looker Studio (blend
    join types, freshness intervals), BI modeling (SCD, conformed,
    surrogate), CRR CET1, IFRS 9, BCBS 239.
  - 2 more FACT entries: PSD2 SCA, AML / CFT suspicious activity.
  - 13 new SRC source cards including the EU CRR, IFRS 9 standard,
    BCBS 239, PSD2 (EUR-Lex 2015/2366), EBA AML package, BigQuery
    clustered tables, results cache, aggregate COUNT, row-level
    security, column-level security, MV refresh, Looker Studio blend
    join types and freshness intervals, Kimball SCD / conformed /
    surrogate.

- Terminology depth (Phase 12.4):
  - Replaced 7 Looker Studio landing-page citations with deep links to
    known-stable help articles (dimensions and metrics, blended data,
    calculated fields, data credentials, data freshness). 16 entries
    still cite the landing page; tracked as Phase 12 follow-on.

- Continuity:
  - Extended `PLAN.md` Phase 12.5 entry to describe the three landed
    scripts and the compartmentalization rule.
  - Updated STATUS, WHAT_WE_DID with full tallies.

Verification: bun run format:check, lint, typecheck, content:generate,
content:check, test:content-qa, test:flashcards, test:quiz,
test:quiz-facts-db, test:facts-db, validate:terminology,
validate:quiz-distractors (78 / 268, 0 hits),
validate:compartmentalization (107 files, 0 hits), and test:e2e all
pass.

## 2026-05-16 - Task 062 Assessment Quality And Expansion

Branch `assessment-quality-and-expansion` opened after PR #45 merged.

- Wrote `_development/assessment-audit.md` covering all four assessment
  surfaces (quizzes, flashcards, exams, terminology depth) against a
  cert-track learner lens. Found 5 `high`, 8 `medium`, 1 `low` defects.

- Quality fixes (commit `6c2116f`):
  - Sharpened ~20 weak quiz distractors that a cert-track learner could
    eliminate without knowing the material ("chart color", "font size",
    "decorative theme", "viewer history", "report title", etc.).
  - Reconciled two divergent exam surfaces: moved the 4 cards that
    lived only in `tutorials/exam-mode.md` into the canonical
    `exams/bi-foundations/bi-foundations-exam.md`; trimmed the Markdown
    doc to a study guide pointing at the interactive `/exam` route.

- Fact corpus expansion (commit `9584396`):
  - Added 14 new `FACT-*` entries: BigQuery clustering, results cache,
    count-star vs count-column, row access policy, column policy tag,
    materialized view refresh; Looker Studio blend join types and
    freshness intervals; BI SCD types, conformed dimension, surrogate
    key; banking CRR CET1 ratio, IFRS 9 stages, BCBS 239 RDARR
    principles.
  - Added matching `SRC-*` source cards in
    `sources/literature/kimball-dimensional-modeling.md`,
    `sources/platforms/bigquery.md`, `sources/platforms/looker-studio.md`,
    `sources/law/eu-crr.md`, `sources/law/ifrs9.md`, and
    `sources/regulators/bcbs-239.md`.

- Quiz expansion (commit `9584396`):
  - Added 14 new hard quiz questions on the cert-track gap topics
    above. Quiz bank: 60 -> 74 questions.

- Flashcard expansion (commit pending):
  - 18 new cards across four under-served decks: privacy-security,
    banking-context, bi-fundamentals, controls-governance. Each deck
    went from 4 to 10 cards. Total flashcards: 64 -> 82.

- Continuity (commit pending):
  - Added Phase 12 to `PLAN.md` staging the remaining work toward the
    Phase 9 minima (500 / 200 / 30).
  - Added `_development/tasks/062-assessment-quality-and-expansion.md`
    and updated the task index.

## 2026-05-16 - Phase 11.2 CC-4 follow-up: real failure scenarios in 06-08

After the user pointed out that the Phase 11.2 commit had only relabelled
the tautological VALUES blocks in tutorials 06-08, those three sections
were rewritten to drive off real DuckDB queries against the committed
synthetic data rather than VALUES theatre:

- 06 cost-budget exercise: rows scanned and estimated bytes are now
  `COUNT(*)` against the loaded tables. The over-budget signal comes
  from a real `account_daily_balances INNER JOIN account_owners` fanout
  (27 rows × 9 cols × 16 = 3888 bytes vs a 2000 byte budget).
- 07 minimisation check: now runs `DESCRIBE` against the learner's real
  query projection. Failure detection is driven by which sensitive
  columns the learner actually selects (`leaky_candidate` exposes
  account_id + customer_id + synthetic_iban → 3 sensitive columns;
  `governed_candidate` exposes 0).
- 08 reconciliation break: now compares the real source total
  (`SELECT SUM(ledger_balance) WHERE business_date = '2026-03-31'`) to
  two real broken queries (missing date filter → 286570, owner-join
  fanout → 164800). Deltas are computed from data, not hand-written
  VALUES.

`app/scripts/test-sql.ts` was extended to verify all three exercises
run in DuckDB-WASM with the expected outputs.

## 2026-05-16 - Task 061 Tutorial Audit Remediation

Folded into PR #45 by user direction so it lands together with the Phase
10 follow-through.

- Phase 11.1: rewrote `tutorials/curriculum.md` to describe what the
  tutorials actually build (no aspirational mart/serve/AML/payments/ops
  schemas). Wrapped every End Challenge expected-answer block in tutorials
  00-09 inside `<details><summary>Reveal expected answer</summary>…` so
  learners now attempt the challenge before the answer appears. Replaced
  DuckDB-only `CAST(... AS VARCHAR)` with `CAST(... AS STRING)`. Fixed
  tutorial 03 freshness label so the inner separator no longer collides
  with the `;` outer separator.
- Phase 11.2: added failure scenarios to tutorials 06 (cost-budget
  overrun), 07 (minimisation failure when a sensitive field flips to
  keep), 08 (reconciliation break plus a DORA ICT third-party register
  exercise), and 09 (capstone scoring now depends on values the learner
  fills from prior-tutorial notes, with a `hold_for_remediation` state
  when a prior tutorial was skipped).
- Phase 11.3: added Aggregation Notes (data-source vs chart aggregation
  and the `COUNT(DISTINCT)` non-additivity trap) to tutorials 03 and 04;
  clarified the Looker Studio reusable calculated-field guidance in 04;
  added a BigQuery Cost Mechanics section to 06; added a BigQuery Access
  Mechanics section (authorized views, RLS, CLS) and a Looker Studio
  Credential Modes section to 07.
- Phase 11.4: added a numeric depositor-bank worked example (EUR 60k +
  EUR 60k vs EUR 100k ceiling) to tutorial 00; added the
  ownership-share normalization assumption note to tutorial 05.
- Phase 11.5: separated the practice and tutorial paths in
  `tutorials/README.md`; expanded `tutorials/exam-mode.md` from 2 to 6
  cards; added the missing interactive exam-surface link.
- Phase 11.6: added an expected row-grain inventory to LT-BI-001; added a
  Dataset Orientation section and an Expected Serving Result table to
  LT-SQL-003; dropped "format-verified local evidence pattern" jargon
  from LT-LOOKER-004; explained the BigQuery UI Query parameters dialog
  in LT-LOOKER-007; added an Account Requirement banner and a Describe
  Without An Account fallback path to the deposits dashboard recipe.
- Verification: `bun run validate:terminology` passes (8 files / 158
  headings / 300 termRef references / 75 sourced entries / 30 FACT-\*
  links / 27 inline curriculum termRefs). `bun run format:check`,
  `content:generate`, `content:check`, `typecheck`, `lint`,
  `test:content-qa` all pass. `bun run test:e2e` reports 102 / 102
  Playwright tests passing.

## 2026-05-16 - Task 060 Terminology Grounding Follow-Through

- Audited the merged PR #44 terminology work for incomplete, shallow, or
  wrong parts and added Phase 10 to `PLAN.md` to stage the follow-through
  across sub-phases (integrity, sourcing/fact linkage, search depth,
  curriculum grounding rollout, reverse coverage, continuity).
- Synced local `main` with `origin/main` at `d88acc7`, deleted the stale
  local `terminology-grounding-glossary` branch, and started Phase 10 on
  a fresh `terminology-integrity-checks` branch.
- Opened PR #45 with Phase 10.1, then continued Phase 10.2 through 10.6 on
  the same branch by user direction.
- Phase 10.1 - Added `app/scripts/validate-terminology.ts`. The validator
  fails on duplicate heading slugs inside a terminology file, broken
  `class="termRef"` anchors, unknown target files, missing `#anchor`, and
  missing or mismatched `<sup>HINT</sup>` domain hints. Wired into
  `bun run check` and exposed as `bun run validate:terminology` at the
  root workspace. Removed 148 decorative leading `<span class="termBadge">`
  blocks from the seven terminology domain files; the `.termBadge` CSS
  stays available for future inline reference use. Rewrote
  `terminology/README.md` marker key so authors use the HTML anchor form
  only.
- Phase 10.2 - Extended the validator to parse `Sources:` blocks under each
  entry, require an `https?://` citation on every entry in `bigquery.md`,
  `looker-studio.md`, `duckdb.md`, and `regulations.md`, and confirm
  referenced `FACT-*` IDs resolve against `facts/`. Backfilled 75 entries
  with citations to official vendor documentation, regulator pages, or
  EUR-Lex CELEX references, linking 30 entries to existing `FACT-*` IDs.
- Phase 10.3 - Term-level search. Terminology sidebar now surfaces matching
  `## term` headings (not only pages). Fixed hash routing so
  `#/terminology/<file>#<anchor>` keeps the inner fragment available, and
  added scroll-on-mount and `hashchange` behaviour in `MarkdownArticle` so
  deep links land on the target heading. Added rendered UI coverage for
  the term result list, deep-linked anchors, and vendor citations.
- Phase 10.4 - Inline grounding rollout. Extended the validator to scan
  `tutorials/`, `quizzes/`, `flashcards/`, `exams/`, `facts/`,
  `regulations/`, and `challenges/` so any inline `class="termRef"` link
  added to curriculum prose is held to the same anchor-resolution rules.
  Added 27 inline references to a representative slice of tutorials and
  regulations. Documented as out of scope: renderer changes needed to let
  quiz/flashcard/exam/fact/challenge surfaces honour inline HTML.
- Phase 10.5 - Added `app/scripts/generate-terminology-coverage.ts`
  exposed as `bun run coverage:terminology`. Output is
  `_development/terminology-coverage.md`. Initial snapshot: 148 entries,
  93 prose-mentioned, 21 inline-grounded, 53 entirely uncovered.
- Phase 10.6 - Marked task 059 merged in `_development/tasks/059-…`,
  added `_development/tasks/060-terminology-integrity-checks.md`, updated
  the task index, `STATUS.md`, `DO_NEXT.md`, and `BUGS.md`.

## 2026-05-12 - Task 059 Terminology Grounding Glossary

- PR #44 squash-merged to `main` as `d88acc7` on 2026-05-12 18:10 UTC, with
  CI passing on the PR before merge
  (`https://github.com/e6qu/looker-bi-gym/actions/runs/25744753981/job/75604946709`).
  Phase 10 of `PLAN.md` tracks the inline grounding, integrity, sourcing,
  search, and coverage follow-through that this task did not deliver.
- Created branch `terminology-grounding-glossary` from verified `main` at
  `81d4c3d`.
- Added `_development/tasks/059-terminology-grounding-glossary.md` and updated
  the implementation task index.
- Opened PR #44:
  `https://github.com/e6qu/looker-bi-gym/pull/44`.
- Added rendered `terminology/` Markdown pages for BI, SQL, BigQuery, Looker
  Studio, banking, regulations, and DuckDB/browser-runtime vocabulary.
- Removed schema-only terminology and app-specific training table or column
  entries after review.
- Reworked term entries to use compact domain badges, examples, and related
  cross-links instead of verbose labels such as "BigQuery platform term."
- Added terminology catalog support, the app route, sidebar search, heading
  anchors, `.termRef` links, and `.termBadge` styling.
- Added rendered UI and deployed-surface expectations for the terminology route.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for schema-only, self-referential, and app-specific terminology
    wording;
  - `bun run test:e2e` after approved local Vite preview binding, with all 100
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 100
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - sandboxed `bun run test:e2e` and `bun run check` failed because Vite preview
    could not bind `127.0.0.1:4173` (`EPERM`); reruns with approved local
    binding passed.

## 2026-05-11 - Task 058 Quiz Standalone Question Polish

- Verified PR #42 post-merge state:
  - PR #42 was squash-merged at `1509ed8`.
  - Main CI passed for `1509ed8`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25668973306`.
  - GitHub Pages workflow passed for `1509ed8`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25668973301`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 12:06:45 GMT`.
  - `bun run verify:deployed-surface` passed against the live site.
  - `gh pr list --state open --limit 10` returned no open PRs.
- Created branch `quiz-standalone-question-polish` from verified `main`.
- Added `_development/tasks/058-quiz-standalone-question-polish.md` and updated
  the implementation task index.
- Opened PR #43:
  `https://github.com/e6qu/looker-bi-gym/pull/43`.
- Rewrote the first quiz prompt from worksheet wording:
  `You are asked to build a scorecard... Before writing SUM(...)`
  into a concrete branch-dashboard scenario about account-day balance grain.
- Added content QA guardrails to reject course-scaffolded assessment wording
  such as `you are asked to`, `before writing`, and `which source grain must be
stated`.
- Updated rendered UI and deployed-surface verifier expectations for the new
  prompt.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for course-scaffolded quiz wording in quiz-facing surfaces;
  - `bun run test:e2e` after approved local Vite preview binding, with all 93
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
- PR #43 was squash-merged at `81d4c3d`.
- Post-merge verification passed:
  - Main CI passed for `81d4c3d`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25680564739`.
  - GitHub Pages workflow passed for `81d4c3d`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25680562973`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 15:45:25 GMT`.
  - `bun run verify:deployed-surface` passed against the live site.

## 2026-05-11 - Task 057 Quiz Question Quality Expansion

- Verified PR #41 post-merge state:
  - PR #41 was squash-merged at
    `ff2071a12fa6124d713c31abcc993c4c54abe6c7`.
  - Main CI passed for `ff2071a`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25665798004`.
  - GitHub Pages workflow passed for `ff2071a`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25665797989`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 10:56:00 GMT`.
  - `bun run verify:deployed-surface` passed against the live site.
  - `gh pr list --state open --limit 10` returned no open PRs.
- Created branch `quiz-question-quality-expansion` from verified `main`.
- Added `_development/tasks/057-quiz-question-quality-expansion.md` and
  updated the implementation task index.
- Opened PR #42:
  `https://github.com/e6qu/looker-bi-gym/pull/42`.
- Reworked the main quiz bank into 60 standalone scenario questions: 20 easy,
  20 medium, and 20 hard.
- Expanded coverage across BI grain, fanout, semi-additive balances, NULL and
  ratio contracts, BigQuery windows, partition filters, views, parameters,
  dry-run cost estimates, Looker Studio sources, controls, blends, credentials,
  freshness, GDPR minimisation, DORA/EBA operational context, and Romanian/EU
  deposit-guarantee modelling.
- Kept factuality in hidden `source_facts` metadata and kept learner-facing quiz
  prompts free of raw fact IDs, task IDs, and implementation references.
- Updated the quiz guide to describe the 60-question coverage without exposing
  hidden metadata or copying question text.
- Raised content QA guardrails to require at least 60 quiz questions and 20 per
  difficulty.
- Updated rendered/deployed verifier expectations for the new first question.
- Fixed quiz mobile overflow from longer assessment text by allowing quiz
  question and answer text to wrap safely.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scans for learner-facing implementation/source metadata wording in
    quiz and quiz-guide surfaces;
  - `bun run test:e2e` after approved local Vite preview binding, with all 93
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run test:e2e` failed because Vite preview could not
    bind `127.0.0.1:4173` (`EPERM`); rerunning with approved local binding
    exposed branch regressions, then passed after fixes.
  - the first expanded quiz pass failed content QA because `tutorials/quiz-bank.md`
    said `quiz guide` instead of the accepted `quiz` objective pattern.
  - the first quiz fact database pass rejected a numeric answer of `100000`
    because the cited fact text uses `100,000`; the item is now multiple choice
    with `EUR 100,000` visible in the option text.
  - initial mobile e2e failed due to quiz route horizontal overflow from longer
    standalone prompt/option text; CSS wrapping fixed it.

## 2026-05-11 - Task 056 Remove Tutorial Evidence Basis Headings

- Confirmed no open PRs before starting Task 056.
- Created branch `remove-tutorial-evidence-basis` from verified `main`.
- Added `_development/tasks/056-remove-tutorial-evidence-basis.md` and updated
  the task index.
- Opened PR #41:
  `https://github.com/e6qu/looker-bi-gym/pull/41`.
- Removed visible `## Evidence Basis` sections from released tutorials,
  practice labs, and the Looker Studio recipe.
- Updated content QA so tutorials no longer require that heading.
- Kept `source_facts` metadata requirements and fact-ID validation intact.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for `Evidence Basis` in tutorials and content QA;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - one parallel `bun run content:check` raced content generation and reported
    a stale generated catalog; rerunning serially passed.
  - formatting was required after the mechanical heading removal; Prettier
    normalized the edited Markdown files.
  - the first `bun run check` attempt stopped at `DO_NEXT.md` formatting;
    Prettier normalized the continuity file before rerunning.

## 2026-05-11 - Task 055 Looker And BigQuery Corpus Expansion

- Verified PR #39 post-merge state:
  - PR #39 was squash-merged at
    `241e4499dbe1aed43d30d4ec81fc65d7940a894e`.
  - Main CI passed for `241e449`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25661265061`.
  - GitHub Pages workflow passed for `241e449`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25661265090`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 09:17:22 GMT`.
  - `gh pr list --state open --limit 10` returned no open PRs.
- Created branch `looker-bigquery-corpus-expansion` from verified `main`.
- Added `_development/tasks/055-looker-bigquery-corpus-expansion.md` and
  updated the task index.
- Opened PR #40:
  `https://github.com/e6qu/looker-bi-gym/pull/40`.
- Added official source cards and facts for:
  - BigQuery parameterized queries;
  - BigQuery query validator and dry-run byte estimates;
  - Looker Studio controls, field IDs, and parameter input.
- Added `LT-LOOKER-007 - Design A Control Parameter Handoff`, which validates a
  `2026-03-31` RON control result of `79300` in the browser workbench and
  records the applied BigQuery named-parameter pattern.
- Added five flashcards, three quiz questions, and one exam card for dashboard
  controls, BigQuery parameters, and pre-run cost checks.
- Updated tutorial indexes and rendered UI route coverage for the new lab.
- Updated `bun run verify:deployed-surface` to assert that quiz and exam
  source/task metadata stays hidden after PR #39.
- Removed older visible `CTF` phrasing from learner-task summaries.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:platform-boundary`;
  - stale scans for learner-facing implementation wording, raw metadata
    headings, challenge-route dependencies in learner tasks, and `CTF` wording;
  - `git diff --check`;
  - `bun run verify:deployed-surface`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 93
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - The first post-merge `bun run verify:deployed-surface` attempt failed
    before Task 055 because the script still expected a raw source fact ID on
    the quiz page. The script is now updated and passed against the live site.

## 2026-05-11 - Task 054 Curriculum Self-Reference Remediation

- Tried the requested Claude CLI second opinion:
  - `claude -s --print --permission-mode plan --output-format text ...` failed
    immediately with `unknown option '-s'`.
  - `claude --print --permission-mode plan --output-format text ...` ran in
    non-TUI mode but returned `Not logged in · Please run /login`.
- Added `_development/tasks/054-curriculum-self-reference-remediation.md` and
  updated the task index.
- Opened PR #39:
  `https://github.com/e6qu/looker-bi-gym/pull/39`.
- Reworked the tutorial index and practice-lab index into one browser-first
  path, including the ratio-null lab.
- Replaced visible tutorial `Source Facts` headings with `Evidence Basis` and
  removed remaining `this website/page/task page`, `CTF-style`, and
  challenge-framed learner wording from tutorial surfaces.
- Reworked the quiz-bank tutorial page so it is a scenario self-check with
  answers hidden in expandable sections and no visible recommended-task links.
- Reworked exam-mode prose so exam cards stand on their own with inputs and
  expected outputs instead of recommended-task links.
- Updated the rendered quiz and exam UI so source/task grounding metadata stays
  available for validation but is not shown as prompt scaffolding.
- Reworded the remaining fanout flashcard challenge phrasing and deck source
  review note.
- Updated content QA and Playwright coverage for the new boundary.
- Verification passed:
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
- Failed/blocked attempts recorded:
  - first sandboxed `bun run test:e2e` failed because Vite preview could not
    bind `127.0.0.1:4173` (`EPERM`); rerunning with approved local binding
    passed.

## 2026-05-11 - Task 053 Tutorial Verification Separation Sweep

- Verified PR #38 post-merge state:
  - PR #38 was squash-merged at `ff283d7`.
  - Main CI passed for `ff283d7`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25658994647`.
  - GitHub Pages workflow passed for `ff283d7`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25658994653`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 08:29:59 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
  - Targeted live Playwright check confirmed tutorial 00 links to
    `#/challenges/orientation-quiz`, does not render that route in `code`, and
    no longer shows the old open-route step.
- Confirmed no open PRs before starting Task 053.
- Created branch `tutorial-verification-separation-sweep` from verified `main`.
- User clarified that tutorial content must not depend on quiz content and that
  quizzes are separate verification.
- User also asked not to open a new PR; Task 053 remains local.
- Converted workbench hash routes in tutorial pages to clickable Markdown links.
- Removed learner-facing challenge manifest, solution fixture, repository path,
  and challenge-internal references from learner-task pages.
- Removed meta wording about missing quizzes or hidden reference files.
- Added rendered UI regression coverage across tutorial routes for inline
  hash-route code and learner-facing implementation wording.
- Verification passed:
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
- Failed/blocked attempts recorded:
  - one parallel `bun run content:check` raced another command that regenerated
    ignored catalogs; rerunning serially passed.

## 2026-05-11 - Task 052 Orientation Tutorial Self-Contained Fix

- Verified PR #37 post-merge state:
  - PR #37 was squash-merged at `cf6d2bc`.
  - Main CI passed for `cf6d2bc`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25648126551`.
  - GitHub Pages workflow passed for `cf6d2bc`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25648126549`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 03:08:05 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 052.
- Created branch `orientation-tutorial-self-contained-fix` from verified
  `main`.
- Added `_development/tasks/052-orientation-tutorial-self-contained-fix.md` and
  updated the implementation task index.
- Rewrote `tutorials/00-orientation-and-stack.md` so the tutorial is
  self-contained and produces an orientation decision log instead of requiring
  the orientation quiz.
- Moved the orientation quiz into a `Separate Verification` section with a
  clickable Markdown link to `#/challenges/orientation-quiz`.
- Rewrote `challenges/manifests/orientation-quiz.yaml` questions as
  scenario-verification prompts so they do not duplicate the tutorial wording.
- Added a rendered UI regression test that checks the tutorial has a clickable
  orientation quiz link, does not render the route inside `code`, and does not
  use quiz completion as the tutorial deliverable.
- Updated `PLAN.md`, `AGENTS.md`, and
  `docs/17-curriculum-completeness-matrix.md` for tutorial/verification
  separation.
- Verification passed:
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
  - `bun run test:e2e` after approved local Vite preview binding, with all 66
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 66
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run test:e2e` failed because Vite preview could not
    bind `127.0.0.1:4173` (`EPERM`); rerunning with approved local binding
    passed.
  - one parallel `bun run content:check` raced `typecheck`/`lint`, which
    regenerate ignored catalogs; rerunning serially passed.

## 2026-05-11 - Task 051 Tutorial Spine Repair Batch 8

- Verified PR #36 post-merge state:
  - PR #36 was squash-merged at `afc23df`.
  - Main CI passed for `afc23df`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25647765967`.
  - GitHub Pages workflow passed for `afc23df`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25647765964`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 02:54:08 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 051.
- Created branch `tutorial-spine-repair-batch-8` from verified `main`.
- Added `_development/tasks/051-tutorial-spine-repair-batch-8.md` and updated
  the implementation task index.
- Rewrote `tutorials/09-technical-bi-capstone.md` as a browser-first capstone
  package lab:
  - artifact checklist;
  - governed serving source;
  - source controls and fanout proof;
  - metric contract register;
  - dashboard page specification;
  - governance and operations evidence summary;
  - rubric score and review workflow;
  - optional BigQuery and Looker Studio applied checks;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-09 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 09;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 65
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 65
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 30 seconds and was killed.

## 2026-05-11 - Task 050 Tutorial Spine Repair Batch 7

- Verified PR #35 post-merge state:
  - PR #35 was squash-merged at `bfbc615`.
  - Main CI passed for `bfbc615`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25647384499`.
  - GitHub Pages workflow passed for `bfbc615`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25647384526`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 02:39:45 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 050.
- Created branch `tutorial-spine-repair-batch-7` from verified `main`.
- Added `_development/tasks/050-tutorial-spine-repair-batch-7.md` and updated
  the implementation task index.
- Rewrote `tutorials/08-observability-and-operations.md` as a
  browser-first operations lab:
  - dependency register with owners and controls;
  - freshness SLA check;
  - simulated job-byte evidence;
  - reconciliation control;
  - operational event triage;
  - reference-date validation evidence;
  - optional BigQuery job metadata and Looker Studio freshness checks;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-08 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 08;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 65
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 65
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 30 seconds and was killed.

## 2026-05-11 - Task 049 Tutorial Spine Repair Batch 6

- Verified PR #34 post-merge state:
  - PR #34 was squash-merged at `2314c79`.
  - Main CI passed for `2314c79`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25646930511`.
  - GitHub Pages workflow passed for `2314c79`:
    `https://github.com/e6qu/looker-bi-gym/actions/runs/25646930519`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 02:22:53 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 049.
- Created branch `tutorial-spine-repair-batch-6` from verified `main`.
- Added `_development/tasks/049-tutorial-spine-repair-batch-6.md` and updated
  the implementation task index.
- Rewrote `tutorials/07-governance-security-and-sharing.md` as a
  browser-first governance, field minimisation, credential-mode, and
  sharing-register lab:
  - exact field classification and minimisation checks;
  - governed branch/currency source output with control total;
  - credential-mode comparison for Looker Studio sharing;
  - report sharing register rows;
  - optional BigQuery authorized-view and Looker Studio UI checks;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-07 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 07;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 65
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 65
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 30 seconds and was killed.

## 2026-05-11 - Task 048 Rendered Route Sweep Hash Stabilization

- PR #33 was squash-merged at `5636297`, but post-merge main CI failed:
  - main CI run `25646609440` failed in `bun run test:e2e`;
  - 13 rendered UI tests passed;
  - the mobile primary-route sweep timed out at 120s on
    `page.goto(..., waitUntil: "domcontentloaded")`.
- Created branch `rendered-route-sweep-hash-stabilization` from `main`.
- Added `_development/tasks/048-rendered-route-sweep-hash-stabilization.md` and
  updated the implementation task index.
- Updated `app/tests/rendered-ui.spec.ts` so the primary route sweep creates
  one Playwright test per route and viewport. This preserves coverage but gives
  each hash route a fresh page instead of serially navigating many hash routes
  in one test.
- Verification passed:
  - `bun run format:check`;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 65
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 65
    Playwright tests passing.
- PR #34 post-merge verification passed:
  - main CI run `25646930511`;
  - GitHub Pages workflow run `25646930519`;
  - live URL returned HTTP 200 with
    `last-modified: Mon, 11 May 2026 02:22:53 GMT`;
  - `bun run verify:deployed-surface`.

## 2026-05-11 - Task 047 Tutorial Spine Repair Batch 5

- Verified PR #32 post-merge state:
  - PR #32 was squash-merged at `5cf22e3`.
  - Main CI passed for `5cf22e3`.
  - GitHub Pages workflow passed for `5cf22e3`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 01:45:53 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 047.
- Created branch `tutorial-spine-repair-batch-5` from verified `main`.
- Added `_development/tasks/047-tutorial-spine-repair-batch-5.md` and updated
  the implementation task index.
- Rewrote `tutorials/06-performance-and-cost-lab.md` as a self-contained
  browser-first cost/performance lab:
  - source-table profiling;
  - safe serving-source profiling;
  - deterministic broad-versus-serving job-evidence simulation;
  - daily operations control design;
  - optional BigQuery and Looker Studio UI evidence checks;
  - recovery checks and an end challenge.
- After PR #33 CI failed in the broad rendered route sweep at the 180s timeout,
  split the sweep into one Playwright test per viewport so route coverage can
  run in parallel on CI instead of serially in one long test.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-06 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for tutorial 06 learner-facing repo/app/source-ID
    implementation wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 14
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 14
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - one parallel `bun run content:check` raced `bun run content:generate` and
    reported a stale generated catalog; rerunning after generation passed.
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 40 seconds and was killed.
  - first PR #33 CI run failed because the broad rendered route sweep timed out
    while all other rendered UI tests passed.

## 2026-05-11 - Task 046 Tutorial Spine Repair Batch 4

- Verified PR #31 post-merge state:
  - PR #31 was squash-merged at `da35572`.
  - Main CI passed for `da35572`.
  - GitHub Pages workflow passed for `da35572`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 01:28:10 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 046.
- Created branch `tutorial-spine-repair-batch-4` from verified `main`.
- Added `_development/tasks/046-tutorial-spine-repair-batch-4.md` and updated
  the implementation task index.
- Rewrote `tutorials/05-blending-vs-upstream-joins.md` as a self-contained
  browser-first blend/fanout lab:
  - exact correct account-grain total;
  - exact unsafe owner-join total, delta, and overstatement percentage;
  - safe branch/currency serving output;
  - normalized owner allocation output;
  - optional Looker Studio blend guardrails;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-05 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - `bun run test:facts-db`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:platform-boundary`;
  - stale scan for tutorial 05 learner-facing repo/app/source-ID
    implementation wording;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - initial `bun run content:check` reported a stale generated catalog after
    formatting changed tutorial content; rerunning after generation passed;
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 40 seconds and was killed.

## 2026-05-11 - Task 045 Rendered Route Sweep Stabilization

- PR #30 was squash-merged at `8f52a85`.
- Main CI passed for `8f52a85`.
- GitHub Pages deployment failed in the local gate on the repeated broad
  responsive route-sweep timeout. The failure occurred after 11 rendered UI
  tests passed; the route-sweep test exhausted the 60s test timeout while
  waiting for the next route shell.
- Created branch `rendered-route-sweep-stabilization` from main.
- Added `_development/tasks/045-rendered-route-sweep-stabilization.md` and
  updated the task index.
- Updated `app/tests/rendered-ui.spec.ts` so the broad primary-route sweep has
  a 180s timeout and waits for `domcontentloaded` on each route navigation.
- Verification passed:
  - `bun run test:e2e` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - `bun run format:check`;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- PR #31 post-merge verification passed:
  - main CI passed for `da35572`;
  - GitHub Pages deployment passed for `da35572`;
  - live URL returned HTTP 200 with
    `last-modified: Mon, 11 May 2026 01:28:10 GMT`;
  - `bun run verify:deployed-surface` passed.

## 2026-05-11 - Task 044 Tutorial Spine Repair Batch 3

- Verified PR #29 post-merge state:
  - PR #29 was squash-merged at `1b00a6b`.
  - Main CI passed for `1b00a6b`.
  - GitHub Pages workflow initially failed once in the local gate on a
    Playwright timeout waiting for primary navigation in the responsive route
    sweep; rerunning the failed workflow passed.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 01:01:47 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 044.
- Created branch `tutorial-spine-repair-batch-3` from verified `main`.
- Added `_development/tasks/044-tutorial-spine-repair-batch-3.md` and updated
  the implementation task index.
- Rewrote `tutorials/04-metrics-and-calculated-fields.md` as a self-contained
  browser-first metric-contract lab:
  - exact latest branch/currency metric-source SQL and expected output;
  - contract-level weighted metric checks;
  - currency share and balance-band expected values;
  - reusable Looker Studio calculated-field formulas;
  - aggregation settings, chart expected values, recovery checks, and an end
    challenge.
- Updated `AGENTS.md` to explicitly ban learner-facing course/platform/meta
  questions and keep course text focused on BI, BigQuery, Looker Studio,
  synthetic banking data, and thin regulatory context.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-04 is marked
  first-pass implemented.
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
  - `bun run validate:static-links`;
  - stale scan for tutorial 04 learner-facing repo/app/source-ID
    implementation wording;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding, with all 12
    Playwright tests passing;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - initial parallel `bun run content:check` raced with `content:generate` and
    reported a stale generated catalog; rerunning after generation passed;
  - formal Claude CLI review in non-TUI `--print` mode produced no output for
    about 40 seconds and was killed;
  - sandboxed Codex CLI smoke test failed to initialize the in-process
    app-server client, but the approved non-sandboxed non-TUI run returned
    `codex-cli-ok`.

## 2026-05-11 - Task 043 Tutorial Spine Repair Batch 2

- Verified PR #28 post-merge state:
  - PR #28 was squash-merged at `599d64c`.
  - Main CI passed for `599d64c`.
  - GitHub Pages workflow initially failed once in the local gate on a
    Playwright timeout waiting for primary navigation in the responsive route
    sweep; rerunning the failed workflow passed.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 00:46:25 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Created branch `tutorial-spine-repair-batch-2` from verified `main`.
- Added `_development/tasks/043-tutorial-spine-repair-batch-2.md` and updated
  the implementation task index.
- Rewrote `tutorials/02-build-a-bi-friendly-model.md` as a self-contained
  browser-first model-building lab:
  - exact source-grain SQL and expected output;
  - model-join health check for missing branch mapping and raw IBAN fields;
  - safe latest-day branch/currency serving output with `UNMAPPED_BRANCH`;
  - latest control total check;
  - sensitive-field exclusions;
  - ownership fanout warning;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-02 is marked
  first-pass implemented.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 02;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - formal Claude CLI review in non-TUI `--print` mode returned
    `Not logged in · Please run /login`.

## 2026-05-11 - Task 042 Tutorial Spine Repair Batch 1

- Verified PR #27 post-merge state:
  - PR #27 was squash-merged at `040969c`.
  - Main CI passed for `040969c`.
  - GitHub Pages workflow passed for `040969c`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Mon, 11 May 2026 00:29:32 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 042.
- Created branch `tutorial-spine-repair-batch-1` from verified `main`.
- Added `_development/tasks/042-tutorial-spine-repair-batch-1.md` and updated
  the implementation task index.
- Rewrote `tutorials/03-first-executive-dashboard.md` as a self-contained
  browser-first dashboard-spec tutorial:
  - exact dashboard source SQL;
  - expected six-row source output;
  - KPI, trend, and latest currency-breakdown checks;
  - freshness label;
  - exposed/excluded field lists;
  - optional BigQuery and Looker Studio browser-UI paths;
  - recovery checks and an end challenge.
- Updated `docs/17-curriculum-completeness-matrix.md` so T041-TUT-03 is marked
  first-pass implemented, with optional UI verification still open.
- Verification passed so far:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for learner-facing repo/app/source-ID implementation wording in
    tutorial 03;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - formal Claude CLI review in non-TUI `--print` mode returned
    `Not logged in · Please run /login`.

## 2026-05-11 - Task 041 Curriculum Completeness Audit Start

- Verified PR #26 post-merge state:
  - PR #26 was squash-merged at `666b964`.
  - Main CI passed for `666b964`.
  - GitHub Pages workflow passed for `666b964`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Sun, 10 May 2026 23:04:52 GMT`.
  - `bun run verify:deployed-surface` passed against the live Pages URL.
- Confirmed no open PRs before starting Task 041.
- Created branch `curriculum-completeness-audit` from verified `main`.
- Added `docs/17-curriculum-completeness-matrix.md` with first-pass inventory,
  competency, tutorial, assessment, source-verification, and rewrite-gate
  matrices.
- Updated `docs/README.md` and
  `_development/tasks/041-curriculum-completeness-audit.md`.
- Inventory confirms the curriculum is not complete: 10 top-level tutorials, 6
  self-contained learner tasks, 6 released challenges, 59 flashcards, 14 quiz
  questions, 4 exam cards, and 185 unique fact IDs.
- Added rewrite tickets to `docs/17-curriculum-completeness-matrix.md` for the
  top-level tutorial spine.
- Rewrote `tutorials/01-connect-public-data.md` as the first concrete repair:
  browser-first SQL path, exact expected outputs, optional BigQuery setup SQL,
  optional Looker Studio checks, recovery checks, and end challenge.
- Updated content QA so released tutorials and learner tasks cite source fact
  IDs from typed frontmatter metadata instead of requiring raw IDs in visible
  tutorial prose.
- Removed visible raw `FACT-*` source-ID lists from tutorials, learner tasks,
  and the Looker recipe; cleaned remaining scanned repo/app implementation
  phrasing from tutorials, the orientation challenge, and flashcard deck review
  notes.
- Verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for learner-facing repo/app/source-fact implementation wording;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 12
    Playwright tests passing.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - formal Claude CLI review in non-TUI `--print` mode returned
    `Not logged in · Please run /login`.

## 2026-05-11 - Phase 7 Learning Surface Verification First Pass

- Implemented Task 040 on `phase-7-learning-surface-verification`.
- Added `bun run verify:deployed-surface`, a Playwright verifier for the
  learning surface across desktop/mobile routes plus representative workbench,
  flashcard, quiz, and exam flows.
- Found that the current live Pages build has mobile horizontal overflow on
  `LT-DQ-006` (`scrollWidth=414`, `clientWidth=390`).
- Fixed Markdown table/code containment in `app/src/styles.css` and added the
  `LT-DQ-006` route to rendered UI responsive coverage.
- Added visible learner-facing content QA so challenge questions, quiz
  questions, exam cards, and flashcards cannot show raw `FACT-*` IDs, raw
  `LT-*` IDs, repository references, app internals, or learner-meta wording.
- Cleaned existing self-referential assessment and flashcard wording, including
  challenge manifests and quiz explanations that previously named internal fact
  IDs as visible answer text.
- Added `docs/15-learning-surface-walkthrough.md`.
- Added `docs/16-curriculum-critical-review.md` and updated `PLAN.md` with
  stricter requirements for self-contained, real, verified tutorials and
  practical assessment items.
- Added `_development/tasks/041-curriculum-completeness-audit.md` as the next
  task.
- Updated `AGENTS.md` to make the learner-facing content boundary explicit.
- Verification passed:
  - `bun run content:check`;
  - `bun run test:content-qa`;
  - `bun run test:quiz-facts-db`;
  - `bun run test:flashcards`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding;
  - `DEPLOYED_BASE_URL=http://127.0.0.1:4174/ bun run verify:deployed-surface`
    against patched local preview;
  - `git diff --check`.
- Failed/blocked attempts recorded:
  - first sandboxed `bun run check` reached Playwright but Vite preview could
    not bind `127.0.0.1:4173`;
  - first full check after content edits failed because an e2e selector still
    expected the old raw `FACT-*` answer label;
  - initial local preview verifier used the GitHub Pages base path and hit
    local Vite preview asset 404s; using preview root URL passed;
  - initial live Pages verifier failed against the old deployed build because
    the mobile tutorial overflow fix was not deployed yet;
  - formal Claude CLI review in `--print` mode produced no output for about one
    minute and was killed;
  - Codex CLI non-TUI mode works: `codex exec --json ...` returned
    `codex-cli-ok`.
- Acceptance note: Task 040 is locally verified first-pass Phase 7 work. It is
  not deployed-verified or Claude-reviewed yet, and it does not make the
  curriculum complete or comprehensive.

## 2026-05-10 - Phase 7 Learning Surface Verification Setup

- Verified PR #25 post-merge state:
  - PR #25 was squash-merged at
    `63aa59fb0791b37c09899ba96a45ba44ec023d2d`.
  - Main CI passed for `63aa59f`.
  - GitHub Pages workflow passed for `63aa59f`.
  - Live Pages URL `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200
    with `last-modified: Sun, 10 May 2026 21:24:25 GMT`.
- Confirmed no open PRs before starting the Phase 7 branch.
- Created branch `phase-7-learning-surface-verification` from verified `main`.
- Added `_development/tasks/040-learning-surface-verification.md` as the next
  implementation task.
- No Phase 7 browser walkthrough work has been implemented yet.

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
