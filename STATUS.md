# Status

Last updated: 2026-05-11

## Current Branch And PR

- Current branch: `curriculum-completeness-audit`, based on verified `main`.
- Current PR: not opened yet.
- PR #26, `https://github.com/e6qu/looker-bi-gym/pull/26`, is squash-merged
  at `666b964`.
- Main CI for `666b964` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25642213156`.
- GitHub Pages workflow for `666b964` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25642213159`.
- Live Pages URL verified HTTP 200 on 2026-05-11:
  `https://e6qu.github.io/looker-bi-gym/`.
- Deployed learning-surface verifier passed on 2026-05-11:
  `bun run verify:deployed-surface`.
- PR #25, `https://github.com/e6qu/looker-bi-gym/pull/25`, is squash-merged
  at `63aa59fb0791b37c09899ba96a45ba44ec023d2d`.
- Main CI for `63aa59f` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25640123958`.
- GitHub Pages workflow for `63aa59f` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25640123964`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.
- PR #24, `https://github.com/e6qu/looker-bi-gym/pull/24`, is squash-merged
  at `22ff713374382341bbc11474a2501ab9d5325908`.
- Main CI for `22ff713` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25639848973`.
- GitHub Pages workflow for `22ff713` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25639848974`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.
- PR #23, `https://github.com/e6qu/looker-bi-gym/pull/23`, is squash-merged
  at `1ba5fefdb169c74b633b02d6ef0a66014bf96006`.
- Main CI for `1ba5fef` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25639470168`.
- GitHub Pages workflow for `1ba5fef` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25639470188`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.
- PR #22, `https://github.com/e6qu/looker-bi-gym/pull/22`, is squash-merged
  at `9e9e709ff76eb90f21f837a3d0c2570200c34d7a`.
- Main CI for `9e9e709` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25636257713`.
- GitHub Pages workflow for `9e9e709` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25636257725`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.

## Active Task

Task 041 - Curriculum Completeness Audit.

Current state:

- PR #23 added the first Phase 4 fact expansion batch and was verified on main.
- PR #24 added the first Phase 5 assessment expansion batch and was verified on
  main.
- PR #25 added the first Phase 6 tutorial/challenge expansion batch and was
  verified on main.
- PR #26 added the Phase 7 learning-surface verifier and was verified on main,
  Pages, live URL, and deployed surface.
- Started Task 041 on branch `curriculum-completeness-audit`.
- Added `docs/17-curriculum-completeness-matrix.md` with first-pass inventory,
  competency, tutorial, assessment, source-verification, and rewrite-gate
  matrices.
- Task 041 confirms the curriculum is not complete: current inventory is 10
  top-level tutorials, 6 self-contained learner tasks, 6 released challenges,
  59 flashcards, 14 quiz questions, 4 exam cards, and 185 unique fact IDs.
- Added rewrite tickets for the tutorial spine and rewrote
  `tutorials/01-connect-public-data.md` as the first self-contained repair with
  browser SQL, expected outputs, optional BigQuery setup SQL, optional Looker
  Studio checks, recovery checks, and an end challenge.
- Removed visible raw `FACT-*` source IDs and repo/app implementation phrasing
  from scanned tutorial, learner-task, recipe, orientation-challenge, and
  flashcard deck wording while keeping source links in typed metadata.
- Local Task 041 checks now pass, including `bun run check` after approved
  local Vite preview binding.

Task 040 summary:

- Implemented and merged:
  - added `bun run verify:deployed-surface`;
  - fixed mobile Markdown overflow for wide tutorial code/tables;
  - added stricter visible learner-facing content QA;
  - cleaned self-referential quiz/challenge/flashcard/exam wording;
  - added `docs/15-learning-surface-walkthrough.md`;
  - added `docs/16-curriculum-critical-review.md`;
  - added Task 041 as the next curriculum-completeness audit.

## Open Blockers

- Claude CLI formal review remains blocked. The Task 041 formal review attempt
  used non-TUI `claude --print --permission-mode plan --output-format text ...`
  and returned `Not logged in · Please run /login`. Task 040 hung with no
  output for about one minute and was killed; Tasks 034-039 also had formal
  Claude review attempts hang with no output. Do not mark any phase complete
  until a completed formal review is recorded.
- Codex CLI non-TUI mode works: `codex -a never exec --ephemeral --sandbox
read-only --json "Reply exactly: codex-cli-ok"` returned `codex-cli-ok`.
- Safari second-browser verification remains open until Safari remote
  automation is explicitly enabled or a manual Safari pass is performed.

## Known Gaps

- Prior curriculum depth claims are still not trusted without deeper human,
  local judge, and Claude review gates.
- `PLAN.md` now defines Phase 9 as the required gate for any
  complete/comprehensive/reality-verified/externally verified curriculum claim.
