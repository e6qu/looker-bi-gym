---
{
  "id": "fc-privacy-rls-vs-cls",
  "title": "When does row-level security solve a problem that column-level security cannot, and vice versa?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "privacy-security",
  "source_facts":
    ["FACT-BIGQUERY-ROW-ACCESS-POLICY", "FACT-BIGQUERY-COLUMN-POLICY-TAG"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard", "bigquery", "security"],
}
---

# When does row-level security solve a problem that column-level security cannot, and vice versa?

## Front

When does row-level security solve a problem that column-level security
cannot, and vice versa?

## Back

RLS restricts which rows a viewer can see; use it when different identities
need different row sets from the same table. CLS restricts which columns a
viewer can see; use it when the table must stay broadly readable but
specific columns are sensitive. They compose: a table can use both
together.
