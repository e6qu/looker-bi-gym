# 056 - Remove Tutorial Evidence Basis Headings

Status: locally verified on branch `remove-tutorial-evidence-basis`.

## Goal

Remove visible `Evidence Basis` sections from tutorial pages. Source grounding
should stay in typed metadata, fact catalogs, and automated validation rather
than appearing as learner-facing filler text.

## Scope

- Remove `## Evidence Basis` sections from released tutorials, practice labs,
  and Looker Studio recipes.
- Keep `source_facts` metadata requirements and fact-ID validation.
- Update content QA so tutorials are no longer required to render the heading.
- Update continuity files and task index.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- `git diff --check`
- stale scan for `Evidence Basis` in learner-facing tutorials

## Progress Notes

- Confirmed no open PRs before starting this cleanup.
- Removed visible `Evidence Basis` sections from tutorials and recipe pages.
- Updated content QA to stop requiring the heading while keeping source fact
  metadata validation.
- Focused verification passed:
  - `bun run content:generate`;
  - `bun run content:check`;
  - `bun run format:check`;
  - `bun run test:content-qa`;
  - `bun run validate:static-links`;
  - `bun run typecheck`;
  - `bun run lint`;
  - stale scan for `Evidence Basis` in tutorials and content QA;
  - `git diff --check`;
  - `bun run check` after approved local Vite preview binding, with all 93
    Playwright tests passing.
