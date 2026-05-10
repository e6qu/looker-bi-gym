---
{
  "id": "fc-bigquery-jobs-window",
  "title": "Why should a BigQuery jobs query include an explicit time window?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts": ["FACT-BIGQUERY-JOBS-CREATION-TIME"],
  "recommended_learner_tasks": ["#/tutorials/06-performance-and-cost-lab.md"],
  "tags": ["flashcard"],
}
---

# Why should a BigQuery jobs query include an explicit time window?

## Front

Why should a BigQuery jobs query include an explicit time window?

## Back

`INFORMATION_SCHEMA.JOBS` is partitioned by creation time, so bounded time filters make cost and freshness evidence safer to inspect.
