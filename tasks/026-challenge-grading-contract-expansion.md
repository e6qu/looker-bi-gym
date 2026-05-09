# 026 - Challenge Grading Contract Expansion

Status: planned.

## Goal

Make challenge definitions rich enough to support broader automatic grading for
SQL, metric contracts, configuration artifacts, local evidence, and known-bad
trap coverage.

## Deliverables

- Add or complete browser-config challenge rendering and validators.
- Add structured metric-contract validators.
- Add dataset-derived expected-answer generation where appropriate.
- Add known-bad fixture requirements beyond SQL trap challenges where a common
  wrong artifact can be expressed.
- Add content QA checks for fact coverage, source quote coverage, and challenge
  grading completeness.

## Verification

- A newly released challenge cannot ship without known-good fixture coverage.
- Trap-style challenges cannot ship without known-bad fixture coverage.
- Fact-backed questions and lesson steps remain validated against the local fact
  corpus.

## Tests

- `bun run validate:manifests`
- `bun run test:fixtures`
- `bun run test:validators`
- `bun run test:content-qa`
- `bun run check`
