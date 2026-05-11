# What We Did

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
