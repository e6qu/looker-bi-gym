---
{
  "id": "fc-looker-freshness-memory",
  "title": "Why can a Looker Studio report show cached-looking values?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "looker-studio",
  "source_facts": ["FACT-LOOKER-STUDIO-FRESHNESS-MEMORY", "FACT-GDPR-ACCURACY"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "freshness"],
}
---

# Why can a Looker Studio report show cached-looking values?

## Front

Why can a Looker Studio report show cached-looking values?

## Back

Looker Studio can serve report data from memory while the data-source freshness threshold applies, so stale-looking values must be checked against both source update timing and report refresh behavior.
