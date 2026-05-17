# Do Next

## First Steps For The Next Session

1. Read `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`,
   `AGENTS.md`, and [\_development/tasks/README.md](_development/tasks/README.md).
2. Confirm branch and PR state:

   ```sh
   git status --short --branch
   gh pr list --state open --limit 10
   ```

3. Continue PR #46 on branch `assessment-quality-and-expansion`:
   `https://github.com/e6qu/looker-bi-gym/pull/46`. PR #45 merged at
   `4e26667` on 2026-05-16. The current PR carries Task 062 (Assessment
   Quality And Expansion) plus the Codex CLI second-opinion remediation
   (recorded as `CODEX-REVIEW-FINDINGS-2026-05-17` and
   `CODEX-RE-REVIEW-FINDINGS-2026-05-17` in `BUGS.md`).
4. If the current branch is clean and all fixes from the BUGS.md codex
   entries are closed, request another `codex exec` read-only review
   (see `BUGS.md` for the review-loop discipline). Any new finding is
   added to `BUGS.md` immediately and fixed on the same PR.
5. Wait for PR CI. If it fails, fix failures on the same branch and
   rerun relevant local checks.
6. Before merging, fetch `origin/main`, rebase the branch on top of it,
   and merge only after CI passes on the rebased branch.
7. After merge, verify main CI, GitHub Pages deployment, live HTTP 200,
   and `bun run verify:deployed-surface` before starting another
   implementation PR.

## Active PR

Task 062 (Assessment Quality And Expansion) on branch
`assessment-quality-and-expansion`, plus the full Codex remediation.
Final post-fix surface tallies:

- Quiz bank: 78 scenario-driven questions (was 60).
- Flashcards: 105 cards across 10 decks (was 64).
- Exam: 16 fixture-backed cards in
  `exams/bi-foundations/bi-foundations-exam.md` (was 5 YAML + 6 MD
  duplicated). Every card produces deterministic numeric, schema, or
  field-list expected outputs.
- Facts: 133 FACT entries (was 117).
- Terminology: 150 entries (was 148).

## Follow-On After This PR Merges

The remaining work toward Phase 9 minima (500 / 200 / 30) is staged in
`PLAN.md` Phase 12:

1. Phase 12.1 - more quiz questions (PSD2, AML, KYC, COREP / FINREP,
   application questions, even spread across difficulties).
2. Phase 12.2 - more flashcards in the remaining under-served decks,
   focused on cert-track contrasts.
3. Phase 12.3 - more exam cards toward 30.
4. Phase 12.4 - terminology depth (deep-link citations, decision on
   the 53 uncovered entries).
5. Phase 12.5 - authoring helpers (`validate:quiz-distractor-quality`,
   `coverage:cert-track`).

Earlier follow-ons still open from Phases 10 and 11:

- Renderer support so inline `class="termRef"` markers can live in
  YAML-bound surfaces (quiz prompts, flashcard front/back, exam card
  statements, fact statements, challenge manifests).
- Continued inline grounding for tutorials and regulations flagged in
  `_development/terminology-coverage.md`.

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
