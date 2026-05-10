# Curriculum Critical Review

This review is intentionally skeptical. It records whether the current learning
materials are credible as an e-learning curriculum, not just whether the app
renders.

## Current Verdict

The curriculum is not complete, comprehensive, or externally verified yet. It is
a useful first-pass platform with some real browser SQL practice, source-backed
facts, generated catalogs, flashcards, quiz banks, and exam-card scaffolding.
It still needs a full Phase 9 curriculum-completeness pass before any release
claim can say the materials are complete.

## Main Gaps

- Several older tutorial pages are still closer to outlines than complete
  lessons. They need exact setup state, exact steps, expected outputs, recovery
  guidance, and a clear end challenge.
- Tutorial dependencies need a hard audit. Any reference to a prior report,
  downloaded file, copied query, route, external source, or setup step must be
  verified to exist and be reachable from the website.
- The browser-first path is real, but the cloud-applied path is not yet a full
  externally verified walkthrough. BigQuery UI and Looker Studio UI steps need
  official-doc support and current UI validation.
- Question and flashcard coverage is still small. Some items were previously
  too meta, asking about platform policy or internal source IDs instead of BI
  work. The QA gate now blocks raw fact IDs, task IDs, repository references,
  app internals, and learner-meta phrasing in visible assessment text.
- The exam cards are useful work-product prompts, but they are not yet a
  complete practical exam suite. They need rubrics, more scenarios,
  fixture-backed expected outputs, and review notes.
- External verification exists for many facts, but there is not yet a coverage
  matrix proving that every tutorial step, question, flashcard, and exam claim
  traces to official or authoritative sources.

## What Good Looks Like

- Each tutorial can be followed from a clean browser session without opening
  repository files.
- Every referenced file, route, dataset, command, and external page exists and
  has a documented fallback if it fails.
- Every practical step has a concrete expected result: row counts, field names,
  totals, chart configuration, dashboard checkpoint, or written artifact.
- Assessments ask practical questions about BI grain, fanout, semi-additive
  balances, BigQuery SQL, Looker Studio mechanics, data quality, security, and
  thin regulatory context.
- Flashcards reinforce useful concepts and traps, not repository policy.
- Completeness is proven by a competency matrix, source coverage matrix,
  browser walkthrough, human review, and Claude CLI review.

## Immediate Curriculum Direction

The next curriculum phase should audit and rewrite the tutorial spine before
scaling item counts. The priority is not more content volume; it is making the
current path real, runnable, self-contained, and source-verified.
