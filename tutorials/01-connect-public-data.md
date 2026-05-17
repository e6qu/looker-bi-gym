---
{
  "id": "tutorial-tutorials-01-connect-public-data",
  "title": "01 - From The Raw Balance Table To A Report-Ready Serving Result",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.3.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-LIMITATIONS",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 01 - From The Raw Balance Table To A Report-Ready Serving Result

## The Moment

A teammate asks you to "hook the deposits dashboard up to the
warehouse so the scorecards work". You look at what's actually
in the warehouse and find a single table:
`account_daily_balances`. It's at account-day grain - one row
per account per `business_date` - with `account_id`,
`ledger_balance`, `currency_code` columns.

The instinct is to point Looker Studio straight at that table
and let the charts do the aggregation. Two real reasons not to:

- **Charts that build their own aggregation get the grain
  wrong** the moment somebody adds an "account" dimension to a
  pivot. The 18 row-balances suddenly show up as 18 individual
  numbers; the SUM is meaningless.
- **`account_id` is a personal-data identifier**. Exposing it
  on a broadly-shared dashboard is a GDPR minimisation problem
  even on synthetic data - and habits formed on synthetic data
  carry into production.

The right pattern is a thin **serving view** between the raw
warehouse table and the dashboard. The view pre-aggregates to
the grain the chart needs, drops the identifier columns, and
gives the dashboard a small handful of named fields to read.
This lesson builds that serving view.

## Prior Knowledge

`SELECT`, `GROUP BY`, `SUM`, `WHERE`. If you know that a balance
column shouldn't be summed across snapshot dates, this lesson
is the warehouse-side application of that rule.

Objective: build a 6-row serving result
(`serving_deposit_dashboard`) from the 18-row raw balance
table, expose only the three fields the dashboard needs, and
verify the latest-day total reconciles to `95,700`. Optionally
deploy the result as a BigQuery view and bind it to a Looker
Studio data source.

After this tutorial, you will be able to:

- Build a report-ready deposits serving result from
  account-date balance rows.
- Check row counts, totals, dates, and exposed fields before
  charting anything.
- Use a BigQuery logical view as the source shape for Looker
  Studio.
- Pick between Looker Studio owner-credentials and
  viewer-credentials with the trade-offs named.

Produces:

- A 6-row SQL result for `serving_deposit_dashboard` you can
  read in the workbench.
- Optionally: a BigQuery view named `serving_deposit_dashboard`
  and a Looker Studio data source pointed at it.
- A short personal note (kept in your own editor) with the
  exposed and excluded field lists, the latest-day total, and
  the credential mode.

## Tables You Will Use

| Column           | Type   | Meaning                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------ |
| `business_date`  | DATE   | Reporting reference date for the row. Balances snapshot at end of day.         |
| `account_id`     | STRING | Synthetic account identifier; sensitive, kept out of BI serving outputs.       |
| `ledger_balance` | INT    | Cleared-ledger balance for the account at `business_date`, in `currency_code`. |
| `currency_code`  | STRING | ISO 4217 currency for the balance (`RON` or `EUR` in this dataset).            |

Notes on grain and shape:

- One row per account per `business_date` (account-day grain).
- `ledger_balance` is a stock (snapshot value), not a flow;
  summing across `business_date` values triple-counts each
  account.
- The dataset has 6 synthetic accounts × 3 business dates = 18
  rows total.

## What The Serving Result Should Look Like

The goal is one row per `business_date` and `currency_code`:

| business_date | currency_code | ledger_total |
| ------------- | ------------- | -----------: |
| 2026-03-29    | EUR           |        16450 |
| 2026-03-29    | RON           |        78740 |
| 2026-03-30    | EUR           |        16550 |
| 2026-03-30    | RON           |        79130 |
| 2026-03-31    | EUR           |        16400 |
| 2026-03-31    | RON           |        79300 |

6 rows total; the latest-day total across both currencies is
`16,400 + 79,300 = 95,700`. The dashboard's "Latest total"
scorecard is going to read that exact number.

## Steps

### Step 1 - Run The Aggregation In The Workbench

Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0)
and run:

