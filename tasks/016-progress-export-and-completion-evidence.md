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
