---
{
  "id": "fc-bigquery-reduce-before-join",
  "title": "What BigQuery SQL pattern reduces fanout risk before joining owner tables?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts": ["FACT-BIGQUERY-REDUCE-BEFORE-JOIN"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard"],
}
---

# What BigQuery SQL pattern reduces fanout risk before joining owner tables?

## Front

What BigQuery SQL pattern reduces fanout risk before joining owner tables?

## Back

Reduce or aggregate the many-side table to the target reporting grain before joining it into the metric result.
