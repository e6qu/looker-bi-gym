---
{
  "id": "tutorial-tutorials-03-first-executive-dashboard",
  "title": "03 - Build A First Executive Dashboard Spec",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 03 - Build A First Executive Dashboard Spec

## The Moment

The serving view from lesson 01 (or its equivalent) is in place; the
exec team wants a dashboard page on top of it. Specifically: a
latest-day total, a daily trend, a currency split, and a small
"freshness" line that tells the audience what date they're looking
at and when the data was last refreshed.

The instinct on a first pass is to "just build the charts" and ship.
Two things go wrong that way:

- **The KPI gets computed in different places**. If the latest total
  is a chart-level formula, the next chart needing the same number
  invents its own version; the two drift. The fix is a single
  pre-aggregated serving result that every chart on the page reads.
- **The freshness story disappears**. Executive viewers see "RON
  79,300" with no surrounding context and assume it's right now. Six
  hours later, the same view still says "RON 79,300" - is that
  because nothing changed, or because the data is stale? Without a
  freshness label, the audience can't tell.

This lesson produces a **dashboard specification** - a small
contract listing exact KPI values, chart definitions, the freshness
label, and the excluded field list - before any chart is built.

## Prior Knowledge

`SELECT`, `GROUP BY`, `SUM`, `COUNT(DISTINCT)`, `MAX`. The vocabulary
of dimension vs metric on a chart.

Objective: build an executive-dashboard specification from a curated
synthetic serving result, with exact KPI values, chart fields,
freshness text, and sensitive-field exclusions.

After this tutorial, you will be able to:

- Produce a dashboard-ready result with one row per date and currency.
- Specify executive KPI, trend, and currency-breakdown charts from
  that result.
- Record freshness and sensitive-field evidence before building
  charts.
- Keep reusable metric logic in the serving result or shared
  data-source layer, not in one-off chart formulas.

Produces:

- A 6-row browser-SQL dashboard source.
- An executive dashboard chart specification (the contract below).
- Optionally a Looker Studio report page bound to the same view.
- A short personal note (kept in your own editor) with the
  exposed-field and excluded-field lists.

## Goal

Create this first executive dashboard contract:

| Surface          | Field Or Value                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------- |
| KPI 1            | latest ledger total = `95700`                                                                |
| KPI 2            | latest active account count = `6`                                                            |
| Trend            | daily total by `business_date`                                                               |
| Breakdown        | latest total by `currency_code`                                                              |
| Freshness label  | `Latest balance date 2026-03-31 / source cutoff 2026-03-31T20:15:00Z`                        |
| Exposed fields   | `business_date`, `currency_code`, `ledger_total`, `account_count`, `source_cutoff_timestamp` |
| Excluded fields  | `account_id`, `customer_id`, `synthetic_iban`                                                |
| Credential notes | no credentials, private links, tokens, or real banking data                                  |

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Paste and run this dashboard-source query:

```sql
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total,
  COUNT(DISTINCT account_id) AS account_count,
  MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
FROM account_daily_balances
GROUP BY business_date, currency_code
ORDER BY business_date, currency_code;
```

3. Confirm this six-row output:

| business_date | currency_code | ledger_total | account_count | source_cutoff_timestamp |
| ------------- | ------------- | -----------: | ------------: | ----------------------- |
| 2026-03-29    | EUR           |        16450 |             2 | 2026-03-29T20:15:00Z    |
| 2026-03-29    | RON           |        78740 |             4 | 2026-03-29T20:15:00Z    |
| 2026-03-30    | EUR           |        16550 |             2 | 2026-03-30T20:15:00Z    |
| 2026-03-30    | RON           |        79130 |             4 | 2026-03-30T20:15:00Z    |
| 2026-03-31    | EUR           |        16400 |             2 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           |        79300 |             4 | 2026-03-31T20:15:00Z    |

4. Run the executive KPI check:

```sql
WITH dashboard_source AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total,
    COUNT(DISTINCT account_id) AS account_count,
    MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  business_date AS latest_business_date,
  SUM(ledger_total) AS latest_ledger_total,
  SUM(account_count) AS latest_account_count,
  MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
FROM dashboard_source
WHERE business_date = DATE '2026-03-31'
GROUP BY business_date;
```

5. Confirm this one-row output:

| latest_business_date | latest_ledger_total | latest_account_count | source_cutoff_timestamp |
| -------------------- | ------------------: | -------------------: | ----------------------- |
| 2026-03-31           |               95700 |                    6 | 2026-03-31T20:15:00Z    |

6. Run the daily trend query:

```sql
WITH dashboard_source AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  business_date,
  SUM(ledger_total) AS daily_ledger_total
FROM dashboard_source
GROUP BY business_date
ORDER BY business_date;
```

7. Confirm the trend data:

| business_date | daily_ledger_total |
| ------------- | -----------------: |
| 2026-03-29    |              95190 |
| 2026-03-30    |              95680 |
| 2026-03-31    |              95700 |

8. Run the latest currency-breakdown query:

```sql
WITH dashboard_source AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total,
    COUNT(DISTINCT account_id) AS account_count
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  currency_code,
  ledger_total,
  account_count
FROM dashboard_source
WHERE business_date = DATE '2026-03-31'
ORDER BY currency_code;
```

9. Confirm the latest breakdown:

| currency_code | ledger_total | account_count |
| ------------- | -----------: | ------------: |
| EUR           |        16400 |             2 |
| RON           |        79300 |             4 |

10. Write the dashboard chart specification:
    - scorecard: `latest_ledger_total`, expected `95700`;
    - scorecard: `latest_account_count`, expected `6`;
    - time series: dimension `business_date`, metric `daily_ledger_total`;
    - table or bar chart: dimension `currency_code`, metrics `ledger_total` and
      `account_count`;
    - freshness label: `Latest balance date 2026-03-31 / source cutoff 2026-03-31T20:15:00Z`.
11. Record the exposed and excluded field lists from the goal section.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery. If the
synthetic deposits table referenced in this lesson already exists, create only
the view below. If it does not, run the inline BigQuery setup SQL given in the
data-sources reference first.

1. In the BigQuery browser UI, run this view SQL after replacing `PROJECT_ID`:

```sql
CREATE OR REPLACE VIEW `PROJECT_ID.looker_bi_gym_synthetic.exec_deposit_dashboard` AS
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total,
  COUNT(DISTINCT account_id) AS account_count,
  MAX(source_cutoff_timestamp) AS source_cutoff_timestamp
FROM `PROJECT_ID.looker_bi_gym_synthetic.account_daily_balances`
GROUP BY business_date, currency_code;
```

2. Query the view:

```sql
SELECT
  business_date,
  currency_code,
  ledger_total,
  account_count,
  source_cutoff_timestamp
FROM `PROJECT_ID.looker_bi_gym_synthetic.exec_deposit_dashboard`
ORDER BY business_date, currency_code;
```

3. Confirm it matches the browser-first six-row output.

### Optional Looker Studio UI Path

Use this section only after the optional BigQuery view exists.

1. Create a Looker Studio data source from `exec_deposit_dashboard`.
2. Confirm the field list contains only `business_date`, `currency_code`,
   `ledger_total`, `account_count`, and `source_cutoff_timestamp`.
3. Create the dashboard page:
   - scorecard filtered to `business_date = 2026-03-31` for `ledger_total`;
   - scorecard filtered to `business_date = 2026-03-31` for `account_count`;
   - time series with `business_date` and `ledger_total`;
   - table or bar chart filtered to `business_date = 2026-03-31` with
     `currency_code`, `ledger_total`, and `account_count`;
   - text label with the freshness string from the goal section.
4. Inspect data credentials and record the mode in notes. Do not copy
   credentials, tokens, private links, or screenshots with private account
   details.

## Checkpoints

- Browser SQL returns the exact six-row dashboard source.
- Latest ledger total is `95700`.
- Latest account count is `6`.
- Daily trend values are `95190`, `95680`, and `95700`.
- Latest currency breakdown is `EUR = 16400` and `RON = 79300`.
- The freshness label names both the latest balance date and source cutoff.
- Raw account, customer, and synthetic IBAN identifiers are absent from the
  dashboard source and chart specification.

## Aggregation Notes For Cert-Track Learners

- Default field aggregation is set on the Looker Studio data source, not on
  the chart. Each chart inherits that default unless you override the
  aggregation on the metric card. For this dashboard, `ledger_total` has
  data-source aggregation `Sum` and `account_count` has data-source
  aggregation `Sum`. The scorecard does not need to re-aggregate.
- `account_count` is `COUNT(DISTINCT account_id)` computed per
  `(business_date, currency_code)`. `SUM(account_count)` is safe here only
  because, by construction of this synthetic data, no account holds rows
  in two currencies on the same date. In general,
  `SUM(COUNT(DISTINCT ...))` is not additive across groups; if a customer
  ever held an account in EUR and another in RON on the same day, the sum
  would double-count. The cert-correct recompute is
  `COUNT(DISTINCT account_id)` over the latest day directly.

## Common Failure Modes

- Opening an old report and assuming its data source still matches the intended
  serving result.
- Creating the latest total as a chart-only formula that cannot be reused or
  checked by another chart.
- Summing balances across all dates and presenting `286570` as the latest
  executive KPI.
- Summing `COUNT(DISTINCT account_id)` across groups without checking that
  identifiers do not span those groups; this is the additive trap.
- Hiding freshness so the date range and source cutoff are not visible.
- Adding raw identifiers to make debugging easier and forgetting to remove them
  before the dashboard handoff.

## Recovery Checks

- If the latest ledger total is `286570`, remove the all-date sum and filter to
  `business_date = 2026-03-31`.
- If the latest account count is not `6`, check that it is counted inside each
  currency group and then summed only for the latest date.
- If Looker Studio shows account-level fields, reconnect it to the dashboard
  serving view instead of raw balance rows.
- If a chart uses a different formula from the SQL checks, move the reusable
  metric definition back to the serving result or shared data-source layer.

## What You Have Now

A 6-row dashboard source, three KPI / trend / breakdown queries that
agree with each other, and a freshness label that ties what the
audience sees to when the data was refreshed and what business_date
it actually represents.

Lesson 04 takes this further by defining the metric contract for
`Average account balance per active account` and shows why
`SUM(ledger_total) / SUM(account_count)` is the cert-correct
weighted shape (and `AVG(branch_average)` is the textbook anti-
pattern). Lesson 07 adds the governance evidence to the freshness
label and explains how authorized views enforce the excluded-fields
list on the warehouse side.

## Deliverable

Write a short personal note in your own editor with:

- the six-row dashboard source result;
- the executive KPI values;
- the trend and currency-breakdown expected values;
- the chart specification;
- the freshness label;
- the exposed and excluded field lists;
- optional Looker Studio credential mode, without credentials or private links.
