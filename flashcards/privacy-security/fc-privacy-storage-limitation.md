---
{
  "id": "fc-privacy-storage-limitation",
  "title": "How does GDPR storage limitation affect a BI dashboard's retention design?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "privacy-security",
  "source_facts":
    ["FACT-GDPR-STORAGE-LIMITATION", "FACT-GDPR-PROCESSING-PRINCIPLES"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard", "privacy", "gdpr"],
}
---

# How does GDPR storage limitation affect a BI dashboard's retention design?

## Front

How does GDPR storage limitation affect a BI dashboard's retention
design?

## Back

Personal data should be kept in identifiable form no longer than necessary
for the stated purpose. For BI, that means: serving tables that retain
identifiers need an explicit retention window tied to the purpose, and
aggregated dashboards should consume identifier-free serving sources
whenever possible so the retention concern moves upstream.
