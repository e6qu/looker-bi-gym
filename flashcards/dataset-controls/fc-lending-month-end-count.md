---
{
  "id": "fc-lending-month-end-count",
  "title": "What dataset trap should a month-end lending tutorial check before charting balances?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "dataset-controls",
  "source_facts": ["FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard"],
}
---

# What dataset trap should a month-end lending tutorial check before charting balances?

## Front

What dataset trap should a month-end lending tutorial check before charting balances?

## Back

It should detect and separate non-month-end snapshot rows before producing month-end serving outputs.
