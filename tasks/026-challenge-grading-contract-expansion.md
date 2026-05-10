# 026 - Challenge Grading Contract Expansion

Status: implemented in branch `task026-grading-contracts`.

## Goal

Make challenge definitions rich enough to support broader automatic grading for
SQL, metric contracts, configuration artifacts, local evidence, and known-bad
trap coverage.

## Deliverables

- Added browser-config challenge rendering and local JSON validators.
- Added a structured metric-contract artifact pattern through the released
  `deposit-metric-contract` challenge.
- Added known-good and known-bad fixtures for the browser-config challenge.
- Expanded fixture enforcement so browser-config exclusion checks require
  known-bad coverage.
- Expanded content QA so non-quiz checks must be supported by their declared
  challenge mode.
- Added rendered Playwright coverage for the learner completing the metric
  contract challenge locally.
- Added dataset-derived expected-answer verification for browser-SQL challenges:
  known-good fixture SQL is executed against pinned committed datasets, and
  exact row-count plus aggregate expectations are compared back to the manifest
  contract.

## Verification

- A newly released challenge cannot ship without known-good fixture coverage.
- Trap-style SQL and browser-config exclusion challenges require known-bad
  fixture coverage.
- Fact-backed questions and lesson steps remain validated against the local fact
  corpus.
- Browser-config challenge checks are validated against the supported local
  validator list.
- Browser-SQL row-count, scalar-aggregate, and aggregate-total expectations are
  derived from the pinned dataset through known-good fixture SQL.

## Tests

- `bun run format:check`
- `bun run validate:manifests`
- `bun run test:browser-config`
- `bun run test:content-qa`
- `bun run test:fixtures`
- `bun run test:derived-expectations`
- `bun run typecheck`
- `bun run lint`
- `bun run check`

Last local verification: all commands above passed on 2026-05-10, including
full `bun run check` after the derived-expectation follow-up.
