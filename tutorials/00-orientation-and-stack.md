# 00 - Orientation And Stack

Area: A - Orientation And Source Data

Builds on: none.

Input sources: documentation only.

Produces:

- `notes/00-stack-decisions.md`
- Selected GCP project, region, and naming conventions.
- Initial regulatory-context tags for the demo.

## Problem

Understand what role each tool plays in a BigQuery + Looker Studio banking BI project and avoid confusing Looker Studio with Looker.

## Outcome

You can explain the architecture, name the project layers, identify where banking metric logic should live, and describe why real bank data must not be used in the demo repo.

## Tasks

- Create a GCP project or choose an existing sandbox project.
- Enable BigQuery.
- Open Looker Studio and inspect reports, data sources, connectors, and templates.
- Read [docs/00-research-map.md](../docs/00-research-map.md).
- Read [docs/07-banking-domain-guide.md](../docs/07-banking-domain-guide.md).
- Read [docs/08-eu-romania-regulatory-context.md](../docs/08-eu-romania-regulatory-context.md).
- Skim [regulations/README.md](../regulations/README.md) and choose the regulation briefs relevant to the dashboard you will build.
- Read [tutorials/data-sources.md](data-sources.md) and [tutorials/curriculum.md](curriculum.md).
- Write a short architecture note: synthetic raw banking data -> BigQuery models -> governed serving views -> Looker Studio report.

## Investigation Questions

- What should BigQuery do?
- What should Looker Studio do?
- What would Looker/LookML add that Looker Studio does not provide?
- Where will this project define governed metrics?
- Which banking data types must be masked, excluded, or simulated?
- Which EU/Romanian regulatory contexts might apply to this dashboard: COREP/FINREP/Pillar 3, DORA, PSD2, AML/CFT, GDPR, BNR reporting, ONPCSB workflow, or FGDB deposit guarantee?

## Deliverable

Create `notes/00-stack-decisions.md` with the chosen project, region, naming conventions, BI architecture assumptions, synthetic-data boundaries, and banking governance assumptions.
