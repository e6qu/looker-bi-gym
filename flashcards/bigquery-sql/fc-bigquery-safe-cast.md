---
{
  "id": "fc-bigquery-safe-cast",
  "title": "What should a BI control do after SAFE_CAST creates NULLs?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bigquery-sql",
  "source_facts": ["FACT-BIGQUERY-SAFE-CAST-DQ-NULL", "FACT-GDPR-ACCURACY"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "data-quality"],
}
---

# What should a BI control do after SAFE_CAST creates NULLs?

## Front

What should a BI control do after `SAFE_CAST` creates `NULL` values?

## Back

Count and reconcile the `NULL` values as data-quality evidence. `SAFE_CAST` prevents a runtime cast error from stopping the query, but it does not prove the source field was accurate.
