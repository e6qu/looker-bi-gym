---
{
  "id": "fc-bi-count-distinct-grain",
  "title": "What should a distinct-count metric state before it reaches a dashboard?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts": ["FACT-BIGQUERY-COUNT-DISTINCT-GRAIN"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard"],
}
---

# What should a distinct-count metric state before it reaches a dashboard?

## Front

What should a distinct-count metric state before it reaches a dashboard?

## Back

It should state the entity being counted and the reporting grain, because joins can change the row set being counted.
