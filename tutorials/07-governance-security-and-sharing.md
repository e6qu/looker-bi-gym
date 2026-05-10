---
{
  "id": "tutorial-tutorials-07-governance-security-and-sharing",
  "title": "07 - Governance, Security, And Sharing",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-GDPR-PERSONAL-DATA",
      "FACT-GDPR-PROCESSING-PRINCIPLES",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 07 - Governance, Security, And Sharing

Area: D - Governance, Security, And Operations

Synthetic-data boundary: masking, access, and sharing exercises use synthetic
records only. Do not include real personal data, credentials, private report
URLs, or production policy text.

Builds on:

- [02 - Build A BI-Friendly Model](02-build-a-bi-friendly-model.md)
- [03 - First Executive Dashboard](03-first-executive-dashboard.md)

Required tools: browser docs path first; optional Looker Studio browser UI.

Objective: define what a banking BI dashboard is allowed to expose and how
access should be documented without turning the app into a credential store.

After this tutorial, you will be able to:

- Classify serving fields by sensitivity and dashboard purpose.
- Record Looker Studio credential behavior safely.
- Link governance controls to source facts and regulatory context.

Produces:

- Access-safe serving view plan.
- `serve.reg_context_register`
- `notes/07-governance-sharing.md`

## Source Facts

- `FACT-GDPR-PERSONAL-DATA`
- `FACT-GDPR-DATA-MINIMISATION`
- `FACT-GDPR-PROCESSING-PRINCIPLES`
- `FACT-LOOKER-STUDIO-CREDENTIALS`
- `FACT-BIGQUERY-VIEW-SCOPE`

## Goal

Define what the dashboard is allowed to expose and how viewers receive access
without turning the training app into a credential store.

## Steps

1. List every serving field visible in the executive dashboard.
2. Mark each field as aggregate, dimension, masked identifier, or prohibited raw
   identifier.
3. Remove or mask fields that are not needed for the dashboard purpose.
4. For each page, record a regulatory-context tag and the source fact that
   explains the control.
5. Inspect Looker Studio data credentials and record the sharing implication
   without storing tokens or keys.
6. Draft `serve.reg_context_register` with dashboard page, metric, source fact,
   owner, and review date.

## Checkpoints

- Raw account/customer identifiers are not visible in serving outputs.
- Credential behavior is documented as a Looker Studio data-source setting.
- The regulation-context register links each control to a source fact.

## Common Failure Modes

- Sharing a report safely but leaving unsafe fields in the data source.
- Treating pseudonymized or synthetic identifiers as automatically safe.
- Pasting credentials or private report URLs into evidence notes.

## Deliverable

Create `notes/07-governance-sharing.md` and a draft `serve.reg_context_register`
layout.
