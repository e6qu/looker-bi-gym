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
reduces the components consistently; the ratio recomputes correctly at
the filtered grain. `AVG(row_average)` averages already-aggregated row
values, which discards the row weights and gives a different answer (the
worked example in tutorial 04: 15950.00 weighted vs 14012.50
average-of-averages).
