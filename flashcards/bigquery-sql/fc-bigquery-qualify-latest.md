---
{
  "id": "fc-bigquery-qualify-latest",
  "title": "How does QUALIFY help latest-snapshot SQL?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BIGQUERY-QUALIFY-WINDOW-FILTER",
      "FACT-BIGQUERY-WINDOW-PRESERVES-ROWS",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard", "window-functions"],
}
---

# How does QUALIFY help latest-snapshot SQL?

## Front

How does `QUALIFY` help latest-snapshot SQL?

## Back

It lets the query calculate a window ranking and then filter the ranked rows, which is useful when selecting the latest record at the intended dashboard grain.
