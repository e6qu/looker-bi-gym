# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue Task 042 on branch `tutorial-spine-repair-batch-1`; no PR is open
   yet.
4. Next useful implementation step: commit Task 042, push, open a PR, watch CI,
   and squash-merge if CI passes.
5. If updating this branch before PR creation or after rebasing, rerun:

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

6. Before opening the next PR, confirm there is still no open PR. Before
   merging it, fetch `origin/main`, rebase the branch on `origin/main`, verify
   CI is passing, and then squash-merge.
7. After merge, verify main CI, GitHub Pages deployment, and the live Pages URL
   before moving on.

## Review Requirement

Phase 4 root-path migration and Task 037 fact expansion batch 1 are merged,
deployed, and main-verified, but not Claude-reviewed. The Task 037 formal
review attempt also hung with no output and was terminated.

Task 038 assessment expansion batch 1 is merged, deployed, and main-verified,
but not Claude-reviewed. It adds 10 flashcards, 6 quiz questions, 2 exam cards,
and guardrails for at least 59 flashcards, 14 quiz questions, and 4 exam cards.

Task 039 tutorial/challenge expansion batch 1 is merged, deployed, and
main-verified, but not Claude-reviewed. It adds `LT-DQ-006 - Define A Ratio
Null Contract`.

Task 040 learning surface verification is merged, main-verified,
Pages-verified, and live deployed-surface verified, but not Claude-reviewed.
Task 041 curriculum completeness audit is merged, main-verified,
Pages-verified, and live deployed-surface verified, but not Claude-reviewed.
Task 042 tutorial spine repair batch 1 is active.

`PLAN.md` Phase 9 now defines the required gate for any claim that tutorials,
questions, exams, or flashcards are complete, comprehensive, reality-verified,
or externally verified.

The required command shape remains:

```sh
claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"
```

The latest Task 041 formal Claude CLI review ran in non-TUI mode but returned
`Not logged in · Please run /login`; Task 042 returned the same auth blocker.
The previous Task 040 review hung with no output and was killed. Codex CLI
non-TUI mode works via `codex exec`; Claude CLI formal review does not
currently complete. Do not mark Phase 2, Phase 3, Phase 4, Phase 5, Phase 6,
Phase 7, or Phase 9 complete until a completed formal review is available and
recorded.

## PR Discipline

- Keep exactly one working PR open unless the user explicitly asks otherwise.
- Never push directly to `main`.
- Before creating a PR, check for existing open PRs.
- Before merging, fetch `origin/main`, rebase the PR branch on top of it, and
  merge only after CI passes on the rebased branch.
- After merge, verify main CI, GitHub Pages deployment, and the live Pages URL.
