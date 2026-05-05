import type { ChallengeManifest } from './challengeTypes';
import type { QuizEvaluation } from './quiz';
import type { ValidationEvaluation } from './validators';

export type ChallengeProgress = {
  readonly completed: boolean;
  readonly completedAt: string;
  readonly flag: string;
  readonly passedCheckIds: readonly string[];
  readonly passedQuestionIds: readonly string[];
};

export type LearnerProgressState = {
  readonly version: 1;
  readonly challenges: Readonly<Record<string, ChallengeProgress>>;
};

export type ChallengeCompletionInput = {
  readonly challengeId: string;
  readonly flag: string;
  readonly passedCheckIds: readonly string[];
  readonly passedQuestionIds: readonly string[];
  readonly completedAt?: string;
};

export type BrowserStorage = {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
  readonly removeItem: (key: string) => void;
};

const progressStorageKey = 'looker-bi-gym.progress.v1';
const legacyQuizProgressStorageKey = 'looker-bi-gym.quiz-progress.v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isChallengeProgress(value: unknown): value is ChallengeProgress {
  return (
    isRecord(value) &&
    value['completed'] === true &&
    typeof value['completedAt'] === 'string' &&
    typeof value['flag'] === 'string' &&
    isStringArray(value['passedCheckIds']) &&
    isStringArray(value['passedQuestionIds'])
  );
}

function isLearnerProgressState(value: unknown): value is LearnerProgressState {
  return (
    isRecord(value) &&
    value['version'] === 1 &&
    isRecord(value['challenges']) &&
    Object.values(value['challenges']).every((item) => isChallengeProgress(item))
  );
}

function readJsonStorage(storage: BrowserStorage, key: string): unknown {
  const storedValue = storage.getItem(key);

  if (storedValue === null) {
    return undefined;
  }

  try {
    return JSON.parse(storedValue) as unknown;
  } catch {
    return undefined;
  }
}

function readLegacyQuizProgress(storage: BrowserStorage): Readonly<Record<string, ChallengeProgress>> {
  const parsed = readJsonStorage(storage, legacyQuizProgressStorageKey);

  if (!isRecord(parsed)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(parsed)
      .filter((entry) => entry[1] === true)
      .map(([challengeId]) => [
        challengeId,
        buildCompletedChallengeProgress({
          challengeId,
          flag: `legacy-${challengeId}`,
          passedCheckIds: [],
          passedQuestionIds: [],
        }),
      ]),
  );
}

export function buildCompletedChallengeProgress(
  input: ChallengeCompletionInput,
): ChallengeProgress {
  return {
    completed: true,
    completedAt: input.completedAt ?? new Date().toISOString(),
    flag: input.flag,
    passedCheckIds: input.passedCheckIds,
    passedQuestionIds: input.passedQuestionIds,
  };
}

export function getCompletedChallengeIds(progress: LearnerProgressState): ReadonlySet<string> {
  return new Set(
    Object.entries(progress.challenges)
      .filter((entry) => entry[1].completed)
      .map((entry) => entry[0]),
  );
}

export function readLearnerProgress(storage: BrowserStorage): LearnerProgressState {
  const parsed = readJsonStorage(storage, progressStorageKey);

  if (isLearnerProgressState(parsed)) {
    return parsed;
  }

  return {
    version: 1,
    challenges: readLegacyQuizProgress(storage),
  };
}

export function writeLearnerProgress(
  progress: LearnerProgressState,
  storage: BrowserStorage,
): void {
  storage.setItem(progressStorageKey, JSON.stringify(progress));
}

export function completeChallenge(
  progress: LearnerProgressState,
  input: ChallengeCompletionInput,
): LearnerProgressState {
  return {
    version: 1,
    challenges: {
      ...progress.challenges,
      [input.challengeId]: buildCompletedChallengeProgress(input),
    },
  };
}

export function resetLearnerProgress(storage: BrowserStorage): LearnerProgressState {
  storage.removeItem(progressStorageKey);
  storage.removeItem(legacyQuizProgressStorageKey);
  return { version: 1, challenges: {} };
}

export function getPassedQuestionIds(evaluation: QuizEvaluation): readonly string[] {
  return evaluation.questions
    .filter((question) => question.isAnswered && question.isCorrect)
    .map((question) => question.questionId);
}

export function maybeCreateLocalFlag(
  challenge: ChallengeManifest,
  questionEvaluation: QuizEvaluation,
  checkEvaluation?: ValidationEvaluation,
): ChallengeCompletionInput | undefined {
  const checksPassed = checkEvaluation?.requiredPassed ?? true;
  const questionsPassed =
    challenge.questions.length === 0 ? true : questionEvaluation.isComplete;

  if (!checksPassed || !questionsPassed) {
    return undefined;
  }

  return {
    challengeId: challenge.id,
    flag: challenge.flag.id,
    passedCheckIds: checkEvaluation?.passedRequiredCheckIds ?? [],
    passedQuestionIds: getPassedQuestionIds(questionEvaluation),
  };
}
