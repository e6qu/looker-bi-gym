---
{
  "id": "docs-learning-surface-walkthrough",
  "title": "Learning Surface Walkthrough",
  "content_type": "tutorial",
  "status": "published",
  "version": "0.1.0",
  "topic": "platform-verification",
  "tags": ["verification", "github-pages"],
}
---

# Learning Surface Walkthrough

This document records deployed GitHub Pages learning-surface checks. It is a
release verification note, not a curriculum-completeness claim.

## 2026-05-11 Task 040 Walkthrough

Target deployed URL after merge: `https://e6qu.github.io/looker-bi-gym/`.

Pre-merge local preview check:

- Command:
  `DEPLOYED_BASE_URL=http://127.0.0.1:4174/ bun run verify:deployed-surface`.
- Result: passed against the patched local Vite preview.

Automated checks covered:

- Desktop and mobile route checks for home, learner task, flashcards, quiz,
  exam, facts, workbench, challenges, and settings.
- `LT-DQ-006 - Define A Ratio Null Contract` page is reachable from a hash
  route.
- Flashcard surface renders the current deck/card count and can search the
  ratio zero-denominator card.
- Quiz surface renders the ratio zero-denominator question and cited source
  fact.
- Exam surface renders the ratio null contract card and expected outputs.
- Workbench surface runs a representative browser SQL query against the
  synthetic deposits dataset and returns deterministic values.

Command:

```sh
bun run verify:deployed-surface
```

Pre-merge deployed result:

- The current live Pages site is still the previous build. The first live run
  found mobile horizontal overflow on the `LT-DQ-006` page
  (`scrollWidth=414`, `clientWidth=390`) caused by wide Markdown table/code
  content.
- This PR adds the CSS containment fix and local preview verification. The
  command must be rerun against the live Pages URL after merge and deployment.

Manual interpretation:

- The local preview pass verifies representative learner surfaces and
  browser-first navigation for this branch.
- It does not verify Safari because Safari remote automation is not enabled.
- It does not prove the curriculum is complete, comprehensive, or externally
  verified; those claims remain gated by `PLAN.md` Phase 9.
