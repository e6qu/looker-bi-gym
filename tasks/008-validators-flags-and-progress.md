# 008 - Validators, Flags, And Progress

## Status

Complete on 2026-05-06.

## Objective

Add reusable browser-side validation, flag generation, and local progress tracking.

## Dependencies

- [006 - Quiz Challenge Runtime](006-quiz-challenge-runtime.md)
- [007 - Browser SQL Runtime](007-browser-sql-runtime.md)

## Deliverables

- [x] Validator framework.
- [x] Supported SQL/data validators:
  - [x] Required columns
  - [x] Forbidden columns
  - [x] Row count
  - [x] Unique key
  - [x] Scalar aggregate
  - [x] Sensitive-field exclusion
- [x] Local flag generation.
- [x] Local progress storage.
- [x] Reset progress controls.

## Verification

- [x] Validators are reusable across challenges.
- [x] Failed checks explain what failed.
- [x] Passing all required checks and questions produces a flag.
- [x] Flags and completion state persist after refresh.
- [x] Reset removes local progress.

## Tests

- [x] Run unit tests for each validator type.
- [x] Run a passing SQL challenge fixture.
- [x] Run failing SQL challenge fixtures for each validator.
- [x] Verify flag is not generated until all required checks pass.
- [x] Manually complete a challenge, refresh, and confirm completion remains.
- [x] Manually reset progress and confirm completion is cleared.

## Notes

- Browser validator source: `app/src/validators.ts`.
- Unified local progress source: `app/src/progress.ts`.
- Validator fixtures: `app/scripts/test-validators.ts`.
- Test command: `pnpm test:validators`.
- Full gate command: `make check`.
- `make check` passed on 2026-05-06.
- Headless Chrome verification against Vite passed on 2026-05-06:
  - Completed the orientation quiz and verified the flag persisted after reload.
  - Completed the SQL challenge and verified the flag persisted after reload.
  - Used Settings reset and verified local progress was cleared.
