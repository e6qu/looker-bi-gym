import type { ChallengeManifest } from "./challengeTypes";
import type { QuizEvaluation } from "./quiz";
import type { ValidationEvaluation } from "./validators";

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
  readonly challenge_version: string | null;
  readonly title: string | null;
  readonly mode: ChallengeManifest["mode"] | null;
  readonly completed_at: string;
  readonly flag: string;
  readonly dataset_versions: readonly ProgressExportDataset[];
  readonly passed_check_ids: readonly string[];
  readonly passed_question_ids: readonly string[];
};

export type LearnerProgressExport = {
  readonly format: "looker-bi-gym.progress-export.v1";
  readonly exported_at: string;
  readonly app_version: string;
  readonly content_version: string;
  readonly storage_version: LearnerProgressState["version"];
  readonly completed_challenge_ids: readonly string[];
  readonly completed_challenges: readonly ProgressExportChallenge[];
  readonly privacy: {
    readonly created_locally: true;
    readonly backend_required: false;
    readonly state_scope: "browser-only";
    readonly storage_mediums: readonly ["localStorage", "same-site-cookie"];
    readonly includes_credentials: false;
    readonly includes_real_banking_data: false;
    readonly includes_raw_answers: false;
  };
  readonly learner_notes?: string;
};

export type LearnerProgressImportPreview = {
  readonly exportedAt: string;
  readonly appVersion: string;
  readonly contentVersion: string;
  readonly importedChallengeIds: readonly string[];
  readonly unknownChallengeIds: readonly string[];
  readonly progress: LearnerProgressState;
  readonly warnings: readonly string[];
};

export type LearnerProgressImportResult =
  | {
      readonly status: "valid";
      readonly preview: LearnerProgressImportPreview;
    }
  | {
      readonly status: "invalid";
      readonly message: string;
    };

type LearnerProgressImportInvalid = Extract<
  LearnerProgressImportResult,
  { readonly status: "invalid" }
>;

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

export type BrowserCookieStore = {
  cookie: string;
};

export type BrowserProgressPersistence = {
  readonly storage: BrowserStorage;
  readonly cookies: BrowserCookieStore;
};

export const browserProgressStorageKeys = {
  localStorage: "looker-bi-gym.progress.v1",
  legacyQuizLocalStorage: "looker-bi-gym.quiz-progress.v1",
  cookie: "looker-bi-gym-progress-v1",
} as const;

const progressStorageKey = "looker-bi-gym.progress.v1";
const legacyQuizProgressStorageKey = "looker-bi-gym.quiz-progress.v1";
const progressCookieName = browserProgressStorageKeys.cookie;
const progressCookieMaxAgeSeconds = 60 * 60 * 24 * 365;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function getNonEmptyString(
  value: unknown,
  context: string,
): string | LearnerProgressImportInvalid {
  if (typeof value !== "string" || value.trim().length === 0) {
    return {
      status: "invalid",
      message: `${context} must be a non-empty string.`,
    };
  }

  return value;
}

function getStringArray(
  value: unknown,
  context: string,
): readonly string[] | LearnerProgressImportInvalid {
  if (!isStringArray(value)) {
    return {
      status: "invalid",
      message: `${context} must be a string array.`,
    };
  }

  return value;
}

function getImportInvalid(message: string): LearnerProgressImportInvalid {
  return { status: "invalid", message };
}

function isImportInvalid(
  value: unknown,
): value is LearnerProgressImportInvalid {
  return isRecord(value) && value["status"] === "invalid";
}

function isChallengeProgress(value: unknown): value is ChallengeProgress {
  return (
    isRecord(value) &&
    value["completed"] === true &&
    typeof value["completedAt"] === "string" &&
    typeof value["flag"] === "string" &&
    isStringArray(value["passedCheckIds"]) &&
    isStringArray(value["passedQuestionIds"])
  );
}

