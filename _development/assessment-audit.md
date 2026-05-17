# Assessment Audit

Performed on 2026-05-16 on the `assessment-quality-and-expansion` branch,
after PR #45 merged. Lens: a deeper certification-track learner profile
(BigQuery Professional Data Engineer-shaped on BigQuery; Looker Studio
mechanics depth; dimensional modeling and metric contracts on general BI;
applied governance and regulatory thinking for banking). Phase 9 minima
(500 flashcards / 200 quiz questions / 30 exam cards) are the destination,
but quality leads count.

Counts at original audit time: 60 quiz questions, 64 flashcards in 10
decks, 5 YAML + 6 MD exam cards (only 2 overlapping), 148 terminology
entries, 119 FACT entries. Counts after the expansion + Codex-review
remediation work below: 78 quiz questions, 105 flashcards in 10 decks,
16 unified exam cards (single source of truth), 150 terminology entries,
133 FACT entries. The defects below were the audit findings; the count
fields in each section reflect the post-fix state.

Severity:

- `block`: would teach wrong information or fail a cert-shape question.
- `high`: meaningfully limits cert-track learning value.
- `medium`: rough edge or missed teaching opportunity.
- `low`: cosmetic.

## Quizzes (1 file, 78 questions after expansion; audited at 60)

`quizzes/bi-foundations/bi-foundations-mixed.md`.

### Q-1 Pervasive weak distractors

- Severity: `high`.
- Defect: roughly 25 of 60 questions across all three difficulty groups
  have wrong options a cert-track learner can eliminate without knowing
  the material. Examples: "chart color" / "font size" / "viewer history"
  / "report title" / "decorative report theme" / "chart border style" /
  "increase title size".
- Worst examples (eliminate by inspection):
  - `q-easy-looker-dimension-metric`: distractor "both fields are only
    report controls and cannot appear in charts" — obviously absurd.
  - `q-medium-reduce-before-join`: distractor "hope the chart
    aggregation fixes totals" — gives away the right answer through
    sarcasm.
  - `q-medium-month-end-date-check`: distractor "keep rows where the
    date string contains the month name".
  - `q-medium-leftmost-blend-source`: distractor "leftmost source
    determines the chart colors".
  - `q-medium-view-region-check`: distractor "whether the report viewer's
    browser language is English".
  - `q-hard-operations-dependency-register`: distractor "only the
    decorative report theme".
  - `q-hard-stale-dashboard-root-cause`: distractor "change the chart
    border style".
  - `q-hard-query-cost-triage`: distractor "increase the report title
    size".
- Fix proposal: replace each weak distractor with a plausible-but-wrong
  option that tests a real cert-track misconception. Examples:
  - For grain confusion: distractor that names the wrong-but-tempting
    grain (account-only when depositor-bank is correct).
  - For credential modes: distractor that conflates owner credentials
    with viewer credentials at the right structural level.
  - For partition filters: distractor that confuses partition filter
    with clustered table optimization.

### Q-2 Missing cert-track topics

- Severity: `high`.
- Defect: a PDE-shaped exam would test concepts the quiz never touches.
  Specifically:
  - **Column-level security**: policy tags, fine-grained reader role.
  - **Row-level security**: `CREATE ROW ACCESS POLICY`, `GRANT TO`,
    `FILTER USING`.
  - **Clustering vs partitioning trade-off**: clustering ordering inside
    a partition, when each helps.
  - **Query results cache**: 24-hour cached-result behavior,
    `cache_hit` flag.
  - **Materialized view refresh**: scheduled refresh vs `REFRESH
MATERIALIZED VIEW`, smart-tuning, freshness staleness.
  - **Partition expiration**: how it limits retention and cost.
  - **`COUNT(*) vs COUNT(column)`**: column counts skip NULLs.
  - **Looker Studio blend join semantics**: left/right/inner/full outer
    blend options.
  - **Looker Studio data freshness intervals**: 1m / 15m / 1h / 4h / 12h
    defaults, manual refresh.
  - **SCD types** (1, 2, 3, 6).
  - **Conformed dimensions**: same dimension reused across multiple
    fact tables.
  - **Surrogate key vs natural key**: degenerate dimensions.
  - **Weighted average vs simple average trap**: average-of-averages
    pitfall (the worked example exists in tutorial 04 but no quiz
    question tests it).
- Fix proposal: add at least one quiz question per topic above, spread
  across difficulty groups. Each must use a real scenario, not a
  definition recall.

