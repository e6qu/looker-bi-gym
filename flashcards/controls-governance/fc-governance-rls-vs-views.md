---
{
  "id": "fc-governance-rls-vs-views",
  "title": "When is BigQuery row-level security cleaner than maintaining one view per audience?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "controls-governance",
  "source_facts":
    [
      "FACT-BIGQUERY-ROW-ACCESS-POLICY",
      "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard", "bigquery", "security"],
}
---

# When is BigQuery row-level security cleaner than maintaining one view per audience?

## Front

When is BigQuery row-level security cleaner than maintaining one view
per audience?

## Back

When the number of audience scopes grows with identities (one per branch
manager, one per region team). Per-audience views multiply objects to
govern; row access policies compress the surface area into one table
with `FILTER USING (...)` per grantee group. Authorized views still fit
when the audiences are few and stable.
