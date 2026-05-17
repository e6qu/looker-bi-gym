---
{
  "id": "fc-operations-clustering-impact",
  "title": "When does adding clustering to a partitioned BigQuery table reduce dashboard scan cost, and when does it not?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "performance-operations",
  "source_facts":
    ["FACT-BIGQUERY-CLUSTERING", "FACT-BIGQUERY-PARTITION-FILTERS"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md"],
  "tags": ["flashcard", "bigquery", "cost"],
}
---

# When does adding clustering to a partitioned BigQuery table reduce dashboard scan cost, and when does it not?

## Front

When does adding clustering to a partitioned BigQuery table reduce
dashboard scan cost, and when does it not?

## Back

Clustering on non-partition columns (currency, branch, product) reduces
scan cost for filters and aggregations on those columns inside a
partition. Clustering on the partition column itself is redundant
because partition pruning already narrows that axis. Clustering also
has no effect when the dashboard query has no filter or aggregation on
the cluster columns.
