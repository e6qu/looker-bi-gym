# Status

Last updated: 2026-05-10

## Current Branch And PR

- Current branch: `phase-4-root-facts-corpus`, based on verified `main`.
- Current PR: #22, `https://github.com/e6qu/looker-bi-gym/pull/22`.
- PR #21, `https://github.com/e6qu/looker-bi-gym/pull/21`, is squash-merged
  at `b65ccdd34578f914462430b29bc3dd124da9a397`.
- Main CI for `b65ccdd` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25635903756`.
- GitHub Pages workflow for `b65ccdd` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25635903780`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.

## Active Task

Task 036 - Root Facts Corpus Migration.

Implemented locally:

- Moved the authored fact corpus from the old nested docs path to root
  `facts/`.
- Updated fact Markdown source links for the new root-relative location.
- Updated catalog generation, content QA, flashcard checks, `facts-db-app`,
  app fact fallbacks, and docs to treat root `facts/` as canonical.
- Kept generated catalogs and generated SQLite outputs ignored and rebuildable.
- Did not expand fact counts in this migration PR; corpus scaling remains a
  follow-up after the path move is stable.

## Open Blockers

- Claude CLI formal review remains blocked. Non-TUI Claude CLI mode works for a
  tiny prompt, but the Task 034 formal review and Task 035 formal review
  attempts, and the Task 036 formal review attempt, produced no output and were
  terminated. Phase 4 path migration is implemented and locally verified, but
  not Claude-reviewed.
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
- Fact corpus expansion toward the Phase 4 target remains open after the root
  path migration is merged and verified.

## Verification

PR #21 post-merge verification passed on 2026-05-10:

- PR #21 was squash-merged at `b65ccdd`.
- `gh run list --branch main --limit 5` showed main CI success and GitHub Pages
  deployment success for `b65ccdd`.
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

Failed/blocked attempts:

- First sandboxed `bun run check` failed only because Vite preview could not
  bind `127.0.0.1:4173`; the approved rerun passed.
- Task 036 Claude CLI formal review was started with
  `claude --print --permission-mode plan --output-format text ...`; it produced
  no output for over 40 seconds and was terminated.

## Confidence

High for the local Phase 4 root-path migration and automated gates. Phase 4
must stay `implemented locally, not Claude-reviewed` until a non-hanging formal
review path exists.
