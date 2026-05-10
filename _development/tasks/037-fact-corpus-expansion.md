# 037 - Fact Corpus Expansion

Status: not started on branch `phase-4-fact-corpus-expansion`.

## Goal

Continue Phase 4 after the root `facts/` migration by expanding the
source-backed fact corpus toward the Phase 4 target without lowering evidence
quality.

## Scope

- Add reviewed `FACT-*` records under root `facts/`.
- Prefer official product documentation, official law/regulator sources, and
  recognized BI literature with stable URLs.
- Keep source cards in `sources/` and link each new fact to one or more source
  IDs.
- Prioritize BI, BigQuery, Looker Studio, SQL, metric contracts, data quality,
  privacy/security, and banking context.
- Do not claim complete/comprehensive/reality-verified curriculum coverage until
  the Phase 9 gates pass.

## Deliverables

- A first stable expansion batch of source-backed facts.
- New or updated source cards for every added fact.
- Updated fact graph validation counts if thresholds need to increase.
- Acceptance notes that name what was externally verified and what remains
  incomplete.

## Verification

- `bun run content:generate`
- `bun run content:check`
- `bun run test:facts-db`
- `bun run facts:build-db`
- `bun run test:content-qa`
- `bun run test:quiz-facts-db`
- `bun run test:flashcards`
- `bun run typecheck`
- `bun run lint`
- `bun run test:platform-boundary`
- `bun run validate:static-links`
- `bun run check`
- stale scan for old fact path and unsupported completeness claims

## Notes

- Count targets do not prove quality. Each expansion batch needs source support,
  deterministic validation, and review notes.
- Formal Claude CLI review remains required before marking the phase complete;
  if the CLI hangs again, record the phase as locally verified but not
  Claude-reviewed.
