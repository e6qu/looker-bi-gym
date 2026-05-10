import {
  generatedExamPacks,
  generatedQuizBanks,
} from "./generated/contentCatalog";

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

export const quizBanks: readonly QuizBank[] = generatedQuizBanks;

export const examPacks: readonly ExamPack[] = generatedExamPacks;
