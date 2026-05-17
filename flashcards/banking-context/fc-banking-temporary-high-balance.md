---
{
  "id": "fc-banking-temporary-high-balance",
  "title": "What evidence is required before modelling deposit-guarantee temporary high-balance protection?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts":
    [
      "FACT-DGSD-TEMPORARY-HIGH-BALANCES",
      "FACT-FGDB-PAYS-RON",
      "FACT-BI-REFERENCE-DATE-SEPARATION",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md"],
  "tags": ["flashcard", "banking", "regulatory"],
}
---

# What evidence is required before modelling deposit-guarantee temporary high-balance protection?

## Front

What evidence is required before modelling deposit-guarantee temporary
high-balance protection?

## Back

The event type that supports temporary protection, the event date plus
protected-until date plus unavailability date (for FGDB compensation
context), and the currency / exchange-rate-date used because compensation
is paid in RON. A balance simply above the standard ceiling without event
evidence is not temporarily protected.
