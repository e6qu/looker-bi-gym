# 021 - Fact-Backed Question Rewrite

Status: planned.

## Goal

Replace generic quiz and challenge questions with focused, fact-based questions
that reference actual legislation, technology documentation, project instruction
docs, or synthetic dataset outputs.

## Deliverables

- Update released challenge manifests so regulation, platform, browser-storage,
  and BI-tooling questions carry source fact references.
- Replace project-preference prompts with fact-backed prompts where possible.
- Add questions that test:
  - GDPR data minimisation and personal-data implications for serving outputs.
  - FGDB/EU deposit guarantee amount and depositor-bank grain.
  - DuckDB-WASM browser execution and local validation boundaries.
  - BigQuery logical view behavior and limitations.
  - Looker Studio data-source, calculated-field, and credential behavior.
  - DORA/EBA operational and reporting evidence concepts for later modules.
- Update solution fixtures and golden tests for changed answers.

## Verification

- Every fact-backed prompt has an answer recoverable from a source fact or from
  a cited lesson checkpoint.
- Wrong answers represent realistic BI mistakes.
- Explanations identify the fact ID and the operational consequence.
- Challenge flags still require real learner work, not only reading recall.

## Tests

- `bun run validate:manifests`
- `bun run test:quiz`
- `bun run test:fixtures`
- `bun run test:content-qa`
- `bun run test:e2e`
- `bun run check`
