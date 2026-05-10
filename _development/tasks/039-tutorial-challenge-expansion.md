# 039 - Tutorial Challenge Expansion

Status: implemented locally on branch `phase-6-tutorial-challenge-expansion`;
PR not opened yet; formal Claude review blocked by CLI hang.

## Goal

Begin Phase 6 by adding self-contained, step-by-step learner tutorial material
with deterministic SQL outputs and an end challenge that can run from the
browser-hosted app.

## Scope

- Add at least one real learner task under `tutorials/learner-tasks/`.
- Keep the task browser-first and runnable without Google Cloud CLI, BigQuery
  CLI, Python, Docker, credentials, or real banking data.
- Provide exact steps, SQL, checkpoints, expected outputs,
  visualization/reporting action, self-assessment, common failure modes, and an
  end challenge.
- Cite source facts for all platform and metric-contract claims.
- Do not claim complete, comprehensive, or externally verified tutorial
  coverage until Phase 9 gates pass.

## Deliverables

- A new learner task page with typed frontmatter.
- Updated learner-task index links.
- Verification notes showing catalog generation, content QA, static-link
  validation, and relevant checks.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run check`
- stale scan for unsupported completeness claims

Passed locally on 2026-05-10:

- `bun run content:generate`
- `bun run content:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run format:check`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run check` after approved local Vite preview binding, with all 12
  Playwright tests passing
- stale scan for unsupported completeness claims
- `git diff --check`

Acceptance notes:

- Added `LT-DQ-006 - Define A Ratio Null Contract` with browser-runnable SQL,
  deterministic expected outputs, checkpoints, visualization/reporting action,
  common failure modes, self-assessment, and an end challenge.
- The local exercise uses DuckDB-compatible `TRY_CAST` and `NULLIF` while
  explicitly naming BigQuery `SAFE_CAST` and `SAFE_DIVIDE` as the
  source-backed production pattern.
- This is a first Phase 6 tutorial/challenge batch only; it does not satisfy
  Phase 9 completeness targets.

Blocked review:

- `claude --print --permission-mode plan --output-format text ...` was run in
  non-TUI mode for the Task 039 formal review, produced no output for about 50
  seconds, and was terminated.

## Notes

- Phase 6 needs many more tutorials and deterministic challenges. This task is
  only the first tutorial/challenge expansion batch after the catalog and
  assessment schema work stabilized.
