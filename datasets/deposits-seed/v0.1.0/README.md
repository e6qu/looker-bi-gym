# Deposits Seed v0.1.0

This is a small synthetic banking dataset for browser-hosted BI tutorials. It is not derived from real bank data.

## Files

| File                         | Source table                          | Grain                                               | Rows |
| ---------------------------- | ------------------------------------- | --------------------------------------------------- | ---: |
| `branches.csv`               | `raw_ref.branches`                    | One row per branch                                  |    5 |
| `products.csv`               | `raw_ref.products`                    | One row per product                                 |    4 |
| `accounts.csv`               | `raw_deposits.accounts`               | One row per account                                 |    6 |
| `account_owners.csv`         | `raw_deposits.account_owners`         | One row per account-customer ownership relationship |    9 |
| `account_daily_balances.csv` | `raw_deposits.account_daily_balances` | One row per account per business date               |   18 |

## Data Dictionary

### `raw_ref.branches`

| Field              | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `branch_id`        | Synthetic branch key.                                                                |
| `branch_name`      | Synthetic branch name.                                                               |
| `region_code`      | Training region grouping.                                                            |
| `county`           | Romanian county or municipality label.                                               |
| `city`             | Romanian branch city.                                                                |
| `legal_entity_id`  | Synthetic legal entity key.                                                          |
| `bnr_region`       | BNR-style local context label for tutorial filtering.                                |
| `fgdb_member_flag` | Whether the branch belongs to an FGDB member institution in this synthetic scenario. |

### `raw_ref.products`

| Field                     | Description                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| `product_id`              | Synthetic product key.                                           |
| `product_family`          | Deposit product family.                                          |
| `product_name`            | Synthetic product name.                                          |
| `business_line`           | BI business-line grouping.                                       |
| `balance_sheet_class`     | Balance sheet classification for tutorial metrics.               |
| `regulatory_product_code` | Synthetic regulatory mapping code.                               |
| `currency_allowed`        | Allowed currency set for the product.                            |
| `fgdb_eligible_flag`      | Whether the product is FGDB-eligible in this synthetic scenario. |

### `raw_deposits.accounts`

| Field                    | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `account_id`             | Synthetic account key. Treat as sensitive in serving outputs.               |
| `masked_account_number`  | Masked display identifier for training.                                     |
| `synthetic_iban`         | Fake IBAN-shaped identifier. Sensitive field for leak-detection challenges. |
| `product_id`             | Product reference.                                                          |
| `branch_id`              | Branch reference. One account intentionally has a missing branch mapping.   |
| `legal_entity_id`        | Synthetic legal entity key.                                                 |
| `open_date`              | Account open date.                                                          |
| `close_date`             | Account close date when closed; blank while open.                           |
| `account_status`         | Current synthetic account status.                                           |
| `currency_code`          | Account currency.                                                           |
| `regulatory_context_tag` | Context tag used by governance challenges.                                  |

### `raw_deposits.account_owners`

| Field                  | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `account_id`           | Synthetic account key.                                                  |
| `customer_id`          | Synthetic customer key. Treat as sensitive in serving outputs.          |
| `ownership_role`       | Primary, joint, authorized, or beneficiary role.                        |
| `ownership_share_pct`  | Ownership share percentage. One account intentionally totals above 100. |
| `valid_from`           | Ownership relationship start date.                                      |
| `valid_to`             | Ownership relationship end date; blank while active.                    |
| `gdpr_restricted_flag` | Synthetic GDPR restriction indicator.                                   |

### `raw_deposits.account_daily_balances`

| Field                     | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `business_date`           | Daily snapshot business date.                           |
| `account_id`              | Synthetic account key.                                  |
| `ledger_balance`          | Snapshot ledger balance. Semi-additive across time.     |
| `available_balance`       | Snapshot available balance.                             |
| `accrued_interest`        | Synthetic accrued interest amount.                      |
| `currency_code`           | Balance currency.                                       |
| `source_cutoff_timestamp` | Synthetic source cutoff timestamp for freshness labels. |

## Intentional BI Traps

- Account ownership is many-to-many. Joining balances to owners without restoring account-date grain multiplies balances.
- `account_id`, `customer_id`, and `synthetic_iban` are sensitive fields for serving-output exclusion challenges.
- Account `A1006` references missing branch `B999`.
- Account `A1005` ownership shares sum to 110 percent.
- Balances are daily snapshots and are semi-additive across time.

## Control Totals

Daily `ledger_balance` totals by currency:

| business_date | currency_code | ledger_total |
| ------------- | ------------- | -----------: |
| 2026-03-29    | EUR           |        16450 |
| 2026-03-29    | RON           |        78740 |
| 2026-03-30    | EUR           |        16550 |
| 2026-03-30    | RON           |        79130 |
| 2026-03-31    | EUR           |        16400 |
| 2026-03-31    | RON           |        79300 |

Naive owner join test for `2026-03-31`:

- Correct one-row-per-account total: `95700`
- Naive balance-to-owner joined total: `164800`
- Expected multiplication delta: `69100`
