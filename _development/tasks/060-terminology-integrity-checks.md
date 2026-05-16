# 060 - Terminology Grounding Follow-Through

Status: in progress on branch `terminology-integrity-checks` in PR #45. This
task carries the full Phase 10 work from `PLAN.md` (10.1 through 10.6) in a
single PR by user direction; the per-sub-phase split that the plan describes
was deferred to keep iteration tight.

## Goal

Close the gaps the first-pass terminology PR (#44) left open: build-time
integrity for the 300 in-terminology cross-links, external sourcing on the
vendor and regulatory entries, `FACT-*` linkage, term-level search,
representative inline grounding of curriculum prose to terminology anchors,
and a reverse coverage matrix.

## Scope

### Phase 10.1 - Integrity checks

- Add `app/scripts/validate-terminology.ts` that fails when:
  - a heading slug repeats inside a terminology file;
  - a `class="termRef"` href does not point inside `#/terminology/<file>`;
  - the referenced terminology file does not exist;
  - the `#anchor` is missing or does not match any heading slug on the
    target file;
  - the `<sup>HINT</sup>` is missing or does not match the target file's
    domain (`BI`, `SQL`, `BQ`, `LS`, `BNK`, `REG`, `DB`).
- Wire `validate:terminology` into `bun run check` and expose it as a root
  workspace script.
- Remove the per-entry leading `<span class="termBadge">` block under every
  `## term` heading; the badge stays available for inline reference use.
- Rewrite `terminology/README.md` so the marker key documents the
  HTML-anchor form only and refers authors to the new validator.

### Phase 10.2 - Sourcing and FACT linkage

- Extend the validator to parse `Sources:` blocks under each entry, require
  at least one `https?://` citation on every entry in `bigquery.md`,
  `looker-studio.md`, `duckdb.md`, and `regulations.md`, and confirm any
  referenced `FACT-*` ID resolves to a fact in `facts/`.
- Backfill 75 vendor/regulatory entries with `Sources:` blocks pointing to
  official vendor documentation, regulator pages, or EUR-Lex CELEX
  references, linking 30 entries to existing `FACT-*` claims.

### Phase 10.3 - Term-level search depth

- Surface matching `## term` headings (not only pages) in the terminology
  sidebar search.
- Fix routing so `#/terminology/<file>#<anchor>` resolves to the page and
  scrolls to the heading; add a `fragmentFromHash` helper and a
  `MarkdownArticle` effect that scrolls on mount and on `hashchange`.
- Add CSS for the term-anchor result list and rendered UI coverage for both
  the term result list and deep-linked anchors.

### Phase 10.4 - Inline grounding rollout

- Extend `validate-terminology` to also scan `tutorials/`, `quizzes/`,
  `flashcards/`, `exams/`, `facts/`, `regulations/`, and `challenges/` so
  any inline `class="termRef"` link added to curriculum prose is held to
  the same anchor-resolution rules.
- Add inline `class="termRef"` markers to a representative slice of
  tutorials and regulations:
  - `tutorials/00-orientation-and-stack.md` (orientation), `01-`, `02-`,
    `04-`, `05-`, `06-`, `07-`;
  - `regulations/01-eu-gdpr.md`, `03-eu-dora.md`,
    `05-eba-supervisory-reporting-corep-finrep-pillar3.md`.
- Surfaces that render through structured React components rather than
  Markdown (quiz prompts, flashcard front/back, exam card statements,
  generated fact statements, challenge YAML manifests) are not grounded in
  this PR; they require a renderer change to honour inline HTML in those
  fields. Tracked as the remaining Phase 10.4 follow-on.

### Phase 10.5 - Reverse coverage matrix

- Add `app/scripts/generate-terminology-coverage.ts` exposed as
  `bun run coverage:terminology`. Output is written to
  `_development/terminology-coverage.md` (not a learner-facing surface).
- The matrix lists every terminology entry's prose occurrences and inline
  `class="termRef"` references across `tutorials/`, `quizzes/`,
  `flashcards/`, `exams/`, `facts/`, `regulations/`, and `challenges/`. It
  flags entries with zero coverage (53 today) and entries mentioned in
  prose but not inline-grounded (Phase 10.4 follow-on backlog).

### Phase 10.6 - Continuity reconciliation

- Mark task 059 merged with `d88acc7`. Update `STATUS.md`, `DO_NEXT.md`,
  `BUGS.md`, `WHAT_WE_DID.md`, and the task index to reflect Phase 10 as
  the active scope. Delete the stale local
  `terminology-grounding-glossary` branch.

## Verification

- `bun run validate:terminology` (now also scans curriculum for inline refs).
- `bun run coverage:terminology` regenerates the coverage matrix.
- `bun run content:generate` / `bun run content:check`.
- `bun run format:check`, `bun run typecheck`, `bun run lint`.
- `bun run test:content-qa`, `bun run validate:static-links`.
- `bun run test:e2e` (user approved Vite preview binding).

## Out Of Scope For This PR

- Renderer changes needed to let quiz/flashcard/exam/fact/challenge
  surfaces render inline HTML termRef markers — tracked as the remaining
  Phase 10.4 work.
- Deeper inline grounding across every tutorial and regulation — staged as
  follow-on per-surface PRs.
- Validator escalation to fail when prose mentions a terminology term
  without an inline marker — the coverage matrix flags these as candidates
  but does not gate.
