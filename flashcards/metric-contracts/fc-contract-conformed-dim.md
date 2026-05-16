---
{
  "id": "fc-contract-conformed-dim",
  "title": "Why is a conformed dimension part of a metric contract across multiple subject areas?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "metric-contracts",
  "source_facts":
    ["FACT-BI-CONFORMED-DIMENSION", "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard", "modeling"],
}
---

# Why is a conformed dimension part of a metric contract across multiple subject areas?

## Front

Why is a conformed dimension part of a metric contract across multiple
subject areas?

## Back

A metric contract that names a conformed dimension (the same
`dim_branch`, `dim_customer_masked`, `dim_date` across deposits /
lending / fees) guarantees that cross-mart comparisons resolve to
the same entities, the same attributes, and the same grain. Without a
conformed dimension, two subject areas reporting "by branch" can mean
slightly different things and the comparison is invalid.
