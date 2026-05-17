---
{
  "id": "tutorial-tutorials-02-build-a-bi-friendly-model",
  "title": "02 - From Raw Rows To A BI-Friendly Deposits Model",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.3.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BI-FANOUT-JOIN-RISK",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PERSONAL-DATA",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 02 - From Raw Rows To A BI-Friendly Deposits Model

## The Moment

The branch finance lead asks for "deposits by branch and currency for
the latest business date". You look at what is available and find
three tables in the synthetic deposits dataset:

- `account_daily_balances`: one row per account per `business_date`,
  with `ledger_balance` and `currency_code`.
- `accounts`: one row per account, with `branch_id`, `product_id`,
  `account_status`, and a `synthetic_iban` field.
- `branches`: one row per branch, with `city`, `county`, and a
  `bnr_region` mapping.

The instinct is to join all three and `GROUP BY` branch and
currency. The instinct is right - but two real things can go wrong
between here and a number you can hand back. This lesson is the
safe path.

## Prior Knowledge

`SELECT`, `JOIN`, `GROUP BY`, and the difference between
`INNER JOIN` and `LEFT JOIN`. If you already know that a stock value
(a balance) cannot be summed across snapshot dates, this lesson is
the warehouse-side application of that rule.

Objective: turn the three synthetic source tables into a serving
result that a published deposits dashboard can read - aggregated to
one row per `business_date`, `currency_code`, and branch, with no
identifier columns, with the unmapped branch kept visible, and with
a control total that reconciles back to the source.

After this tutorial, you will be able to:

- State the grain of each source table out loud before you join it.
- Write a serving query that keeps unmapped branches visible instead
  of silently dropping them.
- Name the three identifier columns that must not appear in the
  serving result, and explain why.
- Recognise the fanout-from-ownership trap before someone catches it
  in review.

Produces:

- A SQL result you can read in the workbench: one row per
  `business_date`, `currency_code`, and branch, with `ledger_total`
  and `account_count`.
- A short personal note (kept in your own editor) with the grain of
  each source table, the unmapped-branch count, and the
  excluded-field list.

## Steps

### Step 1 - Profile The Source Tables Before You Touch The Join

Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
Three tables matter for this lesson; profile each before you touch
the join.

**`account_daily_balances` (fact-shaped, one row per account per
`business_date`)**

```sql
SELECT
  COUNT(*) AS balance_rows,
  COUNT(DISTINCT account_id) AS account_count,
  COUNT(DISTINCT currency_code) AS currency_count,
  CAST(MIN(business_date) AS STRING) AS first_business_date,
  CAST(MAX(business_date) AS STRING) AS latest_business_date
FROM account_daily_balances;
```

Expected:

| balance_rows | account_count | currency_count | first_business_date | latest_business_date |
| -----------: | ------------: | -------------: | ------------------- | -------------------- |
|           18 |             6 |              2 | 2026-03-29          | 2026-03-31           |

Read this: 18 rows / 6 accounts = 3 dates per account exactly, which
is the shape "one row per account per `business_date`" should
produce for three reporting dates. If the ratio were not clean (say
17 rows, or 6.3 dates per account on average), the "one row per
account per business date" claim would already be a lie and the
rest of the lesson would compound the problem.

**`accounts` (dimension-shaped, one row per account)**

```sql
SELECT
  COUNT(*)                          AS account_rows,
  COUNT(DISTINCT account_id)        AS distinct_account_ids,
  COUNT(DISTINCT branch_id)         AS distinct_branch_ids_referenced,
  SUM(CASE WHEN synthetic_iban IS NULL THEN 1 ELSE 0 END)
                                    AS missing_iban_rows
FROM accounts;
```

Expected:

| account_rows | distinct_account_ids | distinct_branch_ids_referenced | missing_iban_rows |
| -----------: | -------------------: | -----------------------------: | ----------------: |
|            6 |                    6 |                              5 |                 0 |

`account_rows = distinct_account_ids = 6` confirms that `account_id`
is unique on `accounts` - the dimension does what you would expect.
`distinct_branch_ids_referenced = 5` is the first hint of trouble:
the accounts reference 5 different `branch_id` values, but how many
of those exist in the `branches` table?

**`branches` (dimension-shaped, one row per branch)**

```sql
SELECT
  branch_id,
  city,
  county
FROM branches
ORDER BY branch_id;
```

Expected:

| branch_id | city        | county    |
| --------- | ----------- | --------- |
| BR-BC-01  | Bacau       | Bacau     |
| BR-BV-01  | Brasov      | Brasov    |
| BR-B-01   | Bucuresti   | Bucuresti |
| BR-CJ-01  | Cluj-Napoca | Cluj      |
| BR-IS-01  | Iasi        | Iasi      |
| BR-TM-01  | Timisoara   | Timis     |

Six rows. So `accounts` reference 5 distinct branches but `branches`
has 6 listed - which would matter if the question were "which branch
has no accounts?", but the BI-failure question is the other way
around: are there accounts whose `branch_id` is not present in
`branches`?

### Step 2 - Check The Branch Mapping Before You Inner-Join

The `accounts` table maps each account to a branch, and the
`branches` table is the dimension. Before you join, check for the
single thing that silently breaks BI joins: an account whose
`branch_id` does not exist in `branches`.

```sql
SELECT
  COUNT(*) AS account_rows,
  SUM(CASE WHEN b.branch_id IS NULL THEN 1 ELSE 0 END)
    AS missing_branch_mappings,
  SUM(CASE WHEN a.synthetic_iban IS NOT NULL THEN 1 ELSE 0 END)
    AS rows_with_synthetic_iban
FROM accounts a
LEFT JOIN branches b
  ON a.branch_id = b.branch_id;
```

Expected:

| account_rows | missing_branch_mappings | rows_with_synthetic_iban |
| -----------: | ----------------------: | -----------------------: |
|            6 |                       1 |                        6 |

One account does not map to a branch. If you had used an
`INNER JOIN`, that account's balance would disappear silently from
your dashboard and the latest total would read `90,700` instead of
the correct `95,700`. Two design rules come out of this row:

- **Use `LEFT JOIN` to the branch dimension** and label the unmapped
  bucket explicitly (e.g. `UNMAPPED_BRANCH`).
- **Make `missing_branch_mappings` a visible control number** in the
  serving result so a stakeholder cannot miss the fact that one
  account did not map.

`rows_with_synthetic_iban = 6` is the second design rule: every
account carries a synthetic IBAN in the raw model layer; none of
them belong in the dashboard serving result.

### Step 3 - Write The Safe Serving Query

This query builds the serving result the way a published deposits
dashboard should read it. Each CTE is one model layer.

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

Two notes about this shape:

- The serving result excludes `account_id`, `customer_id`, and
  `synthetic_iban`. They never reach the dashboard layer.
- The `INNER JOIN` to `dim_account_masked` is safe because the join
  is on `account_id` and `accounts` has one row per `account_id`;
  the row count of `fct_account_daily_balances` cannot change. The
  `LEFT JOIN` to `dim_branch` is what keeps the unmapped account
  visible.

Run the query. Expected:

| branch_city     | currency_code | ledger_total | account_count | source_cutoff_timestamp |
| --------------- | ------------- | -----------: | ------------: | ----------------------- |
| Brasov          | EUR           |         7100 |             1 | 2026-03-31T20:15:00Z    |
| Cluj-Napoca     | EUR           |         9300 |             1 | 2026-03-31T20:15:00Z    |
| Bucuresti       | RON           |        43000 |             1 | 2026-03-31T20:15:00Z    |
| Iasi            | RON           |        19000 |             1 | 2026-03-31T20:15:00Z    |
| Timisoara       | RON           |        12300 |             1 | 2026-03-31T20:15:00Z    |
| UNMAPPED_BRANCH | RON           |         5000 |             1 | 2026-03-31T20:15:00Z    |

The `UNMAPPED_BRANCH` row carries the EUR 5,000 the inner join would
have dropped. Six rows total; `SUM(ledger_total) = 95,700`.

### Step 4 - Verify The Control Total

Reconcile the serving result against the source for the same day:

```sql
SELECT
  SUM(ledger_balance) AS source_latest_ledger_total,
  COUNT(DISTINCT account_id) AS source_latest_account_count
FROM account_daily_balances
WHERE business_date = DATE '2026-03-31';
```

Expected:

| source_latest_ledger_total | source_latest_account_count |
| -------------------------: | --------------------------: |
|                      95700 |                           6 |

If your serving result's total matches this number, the join did not
change the grain. If it doesn't match, work back through the joins.

**Debug recipe when the total is wrong.** Pick the most likely
culprit first based on what number you actually see:

- **Total = 90,700** (off by exactly 5,000). The unmapped account
  (the one whose `branch_id` does not exist in `branches`) was
  silently dropped by an `INNER JOIN`. Switch to `LEFT JOIN dim_branch`
  and rerun.
- **Total = 95,700 × 3 = 287,100** or similar multiples. You forgot
  the `WHERE business_date = DATE '2026-03-31'` filter and are
  summing all three snapshot dates. Add the filter.
- **Total = 164,800**. You joined the `account_owners` table to the
  balance fact before reducing one side. See "The Fanout Trap"
  below.
- **Total = 95,700.0 but the chart shows zero rows for one
  currency**. The `GROUP BY` includes a column that has NULLs the
  serving result is silently dropping; check the
  `COALESCE(branch_city, 'UNMAPPED_BRANCH')` is present and the
  `INNER` vs `LEFT` choice on every join.

The general rule: when a number is wrong, ask "did the join change
the row count?" before you ask anything else. A control SQL that
counts rows at each CTE stage is cheap and answers it directly:

```sql
WITH stage_a AS (SELECT * FROM account_daily_balances
                 WHERE business_date = DATE '2026-03-31'),
     stage_b AS (SELECT a.account_id, a.business_date, a.ledger_balance,
                        a.currency_code, b.branch_id
                 FROM stage_a a
                 INNER JOIN accounts b ON a.account_id = b.account_id)
SELECT
  (SELECT COUNT(*) FROM stage_a) AS stage_a_rows,
  (SELECT COUNT(*) FROM stage_b) AS stage_b_rows;
```

If `stage_b_rows > stage_a_rows`, a join multiplied rows. If
`stage_b_rows < stage_a_rows`, a join dropped rows. Either way,
fix the join before changing the aggregation.

### The Fanout Trap (Why The Ownership Table Is Not In This Query)

The synthetic dataset has an `account_owners` table with one row per
(account, owner) pair. Some accounts have two owners. If you
`INNER JOIN` it into the serving query above, the row count of
`fct_account_daily_balances` doubles for every co-owned account and
`SUM(ledger_balance)` jumps from `95,700` to `164,800` - silently.

That is a different kind of question (who owns what; depositor-bank
coverage) and it needs a different model shape. **Never join ownership
rows to a current-balance KPI without first reducing one side to a
single row per account.** Lesson 05 walks through the fanout repair
in detail.

## Checkpoints

You can answer all of these without rerunning the SQL:

- What's the row grain of `account_daily_balances`?
- Which kind of join would have dropped the unmapped account, and
  what would the dashboard total have read?
- Which three identifier columns must not appear in the serving
  result?
- What would happen to `SUM(ledger_balance)` if you joined the
  ownership table to the balance fact table without aggregating one
  side first?

## Common Failure Modes

- Treating `account_daily_balances` as event rows and summing
  balances across all `business_date` values - the result will be
  ~3x the correct latest total.
- Using `INNER JOIN` to `branches` and silently dropping the
  unmapped account; the total will be `90,700` instead of `95,700`.
- Letting `synthetic_iban` ride along into the serving result
  "because the data is synthetic" - this trains the wrong production
  habit.
- Mixing current-balance grain with depositor-bank coverage grain in
  a single KPI; coverage is per depositor per bank, not per account.

## What You Have Now

A serving result for the latest `business_date` - six rows, no
sensitive fields, control total `95,700` that ties back to the
source. The fields you can publish are `business_date`,
`currency_code`, `branch_city`, `ledger_total`, `account_count`,
`source_cutoff_timestamp`. The fields you have intentionally not
published are `account_id`, `customer_id`, `synthetic_iban`,
`account_status`, `regulatory_context_tag`.

Lesson 03 takes this exact serving shape and wires it into the
first Looker Studio dashboard: a latest-day scorecard, a per-
currency table, and a per-branch bar chart, all reading from a
single governed data source. None of those charts has to recompute
anything; they read named columns.

Lesson 05 returns to the fanout trap and shows the correct two-step
shape for ownership questions (first reduce ownership to a single
share per account, then join to balances). If you ever need to
answer "total deposits per depositor", that's where you go - not
back into this serving result.

Lesson 07 returns to the excluded-fields list and shows how to
enforce it on the warehouse side (authorized views, column-level
policy tags), so the choice you just made by hand becomes a policy
the platform enforces against any future ad-hoc query.
