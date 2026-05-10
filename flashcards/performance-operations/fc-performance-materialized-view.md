---
{
  "id": "fc-performance-materialized-view",
  "title": "When can a materialized view help a BI workload more than a logical view?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "performance-operations",
  "source_facts":
    [
      "FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED",
      "FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS",
    ],
  "recommended_learner_tasks": ["#/tutorials/06-performance-and-cost-lab.md"],
  "tags": ["flashcard"],
}
---

# When can a materialized view help a BI workload more than a logical view?

## Front

When can a materialized view help a BI workload more than a logical view?

## Back

A materialized view precomputes eligible results, which can reduce repeated query work when its limitations fit the use case.
