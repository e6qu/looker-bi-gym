---
{
  "id": "tutorial-tutorials-02-build-a-bi-friendly-model",
  "title": "02 - Build A BI-Friendly Deposit Model",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PERSONAL-DATA",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 02 - Build A BI-Friendly Deposit Model

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: use only the predefined synthetic deposits dataset. Do
not use real, masked production, customer, account, transaction, employee, or
regulatory data.

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [01 - Prepare A Synthetic Serving View For Looker Studio](01-connect-public-data.md)
- [Data Sources](data-sources.md)

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: turn raw-shaped synthetic deposits tables into a BI-friendly model
contract without changing metric grain or exposing unnecessary identifiers.

After this tutorial, you will be able to:

- Declare source-table
  <a class="termRef" href="#/terminology/bi.md#grain">grain<sup>BI</sup></a>
  before aggregation.
- Separate
  <a class="termRef" href="#/terminology/bi.md#fact-table">fact<sup>BI</sup></a>,
  <a class="termRef" href="#/terminology/bi.md#dimension">dimension<sup>BI</sup></a>,
  and serving-output responsibilities.
- Build a safe serving output that preserves branch-mapping exceptions.
- Explain why ownership rows must not be joined before account-date balance
  grain is controlled.

Produces:

- Grain contract for the deposits model.
- Browser-first SQL result for a safe latest-day branch/currency serving output.
- `notes/02-grain-and-model-contract.md`, if you keep external notes.

## Goal

Create this model contract:

| Layer                          | Grain                                                                   | Purpose                                        | Sensitive Fields In Serving Output  |
| ------------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------- |
| `dim_branch`                   | one row per `branch_id`                                                 | branch geography and mapping context           | no                                  |
| `dim_product`                  | one row per `product_id`                                                | deposit product grouping                       | no                                  |
| `dim_account_masked`           | one row per `account_id`                                                | masked account attributes for controlled joins | no raw account/customer identifiers |
| `fct_account_daily_balances`   | one row per `account_id` and `business_date`                            | semi-additive balance snapshots                | restricted model layer only         |
| `serving_deposit_branch_daily` | one row per `business_date`, `currency_code`, and branch display bucket | dashboard-ready branch/currency totals         | no                                  |

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Run this source-grain profile:

```sql
SELECT
  COUNT(*) AS balance_rows,
  COUNT(DISTINCT account_id) AS account_count,
  COUNT(DISTINCT currency_code) AS currency_count,
  CAST(MIN(business_date) AS STRING) AS first_business_date,
  CAST(MAX(business_date) AS STRING) AS latest_business_date
FROM account_daily_balances;
```

3. Confirm this output:

| balance_rows | account_count | currency_count | first_business_date | latest_business_date |
| -----------: | ------------: | -------------: | ------------------- | -------------------- |
|           18 |             6 |              2 | 2026-03-29          | 2026-03-31           |

4. Run the model-join health check:

```sql
SELECT
  COUNT(*) AS account_rows,
  SUM(CASE WHEN b.branch_id IS NULL THEN 1 ELSE 0 END) AS missing_branch_mappings,
  SUM(CASE WHEN a.synthetic_iban IS NOT NULL THEN 1 ELSE 0 END) AS raw_iban_fields
FROM accounts a
LEFT JOIN branches b
  ON a.branch_id = b.branch_id;
```

5. Confirm this output:

| account_rows | missing_branch_mappings | raw_iban_fields |
| -----------: | ----------------------: | --------------: |
|            6 |                       1 |               6 |

6. Write this model rule in your notes: `synthetic_iban` exists in the raw
   account table but is excluded from serving outputs.
7. Run the safe latest-day serving query:

```sql
WITH fct_account_daily_balances AS (
  SELECT
    business_date,
    account_id,
    ledger_balance,
    currency_code,
    source_cutoff_timestamp
  FROM account_daily_balances
),
dim_account_masked AS (
  SELECT
    account_id,
    branch_id,
    product_id,
    account_status,
    regulatory_context_tag
  FROM accounts
),
dim_branch AS (
  SELECT
    branch_id,
    city AS branch_city,
    county,
    bnr_region
  FROM branches
),
serving_deposit_branch_daily AS (
  SELECT
    f.business_date,
    f.currency_code,
    COALESCE(b.branch_city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(f.ledger_balance) AS ledger_total,
    COUNT(DISTINCT f.account_id) AS account_count,
    MAX(f.source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM fct_account_daily_balances f
  INNER JOIN dim_account_masked a
    ON f.account_id = a.account_id
  LEFT JOIN dim_branch b
    ON a.branch_id = b.branch_id
  GROUP BY
    f.business_date,
    f.currency_code,
    COALESCE(b.branch_city, 'UNMAPPED_BRANCH')
)
SELECT
  branch_city,
  currency_code,
  ledger_total,
  account_count,
  source_cutoff_timestamp
FROM serving_deposit_branch_daily
WHERE business_date = DATE '2026-03-31'
ORDER BY currency_code, branch_city;
```

8. Confirm this latest-day serving output:

| branch_city     | currency_code | ledger_total | account_count | source_cutoff_timestamp |
| --------------- | ------------- | -----------: | ------------: | ----------------------- |
| Brasov          | EUR           |         7100 |             1 | 2026-03-31T20:15:00Z    |
| Cluj-Napoca     | EUR           |         9300 |             1 | 2026-03-31T20:15:00Z    |
| Bucuresti       | RON           |        43000 |             1 | 2026-03-31T20:15:00Z    |
| Iasi            | RON           |        19000 |             1 | 2026-03-31T20:15:00Z    |
| Timisoara       | RON           |        12300 |             1 | 2026-03-31T20:15:00Z    |
| UNMAPPED_BRANCH | RON           |         5000 |             1 | 2026-03-31T20:15:00Z    |

9. Run the serving control total check:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance,
    currency_code
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
)
SELECT
  SUM(ledger_balance) AS latest_ledger_total,
  COUNT(DISTINCT account_id) AS latest_account_count,
  COUNT(DISTINCT currency_code) AS latest_currency_count
