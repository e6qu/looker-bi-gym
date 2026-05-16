---
{
  "id": "fc-bi-weighted-vs-avg-of-avgs",
  "title": "Why does SUM(numerator)/SUM(denominator) survive chart filters when AVG(row_average) does not?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "bi-fundamentals",
  "source_facts":
    [
      "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
      "FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-006-ratio-null-contract.md"],
  "tags": ["flashcard", "metric-contracts"],
}
---

# Why does SUM(numerator)/SUM(denominator) survive chart filters when AVG(row_average) does not?

## Front

Why does `SUM(numerator) / SUM(denominator)` survive chart filters when
`AVG(row_average)` does not?

## Back

The weighted formula aggregates components first, so any chart filter
reduces the components consistently and the ratio recomputes correctly at
the filtered grain. `AVG(row_average)` averages already-aggregated row
values, which discards the row weights. A bank that has one large branch
holding most of the balance and many small branches will see the
weighted average pulled toward the large branch (correct) while the
average-of-averages flattens every branch to equal weight (wrong).
