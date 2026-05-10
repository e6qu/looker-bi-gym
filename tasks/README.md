# Task Index

These tasks convert the plans into executable work. Each task has required deliverables, verification, and tests.

Task order:

- [001 - Repository Structure And Planning Baseline](001-repository-structure-and-planning-baseline.md)
- [002 - Static App Skeleton](002-static-app-skeleton.md)
- [003 - Content Navigation And Markdown Rendering](003-content-navigation-and-markdown-rendering.md)
- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)
- [005 - Synthetic Dataset Seed](005-synthetic-dataset-seed.md)
- [006 - Quiz Challenge Runtime](006-quiz-challenge-runtime.md)
- [007 - Browser SQL Runtime](007-browser-sql-runtime.md)
- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)
- [009 - First Browser Challenges](009-first-browser-challenges.md)
- [010 - Cloud Evidence Challenge Pattern](010-cloud-evidence-challenge-pattern.md)
- [011 - Authoring Guide And Tutorial Conversion Rules](011-authoring-guide-and-tutorial-conversion-rules.md)
- [012 - CI And GitHub Pages Deployment](012-ci-and-github-pages-deployment.md)
- [013 - App Quality And Accessibility Pass](013-app-quality-and-accessibility-pass.md)
- [014 - Dataset Expansion And Versioning](014-dataset-expansion-and-versioning.md)
- [015 - Solution Fixtures And Golden Tests](015-solution-fixtures-and-golden-tests.md)
- [016 - Progress Export And Completion Evidence](016-progress-export-and-completion-evidence.md)
- [017 - Content QA And Regulatory Disclaimer Pass](017-content-qa-and-regulatory-disclaimer-pass.md)
- [018 - Release Versioning And Change Log](018-release-versioning-and-change-log.md)
- [019 - Source Fact Register And Instruction Plan](019-source-fact-register-and-instruction-plan.md)
- [020 - Step-By-Step Tutorial Rewrite](020-step-by-step-tutorial-rewrite.md)
- [021 - Fact-Backed Question Rewrite](021-fact-backed-question-rewrite.md)
- [022 - Fact-Backed Content QA Automation](022-fact-backed-content-qa-automation.md)
- [023 - Literature And Fact Corpus Expansion](023-literature-and-fact-corpus-expansion.md)
- [024 - Deterministic Local Dataset Packs](024-deterministic-local-dataset-packs.md)
- [025 - Real Tutorial Instruction Packs](025-real-tutorial-instruction-packs.md)
- [026 - Challenge Grading Contract Expansion](026-challenge-grading-contract-expansion.md)
- [027 - Source-Backed BI Fact Database](027-source-backed-bi-fact-database.md)
- [028 - Platform Component Organization](028-platform-component-organization.md)
- [029 - Flashcards And Spaced Repetition](029-flashcards-and-spaced-repetition.md)

Completion rule:

- A task is not done until its verification and tests pass.
- If a test cannot be automated yet, the task must document the manual verification procedure.
- Do not use real banking data in any task.
- Do not require unspecified learner tools.
- Any local tool required by a tutorial must be explicit, common, cross-platform, and justified.
- Before every task, review `AGENTS.md`, `STATUS.md`, `PLAN.md`, `DO_NEXT.md`, `WHAT_WE_DID.md`, `BUGS.md`, and the relevant task file.
- After every task, update `STATUS.md`, `WHAT_WE_DID.md`, `DO_NEXT.md`, and `BUGS.md`.
- After every task, reassess whether `PLAN.md`, split plans, and downstream tasks need readjustment because implementation uncovered a real blocker or wrong assumption.
