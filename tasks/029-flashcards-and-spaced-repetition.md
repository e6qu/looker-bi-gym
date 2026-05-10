# 029 - Flashcards And Spaced Repetition

Status: implemented first browser slice on branch `flashcards-spaced-repetition`.

## Goal

Add flashcards as a first-class browser learning mode after the current
tutorial, quiz, exam, and challenge foundations are stable.

The learner should be able to study topic-separated decks, review due cards with
an Anki-style spaced repetition scheduler, and export/import flashcard review
state as a single JSON file without any backend.

## Scope

Deck content:

- Topic-separated decks for BI fundamentals, grain/fanout, semi-additive
  snapshots, BigQuery SQL/view behavior, Looker Studio data-source mechanics,
  metric contracts, data quality controls, privacy/governance, and
  banking-context facts.
- Each factual card cites source fact IDs from `docs/facts/` or deterministic
  dataset outputs.
- Cards link back to recommended tutorials, learner tasks, quizzes, or exam
  cards where useful.

Runtime:

- Flashcards section in the GitHub Pages UI.
- Deck list, card browse, study, review, due-card, and reset views.
- Typed Anki-style scheduler data model. A first implementation may be
  SM-2-inspired with ease factor, interval, repetitions, lapses, due date, and
  review history.
- Review state records explicit datetime timestamps for each review event, due
  date calculation, and scheduler state update. Do not store only derived
  intervals; learner export/import and debugging need inspectable timestamped
  review history.
- Browser-local review state only. No backend, accounts, analytics, or
  learner-data upload.

State:

- Separate versioned flashcard state format.
- Export flashcard review state as one JSON file.
- Import validates schema/version locally, previews changes, and applies only
  after learner confirmation.
- Keep committed deck content separate from learner review state.

## Implemented First Slice

- Added a first-class `#/flashcards` route to the static GitHub Pages app.
- Added six topic-separated decks for BI fundamentals, BigQuery/SQL, Looker
  Studio, controls/governance, banking context, and dataset controls.
- Added 12 hand-authored cards with stable IDs, source fact links, and
  recommended in-app learning paths.
- Added a typed SM-2-inspired scheduler with `again`, `hard`, `good`, and
  `easy` ratings, ease factor, interval days, repetitions, lapses, due
  timestamps, and timestamped review history.
- Added browser-local flashcard state under
  `looker-bi-gym.flashcards.v1`, separate from challenge progress state.
- Added single-JSON flashcard state export preview plus validate/preview/apply
  import controls.
- Added deterministic unit/content checks for scheduler transitions, JSON
  import rejection, deck count, unique card IDs, source fact resolution, and
  in-app route links.
- Added Playwright rendered UI coverage for showing an answer, recording a
  review, and verifying timestamped review state appears in export JSON.
- Added `bun run test:flashcards`, root script alias, `make test-flashcards`,
  `make test` coverage, explicit CI coverage, and platform-boundary enforcement.

## Remaining Expansion

The first slice is intentionally compact. Future slices should expand the decks
to cover every released tutorial, quiz area, exam area, and challenge trap,
preferably from a validated YAML/JSON deck manifest once the first route and
scheduler contract settle.

## Out Of Scope For First Implementation

- Sync across devices.
- Server accounts or cloud storage.
- Auto-generated decks without human review.
- Binary Anki package export.
- Replacing quizzes or exams with flashcards.

## Verification

- Every factual card cites known source facts or deterministic dataset outputs.
- Scheduler transitions are deterministic and unit-tested.
- Export/import round-trips review state without credentials, raw challenge
  answers, or real banking data.
- Rendered UI tests cover deck browsing, review flow, timestamped state, and
  responsive layout.
- Reset behavior remains a follow-up; current import/export is explicit and
  separate from challenge progress reset.

## Tests

- `bun run test:flashcards`.
- `bun run test:e2e`.
- `bun run check`.

## Open Questions

Follow-up recommendations unless later product review changes them:

- Author deck content in YAML for schema validation, stable IDs, source fact
  IDs, topic grouping, and deterministic generation into app-readable JSON.
- Use a typed SM-2-inspired scheduler rather than claiming exact Anki parity.
  Store explicit review event timestamps, rating, previous state, next state,
  due timestamp, interval, ease factor, repetitions, and lapses.
- Start with a separate flashcard-state JSON export/import so it does not
  complicate the existing challenge progress export. Add a combined learner
  state export only after both formats stabilize.
- Import should default to merge by stable card ID and deck version, show a
  preview, and let the learner choose replace-per-deck only when conflicts are
  detected.

Ambiguities to resolve before implementation:

- The first UI exposes Anki-like `Again/Hard/Good/Easy`; future UX review can
  add beginner-friendly labels/tooltips without changing the stored rating
  model.
- First-release cards are hand-authored. Generated cards should stay draft-only
  until manually reviewed and fact-checked.
- Should the learner be allowed to edit card text locally, or should only review
  state be editable/exportable in the first release?
