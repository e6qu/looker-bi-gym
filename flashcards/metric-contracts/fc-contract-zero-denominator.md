---
{
  "id": "fc-contract-zero-denominator",
  "title": "What must a ratio metric contract say about zero denominators?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "metric-contracts",
  "source_facts":
    [
      "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
      "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "metric-contract"],
}
---

# What must a ratio metric contract say about zero denominators?

## Front

What must a ratio metric contract say about zero denominators?

## Back

It must define whether the result is `NULL`, hidden, shown as zero, or flagged as a control issue. The SQL guard prevents a failure; the contract defines the business interpretation.
