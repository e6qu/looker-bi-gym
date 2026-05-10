---
{
  "id": "fc-contract-view-scope",
  "title": "What boundary should a report-serving BigQuery view provide for BI?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "metric-contracts",
  "source_facts":
    ["FACT-BIGQUERY-VIEW-SCOPE", "FACT-BIGQUERY-SELECT-LIST-NARROWING"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard"],
}
---

# What boundary should a report-serving BigQuery view provide for BI?

## Front

What boundary should a report-serving BigQuery view provide for BI?

## Back

It should expose the intended reporting columns and metric grain rather than every raw operational field.
