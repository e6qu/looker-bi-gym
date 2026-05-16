---
{
  "id": "fc-governance-results-cache",
  "title": "Why can't a cost review treat BigQuery query-results cache hits as a sustained zero-cost guarantee?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "controls-governance",
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

# Why can't a cost review treat BigQuery query-results cache hits as a sustained zero-cost guarantee?

## Front

Why can't a cost review treat BigQuery query-results cache hits as a
sustained zero-cost guarantee?

## Back

Cached results last about 24 hours and only apply when the query text and
underlying data are unchanged. The moment the base table receives new
rows, the cache misses and the refresh bills bytes. A cost review must
record both the cache-hit observation and the data-stability assumption.
