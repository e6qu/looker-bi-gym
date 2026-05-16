---
{
  "id": "tutorial-tutorials-recipes-r-looker-001-deposits-dashboard",
  "title": "R-LOOKER-001 - Deposits Dashboard Recipe",
  "content_type": "tutorial_recipe",
  "status": "published",
  "version": "0.1.0",
  "topic": "recipes",
  "source_facts":
    [
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
      "FACT-LOOKER-STUDIO-FIELD-TYPES",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# R-LOOKER-001 - Deposits Dashboard Recipe

Recipe area: Looker Studio mechanics. Optional follow-on after
[LT-LOOKER-004](../learner-tasks/lt-looker-004-report-ready-data-source.md).

Account requirement: this recipe requires a Looker Studio account, a
BigQuery (or compatible) connector, and a synthetic data source. If you do
not have an LS account, skip the UI steps and instead complete the
"Describe Without An Account" path below.

Objective: manually reproduce the deposits dashboard shape in Looker Studio
using a synthetic report-ready data source and documented credential mode.

After this recipe, you will be able to:

- Configure date, dimension, and metric field roles for a deposits dashboard.
- Build a scorecard, bar chart, and detail table from the same governed metric.
- Record report credential mode and latest-day control value in local notes.

Training boundary: use synthetic training data only. This recipe is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

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
6. Add a local note recording whether the report uses owner credentials or
   viewer credentials.

## Checkpoints

- The report uses only synthetic data.
- The reusable metric logic is owned by the data source or upstream view, not a
  one-off chart field.
- No credentials, tokens, or private exports are pasted into notes.

## Common Failure Modes

- Leaving `business_date` as text instead of a date field.
- Creating separate chart-only versions of the same metric.
- Sharing a report without documenting credential scope.

## Describe Without An Account

If you cannot open Looker Studio, write a one-page description in your
notes that names:

- the data source schema (`business_date`, `currency_code`, `ledger_total`)
  and the cert-track default aggregation for each field;
- the three charts you would create (scorecard, bar chart, detail table)
  and the field bindings for each;
- the latest-day expected control values (`95700` total, `EUR = 16400`,
  `RON = 79300`);
- the credential mode you would choose for an internal report (viewer or
  authorized-view-backed) and why owner credentials are not the default.

This description is the cert-track equivalent of the UI recipe. A reviewer
should be able to recognise the same dashboard shape from the description
as from a screenshot.

## Self-Assessment

Mark the recipe complete if a reviewer can identify the data source, metric,
dimension, credential mode, and latest-day control value from your report
notes (or from the description if you completed the no-account path).
