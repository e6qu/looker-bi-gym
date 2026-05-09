# 027 - Source-Backed BI Fact Database

Status: complete on 2026-05-09.

## Goal

Replace app-specific fact expansion with a domain-focused banking BI fact corpus
backed by source cards, downloaded BigQuery/Looker Studio documentation
snapshots, and a local SQLite database that can be queried for verification and
future question generation.

## Deliverables

- Remove app/runtime/project-specific fact files from `docs/facts/`.
- Add and correct facts for:
  - BigQuery logical, authorized, and materialized views.
  - BigQuery jobs metadata, bytes, user email, and time-window evidence.
  - BigQuery aggregate, approximate aggregate, window, navigation, date, join,
    partition-filter, and select-list behavior.
  - Looker Studio data sources, credentials, calculated fields, blends,
    aggregation, dimensions, and metric context.
  - Banking BI grain, fanout, semi-additive balances, ratios, reconciliation,
    and date-role separation.
  - Romanian/EU and US deposit guarantee / deposit insurance grain.
- Add `sources/` source cards by area.
- Download complete sanitized article snapshots for core BigQuery and Looker
  Studio official documentation under `sources/platforms/*/full/`.
- Add a repeatable Bun script to refresh those permissively licensed official
  documentation snapshots.
- Add a typed Bun SQLite loader that builds a local facts database from
  `sources/` and `docs/facts/`.
- Add a facts database test and include it in `bun run check`, root scripts, and
  `make test`.
- Update released challenge questions, lesson steps, fixtures, tutorials, and
  Playwright flow references away from app runtime facts and toward BigQuery,
  Looker Studio, and BI modeling facts.

## Verification

- App-specific `FACT-APP-*`, `FACT-DATASET-*`, `FACT-CHALLENGE-*`,
  `FACT-DUCKDB-*`, and `FACT-WEB-*` facts are not present in the learner fact
  corpus.
- BigQuery and Looker Studio source snapshots are local, article-only,
  attributed, and sanitized for public-token-looking site chrome.
- Every parsed fact has at least one source link.
- Related fact links resolve to known facts.
- Released manifest `source_facts` resolve.
- Generated SQLite tables include source cards, full source documents, facts,
  fact-source edges, and fact-link edges.

## Tests

- `bun run --filter @looker-bi-gym/app test:facts-db`
- `bun run --filter @looker-bi-gym/app validate:manifests`
- `bun run --filter @looker-bi-gym/app test:content-qa`
- `bun run --filter @looker-bi-gym/app test:fixtures`
- `bun run --filter @looker-bi-gym/app format:check`
- `bun run --filter @looker-bi-gym/app typecheck`
- `bun run --filter @looker-bi-gym/app lint`
- `bun run check`

## Notes

- Google Cloud documentation snapshots are stored because the source pages state
  Creative Commons Attribution 4.0 licensing for documentation except where
  otherwise noted.
- Non-permissive BI literature is represented by source cards and short quotes
  only.
- The generated SQLite file is rebuildable and ignored under
  `app/src/generated/*.sqlite`.
