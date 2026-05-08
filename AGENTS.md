# Agent Operating Instructions

## Project

This repo is building a browser-hosted banking BI tutorial platform.

Core direction:

- Static GitHub Pages app.
- No backend.
- React + TypeScript + Vite.
- `bun` for repository development.
- DuckDB-WASM for browser SQL challenges.
- Markdown/MDX content.
- YAML or JSON challenge manifests.
- Synthetic banking datasets only.
- Browser-first learner path.
- Optional cloud-applied track through Google Cloud Console, BigQuery UI, and Looker Studio UI.
- Avoid requiring Google Cloud CLI, BigQuery CLI, Python, or Docker in early tutorials.

Domain direction:

- Banking technical BI.
- EU/Romanian context.
- First dataset: small hand-authored CSV deposits/account ownership dataset.
- Initial data flavor: RON/EUR, Romanian branch geography, BNR/FGDB/GDPR context tags.
- Include intentional BI/CTF traps: fanout, semi-additive balances, date ambiguity, sensitive fields, missing mappings, and reconciliation breaks.

## Continuity Files

Before starting any task, review:

- `STATUS.md`
- `PLAN.md`
- `DO_NEXT.md`
- `WHAT_WE_DID.md`
- `BUGS.md`
- Relevant `tasks/*.md`

After finishing or pausing any task, update:

- `STATUS.md`: current state, active task, confidence, blockers.
- `WHAT_WE_DID.md`: actions taken, files changed, commands run, what worked, what failed.
- `DO_NEXT.md`: next concrete steps.
- `BUGS.md`: known bugs, regressions, broken assumptions, or follow-up fixes.
- Relevant `tasks/*.md`: mark progress or update verification notes if the task format supports it.
- `PLAN.md` or split plans only if the high-level direction changes.

Do not rely on chat history as the source of truth. Keep these files current so work can resume after context loss.

## Task Discipline

- Work from `tasks/README.md` in order unless the user explicitly reprioritizes.
- A task is not complete until its `Verification` and `Tests` sections are satisfied or the remaining gaps are documented.
- Before implementing a task, restate the task number and check the continuity files.
- After implementing a task, update the continuity files before giving the final response.
- After each completed task, commit the task changes to git.
- Keep `.gitignore` current so dependency directories, build outputs, generated catalogs, generated TypeScript artifacts, and local OS/editor noise are not committed.
- Do not commit bundled or generated artifacts that can be rebuilt locally from committed source files and repository scripts.
- Do not commit WASM or other binary runtime artifacts when they can be supplied by package dependencies or produced by the local build.
- After each task, reassess the plan and downstream tasks. If implementation uncovered a true blocker, wrong assumption, or better path, update `PLAN.md`, split plans, and affected `tasks/*.md` before continuing.

## Tooling Rules

- Use `bun` for package management and scripts.
- Do not introduce alternate package managers unless the user approves.
- Keep the main learner path browser-first.
- Any learner-required local tool must be explicit, common, cross-platform, justified, and listed in the challenge.
- Do not use real banking data.
- Do not add credentials, secrets, API keys, or user tracking.
- Do not require a backend.

## Documentation Rules

- Keep plans high-level.
- Put execution details in `tasks/`.
- Put regulatory summaries in `regulations/`.
- Put learning-source docs in `docs/`.
- Put tutorial sketches/contracts in `tutorials/`.
- Record failed attempts in `WHAT_WE_DID.md`.
- Record known defects in `BUGS.md`.

## Safety And Regulatory Note

This project is technical training material. It is not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production banking work with the appropriate institutional teams.
