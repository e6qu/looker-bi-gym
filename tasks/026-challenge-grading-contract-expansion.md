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

Dataset-derived expected-answer generation remains a future enhancement when a
challenge needs generated targets. The current metric-contract challenge uses a
committed artifact fixture because the grading target is a learner-authored
configuration contract, not a dataset aggregate.

## Verification

- A newly released challenge cannot ship without known-good fixture coverage.
- Trap-style SQL and browser-config exclusion challenges require known-bad
  fixture coverage.
- Fact-backed questions and lesson steps remain validated against the local fact
  corpus.
- Browser-config challenge checks are validated against the supported local
  validator list.

## Tests

- `bun run format:check`
- `bun run validate:manifests`
- `bun run test:browser-config`
- `bun run test:content-qa`
- `bun run test:fixtures`
- `bun run typecheck`
- `bun run lint`
- `bun run check`

Last local verification: all commands above passed on 2026-05-10.
