# US Banking Deposit Insurance Facts

These facts support US banking BI comparison exercises. They are technical
training notes only, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

### FACT-FDIC-250K-PER-DEPOSITOR-BANK-CATEGORY

- Statement: FDIC deposit insurance coverage is $250,000 per depositor, per
  FDIC-insured bank, for each account ownership category.
- Source: [`SRC-FDIC-DEPOSIT-INSURANCE-WORKS`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-deposit-insurance-works);
  [`SRC-FDIC-INSURANCE-AT-A-GLANCE`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-insurance-at-a-glance).
- Source quote: "$250,000 per depositor".
- Derived implication: US banking BI coverage examples need bank and ownership
  category grain, not just account balance grain.
- Related facts: [`FACT-FDIC-OWNERSHIP-CATEGORIES`](#fact-fdic-ownership-categories),
  [`FACT-DGSD-AGGREGATE-PER-DEPOSITOR`](banking-deposits-romania-eu.md#fact-dgsd-aggregate-per-depositor).

### FACT-FDIC-OWNERSHIP-CATEGORIES

- Statement: FDIC coverage uses account ownership categories such as single,
  joint, retirement, trust, employee benefit plan, business, and government
  accounts.
- Source: [`SRC-FDIC-DEPOSIT-INSURANCE-WORKS`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-deposit-insurance-works).
- Source quote: "Ownership categories include".
- Derived implication: US deposit datasets need ownership-category fields before
  coverage calculations can be compared with EU depositor-bank ceilings.
- Related facts: [`FACT-FDIC-250K-PER-DEPOSITOR-BANK-CATEGORY`](#fact-fdic-250k-per-depositor-bank-category),
  [`FACT-FGDB-JOINT-ACCOUNT-HOLDERS`](banking-deposits-romania-eu.md#fact-fgdb-joint-account-holders).

### FACT-FDIC-SAME-CATEGORY-AGGREGATION

- Statement: FDIC guidance says deposits in the same ownership category at the
  same bank are added together when determining insurance coverage.
- Source: [`SRC-FDIC-DEPOSIT-INSURANCE-WORKS`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-deposit-insurance-works).
- Source quote: "added together".
- Derived implication: BI questions should test whether learners aggregate by
  depositor, bank, and ownership category before applying the $250,000 limit.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation),
  [`FACT-FDIC-250K-PER-DEPOSITOR-BANK-CATEGORY`](#fact-fdic-250k-per-depositor-bank-category).

### FACT-FDIC-AUTOMATIC-COVERAGE

- Statement: FDIC coverage is automatic when a deposit account is opened at an
  FDIC-insured bank or financial institution.
- Source: [`SRC-FDIC-INSURANCE-AT-A-GLANCE`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-insurance-at-a-glance).
- Source quote: "Coverage is automatic".
- Derived implication: Tutorials should focus on coverage calculation grain and
  exclusions rather than asking learners to model an application process.
- Related facts: [`FACT-FDIC-250K-PER-DEPOSITOR-BANK-CATEGORY`](#fact-fdic-250k-per-depositor-bank-category).

### FACT-FDIC-NOT-INVESTMENTS

- Statement: FDIC guidance excludes investments such as stocks, bonds, mutual
  funds, annuities, municipal securities, safe deposit boxes, and US Treasury
  securities from FDIC insurance.
- Source: [`SRC-FDIC-INSURANCE-AT-A-GLANCE`](../../sources/regulators/fdic-deposit-insurance.md#src-fdic-insurance-at-a-glance).
- Source quote: "not insured by the FDIC".
- Derived implication: US banking BI challenge datasets should distinguish
  insured deposit products from investment products before coverage metrics.
- Related facts: [`FACT-FGDB-EXCLUDED-DEPOSITS`](banking-deposits-romania-eu.md#fact-fgdb-excluded-deposits),
  [`FACT-FDIC-OWNERSHIP-CATEGORIES`](#fact-fdic-ownership-categories).
