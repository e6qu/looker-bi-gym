# 001 - Repository Structure And Planning Baseline

## Status

Complete on 2026-05-05.

## Objective

Establish the repository baseline for the browser-hosted banking BI tutorial platform.

## Dependencies

- None.

## Deliverables

- Clean planning documents:
  - `PLAN.md`
  - `PLAN_BI_TUTORIAL_APP.md`
  - `PLAN_BI_TUTORIAL_TUTORIALS.md`
- Existing source-material directories retained:
  - `docs/`
  - `tutorials/`
  - `regulations/`
- Task directory created:
  - `_development/tasks/`
- Task index created:
  - `_development/tasks/README.md`
- Continuity files created:
  - `AGENTS.md`
  - `STATUS.md`
  - `WHAT_WE_DID.md`
  - `DO_NEXT.md`
  - `BUGS.md`

## Verification

- `PLAN.md` is an umbrella document, not a duplicate full plan.
- App-specific requirements live in `PLAN_BI_TUTORIAL_APP.md`.
- Tutorial/curriculum requirements live in `PLAN_BI_TUTORIAL_TUTORIALS.md`.
- `_development/tasks/README.md` links to every numbered task file.
- Every task file includes `Objective`, `Dependencies`, `Deliverables`, `Verification`, and `Tests`.
- `AGENTS.md` instructs future agents to review/update continuity files before and after every task.
- `BUGS.md` exists and can track known defects.

## Tests

- Run `rg -n "PLAN_BI_TUTORIAL_APP|PLAN_BI_TUTORIAL_TUTORIALS|_development/tasks/README" PLAN.md`.
- Run `rg --files tasks | sort`.
- Run `rg -L "^## Tests" _development/tasks/*.md` and confirm no task file is missing a tests section.
- Run `rg -L "^## Verification" _development/tasks/*.md` and confirm no task file is missing a verification section.
- Run `rg -n "Before starting any task|After finishing or pausing any task|BUGS.md" AGENTS.md _development/tasks/README.md`.

## Verification Notes

- `PLAN.md` is an umbrella document and links the app plan, tutorial plan, and task index.
- `_development/tasks/README.md` links every numbered task file from 001 through 018.
- Each numbered task file includes `Verification` and `Tests` sections.
- `AGENTS.md` and `_development/tasks/README.md` require continuity-file review and updates before/after tasks.
- No blockers or defects were found while closing this baseline task.
