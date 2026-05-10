---
{
  "id": "fc-dgsd-aggregate-depositor",
  "title": "Why does deposit-guarantee reporting make owner/account joins risky?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts":
    ["FACT-DGSD-AGGREGATE-PER-DEPOSITOR", "FACT-BI-FANOUT-JOIN-RISK"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard"],
}
---

# Why does deposit-guarantee reporting make owner/account joins risky?

## Front

Why does deposit-guarantee reporting make owner/account joins risky?

## Back

The reporting target can require aggregation per depositor, while account and owner tables often sit at different grains.
