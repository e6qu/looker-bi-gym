# 019 - Source Fact Register And Instruction Plan

Status: complete on 2026-05-09.

## Goal

Create the fact-backed instruction contract needed to replace generic tutorials
and generic quiz prompts with step-by-step, source-backed learning material.

## Deliverables

- Add a separate source-fact register under `docs/facts/`.
- Link the source-fact register from the docs index.
- Expand the tutorial plan so future lessons require concrete steps, checkpoints,
  and source fact IDs.
- Add downstream tasks for tutorial rewrites, fact-backed quiz rewrites, and
  automated content QA.

## Verification

- The fact register uses official or primary sources for regulation, platform,
  and browser behavior facts.
- The tutorial plan explicitly rejects generic outlines as release-ready
  instruction.
- The task index lists the next concrete implementation tasks.
- Internal Markdown links resolve.

## Tests

- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:manifests`
- `bun run typecheck`

## Notes

- This task does not rewrite all released tutorial and challenge manifests. It
  creates the source-of-truth fact bank and the task structure needed to do that
  rewrite cleanly.
