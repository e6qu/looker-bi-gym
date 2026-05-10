# 024 - Deterministic Local Dataset Packs

Status: implemented; PR pending.

## Goal

Expand challenge datasets into fully local, reproducible, deterministic synthetic
packs that can support richer automatically graded tutorials.

## Deliverables

- Define a dataset-pack contract for committed CSV/JSON files and deterministic
  generated outputs.
- Add at least one new synthetic dataset pack beyond `deposits-seed`.
- Include metadata for schemas, grains, primary keys, sensitive fields, row
  counts, control totals, date semantics, known traps, regulatory context tags,
  and fixture refresh rules.
- Add deterministic generation scripts only if source CSV/JSON can be reproduced
  exactly from committed inputs.
- Extend dataset validation for new pack types and known traps.
- Add solution fixtures tied to the new dataset pack.

## Verification

- No dataset requires live network access at build, test, grading, or learner
  runtime.
- Every dataset file is synthetic and declares that it is not derived from real
  bank data.
- Dataset validation fails on row-count, control-total, schema, or known-trap
  drift.
- Challenge fixtures pin dataset ID and version.

Verification notes:

- Added `lending-month-end/v0.1.0` as committed CSV/JSON only; no build, test,
  grading, or learner runtime step downloads live data.
- Added metadata with schema/grain, row counts, primary keys, sensitive fields,
  date semantics, relationships, control-total checks, known-trap checks,
  regulatory context, synthetic-only declaration, and fixture refresh rules.
- Added the released `lending-month-end-snapshots` browser SQL challenge and a
  pinned known-good solution fixture.
- Extended dataset validation to cover generic control-total checks and known
  trap checks beyond the original deposits-only assumptions.
- Extended the browser SQL runtime to load challenge-declared dataset packs from
  committed metadata.
- `bun run check` passed locally after the user approved Playwright/Vite local
  port binding.

## Tests

- `bun run validate:datasets`
- `bun run test:fixtures`
- `bun run test:sql`
- `bun run test:content-qa`
- `bun run check`
