import rawChallengeCatalog from './generated/challengeCatalog.json';
import type {
  ChallengeArea,
  ChallengeDifficulty,
  ChallengeManifest,
  ChallengeMode,
  ChallengeRequiredTools,
} from './challengeTypes';

const areaLabels = new Map<ChallengeArea, string>([
  ['orientation-and-source-data', 'Orientation And Source Data'],
  ['warehouse-modeling-and-metrics', 'Warehouse Modeling And Metrics'],
  ['looker-studio-and-dashboard-design', 'Looker Studio And Dashboard Design'],
  ['governance-security-and-operations', 'Governance, Security, And Operations'],
  ['capstone', 'Capstone'],
]);

const modeLabels = new Map<ChallengeMode, string>([
  ['quiz', 'Quiz'],
  ['browser-sql', 'Browser SQL'],
  ['browser-config', 'Browser Config'],
  ['cloud-evidence', 'Cloud Evidence'],
  ['capstone', 'Capstone'],
]);

const difficultyLabels = new Map<ChallengeDifficulty, string>([
  ['intro', 'Intro'],
  ['beginner', 'Beginner'],
  ['intermediate', 'Intermediate'],
  ['advanced', 'Advanced'],
  ['capstone', 'Capstone'],
]);

export const challengeCatalog = rawChallengeCatalog as readonly ChallengeManifest[];

export function formatChallengeArea(area: ChallengeArea): string {
  return areaLabels.get(area) ?? area;
}

export function formatChallengeMode(mode: ChallengeMode): string {
  return modeLabels.get(mode) ?? mode;
}

export function formatChallengeDifficulty(difficulty: ChallengeDifficulty): string {
  return difficultyLabels.get(difficulty) ?? difficulty;
}

export function formatRequiredTools(requiredTools: ChallengeRequiredTools): string {
  if (requiredTools === 'none') {
    return 'Browser only';
  }

  return requiredTools.map((tool) => tool.name).join(', ');
}
