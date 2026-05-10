---
{
  "id": "fc-looker-bigquery-refresh-cost",
  "title": "Why do BigQuery-backed Looker Studio refreshes matter for cost review?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "looker-studio",
  "source_facts":
    ["FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST", "FACT-BIGQUERY-JOBS-BYTES"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard", "cost"],
}
---

# Why do BigQuery-backed Looker Studio refreshes matter for cost review?

## Front

Why do BigQuery-backed Looker Studio refreshes matter for cost review?

## Back

Manual and automatic refreshes can query the underlying BigQuery project, so dashboard operations should be checked against job evidence and bytes processed.
