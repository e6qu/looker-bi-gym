---
{
  "id": "fc-privacy-column-policy-tag",
  "title": "What does a BigQuery column-level policy tag actually protect?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "privacy-security",
  "source_facts":
    ["FACT-BIGQUERY-COLUMN-POLICY-TAG", "FACT-GDPR-PERSONAL-DATA"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md"],
  "tags": ["flashcard", "bigquery", "security", "privacy"],
}
---

# What does a BigQuery column-level policy tag actually protect?

## Front

What does a BigQuery column-level policy tag actually protect?

## Back

The specific tagged column. A query against the table can still run, but
selecting a tagged column without the fine-grained reader role returns an
access error. Tag identifiers (`account_id`, `customer_id`,
`synthetic_iban`) so a dashboard cannot silently expose them even if a SQL
author selects them.
