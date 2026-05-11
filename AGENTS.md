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
- Relevant `_development/tasks/*.md`

After finishing or pausing any task, update:

- `STATUS.md`: current state, active task, confidence, blockers.
- `WHAT_WE_DID.md`: actions taken, files changed, commands run, what worked, what failed.
- `DO_NEXT.md`: next concrete steps.
- `BUGS.md`: known bugs, regressions, broken assumptions, or follow-up fixes.
- Relevant `_development/tasks/*.md`: mark progress or update verification notes if the task format supports it.
- `PLAN.md` or split plans only if the high-level direction changes.

Do not rely on chat history as the source of truth. Keep these files current so work can resume after context loss. Remove stale or irrelevant continuity detail when it blocks clarity.

## Task Discipline

- Work from `_development/tasks/README.md` in order unless the user explicitly reprioritizes.
- A task is not complete until its `Verification` and `Tests` sections are satisfied or the remaining gaps are documented.
- Never mark work complete unless the task file, tests, review notes, and continuity docs agree.
- Before implementing a task, restate the task number and check the continuity files.
- After implementing a task, update the continuity files before giving the final response.
- After each completed task, commit the task changes to git.
- Keep `.gitignore` current so dependency directories, build outputs, generated catalogs, generated TypeScript artifacts, and local OS/editor noise are not committed.
- Do not commit bundled or generated artifacts that can be rebuilt locally from committed source files and repository scripts.
- Do not commit WASM or other binary runtime artifacts when they can be supplied by package dependencies or produced by the local build.
- After each task, reassess the plan and downstream tasks. If implementation uncovered a true blocker, wrong assumption, or better path, update `PLAN.md`, split plans, and affected `_development/tasks/*.md` before continuing.
- Before marking any phase complete, run formal Claude CLI review:
  `claude --print --permission-mode plan --output-format text "<phase-specific review prompt>"`.
  If Claude CLI hangs, is unavailable, or cannot authenticate, record the phase as blocked or implemented but not Claude-reviewed.

## Git And PR Discipline

- Never push directly to `main`.
- Keep exactly one working PR open at a time unless the user explicitly asks for
  multiple concurrent PRs.
- Before creating a new PR, check for existing open PRs and either continue the
  existing PR or ask the user how to proceed.
- Before merging a PR, fetch `origin/main` and rebase the PR branch on top of
  `origin/main`.
- Merge only after CI is passing on the rebased PR branch.
- After merging, verify main-branch CI, GitHub Pages deployment, and the live
  GitHub Pages URL before starting another implementation PR.

## Tooling Rules

- Use `bun` for package management and scripts.
- Do not introduce alternate package managers unless the user approves.
- Keep the main learner path browser-first.
- Any learner-required local tool must be explicit, common, cross-platform, justified, and listed in the challenge.
- Do not use real banking data.
- Do not add credentials, secrets, API keys, or user tracking.
- Do not require a backend.

## Type Safety Rules

- Do not use `any`, `as any`, `object` as a type, `as object`, `@ts-ignore`,
  or `@ts-expect-error`.
- Prefer domain-specific readonly types for app data, content data, challenge
  manifests, quiz banks, exam cards, source facts, and generated catalogs.
- At parser or external-data boundaries, parse into `unknown`, validate into
  domain types, and keep unavoidable casts as narrow and local as possible.
- Keep `bun run lint`, `bun run typecheck`, and the repository type-safety scans
  clean before committing.

## Documentation Rules

- Keep plans high-level.
- Put execution details in `_development/tasks/`.
- Put regulatory summaries in `regulations/`.
- Put learning-source docs in `docs/`.
- Put tutorial sketches/contracts in `tutorials/`.
- Record failed attempts in `WHAT_WE_DID.md`.
- Record known defects in `BUGS.md`.

## Learner-Facing Content Boundary

- Course prose, tutorial steps, quiz questions, challenge questions,
  flashcards, and exam cards must teach the material itself, not the
  repository implementation.
- Visible learner-facing text must not refer to repo structure, source files,
  implementation tasks, generated catalogs, raw `FACT-*` IDs, raw `LT-*` IDs,
  `localStorage`, build scripts, or app internals.
- Keep learner-facing wording anchored to BI theory and practice, Looker
  Studio, BigQuery, synthetic banking datasets, and thin regulatory context.
- Do not ask self-referential questions about the course, the platform, the
  training workflow, or what learners should do about learners. Ask practical
  BI questions about grain, metrics, SQL, dashboard behavior, data quality,
  privacy boundaries, BigQuery, Looker Studio, and the limited regulatory
  context needed for the BI scenario.
- Keep tutorials and verification separate. Tutorial steps must be
  self-contained instructional work; quizzes, challenges, and exams verify the
  competencies with distinct scenario prompts and must not be the tutorial's
  worksheet or deliverable.
- Source fact IDs, learner-task IDs, file paths, and generated catalog details
  belong in metadata, QA scripts, implementation docs, or authoring notes, not
  in the question/prompt/explanation text shown as course material.

## Current Implementation Direction

Start from these cross-linked sources before changing tutorial, quiz, dataset,
or challenge behavior:

- `PLAN.md`: high-level direction and current tutorial/quiz/exam model.
- `STATUS.md`: current PR, decisions, verification state, and blockers.
- `DO_NEXT.md`: next actionable implementation steps.
- `WHAT_WE_DID.md`: commands run, fixes tried, what worked, and what failed.
- `BUGS.md`: known defects and follow-up verification gaps.
- `docs/14-platform-components.md`: current website, content, runtime, data,
  state, export/import, and verification component map.
- `_development/tasks/README.md`: implementation task index.
- `_development/tasks/024-deterministic-local-dataset-packs.md`: merged PR #6 dataset work.
- `_development/tasks/025-real-tutorial-instruction-packs.md`: learner-facing tutorial work.
- `_development/tasks/028-platform-component-organization.md`: component organization implementation task.
- `docs/13-llm-question-and-dreaming-workbench.md`: manual LLM generation,
  review, refinement, and dreaming boundaries.

Terminology matters:

- `implementation tasks` are numbered repository work items under `_development/tasks/*.md`;
- `learner tasks` are curriculum exercise units shown to learners in tutorials
  or app flows.

For PR #6 continuation, implementation Task 025 should add several complete
15-20 minute learner tasks across multiple areas, not placeholder examples. Each
learner task needs an objective, steps, checkpoints, visualization/reporting
action, self-assessment, and an end challenge. Keep the first pass
mechanics-first for a data analyst moving into BI and banking: BI fundamentals,
BigQuery/SQL for BI, Looker Studio mechanics, data quality controls, and banking
context only where it makes the mechanics real.

Use a separate quiz-bank format for mixed 20-minute quizzes organized by
difficulty. Keep Looker Studio recipes after the tutorials as optional
browser-driven follow-ons. Do not add cloud CLI requirements or learner-facing
shell scripts unless a later task justifies them and verifies them with
ShellCheck on macOS/Linux for `bash` and `zsh`.

## Safety And Regulatory Note

This project is technical training material. It is not legal, regulatory, accounting, privacy, compliance, or model-risk advice. Validate production banking work with the appropriate institutional teams.
