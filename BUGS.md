# Bugs And Known Gaps

Last updated: 2026-05-10

## Open Issues

- ID: CONTENT-QUALITY-2026-05-10.
  - Area: tutorials, quizzes, exams, flashcards, and facts.
  - Severity: high.
  - Description: Prior claims that curriculum content is complete, real,
    comprehensive, or fact-backed are not trusted until deeper automation,
    human review, local judge review, and Claude CLI review pass.
  - Fix plan: Apply the staged realignment plan in `PLAN.md` and keep explicit
    acceptance notes per phase.
  - Status: open.

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

- ID: CLAUDE-REVIEW-2026-05-10.
  - Area: phase review gates.
  - Severity: high.
  - Description: Claude CLI formal review is required before any phase can be
    marked complete. Non-TUI `claude --print` works for a tiny prompt, but the
    Task 034, Task 035, Task 036, Task 037, and Task 038 formal reviews hung
    with no output and were stopped.
  - Fix plan: Retry only with a known-good non-hanging formal review path, or
    use an explicitly accepted alternate formal review process and record the
    result in continuity docs.
  - Status: open.
