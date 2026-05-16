# Status

Last updated: 2026-05-16

## Current Branch And PR

- Current branch: `terminology-integrity-checks`, based on verified `main` at
  `d88acc7`.
- Current PR: #45,
  `https://github.com/e6qu/looker-bi-gym/pull/45`. Phase 10.1 landed in the
  opening commit; Phase 10.2 through 10.5 plus the Phase 10.6 reconciliation
  followed on the same branch by user direction.
- PR #44, `https://github.com/e6qu/looker-bi-gym/pull/44`, is squash-merged
  at `d88acc7` (2026-05-12).

## Active Task

Task 060 - Terminology Grounding Follow-Through. Carries the full Phase 10
work in a single PR by user direction.

Current state:

- Phase 10.1 - Integrity checks. `app/scripts/validate-terminology.ts` fails
  on duplicate heading slugs, broken `class="termRef"` anchors, unknown
  target files, missing `#anchor`, missing or mismatched `<sup>HINT</sup>`.
  Wired into `bun run check`. 148 decorative leading `<span class="termBadge">`
  blocks removed. `terminology/README.md` rewritten.
- Phase 10.2 - Sourcing and FACT linkage. Sources block convention added.
  75 vendor and regulatory entries backfilled with official-source URLs.
  30 entries linked to existing `FACT-*` IDs, validated against `facts/`.
- Phase 10.3 - Term-level search. Terminology sidebar surfaces matching
  `## term` headings, not only pages. Hash routing now keeps an inner
  `#anchor` fragment so `#/terminology/<file>#<slug>` deep links work, with
  scroll-on-mount and hashchange behaviour added to `MarkdownArticle`.
- Phase 10.4 - Inline grounding rollout. Validator extended to scan
  `tutorials/`, `quizzes/`, `flashcards/`, `exams/`, `facts/`,
  `regulations/`, and `challenges/` for `class="termRef"` links. 27 inline
  references added to a representative slice of tutorials and regulations.
  YAML-bound surfaces (quiz, flashcards, exams, fact statements, challenge
  manifests) still need renderer changes to honour inline HTML; documented
  as Phase 10.4 follow-on.
- Phase 10.5 - Reverse coverage matrix. `app/scripts/generate-terminology-coverage.ts`
  (`bun run coverage:terminology`) writes
  `_development/terminology-coverage.md`. Today's snapshot: 148 entries
  total, 93 mentioned in curriculum prose, 21 inline-grounded, 53 entirely
  uncovered.
- Phase 10.6 - Continuity reconciliation. Task 059 marked merged, this
  file, `DO_NEXT.md`, `BUGS.md`, `WHAT_WE_DID.md`, and the task index
  updated. Stale local `terminology-grounding-glossary` branch already
  deleted at branch-creation time.

## Phase 10 Follow-On Backlog

After PR #45 merges, Phase 10 remaining work:

- Renderer support so quiz prompts/explanations, flashcard front/back, exam
  card statements, fact statements, and challenge instructions can honour
  inline HTML `class="termRef"` markers.
- Continued inline grounding for the tutorials, regulations, and other
  Markdown surfaces flagged in the coverage matrix's "Mentioned In Prose
  But Not Inline-Grounded" section.
- Decide per uncovered entry (the 53 dark terms) whether to ground inline
  or retire.

## Blockers And Gaps

- Claude CLI formal review remains blocked by authentication or prior
  hangs; Task 060 does not mark any phase complete.
- Curriculum completeness, external verification, and full assessment
  coverage remain Phase 9 gaps. Phase 10.2 backfilled named-domain
  citations but Phase 9 still requires the competency / coverage / gap /
  source matrices and a recorded formal review.
- Some Phase 10.2 citations point to vendor or regulator landing pages
  rather than deep-linked specific pages; deepening those citations is
  follow-on work.
