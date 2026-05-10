# 03 - First Executive Dashboard

Area: C - Looker Studio Dashboards

Synthetic-data boundary: dashboard pages must use synthetic serving views only.
Do not paste real production screenshots, URLs, credentials, or customer data
into the repo.

Builds on:

- [01 - Connect Predefined Banking Data](01-connect-public-data.md)
- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)

Required tools: optional Looker Studio browser UI.

Objective: build an executive dashboard shape from curated serving fields, not
from raw banking tables or hidden one-chart logic.

After this tutorial, you will be able to:

- Choose dashboard fields from a curated serving source.
- Keep reusable metric definitions outside one-off chart formulas.
- Add freshness and sensitive-field evidence to a dashboard note.

Produces:

- Executive KPI report page.
- `notes/03-dashboard-definition.md`

## Source Facts

- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
- `FACT-BIGQUERY-VIEW-SCOPE`
- `FACT-GDPR-DATA-MINIMISATION`

## Goal

Build an executive dashboard from curated serving fields, not from raw banking
tables or one-off chart logic.

## Steps

1. Open the Looker Studio report created in tutorial 01.
2. Confirm the data source points to a synthetic serving view and does not expose
   account/customer identifiers.
3. Add scorecards for latest deposit total and account count.
4. Add a time series by `business_date` and a table grouped by branch or
   currency.
5. Put metric definitions in the data source or upstream serving view. Use a
   chart-specific calculated field only for throwaway visual formatting.
6. Add visible freshness text: latest balance date and source cutoff.

## Checkpoints

- Each chart uses the same curated data source.
- Metric definitions can be found outside a single chart.
- The page displays a source freshness label.
- Sensitive identifiers are absent from the visible fields and charts.

## Common Failure Modes

- Creating a metric in one chart and silently using a different formula in
  another chart.
- Hiding freshness and making stale synthetic data look current.
- Adding raw account/customer fields to make debugging easier and forgetting to
  remove them.

## Deliverable

Create `notes/03-dashboard-definition.md` with the dashboard fields, metric
definitions, freshness label, and sensitive-field exclusion evidence.
