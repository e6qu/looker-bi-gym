---
{
  "id": "fc-governance-clustering-vs-partition",
  "title": "When does clustering reduce scan cost beyond what partition filtering already achieves?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "controls-governance",
  "source_facts":
    ["FACT-BIGQUERY-CLUSTERING", "FACT-BIGQUERY-PARTITION-FILTERS"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md"],
  "tags": ["flashcard", "bigquery", "cost"],
}
---

# When does clustering reduce scan cost beyond what partition filtering already achieves?

## Front

When does clustering reduce scan cost beyond what partition filtering
already achieves?

## Back

When queries filter or aggregate on non-partition columns. Partition
pruning narrows the date range; clustering then sorts rows inside each
partition by the cluster columns, so filters on those columns scan less
data. Clustering on the partition column itself is redundant.
