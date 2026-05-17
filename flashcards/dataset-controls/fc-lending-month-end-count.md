---
{
  "id": "fc-lending-month-end-count",
  "title": "What data-quality trap should a month-end lending exposure check guard against before charting balances?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.1",
  "topic": "dataset-controls",
  "source_facts": ["FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard"],
}
---

# What data-quality trap should a month-end lending exposure check guard against before charting balances?

## Front

What data-quality trap should a month-end lending exposure check guard
against before charting balances?

## Back

Non-month-end snapshot rows mixed into a month-end serving output. A
loan-snapshots table may contain mid-month or off-cycle rows alongside
true month-end rows; an exposure metric must keep only `as_of_date`
values that fall on a month-end boundary, and report the count of any
non-month-end rows seen as a quality control.
