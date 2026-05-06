export type ChallengeMode =
  | 'quiz'
  | 'browser-sql'
  | 'browser-config'
  | 'cloud-evidence'
  | 'capstone';

export type ChallengeArea =
  | 'orientation-and-source-data'
  | 'warehouse-modeling-and-metrics'
  | 'looker-studio-and-dashboard-design'
  | 'governance-security-and-operations'
  | 'capstone';

export type ChallengeDifficulty =
  | 'intro'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'capstone';

export type ChallengeInput = {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly dataset_id?: string;
  readonly dataset_version?: string;
  readonly path?: string;
  readonly tables?: readonly string[];
  readonly sensitive_fields?: readonly string[];
  readonly date_semantics?: readonly string[];
  readonly grain?: string;
};

export type ChallengeOutput = {
  readonly id: string;
  readonly type: string;
  readonly description: string;
};

export type ChallengeCheck = {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly severity?: 'required' | 'advisory';
  readonly target?: string;
  readonly expected?: unknown;
};

export type ChallengeQuestionOption = {
  readonly id: string;
  readonly label: string;
};

export type ChallengeQuestion = {
  readonly id: string;
  readonly type: string;
  readonly prompt: string;
  readonly options?: readonly ChallengeQuestionOption[];
  readonly answer?: unknown;
  readonly tolerance?: number;
  readonly explanation?: string;
};

export type ChallengeTool = {
  readonly name: string;
  readonly purpose: string;
  readonly required: boolean;
  readonly version?: string;
  readonly platform_notes?: string;
};

export type ChallengeRequiredTools = 'none' | readonly ChallengeTool[];

export type ChallengeFlag = {
  readonly id: string;
  readonly criteria: readonly string[];
};

export type ChallengeHint = {
  readonly level: number;
  readonly text: string;
};

export type ChallengeEvidence = {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly self_attested?: boolean;
};

export type ChallengeRubricItem = {
  readonly id: string;
  readonly description: string;
};

export type ChallengeManifest = {
  readonly id: string;
  readonly title: string;
  readonly area: ChallengeArea;
  readonly mode: ChallengeMode;
  readonly difficulty: ChallengeDifficulty;
  readonly estimated_minutes: number;
  readonly prerequisites: readonly string[];
  readonly business_scenario: string;
  readonly regulatory_context: readonly string[];
  readonly inputs: readonly ChallengeInput[];
  readonly outputs: readonly ChallengeOutput[];
  readonly checks: readonly ChallengeCheck[];
  readonly questions: readonly ChallengeQuestion[];
  readonly required_tools: ChallengeRequiredTools;
  readonly flag: ChallengeFlag;
  readonly hints?: readonly ChallengeHint[];
  readonly evidence?: readonly ChallengeEvidence[];
  readonly rubric?: readonly ChallengeRubricItem[];
  readonly next_challenges?: readonly string[];
};
