# Bugs

No known app bugs after the Bun-only tooling, typed config, formatting, rendered UI, and automated check passes.

## Known Content Defects

- ID: CONTENT-2026-05-09-001.
- Date found: 2026-05-09.
- Area: tutorials and quiz content.
- Severity: medium.
- Description: The released tutorial materials and some quiz prompts are too generic; they do not yet provide enough step-by-step instruction or fact-backed questions tied to source legislation/product documentation.
- Expected behavior: Tutorials guide the learner through exact actions, expected checkpoints, failure modes, and source fact IDs; quiz questions test concrete facts from source legislation, technology docs, instruction docs, or synthetic dataset outputs.
- Actual behavior: The current materials include useful scaffolding, but several tutorial pages are outlines and the orientation quiz mostly checks project rules.
- Reproduction steps: Read `tutorials/00-orientation-and-stack.md` and `challenges/manifests/orientation-quiz.yaml`.
- Suspected cause: Early tasks prioritized runtime, verification, and platform boundaries before full instructional depth.
- Fix plan: Complete Tasks 020, 021, and 022.
- Status: fixed by Tasks 020, 021, and 022; local `bun run check` and PR #3 CI pass.

- ID: CONTENT-2026-05-10-002.
- Date found: 2026-05-10.
- Area: tutorial structure, quiz structure, visualization, and exam model.
- Severity: medium.
- Description: The next curriculum shape is not yet implemented as area-grouped
  15-20 minute learner tasks with explicit objectives,
  checkpoints, visualization/reporting actions, self-assessment, and end
  challenges. There is also not yet a separate quiz-bank format, recipe section,
  or exam-card model.
- Expected behavior: Tutorials are organized into areas and complete tasks for a
  data analyst moving into BI and banking; each task has an objective,
  step-by-step actions, verification, visualization/reporting, self-assessment,
  and a CTF-style end challenge. Quiz content is separate from challenge
  manifests, answerable in about 20 minutes, grouped by easy/medium/hard, and
  links to recommended learner tasks. Recipes live after tutorials and exam
  mode is represented as untimed independent challenge cards.
- Actual behavior: Existing tutorials and challenge lesson steps are useful but
  do not yet implement the agreed learner-task pack, quiz-bank, recipe, and
  exam-card model.
- Reproduction steps: Read `PLAN.md`, `tutorials/`, and
  `challenges/manifests/`; there is no structured `tutorials/tasks/` or
  `quizzes/` model yet and no in-app SQL result visualization panel.
- Suspected cause: Earlier work focused on datasets, browser SQL grading,
  source facts, and challenge manifests before settling the learning-product
  structure.
- Fix plan: Continue PR #6 with the Task 025 implementation slice recorded in
  `DO_NEXT.md` and `tasks/025-real-tutorial-instruction-packs.md`.
- Status: fixed by Task 025 on the open PR #8 branch. Added real learner-task
  packs, separate quiz/exam content, a Looker Studio recipe, SQL result
  visualization, content QA, and Playwright coverage; `bun run check` passed on
  2026-05-10.

## Follow-Up Verification Gaps

- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Post-merge Pages deployment for PR #5 passed on 2026-05-10, and `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Complete Safari second-browser verification for Task 013. `safaridriver` is installed with Safari 26.1, but Safari's persistent "Allow remote automation" setting is disabled. Enabling it requires explicit user authorization because it changes a persistent browser security setting. The manual checklist lives in `docs/10-app-quality-browser-qa.md`.
- Task 024 full `bun run check` verification passed locally on 2026-05-10 after the user approved Playwright/Vite local port binding; it passed again after the PR #6 real-estate collateral and manual LLM workbench expansion.
- Post-merge PR #6 GitHub Actions and GitHub Pages deployment passed for merge
  commit `1da6272efb1c219bfcdf8981e4014af4b4a899e4`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10. A browser-rendered smoke pass of the new
  lending challenge route remains optional follow-up if needed.
- Post-merge PR #7 GitHub Actions and GitHub Pages deployment passed for merge
  commit `954a128fd65b2b117b5fe23a3295c722cd6ae3f5`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10.
- Post-merge PR #8 GitHub Actions and GitHub Pages deployment passed for merge
  commit `5db7663ee0d76be809cb383a4dfeb4390eb5ed6f`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10.
- Task 025 full `bun run check` verification passed locally on 2026-05-10 after
  the user approved Playwright/Vite local port binding. Initial focused
  Playwright verification caught an incorrect expected EUR/RON latest-balance
  split in the new learner-task docs; the expected values were corrected to
  `EUR = 16400` and `RON = 79300`.
- Task 026 full `bun run check` verification passed locally on 2026-05-10 after
  the user approved Playwright/Vite local port binding. The browser-config
  metric-contract path now has unit, fixture, derived-expectation, content QA,
  type/lint, Playwright, and production-build coverage.
- Post-merge PR #10 GitHub Actions and GitHub Pages deployment passed for merge
  commit `cf8a6bd6b6bb4353bf2f5a15a59e0a4c031d5d59`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10. A manual deployed UI click-through covered
  home desktop/mobile, challenge catalog, metric-contract completion,
  learner-task pages, browser-SQL completion, cloud-evidence completion, and
  Settings export/reset surfaces. Screenshots are stored locally under ignored
  `screenshots/post-merge-pr10/`.
- During the PR #10 manual review, `LT-DQ-005` expected 13 snapshot rows and 6
  latest rows, but the committed lending CSV has 11 snapshot rows and 5 latest
  rows. The follow-up branch corrects the learner-facing checkpoint and table.
- Post-merge PR #11 GitHub Actions and GitHub Pages deployment passed for merge
  commit `bd0be4505958f2e33706169dc7816096c7abc617`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10.
- The `ci-ui-warning-checks` branch adds a Playwright diagnostics guard for
  browser console warnings, browser console errors, page errors, and failed
  network requests. Local `bun run test:e2e` and full `bun run check` passed on
  2026-05-10, and no such diagnostics were found in the covered rendered flows.
- Post-merge PR #12 GitHub Actions and GitHub Pages deployment passed for merge
  commit `3edd840e1c749a453f2834d8684211069dceae1d`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10.
- PR #13 adds SQLite-backed quiz fact grounding and app-rendered quiz/exam/fact
  graph surfaces. PR #13 merged at
  `f0deb549a3601559ffc1a6f81e386f95c5b36702`; main CI and Pages deployment
  passed, and the live Pages URL returned HTTP 200 on 2026-05-10.
- Task 030 workbench verification exposed two issues before they reached a PR:
  uncast DuckDB date output rendered as a numeric timestamp in the SQL result
  table, and one Playwright selector matched duplicate workbench table buttons.
  The tutorial queries now cast displayed date values to `VARCHAR`, and the test
  selector is exact. `bun run test:e2e` then passed with all 11 rendered UI
  tests. Full `bun run check` passed on 2026-05-10 after approved local
  Playwright/Vite preview port binding.
- Post-merge PR #14 GitHub Actions and GitHub Pages deployment passed for merge
  commit `add376a9b6766871a6b46ed574c547fb322c21e7`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10.
- Task 031 focused verification passed for typecheck, lint, progress
  export/import unit tests, Playwright rendered UI import flow,
  platform-boundary checks, and full `bun run check` after approved local
  Playwright/Vite preview port binding.

## Template

When adding a bug, include:

- ID.
- Date found.
- Area.
- Severity.
- Description.
- Expected behavior.
- Actual behavior.
- Reproduction steps.
- Suspected cause.
- Fix plan.
- Status.
