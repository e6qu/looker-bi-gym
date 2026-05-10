# 033 - Flashcard Study Usability

Status: in progress on branch `agent-pr-discipline`.

## Goal

Make the expanded flashcard corpus practical to study in the browser after the
Task 032 expansion to ten decks, and incorporate a small follow-up coverage
increase guided by reviewed external flashcard sources without copying
third-party deck text.

## Scope

- Add flashcard search within the selected deck.
- Add due-only versus all-card review mode.
- Show deck, card, and due-card totals.
- Add a flashcard-only reset control that clears review state without touching
  challenge progress.
- Keep flashcard state browser-local and separate from challenge progress.
- Carry the user-requested Git/PR discipline update in `AGENTS.md` in the same
  implementation PR, not as a docs-only PR.
- Check for Looker Studio, BigQuery, and BI Anki/shared-flashcard sources;
  record source metadata in the deck model and use suitable sources only as
  coverage guidance.
- Add fact-backed Looker Studio, BigQuery, and metric-contract cards from
  official repo facts where the source review found coverage gaps.

## Verification

- Existing flashcard scheduler/content tests still pass.
- Rendered UI tests cover search, all-card mode, review, export/import, and
  reset.
- Rendered UI tests expose external flashcard source metadata.
- Full repository gate passes before merge.

## Tests

- `bun run test:flashcards`
- `bun run test:e2e`
- `bun run check`

## Notes

- Keep exactly one working PR open for this phase.
- Before merge, fetch `origin/main` and rebase this branch on top of it.
