---
{
  "id": "fc-banking-psd2-sca",
  "title": "What does PSD2 strong customer authentication require, and what does that imply for a payments BI dashboard?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts":
    ["FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION", "FACT-GDPR-DATA-MINIMISATION"],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "banking", "regulatory"],
}
---

# What does PSD2 strong customer authentication require, and what does that imply for a payments BI dashboard?

## Front

What does PSD2 strong customer authentication (SCA) require, and what
does that imply for a payments BI dashboard?

## Back

SCA requires two or more independent authentication elements drawn from
knowledge, possession, and inherence for electronic payment
transactions. A payments BI aggregate dashboard tracks SCA outcome,
exemption reason, and channel category by reporting period; per-customer
SCA evidence belongs on a separately access-controlled detail page, not
on the broad aggregate.
