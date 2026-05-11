---
{
  "id": "fc-bigquery-dry-run",
  "title": "Why check a BigQuery dry run before publishing a dashboard query?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BIGQUERY-DRY-RUN-BYTES",
      "FACT-BIGQUERY-QUERY-VALIDATOR-BYTES",
      "FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md"],
  "tags": ["flashcard", "bigquery", "cost"],
}
---

# Why check a BigQuery dry run before publishing a dashboard query?

## Front

Why check a BigQuery dry run before publishing a dashboard query?

## Back

It validates the query shape and estimates processed bytes before a report
refresh turns the query into repeated dashboard cost.
