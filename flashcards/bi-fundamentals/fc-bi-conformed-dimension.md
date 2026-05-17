---
{
  "id": "fc-bi-conformed-dimension",
  "title": "What problem does a conformed dimension solve across subject areas?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts": ["FACT-BI-CONFORMED-DIMENSION", "FACT-BI-FANOUT-JOIN-RISK"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard", "modeling"],
}
---

# What problem does a conformed dimension solve across subject areas?

## Front

What problem does a conformed dimension solve across subject areas?

## Back

It lets metrics from different fact tables (deposits, lending, fees) be
combined or compared on the same dimension (branch, customer, date)
without each subject area inventing its own keys and attributes.
Per-chart blends and runtime unions are a sign that conformed dimensions
are missing.
