# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue PR #40 on branch `looker-bigquery-corpus-expansion`:
   `https://github.com/e6qu/looker-bi-gym/pull/40`.
4. Wait for PR #40 CI. If it fails, fix failures on the same branch and rerun
   the relevant local checks.
5. Before merging, fetch `origin/main`, rebase the branch on top of it, and
   merge only after CI passes on the rebased branch.
6. After merge, verify main CI, GitHub Pages deployment, live HTTP 200, and
   `bun run verify:deployed-surface` before starting another implementation PR.

## Verification To Preserve

Task 055 local verification has passed:

```sh
bun run content:generate
bun run content:check
bun run format:check
bun run test:content-qa
bun run validate:static-links
bun run typecheck
bun run lint
bun run test:facts-db
bun run test:flashcards
bun run test:quiz-facts-db
bun run test:platform-boundary
bun run test:e2e
bun run verify:deployed-surface
bun run check
git diff --check
```

Also preserve stale scans proving the new and repaired learner-facing content
does not expose implementation scaffolding:

```sh
rg -n "BI training evidence|CTF|training workflow|this website|this page|this repo|this repository|generated catalog|implementation task|Source Facts|Recommended learner tasks" tutorials quizzes exams flashcards
rg -n "#/challenges|Capture the local flag" tutorials/learner-tasks quizzes exams flashcards
```

Both scans returned no matches for the checked surfaces.

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
