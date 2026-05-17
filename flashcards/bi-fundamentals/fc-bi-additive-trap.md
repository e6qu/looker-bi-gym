---
{
  "id": "fc-bi-additive-trap",
  "title": "When is SUM(COUNT(DISTINCT customer_id)) across groups silently wrong?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts":
    ["FACT-BIGQUERY-COUNT-DISTINCT-GRAIN", "FACT-BI-FANOUT-JOIN-RISK"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md"],
  "tags": ["flashcard", "modeling", "sql"],
}
---

# When is SUM(COUNT(DISTINCT customer_id)) across groups silently wrong?

## Front

When is `SUM(COUNT(DISTINCT customer_id))` across groups silently wrong?

## Back

Whenever a single customer can appear in more than one of the grouped
buckets. Distinct counts are not additive across groups; the sum
double-counts customers who appear in multiple groups. The cert-correct
recompute is `COUNT(DISTINCT customer_id)` over the same window directly.
