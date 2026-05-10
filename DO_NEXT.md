# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue Phase 3 PR #21:
   `https://github.com/e6qu/looker-bi-gym/pull/21`.
4. If updating this branch, run:

   ```sh
   bun run format:check
   bun run typecheck
   bun run lint
   bun run test:facts-db
   bun run facts:build-db
   bun run test:quiz-facts-db
   bun run test:llm-workbench
   bun run test:platform-boundary
   bun run check
   git diff --check
   ```

5. Before merging PR #21, fetch `origin/main`, rebase the branch on
   `origin/main`, verify CI is passing, and then squash-merge.
6. After merge, verify main CI, GitHub Pages deployment, and the live Pages URL
   before starting Phase 4.

## Review Requirement

Phase 3 is locally implemented but not Claude-reviewed.

`PLAN.md` Phase 9 now defines the required gate for any claim that tutorials,
questions, exams, or flashcards are complete, comprehensive, reality-verified,
or externally verified.

The required command shape remains:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

The latest small non-TUI Claude CLI check succeeded, but the Task 034 formal
review and Task 035 formal review hung with no output and were terminated. Do
not mark Phase 2 or Phase 3 complete until a completed formal review is
available and recorded.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.
