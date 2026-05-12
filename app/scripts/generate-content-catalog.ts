import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

type ContentType =
  | "tutorial"
  | "tutorial_index"
  | "tutorial_recipe"
  | "learner_task"
  | "terminology"
  | "terminology_index"
  | "fact_index"
  | "fact_register"
  | "flashcard_deck"
  | "flashcard"
  | "quiz_bank"
  | "exam_pack";

type Frontmatter = {
  readonly id: string;
  readonly title: string;
  readonly content_type: ContentType;
  readonly status: string;
  readonly version: string;
  readonly topic?: string;
  readonly difficulty?: string;
  readonly estimated_minutes?: number;
  readonly sort_order?: number;
  readonly source_facts?: readonly string[];
  readonly recommended_learner_tasks?: readonly string[];
  readonly tags?: readonly string[];
  readonly prerequisites?: readonly string[];
  readonly source_reviews?: readonly ExternalFlashcardSourceReview[];
  readonly questions?: Readonly<
    Record<Difficulty, readonly QuizBankQuestion[]>
  >;
  readonly cards?: readonly ExamCard[];
  readonly audience?: string;
  readonly description?: string;
  readonly mode?: string;
  readonly estimated_minutes_per_card?: number;
};

type MarkdownSource = {
  readonly absolutePath: string;
  readonly repoPath: string;
  readonly frontmatter: Frontmatter | undefined;
  readonly markdown: string;
};

type GeneratedContentDocument = {
  readonly section: "docs" | "regulations" | "terminology" | "tutorials";
  readonly fileName: string;
  readonly filePath: string;
  readonly title: string;
  readonly markdown: string;
  readonly metadata?: Frontmatter;
};

type GeneratedFactRecord = {
  readonly id: string;
  readonly area: string;
  readonly fileName: string;
  readonly filePath: string;
  readonly statement: string;
  readonly sourceQuote: string;
  readonly derivedImplication: string;
  readonly relatedFacts: readonly string[];
  readonly href: string;
};

type ExternalFlashcardSourceKind =
  | "anki-search"
  | "anki-manual"
  | "brainscape"
  | "quizlet";

type ExternalFlashcardSourceReview = {
  readonly sourceKind: ExternalFlashcardSourceKind;
  readonly title: string;
  readonly url: string;
  readonly reviewedAt: string;
  readonly coverageNote: string;
  readonly incorporationNote: string;
};

type GeneratedFlashcard = {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly sourceFacts: readonly string[];
  readonly recommendedPaths: readonly string[];
};

type GeneratedFlashcardDeck = {
  readonly id: string;
  readonly title: string;
  readonly topic: string;
  readonly cards: readonly GeneratedFlashcard[];
  readonly sourceReviews?: readonly ExternalFlashcardSourceReview[];
};

type Difficulty = "easy" | "medium" | "hard";

type QuizBankQuestionType = "multiple_choice" | "select_all" | "numeric";

type QuizBankOption = {
  readonly id: string;
  readonly label: string;
};

type QuizBankQuestion = {
  readonly id: string;
  readonly type: QuizBankQuestionType;
  readonly estimated_seconds: number;
  readonly recommended_learner_tasks: readonly string[];
  readonly source_facts: readonly string[];
  readonly prompt: string;
  readonly options?: readonly QuizBankOption[];
  readonly answer: string | number | readonly string[];
  readonly explanation: string;
  readonly self_assessment: string;
};

type GeneratedQuizBank = {
  readonly id: string;
  readonly title: string;
  readonly estimated_minutes: number;
  readonly audience: string;
  readonly description: string;
  readonly questions: Readonly<Record<Difficulty, readonly QuizBankQuestion[]>>;
};

type ExamCard = {
  readonly id: string;
  readonly title: string;
  readonly recommended_learner_tasks: readonly string[];
  readonly source_facts: readonly string[];
  readonly objective: string;
  readonly verification: {
    readonly expected_outputs: readonly string[];
    readonly self_assessment: string;
  };
};

