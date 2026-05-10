---
{
  "id": "fc-bigquery-safe-divide",
  "title": "What does SAFE_DIVIDE protect in a dashboard ratio?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts":
    [
      "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
      "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "ratio"],
}
---

# What does SAFE_DIVIDE protect in a dashboard ratio?

## Front

What does `SAFE_DIVIDE` protect in a dashboard ratio?

## Back

It keeps a zero-denominator division from failing the query by returning `NULL`, so the metric contract still has to define how that `NULL` is counted, displayed, and reconciled.
