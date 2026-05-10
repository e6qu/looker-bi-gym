# R-LOOKER-001 - Deposits Dashboard Recipe

Recipe area: Looker Studio mechanics. Optional follow-on after
[LT-LOOKER-004](../learner-tasks/lt-looker-004-report-ready-data-source.md).

Training boundary: use synthetic training data only. This recipe is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

- `FACT-LOOKER-STUDIO-DATA-SOURCE`
- `FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE`
- `FACT-LOOKER-STUDIO-FIELD-TYPES`
- `FACT-LOOKER-STUDIO-CREDENTIALS`
- `FACT-BIGQUERY-LOGICAL-VIEW`

## Steps

1. In Looker Studio, create a report from a synthetic data source that exposes
   `business_date`, `currency_code`, and `ledger_total`.
2. Confirm field roles:
   - `business_date`: date dimension;
   - `currency_code`: text dimension;
   - `ledger_total`: numeric metric with sum aggregation.
3. Add a scorecard for latest-day `ledger_total`.
4. Add a bar chart with `currency_code` as dimension and `ledger_total` as
   metric.
5. Add a small table with `business_date`, `currency_code`, and `ledger_total`.
6. Add a note outside the app recording whether the report uses owner
   credentials or viewer credentials.

## Checkpoints

- The report uses only synthetic data.
- The reusable metric logic is owned by the data source or upstream view, not a
  one-off chart field.
- No credentials, tokens, or private exports are pasted into this app.

## Common Failure Modes

- Leaving `business_date` as text instead of a date field.
- Creating separate chart-only versions of the same metric.
- Sharing a report without documenting credential scope.

## Self-Assessment

Mark the recipe complete if a reviewer can identify the data source, metric,
dimension, credential mode, and latest-day control value from your report notes.