function isLearnerProgressState(value: unknown): value is LearnerProgressState {
  return (
    isRecord(value) &&
    value["version"] === 1 &&
    isRecord(value["challenges"]) &&
    Object.values(value["challenges"]).every((item) =>
      isChallengeProgress(item),
    )
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

function readCookieValue(
  cookies: BrowserCookieStore,
  key: string,
): string | undefined {
  const cookiePairs = cookies.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie.length > 0);

  for (const cookiePair of cookiePairs) {
    const separatorIndex = cookiePair.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const cookieName = cookiePair.slice(0, separatorIndex);
    const cookieValue = cookiePair.slice(separatorIndex + 1);

    if (cookieName === key) {
      try {
        return decodeURIComponent(cookieValue);
      } catch {
        return undefined;
      }
    }
  }

  return undefined;
}

function readJsonCookie(cookies: BrowserCookieStore, key: string): unknown {
  const storedValue = readCookieValue(cookies, key);

  if (storedValue === undefined) {
    return undefined;
  }

  try {
    return JSON.parse(storedValue) as unknown;
  } catch {
    return undefined;
  }
}

function writeCookieValue(
  cookies: BrowserCookieStore,
  key: string,
  value: string,
): void {
  cookies.cookie = `${key}=${encodeURIComponent(
    value,
  )}; Max-Age=${progressCookieMaxAgeSeconds}; Path=/; SameSite=Lax`;
}

function removeCookieValue(cookies: BrowserCookieStore, key: string): void {
  cookies.cookie = `${key}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function readLegacyQuizProgress(
  storage: BrowserStorage,
): Readonly<Record<string, ChallengeProgress>> {
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

export function getCompletedChallengeIds(
  progress: LearnerProgressState,
): ReadonlySet<string> {
  return new Set(
    Object.entries(progress.challenges)
      .filter((entry) => entry[1].completed)
      .map((entry) => entry[0]),
  );
}

export function readLearnerProgress(
  storage: BrowserStorage,
): LearnerProgressState {
  const parsed = readJsonStorage(storage, progressStorageKey);

  if (isLearnerProgressState(parsed)) {
    return parsed;
  }

  return {
    version: 1,
    challenges: readLegacyQuizProgress(storage),
  };
}

export function readBrowserLearnerProgress(
  persistence: BrowserProgressPersistence,
): LearnerProgressState {
  const parsedLocalProgress = readJsonStorage(
    persistence.storage,
    progressStorageKey,
  );

  if (isLearnerProgressState(parsedLocalProgress)) {
    return parsedLocalProgress;
  }

  const parsedCookieProgress = readJsonCookie(
    persistence.cookies,
    progressCookieName,
  );

  if (isLearnerProgressState(parsedCookieProgress)) {
    writeLearnerProgress(parsedCookieProgress, persistence.storage);
    return parsedCookieProgress;
  }

  return {
    version: 1,
    challenges: readLegacyQuizProgress(persistence.storage),
  };
}

export function writeLearnerProgress(
  progress: LearnerProgressState,
  storage: BrowserStorage,
): void {
  storage.setItem(progressStorageKey, JSON.stringify(progress));
}

export function writeBrowserLearnerProgress(
  progress: LearnerProgressState,
  persistence: BrowserProgressPersistence,
): void {
  const serializedProgress = JSON.stringify(progress);

  persistence.storage.setItem(progressStorageKey, serializedProgress);
  writeCookieValue(persistence.cookies, progressCookieName, serializedProgress);
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

export function resetLearnerProgress(
  storage: BrowserStorage,
): LearnerProgressState {
  storage.removeItem(progressStorageKey);
  storage.removeItem(legacyQuizProgressStorageKey);
  return { version: 1, challenges: {} };
}

export function resetBrowserLearnerProgress(
  persistence: BrowserProgressPersistence,
): LearnerProgressState {
  persistence.storage.removeItem(progressStorageKey);
  persistence.storage.removeItem(legacyQuizProgressStorageKey);
  removeCookieValue(persistence.cookies, progressCookieName);
  return { version: 1, challenges: {} };
}

function getDatasetVersions(
  challenge: ChallengeManifest | undefined,
): readonly ProgressExportDataset[] {
  if (challenge === undefined) {
    return [];
  }

  return challenge.inputs
    .filter(
      (
        input,
      ): input is typeof input &
        Required<Pick<typeof input, "dataset_id" | "dataset_version">> =>
        typeof input.dataset_id === "string" &&
        typeof input.dataset_version === "string",
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
  const challengesById = new Map(
    challenges.map((challenge) => [challenge.id, challenge] as const),
  );
  const completedChallenges = Object.entries(progress.challenges)
    .filter((entry) => entry[1].completed)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([challengeId, challengeProgress]) => {
      const challenge = challengesById.get(challengeId);

      return {
        challenge_id: challengeId,
        challenge_version: challenge?.version ?? null,
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
    format: "looker-bi-gym.progress-export.v1",
    exported_at: options.exportedAt ?? new Date().toISOString(),
    app_version: options.appVersion,
    content_version: options.contentVersion,
    storage_version: progress.version,
    completed_challenge_ids: completedChallenges.map(
      (challenge) => challenge.challenge_id,
    ),
    completed_challenges: completedChallenges,
    privacy: {
      created_locally: true,
      backend_required: false,
      state_scope: "browser-only",
      storage_mediums: ["localStorage", "same-site-cookie"],
      includes_credentials: false,
      includes_real_banking_data: false,
      includes_raw_answers: false,
    },
  } satisfies Omit<LearnerProgressExport, "learner_notes">;
  const learnerNotes = options.learnerNotes?.trim() ?? "";

  return learnerNotes.length > 0
    ? { ...baseExport, learner_notes: learnerNotes }
    : baseExport;
}

function validateImportPrivacy(
  value: unknown,
): LearnerProgressImportInvalid | undefined {
  if (!isRecord(value)) {
    return getImportInvalid("privacy must be an object.");
  }

  if (
    value["created_locally"] !== true ||
    value["backend_required"] !== false ||
    value["state_scope"] !== "browser-only" ||
    !isStringArray(value["storage_mediums"]) ||
    value["includes_credentials"] !== false ||
    value["includes_real_banking_data"] !== false ||
    value["includes_raw_answers"] !== false
  ) {
    return getImportInvalid(
      "privacy must match the browser-local progress export boundary.",
    );
  }

  return undefined;
}

export function parseLearnerProgressImport(
  source: string,
  challenges: readonly ChallengeManifest[],
): LearnerProgressImportResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(source) as unknown;
  } catch {
    return getImportInvalid("Import JSON could not be parsed.");
  }

  if (!isRecord(parsed)) {
    return getImportInvalid("Import JSON must be an object.");
  }

  if (parsed["format"] !== "looker-bi-gym.progress-export.v1") {
    return getImportInvalid(
      "Import format must be looker-bi-gym.progress-export.v1.",
    );
  }

  if (parsed["storage_version"] !== 1) {
    return getImportInvalid("Import storage_version must be 1.");
  }

  const exportedAt = getNonEmptyString(parsed["exported_at"], "exported_at");
  const appVersionValue = getNonEmptyString(
    parsed["app_version"],
    "app_version",
  );
  const contentVersionValue = getNonEmptyString(
    parsed["content_version"],
    "content_version",
  );

  if (isImportInvalid(exportedAt)) {
    return exportedAt;
  }

  if (isImportInvalid(appVersionValue)) {
    return appVersionValue;
  }

  if (isImportInvalid(contentVersionValue)) {
    return contentVersionValue;
  }

  if (Number.isNaN(Date.parse(exportedAt))) {
    return getImportInvalid("exported_at must be an ISO-like date string.");
  }

  const privacyResult = validateImportPrivacy(parsed["privacy"]);

  if (privacyResult !== undefined) {
    return privacyResult;
  }

  const completedChallengeIds = getStringArray(
    parsed["completed_challenge_ids"],
    "completed_challenge_ids",
  );

  if (isImportInvalid(completedChallengeIds)) {
    return completedChallengeIds;
  }

  const completedChallenges = parsed["completed_challenges"];

  if (!Array.isArray(completedChallenges)) {
    return getImportInvalid("completed_challenges must be an array.");
  }

  const knownChallengeIds = new Set(
    challenges.map((challenge) => challenge.id),
  );
  const declaredChallengeIds = new Set(completedChallengeIds);
  const importedChallengeIds: string[] = [];
  const unknownChallengeIds = new Set<string>();
  const progressEntries: Array<readonly [string, ChallengeProgress]> = [];
  const seenChallengeIds = new Set<string>();

  for (const [index, rawChallenge] of completedChallenges.entries()) {
    if (!isRecord(rawChallenge)) {
      return getImportInvalid(
        `completed_challenges[${index}] must be an object.`,
      );
    }

    const challengeId = getNonEmptyString(
      rawChallenge["challenge_id"],
      `completed_challenges[${index}].challenge_id`,
    );
    const completedAt = getNonEmptyString(
      rawChallenge["completed_at"],
      `completed_challenges[${index}].completed_at`,
    );
    const flag = getNonEmptyString(
      rawChallenge["flag"],
      `completed_challenges[${index}].flag`,
    );
    const passedCheckIds = getStringArray(
      rawChallenge["passed_check_ids"],
      `completed_challenges[${index}].passed_check_ids`,
    );
    const passedQuestionIds = getStringArray(
      rawChallenge["passed_question_ids"],
      `completed_challenges[${index}].passed_question_ids`,
    );

    if (isImportInvalid(challengeId)) {
      return challengeId;
    }

    if (isImportInvalid(completedAt)) {
      return completedAt;
    }

    if (isImportInvalid(flag)) {
      return flag;
    }

    if (isImportInvalid(passedCheckIds)) {
      return passedCheckIds;
    }

    if (isImportInvalid(passedQuestionIds)) {
      return passedQuestionIds;
    }

    if (seenChallengeIds.has(challengeId)) {
      return getImportInvalid(`Duplicate imported challenge ${challengeId}.`);
    }

    if (!declaredChallengeIds.has(challengeId)) {
      return getImportInvalid(
        `completed_challenge_ids is missing ${challengeId}.`,
      );
    }

    if (Number.isNaN(Date.parse(completedAt))) {
      return getImportInvalid(
        `completed_challenges[${index}].completed_at must be an ISO-like date string.`,
      );
    }

    seenChallengeIds.add(challengeId);
    importedChallengeIds.push(challengeId);

    if (!knownChallengeIds.has(challengeId)) {
      unknownChallengeIds.add(challengeId);
    }

    progressEntries.push([
      challengeId,
      {
        completed: true,
        completedAt,
        flag,
        passedCheckIds,
        passedQuestionIds,
      },
    ]);
  }

  const missingExportRows = completedChallengeIds.filter(
    (challengeId) => !seenChallengeIds.has(challengeId),
  );

  if (missingExportRows.length > 0) {
    return getImportInvalid(
      `completed_challenges is missing ${missingExportRows.join(", ")}.`,
    );
  }

  const unknownIds = [...unknownChallengeIds].sort();
  const warnings =
    unknownIds.length > 0
      ? [
          `Import includes challenge IDs not in the current catalog: ${unknownIds.join(", ")}.`,
        ]
      : [];

  return {
    status: "valid",
    preview: {
      exportedAt,
      appVersion: appVersionValue,
      contentVersion: contentVersionValue,
      importedChallengeIds,
      progress: {
        version: 1,
        challenges: Object.fromEntries(progressEntries),
      },
      unknownChallengeIds: unknownIds,
      warnings,
    },
  };
}

export function getPassedQuestionIds(
  evaluation: QuizEvaluation,
): readonly string[] {
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
