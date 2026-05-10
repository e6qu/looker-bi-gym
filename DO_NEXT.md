# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. If the Phase 2 PR has not been opened yet, push
   `phase-2-content-schema-catalogs` and open it after confirming there is no
   other open PR.
4. If updating this Phase 2 branch, run:

   ```sh
   bun run content:generate
   bun run content:check
   bun run format:check
   bun run typecheck
   bun run lint
   bun run test:content-qa
   bun run test:facts-db
   bun run test:quiz-facts-db
   bun run test:flashcards
   bun run test:platform-boundary
   bun run test:e2e
   bun run check
   git diff --check
   ```

5. Re-run stale scans when content paths change:

   ```sh
   rg -n 'quizzes/bi-foundations-mixed\.yaml|exams/bi-foundations-exam\.yaml|quiz.*YAML|exam.*YAML|hardcoded flashcard|typed YAML loading|loads quiz YAML' README.md docs tutorials _development app/src app/scripts PLAN.md DO_NEXT.md STATUS.md WHAT_WE_DID.md BUGS.md -g '!app/src/generated/**'
   rg -n 'future|canonical|source of truth' PLAN.md STATUS.md DO_NEXT.md BUGS.md WHAT_WE_DID.md docs README.md sources -g '!app/src/generated/**'
   ```

## Review Requirement

Phase 2 is locally implemented but not Claude-reviewed.

The required command shape remains:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

The latest small non-TUI Claude CLI check succeeded, but the Task 034 formal
review hung with no output for about one minute and was terminated. Do not mark
Phase 2 complete until a completed formal review is available and recorded.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.
