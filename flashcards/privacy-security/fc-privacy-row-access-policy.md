---
{
  "id": "fc-privacy-row-access-policy",
  "title": "When should a BI design reach for a BigQuery row access policy?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "privacy-security",
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

# When should a BI design reach for a BigQuery row access policy?

## Front

When should a BI design reach for a BigQuery row access policy?

## Back

When one underlying table must return different rows for different
identities (e.g. branch managers see only their own branch). The policy is
defined with `CREATE ROW ACCESS POLICY ... FILTER USING (...)` and is
enforced inside the table, so a view that wraps it cannot leak the
restricted rows.
