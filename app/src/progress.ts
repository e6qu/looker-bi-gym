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

export type ProgressExportDataset = {
  readonly dataset_id: string;
  readonly dataset_version: string;
};

export type ProgressExportChallenge = {
  readonly challenge_id: string;
  readonly title: string | null;
  readonly mode: ChallengeManifest['mode'] | null;
  readonly completed_at: string;
  readonly flag: string;
  readonly dataset_versions: readonly ProgressExportDataset[];
  readonly passed_check_ids: readonly string[];
  readonly passed_question_ids: readonly string[];
};

export type LearnerProgressExport = {
  readonly format: 'looker-bi-gym.progress-export.v1';
  readonly exported_at: string;
  readonly app_version: string;
  readonly content_version: string;
  readonly storage_version: LearnerProgressState['version'];
  readonly completed_challenge_ids: readonly string[];
  readonly completed_challenges: readonly ProgressExportChallenge[];
  readonly privacy: {
    readonly created_locally: true;
    readonly backend_required: false;
    readonly includes_credentials: false;
    readonly includes_real_banking_data: false;
    readonly includes_raw_answers: false;
  };
  readonly learner_notes?: string;
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

function getDatasetVersions(challenge: ChallengeManifest | undefined): readonly ProgressExportDataset[] {
  if (challenge === undefined) {
    return [];
  }

  return challenge.inputs
    .filter(
      (input): input is typeof input & Required<Pick<typeof input, 'dataset_id' | 'dataset_version'>> =>
        typeof input.dataset_id === 'string' && typeof input.dataset_version === 'string',
    )
    .map((input) => ({
      dataset_id: input.dataset_id,
      dataset_version: input.dataset_version,
    }));
}

export function buildLearnerProgressExport(
  progress: LearnerProgressState,
  challenges: readonly ChallengeManifest[],
  options: {
    readonly appVersion: string;
    readonly contentVersion: string;
    readonly exportedAt?: string;
    readonly learnerNotes?: string;
  },
): LearnerProgressExport {
  const challengesById = new Map(challenges.map((challenge) => [challenge.id, challenge] as const));
  const completedChallenges = Object.entries(progress.challenges)
    .filter((entry) => entry[1].completed)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([challengeId, challengeProgress]) => {
      const challenge = challengesById.get(challengeId);

      return {
        challenge_id: challengeId,
        title: challenge?.title ?? null,
        mode: challenge?.mode ?? null,
        completed_at: challengeProgress.completedAt,
        flag: challengeProgress.flag,
        dataset_versions: getDatasetVersions(challenge),
        passed_check_ids: challengeProgress.passedCheckIds,
        passed_question_ids: challengeProgress.passedQuestionIds,
      };
    });
  const baseExport = {
    format: 'looker-bi-gym.progress-export.v1',
    exported_at: options.exportedAt ?? new Date().toISOString(),
    app_version: options.appVersion,
    content_version: options.contentVersion,
    storage_version: progress.version,
    completed_challenge_ids: completedChallenges.map((challenge) => challenge.challenge_id),
    completed_challenges: completedChallenges,
    privacy: {
      created_locally: true,
      backend_required: false,
      includes_credentials: false,
      includes_real_banking_data: false,
      includes_raw_answers: false,
    },
  } satisfies Omit<LearnerProgressExport, 'learner_notes'>;
  const learnerNotes = options.learnerNotes?.trim() ?? '';

  return learnerNotes.length > 0
    ? { ...baseExport, learner_notes: learnerNotes }
    : baseExport;
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
