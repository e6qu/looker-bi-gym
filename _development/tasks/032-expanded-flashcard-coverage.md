# 032 - Expanded Flashcard Coverage

Status: in progress on branch `expand-flashcard-coverage`.

## Goal

Expand the first flashcard slice into a broader fact-backed review corpus that
covers the main learner topics already present in the app: BI fundamentals,
BigQuery SQL and serving views, Looker Studio mechanics, metric contracts,
performance and operations, privacy/security, banking context, deterministic
dataset traps, and real-estate collateral context.

## Scope

- Keep flashcards browser-local and frontend-only.
- Keep all factual cards backed by known `docs/facts/` IDs.
- Keep recommended paths as in-app routes.
- Raise automated coverage so the corpus cannot regress to a tiny starter set.
- Keep cards hand-authored and concise; generated cards remain future draft
  material until manually reviewed.

## Verification

- `bun run test:flashcards` requires at least ten topic decks, at least 40
  total cards, at least four cards per deck, unique card IDs, known source fact
  IDs, and app-route recommended paths.
- Playwright continues to cover the flashcard review/export/import user flow.
- Full `bun run check` must pass before opening the PR.

## Tests

- `bun run test:flashcards`
- `bun run test:e2e`
- `bun run check`

## Follow-Ups

- Consider moving deck content into YAML or JSON manifests once the expanded
  source-authored corpus stabilizes.
- Add topic filtering/search if deck count or card count grows enough to make
  browsing inefficient.
