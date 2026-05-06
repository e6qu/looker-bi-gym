# 016 - Progress Export And Completion Evidence

## Objective

Allow learners to export local progress and completion evidence without a backend.

## Dependencies

- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)

## Deliverables

- Progress export format.
- Export button or settings action.
- Export includes:
  - Completed challenge IDs.
  - Flags.
  - Completion timestamps.
  - Dataset versions.
  - App/content version.
  - Optional learner notes if explicitly included by the learner.
- Import or preview behavior documented.
- Privacy note explaining that progress export is local and user-controlled.

## Verification

- Export works without a backend.
- Export contains no credentials.
- Export contains no real banking data.
- Export is stable enough to share for completion review.
- Learner can reset local progress without deleting exported files.

## Tests

- Complete a challenge and export progress.
- Validate exported JSON structure.
- Confirm exported challenge IDs and flags match local state.
- Reset local progress and confirm exported file remains separate.
- Inspect export content and verify no secrets or hidden app internals are included.

## Status

Completed on 2026-05-06.

## Implementation Notes

- Added `looker-bi-gym.progress-export.v1` through `buildLearnerProgressExport`.
- The export includes completed challenge IDs, local flags, completion timestamps, dataset IDs/versions, app/content version, passed check/question IDs, privacy boundary fields, and optional learner notes.
- Added a Settings progress export panel with optional learner notes, JSON preview, and a browser-local JSON download action.
- Documented preview/import behavior in the Settings UI and `app/README.md`; import is intentionally not implemented in this static release.
- The export is built from the normalized progress model rather than dumping `localStorage`, so it excludes storage keys, raw answers, pasted cloud evidence, sensitive synthetic field names, credentials, and real banking data.
- Added `app/scripts/test-progress-export.ts`, `pnpm test:progress-export`, Makefile wiring, and a CI workflow step.

## Verification Notes

- `pnpm test:progress-export` passed.
- `pnpm typecheck` passed.
- `pnpm lint` passed.
- `pnpm build` passed; Vite still reports the existing non-failing large DuckDB-WASM chunk warning.
- `make check` passed and includes `pnpm test:progress-export`.
- The progress-export test completes a representative challenge in memory, validates the JSON structure, confirms challenge IDs/flags/timestamps/dataset versions, verifies optional notes behavior, resets local progress, and confirms the previously built export object remains separate from browser storage.
