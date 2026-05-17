---
{
  "id": "tutorial-tutorials-04-metrics-and-calculated-fields",
  "title": "04 - Define Governed Metrics And Calculated Fields",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 04 - Define Governed Metrics And Calculated Fields

Synthetic-data boundary: use only the predefined synthetic deposits dataset.
Do not use real balances, real customer attributes, screenshots from private
reports, credentials, or production regulatory outputs.

Prior knowledge expected:

- A dimensional model with declared grain and a governed serving layer.
- A working executive dashboard spec or equivalent KPI definition.
- Weighted-average reasoning: why `SUM(a) / SUM(b)` differs from
  `AVG(row_ratio)`.

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: decide which
<a class="termRef" href="#/terminology/bi.md#metric">metric<sup>BI</sup></a>
logic belongs upstream, which reusable
<a class="termRef" href="#/terminology/looker-studio.md#looker-studio-calculated-field">calculated fields<sup>LS</sup></a>
belong in a Looker Studio data source, and which calculations are
only chart formatting.

After this tutorial, you will be able to:

- Write a
  <a class="termRef" href="#/terminology/bi.md#metric-contract">metric contract<sup>BI</sup></a>
  with owner, grain, formula, allowed dimensions, and expected values.
- Use weighted formulas for ratio metrics instead of averaging displayed
  averages.
- Configure reusable Looker Studio calculated fields with explicit aggregation
  settings.
- Keep deposit-guarantee context at depositor-bank grain rather than account or
  chart grain.

Produces:

- Browser-first metric-source result.
- Reusable calculated-field specification for Looker Studio.
- Chart settings and expected values for a metric QA page.
- A short personal note (kept in whichever editor you prefer; the platform does not store it).

## Goal

Create this metric contract:

| Metric Or Field           | Grain Or Scope                                      | Formula Or Setting                                  | Expected Latest Value |
| ------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------: |
| Latest ledger total       | latest business date, all synthetic deposit rows    | `SUM(ledger_total)`                                 |                 95700 |
| Active account count      | latest business date, all synthetic deposit rows    | `SUM(account_count)`                                |                     6 |
| Average account balance   | latest business date, weighted by account count     | `SUM(ledger_total) / SUM(account_count)`            |              15950.00 |
| Branch mapping status     | row-level branch bucket                             | unmapped branch bucket becomes `Unmapped`           |         5000 unmapped |
| Balance band              | row-level branch/currency serving row               | `20k or above`, `10k to 19,999`, or `Under 10k`     |      3 rows under 10k |
| Currency percent of total | chart display calculation from latest currency rows | show `ledger_total` as percent of table grand total |          RON = 82.86% |

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Run this reusable metric-source query:

```sql
WITH latest_business_date AS (
  SELECT MAX(business_date) AS business_date
  FROM account_daily_balances
),
metric_source AS (
  SELECT
    b.business_date,
    f.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(f.ledger_balance) AS ledger_total,
    COUNT(DISTINCT f.account_id) AS account_count,
    MAX(f.source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM account_daily_balances f
  INNER JOIN latest_business_date b
    ON f.business_date = b.business_date
  INNER JOIN accounts a
    ON f.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  GROUP BY
    b.business_date,
    f.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  business_date,
  currency_code,
  branch_city,
  ledger_total,
  account_count,
  ROUND(ledger_total / account_count, 2) AS row_average_account_balance,
  source_cutoff_timestamp
FROM metric_source
ORDER BY currency_code, branch_city;
```

3. Confirm this six-row output:

| business_date | currency_code | branch_city     | ledger_total | account_count | row_average_account_balance | source_cutoff_timestamp |
| ------------- | ------------- | --------------- | -----------: | ------------: | --------------------------: | ----------------------- |
| 2026-03-31    | EUR           | Brasov          |         7100 |             1 |                     7100.00 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | EUR           | Cluj-Napoca     |         9300 |             1 |                     9300.00 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Bucuresti       |        43000 |             1 |                    43000.00 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Iasi            |        19000 |             1 |                    19000.00 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | Timisoara       |        12300 |             1 |                    12300.00 | 2026-03-31T20:15:00Z    |
| 2026-03-31    | RON           | UNMAPPED_BRANCH |         5000 |             1 |                     5000.00 | 2026-03-31T20:15:00Z    |

4. Run the contract-level metric check:

```sql
WITH latest_business_date AS (
  SELECT MAX(business_date) AS business_date
  FROM account_daily_balances
),
metric_source AS (
  SELECT
    f.business_date,
    f.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(f.ledger_balance) AS ledger_total,
    COUNT(DISTINCT f.account_id) AS account_count
  FROM account_daily_balances f
  INNER JOIN latest_business_date b
    ON f.business_date = b.business_date
  INNER JOIN accounts a
    ON f.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  GROUP BY
    f.business_date,
    f.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  SUM(ledger_total) AS latest_ledger_total,
  SUM(account_count) AS latest_account_count,
  ROUND(SUM(ledger_total) / SUM(account_count), 2) AS average_account_balance,
  SUM(CASE WHEN branch_city = 'UNMAPPED_BRANCH' THEN ledger_total ELSE 0 END) AS unmapped_ledger_total
FROM metric_source;
```

5. Confirm this one-row output:

| latest_ledger_total | latest_account_count | average_account_balance | unmapped_ledger_total |
| ------------------: | -------------------: | ----------------------: | --------------------: |
|               95700 |                    6 |                15950.00 |                  5000 |

6. Run the currency metric table:

```sql
WITH latest_business_date AS (
  SELECT MAX(business_date) AS business_date
  FROM account_daily_balances
),
metric_source AS (
  SELECT
    f.currency_code,
    SUM(f.ledger_balance) AS ledger_total,
    COUNT(DISTINCT f.account_id) AS account_count
  FROM account_daily_balances f
  INNER JOIN latest_business_date b
    ON f.business_date = b.business_date
  GROUP BY f.currency_code
)
SELECT
  currency_code,
  ledger_total,
  account_count,
  ROUND(ledger_total / account_count, 2) AS average_account_balance,
  ROUND(ledger_total / SUM(ledger_total) OVER (), 4) AS share_of_total
FROM metric_source
ORDER BY currency_code;
```

7. Confirm the currency output:

| currency_code | ledger_total | account_count | average_account_balance | share_of_total |
| ------------- | -----------: | ------------: | ----------------------: | -------------: |
| EUR           |        16400 |             2 |                 8200.00 |         0.1714 |
| RON           |        79300 |             4 |                19825.00 |         0.8286 |

8. Run the balance-band check:

```sql
WITH latest_business_date AS (
  SELECT MAX(business_date) AS business_date
  FROM account_daily_balances
),
metric_source AS (
  SELECT
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(f.ledger_balance) AS ledger_total,
    COUNT(DISTINCT f.account_id) AS account_count
  FROM account_daily_balances f
  INNER JOIN latest_business_date b
    ON f.business_date = b.business_date
  INNER JOIN accounts a
    ON f.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  GROUP BY COALESCE(br.city, 'UNMAPPED_BRANCH')
),
banded AS (
  SELECT
    CASE
      WHEN ledger_total >= 20000 THEN '20k or above'
      WHEN ledger_total >= 10000 THEN '10k to 19,999'
      ELSE 'Under 10k'
    END AS balance_band,
    ledger_total,
    account_count
  FROM metric_source
)
SELECT
  balance_band,
  SUM(ledger_total) AS ledger_total,
  SUM(account_count) AS account_count,
  ROUND(SUM(ledger_total) / SUM(account_count), 2) AS average_account_balance
FROM banded
GROUP BY balance_band
ORDER BY ledger_total DESC;
```

9. Confirm the band output:

| balance_band  | ledger_total | account_count | average_account_balance |
| ------------- | -----------: | ------------: | ----------------------: |
| 20k or above  |        43000 |             1 |                43000.00 |
| 10k to 19,999 |        31300 |             2 |                15650.00 |
| Under 10k     |        21400 |             3 |                 7133.33 |

10. Write the metric implementation contract:

| Name                    | Owner      | Grain                                   | Allowed Dimensions                     | Implementation Location      |
| ----------------------- | ---------- | --------------------------------------- | -------------------------------------- | ---------------------------- |
| Latest ledger total     | Finance BI | latest business date                    | currency, branch, mapping status, band | upstream view or data source |
| Active account count    | Finance BI | latest business date                    | currency, branch, mapping status, band | upstream view or data source |
| Average account balance | Finance BI | latest business date, weighted accounts | currency, branch, mapping status, band | reusable data-source field   |
| Currency percent total  | Finance BI | latest currency table display           | currency only                          | chart display setting        |

11. Record the grain warning: deposit-guarantee coverage examples need
    depositor-bank grain before applying any guarantee ceiling. The latest
    account-balance metric in this tutorial is not a guarantee-coverage metric.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery. If the
synthetic deposits table referenced in this lesson already exists, create only
the view below. If it does not, run the inline BigQuery setup SQL given in the
data-sources reference first.

1. In the BigQuery browser UI, run this view SQL after replacing `PROJECT_ID`:

```sql
CREATE OR REPLACE VIEW `PROJECT_ID.looker_bi_gym_synthetic.metric_contract_source` AS
WITH latest_business_date AS (
  SELECT MAX(business_date) AS business_date
  FROM `PROJECT_ID.looker_bi_gym_synthetic.account_daily_balances`
)
SELECT
  f.business_date,
  f.currency_code,
  COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
  SUM(f.ledger_balance) AS ledger_total,
  COUNT(DISTINCT f.account_id) AS account_count,
  MAX(f.source_cutoff_timestamp) AS source_cutoff_timestamp
FROM `PROJECT_ID.looker_bi_gym_synthetic.account_daily_balances` f
INNER JOIN latest_business_date b
  ON f.business_date = b.business_date
INNER JOIN `PROJECT_ID.looker_bi_gym_synthetic.accounts` a
  ON f.account_id = a.account_id
LEFT JOIN `PROJECT_ID.looker_bi_gym_synthetic.branches` br
  ON a.branch_id = br.branch_id
GROUP BY
  f.business_date,
  f.currency_code,
  COALESCE(br.city, 'UNMAPPED_BRANCH');
```

2. Query the view:

```sql
SELECT
  business_date,
  currency_code,
  branch_city,
  ledger_total,
  account_count,
  source_cutoff_timestamp
FROM `PROJECT_ID.looker_bi_gym_synthetic.metric_contract_source`
ORDER BY currency_code, branch_city;
```

3. Confirm it matches the six-row browser-first metric-source output.

### Optional Looker Studio UI Path

Use this section only after the optional BigQuery view exists.

1. Create a Looker Studio data source from `metric_contract_source`.
2. Confirm the base fields use these settings:

| Field                     | Type        | Default Aggregation |
| ------------------------- | ----------- | ------------------- |
| `business_date`           | Date        | None                |
| `currency_code`           | Text        | None                |
| `branch_city`             | Text        | None                |
| `ledger_total`            | Number      | Sum                 |
| `account_count`           | Number      | Sum                 |
| `source_cutoff_timestamp` | Date & Time | Max                 |

3. Add this reusable data-source calculated field:

| Field Name                | Formula                                  | Type   | Aggregation |
| ------------------------- | ---------------------------------------- | ------ | ----------- |
| `Average Account Balance` | `SUM(ledger_total) / SUM(account_count)` | Number | Auto        |

Cert-track note on `Aggregation: Auto`: this works because
`ledger_total` and `account_count` are data-source numeric fields with
their own default aggregation of `Sum`. The calculated field formula
wraps those underlying fields in explicit `SUM()`, so the chart layer
does not re-aggregate the result. If you reused this field with a
different aggregation default at the chart level, you would silently
change the metric, which is exactly the trap this tutorial is meant to
prevent. Treat reusable ratio metrics as "defined once at the data
source, never overridden on the chart".

4. Add this reusable data-source calculated dimension:

| Field Name              | Formula                                                                                                                    | Type | Aggregation |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- |
| `Branch Mapping Status` | `CASE WHEN branch_city = "UNMAPPED_BRANCH" THEN "Unmapped" ELSE "Mapped" END`                                              | Text | None        |
| `Balance Band`          | `CASE WHEN ledger_total >= 20000 THEN "20k or above" WHEN ledger_total >= 10000 THEN "10k to 19,999" ELSE "Under 10k" END` | Text | None        |

5. Create a metric QA page with these components:
   - scorecard: `ledger_total`, expected `95700`;
   - scorecard: `account_count`, expected `6`;
   - scorecard: `Average Account Balance`, expected `15950.00`;
   - table by `currency_code` with `ledger_total`, `account_count`, and
     `Average Account Balance`;
   - table by `Balance Band` with `ledger_total`, `account_count`, and
     `Average Account Balance`;
   - table by `Branch Mapping Status` with `ledger_total`.
6. For the currency table only, set the displayed `ledger_total` comparison or
   display option to percent of total if available in your report editor. The
   expected displayed percentages are `EUR = 17.14%` and `RON = 82.86%`.
7. Do not create a separate chart-specific version of latest ledger total or
   average account balance. If a formula is business logic, keep it in the
   upstream view or reusable data source.
8. Inspect data credentials and record the mode in notes. Do not copy
   credentials, tokens, private links, or screenshots with private account
   details.

## Checkpoints

- Browser SQL returns the exact six-row latest metric source.
- Latest ledger total is `95700`.
- Latest account count is `6`.
- Weighted average account balance is `15950.00`.
- Currency shares are `EUR = 17.14%` and `RON = 82.86%`.
- The unmapped branch remains visible with `5000`.
- Reusable business metrics are not hidden in one chart-specific formula.
- Deposit-guarantee context is documented as depositor-bank grain, not latest
  account-balance grain.

## Aggregation Notes For Cert-Track Learners

- The reusable `Average Account Balance` field uses `SUM(ledger_total) /
SUM(account_count)` so it stays correct under any chart filter context.
  The forbidden shape is `AVG(row_average_account_balance)`, which is an
  average of averages and gives `14012.50` instead of `15950.00`.
- `SUM(account_count)` is summing `COUNT(DISTINCT account_id)` across
  groups. It is correct here only because each account belongs to one
  currency and one branch. As soon as an account spans groups, the
  additive shortcut overstates. The cert-correct recompute is
  `COUNT(DISTINCT account_id)` over the same window.

## Common Failure Modes

- Summing balance snapshots across all dates and getting `286570` instead of
  the latest-day total.
- Inner-joining branches and getting `90700` because the unmapped branch was
  dropped.
- Joining account owners before controlling account-date grain and getting
  `164800`.
- Averaging currency averages and getting `14012.50` instead of the weighted
  average `15950.00`.
- Creating separate chart-only definitions for the same governed metric.
- Treating an account-balance KPI as a deposit-guarantee coverage calculation.

## Recovery Checks

- If latest ledger total is `286570`, add the latest-date filter.
- If latest ledger total is `90700`, replace the branch inner join with a left
  join and keep `UNMAPPED_BRANCH`.
- If latest ledger total is `164800`, remove the account-owner join from the
  current-balance KPI source.
- If average account balance is `14012.50`, replace average-of-averages logic
  with `SUM(ledger_total) / SUM(account_count)`.
- If Looker Studio refuses a formula, check whether the formula mixes aggregated
  and unaggregated fields. Keep row-level dimensions row-level, and keep metric
  formulas fully aggregated.

## End Challenge

Write a metric handoff note in this form:

`latest_total=<total>; active_accounts=<count>; weighted_average=<value>; currency_share_ron=<percent>; unmapped_total=<total>; reusable_average_formula=<formula>; guarantee_grain=<grain>`

Fill it in from your own browser SQL output before opening the expected
answer.

<details>
<summary>Reveal expected answer</summary>

`latest_total=95700; active_accounts=6; weighted_average=15950.00; currency_share_ron=82.86%; unmapped_total=5000; reusable_average_formula=SUM(ledger_total)/SUM(account_count); guarantee_grain=depositor-bank`

</details>

## Deliverable

Write a short personal note in your own editor with:

- the metric-source six-row output;
- the metric contract table;
- the reusable calculated-field formulas and aggregation settings;
- the chart expected values;
- the recovery note for any value that did not match.
