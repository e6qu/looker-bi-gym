import assert from "node:assert/strict";
import { Database } from "bun:sqlite";
import { readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { buildFactDatabase } from "./fact-database";

type Difficulty = "easy" | "medium" | "hard";

type QuizQuestion = {
  readonly id: string;
  readonly type: string;
  readonly source_facts: readonly string[];
  readonly prompt: string;
  readonly options?: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
  }>;
  readonly answer: string | number | readonly string[];
  readonly explanation: string;
};

type QuizBank = {
  readonly id: string;
  readonly questions: Readonly<Record<Difficulty, readonly QuizQuestion[]>>;
};

type CountRow = {
  readonly count: number;
};

type FactTextRow = {
  readonly text: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const quizDir = join(repoRoot, "quizzes");
const outputPath = join(tmpdir(), "looker-bi-gym-quiz-facts.sqlite");
const difficulties = ["easy", "medium", "hard"] as const;

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, context: string): string {
  if (typeof value !== "string") {
    throw new TypeError(`${context} must be a string.`);
  }

  assert.ok(value.length > 0, `${context} must not be empty.`);

  return value;
}

function requireStringArray(
  value: unknown,
  context: string,
): readonly string[] {
  assert.ok(Array.isArray(value), `${context} must be an array.`);
  const entries: readonly unknown[] = value;

  return entries.map((entry, index) =>
    requireString(entry, `${context}[${index}]`),
  );
}

function parseAnswer(
  value: unknown,
  context: string,
): string | number | readonly string[] {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return requireStringArray(value, context);
}

function parseOptions(
  value: unknown,
  context: string,
): ReadonlyArray<{ readonly id: string; readonly label: string }> | undefined {
  if (value === undefined) {
    return undefined;
  }

  assert.ok(Array.isArray(value), `${context} must be an array.`);
  const entries: readonly unknown[] = value;

  return entries.map((option, index) => {
    assert.ok(isRecord(option), `${context}[${index}] must be a mapping.`);

    return {
      id: requireString(option["id"], `${context}[${index}].id`),
      label: requireString(option["label"], `${context}[${index}].label`),
    };
  });
}

function parseQuestion(value: unknown, context: string): QuizQuestion {
  assert.ok(isRecord(value), `${context} must be a mapping.`);
  const options = parseOptions(value["options"], `${context}.options`);

  return {
    id: requireString(value["id"], `${context}.id`),
    type: requireString(value["type"], `${context}.type`),
    source_facts: requireStringArray(
      value["source_facts"],
      `${context}.source_facts`,
    ),
    prompt: requireString(value["prompt"], `${context}.prompt`),
    ...(options === undefined ? {} : { options }),
    answer: parseAnswer(value["answer"], `${context}.answer`),
    explanation: requireString(value["explanation"], `${context}.explanation`),
  };
}

function parseQuizBank(source: string, context: string): QuizBank {
  const parsed = parse(source) as unknown;

  assert.ok(isRecord(parsed), `${context} must be a mapping.`);
  const questions = parsed["questions"];
  assert.ok(isRecord(questions), `${context}.questions must be a mapping.`);

  return {
    id: requireString(parsed["id"], `${context}.id`),
    questions: {
      easy: parseQuestionArray(questions["easy"], `${context}.questions.easy`),
      medium: parseQuestionArray(
        questions["medium"],
        `${context}.questions.medium`,
      ),
      hard: parseQuestionArray(questions["hard"], `${context}.questions.hard`),
    },
  };
}

function parseQuestionArray(
  value: unknown,
  context: string,
): readonly QuizQuestion[] {
  assert.ok(Array.isArray(value), `${context} must be an array.`);

  return value.map((question, index) =>
    parseQuestion(question, `${context}[${index}]`),
  );
}

function formatAnswer(answer: QuizQuestion["answer"]): string {
  return Array.isArray(answer) ? answer.join(",") : String(answer);
}

function normalizeForSearch(value: string): string {
  return value.toLowerCase().replace(/\s+/gu, " ");
}

async function readQuizBanks(): Promise<readonly QuizBank[]> {
  const quizFiles = (await readdir(quizDir))
    .filter((fileName) => fileName.endsWith(".yaml"))
    .sort();

  return Promise.all(
    quizFiles.map(async (fileName) =>
      parseQuizBank(await readFile(join(quizDir, fileName), "utf8"), fileName),
    ),
  );
}

function createQuizTables(database: Database): void {
  database.run(
    `CREATE TEMP TABLE quiz_questions (
      quiz_id TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      question_id TEXT NOT NULL,
      question_type TEXT NOT NULL,
      prompt TEXT NOT NULL,
      answer_value TEXT NOT NULL,
      explanation TEXT NOT NULL,
      PRIMARY KEY (quiz_id, question_id)
    )`,
  );
  database.run(
    `CREATE TEMP TABLE quiz_question_facts (
      quiz_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      fact_id TEXT NOT NULL,
      PRIMARY KEY (quiz_id, question_id, fact_id)
    )`,
  );
  database.run(
    `CREATE TEMP TABLE quiz_options (
      quiz_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      option_id TEXT NOT NULL,
      label TEXT NOT NULL,
      PRIMARY KEY (quiz_id, question_id, option_id)
    )`,
  );
}