FROM latest_balances;
```

10. Confirm this output:

| latest_ledger_total | latest_account_count | latest_currency_count |
| ------------------: | -------------------: | --------------------: |
|               95700 |                    6 |                     2 |

11. Record the fields that must not appear in the serving output:
    `account_id`, `customer_id`, `synthetic_iban`.
12. Record the fanout warning: `account_owners` is many-to-many and must not be
    joined to balances before account-date grain is controlled.

## Checkpoints

- The source profile shows 18 balance rows, 6 accounts, 2 currencies, and latest
  business date `2026-03-31`.
- The model-join health check finds exactly 1 missing branch mapping.
- The safe serving output includes `UNMAPPED_BRANCH` rather than dropping the
  unmapped account.
- The latest serving control total is `95700`.
- The serving output excludes raw account, customer, and synthetic IBAN fields.
- Ownership rows are documented as a separate grain from current-balance KPIs
  and later depositor-bank coverage analysis.

## Common Failure Modes

- Treating `account_daily_balances` as event rows and summing balances across
  all dates.
- Inner-joining branches and silently dropping the unmapped account.
- Joining `account_owners` before calculating account-grain balances.
- Publishing `synthetic_iban` because the identifier is fake.
- Treating depositor-bank coverage grain as the same thing as current account
  balance KPI grain.

## Recovery Checks

- If the latest total is `90700`, the unmapped branch account was probably
  dropped; use a left join to branch and keep `UNMAPPED_BRANCH`.
- If the latest total is `164800`, ownership rows were joined before the
  account-grain balance was controlled.
- If the serving output contains `account_id`, `customer_id`, or
  `synthetic_iban`, remove the raw identifier from the serving layer and keep it
  only in a restricted model/debug layer.

## End Challenge

Write a model handoff note in this form:

`balance_rows=<rows>; latest_total=<total>; missing_branch_mappings=<count>; serving_grain=<grain>; excluded_fields=<field_list>; fanout_warning=<yes/no>`

Fill it in from your own browser SQL output before opening the expected
answer.

<details>
<summary>Reveal expected answer</summary>

`balance_rows=18; latest_total=95700; missing_branch_mappings=1; serving_grain=business_date+currency_code+branch_city; excluded_fields=account_id,customer_id,synthetic_iban; fanout_warning=yes`

</details>

## Deliverable

Create `notes/02-grain-and-model-contract.md` with:

- the source-grain profile output;
- the model contract table;
- the missing branch mapping count;
- the safe latest-day serving output;
- the latest serving control total;
- the excluded sensitive-field list;
- the fanout warning for ownership rows.
