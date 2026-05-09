# 00 - Orientation And Stack

Area: A - Orientation And Source Data

Synthetic-data boundary: use synthetic training data only. Do not use real,
masked, anonymized, or production-derived banking data.

Builds on: none.

Required tools: browser only.

Produces:

- Completed `000 - Orientation Quiz`.
- `notes/00-stack-decisions.md`, if you are keeping external notes.

## Source Facts

- `FACT-DUCKDB-WASM-BROWSER`
- `FACT-WEB-LOCALSTORAGE-PERSISTENCE`
- `FACT-WEB-COOKIE-SYNC`
- `FACT-GDPR-PERSONAL-DATA`
- `FACT-GDPR-DATA-MINIMISATION`
- `FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`
- `FACT-DGSD-100K-EU`

## Goal

Confirm the runtime, storage, data, and regulatory-context boundaries before you
touch any banking BI examples.

## Steps

1. Open `#/challenges/orientation-quiz`.
2. Read the scenario and the step-by-step work section.
3. Confirm that SQL practice runs in the browser through DuckDB-WASM, not
   through a backend grading database.
4. Open Settings in another tab or after completion and inspect the progress
   preview. Confirm that progress is browser-local and can be reset.
5. Review the seed sensitive fields: `account_id`, `customer_id`, and
   `synthetic_iban`.
6. Answer the data-minimisation question by selecting the raw identifiers that
   should not appear in serving outputs.
7. Answer the deposit-guarantee ceiling question using the FGDB/EU fact IDs.

## Checkpoints

- The quiz completes locally and displays `flag-orientation-quiz`.
- You can explain that browser SQL uses DuckDB-WASM and synthetic CSV data.
- You can explain that progress uses `localStorage` plus a same-site cookie
  fallback, not a backend account.
- You can name the EUR 100,000 deposit guarantee ceiling and distinguish it from
  an account balance total.

## Common Failure Modes

- Treating a same-site cookie as a server session.
- Assuming browser SQL results are sent to a hosted grading service.
- Selecting branch geography as sensitive while missing account/customer
  identifiers.
- Confusing account-balance grain with depositor-bank guarantee grain.

## Deliverable

Complete the browser quiz. Optional note: record the runtime, storage, synthetic
data, and depositor-bank grain assumptions in `notes/00-stack-decisions.md`.
