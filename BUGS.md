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
- Status: open; specification pinned on 2026-05-10.

## Follow-Up Verification Gaps

- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Post-merge Pages deployment for PR #5 passed on 2026-05-10, and `https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.
- Complete Safari second-browser verification for Task 013. `safaridriver` is installed with Safari 26.1, but Safari's persistent "Allow remote automation" setting is disabled. Enabling it requires explicit user authorization because it changes a persistent browser security setting. The manual checklist lives in `docs/10-app-quality-browser-qa.md`.
- Task 024 full `bun run check` verification passed locally on 2026-05-10 after the user approved Playwright/Vite local port binding; it passed again after the PR #6 real-estate collateral and manual LLM workbench expansion.
- Post-merge PR #6 GitHub Actions and GitHub Pages deployment passed for merge
  commit `1da6272efb1c219bfcdf8981e4014af4b4a899e4`, and the deployed Pages URL
  returned HTTP 200 on 2026-05-10. A browser-rendered smoke pass of the new
  lending challenge route remains optional follow-up if needed.
- JSON import is planned but not implemented. Current Settings supports JSON
  export and reset only. Future import must stay browser-local and validate the
  `looker-bi-gym.progress-export.v1` structure before applying state.

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
