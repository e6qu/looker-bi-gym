# Bugs And Known Gaps

Last updated: 2026-05-17 (post-Codex review remediation, full sweep)

## Open Issues

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
