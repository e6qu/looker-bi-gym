import assert from 'node:assert/strict';
import { evaluateQuestion, evaluateQuiz } from '../src/quiz';
import type { ChallengeManifest, ChallengeQuestion } from '../src/challengeTypes';

const multipleChoiceQuestion: ChallengeQuestion = {
  id: 'q_single',
  type: 'multiple-choice',
  prompt: 'Choose the browser-only tool declaration.',
  options: [
    { id: 'none', label: 'none' },
    { id: 'docker', label: 'Docker' },
  ],
  answer: 'none',
};

const selectAllQuestion: ChallengeQuestion = {
  id: 'q_select_all',
  type: 'select-all',
  prompt: 'Choose all sensitive serving-output fields.',
  options: [
    { id: 'account_id', label: 'account_id' },
    { id: 'branch_city', label: 'branch_city' },
    { id: 'synthetic_iban', label: 'synthetic_iban' },
  ],
  answer: ['account_id', 'synthetic_iban'],
};

const numericQuestion: ChallengeQuestion = {
  id: 'q_numeric',
  type: 'numeric',
  prompt: 'How many supported quiz question types are implemented?',
  answer: 3,
  tolerance: 0.1,
};

assert.equal(evaluateQuestion(multipleChoiceQuestion, 'none').isCorrect, true);
assert.equal(evaluateQuestion(multipleChoiceQuestion, 'docker').isCorrect, false);
assert.equal(
  evaluateQuestion(selectAllQuestion, ['synthetic_iban', 'account_id']).isCorrect,
  true,
);
assert.equal(evaluateQuestion(selectAllQuestion, ['account_id']).isCorrect, false);
assert.equal(evaluateQuestion(numericQuestion, '3.05').isCorrect, true);
assert.equal(evaluateQuestion(numericQuestion, '3.2').isCorrect, false);

const challenge: ChallengeManifest = {
  id: 'quiz-test',
  version: 'v0.1.0',
  title: 'Quiz Test',
  area: 'orientation-and-source-data',
  mode: 'quiz',
  difficulty: 'intro',
  estimated_minutes: 5,
  prerequisites: [],
  business_scenario: 'Validate browser quiz grading behavior.',
  regulatory_context: ['GDPR'],
  required_tools: 'none',
  inputs: [
    {
      id: 'notes',
      type: 'markdown',
      description: 'Synthetic test notes.',
      path: 'docs/README.md',
    },
  ],
  outputs: [
    {
      id: 'answers',
      type: 'answer-set',
      description: 'Browser-local answer set.',
    },
  ],
  checks: [
    {
      id: 'single',
      type: 'quiz-answer',
      description: 'Single-choice answer is correct.',
      target: 'q_single',
      expected: 'none',
    },
  ],
  questions: [multipleChoiceQuestion, selectAllQuestion, numericQuestion],
  flag: {
    id: 'flag-quiz-test',
    criteria: ['Answer all quiz questions correctly.'],
  },
};

assert.equal(
  evaluateQuiz(challenge, {
    q_single: 'none',
    q_select_all: ['account_id', 'synthetic_iban'],
    q_numeric: '3',
  }).isComplete,
  true,
);

assert.equal(
  evaluateQuiz(challenge, {
    q_single: 'none',
    q_select_all: ['account_id'],
    q_numeric: '3',
  }).isComplete,
  false,
);
