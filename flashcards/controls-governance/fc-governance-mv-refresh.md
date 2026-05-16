---
{
  "id": "fc-governance-mv-refresh",
  "title": "Why is materialized-view refresh interval part of a dashboard freshness review?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "controls-governance",
  "source_facts":
    [
      "FACT-BIGQUERY-MATERIALIZED-VIEW-REFRESH",
      "FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE",
      "FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "bigquery", "freshness"],
}
---

# Why is materialized-view refresh interval part of a dashboard freshness review?

## Front

Why is materialized-view refresh interval part of a dashboard freshness
review?

## Back

A materialized view caches its result and refreshes on a configurable
interval. The cached result is at most that interval behind the base
table. Replacing a logical view with a materialized view does not
eliminate freshness review; the dashboard SLA must fit the refresh
interval.
