---
{
  "id": "fc-governance-validation-rule-version",
  "title": "Why must regulatory-style BI report comparisons name the validation rule version per period?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "controls-governance",
  "source_facts":
    [
      "FACT-EBA-DPM-VALIDATION-RULES",
      "FACT-EBA-VALIDATION-RULES-CHANGE",
      "FACT-EBA-FRAMEWORK-VERSIONING",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "governance", "regulatory"],
}
---

# Why must regulatory-style BI report comparisons name the validation rule version per period?

## Front

Why must regulatory-style BI report comparisons name the validation rule
version per period?

## Back

Validation rules change between framework versions. A break that appears
when comparing two periods may be caused by the data, by a rule change,
or by a framework-version difference. Without the rule and framework
version recorded per period, the cause cannot be identified.
