export type FlashcardRating = "again" | "hard" | "good" | "easy";

export type Flashcard = {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly sourceFacts: readonly string[];
  readonly recommendedPaths: readonly string[];
};

export type FlashcardDeck = {
  readonly id: string;
  readonly title: string;
  readonly topic: string;
  readonly cards: readonly Flashcard[];
};

export type FlashcardReviewEvent = {
  readonly reviewedAt: string;
  readonly rating: FlashcardRating;
  readonly previousDueAt: string;
  readonly nextDueAt: string;
  readonly previousIntervalDays: number;
  readonly nextIntervalDays: number;
  readonly previousEaseFactor: number;
  readonly nextEaseFactor: number;
};

export type FlashcardCardState = {
  readonly cardId: string;
  readonly dueAt: string;
  readonly intervalDays: number;
  readonly easeFactor: number;
  readonly repetitions: number;
  readonly lapses: number;
  readonly reviewHistory: readonly FlashcardReviewEvent[];
};

export type FlashcardState = {
  readonly format: "looker-bi-gym.flashcards.v1";
  readonly updatedAt: string;
  readonly cards: Readonly<Record<string, FlashcardCardState>>;
};

export type FlashcardImportResult =
  | { readonly status: "valid"; readonly state: FlashcardState }
  | { readonly status: "invalid"; readonly message: string };

export const flashcardStorageKey = "looker-bi-gym.flashcards.v1";

