# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm the current branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. If continuing this realignment PR, inspect:
   - `README.md`
   - `docs/14-platform-components.md`
   - `sources/README.md`
   - `challenges/AUTHORING.md`
   - `app/scripts/llm-question-workbench.ts`

4. Run verification before opening or updating the PR:

   ```sh
   bun run format:check
   bun run test:content-qa
   bun run test:facts-db
   bun run test:platform-boundary
   rg -n '(^|[^A-Za-z0-9_-])tasks/' -g '!node_modules' -g '!app/dist'
   rg -n 'future|canonical|source of truth' PLAN.md STATUS.md DO_NEXT.md BUGS.md WHAT_WE_DID.md docs README.md sources
   git diff --check
   ```

5. Run `bun run check` if path or app behavior changed beyond docs/scripts.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.

## Review Requirement

Each phase needs Claude CLI formal review before continuity may call it
complete:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

If Claude CLI hangs, is unavailable, or cannot authenticate, record the phase as
`blocked` or `implemented but not Claude-reviewed`.
