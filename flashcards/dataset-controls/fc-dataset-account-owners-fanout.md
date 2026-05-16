---
{
  "id": "fc-dataset-account-owners-fanout",
  "title": "Why does an owner-side many-to-many table fanout balance facts when joined directly?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "dataset-controls",
  "source_facts":
    ["FACT-BI-FANOUT-JOIN-RISK", "FACT-BIGQUERY-REDUCE-BEFORE-JOIN"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard", "modeling"],
}
---

# Why does an owner-side many-to-many table fanout balance facts when joined directly?

## Front

Why does an owner-side many-to-many table fanout balance facts when
joined directly?

## Back

Each balance row is multiplied by the number of owner rows matching its
account, so a joint account with two owners produces two balance rows
in the join output. Summing the multiplied rows overstates the
underlying balance total. The cert-correct repair is to aggregate
balances to the required reporting grain before joining the owner
side, or to compute owner allocation separately from current-balance
KPIs.
