---
{
  "id": "fc-banking-fgdb-currency",
  "title": "Why must a Romanian deposit-guarantee dashboard keep ledger currency separate from compensation currency?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts": ["FACT-FGDB-PAYS-RON", "FACT-BI-REFERENCE-DATE-SEPARATION"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard", "banking", "regulatory"],
}
---

# Why must a Romanian deposit-guarantee dashboard keep ledger currency separate from compensation currency?

## Front

Why must a Romanian deposit-guarantee dashboard keep ledger currency
separate from compensation currency?

## Back

Compensation is paid in RON using the relevant BNR exchange-rate date,
while ledger balances may be in EUR, RON, or other currencies at the
account-day grain. A coverage report that mixes the two without recording
the conversion rule and rate date cannot be reconciled to a payout
calculation.
