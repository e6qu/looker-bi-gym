---
{
  "id": "fc-banking-aml-alert-dashboard",
  "title": "What governance pattern fits an internal AML alert dashboard for a bank's compliance team?",
  "content_type": "flashcard",
  "status": "published",
  "version": "0.1.0",
  "topic": "banking-context",
  "source_facts":
    [
      "FACT-AML-CFT-SUSPICIOUS-ACTIVITY",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-SPECIAL-CATEGORIES",
    ],
  "recommended_learner_tasks":
    ["#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md"],
  "tags": ["flashcard", "banking", "regulatory", "privacy"],
}
---

# What governance pattern fits an internal AML alert dashboard for a bank's compliance team?

## Front

What governance pattern fits an internal AML alert dashboard for a
bank's compliance team?

## Back

A governed aggregate serving view (alert counts, ageing categories, type
breakdown) for the broad audience, and a separately access-controlled
detail page for the investigation team that can show per-alert
narratives and KYC fields. The aggregate must not carry customer IDs,
narratives, or KYC fields. They are highly sensitive personal data with
strict access-control expectations under the AML / CFT regime, and
specific narrative content may incidentally reveal GDPR Article 9
special-category data, which would raise the bar further.
