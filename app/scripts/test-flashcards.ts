import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createEmptyFlashcardState,
  flashcardDecks,
  parseFlashcardImport,
  reviewFlashcard,
} from "../src/flashcards";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..", "..");
const factHeadingPattern = /^### (FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/gmu;
const startedAt = "2026-05-10T10:00:00.000Z";
const card = flashcardDecks[0]?.cards[0];

function requireDefined<TValue>(
  value: TValue | undefined,
  message: string,
): TValue {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
}

async function readFactIds(): Promise<ReadonlySet<string>> {
  const factsDir = join(repoRoot, "docs", "facts");
  const factFiles = (await readdir(factsDir)).filter((fileName) =>
    fileName.endsWith(".md"),
  );
  const factIds = new Set<string>();

  for (const fileName of factFiles) {
    const source = await readFile(join(factsDir, fileName), "utf8");

    for (const match of source.matchAll(factHeadingPattern)) {
      if (match[1] !== undefined) {
        factIds.add(match[1]);
      }
    }
  }

  return factIds;
}

if (card === undefined) {
  throw new Error("Expected at least one flashcard.");
}

const initialState = createEmptyFlashcardState(startedAt);
const reviewedState = reviewFlashcard(initialState, card.id, "good", startedAt);
const reviewedCard = requireDefined(
  reviewedState.cards[card.id],
  `Expected reviewed state for ${card.id}.`,
);

assert.equal(reviewedState.format, "looker-bi-gym.flashcards.v1");
assert.equal(reviewedState.updatedAt, startedAt);
assert.equal(reviewedCard.repetitions, 1);
assert.equal(reviewedCard.lapses, 0);
assert.equal(reviewedCard.intervalDays, 1);
assert.equal(reviewedCard.reviewHistory.length, 1);
const reviewedEvent = requireDefined(
  reviewedCard.reviewHistory[0],
  `Expected first review event for ${card.id}.`,
);

assert.equal(reviewedEvent.reviewedAt, startedAt);
assert.equal(reviewedEvent.rating, "good");

const lapsedState = reviewFlashcard(
  reviewedState,
  card.id,
  "again",
  "2026-05-11T10:00:00.000Z",
);
const lapsedCard = requireDefined(
  lapsedState.cards[card.id],
  `Expected lapsed state for ${card.id}.`,
);

assert.equal(lapsedCard.repetitions, 0);
assert.equal(lapsedCard.lapses, 1);
assert.equal(lapsedCard.intervalDays, 0);
assert.equal(lapsedCard.reviewHistory.length, 2);

const importResult = parseFlashcardImport(JSON.stringify(lapsedState));

if (importResult.status !== "valid") {
  throw new Error("Expected valid flashcard import.");
}

assert.equal(importResult.status, "valid");
assert.equal(importResult.state.cards[card.id]?.lapses, 1);
assert.equal(parseFlashcardImport("{").status, "invalid");
assert.equal(
  parseFlashcardImport(JSON.stringify({ format: "wrong" })).status,
  "invalid",
);

const cardIds = new Set<string>();
const factIds = await readFactIds();
const totalCardCount = flashcardDecks.reduce(
  (count, deck) => count + deck.cards.length,
  0,
);

assert.ok(flashcardDecks.length >= 10, "Expected at least ten topic decks.");
assert.ok(
  totalCardCount >= 40,
  "Expected at least 40 flashcards across the topic decks.",
);

for (const deck of flashcardDecks) {
  assert.ok(
    deck.cards.length >= 4,
    `${deck.id} must have at least four cards.`,
  );

  for (const deckCard of deck.cards) {
    assert.ok(!cardIds.has(deckCard.id), `Duplicate card ID ${deckCard.id}.`);
    cardIds.add(deckCard.id);
    assert.ok(deckCard.front.length > 20, `${deckCard.id} front is too thin.`);
    assert.ok(deckCard.back.length > 30, `${deckCard.id} back is too thin.`);
    assert.ok(
      deckCard.sourceFacts.length > 0,
      `${deckCard.id} must cite source facts.`,
    );

    for (const sourceFact of deckCard.sourceFacts) {
      assert.ok(
        factIds.has(sourceFact),
        `${deckCard.id} cites unknown source fact ${sourceFact}.`,
      );
    }

    for (const recommendedPath of deckCard.recommendedPaths) {
      assert.ok(
        recommendedPath.startsWith("#/"),
        `${deckCard.id} recommended path must be an app route.`,
      );
    }
  }
}
