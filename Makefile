PNPM ?= pnpm

.PHONY: help install lint typecheck validate validate-manifests validate-datasets test test-quiz test-sql test-validators build check dev preview

help:
	@printf '%s\n' \
		'Targets:' \
		'  install             Install workspace dependencies with pnpm' \
		'  lint                Run ESLint' \
		'  typecheck           Run TypeScript checks' \
		'  validate            Validate manifests and datasets' \
		'  validate-manifests  Validate challenge manifests and regenerate catalog' \
		'  validate-datasets   Validate synthetic datasets' \
		'  test                Run all automated tests' \
		'  test-quiz           Run quiz evaluator tests' \
		'  test-sql            Run SQL runtime smoke tests' \
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

test: test-quiz test-sql test-validators

test-quiz:
	$(PNPM) test:quiz

test-sql:
	$(PNPM) test:sql

test-validators:
	$(PNPM) test:validators

build:
	$(PNPM) build

check: validate lint typecheck test build

dev:
	$(PNPM) dev

preview:
	$(PNPM) preview
