---
{
  "id": "fc-bigquery-qualify-true-only",
  "title": "Which QUALIFY results remain in BigQuery output?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    ["FACT-BIGQUERY-QUALIFY-TRUE-ONLY", "FACT-BIGQUERY-QUALIFY-WINDOW-FILTER"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard", "window-functions"],
}
---

# Which QUALIFY results remain in BigQuery output?

## Front

Which `QUALIFY` results remain in BigQuery output?

## Back

Only rows whose `QUALIFY` expression evaluates to `TRUE` remain. Rows that evaluate to `FALSE` or `NULL` are discarded, so tie and missing-rank cases need explicit tests.
