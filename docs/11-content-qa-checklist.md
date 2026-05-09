# Content QA Checklist

Use this checklist before releasing learner-facing content.

## Scope

- Challenge manifests in `challenges/manifests/`.
- Draft challenge manifests in `challenges/drafts/`.
- Docs, regulation briefs, tutorials, dataset READMEs, task files, and app README.
- Browser challenge detail pages that render manifest scenario, inputs, outputs, checks, tools, and regulatory context.

## Required Checks

- Every challenge declares `required_tools`; browser-only tasks use `none`.
- Optional cloud-applied tasks name the browser UI tools and explicitly avoid CLI, service account keys, and app-stored credentials.
- Every challenge with `regulatory_context` has a mapped link to the relevant regulation brief in the app.
- Every regulation brief states that it is technical orientation only, not legal, regulatory, accounting, privacy, compliance, or model-risk advice.
- Every tutorial states that its sources and artifacts are synthetic training data only.
- Every fact-backed tutorial step and quiz question cites a fact ID from [facts/README.md](facts/README.md) when it teaches regulation, product behavior, browser storage, or BI tooling constraints.
- Quiz prompts test concrete facts from cited sources, not vague project preferences or opinion prompts.
- Every dataset README and metadata file states the synthetic-only boundary.
- Learner-facing evidence prompts do not ask for credentials, tokens, API keys, secrets, private URLs, real banking data, or backend validation.
- Internal Markdown links resolve locally; broken links are fixed or recorded in `BUGS.md`.

## Current Manual Review Notes

- Browser-only review: `010 - First Banking Dataset Inspection` states browser-only tools, synthetic dataset input, sensitive fields, grain, and linked BNR/FGDB/GDPR context.
- Cloud-evidence review: `030 - Looker Studio Evidence Pattern` states optional browser UI tools, no CLI, no app-stored credentials, local evidence checks, and linked BNR/GDPR context.
- Regulation review: each regulation brief includes an explicit training-boundary disclaimer.
- Dataset review: `deposits-seed` versions declare `synthetic_only: true` in metadata and state that they are not derived from real bank data.

## Automated Gate

Run:

```sh
bun run test:content-qa
```

Rendered UI and responsive layout checks run separately:

```sh
bun run test:e2e
```

The same check is included in `make check` and CI.
