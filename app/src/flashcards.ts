import { generatedFlashcardDecks } from "./generated/contentCatalog";

export type FlashcardRating = "again" | "hard" | "good" | "easy";

export type Flashcard = {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly sourceFacts: readonly string[];
  readonly recommendedPaths: readonly string[];
};

export type ExternalFlashcardSourceKind =
  | "anki-search"
  | "anki-manual"
  | "brainscape"
  | "quizlet";

export type ExternalFlashcardSourceReview = {
  readonly sourceKind: ExternalFlashcardSourceKind;
  readonly title: string;
  readonly url: string;
  readonly reviewedAt: string;
  readonly coverageNote: string;
  readonly incorporationNote: string;
};

export type FlashcardDeck = {
  readonly id: string;
  readonly title: string;
  readonly topic: string;
  readonly cards: readonly Flashcard[];
  readonly sourceReviews?: readonly ExternalFlashcardSourceReview[];
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

export const flashcardDecks: readonly FlashcardDeck[] = generatedFlashcardDecks;

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
