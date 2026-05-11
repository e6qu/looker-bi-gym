---
{
  "id": "tutorial-tutorials-quiz-bank",
  "title": "Quiz Bank",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Quiz Bank

Use this quiz after completing the core practice path when you want a
20-minute self-check. Questions are grouped by difficulty and use new scenario
wording so the quiz verifies the skills without repeating the tutorial steps.

Objective: check whether you can recall and apply core BI mechanics without
using worked examples as prompts.

After this quiz, you will be able to:

- Answer easy, medium, and hard self-check questions in about 20 minutes.
- Explain why each answer is correct in BI terms.
- Identify whether grain, joins, serving views, or dashboard controls need more
  practice before attempting exam cards.

Training boundary: use synthetic training data only. This quiz is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

Use the interactive quiz surface for answer entry and immediate feedback.

## Easy

### Grain Before Aggregation

Question: before summing `ledger_balance`, what must you declare for the
balance rows?

<details>
<summary>Answer and rationale</summary>

Answer: one row per account and business date.

Why it matters: BI aggregates are only trustworthy after the row grain is known.

</details>

### Sensitive Fields

Question: which fields should stay out of a currency-level dashboard output
unless a specific purpose requires them?

<details>
<summary>Answer and rationale</summary>

Answer: `account_id`, `customer_id`, and `synthetic_iban`.

Why it matters: serving outputs should stay narrow and avoid unnecessary
identifier exposure.

</details>

### Looker Studio Data Source Role

Question: what role does a Looker Studio data source play between source data
and charts?

<details>
<summary>Answer and rationale</summary>

Answer: it connects data and provides the report field schema.

Why it matters: field types, aggregation, and credentials are inspected at the
data-source layer before charts are trusted.

</details>

## Medium

### Fanout Delta

Question: in the synthetic deposits fanout exercise, what is the overstatement
delta between the naive owner-joined total and the correct latest account-grain
total?

<details>
<summary>Answer and rationale</summary>

Answer: `69100`.

Why it matters: the wrong join can produce a convincing but overstated KPI.

</details>

### BigQuery View Purpose

Question: why is a BigQuery logical view a useful serving-layer shape for
reusable dashboard SQL?

<details>
<summary>Answer and rationale</summary>

Answer: it is a SQL-defined virtual table queried like a table.

Why it matters: shared dashboard logic should be inspectable before it reaches
Looker Studio charts.

</details>

### Month-End Control

Question: how many synthetic lending snapshot rows are not on an accepted
month-end date?

<details>
<summary>Answer and rationale</summary>

Answer: `1`.

Why it matters: a control can be visible in a serving result without becoming a
business KPI.

</details>

## Hard

### Semi-Additive Exposure

Question: which result should be used as the dashboard KPI for March exposure?

<details>
<summary>Answer and rationale</summary>

Answer: latest-period principal by currency, with time sums kept as controls.

Why it matters: balances and exposures are safe across entities at one date, not
across multiple dates.

</details>

### Metric Ownership

Question: where should the fanout-safe `ledger_total` metric be repaired for a
shared executive dashboard?

<details>
<summary>Answer and rationale</summary>

Answer: upstream serving SQL or a reusable data-source field.

Why it matters: a hidden chart-only repair lets later charts reintroduce the
same grain error.

</details>
