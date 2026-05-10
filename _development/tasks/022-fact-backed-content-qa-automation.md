# 022 - Fact-Backed Content QA Automation

Status: complete on 2026-05-09.

## Goal

Extend automated content QA so generic tutorials, source-free quiz prompts, and
broken fact references cannot be released accidentally.

## Deliverables

- Extend content QA to parse tutorial Markdown and challenge manifests for
  required source fact IDs.
- Validate that every referenced fact ID exists in `docs/facts/README.md`.
- Flag released quiz prompts that use regulation, product, browser-storage, or
  BI-tooling terms without source fact references.
- Flag tutorial files that do not contain step-by-step sections, expected
  checkpoints, and failure-mode notes.
- Document the content QA rules in `docs/11-content-qa-checklist.md`.

## Verification

- A manifest with a missing fact ID fails content QA.
- A released tutorial without step/checkpoint/failure-mode sections fails content
  QA.
- Existing synthetic-data, required-tool, disclaimer, and Markdown-link checks
  remain intact.

## Tests

- `bun run test:content-qa`
- `bun run test:platform-boundary`
- `bun run check`

## Notes

- Content QA now extracts fact IDs from `docs/facts/README.md`.
- Challenge lesson steps and questions must cite known source facts.
- Released challenges must include step-by-step lesson steps.
- Released tutorial Markdown files must include `## Source Facts`, `## Steps`,
  `## Checkpoints`, and `## Common Failure Modes`.
- Existing required-tool, synthetic-data, regulatory disclaimer, dataset, and
  Markdown-link checks remain active.
