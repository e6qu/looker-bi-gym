# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue PR #44 on branch `terminology-grounding-glossary`:
   `https://github.com/e6qu/looker-bi-gym/pull/44`.
4. Wait for PR CI. If it fails, fix failures on the same branch and rerun
   relevant local checks.
5. Before merging, fetch `origin/main`, rebase the branch on top of it, and
   merge only after CI passes on the rebased branch.
6. After merge, verify main CI, GitHub Pages deployment, live HTTP 200, and
   `bun run verify:deployed-surface` before starting another implementation PR.

## Verification To Preserve

Task 058 focused verification has passed:

```sh
bun run content:generate
bun run content:check
bun run format:check
bun run test:content-qa
bun run test:quiz-facts-db
bun run validate:static-links
bun run typecheck
bun run lint
bun run test:e2e
bun run check
```

Stale scans:

```sh
rg -n "this repo|this repository|repo structure|source file in the repository|generated catalog|implementation task|training workflow|course source register|Evidence Basis|Source evidence|Recommended learner tasks" quizzes/bi-foundations/bi-foundations-mixed.md tutorials/quiz-bank.md
rg -n "this repo|this repository|repo structure|source file in the repository|generated catalog|implementation task|training workflow|course source register|Evidence Basis|Source evidence|Recommended learner tasks|FACT-[A-Z0-9-]+|LT-[A-Z]+-[0-9]{3}" tutorials/quiz-bank.md app/tests/rendered-ui.spec.ts app/scripts/verify-deployed-learning-surface.ts
rg -n "you are asked to|before writing|which source grain must be stated|complete the quiz|answer the quiz|quiz question|course material|curriculum page" quizzes/bi-foundations app/tests/rendered-ui.spec.ts app/scripts/verify-deployed-learning-surface.ts tutorials/quiz-bank.md
```

The Task 058 course-scaffolded quiz wording scan returned no matches.

PR #43 post-merge verification passed:

- Main CI for `81d4c3d`:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680564739`.
- GitHub Pages workflow for `81d4c3d`:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680562973`.
- Live Pages URL returned HTTP 200 with
  `last-modified: Mon, 11 May 2026 15:45:25 GMT`.
- `bun run verify:deployed-surface` passed against the deployed site.

Task 059 focused verification has passed:

```sh
bun run content:generate
bun run content:check
bun run format:check
bun run test:content-qa
bun run validate:static-links
bun run typecheck
bun run lint
bun run test:e2e
bun run check
```

Task 059 notes:

- The terminology pages are domain/platform references, not a schema-only
  glossary.
- They do not include app-specific training table or column entries.
- Term entries use examples and cross-links with compact domain hints.

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
