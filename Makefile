BUN ?= bun

.PHONY: help install lint typecheck format format-check validate validate-manifests validate-datasets validate-static-links test test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-facts-db test-llm-workbench test-platform-boundary test-e2e test-validators questions-context questions-generate-codex questions-generate-claude questions-review-codex questions-review-claude dream dream-codex dream-claude build check dev preview

help:
	@printf '%s\n' \
		'Targets:' \
		'  install             Install workspace dependencies with Bun' \
		'  lint                Run ESLint' \
		'  typecheck           Run TypeScript checks' \
		'  format              Format repository files with Prettier' \
		'  format-check        Check Prettier formatting' \
		'  validate            Validate manifests and datasets' \
		'  validate-manifests  Validate challenge manifests and regenerate catalog' \
		'  validate-datasets   Validate synthetic datasets' \
		'  validate-static-links Validate built app asset links' \
		'  test                Run all automated tests' \
		'  test-quiz           Run quiz evaluator tests' \
		'  test-sql            Run SQL runtime smoke tests' \
		'  test-fixtures       Run solution fixture golden tests' \
		'  test-cloud-evidence Run cloud evidence parser and validator tests' \
		'  test-progress-export Run progress export structure tests' \
		'  test-content-qa     Run content QA checks' \
		'  test-facts-db       Build and validate the SQLite facts database' \
		'  test-llm-workbench  Validate optional LLM question/dreaming workbench prompts' \
		'  test-platform-boundary Run frontend-only architecture checks' \
		'  test-e2e            Run Playwright rendered UI tests' \
		'  test-validators     Run browser validator tests' \
		'  questions-context   Export fact/dataset/fixture context for question generation' \
		'  questions-generate-codex Generate draft questions with Codex CLI' \
		'  questions-generate-claude Generate draft questions with Claude CLI' \
		'  questions-review-codex Review latest draft questions with Codex CLI' \
		'  questions-review-claude Review latest draft questions with Claude CLI' \
		'  dream               Write a manual no-provider dreaming prompt/report artifact' \
		'  dream-codex         Run manual Codex CLI dreaming review' \
		'  dream-claude        Run manual Claude CLI dreaming review' \
		'  build               Build the static app' \
		'  check               Run lint, typecheck, validation, tests, and build' \
		'  dev                 Start Vite dev server' \
		'  preview             Preview production build'

install:
	$(BUN) install

lint: validate-manifests
	$(BUN) run lint

typecheck: validate-manifests
	$(BUN) run typecheck

format:
	$(BUN) run format

format-check:
	$(BUN) run format:check

validate: validate-manifests validate-datasets

validate-manifests:
	$(BUN) run validate:manifests

validate-datasets:
	$(BUN) run validate:datasets

validate-static-links:
	$(BUN) run validate:static-links

test: test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-facts-db test-llm-workbench test-platform-boundary test-validators test-e2e

test-quiz:
	$(BUN) run test:quiz

test-sql:
	$(BUN) run test:sql

test-fixtures:
	$(BUN) run test:fixtures

test-cloud-evidence:
	$(BUN) run test:cloud-evidence

test-progress-export:
	$(BUN) run test:progress-export

test-content-qa:
	$(BUN) run test:content-qa

test-facts-db:
	$(BUN) run test:facts-db

test-llm-workbench:
	$(BUN) run test:llm-workbench

test-platform-boundary:
	$(BUN) run test:platform-boundary

test-e2e:
	$(BUN) run test:e2e

test-validators:
	$(BUN) run test:validators

questions-context:
	$(BUN) run --filter @looker-bi-gym/app questions:context

questions-generate-codex:
	$(BUN) run --filter @looker-bi-gym/app questions:generate:codex

questions-generate-claude:
	$(BUN) run --filter @looker-bi-gym/app questions:generate:claude

questions-review-codex:
	$(BUN) run --filter @looker-bi-gym/app questions:review:codex

questions-review-claude:
	$(BUN) run --filter @looker-bi-gym/app questions:review:claude

dream:
	$(BUN) run --filter @looker-bi-gym/app dream:prompt

dream-codex:
	$(BUN) run --filter @looker-bi-gym/app dream:codex

dream-claude:
	$(BUN) run --filter @looker-bi-gym/app dream:claude

build:
	$(BUN) run build

check: validate lint typecheck test build validate-static-links

dev:
	$(BUN) run dev

preview:
	$(BUN) run preview
