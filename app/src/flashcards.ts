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
