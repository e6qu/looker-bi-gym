---
{
  "id": "fc-bigquery-parameter-values",
  "title": "What belongs in a BigQuery query parameter?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT",
      "FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md"],
  "tags": ["flashcard", "bigquery", "parameters"],
}
---

# What belongs in a BigQuery query parameter?

## Front

What belongs in a BigQuery query parameter?

## Back

A value belongs in a parameter, such as `@selected_currency` or
`@selected_business_date`; table names, column names, and SQL structure should
stay in governed SQL.