type GeneratedExamPack = {
  readonly id: string;
  readonly title: string;
  readonly mode: "self_assessed";
  readonly estimated_minutes_per_card: number;
  readonly description: string;
  readonly cards: readonly ExamCard[];
};

type Catalog = {
  readonly contentDocuments: readonly GeneratedContentDocument[];
  readonly factCatalog: readonly GeneratedFactRecord[];
  readonly flashcardDecks: readonly GeneratedFlashcardDeck[];
  readonly quizBanks: readonly GeneratedQuizBank[];
  readonly examPacks: readonly GeneratedExamPack[];
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const generatedPath = join(appRoot, "src", "generated", "contentCatalog.ts");
const contentTypes: ReadonlySet<string> = new Set([
  "tutorial",
  "tutorial_index",
  "tutorial_recipe",
  "learner_task",
  "terminology",
  "terminology_index",
  "fact_index",
  "fact_register",
  "flashcard_deck",
  "flashcard",
  "quiz_bank",
  "exam_pack",
]);
const factHeadingPattern = /^### (FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/u;
const factIdPattern = /FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*/gu;

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, context: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${context} must be a non-empty string.`);
  }

  return value;
}

function requireNumber(value: unknown, context: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${context} must be a finite number.`);
  }

  return value;
}

function requireStringArray(
  value: unknown,
  context: string,
): readonly string[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be a string array.`);
  }

  const entries: readonly unknown[] = value;

  return entries.map((entry, index) =>
    requireString(entry, `${context}[${index}]`),
  );
}

function requireRecord(
  value: unknown,
  context: string,
): Readonly<Record<string, unknown>> {
  if (!isRecord(value)) {
    throw new Error(`${context} must be a mapping.`);
  }

  return value;
}

async function listFiles(
  root: string,
  extensions: ReadonlySet<string>,
): Promise<string[]> {
  const rootStats = await stat(root);

  if (rootStats.isFile()) {
    return extensions.has(extname(root)) ? [root] : [];
  }

  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(root, entry.name);

      if (entry.isDirectory()) {
        return listFiles(entryPath, extensions);
      }

      return extensions.has(extname(entry.name)) ? [entryPath] : [];
    }),
  );

  return nested.flat().sort();
}

function titleFromMarkdown(markdown: string, fileName: string): string {
  const heading = /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim();

  if (heading !== undefined && heading.length > 0) {
    return heading;
  }

  return fileName
    .replace(/\.md$/u, "")
    .replace(/^\d+-/u, "")
    .replaceAll("-", " ")
    .replace(/\b\w/gu, (letter) => letter.toUpperCase());
}

function slugifyFactId(factId: string): string {
  return factId.toLowerCase();
}

function extractField(body: string, label: string): string {
  const fieldPrefix = `- ${label}:`;
  const lines = body.split(/\r?\n/u);
  const fieldIndex = lines.findIndex((line) => line.startsWith(fieldPrefix));

  if (fieldIndex < 0) {
    return "";
  }

  const values = [lines[fieldIndex]?.slice(fieldPrefix.length).trim() ?? ""];

  for (const line of lines.slice(fieldIndex + 1)) {
    if (line.startsWith("- ")) {
      break;
    }

    if (line.startsWith("  ")) {
      values.push(line.trim());
    }
  }

  return values.filter((value) => value.length > 0).join(" ");
}

function extractRelatedFacts(body: string, factId: string): readonly string[] {
  const relatedFacts = new Set<string>();

  for (const match of body.matchAll(factIdPattern)) {
    const candidate = match[0];

    if (candidate !== factId) {
      relatedFacts.add(candidate);
    }
  }

  return [...relatedFacts].sort();
}

function parseFrontmatter(
  source: string,
  context: string,
): {
  readonly frontmatter: Frontmatter | undefined;
  readonly markdown: string;
} {
  if (!source.startsWith("---\n")) {
    return { frontmatter: undefined, markdown: source };
  }

  const endMarker = source.indexOf("\n---", 4);

  if (endMarker < 0) {
    throw new Error(`${context} has an opening frontmatter marker but no end.`);
  }

  const rawFrontmatter = source.slice(4, endMarker);
  const markdown = source.slice(endMarker).replace(/^\n---\n?/u, "");
  const parsed = YAML.parse(rawFrontmatter) as unknown;
  const record = requireRecord(parsed, `${context}.frontmatter`);
  const contentType = requireString(
    record["content_type"],
    `${context}.frontmatter.content_type`,
  );

  if (!contentTypes.has(contentType)) {
    throw new Error(`${context}.frontmatter.content_type is unsupported.`);
  }

  const metadata: Frontmatter = {
    id: requireString(record["id"], `${context}.frontmatter.id`),
    title: requireString(record["title"], `${context}.frontmatter.title`),
    content_type: contentType as ContentType,
    status: requireString(record["status"], `${context}.frontmatter.status`),
    version: requireString(record["version"], `${context}.frontmatter.version`),
    ...(record["topic"] === undefined
      ? {}
      : {
          topic: requireString(record["topic"], `${context}.frontmatter.topic`),
        }),
    ...(record["difficulty"] === undefined
      ? {}
      : {
          difficulty: requireString(
            record["difficulty"],
            `${context}.frontmatter.difficulty`,
          ),
        }),
    ...(record["estimated_minutes"] === undefined
      ? {}
      : {
          estimated_minutes: requireNumber(
            record["estimated_minutes"],
            `${context}.frontmatter.estimated_minutes`,
          ),
        }),
    ...(record["sort_order"] === undefined
      ? {}
      : {
          sort_order: requireNumber(
            record["sort_order"],
            `${context}.frontmatter.sort_order`,
          ),
        }),
    ...(record["source_facts"] === undefined
      ? {}
      : {
          source_facts: requireStringArray(
            record["source_facts"],
            `${context}.frontmatter.source_facts`,
          ),
        }),
    ...(record["recommended_learner_tasks"] === undefined
      ? {}
      : {
          recommended_learner_tasks: requireStringArray(
            record["recommended_learner_tasks"],
            `${context}.frontmatter.recommended_learner_tasks`,
          ),
        }),
    ...(record["prerequisites"] === undefined
      ? {}
      : {
          prerequisites: requireStringArray(
            record["prerequisites"],
            `${context}.frontmatter.prerequisites`,
          ),
        }),
    ...(record["tags"] === undefined
      ? {}
      : {
          tags: requireStringArray(
            record["tags"],
            `${context}.frontmatter.tags`,
          ),
        }),
    ...(record["source_reviews"] === undefined
      ? {}
      : {
          source_reviews: parseSourceReviews(
            record["source_reviews"],
            `${context}.frontmatter.source_reviews`,
          ),
        }),
    ...(record["questions"] === undefined
      ? {}
      : {
          questions: parseDifficultyQuestionRecord(
            record["questions"],
            `${context}.frontmatter.questions`,
          ),
        }),
    ...(record["cards"] === undefined
      ? {}
      : {
          cards: parseExamCards(
            record["cards"],
            `${context}.frontmatter.cards`,
          ),
        }),
    ...(record["audience"] === undefined
      ? {}
      : {
          audience: requireString(
            record["audience"],
            `${context}.frontmatter.audience`,
          ),
        }),
    ...(record["description"] === undefined
      ? {}
      : {
          description: requireString(
            record["description"],
            `${context}.frontmatter.description`,
          ),
        }),
    ...(record["mode"] === undefined
      ? {}
      : {
          mode: requireString(record["mode"], `${context}.frontmatter.mode`),
        }),
    ...(record["estimated_minutes_per_card"] === undefined
      ? {}
      : {
          estimated_minutes_per_card: requireNumber(
            record["estimated_minutes_per_card"],
            `${context}.frontmatter.estimated_minutes_per_card`,
          ),
        }),
  };

  return { frontmatter: metadata, markdown };
}

function parseSourceReviews(
  value: unknown,
  context: string,
): readonly ExternalFlashcardSourceReview[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array.`);
  }

  const entries: readonly unknown[] = value;

  return entries.map((entry, index) => {
    const record = requireRecord(entry, `${context}[${index}]`);
    const sourceKind = requireString(
      record["sourceKind"],
      `${context}[${index}].sourceKind`,
    );

    if (
      sourceKind !== "anki-search" &&
      sourceKind !== "anki-manual" &&
      sourceKind !== "brainscape" &&
      sourceKind !== "quizlet"
    ) {
      throw new Error(`${context}[${index}].sourceKind is unsupported.`);
    }

    return {
      sourceKind,
      title: requireString(record["title"], `${context}[${index}].title`),
      url: requireString(record["url"], `${context}[${index}].url`),
      reviewedAt: requireString(
        record["reviewedAt"],
        `${context}[${index}].reviewedAt`,
      ),
      coverageNote: requireString(
        record["coverageNote"],
        `${context}[${index}].coverageNote`,
      ),
      incorporationNote: requireString(
        record["incorporationNote"],
        `${context}[${index}].incorporationNote`,
      ),
    };
  });
}

