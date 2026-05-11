---
{
  "id": "tutorial-tutorials-02-build-a-bi-friendly-model",
  "title": "02 - Build A BI-Friendly Model",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
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

# 02 - Build A BI-Friendly Model

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: use the predefined synthetic banking schemas only. Do
not use real or masked production banking data.

Builds on:

- [00 - Orientation And Stack](00-orientation-and-stack.md)
- [01 - Connect Predefined Banking Data](01-connect-public-data.md)
- [Data Sources](data-sources.md)

Required tools: browser SQL challenge path first; optional BigQuery browser UI
for the cloud-applied version.

Objective: turn raw-shaped deposits tables into BI-friendly facts and
dimensions without changing metric grain or exposing unnecessary identifiers.

After this tutorial, you will be able to:

- Declare source-table grain before aggregation.
- Separate fact, dimension, and serving-output responsibilities.
- Document sensitive fields and safe dashboard fields.

Produces:

- Declared grains for dimensions and facts.
- `mart.fct_account_daily_balances` design.
- `mart.dim_account_masked`, `mart.dim_branch`, and `mart.dim_product` design.
- `notes/02-grain-declarations.md`

## Source Facts

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Goal

Turn raw-shaped deposits tables into BI-friendly facts and dimensions without
changing metric grain or exposing unnecessary identifiers.

## Steps

1. Open `#/challenges/first-banking-dataset`.
2. Inspect the schema cards before running SQL. Identify `accounts`,
   `account_owners`, and `account_daily_balances`.
3. Run the profile query and confirm it returns one row with row count, currency
   count, branch count, and latest balance date.
4. Write `notes/02-grain-declarations.md` with one line per table: table name,
   grain, primary key, sensitive fields, and safe dashboard fields.
5. Design `mart.fct_account_daily_balances` at one row per account per balance
   date. Keep raw identifiers out of the serving layer unless explicitly needed
   for a restricted lesson.
6. Add a warning that `account_owners` is many-to-many and must not be joined to
   balances before preserving balance grain.

## Checkpoints

- `account_daily_balances` grain is documented as account-date snapshot grain.
- Daily balances are treated as semi-additive snapshots rather than additive
  event rows across time.
- Sensitive fields are marked for exclusion or masking in serving outputs.
- The note separates account-date balance grain from depositor-bank guarantee
  grain.
- The browser SQL challenge displays `flag-first-banking-dataset`.

## Common Failure Modes

- Grouping the profile by `account_id` and turning one output row into account
  rows.
- Treating daily balance snapshots as additive across time.
- Joining `account_owners` before calculating account-grain balances.
- Calling a masked identifier safe just because the dataset is synthetic.

## Deliverable

Complete `010 - First Banking Dataset Inspection` and create
`notes/02-grain-declarations.md` with grain, sensitivity, and date semantics.
