import { parse } from "yaml";

export type Difficulty = "easy" | "medium" | "hard";

export type QuizBankQuestionType = "multiple_choice" | "select_all" | "numeric";

export type QuizBankOption = {
  readonly id: string;
  readonly label: string;
};

export type QuizBankQuestion = {
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

export type QuizBank = {
  readonly id: string;
  readonly title: string;
  readonly estimated_minutes: number;
  readonly audience: string;
  readonly description: string;
  readonly questions: Readonly<Record<Difficulty, readonly QuizBankQuestion[]>>;
};

export type ExamCard = {
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

export type ExamPack = {
  readonly id: string;
  readonly title: string;
  readonly mode: "self_assessed";
  readonly estimated_minutes_per_card: number;
  readonly description: string;
  readonly cards: readonly ExamCard[];
};

const rawQuizBanks = import.meta.glob<string>("../../quizzes/*.yaml", {
  eager: true,
  import: "default",
  query: "?raw",
});

const rawExamPacks = import.meta.glob<string>("../../exams/*.yaml", {
  eager: true,
  import: "default",
  query: "?raw",
});

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

function parseQuizOption(value: unknown, context: string): QuizBankOption {
  const record = requireRecord(value, context);

  return {
    id: requireString(record["id"], `${context}.id`),
    label: requireString(record["label"], `${context}.label`),
  };
}

function parseQuizOptions(
  value: unknown,
  context: string,
): readonly QuizBankOption[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array.`);
  }

  const options: readonly unknown[] = value;

  return options.map((option, index) =>
    parseQuizOption(option, `${context}[${index}]`),
  );
}

function parseQuestionType(
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
  const questionType = parseQuestionType(record["type"], `${context}.type`);
  const rawOptions = record["options"];
  const options =
    rawOptions === undefined
      ? undefined
      : parseQuizOptions(rawOptions, `${context}.options`);

  if (rawOptions !== undefined && options?.length === 0) {
    throw new Error(`${context}.options must be a non-empty array.`);
  }

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

function parseDifficultyQuestions(
  value: unknown,
  difficulty: Difficulty,
  context: string,
): readonly QuizBankQuestion[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context}.${difficulty} must be a question array.`);
  }

  const questions: readonly unknown[] = value;

  return questions.map((question, index) =>
    parseQuizQuestion(question, `${context}.${difficulty}[${index}]`),
  );
}

function parseQuizBank(source: string, importPath: string): QuizBank {
  const record = requireRecord(parse(source) as unknown, importPath);
  const questions = requireRecord(
    record["questions"],
    `${importPath}.questions`,
  );

  return {
    id: requireString(record["id"], `${importPath}.id`),
    title: requireString(record["title"], `${importPath}.title`),
    estimated_minutes: requireNumber(
      record["estimated_minutes"],
      `${importPath}.estimated_minutes`,
    ),
    audience: requireString(record["audience"], `${importPath}.audience`),
    description: requireString(
      record["description"],
      `${importPath}.description`,
    ),
    questions: {
      easy: parseDifficultyQuestions(questions["easy"], "easy", importPath),
      medium: parseDifficultyQuestions(
        questions["medium"],
        "medium",
        importPath,
      ),
      hard: parseDifficultyQuestions(questions["hard"], "hard", importPath),
    },
  };
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

function parseExamPack(source: string, importPath: string): ExamPack {
  const record = requireRecord(parse(source) as unknown, importPath);
  const mode = requireString(record["mode"], `${importPath}.mode`);

  if (mode !== "self_assessed") {
    throw new Error(`${importPath}.mode must be self_assessed.`);
  }

  const rawCards = record["cards"];

  if (!Array.isArray(rawCards)) {
    throw new Error(`${importPath}.cards must be an array.`);
  }

  const cards: readonly unknown[] = rawCards;

  return {
    id: requireString(record["id"], `${importPath}.id`),
    title: requireString(record["title"], `${importPath}.title`),
    mode,
    estimated_minutes_per_card: requireNumber(
      record["estimated_minutes_per_card"],
      `${importPath}.estimated_minutes_per_card`,
    ),
    description: requireString(
      record["description"],
      `${importPath}.description`,
    ),
    cards: cards.map((card, index) =>
      parseExamCard(card, `${importPath}.cards[${index}]`),
    ),
  };
}

export const quizBanks: readonly QuizBank[] = Object.entries(rawQuizBanks)
  .map(([importPath, source]) => parseQuizBank(source, importPath))
  .sort((left, right) => left.title.localeCompare(right.title));

export const examPacks: readonly ExamPack[] = Object.entries(rawExamPacks)
  .map(([importPath, source]) => parseExamPack(source, importPath))
  .sort((left, right) => left.title.localeCompare(right.title));