function parseQuizQuestionType(
  value: unknown,
  context: string,
): QuizBankQuestionType {
  const questionType = requireString(value, context);

  if (
    questionType !== "multiple_choice" &&
    questionType !== "select_all" &&
    questionType !== "numeric"
  ) {
    throw new Error(
      `${context} has unsupported question type ${questionType}.`,
    );
  }

  return questionType;
}

function parseQuizOptions(
  value: unknown,
  context: string,
): readonly QuizBankOption[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array.`);
  }

  const entries: readonly unknown[] = value;

  return entries.map((entry, index) => {
    const record = requireRecord(entry, `${context}[${index}]`);

    return {
      id: requireString(record["id"], `${context}[${index}].id`),
      label: requireString(record["label"], `${context}[${index}].label`),
    };
  });
}

function parseQuizAnswer(
  value: unknown,
  questionType: QuizBankQuestionType,
  context: string,
): string | number | readonly string[] {
  if (questionType === "numeric") {
    return requireNumber(value, context);
  }

  if (questionType === "select_all") {
    return requireStringArray(value, context);
  }

  return requireString(value, context);
}

function parseQuizQuestion(value: unknown, context: string): QuizBankQuestion {
  const record = requireRecord(value, context);
  const questionType = parseQuizQuestionType(record["type"], `${context}.type`);
  const options = parseQuizOptions(record["options"], `${context}.options`);

  return {
    id: requireString(record["id"], `${context}.id`),
    type: questionType,
    estimated_seconds: requireNumber(
      record["estimated_seconds"],
      `${context}.estimated_seconds`,
    ),
    recommended_learner_tasks: requireStringArray(
      record["recommended_learner_tasks"],
      `${context}.recommended_learner_tasks`,
    ),
    source_facts: requireStringArray(
      record["source_facts"],
      `${context}.source_facts`,
    ),
    prompt: requireString(record["prompt"], `${context}.prompt`),
    ...(options === undefined ? {} : { options }),
    answer: parseQuizAnswer(
      record["answer"],
      questionType,
      `${context}.answer`,
    ),
    explanation: requireString(record["explanation"], `${context}.explanation`),
    self_assessment: requireString(
      record["self_assessment"],
      `${context}.self_assessment`,
    ),
  };
}

function parseDifficultyQuestionRecord(
  value: unknown,
  context: string,
): Readonly<Record<Difficulty, readonly QuizBankQuestion[]>> {
  const record = requireRecord(value, context);

  return {
    easy: parseQuestionArray(record["easy"], `${context}.easy`),
    medium: parseQuestionArray(record["medium"], `${context}.medium`),
    hard: parseQuestionArray(record["hard"], `${context}.hard`),
  };
}

function parseQuestionArray(
  value: unknown,
  context: string,
): readonly QuizBankQuestion[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array.`);
  }

  return value.map((entry, index) =>
    parseQuizQuestion(entry, `${context}[${index}]`),
  );
}

