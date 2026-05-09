# 022 - Fact-Backed Content QA Automation

Status: planned.

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
