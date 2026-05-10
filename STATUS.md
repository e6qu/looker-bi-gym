# Status

Last updated: 2026-05-10

## Current Branch And PR

- Current branch: `phase-2-content-schema-catalogs`, based on `origin/main`.
- Current PR: #20, `https://github.com/e6qu/looker-bi-gym/pull/20`.
- PR #19, `https://github.com/e6qu/looker-bi-gym/pull/19`, is merged at
  `1484ca1159f494421ab857107ef4d49d017fdd00`.
- Main CI for `1484ca1` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25634668349`.
- GitHub Pages workflow for `1484ca1` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25634668348`.
- Live Pages URL verified HTTP 200 on 2026-05-10:
  `https://e6qu.github.io/looker-bi-gym/`.

## Active Task

Task 034 - Content Schema And Generated Catalogs.

Implemented locally:

- Added typed frontmatter to tutorial Markdown and `docs/facts/` Markdown.
- Moved flashcard authoring to `flashcards/{topic}/` Markdown.
- Moved quiz and exam authoring from YAML to `quizzes/{topic}/` and
  `exams/{topic}/` Markdown.
- Added `app/scripts/generate-content-catalog.ts`.
- Switched app loaders for docs/tutorials/facts, flashcards, quiz banks, and
  exam packs to generated catalog exports.
- Kept generated catalogs ignored and rebuildable from committed sources.

## Open Blockers

- Claude CLI formal review remains blocked. Non-TUI Claude CLI mode works for a
  tiny prompt, but the Task 034 formal review attempt produced no output for
  about one minute and was terminated. Phase 2 is implemented and locally
  verified, but not Claude-reviewed.
- Safari second-browser verification remains open until Safari remote
  automation is explicitly enabled or a manual Safari pass is performed.

## Known Gaps

- Prior curriculum depth claims are still not trusted without deeper human,
  local judge, and Claude review gates.
- Facts still live under `docs/facts/`; the root `facts/` move remains Phase 4.
- Generated catalog validation now checks required metadata, duplicate IDs,
  source facts, quiz/exam learner-task links, and rebuild parity, but generated
  TypeScript remains ignored by design.

## Verification

PR #19 post-merge verification passed on 2026-05-10:

- `gh pr view 19` reported merged at `1484ca1`.
- `gh run list --branch main --limit 5` showed main CI success and GitHub Pages
  deployment success for `1484ca1`.
- `curl -L -I https://e6qu.github.io/looker-bi-gym/` returned HTTP 200.

Task 034 local verification passed on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run typecheck`
- `bun run lint`
- `bun run test:content-qa`
- `bun run test:facts-db`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run test:platform-boundary`
- `bun run test:e2e` after approved local Vite preview binding
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale quiz/exam YAML and hardcoded-flashcard reference scan
- fact-canonical wording scan
- type-safety scan for banned casts/types; hits were existing string literals,
  SQL column names, or `typeof value === "object"` guards, not banned type
  usage
- `git diff --check`

Failed/blocked attempts:

- First sandboxed `bun run test:e2e` failed only because Vite preview could not
  bind `127.0.0.1:4173`; the approved rerun passed.
- First `bun run test:e2e` after the migration found the BI Fundamentals deck no
  longer opened on the expected grain card; fixed by adding authored
  `sort_order` metadata and generated-card ordering.
- Initial Claude CLI review was rejected by escalation policy as an
  external-service data exfiltration risk.
- After explicit user approval, non-TUI `claude --print` worked for a tiny
  prompt, but the Task 034 formal review hung with no output and was stopped.

## Confidence

Medium-high for the local implementation and automated gates. Phase 2 must stay
`implemented locally, not Claude-reviewed` until a permitted formal review path
exists.
