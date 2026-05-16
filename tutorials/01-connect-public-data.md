---
{
  "id": "tutorial-tutorials-01-connect-public-data",
  "title": "01 - Prepare A Synthetic Serving View For Looker Studio",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
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

# 01 - Prepare A Synthetic Serving View For Looker Studio

Area: A - Orientation And Source Data

Synthetic-data boundary: use only the predefined synthetic deposits dataset or
the inline synthetic rows in this tutorial. Do not connect Looker Studio to real
customer, account, transaction, employee, or regulatory data.

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [Data Sources](data-sources.md)

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: create and verify a narrow synthetic serving result before any
Looker Studio chart is built.

After this tutorial, you will be able to:

- Build a report-ready deposits serving result from account-date balance rows.
- Check expected row counts, totals, dates, and exposed fields before charting.
- Use an optional
  <a class="termRef" href="#/terminology/bigquery.md#bigquery-logical-view">BigQuery logical view<sup>BQ</sup></a>
  as the source shape for Looker Studio.
- Record Looker Studio
  <a class="termRef" href="#/terminology/looker-studio.md#owner-credentials">owner-credentials<sup>LS</sup></a>
  or
  <a class="termRef" href="#/terminology/looker-studio.md#viewer-credentials">viewer-credentials<sup>LS</sup></a>
  mode without storing credentials, tokens, or private links.

Produces:

- Browser-first SQL result for `serving_deposit_dashboard`.
- Optional BigQuery view named `serving_deposit_dashboard`.
- Optional Looker Studio data source and report page.
- `notes/01-serving-view-check.md`, if you keep external notes.

## Goal

Create the smallest useful dashboard source from synthetic balances:

| business_date | currency_code | ledger_total |
| ------------- | ------------- | -----------: |
| 2026-03-29    | EUR           |        16450 |
| 2026-03-29    | RON           |        78740 |
| 2026-03-30    | EUR           |        16550 |
| 2026-03-30    | RON           |        79130 |
| 2026-03-31    | EUR           |        16400 |
| 2026-03-31    | RON           |        79300 |

The source balance table contains 18 rows. The serving result contains 6 rows:
one row per `business_date` and `currency_code`.

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Paste and run this query:

```sql
SELECT
  business_date,
  currency_code,
  SUM(ledger_balance) AS ledger_total
FROM account_daily_balances
GROUP BY business_date, currency_code
ORDER BY business_date, currency_code;
```

3. Confirm the result exactly matches the six-row table in the goal section.
4. Run the field-boundary check:

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
  SUM(CASE WHEN currency_code = 'EUR' THEN ledger_total ELSE 0 END) AS eur_all_dates_total,
  SUM(CASE WHEN currency_code = 'RON' THEN ledger_total ELSE 0 END) AS ron_all_dates_total
FROM serving_deposit_dashboard;
```

5. Confirm this one-row output:

| serving_rows | first_business_date | latest_business_date | eur_all_dates_total | ron_all_dates_total |
| -----------: | ------------------- | -------------------- | ------------------: | ------------------: |
|            6 | 2026-03-29          | 2026-03-31           |               49400 |              237170 |

6. Run the latest-day dashboard check:

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

7. Confirm the latest-day dashboard total is `95700`.
8. Write the three exposed serving fields into your note:
   `business_date`, `currency_code`, `ledger_total`.
9. Write the fields that must stay out of this serving result:
   `account_id`, `customer_id`, `synthetic_iban`.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery. Replace
`PROJECT_ID` with your Google Cloud project ID before running the SQL. Keep the
data synthetic and do not paste credentials into notes.

1. In the BigQuery browser UI, open the SQL workspace.
2. Run this setup script:

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

3. Run the six-row serving query:

```sql
SELECT
  business_date,
  currency_code,
  ledger_total
FROM `PROJECT_ID.looker_bi_gym_synthetic.serving_deposit_dashboard`
ORDER BY business_date, currency_code;
```

4. Confirm the result matches the goal table.
5. Run the field inspection query:

```sql
SELECT
  column_name,
  data_type
FROM `PROJECT_ID.looker_bi_gym_synthetic.INFORMATION_SCHEMA.COLUMNS`
WHERE table_name = 'serving_deposit_dashboard'
ORDER BY ordinal_position;
```

6. Confirm the exposed fields are:

| column_name   | data_type |
| ------------- | --------- |
| business_date | DATE      |
| currency_code | STRING    |
| ledger_total  | INT64     |

### Optional Looker Studio UI Path

Use this section only after the optional BigQuery view exists.

1. In Looker Studio, create a data source using the BigQuery connector.
2. Select the `serving_deposit_dashboard` view.
3. Inspect the field list before creating charts. It should contain only
   `business_date`, `currency_code`, and `ledger_total`.
4. Create a table with:
   - dimension: `business_date`;
   - dimension: `currency_code`;
   - metric: `ledger_total`.
5. Create a scorecard for `ledger_total` with a filter where
   `business_date = 2026-03-31`. The expected value is `95700`.
6. Create a table filtered to `business_date = 2026-03-31` and grouped by
   `currency_code`. The expected rows are `EUR = 16400` and `RON = 79300`.
7. Inspect the data credentials setting and record the mode in your note. Do
   not copy credentials, access tokens, private report links, or screenshots
   with private account details.

## Checkpoints

- Browser SQL returns 6 serving rows.
- Latest business date is `2026-03-31`.
- Latest-day dashboard total is `95700`.
- The serving fields are exactly `business_date`, `currency_code`, and
  `ledger_total`.
- Raw account, customer, and synthetic IBAN identifiers are absent from the
  serving result.
- Optional Looker Studio charts use the serving view, not raw balance rows.

## Common Failure Modes

- Connecting Looker Studio directly to raw account-level rows because it feels
  faster than defining a serving result.
- Summing balances across all dates and presenting that as a latest dashboard
  total.
- Adding `account_id`, `customer_id`, or `synthetic_iban` to the dashboard
  source for debugging and forgetting to remove them.
- Treating a BigQuery logical view as if it accepted runtime parameters.
- Recording credentials, private links, or tokens as evidence.

## Recovery Checks

- If the browser SQL output has 18 rows, the query is still at account-date
  grain; aggregate by `business_date` and `currency_code`.
- If the latest total is not `95700`, check that the filter is exactly
  `business_date = 2026-03-31`.
- If Looker Studio shows account-level fields, reconnect it to the serving view
  instead of the raw table.
- If BigQuery reports a missing dataset or table, confirm that `PROJECT_ID` was
  replaced consistently in every statement.

## End Challenge

Write a release note in this form:

`serving_rows=<count>; latest_date=<date>; latest_total=<total>; exposed_fields=<field_list>; excluded_fields=<field_list>`

Fill it in from your own browser SQL output before opening the expected
answer.

<details>
<summary>Reveal expected answer</summary>

`serving_rows=6; latest_date=2026-03-31; latest_total=95700; exposed_fields=business_date,currency_code,ledger_total; excluded_fields=account_id,customer_id,synthetic_iban`

</details>

## Deliverable

Create `notes/01-serving-view-check.md` with:

- the six-row browser SQL result;
- the latest-day dashboard total;
- the exposed field list;
- the excluded sensitive-field list;
- optional BigQuery view name;
- optional Looker Studio credential mode, without credentials or private links.
