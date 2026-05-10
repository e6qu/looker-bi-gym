# LLM Question And Dreaming Workbench

This project can use local LLM CLIs to draft, review, and refine challenge
questions, but those runs are support tooling only. They do not replace source
facts, deterministic fixtures, human review, or the repository test pyramid.

The current workbench focuses on the Romania lending month-end and real-estate
collateral dataset. It currently builds a local context bundle from `docs/facts/`,
`sources/`, the challenge manifest, fixture SQL, fixture expected answers, and
dataset metadata.

## Meaning Of Dreaming

In current LLM-agent literature, "dreaming" and related "sleep" patterns usually
mean an offline or background consolidation pass: the agent reviews memory,
failures, facts, generated examples, and synthetic scenarios to improve future
work. In this repository, the term is deliberately narrower:

- no model training or fine-tuning;
- no automatic scheduler;
- no file edits by the dreaming command;
- no production or learner-facing side effects;
- reviewable Markdown artifacts only.

The practical goal is to surface better source opportunities, weak facts,
generic questions, dataset realism gaps, fixture risks, and possible bugs. A
future explicitly enabled scheduler may run this kind of review every 3-6 hours,
but the repository currently exposes only manual `make` targets.

Reference concepts include recent research around LLM memory consolidation,
self-modification, and reflective memory management, such as OpenReview's
"Language Models Need Sleep: Learning to Self Modify and Consolidate Memories"
and work on active dreaming memory for autonomous agents. These references are
conceptual background; repository behavior is defined by the scripts and tests
here.

## Manual Targets

Use Bun through the root Makefile:

```sh
make questions-context
make questions-generate-codex
make questions-generate-claude
make questions-review-codex
make questions-review-claude
make dream
make dream-codex
make dream-claude
```

`make dream` writes a no-provider prompt/report artifact and invokes no LLM.
`make dream-codex` and `make dream-claude` invoke the corresponding CLI in a
review mode. Outputs are ignored under `var/llm-workbench/`.

## Review Contract

Generated or reviewed questions are not release material until all of these are
true:

- every law, platform, BI, and market-context claim cites existing `FACT-*`
  records;
- numeric answers are reproduced from fixture SQL, dataset metadata, or
  committed official-source tables;
- questions avoid valuation, legal, tax, underwriting, accounting, compliance,
  and market-advice claims;
- any accepted question is copied into the manifest by a human and covered by
  fixture expected answers;
- `bun run test:llm-workbench`, `bun run test:content-qa`,
  `bun run test:facts-db`, `bun run test:fixtures`, and `bun run check` pass.

## Artifact Boundary

The ignored workbench directory may contain prompts, candidate JSONL, review
JSONL, and dreaming Markdown. Do not commit those artifacts. Commit only source
facts, source cards, deterministic datasets, manifests, fixtures, docs, and
tests that have passed review.
