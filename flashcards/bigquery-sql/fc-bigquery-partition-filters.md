---
{
  "id": "fc-bigquery-partition-filters",
  "title": "Why should BI queries include partition filters when the table design supports them?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts": ["FACT-BIGQUERY-PARTITION-FILTERS"],
  "recommended_learner_tasks": ["#/tutorials/06-performance-and-cost-lab.md"],
  "tags": ["flashcard"],
}
---

# Why should BI queries include partition filters when the table design supports them?

## Front

Why should BI queries include partition filters when the table design supports them?

## Back

Partition filters limit the scanned data range and make cost/performance behavior easier to reason about.
