import type { ChallengeManifest, ChallengeQuestion } from './challengeTypes';

export type QuizResponse = string | readonly string[];

export type QuizAnswerState = Readonly<Record<string, QuizResponse>>;

export type QuestionEvaluation = {
  readonly questionId: string;
  readonly isAnswered: boolean;
  readonly isCorrect: boolean;
};

export type QuizEvaluation = {
  readonly questions: readonly QuestionEvaluation[];
  readonly isComplete: boolean;
};

const supportedQuizQuestionTypes: ReadonlySet<string> = new Set([
  'multiple-choice',
  'select-all',
  'numeric',
]);

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function sameStringSet(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const leftValues = new Set(left);

  if (leftValues.size !== left.length) {
    return false;
  }

  return right.every((item) => leftValues.has(item));
}

function parseNumericResponse(response: QuizResponse | undefined): number | undefined {
  if (typeof response !== 'string' || response.trim().length === 0) {
    return undefined;
  }

  const numericValue = Number(response);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

export function isSupportedQuizQuestion(question: ChallengeQuestion): boolean {
  return supportedQuizQuestionTypes.has(question.type);
}

export function evaluateQuestion(
  question: ChallengeQuestion,
  response: QuizResponse | undefined,
): QuestionEvaluation {
  if (response === undefined) {
    return { questionId: question.id, isAnswered: false, isCorrect: false };
  }

  switch (question.type) {
    case 'multiple-choice':
      return {
        questionId: question.id,
        isAnswered: typeof response === 'string' && response.length > 0,
        isCorrect: typeof response === 'string' && response === question.answer,
      };
    case 'select-all':
      return {
        questionId: question.id,
        isAnswered: isStringArray(response) && response.length > 0,
        isCorrect:
          isStringArray(response) &&
          isStringArray(question.answer) &&
          sameStringSet(response, question.answer),
      };
    case 'numeric': {
      const numericResponse = parseNumericResponse(response);
      const tolerance = question.tolerance ?? 0;
      const expected = typeof question.answer === 'number' ? question.answer : undefined;

      return {
        questionId: question.id,
        isAnswered: numericResponse !== undefined,
        isCorrect:
          numericResponse !== undefined &&
          expected !== undefined &&
          Math.abs(numericResponse - expected) <= tolerance,
      };
    }
    default:
      return { questionId: question.id, isAnswered: true, isCorrect: false };
  }
}

export function evaluateQuiz(
  challenge: ChallengeManifest,
  answers: QuizAnswerState,
): QuizEvaluation {
  const evaluation = evaluateChallengeQuestions(challenge, answers);

  return {
    questions: evaluation.questions,
    isComplete: challenge.mode === 'quiz' && evaluation.isComplete,
  };
}

export function evaluateChallengeQuestions(
  challenge: ChallengeManifest,
  answers: QuizAnswerState,
): QuizEvaluation {
  const questions = challenge.questions.map((question) =>
    evaluateQuestion(question, answers[question.id]),
  );

  return {
    questions,
    isComplete:
      questions.length > 0 &&
      questions.every((question) => question.isAnswered && question.isCorrect),
  };
}