function parseExamCard(value: unknown, context: string): ExamCard {
  const record = requireRecord(value, context);
  const verification = requireRecord(
    record["verification"],
    `${context}.verification`,
  );

  return {
    id: requireString(record["id"], `${context}.id`),
    title: requireString(record["title"], `${context}.title`),
    recommended_learner_tasks: requireStringArray(
      record["recommended_learner_tasks"],
      `${context}.recommended_learner_tasks`,
    ),
    source_facts: requireStringArray(
      record["source_facts"],
      `${context}.source_facts`,
    ),
    objective: requireString(record["objective"], `${context}.objective`),
    verification: {
      expected_outputs: requireStringArray(
        verification["expected_outputs"],
        `${context}.verification.expected_outputs`,
      ),
      self_assessment: requireString(
        verification["self_assessment"],
        `${context}.verification.self_assessment`,
      ),
    },
  };
}

function parseExamCards(value: unknown, context: string): readonly ExamCard[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array.`);
  }

  return value.map((entry, index) =>
    parseExamCard(entry, `${context}[${index}]`),
  );
}

async function readMarkdown(path: string): Promise<MarkdownSource> {
  const source = await readFile(path, "utf8");
  const repoPath = relative(repoRoot, path).replaceAll("\\", "/");
  const parsed = parseFrontmatter(source, repoPath);

  return {
    absolutePath: path,
    repoPath,
    frontmatter: parsed.frontmatter,
    markdown: parsed.markdown,
  };
}

function requireFrontmatter(
  source: MarkdownSource,
  expectedTypes: ReadonlySet<ContentType>,
): Frontmatter {
  if (source.frontmatter === undefined) {
    throw new Error(`${source.repoPath} is missing typed frontmatter.`);
  }

  if (!expectedTypes.has(source.frontmatter.content_type)) {
    throw new Error(
      `${source.repoPath} has content_type ${source.frontmatter.content_type}.`,
    );
  }

  return source.frontmatter;
}

function assertUniqueId(id: string, ids: Set<string>, context: string): void {
  if (ids.has(id)) {
    throw new Error(`Duplicate content ID ${id} at ${context}.`);
  }

  ids.add(id);
}

function assertKnownSourceFacts(
  sourceFacts: readonly string[],
  factIds: ReadonlySet<string>,
  context: string,
): void {
  if (sourceFacts.length === 0) {
    throw new Error(`${context} must cite at least one source fact.`);
  }

  for (const sourceFact of sourceFacts) {
    if (!factIds.has(sourceFact)) {
      throw new Error(
        `${context} references unknown source fact ${sourceFact}.`,
      );
    }
  }
}

function extractSection(
  markdown: string,
  heading: string,
  context: string,
): string {
  const lines = markdown.split(/\r?\n/u);
  const headingIndex = lines.findIndex(
    (line) => line.trim() === `## ${heading}`,
  );

  if (headingIndex < 0) {
    throw new Error(`${context} must include a ## ${heading} section.`);
  }

  const values: string[] = [];

  for (const line of lines.slice(headingIndex + 1)) {
    if (line.startsWith("## ")) {
      break;
    }

    values.push(line);
  }

  const value = values.join("\n").trim();

  if (value.length === 0) {
    throw new Error(`${context} must include a ## ${heading} section.`);
  }

  return value;
}

