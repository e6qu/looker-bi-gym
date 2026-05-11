# Bugs And Known Gaps

Last updated: 2026-05-11

## Open Issues

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
