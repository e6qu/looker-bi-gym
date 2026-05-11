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

Use the interactive quiz when you want a broad self-check across banking BI,
BigQuery SQL, and Looker Studio reporting decisions. Each question stands on its
own as a scenario, so the bank can be used for review without looking back at a
worked example.

Objective: check whether you can recall and apply core BI mechanics without
using worked examples as prompts.

After this quiz, you will be able to:

- Start the mixed quiz from the app navigation.
- Recognize the competency areas covered by the easy, medium, and hard groups.
- Decide which BI topic needs more practice before attempting exam cards.

Training boundary: use synthetic training data only. This quiz is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Coverage

The current mixed bank contains 60 standalone scenario questions:

| Difficulty | Count | Main coverage                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Easy       |    20 | BI grain, distinct counts, NULL totals, date grouping, partition filters, Looker Studio dimensions and data sources, reusable fields, logical views, controls, query parameters, pseudonymised identifiers, purpose limitation, and deposit-guarantee basics                                                                                                                                                                                                                   |
| Medium     |    20 | fanout deltas, reduce-before-join patterns, QUALIFY, window partitions, month-end SQL checks, failed casts, chart aggregation context, blends, credentials, dry runs, parameter predicates, exact versus approximate counts, view regions, view SQL changes, freshness memory, and deposit eligibility                                                                                                                                                                         |
| Hard       |    20 | semi-additive exposure, shared metric ownership, blend freshness, refresh cost evidence, control publication checks, authorized views, materialized-view decisions, job-evidence privacy, depositor-bank grain, operations dependencies, temporary high balances, incident evidence, validation versioning, region-aware serving layers, cost triage, stale blended reports, NULL reconciliation, exact coverage evidence, special-category data, and upstream modelling fixes |

## How To Use It

Open the Quiz surface from the navigation and answer a focused subset or the
full bank. For each miss, write down whether the gap was about row grain, join
behavior, Looker Studio mechanics, BigQuery SQL behavior, control evidence, or
banking context.