export const flashcardDecks: readonly FlashcardDeck[] = [
  {
    id: "bi-fundamentals",
    title: "BI Fundamentals",
    topic: "Grain, aggregation, and fanout",
    cards: [
      {
        id: "fc-bi-grain",
        front: "What must be declared before aggregating a BI table?",
        back: "Declare the row grain first; then choose measures and joins that preserve that grain.",
        sourceFacts: ["FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md",
        ],
      },
      {
        id: "fc-bi-fanout",
        front:
          "What is the reporting risk of joining owners before summing balances?",
        back: "The owner join can duplicate account-grain balances and overstate the metric.",
        sourceFacts: ["FACT-BI-FANOUT-JOIN-RISK"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
        ],
      },
      {
        id: "fc-bi-ratio-components",
        front:
          "How should a BI model calculate a ratio from additive components?",
        back: "Aggregate the numerator and denominator at the intended reporting grain first, then divide the two totals.",
        sourceFacts: ["FACT-BI-RATIO-SUM-COMPONENTS-FIRST"],
        recommendedPaths: ["#/tutorials/04-metrics-and-calculated-fields.md"],
      },
      {
        id: "fc-bi-count-distinct-grain",
        front:
          "What should a distinct-count metric state before it reaches a dashboard?",
        back: "It should state the entity being counted and the reporting grain, because joins can change the row set being counted.",
        sourceFacts: ["FACT-BIGQUERY-COUNT-DISTINCT-GRAIN"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
        ],
      },
    ],
  },
  {
    id: "bigquery-sql",
    title: "BigQuery And SQL",
    topic: "Views, month ends, and serving results",
    cards: [
      {
        id: "fc-bigquery-view",
        front: "What is the BI role of a BigQuery logical view?",
        back: "A logical view stores reusable SQL that can expose a controlled report-serving shape.",
        sourceFacts: ["FACT-BIGQUERY-LOGICAL-VIEW"],
        recommendedPaths: ["#/docs/03-bigquery-for-bi.md"],
      },
      {
        id: "fc-bigquery-month-end",
        front: "Why should month-end snapshot logic be explicit in SQL?",
        back: "Semi-additive balances need a chosen reference date; summing across snapshot dates creates invalid time totals.",
        sourceFacts: [
          "FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT",
          "FACT-BIGQUERY-LAST-DAY-MONTH-END",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md",
        ],
      },
      {
        id: "fc-bigquery-reduce-before-join",
        front:
          "What BigQuery SQL pattern reduces fanout risk before joining owner tables?",
        back: "Reduce or aggregate the many-side table to the target reporting grain before joining it into the metric result.",
        sourceFacts: ["FACT-BIGQUERY-REDUCE-BEFORE-JOIN"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
        ],
      },
      {
        id: "fc-bigquery-partition-filters",
        front:
          "Why should BI queries include partition filters when the table design supports them?",
        back: "Partition filters limit the scanned data range and make cost/performance behavior easier to reason about.",
        sourceFacts: ["FACT-BIGQUERY-PARTITION-FILTERS"],
        recommendedPaths: ["#/tutorials/06-performance-and-cost-lab.md"],
      },
    ],
  },
  {
    id: "looker-studio",
    title: "Looker Studio",
    topic: "Data sources and chart fields",
    cards: [
      {
        id: "fc-looker-source",
        front:
          "What does a Looker Studio data source add between SQL and charts?",
        back: "It connects data to a report and provides the field schema used by charts and controls.",
        sourceFacts: ["FACT-LOOKER-STUDIO-DATA-SOURCE"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md",
        ],
      },
      {
        id: "fc-looker-credentials",
        front:
          "Why does this app avoid collecting Looker Studio or Google Cloud credentials?",
        back: "The project is a static frontend; learner credentials must stay outside the app.",
        sourceFacts: ["FACT-LOOKER-STUDIO-CREDENTIALS"],
        recommendedPaths: ["#/settings"],
      },
      {
        id: "fc-looker-calculated-field-scope",
        front:
          "When should a Looker Studio calculated field stay in the report layer?",
        back: "Use it for presentation-local logic; shared governed metric logic belongs upstream in SQL or a controlled serving view.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE",
          "FACT-BIGQUERY-VIEW-SCOPE",
        ],
        recommendedPaths: ["#/tutorials/04-metrics-and-calculated-fields.md"],
      },
      {
        id: "fc-looker-blend-risk",
        front: "What is the BI risk of using Looker Studio blends casually?",
        back: "Blend joins can create more rows or restrict available fields, so shared metric joins are usually safer upstream.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-BLEND-MORE-ROWS",
          "FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET",
        ],
        recommendedPaths: ["#/tutorials/05-blending-vs-upstream-joins.md"],
      },
    ],
  },
  {
    id: "controls-governance",
    title: "Controls And Governance",
    topic: "Reconciliation, minimisation, and accuracy",
    cards: [
      {
        id: "fc-controls-recon",
        front:
          "Why should reconciliation controls remain visible near BI metrics?",
        back: "Controls help report consumers see freshness, completeness, or upstream-quality risk next to the KPI.",
        sourceFacts: ["FACT-BI-RECONCILIATION-WINDOWS"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md",
        ],
      },
      {
        id: "fc-gdpr-minimisation",
        front: "What is the BI implication of GDPR data minimisation?",
        back: "A report-serving output should avoid unnecessary personal or sensitive fields for the stated purpose.",
        sourceFacts: ["FACT-GDPR-DATA-MINIMISATION"],
        recommendedPaths: ["#/docs/08-eu-romania-regulatory-context.md"],
      },
      {
        id: "fc-controls-dora-inventory",
        front:
          "Why does DORA-style ICT risk management matter for BI operations?",
        back: "A banking BI service needs visibility into ICT assets, data flows, controls, and operational dependencies that support reporting.",
        sourceFacts: [
          "FACT-DORA-ICT-RISK-FRAMEWORK",
          "FACT-DORA-ICT-IDENTIFICATION",
        ],
        recommendedPaths: ["#/tutorials/08-observability-and-operations.md"],
      },
      {
        id: "fc-controls-eba-validation",
        front:
          "What does an EBA DPM validation-rule mindset teach a BI analyst?",
        back: "Treat report checks as explicit, versioned validation rules, not as informal dashboard inspection.",
        sourceFacts: [
          "FACT-EBA-DPM-VALIDATION-RULES",
          "FACT-EBA-FRAMEWORK-VERSIONING",
        ],
        recommendedPaths: ["#/tutorials/08-observability-and-operations.md"],
      },
    ],
  },
  {
    id: "banking-context",
    title: "Banking Context",
    topic: "Deposit guarantees and depositor-level aggregation",
    cards: [
      {
        id: "fc-fgdb-ceiling",
        front:
          "At what conceptual grain should a BI model evaluate the FGDB EUR 100,000 ceiling?",
        back: "Evaluate the guarantee ceiling per depositor per participating credit institution, not per raw account row.",
        sourceFacts: [
          "FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK",
          "FACT-FGDB-GUARANTEE-CEILING",
        ],
        recommendedPaths: ["#/docs/08-eu-romania-regulatory-context.md"],
      },
      {
        id: "fc-dgsd-aggregate-depositor",
        front:
          "Why does deposit-guarantee reporting make owner/account joins risky?",
        back: "The reporting target can require aggregation per depositor, while account and owner tables often sit at different grains.",
        sourceFacts: [
          "FACT-DGSD-AGGREGATE-PER-DEPOSITOR",
          "FACT-BI-FANOUT-JOIN-RISK",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
        ],
      },
      {
        id: "fc-dgsd-eu-coverage",
        front:
          "What EU-level deposit-guarantee amount should a learner recognize as context?",
        back: "The EU deposit-guarantee framework uses EUR 100,000 as the harmonized coverage level per depositor.",
        sourceFacts: [
          "FACT-DGSD-100K-EU",
          "FACT-DGSD-COVERAGE-LEVEL-HARMONISED",
        ],
        recommendedPaths: ["#/docs/08-eu-romania-regulatory-context.md"],
      },
      {
        id: "fc-fdic-ownership-category",
        front: "How does FDIC coverage context reinforce BI grain discipline?",
        back: "FDIC coverage is organized by depositor, insured bank, and ownership category, so the aggregation grain must match the rule being analyzed.",
        sourceFacts: [
          "FACT-FDIC-250K-PER-DEPOSITOR-BANK-CATEGORY",
          "FACT-FDIC-OWNERSHIP-CATEGORIES",
        ],
        recommendedPaths: ["#/docs/07-banking-domain-guide.md"],
      },
    ],
  },
  {
    id: "dataset-controls",
    title: "Dataset Controls",
    topic: "Synthetic dataset traps and reproducible checks",
    cards: [
      {
        id: "fc-deposits-daily-grain",
        front: "What is the grain of the deposits seed daily balance table?",
        back: "The deposits seed balance table is account by reference date; balance is a snapshot measure at that grain.",
        sourceFacts: ["FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md",
        ],
      },
      {
        id: "fc-lending-month-end-count",
        front:
          "What dataset trap should a month-end lending tutorial check before charting balances?",
        back: "It should detect and separate non-month-end snapshot rows before producing month-end serving outputs.",
        sourceFacts: ["FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md",
        ],
      },
      {
        id: "fc-deposits-fanout-control",
        front:
          "What deterministic control should a fanout challenge compare after a risky owner join?",
        back: "Compare the known account-grain control total with the joined result so the duplicated balance amount is visible.",
        sourceFacts: ["FACT-DEPOSITS-FANOUT-CONTROL-TOTALS"],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
        ],
      },
      {
        id: "fc-real-estate-collateral-grain",
        front:
          "What grain should a collateral BI table declare before calculating mortgage exposure metrics?",
        back: "Declare whether the row represents a property, valuation event, loan-collateral link, or reporting snapshot before aggregating values.",
        sourceFacts: ["FACT-REAL-ESTATE-COLLATERAL-GRAIN"],
        recommendedPaths: ["#/docs/facts/real-estate-collateral-romania.md"],
      },
    ],
  },
  {
    id: "metric-contracts",
    title: "Metric Contracts",
    topic: "Serving views, fields, and contract boundaries",
    cards: [
      {
        id: "fc-contract-view-scope",
        front:
          "What boundary should a report-serving BigQuery view provide for BI?",
        back: "It should expose the intended reporting columns and metric grain rather than every raw operational field.",
        sourceFacts: [
          "FACT-BIGQUERY-VIEW-SCOPE",
          "FACT-BIGQUERY-SELECT-LIST-NARROWING",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md",
        ],
      },
      {
        id: "fc-contract-looker-field-types",
        front:
          "Why should Looker Studio field types be checked before publishing a report?",
        back: "Field types affect which dimensions, metrics, charts, and calculations are available to the report author.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-FIELD-TYPES",
          "FACT-LOOKER-STUDIO-DIMENSIONS-METRICS",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md",
        ],
      },
      {
        id: "fc-contract-aggregation-method",
        front: "Why is default aggregation part of a BI metric contract?",
        back: "A numeric field can be summed, counted, averaged, or treated differently; the dashboard must match the metric definition.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-AGGREGATION-METHODS",
          "FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION",
        ],
        recommendedPaths: ["#/tutorials/04-metrics-and-calculated-fields.md"],
      },
      {
        id: "fc-contract-authorized-view",
        front:
          "What does an authorized BigQuery view help control in a BI sharing model?",
        back: "It can expose controlled query results without giving report consumers direct access to every underlying table.",
        sourceFacts: ["FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL"],
        recommendedPaths: ["#/tutorials/07-governance-security-and-sharing.md"],
      },
    ],
  },
  {
    id: "performance-operations",
    title: "Performance And Operations",
    topic: "Cost, jobs, freshness, and operational evidence",
    cards: [
      {
        id: "fc-performance-view-rerun",
        front:
          "What BigQuery view behavior matters for BI performance reviews?",
        back: "A logical view runs its query when referenced, so repeated dashboards can repeatedly execute the underlying SQL.",
        sourceFacts: ["FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME"],
        recommendedPaths: ["#/tutorials/06-performance-and-cost-lab.md"],
      },
      {
        id: "fc-performance-materialized-view",
        front:
          "When can a materialized view help a BI workload more than a logical view?",
        back: "A materialized view precomputes eligible results, which can reduce repeated query work when its limitations fit the use case.",
        sourceFacts: [
          "FACT-BIGQUERY-MATERIALIZED-VIEW-PRECOMPUTED",
          "FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS",
        ],
        recommendedPaths: ["#/tutorials/06-performance-and-cost-lab.md"],
      },
      {
        id: "fc-performance-job-bytes",
        front:
          "What BigQuery job field is useful when reviewing BI query cost behavior?",
        back: "Bytes processed by jobs gives an observable signal for whether dashboard SQL scans more data than intended.",
        sourceFacts: ["FACT-BIGQUERY-JOBS-BYTES"],
        recommendedPaths: ["#/tutorials/06-performance-and-cost-lab.md"],
      },
      {
        id: "fc-operations-reference-date",
        front: "Why do operations dashboards need explicit reference dates?",
        back: "Reference dates separate the reporting period from load timing and help users interpret freshness and reconciliation status.",
        sourceFacts: [
          "FACT-BI-REFERENCE-DATE-SEPARATION",
          "FACT-EBA-REFERENCE-DATES",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md",
        ],
      },
    ],
  },
  {
    id: "privacy-security",
    title: "Privacy And Security",
    topic: "Personal data, credentials, and sharing boundaries",
    cards: [
      {
        id: "fc-privacy-personal-data",
        front:
          "What privacy question should be asked before adding an identifier to a BI output?",
        back: "Ask whether the field can identify a person directly or indirectly and whether it is necessary for the reporting purpose.",
        sourceFacts: ["FACT-GDPR-PERSONAL-DATA", "FACT-GDPR-DATA-MINIMISATION"],
        recommendedPaths: ["#/tutorials/07-governance-security-and-sharing.md"],
      },
      {
        id: "fc-privacy-pseudonymized",
        front:
          "Does pseudonymization automatically make BI data anonymous under GDPR context?",
        back: "No. Pseudonymized data can still be personal data if re-identification is possible with additional information.",
        sourceFacts: [
          "FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL",
          "FACT-GDPR-ANONYMISED-IRREVERSIBLE",
        ],
        recommendedPaths: ["#/docs/08-eu-romania-regulatory-context.md"],
      },
      {
        id: "fc-security-owner-credentials",
        front:
          "What is the Looker Studio owner-credentials risk in shared banking BI reports?",
        back: "Owner credentials can make viewers see data through the owner's access path, so sharing boundaries must be deliberate.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK",
          "FACT-LOOKER-STUDIO-CREDENTIALS",
        ],
        recommendedPaths: ["#/tutorials/07-governance-security-and-sharing.md"],
      },
      {
        id: "fc-security-viewer-credentials",
        front:
          "When are viewer credentials useful in a Looker Studio BI sharing model?",
        back: "Viewer credentials can align report access with each viewer's own permissions when the data source and access model support it.",
        sourceFacts: [
          "FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS",
          "FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL",
        ],
        recommendedPaths: ["#/tutorials/07-governance-security-and-sharing.md"],
      },
    ],
  },
  {
    id: "real-estate-collateral",
    title: "Real Estate Collateral",
    topic: "Collateral datasets, price context, and valuation dates",
    cards: [
      {
        id: "fc-real-estate-hpi",
        front:
          "What does the Eurostat house price index provide for real-estate collateral exercises?",
        back: "It provides a market-price index context, not a row-level property valuation dataset.",
        sourceFacts: [
          "FACT-EUROSTAT-HPI-MARKET-PRICE-INDEX",
          "FACT-EUROSTAT-HPI-ROMANIA-HISTORICAL-PRESENT",
        ],
        recommendedPaths: ["#/docs/facts/real-estate-collateral-romania.md"],
      },
      {
        id: "fc-real-estate-notarial",
        front:
          "Why should Romanian notarial studies not be treated as property-level market values?",
        back: "They provide annual county/context information, not a complete live market-value feed for individual collateral objects.",
        sourceFacts: [
          "FACT-ROMANIA-NOTARIAL-STUDIES-NOT-MARKET-VALUE",
          "FACT-ROMANIA-NOTARIAL-STUDIES-ANNUAL-COUNTY",
        ],
        recommendedPaths: ["#/docs/facts/real-estate-collateral-romania.md"],
      },
      {
        id: "fc-real-estate-valuation-date",
        front:
          "What date separation matters in a collateral valuation dataset?",
        back: "Keep valuation date, reporting date, and loan snapshot date distinct so trend and exposure metrics do not mix time meanings.",
        sourceFacts: [
          "FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION",
          "FACT-BI-REFERENCE-DATE-SEPARATION",
        ],
        recommendedPaths: [
          "#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md",
        ],
      },
      {
        id: "fc-real-estate-synthetic-only",
        front:
          "Why do practical collateral exercises in this repo use synthetic property rows?",
        back: "The training app avoids real banking and property data while preserving realistic grains, dates, and controls for BI practice.",
        sourceFacts: [
          "FACT-REAL-ESTATE-COLLATERAL-GRAIN",
          "FACT-LENDING-NON-MONTH-END-SNAPSHOT-COUNT",
        ],
        recommendedPaths: ["#/workbench/lending-month-end/v0.1.0"],
      },
    ],
  },
];

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isRating(value: unknown): value is FlashcardRating {
  return (
    value === "again" ||
    value === "hard" ||
    value === "good" ||
    value === "easy"
  );
}

