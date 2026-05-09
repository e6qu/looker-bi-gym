# Banking Deposits Romania And EU Facts

These facts anchor Romanian/EU banking BI scenarios. They are technical training
notes only, not legal, regulatory, accounting, privacy, compliance, or model-risk
advice.

### FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK

- Statement: FGDB states that the general compensation ceiling is the leu
  equivalent of EUR 100,000 per depositor, per bank.
- Source: [FGDB, Depositors FAQ](https://www.fgdb.ro/en/pages/pentru-deponenti);
  [FGDB, How much is insured?](https://www.fgdb.ro/en/pages/cat-asiguram).
- Source quote: "per depositor, per bank".
- Derived implication: Deposit guarantee exercises should use depositor-bank
  grain, not account grain or account-owner join row grain.
- Related facts: [`FACT-DGSD-100K-EU`](#fact-dgsd-100k-eu),
  [`FACT-FGDB-JOINT-ACCOUNT-HOLDERS`](#fact-fgdb-joint-account-holders).

### FACT-DGSD-100K-EU

- Statement: EU deposit guarantee law sets EUR 100,000 as the standard aggregate
  deposits coverage level for each depositor when deposits become unavailable.
- Source: [EUR-Lex, Directive 2014/49/EU Article 6](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049);
  [European Commission, Deposit guarantee schemes](https://finance.ec.europa.eu/banking/banking-regulation/deposit-guarantee-schemes_en).
- Source quote: "EUR 100 000".
- Derived implication: Tutorials should distinguish deposit-balance reporting
  from guarantee coverage calculations.
- Related facts: [`FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`](#fact-fgdb-100k-per-depositor-per-bank).

### FACT-FGDB-PAYS-RON

- Statement: FGDB says compensation is paid in RON regardless of deposit
  currency, using the BNR exchange rate from the day deposits become unavailable.
- Source: [FGDB, How much is insured?](https://www.fgdb.ro/en/pages/cat-asiguram).
- Source quote: "paid in RON".
- Derived implication: Future guarantee challenges need explicit currency,
  conversion date, and amount fields instead of only current ledger currency.
- Related facts: [`FACT-DATASET-CURRENCY-CONTROLS`](project-architecture.md#fact-dataset-currency-controls).

### FACT-FGDB-DEPOSIT-DEFINITION

- Statement: FGDB defines a deposit as a credit balance, including due interest,
  resulting from funds left in an account or normal banking transactions.
- Source: [FGDB, Dictionary](https://www.fgdb.ro/en/pages/despre-fgdb/dictionar-de-termeni).
- Source quote: "credit balance, including the due interest".
- Derived implication: Synthetic deposit datasets should include balance,
  interest, currency, account, depositor, and availability-date semantics.
- Related facts: [`FACT-DGSD-DEPOSIT-DEFINITION`](#fact-dgsd-deposit-definition).

### FACT-DGSD-DEPOSIT-DEFINITION

- Statement: DGSD defines deposit as a credit balance repayable by a credit
  institution under applicable legal and contractual conditions.
- Source: [EUR-Lex, Directive 2014/49/EU Article 2](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049).
- Source quote: "credit balance".
- Derived implication: Challenge data should avoid using payment flows or
  off-balance events as deposits unless the scenario explicitly says so.
- Related facts: [`FACT-FGDB-DEPOSIT-DEFINITION`](#fact-fgdb-deposit-definition).

### FACT-FGDB-JOINT-ACCOUNT-HOLDERS

- Statement: FGDB describes a joint account as an account in the name of two or
  more persons or over which two or more persons have rights.
- Source: [FGDB, Dictionary](https://www.fgdb.ro/en/pages/despre-fgdb/dictionar-de-termeni).
- Source quote: "two or more persons".
- Derived implication: Account-owner fanout is not an abstract SQL problem; joint
  accounts make depositor allocation a real banking grain issue.
- Related facts: [`FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`](#fact-fgdb-100k-per-depositor-per-bank),
  [`FACT-DATASET-OWNER-FANOUT-TRAP`](project-architecture.md#fact-dataset-owner-fanout-trap).

### FACT-FGDB-MEMBER-BANKS

- Statement: FGDB says Romanian legal-person banks are FGDB members, while EU
  bank branches in Romania are guaranteed by schemes in their country of origin.
- Source: [FGDB, Depositors FAQ](https://www.fgdb.ro/en/pages/pentru-deponenti).
- Source quote: "country of origin".
- Derived implication: Future datasets need legal-entity and branch-origin fields
  before teaching cross-border guarantee coverage.
- Related facts: [`FACT-DATASET-LEGAL-ENTITY-GRAIN`](project-architecture.md#fact-dataset-legal-entity-grain).

### FACT-DGSD-TEMPORARY-HIGH-BALANCES

- Statement: DGSD requires protection above EUR 100,000 for certain temporary
  high balances for at least three and no more than twelve months.
- Source: [EUR-Lex, Directive 2014/49/EU Article 6](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049).
- Source quote: "above EUR 100 000".
- Derived implication: A real tutorial on guarantee coverage needs event type,
  event date, protected-until date, and evidence fields.
- Related facts: [`FACT-FGDB-PAYS-RON`](#fact-fgdb-pays-ron).
