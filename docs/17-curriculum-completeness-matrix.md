# Curriculum Completeness Matrix

Status: Task 041 first-pass audit.

This matrix is a curriculum-quality gate, not a release note. It records what
exists now and what is still required before the platform can claim complete,
comprehensive, reality-verified, or externally verified learning materials.

## Inventory Snapshot

| Surface                                    | Current count | Current verdict                                         |
| ------------------------------------------ | ------------: | ------------------------------------------------------- |
| Top-level tutorials                        |            10 | Outline-quality spine; not fully runnable.              |
| Self-contained learner tasks               |             6 | Stronger practical core; still too small for full path. |
| Released challenge manifests               |             6 | Useful deterministic practice; coverage is narrow.      |
| Flashcards                                 |            59 | Useful first deck set; far below 500-card target.       |
| Quiz questions                             |            14 | One mixed quiz; far below 200-question target.          |
| Exam cards                                 |             4 | Work-product prompts; not a complete exam suite.        |
| Unique fact IDs in `facts/`                |           185 | Good base; still below 500-fact target.                 |
| Source cards excluding captured full pages |            13 | Needs broader official and regulator coverage.          |

## Competency Matrix

| Competency                    | Current coverage                                                   | Gap before completeness                                                                                        |
| ----------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| BI grain and aggregation      | Covered by learner tasks, challenges, quiz, flashcards, and facts. | Add more datasets, join patterns, and edge-case drills.                                                        |
| Fanout and many-to-many joins | Covered for deposits and ownership.                                | Add non-deposit examples and Looker Studio blend comparisons with fixtures.                                    |
| Semi-additive balances        | Covered for deposits/lending snapshots.                            | Add more time-window, month-end, and reconciliation variations.                                                |
| SQL for BI                    | Covered by browser workbench and several tasks.                    | Add a linear SQL module from SELECT through window functions and controls.                                     |
| BigQuery serving patterns     | Fact and flashcard coverage exists.                                | Tutorials need exact BigQuery UI steps, verified SQL, and official-doc source notes.                           |
| Looker Studio mechanics       | Fact and flashcard coverage exists; optional recipes exist.        | Needs current UI-verified step-by-step tutorials with screenshots/checkpoints or equivalent observable states. |
| Data quality controls         | Covered by reconciliation and ratio/null tasks.                    | Needs systematic parse, freshness, completeness, and exception-handling sequence.                              |
| Privacy/security boundaries   | Covered conceptually and in several questions.                     | Needs scenario practice for field minimisation, credential modes, and report sharing.                          |
| Banking context               | Deposit guarantee and collateral context exists.                   | Needs broader banking BI scenarios without becoming legal/regulatory advice.                                   |
| Regulations context           | Thin context exists for GDPR, FGDB/DGSD, DORA, EBA.                | Needs a mapping of each regulatory mention to source facts and practical BI implications.                      |
| Operations/observability      | Some flashcards and capstone outline exist.                        | Needs hands-on evidence review: freshness, job bytes, incidents, owner/runbook notes.                          |
| Exam readiness                | Four cards exist.                                                  | Needs rubrics, fixtures, more scenarios, and scoring criteria.                                                 |

## Tutorial Audit

| Tutorial                                | Current issue                                                                                                                    | Required fix                                                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `00-orientation-and-stack.md`           | Mostly orientation quiz navigation; useful but introductory.                                                                     | Keep, but remove any visible raw fact-ID answer references and add a concise path map.                                 |
| `01-connect-public-data.md`             | First-pass rewrite now provides browser SQL, inline BigQuery setup SQL, expected outputs, field boundaries, and recovery checks. | Verify optional BigQuery and Looker Studio UI paths against live browser UI before treating it as externally verified. |
| `02-build-a-bi-friendly-model.md`       | First-pass rewrite now provides browser SQL, expected outputs, model contract, branch-mapping check, and safe serving output.    | Add optional applied BigQuery model setup only after the browser path remains stable.                                  |
| `03-first-executive-dashboard.md`       | First-pass rewrite now starts from browser SQL and no longer assumes an existing Looker Studio report.                           | Verify optional BigQuery and Looker Studio UI steps against live browser UI before treating it as externally verified. |
| `04-metrics-and-calculated-fields.md`   | Needs current Looker Studio UI validation and exact field formulas/checkpoints.                                                  | Add step-by-step field creation, expected chart behavior, and failure cases.                                           |
| `05-blending-vs-upstream-joins.md`      | Good topic, but needs a verified hands-on blend/upstream comparison.                                                             | Add deterministic SQL outputs and Looker Studio blend configuration evidence.                                          |
| `06-performance-and-cost-lab.md`        | Needs concrete query/job evidence, not only concepts.                                                                            | Add BigQuery job metadata steps or a browser-local simulation with clearly separated limits.                           |
| `07-governance-security-and-sharing.md` | Needs practical sharing/credential scenarios and visible expected states.                                                        | Add official-doc-backed UI checks and evidence patterns without collecting credentials.                                |
| `08-observability-and-operations.md`    | Mostly checklist-shaped.                                                                                                         | Add an operations walkthrough with freshness, bytes, owner, incident, and reconciliation artifacts.                    |
| `09-technical-bi-capstone.md`           | Capstone is currently a package outline, not a complete end-to-end capstone.                                                     | Add rubric, fixture-backed expected outputs, concrete artifacts, and review workflow.                                  |

