---
{
  "id": "fc-looker-controls-filter",
  "title": "What should a Looker Studio filter control bind to?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "looker-studio",
  "source_facts":
    [
      "FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA",
      "FACT-LOOKER-STUDIO-CONTROL-FIELD-ID",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md"],
  "tags": ["flashcard", "controls"],
}
---

# What should a Looker Studio filter control bind to?

## Front

What should a Looker Studio filter control bind to?

## Back

It should bind to a stable data-source field, such as `currency_code`, whose
filter behavior and allowed values are documented before charts depend on it.
