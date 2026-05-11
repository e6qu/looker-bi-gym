# 048 - Rendered Route Sweep Hash Stabilization

Status: active on branch `rendered-route-sweep-hash-stabilization`.

## Goal

Restore green main CI after PR #33 by stabilizing the rendered route sweep.

## Scope

- Split the primary route sweep into one Playwright test per route and viewport.
- Avoid serial hash-route navigation in one page, because CI showed
  `page.goto(..., waitUntil: "domcontentloaded")` can exhaust the test timeout
  when many hash routes are visited in sequence.
- Preserve route coverage, viewport coverage, main navigation checks, horizontal
  overflow checks, and text-fit checks.
- Update continuity docs and the known-gap entry.

## Deliverables

- Stable rendered route sweep.
- Continuity notes explaining the red main CI run after PR #33.
- Post-merge verification notes after the hotfix lands.

## Verification

- `bun run format:check`
- `bun run test:e2e`
- `bun run check`
- `git diff --check`

## Notes

- This is a CI stabilization hotfix for already-merged Task 047 work.

## Progress Notes

- Added the Task 048 file and task index entry.
- Split the primary route sweep into one Playwright test per route and viewport.
- Local verification passed:
  - `bun run format:check`;
  - `git diff --check`;
  - `bun run test:e2e` after approved local Vite preview binding;
  - `bun run check` after approved local Vite preview binding.
