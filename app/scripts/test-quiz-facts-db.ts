import assert from "node:assert/strict";
import { Database } from "bun:sqlite";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { quizBanks } from "../src/learningContent";
import { buildFactDatabase } from "facts-db-app";

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
const outputPath = join(tmpdir(), "looker-bi-gym-quiz-facts.sqlite");
const difficulties = ["easy", "medium", "hard"] as const;

function formatAnswer(answer: QuizQuestion["answer"]): string {
  return Array.isArray(answer) ? answer.join(",") : String(answer);
}

function normalizeForSearch(value: string): string {
  return value.toLowerCase().replace(/\s+/gu, " ");
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
