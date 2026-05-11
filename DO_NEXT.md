# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue PR #41 on branch `remove-tutorial-evidence-basis`:
   `https://github.com/e6qu/looker-bi-gym/pull/41`.
4. Wait for PR #41 CI. If it fails, fix failures on the same branch and rerun
   relevant local checks.
5. Before merging, fetch
   `origin/main`, rebase the branch on top of it, and merge only after CI passes
   on the rebased branch.
6. After merge, verify main CI, GitHub Pages deployment, live HTTP 200, and
   `bun run verify:deployed-surface` before starting another implementation PR.

## Verification To Preserve

Task 056 focused verification has passed:

```sh
bun run content:generate
bun run content:check
bun run format:check
bun run test:content-qa
bun run validate:static-links
bun run typecheck
bun run lint
bun run check
git diff --check
```

Stale scan:

```sh
rg -n "Evidence Basis" tutorials app/scripts/test-content-qa.ts
```

The scan returned no matches.

## Review Requirement

Do not mark Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, or Phase 9
complete until a completed formal review is available and recorded.

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
