---
{
  "id": "tutorial-tutorials-00-orientation-and-stack",
  "title": "00 - Orient Yourself With The Deposits Dataset",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PERSONAL-DATA",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 00 - Orient Yourself With The Deposits Dataset

Synthetic-data boundary: use the synthetic deposits dataset only.

Prior knowledge expected: how to run a SQL `SELECT` with `GROUP BY`
and `SUM`.

Required tools: browser only.

Objective: open the synthetic deposits dataset, profile its grain
with one SQL query, and write down the two grains that banking BI
will distinguish (account-balance grain vs depositor-bank guarantee
grain) before any later lesson runs a metric.

After this tutorial, you will be able to:

- Open the deposits-seed workbench and run a profiling query against
  the synthetic `account_daily_balances` table.
- State the row grain of `account_daily_balances` in one sentence.
- Name the three fields that must stay out of routine BI serving
  outputs and explain why.
- Distinguish account-balance grain (per account, per day) from
  depositor-bank guarantee grain (per depositor, per bank) on a
  worked synthetic example.

Produces:

- A SQL result you can read in the workbench: one row per
  `business_date`, with the row count and account count per day.
- A short personal note (kept in your own editor) with the grain
  sentence and the two-grain distinction.

## Tables You Will Use

The synthetic deposits dataset exposes one table for this orientation
lesson:

| Column           | Type   | Meaning                                                                  |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| `business_date`  | DATE   | Reporting reference date for the row (end of day).                       |
| `account_id`     | STRING | Synthetic account identifier; sensitive, kept out of BI serving outputs. |
| `ledger_balance` | INT    | Cleared-ledger balance for the account at `business_date`.               |
| `currency_code`  | STRING | ISO 4217 currency for the balance (`RON` or `EUR` in this dataset).      |

## Goal

Confirm that the synthetic table is exactly six accounts across three
business dates (18 rows total). State the grain. Identify the
sensitive fields. Then write down the two grains banking BI will
distinguish.

## Steps

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Run this profile query:

   ```sql
   SELECT
     business_date,
     COUNT(*) AS row_count,
     COUNT(DISTINCT account_id) AS account_count,
     COUNT(DISTINCT currency_code) AS currency_count
   FROM account_daily_balances
   GROUP BY business_date
   ORDER BY business_date;
   ```

3. Confirm this three-row result:

   | business_date | row_count | account_count | currency_count |
   | ------------- | --------: | ------------: | -------------: |
   | 2026-03-29    |         6 |             6 |              2 |
   | 2026-03-30    |         6 |             6 |              2 |
   | 2026-03-31    |         6 |             6 |              2 |

4. State the grain in one sentence. The row count equals the account
   count for every `business_date`, which proves the grain: **one
   row per account per business date**. Save that sentence in your
   own notes.

5. Identify the sensitive fields. `account_id` uniquely identifies a
   synthetic account, which under GDPR's data-minimisation principle
   would be a personal-data identifier in a real banking dataset.
   `customer_id` and `synthetic_iban` (which appear in later lessons)
   are similar: they would let a viewer re-identify a depositor.
   These three fields must stay out of any routine BI serving output;
   aggregates (`SUM(ledger_balance) GROUP BY business_date,
currency_code`) are safe because they do not reveal an individual.

6. Run this account-level peek to see why per-account values are
   pre-disclosure detail:

   ```sql
   SELECT account_id, business_date, ledger_balance, currency_code
   FROM account_daily_balances
   WHERE business_date = DATE '2026-03-31'
   ORDER BY account_id;
   ```

   Confirm you can see the six individual balances. A dashboard that
   exposed this view would let any viewer re-identify the depositor
   set. The fix is to aggregate before charting (lessons 01 and 02
   show how).

7. Write the two-grain note. Banking BI distinguishes two grains
   that look similar but answer different questions:
   - **Account-balance grain**: one row per account per business
     date. Total balance per currency, branch, or business date is
     correct at this grain.
   - **Depositor-bank guarantee grain**: one row per depositor per
     bank. The EU harmonised deposit-guarantee ceiling is EUR
     100,000 **per depositor per credit institution**, regardless of
     how many accounts the depositor holds at that bank. A depositor
     with two RON accounts holding EUR 60,000 each (EUR 120,000
     total) is covered only up to EUR 100,000; the remaining
     EUR 20,000 is uninsured. Mixing the two grains in a single
     dashboard KPI is a real banking-BI failure mode.

   Save the two-grain note. Later lessons will return to it when
   they touch deposit-guarantee questions.

## Checkpoints

- You ran the profile query and confirmed the 18-row /
  6-account-per-day shape.
- You stated the row grain of `account_daily_balances` in one
  sentence.
- You named `account_id`, `customer_id`, and `synthetic_iban` as
  fields that stay out of BI serving outputs.
- You wrote down the difference between account-balance grain and
  depositor-bank guarantee grain, with the EUR 100,000 ceiling.

## Common Failure Modes

- Charting `account_daily_balances` directly without aggregating
  first - this exposes per-account values to dashboard viewers.
- Quoting "total balance" against the guarantee ceiling without
  re-grouping to depositor-bank grain.
- Treating `currency_code` as a sensitive field while leaving
  `account_id` exposed.

## Self-Assessment

For each statement, mark ready or not ready:

- A dashboard page sums `ledger_balance` per `business_date` and
  `currency_code`. (ready)
- A dashboard page lists per-account balances by `account_id`.
  (not ready; sensitive field exposed)
- A guarantee note compares one account's balance to the EUR
  100,000 ceiling. (not ready; wrong grain)
- A governed serving result exposes `business_date`,
  `currency_code`, and `SUM(ledger_balance)`. (ready)

## Deliverable

Two artefacts:

- The SQL result table from step 3 (you ran it in the workbench).
- Your own short note containing the grain sentence and the two-grain
  distinction with the EUR 100,000 figure.