function parseFactFile(source: MarkdownSource): readonly GeneratedFactRecord[] {
  const metadata = requireFrontmatter(
    source,
    new Set(["fact_index", "fact_register"]),
  );
  const fileName = source.repoPath.split("/").at(-1) ?? source.repoPath;
  const facts: GeneratedFactRecord[] = [];
  let currentFactId: string | undefined;
  let currentLines: string[] = [];

  function flushFact(): void {
    if (currentFactId === undefined) {
      return;
    }

    const body = currentLines.join("\n").trim();

    facts.push({
      id: currentFactId,
      area: metadata.title,
      fileName,
      filePath: source.repoPath,
      statement: extractField(body, "Statement"),
      sourceQuote: extractField(body, "Source quote"),
      derivedImplication: extractField(body, "Derived implication"),
      relatedFacts: extractRelatedFacts(body, currentFactId),
      href: `#/facts/${slugifyFactId(currentFactId)}`,
    });
  }

  for (const line of source.markdown.split(/\r?\n/u)) {
    const factHeading = factHeadingPattern.exec(line);

    if (factHeading?.[1] !== undefined) {
      flushFact();
      currentFactId = factHeading[1];
      currentLines = [];
      continue;
    }

    if (currentFactId !== undefined) {
      currentLines.push(line);
    }
  }

  flushFact();

  return facts;
}