- Generated catalog validation now checks required metadata, duplicate IDs,
  source facts, quiz/exam learner-task links, and rebuild parity, but generated
  TypeScript remains ignored by design.
- Fact corpus expansion toward the Phase 4 500-fact target remains open; PR #23
  is only the first stable expansion batch.
- Phase 5 expansion toward 500 flashcards, 200 quiz questions, and 30 exam
  cards remains open; Task 038 is only a first assessment-content batch.
- Task 041 is required before any curriculum-completeness claim. Current
  tutorials, questions, flashcards, and exams are not complete or comprehensive.

## Verification

PR #22 post-merge verification passed on 2026-05-10:

- PR #22 was squash-merged at `9e9e709`.
- `gh run list --branch main --limit 5` showed main CI success and GitHub Pages
  deployment success for `9e9e709`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.

PR #23 post-merge verification passed on 2026-05-10:

- PR #23 was squash-merged at `1ba5fef`.
- `gh run watch 25639470168` showed main CI success for `1ba5fef`.
- `gh run watch 25639470188` showed GitHub Pages deployment success for
  `1ba5fef`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
  `last-modified: Sun, 10 May 2026 20:53:44 GMT`.

PR #24 post-merge verification passed on 2026-05-10:

- PR #24 was squash-merged at `22ff713`.
- `gh run watch 25639848973` showed main CI success for `22ff713`.
- `gh run watch 25639848974` showed GitHub Pages deployment success for
  `22ff713`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
  `last-modified: Sun, 10 May 2026 21:11:23 GMT`.

PR #25 post-merge verification passed on 2026-05-10:

- PR #25 was squash-merged at `63aa59f`.
- `gh run watch 25640123958` showed main CI success for `63aa59f`.
- `gh run watch 25640123964` showed GitHub Pages deployment success for
  `63aa59f`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
  `last-modified: Sun, 10 May 2026 21:24:25 GMT`.

PR #26 post-merge verification passed on 2026-05-11:

- PR #26 was squash-merged at `666b964`.
- `gh run watch 25642213156` showed main CI success for `666b964`.
- `gh run watch 25642213159` showed GitHub Pages deployment success for
  `666b964`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200 with
  `last-modified: Sun, 10 May 2026 23:04:52 GMT`.
- `bun run verify:deployed-surface` passed against the live Pages URL.

Task 040 local verification passed on 2026-05-11:

- `bun run content:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run test:e2e` after approved local Vite preview binding
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- `DEPLOYED_BASE_URL=http://127.0.0.1:4174/ bun run verify:deployed-surface`
  against patched local preview
- `git diff --check`

Task 040 blocked review:

- Claude CLI formal review hung with no output and was killed; Task 040 is not
  Claude-reviewed.

Task 041 local verification so far:

- Inventory commands for tutorials, challenges, flashcards, quizzes, exams,
  facts, and source cards.
- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- stale scan for learner-facing repo/app/source-fact implementation wording in
  tutorials, quizzes, flashcards, exams, and challenge manifests
- `git diff --check`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing

Task 041 blocked review:

- Claude CLI formal review in non-TUI `--print` mode returned
  `Not logged in · Please run /login`; Task 041 is not Claude-reviewed.

Task 036 local verification passed on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:content-qa`
- `bun run test:flashcards`
- `bun run test:quiz-facts-db`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for old fact path/future-canonical wording in current docs, app,
  source, and content paths

Task 037 local verification passed on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for old fact path and unsupported completeness claims
- `git diff --check`

Task 038 local verification passed on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for unsupported completeness claims
- `git diff --check`

Task 039 local verification passed on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for unsupported completeness claims
- `git diff --check`

Failed/blocked attempts:

- First sandboxed `bun run check` failed only because Vite preview could not
  bind `127.0.0.1:4173`; the approved rerun passed.
- Task 036 Claude CLI formal review was started with
  `claude --print --permission-mode plan --output-format text ...`; it produced
  no output for over 40 seconds and was terminated.
- Task 037 Claude CLI formal review used the same non-TUI command shape,
  produced no output for over 40 seconds, and was terminated.
- Task 038 Claude CLI formal review used the same non-TUI command shape,
  produced no output for about 50 seconds, and was terminated.
- Task 039 Claude CLI formal review used the same non-TUI command shape,
  produced no output for about 50 seconds, and was terminated.

## Confidence

High for the local Phase 4 root-path migration, first fact expansion batch,
Task 038 assessment expansion batch, Task 039 tutorial/challenge expansion
batch, and automated gates. Task 040 is not started beyond task setup. Phase 4,
Phase 5, and Phase 6 must stay `implemented, not Claude-reviewed` until a
non-hanging formal review path exists.
