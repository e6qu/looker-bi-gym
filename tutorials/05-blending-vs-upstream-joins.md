---
{
  "id": "tutorial-tutorials-05-blending-vs-upstream-joins",
  "title": "05 - Compare Blends With Upstream Joins",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BI-FANOUT-JOIN-RISK",
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-LOGICAL-VIEW",
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET",
      "FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG",
      "FACT-LOOKER-STUDIO-BLEND-MORE-ROWS",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 05 - Compare Blends With Upstream Joins

Area: B - Warehouse Modeling And Metrics

Synthetic-data boundary: use only the predefined synthetic deposits dataset.
Do not use real account-owner tables, production customer attributes, private
Looker Studio reports, screenshots with private account details, credentials,
or real regulatory outputs.

Prior knowledge expected:

- Account-day balance grain and dimensional-model basics.
- Governed metric contract concept (formula + grain + owner).
- Difference between an `INNER JOIN` to a many-to-many side and a
  pre-aggregated join.

Required tools:

- Browser-first path: browser SQL workbench for the synthetic datasets.
- Optional applied path: browser UI access to BigQuery and Looker Studio.
- Do not use Google Cloud CLI, BigQuery CLI, service account keys, Python, or
  Docker.

Objective: prove a many-to-many fanout with exact numbers, then decide which
logic belongs upstream before a dashboard or blend can repeat the mistake.

After this tutorial, you will be able to:

- Reproduce a wrong owner-joined balance total and its overstatement.
- Build a safe upstream branch/currency serving result for current-balance
  charts.
- Build a separate depositor allocation result when owner-level analysis is
  genuinely needed.
- Specify
  <a class="termRef" href="#/terminology/looker-studio.md#looker-studio-blend">Looker Studio blend<sup>LS</sup></a>
  guardrails without treating a chart blend as a governed metric layer.

Produces:

- Browser-first
  <a class="termRef" href="#/terminology/bi.md#fanout">fanout<sup>BI</sup></a>
  proof.
- Safe upstream serving outputs for current-balance and owner-allocation use
  cases.
- Optional Looker Studio blend comparison notes.
- `notes/05-blend-and-upstream-join-check.md`, if you keep external notes.

## Goal

Create this decision table:

| Reporting Need                             | Safe Source                                      | Do Not Use As Final Source                   | Expected Control |
| ------------------------------------------ | ------------------------------------------------ | -------------------------------------------- | ---------------: |
| Latest branch/currency current-balance KPI | upstream branch/currency serving result          | owner-joined chart blend                     |            95700 |
| Owner-level diagnostic allocation          | upstream owner allocation with normalized shares | raw owner join with duplicated balances      |            95700 |
| Deposit-guarantee style context            | depositor-bank grain after eligibility rules     | account-owner join rows or account KPI grain |    grain warning |
| Looker Studio exploratory blend            | limited fields, declared join keys, control note | reusable governed metric definition          |  164800 is wrong |

## Steps

### Browser-First Path

1. Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
2. Run the latest account-grain control query:

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
  COUNT(*) AS account_balance_rows,
  COUNT(DISTINCT account_id) AS account_count,
  SUM(ledger_balance) AS correct_ledger_total
FROM latest_balances;
```

3. Confirm this output:

| account_balance_rows | account_count | correct_ledger_total |
| -------------------: | ------------: | -------------------: |
|                    6 |             6 |                95700 |

4. Run the unsafe owner-join proof:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
correct_total AS (
  SELECT SUM(ledger_balance) AS correct_ledger_total
  FROM latest_balances
),
owner_join AS (
  SELECT
    b.account_id,
    o.customer_id,
    b.ledger_balance
  FROM latest_balances b
  INNER JOIN account_owners o
    ON b.account_id = o.account_id
)
SELECT
  COUNT(*) AS owner_join_rows,
  COUNT(DISTINCT account_id) AS account_count,
  SUM(ledger_balance) AS naive_joined_total,
  MAX(correct_ledger_total) AS correct_ledger_total,
  SUM(ledger_balance) - MAX(correct_ledger_total) AS fanout_delta,
  ROUND(
    100 * (SUM(ledger_balance) - MAX(correct_ledger_total)) / MAX(correct_ledger_total),
    2
  ) AS overstatement_pct
FROM owner_join
CROSS JOIN correct_total;
```

5. Confirm the wrong total and delta:

| owner_join_rows | account_count | naive_joined_total | correct_ledger_total | fanout_delta | overstatement_pct |
| --------------: | ------------: | -----------------: | -------------------: | -----------: | ----------------: |
|               9 |             6 |             164800 |                95700 |        69100 |             72.20 |

6. Write this rule in your notes: a chart blend that joins latest balances to
   owners on `account_id` can create more rows than the account-balance source,
   so current-balance KPIs must not use that blend as their governed source.
7. Run the safe branch/currency serving query for current-balance charts:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance,
    currency_code,
    source_cutoff_timestamp
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
safe_branch_currency AS (
  SELECT
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(b.ledger_balance) AS ledger_total,
    COUNT(DISTINCT b.account_id) AS account_count,
    MAX(b.source_cutoff_timestamp) AS source_cutoff_timestamp
  FROM latest_balances b
  INNER JOIN accounts a
    ON b.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  GROUP BY
    b.currency_code,
    COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  currency_code,
  branch_city,
  ledger_total,
  account_count,
  source_cutoff_timestamp
FROM safe_branch_currency
ORDER BY currency_code, branch_city;
```

8. Confirm this safe current-balance output:

| currency_code | branch_city     | ledger_total | account_count | source_cutoff_timestamp |
| ------------- | --------------- | -----------: | ------------: | ----------------------- |
| EUR           | Brasov          |         7100 |             1 | 2026-03-31T20:15:00Z    |
| EUR           | Cluj-Napoca     |         9300 |             1 | 2026-03-31T20:15:00Z    |
| RON           | Bucuresti       |        43000 |             1 | 2026-03-31T20:15:00Z    |
| RON           | Iasi            |        19000 |             1 | 2026-03-31T20:15:00Z    |
| RON           | Timisoara       |        12300 |             1 | 2026-03-31T20:15:00Z    |
| RON           | UNMAPPED_BRANCH |         5000 |             1 | 2026-03-31T20:15:00Z    |

9. Run the safe source control:

```sql
WITH safe_branch_currency AS (
  SELECT
    COALESCE(br.city, 'UNMAPPED_BRANCH') AS branch_city,
    SUM(b.ledger_balance) AS ledger_total,
    COUNT(DISTINCT b.account_id) AS account_count
  FROM account_daily_balances b
  INNER JOIN accounts a
    ON b.account_id = a.account_id
  LEFT JOIN branches br
    ON a.branch_id = br.branch_id
  WHERE b.business_date = DATE '2026-03-31'
  GROUP BY COALESCE(br.city, 'UNMAPPED_BRANCH')
)
SELECT
  SUM(ledger_total) AS safe_ledger_total,
  SUM(account_count) AS safe_account_count,
  SUM(CASE WHEN branch_city = 'UNMAPPED_BRANCH' THEN ledger_total ELSE 0 END) AS unmapped_ledger_total
FROM safe_branch_currency;
```

10. Confirm this control output:

| safe_ledger_total | safe_account_count | unmapped_ledger_total |
| ----------------: | -----------------: | --------------------: |
|             95700 |                  6 |                  5000 |

11. If owner-level analysis is required, run this upstream allocation query
    instead of blending raw owners into a current-balance KPI chart. The
    allocation logic divides each account's balance by the account's own
    summed ownership-share total, so if the synthetic
    `account_owners.ownership_share_pct` values for an account sum to
    `100`, the division leaves each owner's share at face value. If the
    shares ever sum to something else (data quality break), each owner
    receives a proportional share of the account balance rather than a
    multiplied amount, and the overall allocation total still reconciles
    to the account-grain ledger total:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance,
    currency_code
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
owner_weight_totals AS (
  SELECT
    account_id,
    SUM(ownership_share_pct) AS account_share_total
  FROM account_owners
  GROUP BY account_id
),
allocated_owner_balances AS (
  SELECT
    o.customer_id,
    b.currency_code,
    ROUND(
      b.ledger_balance * o.ownership_share_pct / t.account_share_total,
      2
    ) AS allocated_balance
  FROM latest_balances b
  INNER JOIN account_owners o
    ON b.account_id = o.account_id
  INNER JOIN owner_weight_totals t
    ON o.account_id = t.account_id
)
SELECT
  customer_id,
  currency_code,
  SUM(allocated_balance) AS allocated_balance
FROM allocated_owner_balances
GROUP BY customer_id, currency_code
ORDER BY customer_id, currency_code;
```

12. Confirm the allocated owner output:

| customer_id | currency_code | allocated_balance |
| ----------- | ------------- | ----------------: |
| C0001       | RON           |          30100.00 |
| C0002       | RON           |          25200.00 |
| C0003       | EUR           |           9300.00 |
| C0004       | RON           |          11400.00 |
| C0005       | RON           |           7600.00 |
| C0006       | EUR           |           3872.73 |
| C0007       | EUR           |           3227.27 |
| C0008       | RON           |           5000.00 |

13. Run the owner allocation control:

```sql
WITH latest_balances AS (
  SELECT
    account_id,
    ledger_balance
  FROM account_daily_balances
  WHERE business_date = DATE '2026-03-31'
),
owner_weight_totals AS (
  SELECT
    account_id,
    SUM(ownership_share_pct) AS account_share_total
  FROM account_owners
  GROUP BY account_id
),
allocated_owner_balances AS (
  SELECT
    ROUND(
      b.ledger_balance * o.ownership_share_pct / t.account_share_total,
      2
    ) AS allocated_balance
  FROM latest_balances b
  INNER JOIN account_owners o
    ON b.account_id = o.account_id
  INNER JOIN owner_weight_totals t
    ON o.account_id = t.account_id
)
SELECT
  SUM(allocated_balance) AS allocated_total
FROM allocated_owner_balances;
```

14. Confirm this output:

| allocated_total |
| --------------: |
|        95700.00 |

15. Record the decision:
    - use `safe_branch_currency` for current-balance dashboard KPIs;
    - use `allocated_owner_balances` only for owner-level diagnostics;
    - use a separate depositor-bank model before any guarantee-style coverage
      scenario.

### Optional BigQuery UI Path

Use this section only if you have browser UI access to BigQuery. If the
synthetic deposits tables referenced in this lesson do not exist, run the
inline BigQuery setup SQL given in the data-sources reference first and add
the `accounts`, `branches`, and `account_owners` synthetic tables before
creating these views.

1. Create a safe current-balance view with the same logic as
   `safe_branch_currency`.
2. Create a separate owner-allocation view with the same normalized-share logic
   as `allocated_owner_balances`.
3. Query both views and confirm each total is `95700`.
4. Do not publish the raw owner-joined table as a dashboard source for
   current-balance KPIs.

### Optional Looker Studio UI Path

Use this section only after the optional BigQuery views exist.

1. Create a report page named `Blend QA`.
2. Add a table from the safe current-balance view:
   - dimension: `currency_code`;
   - metric: `ledger_total`;
   - expected values: `EUR = 16400`, `RON = 79300`, total `95700`.
3. Add a table from the owner-allocation view:
   - dimension: `customer_id`;
   - metric: `allocated_balance`;
   - expected total: `95700`.
4. If you create an exploratory blend, limit it to the fields needed for the
   check, declare `account_id` as the join key, record which table is leftmost,
   and compare its total with `95700`.
5. Mark any owner-joined or blended total of `164800` as a failed QA result, not
   as an acceptable chart.
6. Record the data credential mode in notes. Do not copy credentials, tokens,
   private report links, or screenshots with private account details.

## Checkpoints

- Correct latest account-grain total is `95700`.
- Unsafe owner join returns `164800`, delta `69100`, and overstatement
  `72.20%`.
- Safe branch/currency source keeps `UNMAPPED_BRANCH` and totals `95700`.
- Owner allocation totals `95700.00` after normalizing ownership shares per
  account.
- Current-balance KPIs and depositor/owner diagnostics are modeled as separate
  sources.
- Any guarantee-style note names depositor-bank grain and does not reuse raw
  account-owner join rows as the final grain.

## Common Failure Modes

- Treating owner join rows as if they were account balance rows.
- Hiding the fanout by showing only a corrected total and not the wrong total.
- Dropping the unmapped branch with an inner join.
- Allocating by ownership share without normalizing shares per account.
- Building a chart-specific blend and then treating it as the reusable metric
  contract.
- Treating latest account-balance KPIs as deposit-guarantee coverage metrics.

## Recovery Checks

- If the current-balance total is `164800`, remove the owner join from the KPI
  source.
- If the current-balance total is `90700`, keep the branch join as a left join
  and preserve `UNMAPPED_BRANCH`.
- If owner allocation does not total `95700.00`, check the
  `owner_weight_totals` step and normalize each account's ownership shares.
- If a Looker Studio blend shows more rows than the leftmost source, inspect the
  join key, source order, and field subset before trusting any metric.

## End Challenge

Write a blend handoff note in this form:

`correct_total=<total>; naive_total=<total>; fanout_delta=<delta>; overstatement_pct=<pct>; safe_current_source=<source>; owner_source=<source>; guarantee_grain=<grain>`

Fill it in from your own browser SQL output before opening the expected
answer.

<details>
<summary>Reveal expected answer</summary>

`correct_total=95700; naive_total=164800; fanout_delta=69100; overstatement_pct=72.20; safe_current_source=safe_branch_currency; owner_source=allocated_owner_balances; guarantee_grain=depositor-bank`

</details>

## Deliverable

Create `notes/05-blend-and-upstream-join-check.md` with:

- the correct latest account-grain output;
- the unsafe owner-join proof output;
- the safe branch/currency output;
- the owner allocation output;
- the final source decision table.