function isReviewEvent(value: unknown): value is FlashcardReviewEvent {
  return (
    isRecord(value) &&
    typeof value["reviewedAt"] === "string" &&
    isRating(value["rating"]) &&
    typeof value["previousDueAt"] === "string" &&
    typeof value["nextDueAt"] === "string" &&
    typeof value["previousIntervalDays"] === "number" &&
    typeof value["nextIntervalDays"] === "number" &&
    typeof value["previousEaseFactor"] === "number" &&
    typeof value["nextEaseFactor"] === "number"
  );
}

function isCardState(value: unknown): value is FlashcardCardState {
  return (
    isRecord(value) &&
    typeof value["cardId"] === "string" &&
    typeof value["dueAt"] === "string" &&
    typeof value["intervalDays"] === "number" &&
    typeof value["easeFactor"] === "number" &&
    typeof value["repetitions"] === "number" &&
    typeof value["lapses"] === "number" &&
    Array.isArray(value["reviewHistory"]) &&
    value["reviewHistory"].every((event) => isReviewEvent(event))
  );
}

function parseCardStates(
  values: Readonly<Record<string, unknown>>,
): Readonly<Record<string, FlashcardCardState>> | undefined {
  const cards: Record<string, FlashcardCardState> = {};

  for (const [cardId, cardState] of Object.entries(values)) {
    if (!isCardState(cardState)) {
      return undefined;
    }

    cards[cardId] = cardState;
  }

  return cards;
}

