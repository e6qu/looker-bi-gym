---
{
  "id": "fc-looker-calculated-field-scope",
  "title": "When should a Looker Studio calculated field stay in the report layer?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "looker-studio",
  "source_facts":
    ["FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE", "FACT-BIGQUERY-VIEW-SCOPE"],
  "recommended_learner_tasks":
    ["#/tutorials/04-metrics-and-calculated-fields.md"],
  "tags": ["flashcard"],
}
---

# When should a Looker Studio calculated field stay in the report layer?

## Front

When should a Looker Studio calculated field stay in the report layer?

## Back

Use it for presentation-local logic; shared governed metric logic belongs upstream in SQL or a controlled serving view.
