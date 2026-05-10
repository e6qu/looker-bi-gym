---
{
  "id": "fc-bigquery-month-end",
  "title": "Why should month-end snapshot logic be explicit in SQL?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
      "FACT-BIGQUERY-LAST-DAY-MONTH-END",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard"],
}
---

# Why should month-end snapshot logic be explicit in SQL?

## Front

Why should month-end snapshot logic be explicit in SQL?

## Back

Semi-additive balances need a chosen reference date; summing across snapshot dates creates invalid time totals.
