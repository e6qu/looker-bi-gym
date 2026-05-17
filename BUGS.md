# Bugs And Known Gaps

Last updated: 2026-05-17 (learner-perspective site audit recorded)

## Open Issues

- ID: LEARNER-PERSPECTIVE-AUDIT-2026-05-17.
  - Area: home onboarding, tutorial sequence, surface justification,
    cross-surface coupling, prose polish.
  - Severity: high (the curriculum is still confusing to a fresh
    learner; substantial parts read as platform self-description or
    vocabulary scaffolding rather than learning material).
  - Description: Walk-through of the live site
    (https://e6qu.github.io/looker-bi-gym/) and underlying source
    files from a fresh-learner stance. The previous remediation
    rounds (`CODEX-*-2026-05-17`) closed every codex finding the
    static validators could measure, but the learner-experience
    confusion that surfaced is structural and not yet covered by any
    validator. Findings grouped into separable tracks below; each
    track can ship as its own PR.

  ### Track A - Onboarding & navigation
  - A1 `block` Home page has no "Start here" path. The hero offers
    two equal CTAs (Read Docs / Browse Tutorials) and a fresh
    learner cannot tell which to click first. See
    `app/src/App.tsx:2728-2731`.
  - A2 `high` Home page describes platform implementation rather
    than learner outcomes. Lines like "A static React app for
    technical BI practice ... deterministic browser checks ... local
    learner progress" answer "what is this" instead of "what will I
    be able to do". See `app/src/App.tsx:2723-2727`.
  - A3 `medium` The principles row on home is platform-meta
    (`principles` constant). Learners reading the home page see
    architectural constraints, not learning value.
  - A4 `medium` Top-nav has 12 sections (Home, Docs, Regulations,
    Terminology, Tutorials, Workbench, Quiz, Exam, Facts,
    Flashcards, Challenges, Settings) with no learning-loop coupling
    between them. A learner cannot tell which to use when. There is
    no on-site map that says "first do this, then that".
  - A5 `high` Two parallel curricula confuse the learner. The
    `docs/00-17` set is research / synthesis material, and
    `tutorials/00-09` is the practical curriculum. Both are numbered
    starting at 00 inside `docs/README.md:5-12` and
    `tutorials/README.md:25-66`. No surface tells the learner which
    to read in which order. The docs index even says "Start here" at
    `docs/README.md:3`, which competes with the tutorials index. The
    home page links to `#/docs/README.md` as one of two primary CTAs,
    suggesting docs are the entry point - but docs are not the
    learning path.

  ### Track B - Tutorial sequence quality
  - B1 `high` Tutorial numbering does not match Area ordering. Area
    B contains tutorials 02 / 04 / 05; Area C contains 03 / 06. A
    learner reading by number jumps Areas; a learner reading by Area
    jumps numbers. Neither is a coherent sequence. See
    `tutorials/README.md:25-66`.
  - B2 `high` "Each tutorial stands alone" claim is false in
    practice. Tutorial 04 lists "A dimensional model with declared
    grain and a governed serving layer" as Prior knowledge expected
    (`tutorials/04-metrics-and-calculated-fields.md:30`), which is
    exactly tutorial 02's output. Tutorial 04 also lists
    "Weighted-average reasoning: why `SUM(a) / SUM(b)` differs from
    `AVG(row_ratio)`" as Prior knowledge expected, but
    weighted-average reasoning is the central content tutorial 04
    teaches. Inverted.
  - B3 `block` Tutorial 00 (Orientation And Stack) is a vocabulary
    primer with no executable artifact. The seven Steps in
    `tutorials/00-orientation-and-stack.md:56-88` instruct the
    learner to write four headings (`Serving layer`, `Reporting
layer`, `Sensitive fields`, `Banking grain`) in their own notes
    and fill in pre-determined sentences. No SQL is run, no data is
    loaded, nothing is verified by the platform. A first-time
    learner reads this and reasonably wonders "did I actually do
    anything? what skill did I just build?".
  - B4 `high` Tutorial 01 references `account_daily_balances`
    without first introducing the schema or business meaning of its
    columns. The learner is asked to run
    `SUM(ledger_balance) GROUP BY business_date, currency_code` at
    `tutorials/01-connect-public-data.md:89-100` before knowing what
    a `ledger_balance` is, whether it differs from `available_balance`,
    or why `business_date` (not `as_of_date` or some other name)
    is the reference date.
  - B5 `medium` Excessive `<a class="termRef">...<sup>BQ</sup></a>`
    superscripts in tutorial bodies break readability. Tutorial 04
    has 12+ termRef links in the first 30 lines of body
    (`tutorials/04-metrics-and-calculated-fields.md:47-65`). Each
    domain phrase becomes a footnoted reference; the eye stutters,
    and the prose reads like a textbook footnote dump rather than a
    teaching narrative.
  - B6 `medium` Tutorials produce "notes" / "decision logs" /
    "metric contracts" as deliverables but the platform has no
    note-saving mechanism. Tutorial 01 produces
    `notes/01-serving-view-check.md` at
    `tutorials/01-connect-public-data.md:66` - a path the platform
    will never create, never validate, and never resurface.
  - B7 `medium` "End Challenge" sections defeat their own purpose.
    Tutorial 00's End Challenge at
    `tutorials/00-orientation-and-stack.md:123-137` presents a
    scenario and reveals the expected answer immediately below in a
    `<details>` block. The friction is one click; the challenge is
    cosmetic.

  ### Track C - Compartmentalization loopholes
  - C1 `high` `tutorials/00-orientation-and-stack.md:142` links to
    `#/challenges/orientation-quiz`. The compartmentalization
    validator scans `quizzes/`, `flashcards/`, `exams/`,
    `tutorials/`, and `learner-tasks/`, but does not scan
    `challenges/` and does not flag tutorial body links that target
    the challenges surface. The rule "tutorials must not assume the
    quiz/exam surface" is silently bypassed by routing the
    orientation check through `#/challenges/orientation-quiz`
    instead of `#/quiz`. Fix: extend the validator's
    `see-other-surface` pattern set to flag `#/challenges/...-quiz`
    targets, or convert the orientation quiz into a self-contained
    in-tutorial self-check.
  - C2 `medium` Flashcards' `recommended_learner_tasks` metadata
    (e.g. `flashcards/bi-fundamentals/fc-bi-grain.md:11-12`) names a
    specific LT path. This is invisible to the learner (the
    flashcard renderer does not show it) but the cross-surface
    coupling is real in the data model. Either surface it as a
    "next step" link in the flashcard renderer, or remove the field
    entirely. Today it is dead weight that re-introduces coupling on
    the authoring side.

  ### Track D - Assessment quality
  - D1 `medium` Most quiz questions remain abstract "which
    describes X" / "which is correct" prompts. The audit in
    `_development/assessment-audit.md` (Q-4) flagged this; the
    expansion since then added more questions but the prompt shape
    is still concept-recall heavy. Application questions (predict
    the output, find the bug, name the missing predicate) are still
    rare. The IFRS 9 stage-transition exam card is the right shape;
    the quiz has not reached that shape.
  - D2 `medium` Orientation quiz answers are encoded as literal
    string IDs (`sql_defined_virtual_table`, `conduit_schema`,
    integer `100000`) at
    `challenges/manifests/orientation-quiz.yaml:35-58`. The learner
    picks the option that maps to one of these codes; the platform
    never asks the learner to defend the choice or derive the
    answer.
  - D3 `medium` Flashcard backs often paraphrase the terminology
    entry. `fc-bi-grain` back at
    `flashcards/bi-fundamentals/fc-bi-grain.md:24-26` says "Declare
    the row grain first; then choose measures and joins that
    preserve that grain", which is the terminology definition
    nearly verbatim. Spaced-repetition value comes from contrast /
    trap / misconception framing, not from definition recall.

  ### Track E - Surface justification
  - E1 `medium` Facts page (`#/facts`) has no learner-facing
    justification. A fresh learner clicking it sees a fact graph but
    is given no reason to use it. Either name the pedagogical
    purpose on the page (e.g., "use this to trace the source behind
    any claim") or hide the surface from the primary nav.
  - E2 `medium` Challenges page (`#/challenges`) conceptually
    overlaps with quiz / exam. Three different assessment surfaces
    (challenges, quiz, exam) with overlapping shapes and no learner-
    facing rationale for which to attempt when.
  - E3 `medium` `docs/` and `tutorials/` overlap conceptually.
    `docs/01-business-intelligence-foundations.md` covers grain,
    facts, dimensions, metrics; tutorial 02 teaches the same. No
    surface signals the difference between them.

  ### Track F - Polish & cruft
  - F1 `low` "Required tools" / "Do not use ..." disclaimers
    repeat across every tutorial:
    `tutorials/00-orientation-and-stack.md:32`,
    `tutorials/01-connect-public-data.md:38-43`, etc. Beginners
    have not heard of Google Cloud CLI / service account keys /
    Docker, so the warning is noise; experienced learners do not
    need it.
  - F2 `low` Synthetic-data boundary line appears in three places
    per tutorial: frontmatter `tags`, body paragraph, and
    Deliverable section. Reading time loss with no value.
  - F3 `low` Dataset version pinning (`deposits-seed/v0.1.0`) is
    exposed to the learner in tutorial setup lines. Internal
    versioning leaking into learner copy.

  - Fix plan: open one PR per track. Track A and Track B carry the
    bulk of the user impact; ship them first. Tracks C and D extend
    validator scope. Tracks E and F are polish; can ship together as
    a small PR.
  - Status: open. Codex external review of this audit queued.

- ID: CODEX-VERDICT-RUN-2026-05-17.
  - Area: tutorials/learner-tasks/README ordering wording.
  - Severity: low.
  - Description: After `CODEX-RE-REVIEW-FINDINGS-2026-05-17` was
    closed and the second-pass commit (`4e25c90`) was pushed, a
    tight read-only codex verdict run on 2026-05-17
    (`/tmp/codex-review-4.md`) returned PASS on every validator
    (`validate:compartmentalization`, `validate:quiz-distractors`,
    `test:facts-db`, `validate:datasets`, `test:fixtures`) plus
    one residual defect: `tutorials/learner-tasks/README.md:38`
    still said "Order is alphabetical by area", which counted as
    an order claim under the compartmentalization rule.
  - Fix: replaced the sentence with "The labs do not assume each
    other; pick whichever area matches the BI habit you want to
    strengthen next." The README no longer claims any order.
  - Status: fixed on the same PR. Full local gate green.

- ID: CODEX-RE-REVIEW-FINDINGS-2026-05-17.
  - Area: tutorials/learner-tasks/README, exam pack fixture
    backing, source-card depth, PSD2 fact wording, continuity docs.
  - Severity: high; one item is `block`.
  - Description: After the first round of Codex remediation
    (commits `cff8f96` and `bb7a5f5`), a fresh Codex CLI read-only
    review on 2026-05-17 (`/tmp/codex-review-2.md`) confirmed the
    original 10-item punch list is mostly closed but flagged 5 new
    items still open.
  - Sub-issues:
    1. `block` `tutorials/learner-tasks/README.md` violates the hard
       compartmentalization rule and is hidden from the validator by
       the `tutorialAllowlist` entry in
       `app/scripts/validate-assessment-compartmentalization.ts:28`.
       Visible defects:
       - `tutorials/learner-tasks/README.md:23` describes a
         "browser-first sequence" (treats the tasks as an ordered
         path, not standalone exercises).
       - `tutorials/learner-tasks/README.md:35` exposes raw `LT-*`
         IDs in visible link text.
       - `tutorials/learner-tasks/README.md:51` says
         "Complete the practice labs in order".
         Fix: rewrite as a self-contained topic index (one line per
         task by subject, no LT- prefix, no ordering claim, no
         "browser-first sequence" framing) AND drop the allowlist so
         the validator covers the file.
    2. `high` The unified exam pack at
       `exams/bi-foundations/bi-foundations-exam.md` still
       overclaims fixture-backed deterministic shape. The IFRS 9 and
       AML cards are now fixture-backed, but several others remain
       design / prose:
       - `exam-card-ratio-null-contract-review`
         (file:65): expected outputs are contract prose, not a
         numeric result.
       - `exam-card-dashboard-refresh-operations-review`
         (file:88): no committed job-metadata / freshness fixture
         behind the expected outputs.
       - RLS / CLS access-design card (file:239): generic prose,
         not anchored to a specific scenario with deterministic
         field-list or grant outputs.
       - SCD2 card (file:262): expected outputs assume a branch-
         rename fixture that is not committed.
       - `exam-card-bcbs-239-lineage-walkthrough` (file:359):
         lineage prose, no named source tables / owners / control
         totals in the expected outputs.
         Fix: for each card, either add explicit inline deterministic
         data in the card body (table of rows or named fields with
         expected counts) OR remove the card from the pack.
         `test:fixtures` does not cover exam cards (only the
         `challenges/solution-fixtures` tree), so passing
         `test:fixtures` does not prove the exam pack is fixture-
         backed.
    3. `medium` SRC card depth still thin for some claims:
       - `FACT-BIGQUERY-MATERIALIZED-VIEW-REFRESH` at
         `facts/bi-platforms-bigquery-looker-studio.md:473` claims
         `max_staleness`, best-effort refresh, and "not a hard SLA",
         but the linked `SRC-BIGQUERY-MATERIALIZED-VIEW-REFRESH`
         card at `sources/platforms/bigquery.md:179` only quotes
         "automatically refreshes" and "refresh interval".
       - `FACT-LOOKER-STUDIO-FRESHNESS-INTERVALS` at
         `facts/bi-platforms-bigquery-looker-studio.md:504` claims
         specific interval behaviour and cost implications, but the
         linked `SRC-LOOKER-STUDIO-FRESHNESS-INTERVALS` card at
         `sources/platforms/looker-studio.md:202` only quotes
         "data freshness".
         Fix: expand each source card with the specific quoted text
         the fact relies on (best-effort, `max_staleness`, specific
         freshness values, cost-of-refresh linkage).
    4. `medium` `FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION` at
       `facts/banking-deposits-romania-eu.md:219` says SCA event
       data "must be retained for supervisory inspection". The
       linked source card cites Articles 95 / 96 / 97 at
       `sources/law/eu-crr.md:39`, which support SCA application,
       risk and security control evidence, and incident reporting,
       but not an event-level SCA retention rule as currently
       phrased. Fix: soften the fact to "SCA application, evidence
       of mitigation measures, and incident reporting are subject
       to supervisory oversight" (or similar), aligning with what
       the source card actually quotes; expand the source card if
       a retention article is added.
    5. `medium` `DO_NEXT.md` is stale:
       - `DO_NEXT.md:14` still tells the next session to continue
         PR #45 on `terminology-integrity-checks`.
       - `DO_NEXT.md:25` lists stale tallies (74 quiz, 82
         flashcards, 9 exam cards) that conflict with the final
         post-fix counts in `STATUS.md:61`,
         `_development/assessment-audit.md:11`, and
         `_development/tasks/062-assessment-quality-and-expansion.md:65`.
         Fix: rewrite `DO_NEXT.md` to point at the current PR #46
         remediation state and refresh the count lines.
  - Fix plan: address sub-issues 1-5 in order on the same PR #46;
    after fixes commit, push, and request another Codex read-only
    review.
  - Status: fully remediated on branch
    `assessment-quality-and-expansion`. All 5 sub-issues closed: - `tutorials/learner-tasks/README.md` rewritten as a topic-area
    index (alphabetical by area, no LT-\* prefixes, no ordering
    claim, no "browser-first sequence" framing). The
    `tutorialAllowlist` is now empty in
    `app/scripts/validate-assessment-compartmentalization.ts:28`,
    so the validator actively covers the README.
    `validate:compartmentalization` reports 130 files scanned and
    0 hits. - The five remaining design / prose exam cards
    (`exam-card-ratio-null-contract`,
    `exam-card-dashboard-refresh-ops`,
    `exam-card-rls-cls-design`,
    `exam-card-scd2-historical-reporting`,
    `exam-card-bcbs-239-lineage-walkthrough`) all rewritten with
    inline deterministic data (synthetic tables, named schemas,
    concrete grant strings, named lineage chains) and numeric /
    schema / field-list expected_outputs. The pack now has zero
    cards whose expected outputs are bare prose. Rendering CSS
    adjusted (`.examCardObjective` with `white-space: pre-wrap;
overflow-wrap: anywhere; overflow-x: auto`, plus `.examCard
ul li` with `overflow-wrap: anywhere`) so the wider inline
    tables and identifier names do not cause horizontal overflow
    on mobile. Playwright rendered-UI suite passes 101/101. - Source cards deepened:
    `SRC-BIGQUERY-MATERIALIZED-VIEW-REFRESH` now quotes
    `enable_refresh`, `refresh_interval_minutes`, `max_staleness`,
    and the explicit best-effort line; URL updated to the
    materialized-views-manage page with the create page as
    companion. `SRC-LOOKER-STUDIO-FRESHNESS-INTERVALS` now quotes
    the cache-staleness-threshold definition, the
    query-frequency-and-cost link, and the connector-specific
    minimum freshness; URL updated to the manage-data-freshness
    page. - `FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION` rephrased so it
    matches what `SRC-PSD2-ELI-2015-2366` actually quotes
    (Articles 4(30), 95, 96, 97): SCA application, framework with
    mitigation measures and control mechanisms, evidence of those
    measures, and incident reporting. The retention-for-
    supervisory-inspection wording was removed. - `DO_NEXT.md` refreshed: now points at PR #46 on
    `assessment-quality-and-expansion`, references the Codex
    review loop discipline, and records the final post-fix surface
    tallies (78 quiz / 105 flashcards / 16 exam cards / 133 facts /
    150 terminology entries).
    Full local gate (`bun run check`) green. Codex re-review
    queued for after commit + push.

- ID: CODEX-REVIEW-FINDINGS-2026-05-17.
  - Area: tutorials, learner-tasks, quizzes, exams, flashcards,
    coverage script, source cards.
  - Severity: high; one item is `block`.
  - Description: Codex CLI second-opinion review of PR #46 surfaced
    concrete defects. Recording each case below for tracking, then
    fixing.
  - Sub-issues:
    1. `block` Compartmentalization violated outside the validator's
       scope. `validate:compartmentalization` scans only
       `quizzes/`, `flashcards/`, `exams/`. The visible-text
       violations in `tutorials/` and `tutorials/learner-tasks/`:
       - `tutorials/03-first-executive-dashboard.md:202-203` ("synthetic
         table from tutorial 01 already exists" / "use the inline
         BigQuery setup SQL in tutorial 01 first").
       - `tutorials/04-metrics-and-calculated-fields.md:281-282` (same
         pattern referencing "tutorial 01").
       - `tutorials/05-blending-vs-upstream-joins.md:348-349`
         ("synthetic tables from tutorial 01 do not exist...").
       - `tutorials/06-performance-and-cost-lab.md:135` ("from tutorial
         05 and keeps the unmapped branch visible") and `:587`
         ("rerun the tutorial 05 safe source").
       - `tutorials/08-observability-and-operations.md:571` ("tutorial
         05 (`164800 - 95700 = 69100`)").
       - `tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md:50`
         ("Complete [LT-SQL-003]") - the cross-task reference I thought
         I had removed.
       - `tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md:53`
         ("`LT-BI-001` and `LT-BI-002`. The tables you will query are").
       - `tutorials/learner-tasks/README.md:36-41` (lists LT-\* IDs as
         a sequence).
       - `tutorials/recipes/r-looker-001-deposits-dashboard.md:24`
         ("Optional follow-on after [LT-LOOKER-004]").
       - `tutorials/exam-mode.md` and `tutorials/quiz-bank.md` are
         themselves wrappers around assessment surfaces, which
         re-introduces cross-surface coupling at the tutorial level.
    2. `high` `q-hard-freshness-interval-cost` quiz answer teaches the
       wrong Looker Studio freshness model. Says "A 1-minute freshness
       causes the report to refresh every minute it is open." Looker
       Studio freshness is a cache-staleness threshold, not an
       auto-refresh interval; report auto-refresh is a separate
       configuration. See https://cloud.google.com/looker/docs/studio/manage-data-freshness.
       Cases:
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1941`.
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1945`
         (`cache_hits_no_cost` distractor mentions "every refresh"
         under 1-minute freshness).
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1947`
         (`interval_caps_bytes` distractor leans on the same flawed
         framing).
    3. `high` Materialized view "30 minutes" SLA wording is too
       absolute. BigQuery MV automatic refresh is best-effort, not a
       hard SLA contract. Cases:
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1877` ("cached
         result is no more than 30 minutes behind the base table at
         any point").
       - `exams/bi-foundations/bi-foundations-exam.md:291` ("materialized
         view refresh interval is configured to at most 30 minutes").
       - `exam-card-materialized-view-refresh-review` objective and
         self-assessment also imply hard-SLA semantics.
    4. `high` `q-hard-row-access-policy` answer uses pseudo-SQL
       (`SESSION_USER_BRANCH(...)`) that does not exist in BigQuery.
       Cases:
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1781`.
    5. `medium` AML / KYC content invokes GDPR "special-category" too
       loosely. KYC data is sensitive and confidential but not
       automatically Article 9 unless it reveals an Article 9 category.
       Cases:
       - `quizzes/bi-foundations/bi-foundations-mixed.md:1119` ("KYC
         narratives or customer IDs into the aggregate page violates
         minimisation and special-category handling rules").
       - `flashcards/banking-context/fc-banking-aml-alert-dashboard.md`
         back ("...because those are sensitive and special-category-
         adjacent").
       - The AML exam card `exam-card-aml-alert-dashboard-governance`
         may inherit similar framing.
    6. `medium` New source cards lack article-specific quotes that
       support the FACT claims:
       - `FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION` claims SCA event
         evidence "must be retained for supervisory inspection";
         `SRC-PSD2-ELI-2015-2366` only quotes "strong customer
         authentication" (`sources/law/eu-crr.md:28`).
       - `FACT-IFRS9-STAGES` claims 12-month / lifetime ECL split per
         stage with credit-impaired definition; `SRC-IFRS9-STANDARD`
         only quotes "expected credit losses"
         (`sources/law/ifrs9.md`).
       - `FACT-BCBS-239-RDARR-PRINCIPLES` claims 14 named principles;
         `SRC-BCBS-239-PRINCIPLES` only quotes "risk data aggregation"
         (`sources/regulators/bcbs-239.md`).
       - `FACT-CRR-CET1-RATIO` is similarly under-quoted relative to
         the 4.5% minimum claim.
    7. `medium` `coverage:cert-track` inflates counts because it
       concatenates whole files including frontmatter, source_facts
       lists, and identifiers, then regex-counts. Topics like "grain"
       show 37 hits but many of those come from frontmatter metadata.
       The matrix is a useful smoke test, not a coverage matrix.
       Cases: `app/scripts/generate-cert-track-coverage.ts` body, plus
       the regenerated `_development/cert-track-coverage.md`.
    8. `medium` `validate:quiz-distractors` only matches a banned
       string list. It cannot catch semantic defects: "technically
       correct but not best" answers, invalid SQL function names,
       unsupported absolutes, or stale platform mechanics. Cases:
       `app/scripts/validate-quiz-distractor-quality.ts`.
    9. `medium` IFRS 9 + AML exam cards read as design prompts without
       deterministic fixture data. The committed lending dataset has
       `ifrs9_stage` and principal columns but no ECL amounts or a
       stage-transition fixture; AML has no fixture at all. Cases:
       - `exams/bi-foundations/bi-foundations-exam.md`
         `exam-card-ifrs9-stage-transition` objective and
         `expected_outputs`.
       - `exams/bi-foundations/bi-foundations-exam.md`
         `exam-card-aml-alert-dashboard-governance` objective and
         `expected_outputs`.
    10. `low` Stale tallies in `_development/assessment-audit.md` say
        60 quiz questions and 64 flashcards. Actual final state on
        this branch: 78 quiz questions, 89 flashcards, 17 exam cards,
        133 facts.
  - Fix plan: address each sub-issue in turn on the same branch.
    Extend `validate:compartmentalization` to also scan tutorials and
    learner-tasks. Rewrite the LS freshness and MV refresh wording to
    match the actual product semantics. Replace the pseudo-SQL with a
    real BigQuery RLS shape. Tighten AML/KYC privacy wording so
    "special category" is reserved for actual Article 9 reveals.
    Strengthen source-card quotes with article / section coordinates.
    Refit `coverage:cert-track` to count unique authored items rather
    than whole-file regex hits. Soften the IFRS 9 / AML exam cards or
    annotate them as design-evidence cards. Refresh the audit tallies.
  - Status: fully remediated on branch
    `assessment-quality-and-expansion`. All 10 sub-issues and the
    minor / low items closed:
    - Compartmentalization validator extended to `tutorials/` and
      `learner-tasks/` (130 files scanned, 0 hits).
    - LS freshness rewritten as cache-staleness threshold; MV
      refresh wording softened to best-effort across quiz / exam /
      flashcard / fact; pseudo-SQL `SESSION_USER_BRANCH(...)`
      replaced with real BigQuery
      `ROW ACCESS POLICY ... FILTER USING (branch_id = ...)`;
      AML / KYC special-category language reserved for actual
      GDPR Article 9 reveals.
    - PSD2, CRR, IFRS 9, BCBS 239 source cards expanded with
      article / section quotes that support the FACT claims.
    - `coverage:cert-track` refit to count unique authored items
      (parses frontmatter, iterates questions / cards / flashcards /
      terminology entries).
    - `validate:quiz-distractors` extended with
      invented-SQL-identifier (`SESSION_USER_BRANCH(...)` family)
      and semantic-anti-pattern (freshness-as-auto-refresh,
      MV-refresh-hard-SLA) rules, plus a scope-and-limits comment
      block.
    - IFRS 9 and AML exam cards are now fixture-backed (not design
      exercises): IFRS 9 uses the existing lending dataset with
      L2002's 2026-02-28 row flipped from stage 2 / DPD 35 to
      stage 1 / DPD 12 so the loan transitions 1->2 by 2026-03-31;
      expected outputs are deterministic transition counts plus the
      stage-2 and stage-3 outstanding-principal totals at the new
      stage. AML uses an inline synthetic 8-row alert table embedded
      in the card body; expected outputs are deterministic counts by
      type, ageing bucket, status, and KYC-review flag, plus the
      named field-exclusion list for the aggregate page.
    - `tutorials/quiz-bank.md` rewritten as a generic banking BI
      self-assessment lens (competency families + the three
      diagnostic questions). `tutorials/exam-mode.md` rewritten as
      a generic banking BI practical review lens (reviewable result
      definition + the four-step loop). Neither file names a
      specific quiz question, exam card, or assessment surface.
    - Learner-task H1 and frontmatter `title` fields stripped of
      LT-ID prefix; the ID lives only in frontmatter `id` and in
      `recommended_learner_tasks` cross-references.
    - Tallies refreshed: `STATUS.md`,
      `_development/assessment-audit.md`, and
      `_development/tasks/062-assessment-quality-and-expansion.md`
      all record the final post-fix counts (78 quiz / 105 flashcards /
      16 exam cards / 133 facts / 150 terminology entries).
    - Full local gate (`bun run check`) green.

- ID: ASSESSMENT-AUDIT-DEFECTS-2026-05-16.
  - Area: quizzes, flashcards, exams, terminology depth.
  - Severity: high.
  - Description: assessment audit recorded in
    `_development/assessment-audit.md` found 5 high / 8 medium / 1 low
    defects against a certification-track learner lens. Top items were
    pervasive weak quiz distractors, missing cert-track topics
    (CLS, RLS, clustering, MV refresh, COUNT(\*) vs COUNT(column), SCD,
    conformed dim, surrogate key, weighted vs avg-of-avgs, CRR / IFRS9
    / BCBS 239), lopsided flashcard deck distribution (four decks at
    only 4 cards), and divergent exam surfaces (5 YAML cards + 6 MD
    cards with only 2 overlapping).
  - Fix plan: Task 062 carries the quality fixes plus first expansion
    wave (74 quiz questions, 82 flashcards, 9 unified exam cards, 14
    new FACT entries + 11 new SRC cards). Phase 12 of `PLAN.md` stages
    the remaining work toward Phase 9 minima (500 / 200 / 30).
  - Status: open; Task 062 fixes quality items + first expansion wave.
    Remaining gap toward Phase 9 minima tracked in Phase 12.

- ID: TERMINOLOGY-FIRST-PASS-FOLLOWTHROUGH-2026-05-16.
  - Area: terminology pages, curriculum grounding, content QA, search.
  - Severity: high.
  - Description: PR #44 (`d88acc7`) shipped rendered terminology pages and a
    route but did not deliver the Phase 6 grounding requirement. No
    learner-facing surface used `class="termRef"`. There was no build-time
    validation of the in-terminology cross-links, no external sources for
    vendor or regulatory entries, no `FACT-*` linkage, and the sidebar
    search filtered pages instead of term headings.
  - Fix plan: Phase 10 of `PLAN.md`. Task 060 on branch
    `terminology-integrity-checks` (PR #45) carries Phase 10.1 through 10.6
    in one PR by user direction. Remaining work after PR #45 merges:
    renderer support for inline HTML in YAML-bound surfaces, continued
    inline grounding across the tutorials/regulations flagged in
    `_development/terminology-coverage.md`, and a decision pass on the 53
    uncovered entries.
  - Status: open; Phase 10.1 through 10.5 implemented in PR #45.

- ID: TUTORIAL-AUDIT-DEFECTS-2026-05-16.
  - Area: numbered tutorials, learner tasks, recipe, cross-cutting
    tutorial index pages.
  - Severity: high.
  - Description: tutorial audit recorded in
    `_development/tutorial-audit.md` found 1 block / 9 high / 27 medium
    / 17 low defects against the certification-track reading lens. Top
    items were the aspirational `curriculum.md`, leaked End Challenge
    answers, tautological VALUES checks in tutorials 06-09 (especially
    the capstone scoring), Looker Studio reusable calculated-field
    accuracy, and DuckDB-only `CAST(... AS VARCHAR)` in BigQuery-shaped
    SQL.
  - Fix plan: Phase 11 of `PLAN.md`. PR #45 carries all six sub-phases
    (11.1 through 11.6) by user direction. Renderer changes that would
    let YAML-bound surfaces render inline HTML, deeper deep-link
    citations, and exhaustive inline grounding across every prose
    occurrence remain follow-on work.
  - Status: open; PR #45 implements all six sub-phases pending CI and
    merge.

- ID: QUIZ-WORKSHEET-SCAFFOLDING-2026-05-11.
  - Area: quiz bank and content QA.
  - Severity: high.
  - Description: The first BI Foundations quiz question still read like a
    worksheet instruction about building a scorecard and writing `SUM(...)`
    rather than a standalone BI assessment scenario.
  - Fix plan: Task 058 rewrites the prompt as a concrete branch-dashboard
    balance-grain question and adds content QA guardrails against similar
    course-scaffolded quiz wording.
  - Status: closed in PR #43; main CI, Pages deployment, live HTTP 200, and
    deployed learning-surface verification passed after merge.

- ID: QUIZ-QUESTION-QUALITY-2026-05-11.
  - Area: quiz bank and rendered quiz UI.
  - Severity: high.
  - Description: The main quiz bank had too few questions, and several prompts
    felt shallow or dependent on course scaffolding rather than standing alone
    as BI, BigQuery, Looker Studio, and banking BI assessment scenarios.
  - Fix plan: Task 057 expands the bank to 60 standalone scenario questions,
    keeps fact/task grounding hidden in metadata, raises content QA count
    guardrails, and fixes mobile overflow caused by longer assessment text.
  - Status: closed in PR #42; main CI, Pages deployment, live HTTP 200, and
    deployed learning-surface verification passed after merge.

- ID: TUTORIAL-EVIDENCE-BASIS-FILLER-2026-05-11.
  - Area: learner-facing tutorials and content QA.
  - Severity: low.
  - Description: The visible `Evidence Basis` sections added noise without
    helping learners complete the BI tasks. Source grounding belongs in
    metadata and validation rather than filler tutorial prose.
  - Fix plan: Task 056 removes the visible sections and updates content QA while
    preserving `source_facts` validation.
  - Status: closed in PR #41; main CI, Pages deployment, live HTTP 200, and
    deployed learning-surface verification passed after merge.

- ID: DEPLOYED-SURFACE-METADATA-EXPECTATION-2026-05-11.
  - Area: deployed learning-surface verifier.
  - Severity: medium.
  - Description: After PR #39 hid source/task metadata from quiz and exam
    prompts, `bun run verify:deployed-surface` still expected a raw source fact
    ID to be visible on the quiz page.
  - Fix plan: Task 055 updates the verifier to assert visible independent quiz
    and exam prompts while confirming source/task metadata stays hidden.
  - Status: fixed and locally verified on branch
    `looker-bigquery-corpus-expansion`; live deployed-surface verification
    passed against the current Pages site.

- ID: LEARNER-TASK-CTF-WORDING-2026-05-11.
  - Area: learner-task tutorials.
  - Severity: medium.
  - Description: Several browser-first practice labs still used visible `CTF`
    wording for final summaries, which makes the course feel like scaffolded
    game content instead of BI practice.
  - Fix plan: Task 055 rewords those final prompts as final summaries and adds
    stale scans for the affected learner-facing content.
  - Status: fixed and locally verified on branch
    `looker-bigquery-corpus-expansion`.

- ID: ORIENTATION-TUTORIAL-QUIZ-LINK-2026-05-11.
  - Area: tutorial 00 and orientation quiz.
  - Severity: medium.
  - Description: The first tutorial used the orientation quiz as the tutorial
    step and deliverable, and rendered `#/challenges/orientation-quiz` as inline
    code instead of a clickable verification link.
  - Fix plan: Task 052 rewrites tutorial 00 as a self-contained orientation
    decision log, keeps the quiz as separate verification, rewrites the quiz
    prompts as scenario checks, and adds rendered UI regression coverage.
  - Status: closed in PR #38; main CI, Pages, live HTTP, deployed-surface, and
    targeted live link verification passed.

- ID: TUTORIAL-VERIFICATION-SEPARATION-2026-05-11.
  - Area: tutorial and learner-task pages.
  - Severity: medium.
  - Description: Tutorial pages should not depend on quiz content or expose
    challenge manifests, solution fixtures, repository paths, inline hash
    routes, or other implementation details as learner-facing references.
  - Fix plan: Task 053 converts workbench routes to links, removes
    implementation references, and adds rendered regression coverage.
  - Status: fixed and verified locally on branch
    `tutorial-verification-separation-sweep`; no PR opened by user request.

- ID: CURRICULUM-SELF-REFERENCE-2026-05-11.
  - Area: tutorials, quiz bank, exam mode, flashcards, and rendered assessment
    UI.
  - Severity: high.
  - Description: Learner-facing content still exposed curriculum scaffolding:
    split path wording, visible `Source Facts` headings, `this website/page`
    phrasing, quiz/exam recommended-task references, and one flashcard framed
    as a challenge instead of a BI control.
  - Fix plan: Task 054 rewrites the affected tutorial/index/prose surfaces,
    hides quiz/exam grounding metadata from prompts, updates content QA and
    rendered UI regression coverage, and keeps metadata available only for
    validation.
  - Status: fixed and verified locally on branch
    `tutorial-verification-separation-sweep`; no PR opened by user request.

- ID: CONTENT-QUALITY-2026-05-10.
  - Area: tutorials, quizzes, exams, flashcards, and facts.
  - Severity: medium.
  - Description: Prior claims that curriculum content is complete, real,
    comprehensive, or fact-backed are not trusted until deeper automation,
    human review, local judge review, and Claude CLI review pass.
  - Fix plan: Apply the staged realignment plan in `PLAN.md` and keep explicit
    acceptance notes per phase.
  - Status: open.

- ID: CURRICULUM-AUDIT-2026-05-11.
  - Area: tutorials, questions, flashcards, exams.
  - Severity: high.
  - Description: The current curriculum is not yet a complete, comprehensive,
    externally verified e-learning path. Several older tutorials need a hard
    audit for self-contained setup, real files/routes, exact expected outputs,
    and non-shallow practical work.
  - Fix plan: Complete Task 041 and Phase 9 matrices before making any
    completeness claim.
  - Status: open.

- ID: DEPLOYED-TUTORIAL-OVERFLOW-2026-05-11.
  - Area: deployed mobile tutorial rendering.
  - Severity: medium.
  - Description: The current live Pages build has horizontal overflow on the
    `LT-DQ-006` mobile route before PR #26.
  - Fix plan: Completed in PR #26; main CI, Pages deployment, live HTTP 200,
    and `bun run verify:deployed-surface` passed after merge.
  - Status: closed.

- ID: PATH-REALIGNMENT-2026-05-10.
  - Area: repository layout and app routes.
  - Severity: medium.
  - Description: Moving implementation tasks to `_development/tasks/` and
    later moving facts to root `facts/` can leave stale links, imports, or
    learner routes.
  - Fix plan: Run path/reference scans and relevant docs/content/app checks in
    every migration PR.
  - Status: open.

- ID: SAFARI-VERIFY-2026-05-10.
  - Area: browser compatibility.
  - Severity: medium.
  - Description: Safari second-browser smoke verification remains open because
    Safari remote automation is not enabled.
  - Fix plan: Ask the user to explicitly enable Safari "Allow remote
    automation" or perform the manual checklist in
    `docs/10-app-quality-browser-qa.md`.
  - Status: open.

- ID: PAGES-E2E-FLAKE-2026-05-11.
  - Area: GitHub Pages local gate.
  - Severity: high.
  - Description: After PR #28 merged, the first Pages workflow failed once in
    the local gate because the responsive route sweep timed out waiting for the
    primary navigation. The same Pages local-gate timeout recurred after PR #29
    merged. After PR #30 merged, Pages failed again in the same broad rendered
    UI route sweep, this time while waiting for the main landmark. The route
    sweep exhausts the global 60s Playwright test timeout on the slower Pages
    runner. PR #33 CI later showed the same broad route sweep could exhaust the
    180s test timeout when all viewport/route combinations ran serially in one
    test.
  - Fix plan: Task 045 gives the route sweep its own 180s timeout and uses
    `domcontentloaded` route navigation readiness while preserving route and
    viewport coverage. PR #31 passed main CI, Pages deployment, live HTTP 200,
    and deployed-surface verification. Task 047 split the broad route sweep into
    one test per viewport, but post-merge main CI still failed on the mobile
    sweep. Task 048 splits the route sweep into one test per route and viewport
    so every hash route starts from a fresh page. PR #34 passed main CI, Pages
    deployment, live HTTP 200, and deployed-surface verification.
  - Status: closed.

- ID: CLAUDE-REVIEW-2026-05-10.
  - Area: phase review gates.
  - Severity: high.
  - Description: Claude CLI formal review is required before any phase can be
    marked complete. Task 034 through Task 040 formal reviews using non-TUI
    `claude --print` hung with no output and were stopped. The Task 041 attempt
    returned `Not logged in · Please run /login`; Task 042 returned the same
    auth blocker, as did Task 043. Task 044 hung with no output for about 40
    seconds and was killed, as did Tasks 046 and 047. Tasks 049, 050, and 051
    hung with no output for about 30 seconds and were killed. Task 054 tried
    `claude -s ...`, but this installed Claude CLI returned `unknown option
'-s'`; the documented `claude --print ...` non-TUI retry returned
    `Not logged in · Please run /login`. Codex CLI non-TUI mode works outside
    the sandbox via `codex exec`; a sandboxed attempt failed to initialize the
    in-process app-server client.
  - Fix plan: Retry only with a known-good non-hanging formal review path, or
    use an explicitly accepted alternate formal review process and record the
    result in continuity docs.
  - Status: open.
