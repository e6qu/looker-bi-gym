# 009 - First Browser Challenges

## Status

Complete on 2026-05-06.

## Objective

Add the first complete browser-verifiable banking BI challenges.

## Dependencies

- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)

## Deliverables

- [x] Challenge 000: Orientation Quiz.
- [x] Challenge 010: First Banking Dataset Inspection.
- [x] Challenge 020: Account Owner Fanout CTF.
- [x] Challenge content, manifests, checks, questions, and expected validation behavior.
- [x] Challenge links from app navigation.

## Verification

- [x] Each challenge has clear scenario, inputs, tasks, checks, and flag criteria.
- [x] Each challenge can be completed from the browser with no local install.
- [x] Challenge 020 proves that a naive join fails and a correct solution passes.
- [x] All challenges use synthetic data only.

## Tests

- [x] Run manifest validation.
- [x] Run app build.
- [x] Complete each challenge manually in the built site.
- [x] Run known-good solutions through validators.
- [x] Run at least one known-bad solution per challenge and verify failure.
- [x] Verify completion status appears in the challenge index.

## Notes

- Added the browser-verifiable fanout challenge manifest: `challenges/manifests/account-owner-fanout.yaml`.
- Updated the orientation and dataset inspection titles to use the 000/010 numbering expected by this task.
- Corrected Challenge 010 row-count validation from 12 to the actual seed balance row count of 18.
- Added manifest-backed known-good and known-bad SQL solution checks to `app/scripts/test-sql.ts`.
- Added manifest-backed instruction rendering to challenge detail pages in `app/src/App.tsx`.
- Browser verification against the built preview passed on 2026-05-06:
  - Completed 000 - Orientation Quiz.
  - Completed 010 - First Banking Dataset Inspection.
  - Completed 020 - Account Owner Fanout CTF.
  - Verified the challenge index showed all three browser challenges as complete.
- Full gate command `make check` passed on 2026-05-06.