```sql
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total
FROM account_daily_balances
GROUP BY business_date, currency_code
ORDER BY business_date, currency_code;
```

You should see exactly the 6-row table above. Notice the shape:

- The `GROUP BY` does the work; the SUM aggregates across the
  six accounts within each `(business_date, currency_code)`
  group.
- The 18 raw rows collapse into 6 grouped rows. The grain
  changed from account-day to date-currency.
- No `account_id` in the SELECT list. The chart will never see
  it.

If your output has 18 rows instead of 6, the SUM is missing or
the GROUP BY is wrong - aggregation isn't optional here.

### Step 2 - Run The Field-Boundary And Control-Total Check

This second query is what the BI author runs to convince
themselves the serving result is correct before publishing
charts on it:

```sql
WITH serving_deposit_dashboard AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  COUNT(*) AS serving_rows,
  MIN(business_date) AS first_business_date,
  MAX(business_date) AS latest_business_date,
  SUM(CASE WHEN currency_code = 'EUR' THEN ledger_total ELSE 0 END)
    AS eur_all_dates_total,
  SUM(CASE WHEN currency_code = 'RON' THEN ledger_total ELSE 0 END)
    AS ron_all_dates_total
FROM serving_deposit_dashboard;
```

Expected single-row output:

| serving_rows | first_business_date | latest_business_date | eur_all_dates_total | ron_all_dates_total |
| -----------: | ------------------- | -------------------- | ------------------: | ------------------: |
|            6 | 2026-03-29          | 2026-03-31           |               49400 |              237170 |

Read the row:

- **`serving_rows = 6`** confirms the grouping produced the
  intended grain. If you see 18, the grouping silently broke.
- **First / latest business dates** define the reporting
  window the dashboard covers. The 2026-03-31 latest date is
  what scorecards filter to.
- **The EUR / RON cross-date totals are control numbers**, not
  metrics for the dashboard. They sum the same money across
  three snapshot dates (which is exactly the failure mode the
  serving view exists to prevent at the chart layer) - their
  use is reconciliation against an upstream source-of-truth
  number, not display.

### Step 3 - Compute The Latest-Day Total

This is what the scorecard tile will eventually read:

```sql
WITH serving_deposit_dashboard AS (
  SELECT
    business_date,
    currency_code,
    SUM(ledger_balance) AS ledger_total
  FROM account_daily_balances
  GROUP BY business_date, currency_code
)
SELECT
  business_date,
  SUM(ledger_total) AS latest_total
FROM serving_deposit_dashboard
WHERE business_date = DATE '2026-03-31'
GROUP BY business_date;
```

Expected: `latest_total = 95,700` for `2026-03-31`. That's
EUR 16,400 + RON 79,300, summed across both currencies. The
filter pin (`business_date = DATE '2026-03-31'`) is what makes
the answer interpretable.

Two things to internalise here:

- The latest day is the only sensible scorecard total. Summing
  every day would triple-count the same six accounts.
- The latest day is itself a `business_date` filter, not a
  "show latest" chart option. Filters in SQL produce real
  results; chart options can be misconfigured silently.

### Step 4 - Write Down The Exposed And Excluded Fields

Take a moment with your editor of choice. Two lines in your
notes:

- **Exposed serving fields**: `business_date`,
  `currency_code`, `ledger_total`.
- **Excluded sensitive fields**: `account_id`, `customer_id`,
  `synthetic_iban`.

The next lessons will reference these lists when discussing
metric contracts and dashboard governance. They are the
contract the dashboard reads against.

### Optional - Deploy The Serving View To BigQuery

Skip this section if you don't have a BigQuery project handy.
The browser path above is sufficient for everything the rest
of the course relies on; this section is for learners who want
to feel the warehouse-deploy shape.

Replace `PROJECT_ID` with your project ID. Do not paste
credentials into notes or commits.