function toContentDocument(source: MarkdownSource): GeneratedContentDocument {
  const [section, ...fileParts] = source.repoPath.split("/");

  if (
    section !== "docs" &&
    section !== "regulations" &&
    section !== "terminology" &&
    section !== "tutorials"
  ) {
    throw new Error(`${source.repoPath} is not a content section path.`);
  }

  const fileName = fileParts.join("/");

  return {
    section,
    fileName,
    filePath: source.repoPath,
    title:
      source.frontmatter?.title ?? titleFromMarkdown(source.markdown, fileName),
    markdown: source.markdown,
    ...(source.frontmatter === undefined
      ? {}
      : { metadata: source.frontmatter }),
  };
}

function buildFlashcardDeck(
  deckSource: MarkdownSource,
  cardSources: readonly MarkdownSource[],
  factIds: ReadonlySet<string>,
  contentIds: Set<string>,
): GeneratedFlashcardDeck {
  const deck = requireFrontmatter(deckSource, new Set(["flashcard_deck"]));
  assertUniqueId(deck.id, contentIds, deckSource.repoPath);
  const deckCards = cardSources.map((cardSource) => {
    const metadata = requireFrontmatter(cardSource, new Set(["flashcard"]));
    const sourceFacts = metadata.source_facts ?? [];
    const recommendedPaths = metadata.recommended_learner_tasks ?? [];

    assertUniqueId(metadata.id, contentIds, cardSource.repoPath);
    assertKnownSourceFacts(sourceFacts, factIds, cardSource.repoPath);

    if (recommendedPaths.length === 0) {
      throw new Error(
        `${cardSource.repoPath} must recommend at least one path.`,
      );
    }

    return {
      sortOrder: metadata.sort_order ?? Number.MAX_SAFE_INTEGER,
      card: {
        id: metadata.id,
        front: extractSection(
          cardSource.markdown,
          "Front",
          cardSource.repoPath,
        ),
        back: extractSection(cardSource.markdown, "Back", cardSource.repoPath),
        sourceFacts,
        recommendedPaths,
      },
    };
  });

  return {
    id: deck.id,
    title: deck.title,
    topic: deck.topic ?? deck.title,
    cards: deckCards
      .sort((left, right) => {
        const sortDelta = left.sortOrder - right.sortOrder;

        return sortDelta === 0
          ? left.card.id.localeCompare(right.card.id)
          : sortDelta;
      })
      .map((entry) => entry.card),
    ...(deck.source_reviews === undefined
      ? {}
      : { sourceReviews: deck.source_reviews }),
  };
}

