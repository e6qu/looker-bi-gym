BUN ?= bun

.PHONY: help install lint typecheck validate validate-manifests validate-datasets validate-static-links test test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-e2e test-validators build check dev preview

help:
	@printf '%s\n' \
		'Targets:' \
		'  install             Install workspace dependencies with Bun' \
		'  lint                Run ESLint' \
		'  typecheck           Run TypeScript checks' \
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
		'  test-e2e            Run Playwright rendered UI tests' \
		'  test-validators     Run browser validator tests' \
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

validate: validate-manifests validate-datasets

validate-manifests:
	$(BUN) run validate:manifests

validate-datasets:
	$(BUN) run validate:datasets

validate-static-links:
	$(BUN) run validate:static-links

test: test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-validators test-e2e

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

test-e2e:
	$(BUN) run test:e2e

test-validators:
	$(BUN) run test:validators

build:
	$(BUN) run build

check: validate lint typecheck test build validate-static-links

dev:
	$(BUN) run dev

preview:
	$(BUN) run preview
