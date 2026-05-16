---
{
  "id": "fc-bi-scd-types",
  "title": "Which SCD type preserves period-specific dimension attributes, and which silently overwrites history?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts": ["FACT-BI-SCD-TYPES", "FACT-BI-SURROGATE-KEY"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md"],
  "tags": ["flashcard", "modeling"],
}
---

# Which SCD type preserves period-specific dimension attributes, and which silently overwrites history?

## Front

Which SCD type preserves period-specific dimension attributes, and which
silently overwrites history?

## Back

SCD type 2 preserves history by inserting a new dimension row per change
with effective-from / effective-to dates; facts reference the surrogate
valid at the fact's reference date. SCD type 1 overwrites the prior value
in place, which rewrites every historical metric grouped by that
attribute. Type 3 keeps current and previous values as columns.