```sql
CREATE SCHEMA IF NOT EXISTS `PROJECT_ID.looker_bi_gym_synthetic`;

CREATE OR REPLACE TABLE `PROJECT_ID.looker_bi_gym_synthetic.account_daily_balances` AS
SELECT * FROM UNNEST([
  STRUCT(DATE '2026-03-29' AS business_date, 'A1001' AS account_id, 42800 AS ledger_balance, 'RON' AS currency_code),
  STRUCT(DATE '2026-03-29', 'A1002', 9250, 'EUR'),
  STRUCT(DATE '2026-03-29', 'A1003', 18640, 'RON'),
  STRUCT(DATE '2026-03-29', 'A1004', 12200, 'RON'),
  STRUCT(DATE '2026-03-29', 'A1005', 7200, 'EUR'),
  STRUCT(DATE '2026-03-29', 'A1006', 5100, 'RON'),
  STRUCT(DATE '2026-03-30', 'A1001', 43120, 'RON'),
  STRUCT(DATE '2026-03-30', 'A1002', 9400, 'EUR'),
  STRUCT(DATE '2026-03-30', 'A1003', 18810, 'RON'),
  STRUCT(DATE '2026-03-30', 'A1004', 12150, 'RON'),
  STRUCT(DATE '2026-03-30', 'A1005', 7150, 'EUR'),
  STRUCT(DATE '2026-03-30', 'A1006', 5050, 'RON'),
  STRUCT(DATE '2026-03-31', 'A1001', 43000, 'RON'),
  STRUCT(DATE '2026-03-31', 'A1002', 9300, 'EUR'),
  STRUCT(DATE '2026-03-31', 'A1003', 19000, 'RON'),
  STRUCT(DATE '2026-03-31', 'A1004', 12300, 'RON'),
  STRUCT(DATE '2026-03-31', 'A1005', 7100, 'EUR'),
  STRUCT(DATE '2026-03-31', 'A1006', 5000, 'RON')
]);

CREATE OR REPLACE VIEW `PROJECT_ID.looker_bi_gym_synthetic.serving_deposit_dashboard` AS
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total
FROM `PROJECT_ID.looker_bi_gym_synthetic.account_daily_balances`
GROUP BY business_date, currency_code;
```

Now query the deployed view:

```sql
SELECT business_date, currency_code, ledger_total
FROM `PROJECT_ID.looker_bi_gym_synthetic.serving_deposit_dashboard`
ORDER BY business_date, currency_code;
```

Same 6-row result. Confirm the view's exposed columns via
`INFORMATION_SCHEMA`:

```sql
SELECT column_name, data_type
FROM `PROJECT_ID.looker_bi_gym_synthetic.INFORMATION_SCHEMA.COLUMNS`
WHERE table_name = 'serving_deposit_dashboard'
ORDER BY ordinal_position;
```

| column_name   | data_type |
| ------------- | --------- |
| business_date | DATE      |
| currency_code | STRING    |
| ledger_total  | INT64     |

Three columns, no identifiers. The view's exposed-field
contract is enforced by the warehouse.

### Optional - Bind The View To A Looker Studio Data Source

Skip if you don't have a Looker Studio workspace. This
section is just to feel the dashboard-side handoff.

1. In Looker Studio: `Resource > Manage added data sources >
Add a data source > BigQuery > select your project >
select `serving_deposit_dashboard`.
2. **Inspect the field list before creating any chart**. It
   should be exactly: `business_date` (Date), `currency_code`
   (Text), `ledger_total` (Number). If `ledger_total` defaults
   to anything other than `Sum` aggregation, fix it now.
3. **Credential mode**: the data source editor offers
   **Owner credentials** vs **Viewer credentials**. Decide
   explicitly:
   - Owner credentials = every viewer of the report queries
     BigQuery as you. Convenient; bypasses BigQuery's IAM
     model for downstream viewers. Useful for aggregate
     dashboards where you've narrowed the view to safe
     fields.
   - Viewer credentials = each viewer queries as themselves;
     BigQuery's grants enforce per-viewer. Required when
     row-level security or policy tags are in play.
     For this synthetic dashboard, either is defensible; record
     which one you picked in your notes.
4. Build the latest-day scorecard: a scorecard widget,
   metric `ledger_total`, filter `business_date =
