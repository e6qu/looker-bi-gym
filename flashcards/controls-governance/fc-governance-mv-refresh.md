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

A materialized view caches its result. BigQuery automatic refresh
targets the configured interval / `max_staleness` setting, but is
best-effort - it is a freshness target, not a hard SLA. Queries can
land on stale results when refresh has not run yet. Replacing a
logical view with a materialized view does not eliminate freshness
review; the design record names the target, the applied configuration,
and the documented behaviour when the cached result is older than the
target.
