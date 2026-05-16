---
{
  "id": "facts-banking-deposits-romania-eu",
  "title": "Banking Deposits Romania And EU Facts",
  "content_type": "fact_register",
  "status": "published",
  "version": "0.1.0",
  "topic": "facts",
  "tags": ["facts", "source-backed"],
}
---

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
- Related facts: [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).

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
  [`FACT-BI-FANOUT-JOIN-RISK`](bi-modeling-banking.md#fact-bi-fanout-join-risk).

### FACT-FGDB-MEMBER-BANKS

- Statement: FGDB says Romanian legal-person banks are FGDB members, while EU
  bank branches in Romania are guaranteed by schemes in their country of origin.
- Source: [FGDB, Depositors FAQ](https://www.fgdb.ro/en/pages/pentru-deponenti).
- Source quote: "country of origin".
- Derived implication: Future datasets need legal-entity and branch-origin fields
  before teaching cross-border guarantee coverage.
- Related facts: [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation).

### FACT-DGSD-TEMPORARY-HIGH-BALANCES

- Statement: DGSD requires protection above EUR 100,000 for certain temporary
  high balances for at least three and no more than twelve months.
- Source: [EUR-Lex, Directive 2014/49/EU Article 6](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049).
- Source quote: "above EUR 100 000".
- Derived implication: A real tutorial on guarantee coverage needs event type,
  event date, protected-until date, and evidence fields.
- Related facts: [`FACT-FGDB-PAYS-RON`](#fact-fgdb-pays-ron).

### FACT-DGSD-AGGREGATE-PER-DEPOSITOR

- Statement: DGSD Article 7 bases the coverage calculation on the aggregate
  deposits of each depositor at the same credit institution.
- Source: [`SRC-DGSD-ELI-2014-49`](../sources/law/eu-deposit-guarantee.md#src-dgsd-eli-2014-49).
- Source quote: "aggregate deposits of each depositor".
- Derived implication: Guarantee exercises must group by depositor and credit
  institution before applying the coverage ceiling.
- Related facts: [`FACT-DGSD-100K-EU`](#fact-dgsd-100k-eu),
  [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation).

### FACT-DGSD-SEVEN-WORKING-DAYS

- Statement: DGSD Article 8 sets the repayable amount availability period at
  seven working days.
- Source: [`SRC-DGSD-ELI-2014-49`](../sources/law/eu-deposit-guarantee.md#src-dgsd-eli-2014-49).
- Source quote: "seven working days".
- Derived implication: Operations scenarios about unavailable deposits need an
  event date and working-day SLA evidence, not only a final compensation total.
- Related facts: [`FACT-DORA-INCIDENTS`](governance-reporting-operations.md#fact-dora-incidents),
  [`FACT-FGDB-PAYS-RON`](#fact-fgdb-pays-ron).

### FACT-DGSD-COVERAGE-LEVEL-HARMONISED

- Statement: DGSD harmonises the standard deposit coverage level across EU
  deposit guarantee schemes at EUR 100,000.
- Source: [`SRC-DGSD-ELI-2014-49`](../sources/law/eu-deposit-guarantee.md#src-dgsd-eli-2014-49);
  [`SRC-EC-DEPOSIT-GUARANTEE`](../sources/law/eu-deposit-guarantee.md#src-ec-deposit-guarantee).
- Source quote: "up to EUR 100 000".
- Derived implication: Romanian guarantee lessons can use EU coverage concepts
  while still requiring FGDB-specific currency and member-bank context.
- Related facts: [`FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`](#fact-fgdb-100k-per-depositor-per-bank),
  [`FACT-FGDB-PAYS-RON`](#fact-fgdb-pays-ron).

### FACT-FGDB-ELIGIBLE-DEPOSITS

- Statement: FGDB defines eligible deposits as deposits that are not excluded
  from the scope of guarantee.
- Source: [`SRC-FGDB-DICTIONARY`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-dictionary);
  [`SRC-FGDB-LAW-311-2015`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-law-311-2015).
- Source quote: "deposits that are not excluded".
- Derived implication: Coverage datasets need an eligibility dimension or
  exclusion reason before learners calculate compensation.
- Related facts: [`FACT-FGDB-EXCLUDED-DEPOSITS`](#fact-fgdb-excluded-deposits),
  [`FACT-FGDB-DEPOSIT-DEFINITION`](#fact-fgdb-deposit-definition).

### FACT-FGDB-EXCLUDED-DEPOSITS

- Statement: FGDB publishes a list of deposits excluded from coverage, including
  deposits by credit institutions on their own behalf and deposits whose holder
  identity has not been verified before unavailability.
- Source: [`SRC-FGDB-INSURED`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-insured).
- Source quote: "List of Deposits Excluded from Coverage".
- Derived implication: Future CTF-style guarantee challenges should include
  excluded-account traps and require learners to justify exclusions.
- Related facts: [`FACT-FGDB-ELIGIBLE-DEPOSITS`](#fact-fgdb-eligible-deposits),
  [`FACT-GDPR-ACCURACY`](privacy-gdpr.md#fact-gdpr-accuracy).

### FACT-FGDB-GUARANTEE-CEILING

- Statement: FGDB defines the guarantee ceiling as the maximum coverage level
  per guaranteed depositor, per bank.
- Source: [`SRC-FGDB-DICTIONARY`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-dictionary);
  [`SRC-FGDB-LAW-311-2015`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-law-311-2015).
- Source quote: "per guaranteed depositors, per bank".
- Derived implication: Quiz questions should test the ceiling grain directly,
  because account-level and row-level answers are common BI mistakes.
- Related facts: [`FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK`](#fact-fgdb-100k-per-depositor-per-bank),
  [`FACT-DGSD-AGGREGATE-PER-DEPOSITOR`](#fact-dgsd-aggregate-per-depositor).

### FACT-FGDB-CREDIT-INSTITUTION-MEMBER-SCOPE

- Statement: FGDB materials distinguish Romanian legal-person credit
  institutions from EU branches whose deposits are covered under the state of
  origin.
- Source: [`SRC-FGDB-DEPOSITORS`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-depositors);
  [`SRC-FGDB-LAW-311-2015`](../sources/regulators/fgdb-deposit-guarantee.md#src-fgdb-law-311-2015).
- Source quote: "state of origin".
- Derived implication: Cross-border scenarios need member-scheme and legal
  entity fields before a guarantee calculation can be graded.
- Related facts: [`FACT-FGDB-MEMBER-BANKS`](#fact-fgdb-member-banks),
  [`FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION`](bi-modeling-banking.md#fact-bi-grain-declare-before-aggregation).

### FACT-CRR-CET1-RATIO

- Statement: The CRR (Capital Requirements Regulation, EU 575/2013) defines
  the Common Equity Tier 1 (CET1) ratio as CET1 capital divided by total
  risk-weighted exposure amount, with a minimum CET1 ratio of 4.5% before
  buffers; capital conservation and countercyclical buffers can raise the
  effective minimum further.
- Source: [Regulation (EU) No 575/2013 (CRR)](https://eur-lex.europa.eu/eli/reg/2013/575/oj).
- Source quote: "Common Equity Tier 1 capital ratio".
- Derived implication: A capital-monitoring BI report needs the CET1
  numerator and denominator at the same reporting date, with reconciliation
  to the COREP capital adequacy template; mixing reporting dates or RWA
  approaches produces a ratio that cannot be compared period-over-period.
- Related facts: [`FACT-EBA-FRAMEWORK-VERSIONING`](governance-reporting-operations.md#fact-eba-framework-versioning),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).

### FACT-IFRS9-STAGES

- Statement: IFRS 9 classifies financial assets into three impairment stages
  for expected credit loss (ECL) measurement - stage 1 (12-month ECL,
  performing), stage 2 (lifetime ECL, significant increase in credit risk
  but not credit-impaired), stage 3 (lifetime ECL, credit-impaired).
- Source: [IFRS Foundation, IFRS 9 Financial Instruments](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/).
- Source quote: "expected credit losses".
- Derived implication: A credit-risk dashboard reporting exposure or ECL
  needs the IFRS 9 stage assignment per loan and per reporting date. Stage
  transitions explain large ECL movements between periods; mixing stages
  into a single total obscures the credit-risk trend.
- Related facts: [`FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT`](bi-modeling-banking.md#fact-bi-semi-additive-balance-snapshot),
  [`FACT-BI-REFERENCE-DATE-SEPARATION`](bi-modeling-banking.md#fact-bi-reference-date-separation).
