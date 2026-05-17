---
{
  "id": "tutorial-tutorials-quiz-bank",
  "title": "Banking BI Self-Assessment Lens",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.4.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Banking BI Self-Assessment Lens

This page is a generic study lens for a banking BI learner: how to read
your own knowledge gaps, how to map a banking scenario back to the
underlying mechanic, and how to decide what to revisit next. It does
not enumerate or describe any specific question or card.

Objective: develop a consistent way of asking "do I really know this?"
about a banking BI scenario.

After this quiz, you will be able to:

- Identify which competency family a banking BI scenario sits in.
- Translate "I am unsure about X" into the underlying mechanic rather
  than the surface phrasing of the scenario.
- Choose the right reference (terminology, BI mechanic note, regulator
  source) to revisit before retrying.

Training boundary: use synthetic training data only. This lens is
technical learning material, not legal, regulatory, accounting,
privacy, compliance, or model-risk advice.

## Competency Families

A banking BI scenario almost always sits in one of these families.
Naming the family is the first step of any self-assessment.

- BI modeling: grain, fanout, additive vs semi-additive measures,
  count semantics, dimension change history, key strategy.
- BigQuery SQL and cost: view shapes, partition and clustering, cache
  semantics, dry-run vs real run, job metadata, parameterized queries,
  null-safe operators, period boundary functions.
- BigQuery security: authorized views, row-level security, column-level
  security via policy tags.
- Looker Studio mechanics: data sources, calculated-field scope, blend
  semantics, controls and parameters, cache-staleness thresholds,
  credential modes.
- Privacy and regulatory context: GDPR principles and special-category
  data; the deposit-guarantee, ICT-risk, capital-ratio, credit-risk,
  payment-services, and AML / CFT regimes; risk-data aggregation
  principles; supervisory reporting frameworks.

## The Three Questions

For any scenario you are unsure about, ask three questions in order:

1. **Which competency family is this?** If you cannot name the family
   in one phrase, the scenario is reading you as confused at the
   conceptual layer; do not start from the SQL.
2. **What is the one-sentence rule that governs this family?** If you
   cannot state the rule, the gap is at the mechanic layer; revisit the
   terminology entry or BI mechanic note before retrying.
3. **What is the one-sentence pitfall most beginners hit here?** If you
   cannot name the pitfall, the gap is at the application layer; look
   for a worked example that contrasts the right and wrong shape and
   work through it before retrying.

Three "no" answers mean the scenario is currently outside your
applied-knowledge boundary. Three "yes" answers mean you should be able
to write the SQL or design step that prevents the pitfall on a
synthetic banking scenario without reference material.

## How To Use This Lens

Apply the lens to any banking BI scenario you encounter, regardless of
where you encountered it. The lens is not specific to any one practice
surface; it is the meta-skill a cert-track learner is building.

Keep a short note per scenario:

- the family it belongs to,
- the rule and the pitfall in one sentence each,
- the reference (terminology, BI mechanic, regulator source) you used
  to close the gap,
- whether you would re-derive the same answer one week from now without
  reference material.

When a family accumulates more than two unclosed gaps, schedule a
focused review of that family before moving on.
