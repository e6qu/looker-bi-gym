---
{
  "id": "fc-performance-view-rerun",
  "title": "What BigQuery view behavior matters for BI performance reviews?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "performance-operations",
  "source_facts": ["FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME"],
  "recommended_learner_tasks": ["#/tutorials/06-performance-and-cost-lab.md"],
  "tags": ["flashcard"],
}
---

# What BigQuery view behavior matters for BI performance reviews?

## Front

What BigQuery view behavior matters for BI performance reviews?

## Back

A logical view runs its query when referenced, so repeated dashboards can repeatedly execute the underlying SQL.
