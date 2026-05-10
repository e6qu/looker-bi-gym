# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue Task 037 on `phase-4-fact-corpus-expansion`; no PR is open yet.
4. Add the first stable source-backed fact expansion batch, then run:

   ```sh
   bun run content:generate
   bun run content:check
   bun run format:check
   bun run typecheck
   bun run lint
   bun run test:facts-db
   bun run facts:build-db
   bun run test:content-qa
   bun run test:flashcards
   bun run test:quiz-facts-db
   bun run test:platform-boundary
   bun run validate:static-links
   bun run check
   git diff --check
   ```

5. Before opening the next PR, confirm there is still no open PR. Before
   merging it, fetch `origin/main`, rebase the branch on
   `origin/main`, verify CI is passing, and then squash-merge.
6. After merge, verify main CI, GitHub Pages deployment, and the live Pages URL
   before moving on.

## Review Requirement

Phase 4 root-path migration is merged and main-verified, but not
Claude-reviewed. Task 037 fact expansion is not started.

`PLAN.md` Phase 9 now defines the required gate for any claim that tutorials,
questions, exams, or flashcards are complete, comprehensive, reality-verified,
or externally verified.

The required command shape remains:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

The latest small non-TUI Claude CLI check succeeded, but the Task 034 formal
review, Task 035 formal review, and Task 036 formal review hung with no output
and were terminated. Do not mark Phase 2, Phase 3, or the Phase 4 path
migration complete until a completed formal review is available and recorded.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.