function buildQuizBank(
  source: MarkdownSource,
  factIds: ReadonlySet<string>,
  learnerTaskIds: ReadonlySet<string>,
  contentIds: Set<string>,
): GeneratedQuizBank {
  const metadata = requireFrontmatter(source, new Set(["quiz_bank"]));
  const questions = metadata.questions;

  if (questions === undefined) {
    throw new Error(`${source.repoPath} must define quiz questions.`);
  }

  assertUniqueId(metadata.id, contentIds, source.repoPath);

  for (const difficulty of ["easy", "medium", "hard"] as const) {
    for (const question of questions[difficulty]) {
      assertUniqueId(question.id, contentIds, source.repoPath);
      assertKnownSourceFacts(question.source_facts, factIds, question.id);

      for (const learnerTaskId of question.recommended_learner_tasks) {
        if (!learnerTaskIds.has(learnerTaskId)) {
          throw new Error(
            `${question.id} references unknown task ${learnerTaskId}.`,
          );
        }
      }
    }
  }

  return {
    id: metadata.id,
    title: metadata.title,
    estimated_minutes: metadata.estimated_minutes ?? 20,
    audience: metadata.audience ?? "",
    description: metadata.description ?? "",
    questions,
  };
}

function buildExamPack(
  source: MarkdownSource,
  factIds: ReadonlySet<string>,
  learnerTaskIds: ReadonlySet<string>,
  contentIds: Set<string>,
): GeneratedExamPack {
  const metadata = requireFrontmatter(source, new Set(["exam_pack"]));
  const cards = metadata.cards;

  if (metadata.mode !== "self_assessed") {
    throw new Error(`${source.repoPath} must use self_assessed mode.`);
  }

  if (cards === undefined) {
    throw new Error(`${source.repoPath} must define exam cards.`);
  }

  assertUniqueId(metadata.id, contentIds, source.repoPath);

  for (const card of cards) {
    assertUniqueId(card.id, contentIds, source.repoPath);
    assertKnownSourceFacts(card.source_facts, factIds, card.id);

    for (const learnerTaskId of card.recommended_learner_tasks) {
      if (!learnerTaskIds.has(learnerTaskId)) {
        throw new Error(`${card.id} references unknown task ${learnerTaskId}.`);
      }
    }
  }

  return {
    id: metadata.id,
    title: metadata.title,
    mode: "self_assessed",
    estimated_minutes_per_card: metadata.estimated_minutes_per_card ?? 120,
    description: metadata.description ?? "",
    cards,
  };
}

