# 008 - Validators, Flags, And Progress

## Objective

Add reusable browser-side validation, flag generation, and local progress tracking.

## Dependencies

- [006 - Quiz Challenge Runtime](006-quiz-challenge-runtime.md)
- [007 - Browser SQL Runtime](007-browser-sql-runtime.md)

## Deliverables

- Validator framework.
- Supported SQL/data validators:
  - Required columns
  - Forbidden columns
  - Row count
  - Unique key
  - Scalar aggregate
  - Sensitive-field exclusion
- Local flag generation.
- Local progress storage.
- Reset progress controls.

## Verification

- Validators are reusable across challenges.
- Failed checks explain what failed.
- Passing all required checks and questions produces a flag.
- Flags and completion state persist after refresh.
- Reset removes local progress.

## Tests

- Run unit tests for each validator type.
- Run a passing SQL challenge fixture.
- Run failing SQL challenge fixtures for each validator.
- Verify flag is not generated until all required checks pass.
- Manually complete a challenge, refresh, and confirm completion remains.
- Manually reset progress and confirm completion is cleared.