export function createEmptyFlashcardState(nowIso: string): FlashcardState {
  return {
    format: "looker-bi-gym.flashcards.v1",
    updatedAt: nowIso,
    cards: {},
  };
}

export function getFlashcardState(
  state: FlashcardState,
  cardId: string,
  nowIso: string,
): FlashcardCardState {
  return (
    state.cards[cardId] ?? {
      cardId,
      dueAt: nowIso,
      easeFactor: 2.5,
      intervalDays: 0,
      lapses: 0,
      repetitions: 0,
      reviewHistory: [],
    }
  );
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() + Math.max(0, Math.ceil(days)));
  return date.toISOString();
}

export function reviewFlashcard(
  state: FlashcardState,
  cardId: string,
  rating: FlashcardRating,
  reviewedAt: string,
): FlashcardState {
  const previous = getFlashcardState(state, cardId, reviewedAt);
  const nextEaseFactor =
    rating === "easy"
      ? previous.easeFactor + 0.15
      : rating === "hard"
        ? Math.max(1.3, previous.easeFactor - 0.15)
        : rating === "again"
          ? Math.max(1.3, previous.easeFactor - 0.2)
          : previous.easeFactor;
  const nextIntervalDays =
    rating === "again"
      ? 0
      : rating === "hard"
        ? Math.max(1, previous.intervalDays * 1.2)
        : rating === "easy"
          ? previous.repetitions === 0
            ? 4
            : previous.intervalDays * nextEaseFactor * 1.3
          : previous.repetitions === 0
            ? 1
            : previous.intervalDays * nextEaseFactor;
  const nextDueAt = addDays(reviewedAt, nextIntervalDays);
  const event: FlashcardReviewEvent = {
    reviewedAt,
    rating,
    previousDueAt: previous.dueAt,
    nextDueAt,
    previousEaseFactor: previous.easeFactor,
    nextEaseFactor,
    previousIntervalDays: previous.intervalDays,
    nextIntervalDays,
  };

  return {
    format: "looker-bi-gym.flashcards.v1",
    updatedAt: reviewedAt,
    cards: {
      ...state.cards,
      [cardId]: {
        cardId,
        dueAt: nextDueAt,
        easeFactor: nextEaseFactor,
        intervalDays: nextIntervalDays,
        lapses: rating === "again" ? previous.lapses + 1 : previous.lapses,
        repetitions: rating === "again" ? 0 : previous.repetitions + 1,
        reviewHistory: [...previous.reviewHistory, event],
      },
    },
  };
}

export function parseFlashcardImport(source: string): FlashcardImportResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(source) as unknown;
  } catch {
    return {
      status: "invalid",
      message: "Flashcard JSON could not be parsed.",
    };
  }

  if (!isRecord(parsed) || parsed["format"] !== "looker-bi-gym.flashcards.v1") {
    return {
      status: "invalid",
      message: "Flashcard import format is invalid.",
    };
  }

  if (typeof parsed["updatedAt"] !== "string" || !isRecord(parsed["cards"])) {
    return {
      status: "invalid",
      message: "Flashcard import state is incomplete.",
    };
  }

  const cards = parseCardStates(parsed["cards"]);

  if (cards === undefined) {
    return {
      status: "invalid",
      message: "Flashcard import contains invalid card state.",
    };
  }

  return {
    status: "valid",
    state: {
      format: "looker-bi-gym.flashcards.v1",
      updatedAt: parsed["updatedAt"],
      cards,
    },
  };
}
