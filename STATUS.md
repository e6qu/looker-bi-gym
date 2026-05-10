# Status

Last updated: 2026-05-10

## Current Branch And PR

- Current branch: `phase-3-facts-db-app`, based on verified `main`.
- Current PR: not opened yet.
- PR #20, `https://github.com/e6qu/looker-bi-gym/pull/20`, is squash-merged
  at `1539350e05f58de84ac94db4c44e6c0702f83a6e`.
- Main CI for `1539350` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25635516954`.
- GitHub Pages workflow for `1539350` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25635516950`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.

## Active Task

Task 035 - Facts DB App Workspace.

Implemented locally:

- Added the top-level Bun workspace package `facts-db-app`.
- Moved the fact database parser/builder and its tests out of `app/scripts/`
  into `facts-db-app/src/` and `facts-db-app/tests/`.
- Kept the package CLI/library only; no web UI, backend, credentials, or
  learner-required tooling was added.
- Routed `test:facts-db` and `facts:build-db` through the workspace package.
- Updated app-side LLM workbench and quiz fact-grounding scripts to import the
  fact database library from `facts-db-app`.
- Updated root `typecheck` and `check` so the new package typechecks before app
  verification.

## Open Blockers

- Claude CLI formal review remains blocked. Non-TUI Claude CLI mode works for a
  tiny prompt, but the Task 034 formal review and Task 035 formal review
  attempts produced no output and were terminated. Phase 3 is implemented and
  locally verified, but not Claude-reviewed.
- Safari second-browser verification remains open until Safari remote
  automation is explicitly enabled or a manual Safari pass is performed.

## Known Gaps

- Prior curriculum depth claims are still not trusted without deeper human,
  local judge, and Claude review gates.
- `PLAN.md` now defines Phase 9 as the required gate for any
  complete/comprehensive/reality-verified/externally verified curriculum claim.
- Facts still live under `docs/facts/`; the root `facts/` move remains Phase 4.
- Generated catalog validation now checks required metadata, duplicate IDs,
  source facts, quiz/exam learner-task links, and rebuild parity, but generated
  TypeScript remains ignored by design.
- Facts still live under `docs/facts/`; moving them to root `facts/` remains
  Phase 4.

## Verification

PR #20 post-merge verification passed on 2026-05-10:

- PR #20 was squash-merged at `1539350`.
- `gh run list --branch main --limit 5` showed main CI success and GitHub Pages
  deployment success for `1539350`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.

Task 035 local verification passed on 2026-05-10:

- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:quiz-facts-db`
- `bun run test:llm-workbench`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing

Failed/blocked attempts:

- First sandboxed `bun run check` failed only because Vite preview could not
  bind `127.0.0.1:4173`; the approved rerun passed.
- Task 035 Claude CLI formal review was started with
  `claude --print --permission-mode plan --output-format text ...`; it produced
  no output for over 40 seconds and was terminated.

## Confidence

High for the local Phase 3 implementation and automated gates. Phase 3 must
stay `implemented locally, not Claude-reviewed` until a non-hanging formal
review path exists.
