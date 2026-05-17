# Looker Studio Source Cards

These cards support Looker Studio BI platform facts. They are training material
only, not legal, regulatory, accounting, privacy, compliance, or model-risk
advice.

## SRC-LOOKER-STUDIO-DATA-SOURCES

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/about-data-sources
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-DATA-SOURCE`
  - `FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES`
  - `FACT-LOOKER-STUDIO-FIELD-TYPES`
  - `FACT-LOOKER-STUDIO-DIMENSIONS-METRICS`
- Relevant quotes:
  - "acts as a conduit"
  - "reusable data sources"
- Notes: Use this source for model/schematic questions before chart design.

## SRC-LOOKER-STUDIO-CALCULATED-FIELDS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://docs.cloud.google.com/data-studio/add-edit-and-troubleshoot-calculated-fields
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
  - `FACT-LOOKER-STUDIO-FIELD-TYPES`
- Relevant quotes:
  - "chart-specific calculated fields"
- Notes: Use this source for metric placement questions.

## SRC-LOOKER-STUDIO-ABOUT-CALCULATED-FIELDS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/about-calculated-fields
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
  - `FACT-LOOKER-STUDIO-FIELD-TYPES`
- Relevant quotes:
  - "calculated fields"
- Notes: Use this source as the full local snapshot companion for calculated
  field concepts.

## SRC-LOOKER-STUDIO-CREDENTIALS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/data-credentials
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-CREDENTIALS`
  - `FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK`
  - `FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS`
- Relevant quotes:
  - "who can see its data"
  - "owner's credentials"
  - "viewer credentials"
- Notes: Use this source to keep static-app evidence free of secrets.

## SRC-LOOKER-STUDIO-BLENDS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-BLEND-MORE-ROWS`
  - `FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET`
  - `FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG`
- Relevant quotes:
  - "more rows"
  - "only include the specific fields"
- Notes: Use this source for fanout and field-minimisation questions.

## SRC-LOOKER-STUDIO-BLENDED-DATA

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/blended-data
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG`
  - `FACT-BI-FANOUT-JOIN-RISK`
- Relevant quotes:
  - "blended data"
- Notes: Use this source as the full local snapshot companion for blends.

## SRC-LOOKER-STUDIO-JOIN-KEY

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/join-key
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-BLEND-LEFTMOST`
  - `FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG`
- Relevant quotes:
  - "leftmost data source"
  - "join key"
- Notes: Use this source for blend order and join-key exercises.

## SRC-LOOKER-STUDIO-AGGREGATION

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/aggregation
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-AGGREGATION-METHODS`
  - `FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`
  - `FACT-LOOKER-STUDIO-DIMENSION-CONTEXT`
- Relevant quotes:
  - "method used to summarize data"
  - "`Count Distinct`"
- Notes: Use this source for aggregation method questions.

## SRC-LOOKER-STUDIO-AGGREGATION-ARTICLE

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://docs.cloud.google.com/looker/docs/studio/aggregation-article
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-DIMENSION-CONTEXT`
  - `FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION`
  - `FACT-BI-RATIO-SUM-COMPONENTS-FIRST`
- Relevant quotes:
  - "context of a set of dimensions"
  - "default aggregation"
- Notes: Use this source for chart-level grain and default aggregation behavior.

## SRC-LOOKER-STUDIO-DIMENSION

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/dimension
- Accessed: 2026-05-09.
- Used by facts:
  - `FACT-LOOKER-STUDIO-DIMENSIONS-METRICS`
  - `FACT-LOOKER-STUDIO-DIMENSION-CONTEXT`
- Relevant quotes:
  - "group your data"
- Notes: Use this source for dimension definitions in dashboard lessons.

## SRC-LOOKER-STUDIO-DATA-FRESHNESS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/manage-data-freshness
- Accessed: 2026-05-10.
- Used by facts:
  - `FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF`
  - `FACT-LOOKER-STUDIO-FRESHNESS-MEMORY`
  - `FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST`
  - `FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM`
- Relevant quotes:
  - "balance your need for up-to-date information"
  - "served from memory"
  - "usual query costs"
  - "minimum refresh time"
- Notes: Use this source for freshness, cost, and report-performance evidence in
  Looker Studio tutorials.

## SRC-LOOKER-STUDIO-CONTROLS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/about-controls
- Accessed: 2026-05-11.
- Used by facts:
  - `FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA`
  - `FACT-LOOKER-STUDIO-CONTROL-FIELD-ID`
  - `FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT`
- Relevant quotes:
  - "filter data or provide input"
  - "Filter data by dimension values"
  - "based on field ID"
  - "pass parameters back"
- Notes: Use this source for dashboard interaction, filter-field, and parameter
  handoff lessons.

## SRC-LOOKER-STUDIO-BLEND-JOIN-TYPES

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://support.google.com/looker-studio/answer/9061204
- Accessed: 2026-05-16.
- Used by facts:
  - `FACT-LOOKER-STUDIO-BLEND-JOIN-TYPES`
- Relevant quotes:
  - "left outer"
  - "inner"
- Notes: Use this source when a blend over- or under-counts vs the upstream
  serving view.

## SRC-LOOKER-STUDIO-FRESHNESS-INTERVALS

- Type: official product documentation.
- Publisher: Google Cloud.
- URL: https://cloud.google.com/looker/docs/studio/manage-data-freshness
- Companion URL: https://support.google.com/looker-studio/answer/7020039
- Accessed: 2026-05-17.
- Used by facts:
  - `FACT-LOOKER-STUDIO-FRESHNESS-INTERVALS`
- Relevant quotes:
  - "Data freshness determines how long Looker Studio will cache data
    before fetching new data from the source." (manage data freshness)
  - "When the freshness time is up, Looker Studio fetches data again
    from the source the next time a query is issued." (manage data
    freshness)
  - "Increasing the data freshness time reduces the frequency of
    queries against the underlying data source, which can reduce the
    cost of queries." (manage data freshness)
  - "The default freshness time and the minimum freshness time you can
    select depend on the connector type." (manage data freshness)
- Notes: Looker Studio data freshness is a **cache-staleness
  threshold** that determines when the next viewer query reaches the
  source, not a periodic auto-refresh interval. Increasing the
  threshold reduces query frequency and therefore BigQuery cost on
  warehouse-backed reports. The minimum allowed freshness is
  connector-specific and is documented on the manage-data-freshness
  page.
