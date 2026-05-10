# Status

Last updated: 2026-05-10

## Current Branch And PR

- Current branch: `phase-4-fact-corpus-expansion`, based on verified `main`.
- Current PR: #23, `https://github.com/e6qu/looker-bi-gym/pull/23`.
- PR #22, `https://github.com/e6qu/looker-bi-gym/pull/22`, is squash-merged
  at `9e9e709ff76eb90f21f837a3d0c2570200c34d7a`.
- Main CI for `9e9e709` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25636257713`.
- GitHub Pages workflow for `9e9e709` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25636257725`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.

## Active Task

Task 037 - Fact Corpus Expansion.

Current state:

- PR #22 moved the corpus to root `facts/` and was verified on main.
- Added the first Task 037 source-backed fact expansion batch locally:
  - 4 BigQuery SQL facts for `SAFE_DIVIDE`, `SAFE_CAST`, and `QUALIFY`;
  - 4 Looker Studio facts for data freshness, memory, BigQuery refresh cost,
    and blended-source freshness.
- Added 4 official Google Cloud source cards accessed on 2026-05-10.
- Fact database guardrails now require at least 50 source cards and 109
  executable fact cards.

## Open Blockers

- Claude CLI formal review remains blocked. Non-TUI Claude CLI mode works for a
  tiny prompt, but the Task 034 formal review and Task 035 formal review
  attempts, plus the Task 036 and Task 037 formal review attempts, produced no
  output and were terminated. Phase 4 path migration and the first fact
  expansion batch are implemented and locally verified, but not
  Claude-reviewed.
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

## Verification

PR #22 post-merge verification passed on 2026-05-10:

- PR #22 was squash-merged at `9e9e709`.
- `gh run list --branch main --limit 5` showed main CI success and GitHub Pages
  deployment success for `9e9e709`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.

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

Failed/blocked attempts:

- First sandboxed `bun run check` failed only because Vite preview could not
  bind `127.0.0.1:4173`; the approved rerun passed.
- Task 036 Claude CLI formal review was started with
  `claude --print --permission-mode plan --output-format text ...`; it produced
  no output for over 40 seconds and was terminated.
- Task 037 Claude CLI formal review used the same non-TUI command shape,
  produced no output for over 40 seconds, and was terminated.

## Confidence

High for the local Phase 4 root-path migration, first expansion batch, and
automated gates. Phase 4 must stay `implemented locally, not Claude-reviewed`
until a non-hanging formal review path exists.