async function buildCatalog(): Promise<Catalog> {
  const contentIds = new Set<string>();
  const docSources = await Promise.all(
    (await listFiles(join(repoRoot, "docs"), new Set([".md"]))).map((path) =>
      readMarkdown(path),
    ),
  );
  const regulationSources = await Promise.all(
    (await listFiles(join(repoRoot, "regulations"), new Set([".md"]))).map(
      (path) => readMarkdown(path),
    ),
  );
  const terminologySources = await Promise.all(
    (await listFiles(join(repoRoot, "terminology"), new Set([".md"]))).map(
      (path) => readMarkdown(path),
    ),
  );
  const tutorialSources = await Promise.all(
    (await listFiles(join(repoRoot, "tutorials"), new Set([".md"]))).map(
      (path) => readMarkdown(path),
    ),
  );
  const factSources = await Promise.all(
    (await listFiles(join(repoRoot, "facts"), new Set([".md"]))).map((path) =>
      readMarkdown(path),
    ),
  );
  const factCatalog = factSources.flatMap((source) => parseFactFile(source));
  const factIds = new Set(factCatalog.map((fact) => fact.id));

  for (const source of tutorialSources) {
    const metadata = requireFrontmatter(
      source,
      new Set([
        "tutorial",
        "tutorial_index",
        "tutorial_recipe",
        "learner_task",
      ]),
    );

    assertUniqueId(metadata.id, contentIds, source.repoPath);

    if (
      metadata.source_facts !== undefined &&
      metadata.source_facts.length > 0
    ) {
      assertKnownSourceFacts(metadata.source_facts, factIds, source.repoPath);
    }
  }

  for (const source of terminologySources) {
    const metadata = requireFrontmatter(
      source,
      new Set(["terminology", "terminology_index"]),
    );

    assertUniqueId(metadata.id, contentIds, source.repoPath);
  }

  for (const source of factSources) {
    const metadata = requireFrontmatter(
      source,
      new Set(["fact_index", "fact_register"]),
    );

    assertUniqueId(metadata.id, contentIds, source.repoPath);
  }

  for (const fact of factCatalog) {
    assertUniqueId(fact.id, contentIds, fact.filePath);
  }

  const learnerTaskIds = new Set(
    tutorialSources.flatMap((source) =>
      source.frontmatter?.content_type === "learner_task"
        ? [source.frontmatter.id]
        : [],
    ),
  );
  const flashcardSources = await Promise.all(
    (await listFiles(join(repoRoot, "flashcards"), new Set([".md"]))).map(
      (path) => readMarkdown(path),
    ),
  );
  const deckSources = flashcardSources.filter((source) =>
    source.repoPath.endsWith("/_deck.md"),
  );
  const flashcardDecks = deckSources.map((deckSource) => {
    const deckDir = dirname(deckSource.absolutePath);
    const cardSources = flashcardSources.filter(
      (source) =>
        dirname(source.absolutePath) === deckDir &&
        !source.repoPath.endsWith("/_deck.md"),
    );

    return buildFlashcardDeck(deckSource, cardSources, factIds, contentIds);
  });
  const quizSources = await Promise.all(
    (await listFiles(join(repoRoot, "quizzes"), new Set([".md"]))).map((path) =>
      readMarkdown(path),
    ),
  );
  const examSources = await Promise.all(
    (await listFiles(join(repoRoot, "exams"), new Set([".md"]))).map((path) =>
      readMarkdown(path),
    ),
  );
  const quizBanks = quizSources.map((source) =>
    buildQuizBank(source, factIds, learnerTaskIds, contentIds),
  );
  const examPacks = examSources.map((source) =>
    buildExamPack(source, factIds, learnerTaskIds, contentIds),
  );

  return {
    contentDocuments: [
      ...docSources,
      ...regulationSources,
      ...terminologySources,
      ...tutorialSources,
    ]
      .map((source) => toContentDocument(source))
      .sort((left, right) => left.filePath.localeCompare(right.filePath)),
    factCatalog: factCatalog.sort((left, right) =>
      left.id.localeCompare(right.id),
    ),
    flashcardDecks: flashcardDecks.sort((left, right) =>
      left.title.localeCompare(right.title),
    ),
    quizBanks: quizBanks.sort((left, right) =>
      left.title.localeCompare(right.title),
    ),
    examPacks: examPacks.sort((left, right) =>
      left.title.localeCompare(right.title),
    ),
  };
}

function toTypeScript(catalog: Catalog): string {
  return [
    "/* This file is generated by app/scripts/generate-content-catalog.ts. */",
    "/* Do not edit by hand. */",
    "",
    `export const generatedContentDocuments = ${JSON.stringify(
      catalog.contentDocuments,
      null,
      2,
    )} as const;`,
    "",
    `export const generatedFactCatalog = ${JSON.stringify(
      catalog.factCatalog,
      null,
      2,
    )} as const;`,
    "",
    `export const generatedFlashcardDecks = ${JSON.stringify(
      catalog.flashcardDecks,
      null,
      2,
    )} as const;`,
    "",
    `export const generatedQuizBanks = ${JSON.stringify(
      catalog.quizBanks,
      null,
      2,
    )} as const;`,
    "",
    `export const generatedExamPacks = ${JSON.stringify(
      catalog.examPacks,
      null,
      2,
    )} as const;`,
    "",
  ].join("\n");
}

const catalog = await buildCatalog();
const generatedSource = toTypeScript(catalog);

if (process.argv.includes("--check")) {
  const currentSource = await readFile(generatedPath, "utf8");

  if (currentSource !== generatedSource) {
    throw new Error(
      "Generated content catalog is stale. Run content:generate.",
    );
  }
} else {
  await mkdir(dirname(generatedPath), { recursive: true });
  await writeFile(generatedPath, generatedSource);
}
