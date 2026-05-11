---
{
  "id": "tutorial-tutorials-09-technical-bi-capstone",
  "title": "09 - Technical BI Capstone",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "core",
  "source_facts":
    [
      "FACT-BIGQUERY-VIEW-SCOPE",
      "FACT-DORA-ICT-IDENTIFICATION",
      "FACT-DORA-ICT-RISK-FRAMEWORK",
      "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
      "FACT-GDPR-DATA-MINIMISATION",
      "FACT-LOOKER-STUDIO-CREDENTIALS",
      "FACT-LOOKER-STUDIO-DATA-SOURCE",
    ],
  "tags": ["tutorial", "synthetic-data"],
}
---

# 09 - Technical BI Capstone

Area: E - Capstone

Synthetic-data boundary: the capstone uses committed synthetic datasets,
synthetic evidence, and browser-local completion state only. Do not use real
banking data, credentials, private customer screenshots, or production exports.

Builds on all previous tutorials.

Required tools: browser-first challenge path; optional BigQuery and Looker Studio
browser UI for the applied track.

Objective: assemble a production-shaped but synthetic banking BI product whose
metrics, data sources, governance controls, and operations evidence are
inspectable.

After this tutorial, you will be able to:

- Organize a multi-page BI product around governed serving sources.
- Link metric contracts, source notes, sensitive-field controls, and operations
  evidence.
- Prepare completion evidence without raw answers, credentials, or private data.

Produces:

- Multi-page banking BI product.
- Metric contracts.
- Serving-view inventory.
- Regulation-context register.
- Operations evidence register.

## Source Facts

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Goal

Create a capstone package that a reviewer can inspect for metric definitions,
data-source boundaries, governance controls, and operational readiness.

## Steps

1. Create an executive page from curated serving views.
2. Create a deposits page that preserves account-date balance grain and records
   depositor-bank grain caveats for guarantee-style analysis.
3. Create a governance page listing sensitive fields, masking/exclusion choices,
   and the source notes behind each control.
4. Create an operations page with freshness, reconciliation, dependencies, owner
   teams, and incident-evidence placeholders.
5. Review every report data source and credential mode.
6. Prepare completion evidence that records scenario names, versions,
   timestamps, and pass/fail outcomes without raw answers or credentials.

## Checkpoints

- Every dashboard page uses a curated serving source.
- Every metric has a contract with grain, formula, owner, and allowed dimensions.
- Sensitive fields are excluded or masked.
- Operations evidence names dependencies, owners, freshness, and reconciliation
  controls.
- The completion evidence summary stays credential-free.

## Common Failure Modes

- Creating a visually polished dashboard with no metric contracts.
- Mixing chart-only calculations with governed metrics.
- Leaving credential, ownership, or freshness behavior undocumented.
- Treating source notes as decoration instead of linking them to actual controls.

## Deliverable

Create a capstone README with dashboard pages, serving views, metric contracts,
regulation-context links, operations evidence, and the completion evidence
summary.