### Q-3 Banking-domain narrow

- Severity: `medium`.
- Defect: DGSD / FGDB deposit guarantees and DORA covered well. Missing:
  CRR / Basel (capital ratios, RWA, leverage), IFRS9 (staging,
  expected credit loss), AML / CFT (suspicious activity flags, KYC
  data), BCBS 239 (risk data aggregation and reporting principles), PSD2
  (strong customer authentication, payment data), and supervisory
  reporting templates (COREP / FINREP).
- Fix proposal: add 6-10 quiz questions spread across these
  banking-regulatory areas. Lean on `regulations/04-eu-crr-crd.md`,
  `regulations/05-eba-supervisory-reporting-corep-finrep-pillar3.md`,
  `regulations/06-eu-psd2.md`, `regulations/07-eu-aml-amla-package.md`,
  and `regulations/11-bcbs-239-risk-data-aggregation.md` which already
  exist.

### Q-4 Application questions are rare

- Severity: `medium`.
- Defect: the 60 questions are almost entirely conceptual ("which
  describes X?", "which checks belong before publication?"). Few force
  the learner to predict an exact numeric output of a query, identify a
  bug in a SQL snippet, or compute a value. A PDE-shaped exam relies on
  this kind of application question.
- Fix proposal: add 5-10 questions that show a SQL snippet or a query
  result and ask: "what does this return?" / "what is the bug?" /
  "fill in the missing predicate". The numeric fanout question
  (`q-medium-fanout-delta`) is the model.

## Flashcards (10 decks, 105 cards after expansion; audited at 64)

### F-1 Lopsided deck distribution

- Severity: `high`.
- Counts: banking-context 4, bi-fundamentals 4, controls-governance 4,
  dataset-controls 4, privacy-security 4, real-estate-collateral 4,
  performance-operations 5, metric-contracts 8, looker-studio 13,
  bigquery-sql 14.
- Defect: this is _banking_ BI but banking-context has 4 cards. Privacy
  / security is one of the certification-track gates but the deck has 4
  cards. Dimensional modeling concepts (where bi-fundamentals lives)
  has 4 cards.
- Fix proposal: bring every under-served deck to >= 10 cards by adding
  cards that fill the cert-track gaps identified in Q-2 and Q-3.
  Specifically: privacy-security needs cards on RLS, CLS, special
  category data, retention/storage limitation, breach notification;
  banking-context needs cards on CRR ratios, IFRS9 stages, FGDB
  eligibility detail, KYC data sensitivity, BCBS 239 principles.

### F-2 Heavy overlap with terminology

- Severity: `medium`.
- Defect: many card backs paraphrase the terminology entry for the same
  concept. `fc-bi-grain` back ≈ `terminology/bi.md#grain` definition.
  Spaced-repetition format earns its place only when the flashcard
  surfaces a _contrast_, a _trap_, or a _misconception_, not just the
  definition.
- Fix proposal: when adding new cards, frame them as
  "which of A vs B is correct here", "what does X look like when it
  goes wrong", or "what does this code return". Avoid recycling
  terminology definitions verbatim.

### F-3 Same cert-track topic gaps as quizzes

- Severity: `high`.
- Defect: no flashcard tests CLS / policy tags, RLS, clustering,
  materialized view refresh interval, partition expiration, `COUNT(*)`
  vs `COUNT(column)`, SCD types, conformed dimensions, weighted average
  vs average-of-averages, IFRS9 stages, CRR ratios, AML/CFT BI
  implications, or BCBS 239.
- Fix proposal: align flashcard additions with quiz additions so each
  cert-track concept lands as both a recall flashcard and an applied
  quiz question.

## Exams (reconciled to one canonical YAML pack, 16 cards after expansion; audited at 5+6)

### E-1 Two divergent exam surfaces

- Severity: `high`.
- Defect: `exams/bi-foundations/bi-foundations-exam.md` (YAML pack, 5
  cards) and `tutorials/exam-mode.md` (Markdown pack, 6 cards) share
  only 2 cards (Grain/Fanout, Month-End).
  - YAML-only cards: Ratio Null Contract, Dashboard Refresh Operations,
    Control Parameter Handoff.
  - MD-only cards: Weighted Ratio Metric Contract, Governance Release
    Decision, BigQuery Cost Triage, DORA Operations Evidence.
- Why it matters: the cert-track learner using the interactive exam
  surface sees a different exam from the one documented in
  `tutorials/exam-mode.md`. Both call themselves the exam.
- Fix proposal: pick one as source of truth and either generate or
  cross-reference the other. The YAML pack is consumed by the React
  exam page, so it should be canonical. The MD doc should describe the
  same cards plus a pointer to the live exam, or be merged in.

### E-2 Descriptive cards are weakly verifiable

- Severity: `medium`.
- Defect: 3 of 5 YAML cards (Ratio Null, Refresh Ops, Control Parameter)
  have descriptive `expected_outputs` like "ratio numerator and
  denominator are named before aggregation". The cert-track learner
  self-assesses against soft prose rather than a number or schema.
- Fix proposal: every exam card should include at least one
  numeric / schema / list-of-fields expected output that the learner
  can confirm exactly. Keep descriptive outputs as secondary
  self-assessment items.

### E-3 Need to expand toward 30 cards

- Severity: `medium`.
- Phase 9 minimum is 30 exam cards; current surface count is 5-6
  depending on which file is read. Adding cards should follow the
  quiz/flashcard cert-track gap list so the three surfaces compose.

## Terminology depth (150 entries after expansion; audited at 148, 93 prose-mentioned, 21 inline-grounded)

### T-1 Looker Studio citations are all landing-page

- Severity: `medium`.
- Defect: every Looker Studio terminology entry cites
  `https://support.google.com/looker-studio` (the help center root).
  None deep-links to the specific answer page for a feature.
- Fix proposal: replace each LS landing-page citation with a deep link
  to the canonical help article when stable. Where the canonical page is
  uncertain, accept the landing page and mark the term as
  "deep-link pending".

### T-2 DuckDB and regulator landing pages

- Severity: `medium`.
- Defect: DuckDB entries cite the docs landing page; EBA / BNR
  regulatory entries cite the authority landing page rather than the
  specific regulatory text or technical standard.
- Fix proposal: same as T-1, with deep links where they exist (e.g.,
  DuckDB's CSV / WASM / data type docs each have stable URLs).

### T-3 53 entries with zero curriculum coverage

- Severity: `medium`.
- Defect: terms exist in `terminology/` but no tutorial / quiz /
  flashcard / exam / fact / regulation / challenge file mentions them.
  Examples: `chart-level calculated field`, `embedded data source`,
  `legacy SQL`, `materialized result cache`, `nested field`,
  `parameterized query`, `data controller`, `data processor`,
  `DORA incident reporting`, `gdpr-purpose-limitation`,
  `special-category personal data`, `temporary high balance`,
  `eba-validation-rule`.
- Fix proposal: per uncovered entry, decide whether to retire (term is
  not relevant to the curriculum) or to introduce it in at least one
  flashcard or quiz question. The cert-track gap list in Q-2 should
  consume many of these naturally (CLS / RLS would consume
  `column-level security`-shaped terms; SCD addition would consume
  related vocabulary).

### T-4 Some entries are shallow

- Severity: `low`.
- Defect: a few terminology entries have a one-sentence definition plus
  an example, with no contrast / failure / cert-trap content. Examples:
  `aggregate function` ("a value calculated from multiple rows"),
  `account` ("a ledger record").
- Fix proposal: where a term has cert-track depth, expand the entry
  with the contrast or trap (e.g., for `count`, add the
  `COUNT(*) vs COUNT(column)` NULL handling note; for `aggregate
function`, add the example of additive vs semi-additive vs
  non-additive).

## Summary

Severity counts:

- `block`: 0.
- `high`: 5 (Q-1, Q-2, F-1, F-3, E-1).
- `medium`: 8 (Q-3, Q-4, F-2, E-2, E-3, T-1, T-2, T-3).
- `low`: 1 (T-4).

Top fix priorities for this PR:

1. Sharpen quiz distractors and add cert-track scenario questions
   (Q-1, Q-2, Q-4) — close the "easy to answer by elimination" gap.
2. Bring under-served flashcard decks to >= 10 cards each focused on
   the cert-track topic gaps (F-1, F-3).
3. Reconcile the two exam surfaces and tighten descriptive cards into
   verifiable cards (E-1, E-2).
4. Backfill deeper terminology citations for LS / DuckDB / regulator
   landing pages, and ground or retire the 53 uncovered entries
   (T-1, T-2, T-3).

Expansion toward the Phase 9 minima (500/200/30) is staged. Honest
target for this PR: bring quizzes to ~80 questions, flashcards to ~100
cards (with even distribution), exam to ~10 unified cards. The
remaining gap is documented in PLAN.md Phase 12.
