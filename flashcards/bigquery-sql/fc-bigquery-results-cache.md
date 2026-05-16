---
{
  "id": "fc-bigquery-results-cache",
  "title": "What does BigQuery's query results cache do, and why can't a cost review treat its zero-byte refreshes as a sustained guarantee?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BIGQUERY-RESULTS-CACHE",
      "FACT-BIGQUERY-JOBS-BYTES",
      "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "bigquery", "cost"],
}
---

# What does BigQuery's query results cache do, and why can't a cost review treat its zero-byte refreshes as a sustained guarantee?

## Front

What does BigQuery's query results cache do, and why can't a cost
review treat its zero-byte refreshes as a sustained guarantee?

## Back

The cache returns the result of a previously executed query for about
24 hours when the query text and underlying data are unchanged; cache
hits report `cache_hit = TRUE` and bill 0 bytes. As soon as the base
table changes, the next refresh misses the cache and bills bytes. A
cost review must therefore record both the cache-hit observation and
the data-stability assumption behind it.
