# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue PR #45 on branch `terminology-integrity-checks`:
   `https://github.com/e6qu/looker-bi-gym/pull/45`. The PR covers Phase 10.1
   through 10.6 by user direction.
4. Wait for PR CI. If it fails, fix failures on the same branch and rerun
   relevant local checks.
5. Before merging, fetch `origin/main`, rebase the branch on top of it, and
   merge only after CI passes on the rebased branch.
6. After merge, verify main CI, GitHub Pages deployment, live HTTP 200, and
   `bun run verify:deployed-surface` before starting another implementation
   PR.

## Phase 10 Follow-On Sequencing

After PR #45 merges, take the remaining Phase 10 work one PR at a time:

1. Renderer support for inline `class="termRef"` markers in YAML-bound
   surfaces (quiz prompts/explanations, flashcard front/back, exam card
   statements, fact statements, challenge instructions).
2. Continued inline grounding for tutorials and regulations flagged in
   `_development/terminology-coverage.md` under "Mentioned In Prose But
   Not Inline-Grounded".
3. Decision pass on the 53 uncovered entries (ground inline, retire, or
   accept as future-coverage).
4. Deepen Phase 10.2 citations: replace vendor or regulator landing pages
   with specific deep links where a stable URL is known.

## Verification To Preserve

Task 060 focused verification:

```sh
bun run validate:terminology
bun run coverage:terminology
bun run content:generate
bun run content:check
bun run format:check
bun run test:content-qa
bun run validate:static-links
bun run typecheck
bun run lint
bun run test:e2e
```

The full local gate is `bun run check`, which now includes
`validate:terminology` and runs Playwright via `bun run test:e2e`.

PR #43 post-merge verification passed:

- Main CI for `81d4c3d`:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680564739`.
- GitHub Pages workflow for `81d4c3d`:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680562973`.
- Live Pages URL returned HTTP 200 with
  `last-modified: Mon, 11 May 2026 15:45:25 GMT`.
- `bun run verify:deployed-surface` passed against the deployed site.

PR #44 was squash-merged at `d88acc7` on 2026-05-12. Pages and
`verify:deployed-surface` against `d88acc7` are not re-verified this session;
do that before opening the next PR after PR #45 merges.

## Review Requirement

Do not mark Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 9,
or Phase 10 complete until a completed formal review is available and
recorded.

The required Claude CLI command shape remains:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

The latest Task 054 attempts showed that `claude -s` is unsupported by this
installed CLI and `claude --print ...` returned `Not logged in · Please run
/login`. Codex CLI non-TUI mode works outside the sandbox via `codex exec`.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.
