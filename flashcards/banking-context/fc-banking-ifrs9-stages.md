---
{
  "id": "fc-banking-ifrs9-stages",
  "title": "What are the three IFRS 9 ECL stages and what BI signal does each carry?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts":
    ["FACT-IFRS9-STAGES", "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md"],
  "tags": ["flashcard", "banking", "regulatory"],
}
---

# What are the three IFRS 9 ECL stages and what BI signal does each carry?

## Front

What are the three IFRS 9 ECL stages and what BI signal does each carry?

## Back

Stage 1: 12-month ECL, performing. Stage 2: lifetime ECL, significant
increase in credit risk but not credit-impaired. Stage 3: lifetime ECL,
credit-impaired. Stage transitions usually explain large month-over-month
ECL variance; a single ECL total without the stage breakdown obscures
that.
