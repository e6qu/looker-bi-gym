---
{
  "id": "fc-bi-count-star-vs-column",
  "title": "When do COUNT(*) and COUNT(column) return different totals on the same data?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts":
    ["FACT-BIGQUERY-COUNT-STAR-VS-COLUMN", "FACT-BIGQUERY-SUM-NULLS"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-006-ratio-null-contract.md"],
  "tags": ["flashcard", "sql", "data-quality"],
}
---

# When do COUNT(\*) and COUNT(column) return different totals on the same data?

## Front

When do `COUNT(*)` and `COUNT(column)` return different totals on the
same data?

## Back

Whenever that column contains NULLs. `COUNT(*)` counts every row;
`COUNT(column)` skips rows where the column is NULL. The difference is
directly the count of NULL rows, which makes `COUNT(column)` next to
`COUNT(*)` a clean quality probe.