function insertQuizBanks(
  database: Database,
  quizBanks: readonly QuizBank[],
): void {
  const insertQuestion = database.query(
    `INSERT INTO quiz_questions (
      quiz_id,
      difficulty,
      question_id,
      question_type,
      prompt,
      answer_value,
      explanation
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertQuestionFact = database.query(
    `INSERT INTO quiz_question_facts (quiz_id, question_id, fact_id)
     VALUES (?, ?, ?)`,
  );
  const insertOption = database.query(
    `INSERT INTO quiz_options (quiz_id, question_id, option_id, label)
     VALUES (?, ?, ?, ?)`,
  );
  const insertAll = database.transaction(() => {
    for (const quizBank of quizBanks) {
      for (const difficulty of difficulties) {
        for (const question of quizBank.questions[difficulty]) {
          insertQuestion.run(
            quizBank.id,
            difficulty,
            question.id,
            question.type,
            question.prompt,
            formatAnswer(question.answer),
            question.explanation,
          );

          for (const factId of question.source_facts) {
            insertQuestionFact.run(quizBank.id, question.id, factId);
          }

          for (const option of question.options ?? []) {
            insertOption.run(quizBank.id, question.id, option.id, option.label);
          }
        }
      }
    }
  });

  insertAll();
}

function assertNoRows(database: Database, sql: string, message: string): void {
  const row = database.query<CountRow, []>(sql).get();

  assert.equal(row?.count, 0, message);
}

function assertExplanationMentionsCitedFacts(
  quizBanks: readonly QuizBank[],
): void {
  const missingMentions: string[] = [];

  for (const quizBank of quizBanks) {
    for (const difficulty of difficulties) {
      for (const question of quizBank.questions[difficulty]) {
        for (const factId of question.source_facts) {
          if (!question.explanation.includes(factId)) {
            missingMentions.push(`${quizBank.id}:${question.id}:${factId}`);
          }
        }
      }
    }
  }

  assert.deepEqual(
    missingMentions,
    [],
    `Quiz explanations must mention each cited fact:\n${missingMentions.join("\n")}`,
  );
}

function assertNumericAnswersAppearInCitedFactText(
  database: Database,
  quizBanks: readonly QuizBank[],
): void {
  const missingNumericEvidence: string[] = [];
  const factTextQuery = database.query<FactTextRow, [string]>(
    `SELECT statement || ' ' || source_quote || ' ' || derived_implication || ' ' || body AS text
     FROM facts
     WHERE id = ?`,
  );

  for (const quizBank of quizBanks) {
    for (const difficulty of difficulties) {
      for (const question of quizBank.questions[difficulty]) {
        if (typeof question.answer !== "number") {
          continue;
        }

        const answerText = String(question.answer);
        const hasNumericEvidence = question.source_facts.some((factId) => {
          const row = factTextQuery.get(factId);

          return normalizeForSearch(row?.text ?? "").includes(answerText);
        });

        if (!hasNumericEvidence) {
          missingNumericEvidence.push(
            `${quizBank.id}:${question.id}:${answerText}`,
          );
        }
      }
    }
  }

  assert.deepEqual(
    missingNumericEvidence,
    [],
    `Numeric quiz answers must appear in cited fact text:\n${missingNumericEvidence.join("\n")}`,
  );
}

const quizBanks = await readQuizBanks();
const summary = await buildFactDatabase({ repoRoot, outputPath });
const database = new Database(outputPath);

database.run("PRAGMA foreign_keys = ON");
createQuizTables(database);
insertQuizBanks(database, quizBanks);

assert.ok(summary.factTripleCount > 0, "Facts database must include triples.");
assertNoRows(
  database,
  `SELECT COUNT(*) AS count
   FROM quiz_question_facts
   LEFT JOIN facts ON quiz_question_facts.fact_id = facts.id
   WHERE facts.id IS NULL`,
  "Every quiz question fact must resolve to a fact database node.",
);
assertNoRows(
  database,
  `SELECT COUNT(*) AS count
   FROM quiz_question_facts
   LEFT JOIN fact_sources ON quiz_question_facts.fact_id = fact_sources.fact_id
   WHERE fact_sources.source_id IS NULL`,
  "Every quiz question fact must have at least one source edge.",
);
assertNoRows(
  database,
  `SELECT COUNT(*) AS count
   FROM quiz_question_facts
   LEFT JOIN triples
     ON quiz_question_facts.fact_id = triples.subject
    AND triples.predicate = 'SUPPORTED_BY_SOURCE'
   WHERE triples.object IS NULL`,
  "Every quiz question fact must have a SUPPORTED_BY_SOURCE triple.",
);
assertNoRows(
  database,
  `SELECT COUNT(*) AS count
   FROM quiz_question_facts
   LEFT JOIN triples outgoing
     ON quiz_question_facts.fact_id = outgoing.subject
    AND outgoing.predicate = 'RELATED_TO_FACT'
   LEFT JOIN triples incoming
     ON quiz_question_facts.fact_id = incoming.object
    AND incoming.predicate = 'RELATED_TO_FACT'
   WHERE outgoing.object IS NULL
     AND incoming.subject IS NULL`,
  "Every quiz question fact must participate in the fact graph.",
);

assertExplanationMentionsCitedFacts(quizBanks);
assertNumericAnswersAppearInCitedFactText(database, quizBanks);

database.close();
