---
{
  "id": "fc-bi-surrogate-key",
  "title": "Why do BI dimension tables use surrogate keys rather than natural source keys?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts": ["FACT-BI-SURROGATE-KEY", "FACT-BI-SCD-TYPES"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md"],
  "tags": ["flashcard", "modeling"],
}
---

# Why do BI dimension tables use surrogate keys rather than natural source keys?

## Front

Why do BI dimension tables use surrogate keys rather than natural source
keys?

## Back

Natural keys can change (renames, merges, source-system migrations) and
SCD-2 history splits create multiple rows with the same natural key over
time. A system-generated surrogate key makes each historical dimension
row unique and lets facts join the right historical version without
breaking on natural-key changes.
