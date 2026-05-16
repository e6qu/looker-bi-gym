# 060 - Terminology Integrity Checks

Status: in progress on branch `terminology-integrity-checks`.

## Goal

Close the Phase 10.1 gap from `PLAN.md`. The first-pass terminology pages
shipped without build-time validation, so renaming a heading would silently
break ~300 cross-links. This task adds an enforced validator, removes the
decorative leading badges that the first pass added under every entry, and
corrects the README marker convention so authors do not reach for a
Markdown form that the renderer cannot honour.

## Scope

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
  HTML-anchor form only (plain Markdown links cannot embed `<sup>` through
  the rendered pipeline) and refers authors to the new validator.

Out of scope (separate phases in `PLAN.md`):

- External sources and fact linkage (Phase 10.2).
- Term-level search depth (Phase 10.3).
- Inline grounding across tutorials, quizzes, flashcards, exams, facts,
  regulations, challenges (Phase 10.4).
- Reverse coverage matrix (Phase 10.5).

## Verification

- `bun run validate:terminology`
- `bun run content:generate`
- `bun run content:check`
- `bun run format:check`
- `bun run test:content-qa`
- `bun run validate:static-links`
- `bun run typecheck`
- `bun run lint`
- Existing rendered UI coverage for the terminology route remains green.

## Progress Notes

- Added `app/scripts/validate-terminology.ts` and wired it into
  `bun run check`.
- Confirmed sanity behaviour: a deliberately corrupted anchor fails the
  validator with file/line context; restoring the file makes it pass.
- Stripped 148 decorative `<span class="termBadge">…</span>` blocks across
  the seven domain files; the `.termBadge` CSS stays for future inline use.
- Rewrote `terminology/README.md` marker key to drop the Markdown link
  example, point authors at the validator, and note that the leading
  per-entry badge was removed.

## Out Of Scope Confirmation

- No content under `tutorials/`, `quizzes/`, `flashcards/`, `exams/`,
  `facts/`, `regulations/`, or `challenges/` was modified. Inline grounding
  remains Phase 10.4 work.
- No external citations or `FACT-*` linkage were added; those are Phase
  10.2.
