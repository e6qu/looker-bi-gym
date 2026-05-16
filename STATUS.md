# Status

Last updated: 2026-05-16

## Current Branch And PR

- Current branch: `terminology-integrity-checks`, based on verified `main` at
  `d88acc7`.
- No PR opened yet for this branch.
- PR #44, `https://github.com/e6qu/looker-bi-gym/pull/44`, is squash-merged at
  `d88acc7`.
- Main CI for `81d4c3d` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680564739`.
- PR #44 CI passed before merge:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25744753981/job/75604946709`.
- GitHub Pages workflow for `81d4c3d` passed:
  `https://github.com/e6qu/looker-bi-gym/actions/runs/25680562973`.
- Live Pages URL verified HTTP 200 on 2026-05-11 after PR #43:
  `https://e6qu.github.io/looker-bi-gym/`. The Pages workflow and live URL
  for `d88acc7` are not yet re-verified this session.
- Deployed learning-surface verifier last passed on 2026-05-11 against the
  PR #43 state; re-verification against `d88acc7` is pending.

## Active Task

Task 060 - Terminology Integrity Checks (Phase 10.1 of `PLAN.md`).

Current state:

- Added `app/scripts/validate-terminology.ts`. The validator fails on
  duplicate heading slugs, broken `class="termRef"` anchors, unknown target
  files, missing `#anchor`, and missing or mismatched `<sup>HINT</sup>`
  domain hints. Wired into `bun run check` and exposed as
  `bun run validate:terminology` at the root workspace.
- Confirmed sanity behaviour: a deliberately corrupted anchor failed with
  file/line context, and the file restored cleanly.
- Removed 148 decorative leading `<span class="termBadge">` blocks from the
  seven terminology domain files. The `.termBadge` CSS stays for future
  inline use.
- Rewrote `terminology/README.md` marker key so authors are pointed at the
  HTML anchor form only and at the new validator, and so the leading
  per-entry badge is documented as removed.

## Phase 10 Backlog

Phase 10 sub-phases that are still open after this branch:

- 10.2 - Terminology sourcing and `FACT-*` linkage.
- 10.3 - Term-level search depth.
- 10.4 - Inline grounding rollout across tutorials, quizzes, flashcards,
  exams, facts, regulations, challenges (one PR per surface).
- 10.5 - Reverse coverage matrix.
- 10.6 - Continuity reconciliation (this branch handles the post-PR-#44
  reconciliation; later Phase 10 PRs each carry their own).

## Blockers And Gaps

- Claude CLI formal review remains blocked by authentication or prior hangs;
  Task 060 does not mark any phase complete.
- Curriculum completeness, external verification, and full assessment
  coverage remain Phase 9 gaps.
- Phase 10.2 external-source citations gate Phase 9's vendor and regulatory
  external-verification bullets.
