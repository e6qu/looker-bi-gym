import assert from "node:assert/strict";
import {
  browserProgressStorageKeys,
  buildLearnerProgressExport,
  completeChallenge,
  readBrowserLearnerProgress,
  resetBrowserLearnerProgress,
  writeBrowserLearnerProgress,
} from "../src/progress";
import type { ChallengeManifest } from "../src/challengeTypes";
import type {
  BrowserCookieStore,
  BrowserProgressPersistence,
  BrowserStorage,
} from "../src/progress";

class MemoryStorage implements BrowserStorage {
  readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

class MemoryCookieStore implements BrowserCookieStore {
  readonly values = new Map<string, string>();

  get cookie(): string {
    return Array.from(this.values.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }

  set cookie(value: string) {
    const segments = value.split(";").map((segment) => segment.trim());
    const cookiePair = segments[0];

    if (cookiePair === undefined) {
      return;
    }

    const separatorIndex = cookiePair.indexOf("=");

    if (separatorIndex <= 0) {
      return;
    }

    const key = cookiePair.slice(0, separatorIndex);
    const cookieValue = cookiePair.slice(separatorIndex + 1);
    const maxAge = segments.find((segment) =>
      segment.toLowerCase().startsWith("max-age="),
    );

    if (maxAge === "Max-Age=0") {
      this.values.delete(key);
      return;
    }

    this.values.set(key, cookieValue);
  }
}

const challenge: ChallengeManifest = {
  id: "first-banking-dataset",
  version: "v0.1.0",
  title: "010 - First Banking Dataset Inspection",
  area: "orientation-and-source-data",
  mode: "browser-sql",
  difficulty: "beginner",
  estimated_minutes: 20,
  prerequisites: [],
  business_scenario: "Inspect the synthetic deposits seed dataset.",
  regulatory_context: ["GDPR", "FGDB"],
  required_tools: "none",
  inputs: [
    {
      id: "deposits_seed",
      type: "dataset",
      description: "Synthetic deposits seed dataset.",
      dataset_id: "deposits-seed",
      dataset_version: "v0.1.0",
      sensitive_fields: ["synthetic_iban", "customer_id"],
    },
  ],
  outputs: [
    {
      id: "inspection_result",
      type: "sql-result",
      description: "One-row profile query result.",
    },
  ],
  checks: [
    {
      id: "required_columns",
      type: "required-column",
      description: "Required columns are present.",
      expected: ["row_count"],
    },
  ],
  questions: [
    {
      id: "q_grain",
      type: "multiple-choice",
      prompt: "What is the table grain?",
      options: [{ id: "account_day", label: "Account day" }],
      answer: "account_day",
    },
  ],
  flag: {
    id: "flag-first-banking-dataset",
    criteria: ["Pass required checks."],
  },
};

const persistence: BrowserProgressPersistence = {
  storage: new MemoryStorage(),
  cookies: new MemoryCookieStore(),
};
const completedProgress = completeChallenge(
  readBrowserLearnerProgress(persistence),
  {
    challengeId: challenge.id,
    flag: challenge.flag.id,
    passedCheckIds: ["required_columns"],
    passedQuestionIds: ["q_grain"],
    completedAt: "2026-05-06T09:30:00.000Z",
  },
);

writeBrowserLearnerProgress(completedProgress, persistence);

const progressExport = buildLearnerProgressExport(
  readBrowserLearnerProgress(persistence),
  [challenge],
  {
    appVersion: "0.1.0",
    contentVersion: "0.1.0",
    exportedAt: "2026-05-06T10:00:00.000Z",
    learnerNotes: "Reviewed by learner.",
  },
);

assert.equal(progressExport.format, "looker-bi-gym.progress-export.v1");
assert.equal(progressExport.exported_at, "2026-05-06T10:00:00.000Z");
assert.equal(progressExport.app_version, "0.1.0");
assert.equal(progressExport.content_version, "0.1.0");
assert.deepEqual(progressExport.completed_challenge_ids, [challenge.id]);
assert.equal(progressExport.completed_challenges.length, 1);
const exportedChallenge = progressExport.completed_challenges[0];

if (exportedChallenge === undefined) {
  throw new Error("Expected one exported challenge.");
}

assert.equal(exportedChallenge.challenge_id, challenge.id);
assert.equal(exportedChallenge.challenge_version, challenge.version);
assert.equal(exportedChallenge.flag, challenge.flag.id);
assert.equal(exportedChallenge.completed_at, "2026-05-06T09:30:00.000Z");
assert.deepEqual(exportedChallenge.dataset_versions, [
  {
    dataset_id: "deposits-seed",
    dataset_version: "v0.1.0",
  },
]);
assert.deepEqual(exportedChallenge.passed_check_ids, ["required_columns"]);
assert.deepEqual(exportedChallenge.passed_question_ids, ["q_grain"]);
assert.equal(progressExport.learner_notes, "Reviewed by learner.");
assert.deepEqual(progressExport.privacy, {
  created_locally: true,
  backend_required: false,
  state_scope: "browser-only",
  storage_mediums: ["localStorage", "same-site-cookie"],
  includes_credentials: false,
  includes_real_banking_data: false,
  includes_raw_answers: false,
});

const exportedJson = JSON.stringify(progressExport);
assert.equal(
  exportedJson.includes(browserProgressStorageKeys.localStorage),
  false,
);
assert.equal(exportedJson.includes("password"), false);
assert.equal(exportedJson.includes("api_key"), false);
assert.equal(exportedJson.includes("oauth"), false);
assert.equal(exportedJson.includes("service_account"), false);
assert.equal(exportedJson.includes("synthetic_iban"), false);
assert.equal(exportedJson.includes("customer_id"), false);
assert.equal(exportedJson.includes("account_day"), false);

const persistedCookie = persistence.cookies.cookie;
persistence.storage.removeItem(browserProgressStorageKeys.localStorage);
assert.equal(
  readBrowserLearnerProgress(persistence).challenges[challenge.id]?.flag,
  challenge.flag.id,
);
assert.notEqual(persistedCookie, "");
assert.equal(
  persistence.storage.getItem(browserProgressStorageKeys.localStorage) === null,
  false,
);

const resetProgress = resetBrowserLearnerProgress(persistence);
assert.deepEqual(resetProgress.challenges, {});
assert.deepEqual(progressExport.completed_challenge_ids, [challenge.id]);
assert.equal(
  persistence.storage.getItem(browserProgressStorageKeys.localStorage),
  null,
);
assert.equal(persistence.cookies.cookie, "");

const notesFreeExport = buildLearnerProgressExport(
  completedProgress,
  [challenge],
  {
    appVersion: "0.0.0",
    contentVersion: "0.0.0",
    exportedAt: "2026-05-06T10:00:00.000Z",
    learnerNotes: "   ",
  },
);
assert.equal(Object.hasOwn(notesFreeExport, "learner_notes"), false);
