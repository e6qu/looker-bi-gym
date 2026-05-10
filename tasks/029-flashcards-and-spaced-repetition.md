# 029 - Flashcards And Spaced Repetition

Status: planned future phase. Do not implement as part of PR #11.

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

## Out Of Scope For First Implementation

- Sync across devices.
- Server accounts or cloud storage.
- Auto-generated decks without human review.
- Binary Anki package export.
- Replacing quizzes or exams with flashcards.

## Verification

- Deck schema validates.
- Every factual card cites known source facts or deterministic dataset outputs.
- Scheduler transitions are deterministic and unit-tested.
- Export/import round-trips review state without credentials, raw challenge
  answers, or real banking data.
- Reset behavior is scoped and clear.
- Rendered UI tests cover deck browsing, review flow, due-card behavior,
  export/import, and responsive layout.

## Tests

- `bun run validate:manifests` if flashcards share manifest validation, or a new
  `bun run validate:flashcards` if they use a separate schema.
- Scheduler unit tests.
- Flashcard content QA.
- Flashcard export/import tests.
- `bun run test:e2e`.
- `bun run check`.

## Open Questions

Recommendations unless later product review changes them:

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

- Which exact review buttons should the UI expose first: Anki-like
  `Again/Hard/Good/Easy`, or a simpler `Forgot/Remembered` mode for beginners?
- Should flashcard cards be generated from facts/tutorials first and then
  manually reviewed, or should every first-release card be hand-authored?
- Should the learner be allowed to edit card text locally, or should only review
  state be editable/exportable in the first release?
