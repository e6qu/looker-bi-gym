# Bugs And Known Gaps

Last updated: 2026-05-16

## Open Issues

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
