import assert from 'node:assert/strict';
import {
  buildLearnerProgressExport,
  completeChallenge,
  readLearnerProgress,
  resetLearnerProgress,
  writeLearnerProgress,
} from '../src/progress';
import type { ChallengeManifest } from '../src/challengeTypes';
import type { BrowserStorage } from '../src/progress';

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

const challenge: ChallengeManifest = {
  id: 'first-banking-dataset',
  version: 'v0.1.0',
  title: '010 - First Banking Dataset Inspection',
  area: 'orientation-and-source-data',
  mode: 'browser-sql',
  difficulty: 'beginner',
  estimated_minutes: 20,
  prerequisites: [],
  business_scenario: 'Inspect the synthetic deposits seed dataset.',
  regulatory_context: ['GDPR', 'FGDB'],
  required_tools: 'none',
  inputs: [
    {
      id: 'deposits_seed',
      type: 'dataset',
      description: 'Synthetic deposits seed dataset.',
      dataset_id: 'deposits-seed',
      dataset_version: 'v0.1.0',
      sensitive_fields: ['synthetic_iban', 'customer_id'],
    },
  ],
  outputs: [
    {
      id: 'inspection_result',
      type: 'sql-result',
      description: 'One-row profile query result.',
    },
  ],
  checks: [
    {
      id: 'required_columns',
      type: 'required-column',
      description: 'Required columns are present.',
      expected: ['row_count'],
    },
  ],
  questions: [
    {
      id: 'q_grain',
      type: 'multiple-choice',
      prompt: 'What is the table grain?',
      options: [{ id: 'account_day', label: 'Account day' }],
      answer: 'account_day',
    },
  ],
  flag: {
    id: 'flag-first-banking-dataset',
    criteria: ['Pass required checks.'],
  },
};

const storage = new MemoryStorage();
const completedProgress = completeChallenge(readLearnerProgress(storage), {
  challengeId: challenge.id,
  flag: challenge.flag.id,
  passedCheckIds: ['required_columns'],
  passedQuestionIds: ['q_grain'],
  completedAt: '2026-05-06T09:30:00.000Z',
});

writeLearnerProgress(completedProgress, storage);

const progressExport = buildLearnerProgressExport(
  readLearnerProgress(storage),
  [challenge],
  {
    appVersion: '0.1.0',
    contentVersion: '0.1.0',
    exportedAt: '2026-05-06T10:00:00.000Z',
    learnerNotes: 'Reviewed by learner.',
  },
);

assert.equal(progressExport.format, 'looker-bi-gym.progress-export.v1');
assert.equal(progressExport.exported_at, '2026-05-06T10:00:00.000Z');
assert.equal(progressExport.app_version, '0.1.0');
assert.equal(progressExport.content_version, '0.1.0');
assert.deepEqual(progressExport.completed_challenge_ids, [challenge.id]);
assert.equal(progressExport.completed_challenges.length, 1);
const exportedChallenge = progressExport.completed_challenges[0];

if (exportedChallenge === undefined) {
  throw new Error('Expected one exported challenge.');
}

assert.equal(exportedChallenge.challenge_id, challenge.id);
assert.equal(exportedChallenge.challenge_version, challenge.version);
assert.equal(exportedChallenge.flag, challenge.flag.id);
assert.equal(exportedChallenge.completed_at, '2026-05-06T09:30:00.000Z');
assert.deepEqual(exportedChallenge.dataset_versions, [
  {
    dataset_id: 'deposits-seed',
    dataset_version: 'v0.1.0',
  },
]);
assert.deepEqual(exportedChallenge.passed_check_ids, ['required_columns']);
assert.deepEqual(exportedChallenge.passed_question_ids, ['q_grain']);
assert.equal(progressExport.learner_notes, 'Reviewed by learner.');
assert.deepEqual(progressExport.privacy, {
  created_locally: true,
  backend_required: false,
  includes_credentials: false,
  includes_real_banking_data: false,
  includes_raw_answers: false,
});

const exportedJson = JSON.stringify(progressExport);
assert.equal(exportedJson.includes('looker-bi-gym.progress.v1'), false);
assert.equal(exportedJson.includes('localStorage'), false);
assert.equal(exportedJson.includes('password'), false);
assert.equal(exportedJson.includes('api_key'), false);
assert.equal(exportedJson.includes('oauth'), false);
assert.equal(exportedJson.includes('service_account'), false);
assert.equal(exportedJson.includes('synthetic_iban'), false);
assert.equal(exportedJson.includes('customer_id'), false);
assert.equal(exportedJson.includes('account_day'), false);

const resetProgress = resetLearnerProgress(storage);
assert.deepEqual(resetProgress.challenges, {});
assert.deepEqual(progressExport.completed_challenge_ids, [challenge.id]);

const notesFreeExport = buildLearnerProgressExport(completedProgress, [challenge], {
  appVersion: '0.0.0',
  contentVersion: '0.0.0',
  exportedAt: '2026-05-06T10:00:00.000Z',
  learnerNotes: '   ',
});
assert.equal(Object.hasOwn(notesFreeExport, 'learner_notes'), false);