2026-03-31`. Expected value: `95,700`.
5. Build the per-currency table: a table widget,
   dimension `currency_code`, metric `ledger_total`, filter
   `business_date = 2026-03-31`. Expected: `EUR = 16,400`,
   `RON = 79,300`.
6. **Do not** paste credentials, access tokens, private
   report URLs, or screenshots with private account details
   into notes or commits.

## Checkpoints

- Browser SQL returns exactly 6 serving rows with the values
  in the goal table.
- The control-total query returns `serving_rows = 6`,
  `latest_business_date = 2026-03-31`,
  `eur_all_dates_total = 49,400`, `ron_all_dates_total =
237,170`.
- The latest-day total query returns `95,700`.
- The serving view's exposed fields are exactly
  `business_date`, `currency_code`, `ledger_total` - no
  identifiers.
- (Optional) BigQuery view deployed and queryable.
- (Optional) Looker Studio data source bound with credential
  mode recorded.

## Common Failure Modes

- **Pointing Looker Studio directly at the raw 18-row table**
  because "the chart can aggregate". The chart can, but each
  chart picks its own grain, and the first one that adds an
  account dimension breaks every other chart's totals.
- **Summing balances across all dates** for the scorecard.
  That triple-counts the same six accounts and produces a
  number close to `287,170` instead of `95,700`.
- **Adding `account_id`, `customer_id`, or `synthetic_iban`
  to the serving view "for debugging"** and forgetting to
  remove them. They train the audience to expect access to
  per-customer detail and widen the access surface.
- **Treating a BigQuery logical view as if it accepted
  runtime parameters**. Logical views are stored SQL; their
  parameters are the SELECT-list columns, not function
  arguments.
- **Pasting credentials, OAuth tokens, or private report
  URLs into notes**. Credentials don't belong in BI
  documentation; if a note exists at all, it records the
  credential _mode_ (Owner vs Viewer), not credential
  values.

## Recovery Checks

- **Browser SQL returns 18 rows**: the query is at
  account-date grain because the GROUP BY is missing or the
  SUM didn't run. Add `GROUP BY business_date, currency_code`
  and an explicit `SUM(ledger_balance)`.
- **Latest total is not `95,700`**: the filter is either
  missing or off by a day. Compare to the goal table; the
  RON row for 2026-03-31 should be 79,300.
- **Latest total is around `287,170`**: the filter is
  missing; the query summed all three days. Add
  `WHERE business_date = DATE '2026-03-31'`.
- **Looker Studio chart shows account-level rows**: it's
  connected to the raw table, not the serving view. Reconnect
  via `Resource > Manage added data sources`.
- **BigQuery says the dataset or table does not exist**:
  `PROJECT_ID` substitution missed one of the statements;
  rerun the setup script with the substitution applied
  consistently.

## What You Have Now

A 6-row serving result that the next lesson plugs into the
first Looker Studio dashboard. The contract is small and
explicit:

- 3 exposed columns: `business_date`, `currency_code`,
  `ledger_total`.
- 3 excluded sensitive columns: `account_id`, `customer_id`,
  `synthetic_iban`.
- 1 control total: `95,700` for the latest day.

Lesson 02 takes this further, adding a branch dimension and
showing how the same pattern keeps unmapped branches visible
instead of silently dropping them. Lesson 05 returns to this
view when you join ownership rows for "deposits per
customer" reporting - and shows why doing it naively makes
the total jump from `95,700` to `164,800`.

## Deliverable

A short personal note (in your own editor) with:

- the six-row browser SQL result (or a screenshot summary;
  the values matter, the styling doesn't);
- the latest-day dashboard total (`95,700`);
- the exposed field list and the excluded field list;
- the BigQuery view name if you deployed it;
- the Looker Studio credential mode if you connected one
  (just the mode name - no credentials, no tokens, no
  private links).
