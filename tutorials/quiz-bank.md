---
{
  "id": "tutorial-tutorials-quiz-bank",
  "title": "Quiz Bank",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.2.0",
  "topic": "core",
  "tags": ["tutorial", "synthetic-data"],
}
---

# Quiz Bank

Use the [interactive quiz surface](#/quiz) to attempt scenario-driven
questions on banking BI, BigQuery SQL and serving patterns, Looker
Studio mechanics, dashboard controls, governance, and cost / operations
decisions.

Objective: check whether you can recall and apply core BI mechanics
against a banking scenario without reference material.

After this quiz, you will be able to:

- Recognise which competency area each question targets.
- Translate a missed question into a focused review of the underlying
  concept rather than a fix to the answer text.
- Decide which terminology or tutorial area to revisit before retrying.

Training boundary: use synthetic training data only. The questions are
technical learning material, not legal, regulatory, accounting, privacy,
compliance, or model-risk advice.

## Coverage Areas

The bank covers, across easy / medium / hard difficulty groups:

- BI grain, dimension vs metric, weighted vs average-of-averages,
  fanout repair, conformed dimensions, surrogate keys, SCD types.
- BigQuery SQL: logical and materialized views, partition filters,
  clustering, `QUALIFY`, `DATE_TRUNC`, `SAFE_CAST`, `SAFE_DIVIDE`,
  parameterized queries, query results cache, count semantics.
- BigQuery governance: authorized views, row-level security
  (`CREATE ROW ACCESS POLICY`), column-level security (policy tags),
  job metadata privacy.
- Looker Studio: data sources, default aggregation, calculated field
  scope, blends and join operators, controls and parameter bindings,
  data freshness intervals, credential modes.
- Banking and regulatory context: deposit-guarantee grain (DGSD /
  FGDB), DORA ICT third-party register and incidents, EBA validation
  rule versioning, CRR CET1 ratio, IFRS 9 stages, BCBS 239 RDARR
  principles, GDPR personal data and special-category data.

## Self-Assessment Pattern

Each question stands alone as a banking BI scenario. For any miss, note
which competency area was unclear (grain, join behaviour, governance
mechanic, cost mechanic, regulatory context) and revisit the
terminology or tutorial covering that area.
