PNPM ?= pnpm

.PHONY: help install lint typecheck validate validate-manifests validate-datasets validate-static-links test test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-validators build check dev preview

help:
	@printf '%s\n' \
		'Targets:' \
		'  install             Install workspace dependencies with pnpm' \
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
		'  test-validators     Run browser validator tests' \
		'  build               Build the static app' \
		'  check               Run lint, typecheck, validation, tests, and build' \
		'  dev                 Start Vite dev server' \
		'  preview             Preview production build'

install:
	$(PNPM) install

lint: validate-manifests
	$(PNPM) lint

typecheck: validate-manifests
	$(PNPM) typecheck

validate: validate-manifests validate-datasets

validate-manifests:
	$(PNPM) validate:manifests

validate-datasets:
	$(PNPM) validate:datasets

validate-static-links:
	$(PNPM) validate:static-links

test: test-quiz test-sql test-fixtures test-cloud-evidence test-progress-export test-content-qa test-validators

test-quiz:
	$(PNPM) test:quiz

test-sql:
	$(PNPM) test:sql

test-fixtures:
	$(PNPM) test:fixtures

test-cloud-evidence:
	$(PNPM) test:cloud-evidence

test-progress-export:
	$(PNPM) test:progress-export

test-content-qa:
	$(PNPM) test:content-qa

test-validators:
	$(PNPM) test:validators

build:
	$(PNPM) build

check: validate lint typecheck test build validate-static-links

dev:
	$(PNPM) dev

preview:
	$(PNPM) preview
