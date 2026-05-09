# Bugs

No known app bugs after the Bun-only tooling, typed config, formatting, rendered UI, and automated check passes.

## Known Content Defects

- ID: CONTENT-2026-05-09-001.
- Date found: 2026-05-09.
- Area: tutorials and quiz content.
- Severity: medium.
- Description: The released tutorial materials and some quiz prompts are too generic; they do not yet provide enough step-by-step instruction or fact-backed questions tied to source legislation/product documentation.
- Expected behavior: Tutorials guide the learner through exact actions, expected checkpoints, failure modes, and source fact IDs; quiz questions test concrete facts from source legislation, technology docs, instruction docs, or synthetic dataset outputs.
- Actual behavior: The current materials include useful scaffolding, but several tutorial pages are outlines and the orientation quiz mostly checks project rules.
- Reproduction steps: Read `tutorials/00-orientation-and-stack.md` and `challenges/manifests/orientation-quiz.yaml`.
- Suspected cause: Early tasks prioritized runtime, verification, and platform boundaries before full instructional depth.
- Fix plan: Complete Tasks 020, 021, and 022.
- Status: fixed by Tasks 020, 021, and 022; local `bun run check` passes and PR CI still needs to run.

## Follow-Up Verification Gaps

- Track Vite/DuckDB-WASM source-map noise during browser verification. It did not fail Task 008, but the dev server logged many DuckDB worker source-map warnings from package internals.
- Complete Safari second-browser verification for Task 013. `safaridriver` is installed with Safari 26.1, but Safari's persistent "Allow remote automation" setting is disabled. Enabling it requires explicit user authorization because it changes a persistent browser security setting. The manual checklist lives in `docs/10-app-quality-browser-qa.md`.

## Template

When adding a bug, include:

- ID.
- Date found.
- Area.
- Severity.
- Description.
- Expected behavior.
- Actual behavior.
- Reproduction steps.
- Suspected cause.
- Fix plan.
- Status.
