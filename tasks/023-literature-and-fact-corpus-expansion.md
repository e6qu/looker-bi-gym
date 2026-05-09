# 023 - Literature And Fact Corpus Expansion

Status: complete on 2026-05-09.

## Goal

Turn the initial fact register into an area-organized local corpus with richer
official-source coverage, short source quotes, derived tutorial implications,
and cross-linked fact IDs.

## Deliverables

- Split `docs/facts/README.md` into an index plus area files under `docs/facts/`.
- Preserve existing fact IDs used by released manifests.
- Add facts for:
  - GDPR/personal data/minimisation.
  - FGDB/DGSD deposit guarantee grain and currency semantics.
  - BigQuery logical/materialized/authorized views and jobs metadata.
  - Looker Studio data sources, credentials, calculated fields, and blends.
  - DuckDB-WASM, CSV ingestion, aggregates, and deterministic browser SQL.
  - DORA/EBA reporting and operations evidence.
  - Local project architecture, deterministic datasets, validators, fixtures,
    and progress export behavior.
- Update content QA to collect fact IDs from all Markdown files under
  `docs/facts/`.
- Update `PLAN.md` to remove obsolete early execution ordering and document
  current clarifications/future phases.

## Verification

- Existing challenge `source_facts` still resolve.
- New fact files use stable `FACT-*` IDs and cross-links.
- Internal Markdown links resolve.
- The plan reflects current direction rather than the old scaffold sequence.

## Tests

- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:manifests`
- `bun run typecheck`

## Notes

- Local literature is stored as source cards and short quotes, not as full copies
  of external official pages.
- This task expands the source/fact base; follow-up tasks should use it to build
  larger deterministic dataset packs and fuller tutorial/challenge packs.