## Assessment Matrix

| Assessment type     | Current status                                                                    | Required fix                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Quiz bank           | One 14-question mixed quiz with fact metadata and improved non-meta explanations. | Build multi-bank coverage by competency and difficulty; add dataset-derived evidence for numeric answers.                      |
| Flashcards          | 59 cards across 10 decks; first pass now avoids repo/app-meta cards.              | Expand to 500 reviewed cards and remove low-value policy cards in favor of definitions, traps, mechanics, and troubleshooting. |
| Exam cards          | 4 self-assessed cards with deterministic expected outputs.                        | Add rubrics, scoring levels, more realistic deliverables, and fixture-backed review where possible.                            |
| Challenge questions | Improved visible wording; metadata keeps fact links.                              | Audit all hints, scenarios, and lesson steps for practical value and external grounding.                                       |

## Source Verification Matrix

| Claim type             | Current source base                                           | Missing before external verification                                                                      |
| ---------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| BigQuery behavior      | Official BigQuery source cards and captured pages exist.      | Source map for every tutorial SQL claim and UI instruction.                                               |
| Looker Studio behavior | Official Looker Studio source cards and captured pages exist. | Current UI walkthrough evidence for data sources, blends, credentials, fields, freshness.                 |
| GDPR/privacy           | EU GDPR and related fact cards exist.                         | Practical BI-only framing for each privacy mention; avoid legal advice.                                   |
| Deposit guarantee      | FGDB, DGSD, and FDIC context exists.                          | More EU/Romanian source-backed examples and clear boundary between BI context and compliance advice.      |
| Real-estate collateral | Romanian and Eurostat context exists.                         | More practical mortgage/valuation BI examples with deterministic synthetic data.                          |
| Dataset-derived values | Some deterministic SQL fixtures exist.                        | Every numeric quiz/exam/tutorial value must be reproducible from committed synthetic data or inline rows. |

## Non-Negotiable Rewrite Gates

- No tutorial can reference a non-existing file, report, route, or setup state.
- If a file is needed, the page must provide a browser download path or exact
  `curl` command, expected filename, row count, and checksum where practical.
- Every BigQuery or Looker Studio tutorial must be verified against current
  official documentation and, where possible, the current browser UI.
- Every practical step must have an expected result and a recovery path.
- Visible course text must not ask about repository structure, generated
  catalogs, source IDs, task IDs, app storage internals, or meta learning
  policy.
- The next content work should rewrite the tutorial spine before scaling counts.

## Rewrite Tickets

| Ticket      | Surface                                 | Status                 | Acceptance notes                                                                                                                                                                                                      |
| ----------- | --------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T041-TUT-01 | `01-connect-public-data.md`             | First pass implemented | Browser path is self-contained with exact SQL and expected outputs; optional BigQuery/Looker Studio path still needs current UI verification.                                                                         |
| T041-TUT-03 | `03-first-executive-dashboard.md`       | First pass implemented | Browser path is self-contained with exact SQL, KPI values, chart specs, freshness label, and sensitive-field exclusions; optional UI path still needs verification.                                                   |
| T041-TUT-02 | `02-build-a-bi-friendly-model.md`       | First pass implemented | Browser path is self-contained with grain profile, model-join health check, safe serving output, control total, and fanout warning.                                                                                   |
| T041-TUT-04 | `04-metrics-and-calculated-fields.md`   | First pass implemented | Browser path is self-contained with exact metric-source SQL, weighted metric checks, Looker Studio field formulas, aggregation settings, chart values, and recovery paths; optional UI path still needs verification. |
| T041-TUT-05 | `05-blending-vs-upstream-joins.md`      | First pass implemented | Browser path is self-contained with exact fanout proof SQL, safe upstream serving output, normalized owner allocation, Looker Studio blend guardrails, and recovery paths; optional UI path still needs verification. |
| T041-TUT-06 | `06-performance-and-cost-lab.md`        | Planned                | Add concrete query/job evidence steps or a clearly labeled browser-local simulation with reproducible outputs.                                                                                                        |
| T041-TUT-07 | `07-governance-security-and-sharing.md` | Planned                | Add practical sharing and credential-mode scenarios with BI-only privacy framing and no credential collection.                                                                                                        |
| T041-TUT-08 | `08-observability-and-operations.md`    | Planned                | Add a runnable freshness, bytes, owner, incident, and reconciliation walkthrough.                                                                                                                                     |
| T041-TUT-09 | `09-technical-bi-capstone.md`           | Planned                | Add rubric, required artifacts, fixture-backed expected outputs, and review workflow.                                                                                                                                 |
