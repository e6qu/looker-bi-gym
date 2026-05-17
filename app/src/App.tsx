import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  contentSections,
  getDefaultDocument,
  getDocument,
  getSection,
} from "./content";
import {
  evaluateCloudEvidenceChecks,
  isCloudEvidenceCheckSupported,
} from "./cloudEvidence";
import {
  evaluateBrowserConfigChecks,
  isBrowserConfigCheckSupported,
} from "./configEvidence";
import { defaultDatasetRef, type RuntimeDatasetRef } from "./datasetRegistry";
import {
  factCatalog,
  factById,
  getFactByRouteId,
  getFactHref,
} from "./factCatalog";
import {
  createEmptyFlashcardState,
  flashcardDecks,
  flashcardStorageKey,
  getFlashcardState,
  parseFlashcardImport,
  reviewFlashcard,
  type ExternalFlashcardSourceReview,
  type FlashcardRating,
  type FlashcardState,
} from "./flashcards";
import {
  challengeCatalog,
  formatChallengeArea,
  formatChallengeDifficulty,
  formatChallengeMode,
  formatRequiredTools,
} from "./challenges";
import { examPacks, quizBanks, type Difficulty } from "./learningContent";
import { renderMarkdown, slugifyHeading } from "./markdown";
import {
  evaluateChallengeQuestions,
  evaluateQuiz,
  isSupportedQuizQuestion,
} from "./quiz";
import {
  buildLearnerProgressExport,
  completeChallenge,
  getCompletedChallengeIds,
  getPassedQuestionIds,
  maybeCreateLocalFlag,
  parseLearnerProgressImport,
  readBrowserLearnerProgress,
  resetBrowserLearnerProgress,
  writeBrowserLearnerProgress,
} from "./progress";
import { getRegulatoryContextReference } from "./regulatoryContext";
import { appVersion, contentVersion, formatVersionLabel } from "./release";
import {
  getSqlRuntime,
  isSqlPreviewSupported,
  runSqlPreview,
} from "./sqlRuntime";
import { evaluateSqlResultChecks } from "./validators";
import type { JSX } from "react";
import type { ChallengeManifest } from "./challengeTypes";
import type {
  CloudEvidenceAnswerState,
  CloudEvidenceValue,
} from "./cloudEvidence";
import type {
  BrowserConfigAnswerState,
  BrowserConfigValue,
} from "./configEvidence";
import type {
  ContentDocument,
  ContentSection,
  ContentSectionId,
} from "./content";
import type {
  BrowserProgressPersistence,
  LearnerProgressImportResult,
  LearnerProgressState,
} from "./progress";
import type {
  ExamCard,
  ExamPack,
  QuizBank,
  QuizBankQuestion,
} from "./learningContent";
import type { QuizAnswerState, QuizResponse } from "./quiz";
import type { SqlQueryResult, SqlTableSchema } from "./sqlRuntime";
import type { ValidationEvaluation } from "./validators";

type RouteId =
  | "home"
  | ContentSectionId
  | "quiz"
  | "exam"
  | "facts"
  | "workbench"
  | "flashcards"
  | "challenges"
  | "settings";

type AppRoute = {
  readonly section: RouteId;
  readonly fileName?: string;
};

type Route = {
  readonly id: RouteId;
  readonly label: string;
};

type CompleteChallengeHandler = (
  challengeId: string,
  flag: string,
  passedCheckIds: readonly string[],
  passedQuestionIds: readonly string[],
) => void;

const routes: readonly Route[] = [
  { id: "home", label: "Home" },
  { id: "docs", label: "Docs" },
  { id: "regulations", label: "Regulations" },
  { id: "terminology", label: "Terminology" },
  { id: "tutorials", label: "Tutorials" },
  { id: "workbench", label: "Workbench" },
  { id: "quiz", label: "Quiz" },
  { id: "exam", label: "Exam" },
  { id: "facts", label: "Facts" },
  { id: "flashcards", label: "Flashcards" },
  { id: "challenges", label: "Challenges" },
  { id: "settings", label: "Settings" },
];

const contentRouteIds: ReadonlySet<RouteId> = new Set<RouteId>([
  "docs",
  "regulations",
  "terminology",
  "tutorials",
]);

const principles: readonly string[] = [
  "Static GitHub Pages app",
  "No backend or credentials",
  "Browser-local storage and cookie state",
  "Synthetic banking datasets only",
  "Default learner path runs in the browser",
  "Optional tools are listed per tutorial",
];

const workbenchDatasetRefs: readonly RuntimeDatasetRef[] = [
  defaultDatasetRef,
  { datasetId: "lending-month-end", version: "v0.1.0" },
];

type SqlRuntimeState =
  | { readonly status: "loading" }
  | {
      readonly status: "ready";
      readonly tables: readonly SqlTableSchema[];
      readonly connection: Awaited<
        ReturnType<typeof getSqlRuntime>
      >["connection"];
    }
  | { readonly status: "error"; readonly message: string };

type SqlQueryState =
  | { readonly status: "idle" }
  | { readonly status: "running" }
  | { readonly status: "success"; readonly result: SqlQueryResult }
  | { readonly status: "error"; readonly message: string };

function getBrowserProgressPersistence(): BrowserProgressPersistence {
  return {
    storage: window.localStorage,
    cookies: document,
  };
}

function readBrowserFlashcardState(): FlashcardState {
  const storedValue = window.localStorage.getItem(flashcardStorageKey);
  const fallback = createEmptyFlashcardState(new Date().toISOString());

  if (storedValue === null) {
    return fallback;
  }

  const importResult = parseFlashcardImport(storedValue);

  return importResult.status === "valid" ? importResult.state : fallback;
}

function writeBrowserFlashcardState(state: FlashcardState): void {
  window.localStorage.setItem(flashcardStorageKey, JSON.stringify(state));
}

function isRouteId(value: string | undefined): value is RouteId {
  return value !== undefined && routes.some((route) => route.id === value);
}

function isContentSectionId(value: RouteId): value is ContentSectionId {
  return contentRouteIds.has(value);
}

function routeFromHash(): AppRoute {
  const fullHash = window.location.hash.replace(/^#\/?/, "");
  const [routePath = ""] = fullHash.split("#", 1);
  const [sectionCandidate, ...fileParts] = routePath.split("/");
  const section = isRouteId(sectionCandidate) ? sectionCandidate : "home";
  const fileName = fileParts.join("/");

  return fileName.length > 0 ? { section, fileName } : { section };
}

function fragmentFromHash(): string | undefined {
  const fullHash = window.location.hash.replace(/^#\/?/, "");
  const hashIndex = fullHash.indexOf("#");
  if (hashIndex === -1) {
    return undefined;
  }
  const fragment = fullHash.slice(hashIndex + 1);
  return fragment.length > 0 ? fragment : undefined;
}

function formatDatasetRef(datasetRef: RuntimeDatasetRef): string {
  return `${datasetRef.datasetId}/${datasetRef.version}`;
}

function getWorkbenchDatasetRef(
  routePath: string | undefined,
): RuntimeDatasetRef | undefined {
  if (routePath === undefined || routePath.length === 0) {
    return defaultDatasetRef;
  }

  const [datasetId, version, ...extraParts] = routePath.split("/");

  if (
    datasetId === undefined ||
    version === undefined ||
    extraParts.length > 0
  ) {
    return undefined;
  }

  return workbenchDatasetRefs.find(
    (datasetRef) =>
      datasetRef.datasetId === datasetId && datasetRef.version === version,
  );
}

function getWorkbenchStarterSql(datasetRef: RuntimeDatasetRef): string {
  if (datasetRef.datasetId === "lending-month-end") {
    return "SELECT * FROM loan_monthly_snapshots LIMIT 10;";
  }

  return "SELECT * FROM account_daily_balances LIMIT 10;";
}

function ChallengeList({
  challenges,
  completedChallengeIds,
}: {
  readonly challenges: readonly ChallengeManifest[];
  readonly completedChallengeIds: ReadonlySet<string>;
}): JSX.Element {
  return (
    <div className="itemGrid">
      {challenges.map((challenge) => (
        <a
          className="itemCard challengeCard challengeLink"
          href={`#/challenges/${challenge.id}`}
          key={challenge.id}
        >
          <div className="itemHeader">
            <h3>{challenge.title}</h3>
            <span
              className={
                completedChallengeIds.has(challenge.id)
                  ? "status statusComplete"
                  : "status statusReady"
              }
            >
              {completedChallengeIds.has(challenge.id)
                ? "Complete"
                : formatChallengeMode(challenge.mode)}
            </span>
          </div>
          <p>{challenge.business_scenario}</p>
          <dl className="challengeMeta">
            <div>
              <dt>Area</dt>
              <dd>{formatChallengeArea(challenge.area)}</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>{formatChallengeDifficulty(challenge.difficulty)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{challenge.estimated_minutes} min</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{challenge.version}</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>{formatRequiredTools(challenge.required_tools)}</dd>
            </div>
          </dl>
        </a>
      ))}
    </div>
  );
}

function getChallengeById(
  challengeId: string | undefined,
): ChallengeManifest | undefined {
  return challengeCatalog.find((challenge) => challenge.id === challengeId);
}

function getQuestionAnswer(
  answers: QuizAnswerState,
  questionId: string,
): QuizResponse | undefined {
  return answers[questionId];
}

function getStringAnswer(answers: QuizAnswerState, questionId: string): string {
  const answer = getQuestionAnswer(answers, questionId);
  return typeof answer === "string" ? answer : "";
}

function getArrayAnswer(
  answers: QuizAnswerState,
  questionId: string,
): readonly string[] {
  const answer = getQuestionAnswer(answers, questionId);
  return answer !== undefined && typeof answer !== "string" ? answer : [];
}

function formatSqlCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "NULL";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return Object.prototype.toString.call(value);
}

type SqlVisualizationPoint = {
  readonly label: string;
  readonly value: number;
  readonly formattedValue: string;
};

type SqlResultVisualizationModel = {
  readonly dimensionColumn: string;
  readonly metricColumn: string;
  readonly points: readonly SqlVisualizationPoint[];
};

function asFiniteSqlNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }

  return undefined;
}

function isMetricColumn(
  rows: ReadonlyArray<Record<string, unknown>>,
  column: string,
): boolean {
  return rows.some((row) => asFiniteSqlNumber(row[column]) !== undefined);
}

function isDimensionColumn(
  rows: ReadonlyArray<Record<string, unknown>>,
  column: string,
): boolean {
  return rows.some((row) => asFiniteSqlNumber(row[column]) === undefined);
}

function buildSqlResultVisualization(
  result: SqlQueryResult,
): SqlResultVisualizationModel | undefined {
  if (result.rows.length === 0 || result.columns.length < 2) {
    return undefined;
  }

  const dimensionColumn = result.columns.find((column) =>
    isDimensionColumn(result.rows, column),
  );
  const metricColumn = result.columns.find(
    (column) =>
      column !== dimensionColumn && isMetricColumn(result.rows, column),
  );

  if (dimensionColumn === undefined || metricColumn === undefined) {
    return undefined;
  }

  const points = result.rows
    .map((row) => {
      const value = asFiniteSqlNumber(row[metricColumn]);

      if (value === undefined) {
        return undefined;
      }

      return {
        label: formatSqlCellValue(row[dimensionColumn]),
        value,
        formattedValue: formatSqlCellValue(row[metricColumn]),
      };
    })
    .filter((point): point is SqlVisualizationPoint => point !== undefined)
    .slice(0, 12);

  return points.length > 0
    ? {
        dimensionColumn,
        metricColumn,
        points,
      }
    : undefined;
}

function getStarterSql(challenge: ChallengeManifest): string {
  if (challenge.id === "lending-month-end-snapshots") {
    return `WITH latest_snapshots AS (
  SELECT *
  FROM loan_monthly_snapshots
  WHERE as_of_date = '2026-03-31'
),
latest_totals AS (
  SELECT
    currency_code,
    CAST(SUM(outstanding_principal) AS DOUBLE) AS latest_principal_total,
    CAST(SUM(CASE WHEN ifrs9_stage = 3 THEN outstanding_principal ELSE 0 END) AS DOUBLE) AS stage3_principal_total
  FROM latest_snapshots
  GROUP BY currency_code
),
naive_time_sums AS (
  SELECT
    currency_code,
    CAST(SUM(outstanding_principal) AS DOUBLE) AS naive_time_sum_total
  FROM loan_monthly_snapshots
  GROUP BY currency_code
),
non_month_end AS (
  SELECT COUNT(*) AS non_month_end_snapshot_count
  FROM loan_monthly_snapshots
  WHERE as_of_date NOT IN ('2026-02-28', '2026-03-31')
),
latest_property_valuation AS (
  SELECT CAST(SUM(market_value_eur) AS DOUBLE) AS latest_property_valuation_total_eur
  FROM property_valuations
  WHERE valuation_date = '2026-03-31'
),
stale_collateral AS (
  SELECT COUNT(*) AS stale_collateral_valuation_count
  FROM collateral
  WHERE valuation_date = '2025-03-31'
),
latest_hpi AS (
  SELECT CAST(house_price_index_2015_100 AS DOUBLE) AS latest_romania_hpi_2015_100
  FROM romania_house_price_index_annual
  WHERE year = 2025
)
SELECT
  '2026-03-31' AS latest_as_of_date,
  lt.currency_code,
  lt.latest_principal_total,
  nts.naive_time_sum_total,
  nts.naive_time_sum_total - lt.latest_principal_total AS time_sum_delta,
  non_month_end.non_month_end_snapshot_count,
  lt.stage3_principal_total,
  latest_property_valuation.latest_property_valuation_total_eur,
  stale_collateral.stale_collateral_valuation_count,
  latest_hpi.latest_romania_hpi_2015_100
FROM latest_totals lt
INNER JOIN naive_time_sums nts USING (currency_code)
CROSS JOIN non_month_end
CROSS JOIN latest_property_valuation
CROSS JOIN stale_collateral
CROSS JOIN latest_hpi
ORDER BY lt.currency_code;`;
  }

  if (challenge.id === "account-owner-fanout") {
    return `WITH latest_balances AS (
  SELECT account_id, business_date, ledger_balance
  FROM account_daily_balances
  WHERE business_date = (
    SELECT MAX(business_date)
    FROM account_daily_balances
  )
),
correct_total AS (
  SELECT CAST(SUM(ledger_balance) AS DOUBLE) AS correct_ledger_total
  FROM latest_balances
),
naive_total AS (
  SELECT CAST(SUM(lb.ledger_balance) AS DOUBLE) AS naive_joined_total
  FROM latest_balances lb
  INNER JOIN account_owners ao USING (account_id)
),
fanout_proof AS (
  SELECT
    correct_total.correct_ledger_total,
    naive_total.naive_joined_total
  FROM correct_total
  CROSS JOIN naive_total
)
SELECT
  (SELECT MAX(business_date) FROM latest_balances) AS latest_balance_date,
  correct_ledger_total,
  naive_joined_total,
  naive_joined_total - correct_ledger_total AS fanout_delta,
  ROUND(((naive_joined_total - correct_ledger_total) * 100.0) / correct_ledger_total, 2) AS overstatement_pct
FROM fanout_proof;`;
  }

  return `SELECT
  COUNT(*) AS row_count,
  COUNT(DISTINCT adb.currency_code) AS currency_count,
  COUNT(DISTINCT a.branch_id) AS branch_count,
  MAX(adb.business_date) AS latest_balance_date
FROM account_daily_balances adb
INNER JOIN accounts a USING (account_id);`;
}

function getChallengeDatasetRef(
  challenge: ChallengeManifest,
): RuntimeDatasetRef {
  const datasetInput = challenge.inputs.find(
    (input) =>
      typeof input.dataset_id === "string" &&
      typeof input.dataset_version === "string",
  );

  if (
    datasetInput?.dataset_id !== undefined &&
    datasetInput.dataset_version !== undefined
  ) {
    return {
      datasetId: datasetInput.dataset_id,
      version: datasetInput.dataset_version,
    };
  }

  return defaultDatasetRef;
}

function ChallengeInstructions({
  challenge,
}: {
  readonly challenge: ChallengeManifest;
}): JSX.Element {
  const regulatoryReferences = challenge.regulatory_context
    .map((tag) => getRegulatoryContextReference(tag))
    .filter((reference) => reference !== undefined);

  return (
    <section
      className="challengeInstructions"
      aria-label="Challenge instructions"
    >
      <div>
        <p className="eyebrow">Scenario</p>
        <p>{challenge.business_scenario}</p>
      </div>

      <div className="instructionGrid">
        <section>
          <h2>Inputs</h2>
          {challenge.inputs.map((input) => (
            <div className="instructionBlock" key={input.id}>
              <strong>{input.description}</strong>
              {input.grain !== undefined ? <p>Grain: {input.grain}</p> : null}
              {input.tables !== undefined ? (
                <p>Tables: {input.tables.join(", ")}</p>
              ) : null}
              {input.sensitive_fields !== undefined ? (
                <p>Sensitive fields: {input.sensitive_fields.join(", ")}</p>
              ) : null}
            </div>
          ))}
        </section>

        <section>
          <h2>Outputs</h2>
          <ul>
            {challenge.outputs.map((output) => (
              <li key={output.id}>{output.description}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Flag Criteria</h2>
          <ul>
            {challenge.flag.criteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Required Checks</h2>
          <ul>
            {challenge.checks.map((check) => (
              <li key={check.id}>{check.description}</li>
            ))}
          </ul>
        </section>

        {regulatoryReferences.length > 0 ? (
          <section>
            <h2>Regulatory Context</h2>
            <ul className="regulatoryContextList">
              {regulatoryReferences.map((reference) => (
                <li key={reference.tag}>
                  <a href={reference.href}>{reference.tag}</a>
                  <span>{reference.label}</span>
                </li>
              ))}
            </ul>
            <p className="instructionNote">
              Training context only; validate production interpretation with the
              appropriate institutional teams.
            </p>
          </section>
        ) : null}
      </div>

      {challenge.lesson_steps !== undefined &&
      challenge.lesson_steps.length > 0 ? (
        <section className="lessonSteps" aria-label="Lesson steps">
          <div>
            <p className="eyebrow">Lesson</p>
            <h2>Step-by-step work</h2>
          </div>
          <ol>
            {challenge.lesson_steps.map((step) => (
              <li key={step.id}>
                <strong>{step.title}</strong>
                <p>{step.instruction}</p>
                <dl>
                  <div>
                    <dt>Expected checkpoint</dt>
                    <dd>{step.expected_result}</dd>
                  </div>
                  <div>
                    <dt>Why it matters</dt>
                    <dd>{step.why_it_matters}</dd>
                  </div>
                  <div>
                    <dt>Common failure mode</dt>
                    <dd>{step.failure_mode}</dd>
                  </div>
                </dl>
                <SourceFactList sourceFacts={step.source_facts} />
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {challenge.hints !== undefined && challenge.hints.length > 0 ? (
        <details>
          <summary>Hints</summary>
          <ul>
            {challenge.hints.map((hint) => (
              <li key={hint.level}>{hint.text}</li>
            ))}
          </ul>
        </details>
      ) : null}
    </section>
  );
}

function SourceFactList({
  sourceFacts,
}: {
  readonly sourceFacts: readonly string[] | undefined;
}): JSX.Element | null {
  if (sourceFacts === undefined || sourceFacts.length === 0) {
    return null;
  }

  return (
    <p className="sourceFactList">
      <span>Source evidence:</span>{" "}
      {sourceFacts.map((sourceFactId, index) => {
        const fact = factById.get(sourceFactId);
        const label = fact?.statement ?? sourceFactId;

        return (
          <Fragment key={sourceFactId}>
            <a
              aria-label={`Source evidence ${sourceFactId}: ${label}`}
              href={getFactHref(sourceFactId)}
              title={sourceFactId}
            >
              {label}
              {fact !== undefined ? (
                <small aria-hidden="true">{fact.area}</small>
              ) : null}
              <span className="visuallyHidden">{sourceFactId}</span>
            </a>
            {index < sourceFacts.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </p>
  );
}

function formatExternalFlashcardSourceKind(
  sourceKind: ExternalFlashcardSourceReview["sourceKind"],
): string {
  const labels: Readonly<
    Record<ExternalFlashcardSourceReview["sourceKind"], string>
  > = {
    "anki-search": "Anki search",
    "anki-manual": "Anki manual",
    brainscape: "Brainscape",
    quizlet: "Quizlet",
  };

  return labels[sourceKind];
}

function ExternalFlashcardSourceReviewList({
  deckId,
  sourceReviews,
}: {
  readonly deckId: string | undefined;
  readonly sourceReviews: readonly ExternalFlashcardSourceReview[] | undefined;
}): JSX.Element | null {
  if (sourceReviews === undefined || sourceReviews.length === 0) {
    return null;
  }

  return (
    <details className="sourceReviewPanel" key={deckId}>
      <summary>External flashcard source review</summary>
      <ul>
        {sourceReviews.map((sourceReview) => (
          <li key={`${sourceReview.sourceKind}:${sourceReview.url}`}>
            <a href={sourceReview.url} rel="noreferrer" target="_blank">
              {sourceReview.title}
            </a>{" "}
            <span className="status statusPlanned">
              {formatExternalFlashcardSourceKind(sourceReview.sourceKind)}
            </span>
            <p>{sourceReview.coverageNote}</p>
            <p>{sourceReview.incorporationNote}</p>
            <small>Reviewed {sourceReview.reviewedAt}</small>
          </li>
        ))}
      </ul>
    </details>
  );
}

const difficultyLabels: Readonly<Record<Difficulty, string>> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function formatSeconds(seconds: number): string {
  return seconds < 60 ? `${seconds} sec` : `${Math.round(seconds / 60)} min`;
}

function isStringArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) && value.every((entry) => typeof entry === "string")
  );
}

function formatQuizBankAnswer(answer: QuizBankQuestion["answer"]): string {
  return isStringArray(answer) ? answer.join(", ") : String(answer);
}

function answerMatchesQuestion(
  question: QuizBankQuestion,
  answer: QuizResponse | undefined,
): boolean {
  if (answer === undefined) {
    return false;
  }

  if (question.type === "select_all") {
    if (typeof answer === "string" || !isStringArray(question.answer)) {
      return false;
    }

    const expected = [...question.answer].sort((left, right) =>
      left.localeCompare(right),
    );
    const actual = [...answer].sort((left, right) => left.localeCompare(right));

    return (
      expected.length === actual.length &&
      expected.every((expectedValue, index) => expectedValue === actual[index])
    );
  }

  if (question.type === "numeric") {
    if (typeof answer !== "string" || typeof question.answer !== "number") {
      return false;
    }

    return Number(answer) === question.answer;
  }

  return typeof answer === "string" && answer === question.answer;
}

function QuizQuestionCard({
  question,
  questionIndex,
  answer,
  showResult,
  onAnswer,
}: {
  readonly question: QuizBankQuestion;
  readonly questionIndex: number;
  readonly answer: QuizResponse | undefined;
  readonly showResult: boolean;
  readonly onAnswer: (questionId: string, answer: QuizResponse) => void;
}): JSX.Element {
  const isCorrect = answerMatchesQuestion(question, answer);
  const selectedAnswers =
    answer !== undefined && typeof answer !== "string" ? answer : [];
  const numericInputId = `quiz-bank-${question.id}-numeric`;

  return (
    <fieldset className="quizQuestion learningQuestion">
      <legend>
        <span>
          Question {questionIndex + 1} ·{" "}
          {formatSeconds(question.estimated_seconds)}
        </span>
        {question.prompt}
      </legend>

      {question.type === "multiple_choice" && question.options !== undefined ? (
        <div className="answerOptions">
          {question.options.map((option) => (
            <label key={option.id}>
              <input
                checked={answer === option.id}
                name={question.id}
                onChange={() => onAnswer(question.id, option.id)}
                type="radio"
                value={option.id}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "select_all" && question.options !== undefined ? (
        <div className="answerOptions">
          {question.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.id);

            return (
              <label key={option.id}>
                <input
                  checked={isSelected}
                  onChange={() =>
                    onAnswer(
                      question.id,
                      isSelected
                        ? selectedAnswers.filter(
                            (selectedAnswer) => selectedAnswer !== option.id,
                          )
                        : [...selectedAnswers, option.id],
                    )
                  }
                  type="checkbox"
                  value={option.id}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      ) : null}

      {question.type === "numeric" ? (
        <label className="numericAnswerField" htmlFor={numericInputId}>
          <span className="fieldLabel">
            Numeric answer for question {questionIndex + 1}
          </span>
          <input
            className="numericAnswer"
            id={numericInputId}
            inputMode="decimal"
            onChange={(event) =>
              onAnswer(question.id, event.currentTarget.value)
            }
            type="number"
            value={typeof answer === "string" ? answer : ""}
          />
        </label>
      ) : null}

      {showResult ? (
        <div
          className={
            isCorrect ? "feedbackBox feedbackPass" : "feedbackBox feedbackFail"
          }
          role="status"
        >
          {isCorrect ? "Correct." : "Review the answer."} Answer:{" "}
          {formatQuizBankAnswer(question.answer)}. {question.explanation}
        </div>
      ) : null}

      <details className="selfAssessmentDetails">
        <summary>Self-assessment</summary>
        <p>{question.self_assessment}</p>
      </details>
    </fieldset>
  );
}

function QuizBankCard({
  quizBank,
}: {
  readonly quizBank: QuizBank;
}): JSX.Element {
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const allQuestions = (["easy", "medium", "hard"] as const).flatMap(
    (difficulty) => quizBank.questions[difficulty],
  );
  const correctCount = allQuestions.filter((question) =>
    answerMatchesQuestion(question, answers[question.id]),
  ).length;

  function setAnswer(questionId: string, answer: QuizResponse): void {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  return (
    <section className="learningPanel" aria-labelledby={`${quizBank.id}-title`}>
      <div className="learningPanelHeader">
        <div>
          <p className="eyebrow">Mixed quiz</p>
          <h2 id={`${quizBank.id}-title`}>{quizBank.title}</h2>
          <p>{quizBank.description}</p>
        </div>
        <dl className="learningMeta">
          <div>
            <dt>Audience</dt>
            <dd>{quizBank.audience}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{quizBank.estimated_minutes} min</dd>
          </div>
          <div>
            <dt>Score</dt>
            <dd>
              {showResults
                ? `${correctCount}/${allQuestions.length}`
                : "Not checked"}
            </dd>
          </div>
        </dl>
      </div>

      {(["easy", "medium", "hard"] as const).map((difficulty) => (
        <section className="difficultySection" key={difficulty}>
          <h3>{difficultyLabels[difficulty]}</h3>
          {quizBank.questions[difficulty].map((question, questionIndex) => (
            <QuizQuestionCard
              answer={answers[question.id]}
              key={question.id}
              onAnswer={setAnswer}
              question={question}
              questionIndex={questionIndex}
              showResult={showResults}
            />
          ))}
        </section>
      ))}

      <div className="quizActions">
        <button type="button" onClick={() => setShowResults(true)}>
          Check Quiz
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setShowResults(false);
          }}
        >
          Reset Quiz
        </button>
      </div>
    </section>
  );
}

function QuizBankPage(): JSX.Element {
  return (
    <section className="page quizBankPage" aria-labelledby="quiz-bank-title">
      <PageTitle
        title="Quiz"
        description="Scenario-based self-check questions grouped by difficulty. Answers stay in this browser view and are not uploaded."
        id="quiz-bank-title"
      />
      {quizBanks.map((quizBank) => (
        <QuizBankCard key={quizBank.id} quizBank={quizBank} />
      ))}
    </section>
  );
}

function ExamCardView({ card }: { readonly card: ExamCard }): JSX.Element {
  return (
    <article className="examCard">
      <div className="itemHeader">
        <h3>{card.title}</h3>
        <span className="status statusReady">Self-assessed</span>
      </div>
      <pre className="examCardObjective">{card.objective}</pre>
      <section>
        <h4>Expected Outputs</h4>
        <ul>
          {card.verification.expected_outputs.map((output) => (
            <li key={output}>{output}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4>Self-Assessment</h4>
        <p>{card.verification.self_assessment}</p>
      </section>
    </article>
  );
}

function ExamPackView({
  examPack,
}: {
  readonly examPack: ExamPack;
}): JSX.Element {
  return (
    <section className="learningPanel" aria-labelledby={`${examPack.id}-title`}>
      <div className="learningPanelHeader">
        <div>
          <p className="eyebrow">Exam mode</p>
          <h2 id={`${examPack.id}-title`}>{examPack.title}</h2>
          <p>{examPack.description}</p>
        </div>
        <dl className="learningMeta">
          <div>
            <dt>Mode</dt>
            <dd>{examPack.mode.replace("_", " ")}</dd>
          </div>
          <div>
            <dt>Card Time</dt>
            <dd>Up to {examPack.estimated_minutes_per_card} min</dd>
          </div>
          <div>
            <dt>Cards</dt>
            <dd>{examPack.cards.length}</dd>
          </div>
        </dl>
      </div>
      <div className="examGrid">
        {examPack.cards.map((card) => (
          <ExamCardView card={card} key={card.id} />
        ))}
      </div>
    </section>
  );
}

function ExamPage(): JSX.Element {
  return (
    <section className="page examPage" aria-labelledby="exam-title">
      <PageTitle
        title="Exam"
        description="Longer independent practical cards. Keep your own time and self-assess against deterministic expected outputs."
        id="exam-title"
      />
      {examPacks.map((examPack) => (
        <ExamPackView examPack={examPack} key={examPack.id} />
      ))}
    </section>
  );
}

function FactsPage({
  factRouteId,
}: {
  readonly factRouteId: string | undefined;
}): JSX.Element {
  const selectedFact = getFactByRouteId(factRouteId);

  return (
    <section className="contentPage factsPage" aria-labelledby="facts-title">
      <aside className="documentNav" aria-label="Fact database index">
        <div>
          <p className="eyebrow">Live fact graph</p>
          <h2 id="facts-title">Facts</h2>
          <p>
            Source-backed fact nodes loaded from local Markdown and verified by
            the SQLite facts database tests.
          </p>
        </div>
        <nav>
          {factCatalog.map((fact) => (
            <a
              aria-current={selectedFact?.id === fact.id ? "page" : undefined}
              href={fact.href}
              key={fact.id}
            >
              <span>{fact.id}</span>
              <small>{fact.area}</small>
            </a>
          ))}
        </nav>
      </aside>
      <article className="markdownArticle factArticle">
        <div className="documentMeta">
          <span>{selectedFact?.filePath ?? "facts/*.md"}</span>
          <a href="#/facts">Fact graph</a>
        </div>
        {selectedFact === undefined ? (
          <div className="markdownBody">
            <h1>Fact Database</h1>
            <p>
              Pick a fact to inspect its statement, source quote, derived BI
              implication, and graph links.
            </p>
          </div>
        ) : (
          <div className="markdownBody">
            <h1>{selectedFact.id}</h1>
            <p className="eyebrow">{selectedFact.area}</p>
            <h2>Statement</h2>
            <p>{selectedFact.statement}</p>
            <h2>Source Quote</h2>
            <p>{selectedFact.sourceQuote}</p>
            <h2>Derived Implication</h2>
            <p>{selectedFact.derivedImplication}</p>
            <h2>Related Facts</h2>
            {selectedFact.relatedFacts.length > 0 ? (
              <ul>
                {selectedFact.relatedFacts.map((relatedFactId) => (
                  <li key={relatedFactId}>
                    <a href={getFactHref(relatedFactId)}>{relatedFactId}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No related facts recorded yet.</p>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

function QuizChallengePage({
  challenge,
  isCompleted,
  onComplete,
}: {
  readonly challenge: ChallengeManifest;
  readonly isCompleted: boolean;
  readonly onComplete: CompleteChallengeHandler;
}): JSX.Element {
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const evaluation = useMemo(
    () => evaluateQuiz(challenge, answers),
    [answers, challenge],
  );
  const evaluationsByQuestion = useMemo(
    () =>
      new Map(
        evaluation.questions.map(
          (question) => [question.questionId, question] as const,
        ),
      ),
    [evaluation.questions],
  );
  const unsupportedQuestions = challenge.questions.filter(
    (question) => !isSupportedQuizQuestion(question),
  );

  function setAnswer(questionId: string, answer: QuizResponse): void {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  function submitQuiz(): void {
    setHasSubmitted(true);

    if (evaluation.isComplete) {
      onComplete(
        challenge.id,
        challenge.flag.id,
        [],
        getPassedQuestionIds(evaluation),
      );
    }
  }

  return (
    <section
      className="page challengeDetailPage"
      aria-labelledby={`${challenge.id}-title`}
    >
      <div className="challengeDetailHeader">
        <a href="#/challenges">Back to challenges</a>
        <PageTitle
          title={challenge.title}
          description={challenge.business_scenario}
          id={`${challenge.id}-title`}
        />
        <dl className="challengeMeta challengeDetailMeta">
          <div>
            <dt>Mode</dt>
            <dd>{formatChallengeMode(challenge.mode)}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{formatRequiredTools(challenge.required_tools)}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>{challenge.version}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{isCompleted ? "Complete in this browser" : "Not complete"}</dd>
          </div>
        </dl>
      </div>

      {unsupportedQuestions.length > 0 ? (
        <div className="feedbackBox feedbackFail" role="status">
          This quiz includes unsupported question types and cannot be completed
          yet.
        </div>
      ) : null}

      <ChallengeInstructions challenge={challenge} />

      <div className="quizPanel">
        {challenge.questions.map((question, index) => {
          const questionEvaluation = evaluationsByQuestion.get(question.id);
          const isCorrect = questionEvaluation?.isCorrect ?? false;
          const isAnswered = questionEvaluation?.isAnswered ?? false;
          const numericInputId = `${challenge.id}-${question.id}-numeric-answer`;

          return (
            <fieldset className="quizQuestion" key={question.id}>
              <legend>
                <span>Question {index + 1}</span>
                {question.prompt}
              </legend>
              <SourceFactList sourceFacts={question.source_facts} />

              {question.type === "multiple-choice" &&
              question.options !== undefined ? (
                <div className="answerOptions">
                  {question.options.map((option) => (
                    <label key={option.id}>
                      <input
                        checked={
                          getStringAnswer(answers, question.id) === option.id
                        }
                        name={question.id}
                        onChange={() => setAnswer(question.id, option.id)}
                        type="radio"
                        value={option.id}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {question.type === "select-all" &&
              question.options !== undefined ? (
                <div className="answerOptions">
                  {question.options.map((option) => {
                    const selectedAnswers = getArrayAnswer(
                      answers,
                      question.id,
                    );
                    const isSelected = selectedAnswers.includes(option.id);

                    return (
                      <label key={option.id}>
                        <input
                          checked={isSelected}
                          onChange={() =>
                            setAnswer(
                              question.id,
                              isSelected
                                ? selectedAnswers.filter(
                                    (answer) => answer !== option.id,
                                  )
                                : [...selectedAnswers, option.id],
                            )
                          }
                          type="checkbox"
                          value={option.id}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : null}

              {question.type === "numeric" ? (
                <label className="numericAnswerField" htmlFor={numericInputId}>
                  <span className="fieldLabel">
                    Numeric answer for question {index + 1}
                  </span>
                  <input
                    className="numericAnswer"
                    id={numericInputId}
                    inputMode="decimal"
                    onChange={(event) =>
                      setAnswer(question.id, event.currentTarget.value)
                    }
                    type="number"
                    value={getStringAnswer(answers, question.id)}
                  />
                </label>
              ) : null}

              {hasSubmitted ? (
                <div
                  className={
                    isCorrect
                      ? "feedbackBox feedbackPass"
                      : "feedbackBox feedbackFail"
                  }
                  role="status"
                >
                  {isCorrect
                    ? "Correct."
                    : isAnswered
                      ? "Incorrect."
                      : "Answer required."}
                  {question.explanation !== undefined
                    ? ` ${question.explanation}`
                    : ""}
                </div>
              ) : null}
            </fieldset>
          );
        })}
      </div>

      <div className="quizActions">
        <button
          disabled={unsupportedQuestions.length > 0}
          onClick={submitQuiz}
          type="button"
        >
          Check Answers
        </button>
        {hasSubmitted ? (
          <div
            className={
              evaluation.isComplete
                ? "feedbackBox feedbackPass"
                : "feedbackBox feedbackFail"
            }
            role="status"
          >
            {evaluation.isComplete
              ? `Challenge complete. Flag: ${challenge.flag.id}`
              : "The quiz is not complete yet."}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function UnsupportedChallengePage({
  challenge,
}: {
  readonly challenge: ChallengeManifest;
}): JSX.Element {
  return (
    <section className="page" aria-labelledby={`${challenge.id}-title`}>
      <a className="backLink" href="#/challenges">
        Back to challenges
      </a>
      <PageTitle
        title={challenge.title}
        description="This challenge is present in the static catalog. Its runtime arrives in a later task."
        id={`${challenge.id}-title`}
      />
      <dl className="challengeMeta challengeDetailMeta">
        <div>
          <dt>Mode</dt>
          <dd>{formatChallengeMode(challenge.mode)}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{formatRequiredTools(challenge.required_tools)}</dd>
        </div>
        <div>
          <dt>Version</dt>
          <dd>{challenge.version}</dd>
        </div>
      </dl>
    </section>
  );
}

function SqlTableBrowser({
  tables,
  onSelectTable,
}: {
  readonly tables: readonly SqlTableSchema[];
  readonly onSelectTable: (tableName: string) => void;
}): JSX.Element {
  return (
    <aside className="sqlSidebar" aria-label="Loaded challenge tables">
      <div className="sidebarHeader">
        <p className="eyebrow">Schema browser</p>
        <h2>Dataset tables</h2>
      </div>
      <div className="sqlTableList">
        {tables.map((table) => (
          <button
            key={table.tableName}
            type="button"
            onClick={() => onSelectTable(table.tableName)}
          >
            <strong>{table.tableName}</strong>
            <span>{table.rowCount} rows</span>
          </button>
        ))}
      </div>
      <div className="sqlSchemaCards">
        {tables.map((table) => (
          <section className="sqlSchemaCard" key={table.tableName}>
            <div className="sqlSchemaCardHeader">
              <strong>{table.tableName}</strong>
              <span>{table.rowCount} rows</span>
            </div>
            <ul>
              {table.columns.map((column) => (
                <li key={`${table.tableName}.${column}`}>{column}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}

function SqlResultTable({
  result,
}: {
  readonly result: SqlQueryResult;
}): JSX.Element {
  const visualization = buildSqlResultVisualization(result);
  const maxAbsValue =
    visualization?.points.reduce(
      (maxValue, point) => Math.max(maxValue, Math.abs(point.value)),
      0,
    ) ?? 0;

  return (
    <div className="sqlResultWrap">
      <div className="sqlResultMeta">
        <span>{result.rowCount} rows returned</span>
        {result.truncated ? (
          <span>Showing first {result.rows.length} rows</span>
        ) : null}
      </div>
      <div
        className="sqlResultTable"
        role="table"
        aria-label="SQL query result"
      >
        <div className="sqlResultHead" role="row">
          {result.columns.map((column) => (
            <div key={column} role="columnheader">
              {column}
            </div>
          ))}
        </div>
        <div className="sqlResultBody" role="rowgroup">
          {result.rows.map((row, rowIndex) => (
            <div className="sqlResultRow" key={rowIndex} role="row">
              {result.columns.map((column) => {
                return (
                  <div key={`${rowIndex}:${column}`} role="cell">
                    {formatSqlCellValue(row[column])}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {visualization !== undefined ? (
        <section
          aria-label="SQL result visualization"
          className="sqlResultVisualization"
        >
          <div className="sqlResultVisualizationHeader">
            <p className="eyebrow">Visualization</p>
            <h2>
              {visualization.metricColumn} by {visualization.dimensionColumn}
            </h2>
          </div>
          <div
            aria-label={`Bar chart of ${visualization.metricColumn} by ${visualization.dimensionColumn}`}
            className="sqlResultBars"
            role="img"
          >
            {visualization.points.map((point) => {
              const barWidth =
                maxAbsValue > 0
                  ? `${Math.max((Math.abs(point.value) / maxAbsValue) * 100, 2)}%`
                  : "2%";

              return (
                <div className="sqlResultBarRow" key={point.label}>
                  <span className="sqlResultBarLabel">{point.label}</span>
                  <span className="sqlResultBarTrack">
                    <span
                      className="sqlResultBarFill"
                      style={{ width: barWidth }}
                    />
                  </span>
                  <span className="sqlResultBarValue">
                    {point.formattedValue}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ValidationSummary({
  evaluation,
}: {
  readonly evaluation: ValidationEvaluation;
}): JSX.Element {
  return (
    <section
      className="validationPanel"
      aria-label="Challenge validation results"
    >
      <div className="validationHeader">
        <p className="eyebrow">Checks</p>
        <strong>
          {evaluation.requiredPassed
            ? "Required checks passed"
            : "Required checks pending"}
        </strong>
      </div>
      <ul>
        {evaluation.checks.map((check) => (
          <li
            className={
              check.status === "pass" ? "validationPass" : "validationFail"
            }
            key={check.checkId}
          >
            <span>
              {check.status === "pass"
                ? "Pass"
                : check.status === "fail"
                  ? "Fail"
                  : "Unsupported"}
            </span>
            <div>
              <strong>{check.description}</strong>
              <p>{check.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatEvidenceType(type: string): string {
  switch (type) {
    case "pasted-sql":
      return "SQL text";
    case "pasted-result":
      return "CSV/JSON result";
    case "numeric-value":
      return "Numeric value";
    case "report-url":
    case "url":
      return "Report URL";
    case "checklist-confirmation":
      return "Checklist";
    case "manual-note":
      return "Manual note";
    case "metric-contract-json":
    case "browser-config-json":
      return "JSON config";
    default:
      return type;
  }
}

type LocalEvidenceValue = CloudEvidenceValue | BrowserConfigValue;

function LocalEvidenceField({
  evidence,
  value,
  onChange,
}: {
  readonly evidence: NonNullable<ChallengeManifest["evidence"]>[number];
  readonly value: LocalEvidenceValue | undefined;
  readonly onChange: (evidenceId: string, value: LocalEvidenceValue) => void;
}): JSX.Element {
  const inputId = `evidence-${evidence.id}`;
  const label = evidence.label ?? evidence.description;
  const stringValue = typeof value === "string" ? value : "";
  const isChecked = typeof value === "boolean" ? value : false;

  if (evidence.type === "checklist-confirmation") {
    return (
      <label className="evidenceChecklist" htmlFor={inputId}>
        <input
          checked={isChecked}
          id={inputId}
          onChange={(event) =>
            onChange(evidence.id, event.currentTarget.checked)
          }
          type="checkbox"
        />
        <span>
          <strong>{label}</strong>
          <small>{evidence.description}</small>
        </span>
      </label>
    );
  }

  const isTextarea =
    evidence.type === "pasted-sql" ||
    evidence.type === "pasted-result" ||
    evidence.type === "manual-note" ||
    evidence.type === "screenshot-description" ||
    evidence.type === "metric-contract-json" ||
    evidence.type === "browser-config-json";

  return (
    <label className="evidenceField" htmlFor={inputId}>
      <span>
        <strong>{label}</strong>
        <small>{formatEvidenceType(evidence.type)}</small>
      </span>
      {isTextarea ? (
        <textarea
          className="evidenceTextarea"
          id={inputId}
          onChange={(event) => onChange(evidence.id, event.currentTarget.value)}
          placeholder={evidence.placeholder}
          value={stringValue}
        />
      ) : (
        <input
          className="evidenceTextInput"
          id={inputId}
          inputMode={evidence.type === "numeric-value" ? "decimal" : undefined}
          onChange={(event) => onChange(evidence.id, event.currentTarget.value)}
          placeholder={evidence.placeholder}
          type={
            evidence.type === "numeric-value"
              ? "number"
              : evidence.type === "report-url"
                ? "url"
                : "text"
          }
          value={stringValue}
        />
      )}
      <small>{evidence.description}</small>
    </label>
  );
}

function LocalEvidenceChallengePage({
  challenge,
  isCompleted,
  onComplete,
}: {
  readonly challenge: ChallengeManifest;
  readonly isCompleted: boolean;
  readonly onComplete: CompleteChallengeHandler;
}): JSX.Element {
  const isBrowserConfig = challenge.mode === "browser-config";
  const [evidenceAnswers, setEvidenceAnswers] = useState<
    CloudEvidenceAnswerState | BrowserConfigAnswerState
  >({});
  const [questionAnswers, setQuestionAnswers] = useState<QuizAnswerState>({});
  const checkEvaluation = useMemo(
    () =>
      isBrowserConfig
        ? evaluateBrowserConfigChecks(challenge, evidenceAnswers)
        : evaluateCloudEvidenceChecks(challenge, evidenceAnswers),
    [challenge, evidenceAnswers, isBrowserConfig],
  );
  const questionEvaluation = useMemo(
    () => evaluateChallengeQuestions(challenge, questionAnswers),
    [challenge, questionAnswers],
  );
  const evaluationsByQuestion = useMemo(
    () =>
      new Map(
        questionEvaluation.questions.map(
          (question) => [question.questionId, question] as const,
        ),
      ),
    [questionEvaluation.questions],
  );
  const completion = useMemo(
    () => maybeCreateLocalFlag(challenge, questionEvaluation, checkEvaluation),
    [challenge, checkEvaluation, questionEvaluation],
  );
  const unsupportedChecks = challenge.checks.filter(
    (check) =>
      check.type !== "quiz-answer" &&
      (isBrowserConfig
        ? !isBrowserConfigCheckSupported(check)
        : !isCloudEvidenceCheckSupported(check)),
  );
  const mechanicalChecks = checkEvaluation.checks.filter(
    (check) => check.status !== "unsupported",
  );
  const selfAttestedEvidence =
    challenge.evidence?.filter((evidence) => evidence.self_attested === true) ??
    [];

  useEffect(() => {
    if (completion !== undefined && !isCompleted) {
      onComplete(
        completion.challengeId,
        completion.flag,
        completion.passedCheckIds,
        completion.passedQuestionIds,
      );
    }
  }, [completion, isCompleted, onComplete]);

  function setEvidenceAnswer(
    evidenceId: string,
    value: LocalEvidenceValue,
  ): void {
    setEvidenceAnswers((currentAnswers) => ({
      ...currentAnswers,
      [evidenceId]: value,
    }));
  }

  function setQuestionAnswer(questionId: string, answer: QuizResponse): void {
    setQuestionAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  return (
    <section
      className={`page challengeDetailPage ${
        isBrowserConfig ? "browserConfigPage" : "cloudEvidencePage"
      }`}
      aria-labelledby={`${challenge.id}-title`}
    >
      <div className="challengeDetailHeader">
        <a href="#/challenges">Back to challenges</a>
        <PageTitle
          title={challenge.title}
          description={challenge.business_scenario}
          id={`${challenge.id}-title`}
        />
        <dl className="challengeMeta challengeDetailMeta">
          <div>
            <dt>Mode</dt>
            <dd>{formatChallengeMode(challenge.mode)}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{formatRequiredTools(challenge.required_tools)}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>{challenge.version}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{isCompleted ? "Complete in this browser" : "Not complete"}</dd>
          </div>
        </dl>
      </div>

      <ChallengeInstructions challenge={challenge} />

      <section
        className="evidenceScopePanel"
        aria-label="Evidence validation scope"
      >
        <div>
          <p className="eyebrow">Mechanically verified</p>
          <ul>
            {mechanicalChecks.map((check) => (
              <li key={check.checkId}>{check.description}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Self-attested</p>
          <ul>
            {selfAttestedEvidence.map((evidence) => (
              <li key={evidence.id}>{evidence.description}</li>
            ))}
          </ul>
        </div>
      </section>

      {unsupportedChecks.length > 0 ? (
        <div className="feedbackBox feedbackFail" role="status">
          This {isBrowserConfig ? "browser config" : "cloud evidence"} challenge
          includes unsupported checks and cannot be completed yet.
        </div>
      ) : null}

      <div className="cloudEvidenceLayout">
        <section className="evidencePanel" aria-label="Evidence inputs">
          <div>
            <p className="eyebrow">
              {isBrowserConfig ? "Configuration" : "Evidence"}
            </p>
            <h2>
              {isBrowserConfig
                ? "Local config capture"
                : "Local evidence capture"}
            </h2>
          </div>
          <div className="evidenceGrid">
            {(challenge.evidence ?? []).map((evidence) => (
              <LocalEvidenceField
                evidence={evidence}
                key={evidence.id}
                onChange={setEvidenceAnswer}
                value={evidenceAnswers[evidence.id]}
              />
            ))}
          </div>
        </section>

        <section className="evidencePanel" aria-label="Evidence questions">
          <div>
            <p className="eyebrow">Checkpoint</p>
            <h2>
              {isBrowserConfig ? "Contract checkpoint" : "Credential boundary"}
            </h2>
          </div>
          <div className="quizPanel">
            {challenge.questions.map((question, index) => {
              const questionResult = evaluationsByQuestion.get(question.id);
              const isCorrect = questionResult?.isCorrect ?? false;
              const isAnswered = questionResult?.isAnswered ?? false;
              const numericInputId = `${challenge.id}-${question.id}-numeric-answer`;

              return (
                <fieldset className="quizQuestion" key={question.id}>
                  <legend>
                    <span>Question {index + 1}</span>
                    {question.prompt}
                  </legend>
                  <SourceFactList sourceFacts={question.source_facts} />

                  {question.type === "multiple-choice" &&
                  question.options !== undefined ? (
                    <div className="answerOptions">
                      {question.options.map((option) => (
                        <label key={option.id}>
                          <input
                            checked={
                              getStringAnswer(questionAnswers, question.id) ===
                              option.id
                            }
                            name={question.id}
                            onChange={() =>
                              setQuestionAnswer(question.id, option.id)
                            }
                            type="radio"
                            value={option.id}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {question.type === "select-all" &&
                  question.options !== undefined ? (
                    <div className="answerOptions">
                      {question.options.map((option) => {
                        const selectedAnswers = getArrayAnswer(
                          questionAnswers,
                          question.id,
                        );
                        const isSelected = selectedAnswers.includes(option.id);

                        return (
                          <label key={option.id}>
                            <input
                              checked={isSelected}
                              onChange={() =>
                                setQuestionAnswer(
                                  question.id,
                                  isSelected
                                    ? selectedAnswers.filter(
                                        (answer) => answer !== option.id,
                                      )
                                    : [...selectedAnswers, option.id],
                                )
                              }
                              type="checkbox"
                              value={option.id}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : null}

                  {question.type === "numeric" ? (
                    <label
                      className="numericAnswerField"
                      htmlFor={numericInputId}
                    >
                      <span className="fieldLabel">
                        Numeric answer for question {index + 1}
                      </span>
                      <input
                        className="numericAnswer"
                        id={numericInputId}
                        inputMode="decimal"
                        onChange={(event) =>
                          setQuestionAnswer(
                            question.id,
                            event.currentTarget.value,
                          )
                        }
                        type="number"
                        value={getStringAnswer(questionAnswers, question.id)}
                      />
                    </label>
                  ) : null}

                  {isAnswered ? (
                    <div
                      className={
                        isCorrect
                          ? "feedbackBox feedbackPass"
                          : "feedbackBox feedbackFail"
                      }
                      role="status"
                    >
                      {isCorrect ? "Correct." : "Incorrect."}
                      {question.explanation !== undefined
                        ? ` ${question.explanation}`
                        : ""}
                    </div>
                  ) : null}
                </fieldset>
              );
            })}
          </div>
        </section>
      </div>

      <ValidationSummary evaluation={checkEvaluation} />

      {completion !== undefined ? (
        <div className="feedbackBox feedbackPass" role="status">
          Challenge complete. Flag: {completion.flag}
        </div>
      ) : null}
    </section>
  );
}

function SqlChallengePage({
  challenge,
  isCompleted,
  onComplete,
}: {
  readonly challenge: ChallengeManifest;
  readonly isCompleted: boolean;
  readonly onComplete: CompleteChallengeHandler;
}): JSX.Element {
  const [sql, setSql] = useState<string>(() => getStarterSql(challenge));
  const datasetRef = useMemo(
    () => getChallengeDatasetRef(challenge),
    [challenge],
  );
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [runtimeState, setRuntimeState] = useState<SqlRuntimeState>({
    status: "loading",
  });
  const [queryState, setQueryState] = useState<SqlQueryState>({
    status: "idle",
  });
  const sqlEditorId = `${challenge.id}-sql-editor`;
  const sqlEditorHelpId = `${challenge.id}-sql-editor-help`;
  const checkEvaluation = useMemo(
    () =>
      queryState.status === "success"
        ? evaluateSqlResultChecks(challenge, queryState.result)
        : undefined,
    [challenge, queryState],
  );
  const questionEvaluation = useMemo(
    () => evaluateChallengeQuestions(challenge, answers),
    [answers, challenge],
  );
  const evaluationsByQuestion = useMemo(
    () =>
      new Map(
        questionEvaluation.questions.map(
          (question) => [question.questionId, question] as const,
        ),
      ),
    [questionEvaluation.questions],
  );
  const completion = useMemo(
    () => maybeCreateLocalFlag(challenge, questionEvaluation, checkEvaluation),
    [challenge, checkEvaluation, questionEvaluation],
  );

  useEffect(() => {
    let isActive = true;

    void getSqlRuntime(datasetRef)
      .then((runtime) => {
        if (isActive) {
          setRuntimeState({
            status: "ready",
            tables: runtime.tables,
            connection: runtime.connection,
          });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setRuntimeState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to load DuckDB-Wasm.",
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [challenge.id, datasetRef]);

  useEffect(() => {
    if (completion !== undefined && !isCompleted) {
      onComplete(
        completion.challengeId,
        completion.flag,
        completion.passedCheckIds,
        completion.passedQuestionIds,
      );
    }
  }, [completion, isCompleted, onComplete]);

  function setAnswer(questionId: string, answer: QuizResponse): void {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  async function runQuery(): Promise<void> {
    if (runtimeState.status !== "ready") {
      return;
    }

    if (!isSqlPreviewSupported(sql)) {
      setQueryState({
        status: "error",
        message:
          "Enter a SELECT or WITH query to run against the browser SQL runtime.",
      });
      return;
    }

    setQueryState({ status: "running" });

    try {
      const result = await runSqlPreview(runtimeState.connection, sql);
      setQueryState({ status: "success", result });
    } catch (error: unknown) {
      setQueryState({
        status: "error",
        message:
          error instanceof Error ? error.message : "SQL execution failed.",
      });
    }
  }

  function setSampleQuery(tableName: string): void {
    setSql(`SELECT * FROM ${tableName} LIMIT 10;`);
  }

  return (
    <section
      className="page challengeDetailPage sqlChallengePage"
      aria-labelledby={`${challenge.id}-title`}
    >
      <div className="challengeDetailHeader">
        <a href="#/challenges">Back to challenges</a>
        <PageTitle
          title={challenge.title}
          description={challenge.business_scenario}
          id={`${challenge.id}-title`}
        />
        <div className="sqlChallengeSummary">
          <div>
            <strong>Mode</strong>
            <span>{formatChallengeMode(challenge.mode)}</span>
          </div>
          <div>
            <strong>Tools</strong>
            <span>{formatRequiredTools(challenge.required_tools)}</span>
          </div>
          <div>
            <strong>Version</strong>
            <span>{challenge.version}</span>
          </div>
          <div>
            <strong>Loaded dataset</strong>
            <span>{`${datasetRef.datasetId} ${datasetRef.version}`}</span>
          </div>
        </div>
      </div>

      <ChallengeInstructions challenge={challenge} />

      <div className="sqlChallengeLayout">
        {runtimeState.status === "ready" ? (
          <SqlTableBrowser
            tables={runtimeState.tables}
            onSelectTable={setSampleQuery}
          />
        ) : (
          <aside
            aria-busy={runtimeState.status === "loading"}
            aria-label="Loaded challenge tables"
            className="sqlSidebar"
          >
            <div className="sidebarHeader">
              <p className="eyebrow">Schema browser</p>
              <h2>Dataset tables</h2>
            </div>
            <p
              className={
                runtimeState.status === "loading"
                  ? "sqlLoadingText"
                  : "feedbackBox feedbackFail sqlFeedback"
              }
              role="status"
            >
              {runtimeState.status === "loading"
                ? "Loading DuckDB-Wasm and challenge tables..."
                : runtimeState.message}
            </p>
          </aside>
        )}

        <section
          aria-busy={queryState.status === "running"}
          aria-label="SQL workspace"
          className="sqlWorkspace"
        >
          <div className="sqlEditorPanel">
            <div className="sqlEditorHeader">
              <p className="eyebrow">SQL editor</p>
              <span>
                {isCompleted
                  ? `Flag: ${challenge.flag.id}`
                  : "Flag appears after required checks pass"}
              </span>
            </div>
            <label className="fieldLabel" htmlFor={sqlEditorId}>
              SQL query
            </label>
            <textarea
              aria-describedby={sqlEditorHelpId}
              className="sqlEditor"
              id={sqlEditorId}
              onChange={(event) => setSql(event.currentTarget.value)}
              value={sql}
            />
            <div className="sqlEditorActions">
              <button
                aria-describedby={sqlEditorHelpId}
                disabled={
                  runtimeState.status !== "ready" ||
                  queryState.status === "running"
                }
                type="button"
                onClick={() => void runQuery()}
              >
                {queryState.status === "running" ? "Running..." : "Run Query"}
              </button>
              <p id={sqlEditorHelpId}>
                Queries run fully in the browser against the loaded synthetic
                CSV tables.
              </p>
            </div>
          </div>

          <div className="quizPanel sqlQuestionPanel">
            {challenge.questions.map((question, index) => {
              const questionResult = evaluationsByQuestion.get(question.id);
              const isCorrect = questionResult?.isCorrect ?? false;
              const isAnswered = questionResult?.isAnswered ?? false;
              const numericInputId = `${challenge.id}-${question.id}-numeric-answer`;

              return (
                <fieldset className="quizQuestion" key={question.id}>
                  <legend>
                    <span>Question {index + 1}</span>
                    {question.prompt}
                  </legend>
                  <SourceFactList sourceFacts={question.source_facts} />

                  {question.type === "multiple-choice" &&
                  question.options !== undefined ? (
                    <div className="answerOptions">
                      {question.options.map((option) => (
                        <label key={option.id}>
                          <input
                            checked={
                              getStringAnswer(answers, question.id) ===
                              option.id
                            }
                            name={question.id}
                            onChange={() => setAnswer(question.id, option.id)}
                            type="radio"
                            value={option.id}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {question.type === "select-all" &&
                  question.options !== undefined ? (
                    <div className="answerOptions">
                      {question.options.map((option) => {
                        const selectedAnswers = getArrayAnswer(
                          answers,
                          question.id,
                        );
                        const isSelected = selectedAnswers.includes(option.id);

                        return (
                          <label key={option.id}>
                            <input
                              checked={isSelected}
                              onChange={() =>
                                setAnswer(
                                  question.id,
                                  isSelected
                                    ? selectedAnswers.filter(
                                        (answer) => answer !== option.id,
                                      )
                                    : [...selectedAnswers, option.id],
                                )
                              }
                              type="checkbox"
                              value={option.id}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : null}

                  {question.type === "numeric" ? (
                    <label
                      className="numericAnswerField"
                      htmlFor={numericInputId}
                    >
                      <span className="fieldLabel">
                        Numeric answer for question {index + 1}
                      </span>
                      <input
                        className="numericAnswer"
                        id={numericInputId}
                        inputMode="decimal"
                        onChange={(event) =>
                          setAnswer(question.id, event.currentTarget.value)
                        }
                        type="number"
                        value={getStringAnswer(answers, question.id)}
                      />
                    </label>
                  ) : null}

                  {isAnswered ? (
                    <div
                      className={
                        isCorrect
                          ? "feedbackBox feedbackPass"
                          : "feedbackBox feedbackFail"
                      }
                      role="status"
                    >
                      {isCorrect ? "Correct." : "Incorrect."}
                      {question.explanation !== undefined
                        ? ` ${question.explanation}`
                        : ""}
                    </div>
                  ) : null}
                </fieldset>
              );
            })}
          </div>

          <div className="sqlExamples">
            {runtimeState.status === "ready"
              ? runtimeState.tables.map((table) => (
                  <button
                    key={table.tableName}
                    type="button"
                    onClick={() => setSampleQuery(table.tableName)}
                  >
                    {table.tableName}
                  </button>
                ))
              : null}
          </div>

          {queryState.status === "error" ? (
            <div className="feedbackBox feedbackFail sqlFeedback" role="status">
              {queryState.message}
            </div>
          ) : null}

          {queryState.status === "running" ? (
            <div className="feedbackBox sqlFeedback" role="status">
              Running the SQL query in the browser.
            </div>
          ) : null}

          {queryState.status === "success" ? (
            <SqlResultTable result={queryState.result} />
          ) : null}
          {checkEvaluation !== undefined ? (
            <ValidationSummary evaluation={checkEvaluation} />
          ) : null}
          {completion !== undefined ? (
            <div className="feedbackBox feedbackPass sqlFeedback" role="status">
              Challenge complete. Flag: {completion.flag}
            </div>
          ) : null}
          {queryState.status === "idle" ? (
            <div className="sqlEmptyState">
              Run a query to inspect the synthetic banking tables.
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}

function WorkbenchPage({
  datasetRef,
}: {
  readonly datasetRef: RuntimeDatasetRef | undefined;
}): JSX.Element {
  if (datasetRef === undefined) {
    return (
      <section
        className="page challengeDetailPage"
        aria-labelledby="workbench-title"
      >
        <PageTitle
          title="Browser SQL Workbench"
          description="Choose a committed synthetic dataset to inspect with DuckDB-WASM in this browser."
          id="workbench-title"
        />
        <div className="itemGrid">
          {workbenchDatasetRefs.map((candidate) => (
            <a
              className="itemCard"
              href={`#/workbench/${formatDatasetRef(candidate)}`}
              key={formatDatasetRef(candidate)}
            >
              <div className="itemHeader">
                <h3>{formatDatasetRef(candidate)}</h3>
                <span className="status statusReady">Synthetic</span>
              </div>
              <p>
                Open the browser-local SQL workspace for this committed training
                dataset.
              </p>
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <WorkbenchRuntimePage
      datasetRef={datasetRef}
      key={formatDatasetRef(datasetRef)}
    />
  );
}

function WorkbenchRuntimePage({
  datasetRef,
}: {
  readonly datasetRef: RuntimeDatasetRef;
}): JSX.Element {
  const [sql, setSql] = useState<string>(() =>
    getWorkbenchStarterSql(datasetRef),
  );
  const [runtimeState, setRuntimeState] = useState<SqlRuntimeState>({
    status: "loading",
  });
  const [queryState, setQueryState] = useState<SqlQueryState>({
    status: "idle",
  });
  const sqlEditorId = `${datasetRef.datasetId}-${datasetRef.version}-workbench-sql-editor`;
  const sqlEditorHelpId = `${datasetRef.datasetId}-${datasetRef.version}-workbench-sql-editor-help`;

  useEffect(() => {
    let isActive = true;

    void getSqlRuntime(datasetRef)
      .then((runtime) => {
        if (isActive) {
          setRuntimeState({
            status: "ready",
            tables: runtime.tables,
            connection: runtime.connection,
          });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setRuntimeState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to load DuckDB-Wasm.",
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [datasetRef]);

  async function runQuery(): Promise<void> {
    if (runtimeState.status !== "ready") {
      return;
    }

    if (!isSqlPreviewSupported(sql)) {
      setQueryState({
        status: "error",
        message:
          "Enter a SELECT or WITH query to run against the browser SQL runtime.",
      });
      return;
    }

    setQueryState({ status: "running" });

    try {
      const result = await runSqlPreview(runtimeState.connection, sql);
      setQueryState({ status: "success", result });
    } catch (error: unknown) {
      setQueryState({
        status: "error",
        message:
          error instanceof Error ? error.message : "SQL execution failed.",
      });
    }
  }

  function setSampleQuery(tableName: string): void {
    setSql(`SELECT * FROM ${tableName} LIMIT 10;`);
  }

  return (
    <section
      className="page challengeDetailPage sqlChallengePage"
      aria-labelledby="workbench-title"
    >
      <div className="challengeDetailHeader">
        <PageTitle
          title="Browser SQL Workbench"
          description="Run SELECT queries against committed synthetic datasets entirely in this browser. No backend, credentials, CLI, Python, or Docker are required."
          id="workbench-title"
        />
        <div className="sqlChallengeSummary">
          <div>
            <strong>Mode</strong>
            <span>Browser SQL practice</span>
          </div>
          <div>
            <strong>Dataset</strong>
            <span>{formatDatasetRef(datasetRef)}</span>
          </div>
          <div>
            <strong>Runtime</strong>
            <span>DuckDB-WASM</span>
          </div>
          <div>
            <strong>Storage</strong>
            <span>Local browser only</span>
          </div>
        </div>
      </div>

      <div className="sqlChallengeLayout">
        {runtimeState.status === "ready" ? (
          <SqlTableBrowser
            tables={runtimeState.tables}
            onSelectTable={setSampleQuery}
          />
        ) : (
          <aside
            aria-busy={runtimeState.status === "loading"}
            aria-label="Loaded workbench tables"
            className="sqlSidebar"
          >
            <div className="sidebarHeader">
              <p className="eyebrow">Schema browser</p>
              <h2>Dataset tables</h2>
            </div>
            <p
              className={
                runtimeState.status === "loading"
                  ? "sqlLoadingText"
                  : "feedbackBox feedbackFail sqlFeedback"
              }
              role="status"
            >
              {runtimeState.status === "loading"
                ? "Loading DuckDB-WASM and synthetic dataset tables..."
                : runtimeState.message}
            </p>
          </aside>
        )}

        <section
          aria-busy={queryState.status === "running"}
          aria-label="SQL workspace"
          className="sqlWorkspace"
        >
          <div className="sqlEditorPanel">
            <div className="sqlEditorHeader">
              <p className="eyebrow">SQL editor</p>
              <span>Tutorial workspace</span>
            </div>
            <label className="fieldLabel" htmlFor={sqlEditorId}>
              SQL query
            </label>
            <textarea
              aria-describedby={sqlEditorHelpId}
              className="sqlEditor"
              id={sqlEditorId}
              onChange={(event) => setSql(event.currentTarget.value)}
              value={sql}
            />
            <div className="sqlEditorActions">
              <button
                aria-describedby={sqlEditorHelpId}
                disabled={
                  runtimeState.status !== "ready" ||
                  queryState.status === "running"
                }
                type="button"
                onClick={() => void runQuery()}
              >
                {queryState.status === "running" ? "Running..." : "Run Query"}
              </button>
              <p id={sqlEditorHelpId}>
                Use this SQL workbench to run tutorial queries. It does not
                grade answers or send data outside the browser.
              </p>
            </div>
          </div>

          <div className="sqlExamples">
            {runtimeState.status === "ready"
              ? runtimeState.tables.map((table) => (
                  <button
                    key={table.tableName}
                    type="button"
                    onClick={() => setSampleQuery(table.tableName)}
                  >
                    {table.tableName}
                  </button>
                ))
              : null}
          </div>

          {queryState.status === "error" ? (
            <div className="feedbackBox feedbackFail sqlFeedback" role="status">
              {queryState.message}
            </div>
          ) : null}

          {queryState.status === "running" ? (
            <div className="feedbackBox sqlFeedback" role="status">
              Running the SQL query in the browser.
            </div>
          ) : null}

          {queryState.status === "success" ? (
            <SqlResultTable result={queryState.result} />
          ) : null}

          {queryState.status === "idle" ? (
            <div className="sqlEmptyState">
              Run a tutorial query to inspect the synthetic banking tables.
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}

function HomePage(): JSX.Element {
  return (
    <section className="page homePage" aria-labelledby="home-title">
      <div className="heroPanel">
        <div>
          <p className="eyebrow">Browser-hosted banking BI tutorial platform</p>
          <h1 id="home-title">Looker BI Gym</h1>
          <p className="lead">
            A static React app for technical BI practice with Romanian banking
            flavor, deterministic browser checks, Markdown content, and local
            learner progress.
          </p>
          <div className="heroActions" aria-label="Start points">
            <a href="#/docs/README.md">Read Docs</a>
            <a href="#/tutorials/README.md">Browse Tutorials</a>
          </div>
        </div>
        <div className="dataPreview" aria-label="Synthetic dataset preview">
          <div className="previewHeader">
            <span>deposits_snapshot.csv</span>
            <strong>synthetic</strong>
          </div>
          <div className="previewRows">
            <span>branch_city</span>
            <span>currency</span>
            <span>balance</span>
            <span>Bucuresti</span>
            <span>RON</span>
            <span>42,800</span>
            <span>Cluj-Napoca</span>
            <span>EUR</span>
            <span>9,250</span>
            <span>Iasi</span>
            <span>RON</span>
            <span>18,640</span>
          </div>
        </div>
      </div>

      <div className="principles" aria-label="Platform constraints">
        {principles.map((principle) => (
          <span key={principle}>{principle}</span>
        ))}
      </div>

      <div className="contentOverview" aria-label="Content sections">
        {contentSections.map((section) => (
          <a href={`#/${section.id}/README.md`} key={section.id}>
            <strong>{section.label}</strong>
            <span>{section.documents.length} Markdown files</span>
          </a>
        ))}
      </div>

      <div className="splitLayout">
        <section aria-labelledby="current-track">
          <h2 id="current-track">Learning Path</h2>
          <p>
            Start with the browser-only tutorials and challenges, then use the
            optional Looker Studio recipe when you want to apply the same metric
            and evidence patterns in a reporting tool. Your progress and flags
            stay in this browser.
          </p>
        </section>
        <section aria-labelledby="safety-note">
          <h2 id="safety-note">Training Boundary</h2>
          <p>
            This is technical training material. It is not legal, regulatory,
            accounting, privacy, compliance, or model-risk advice. Validate
            production banking work with the appropriate institutional teams.
          </p>
        </section>
      </div>
    </section>
  );
}

type TermAnchor = {
  readonly filePath: string;
  readonly fileName: string;
  readonly slug: string;
  readonly text: string;
};

function collectTermAnchors(section: ContentSection): readonly TermAnchor[] {
  const anchors: TermAnchor[] = [];
  const headingPattern = /^##\s+(.+?)\s*$/gmu;

  for (const document of section.documents) {
    for (const match of document.markdown.matchAll(headingPattern)) {
      const text = match[1]?.trim();
      if (text === undefined || text.length === 0) {
        continue;
      }
      const slug = slugifyHeading(text);
      if (slug.length === 0) {
        continue;
      }
      anchors.push({
        filePath: document.filePath,
        fileName: document.fileName,
        slug,
        text,
      });
    }
  }

  return anchors;
}

function ContentPage({
  sectionId,
  fileName,
}: {
  readonly sectionId: ContentSectionId;
  readonly fileName?: string;
}): JSX.Element {
  const section = getSection(sectionId);
  const document = getDocument(sectionId, fileName);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const isTerminologySection = sectionId === "terminology";
  const termAnchors = useMemo(
    () => (section !== undefined ? collectTermAnchors(section) : []),
    [section],
  );
  const matchingTermAnchors = useMemo(() => {
    if (!isTerminologySection || normalizedSearchTerm.length === 0) {
      return [];
    }
    return termAnchors.filter((anchor) =>
      anchor.text.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [isTerminologySection, normalizedSearchTerm, termAnchors]);
  const visibleDocuments =
    section?.documents.filter((candidate) => {
      if (normalizedSearchTerm.length === 0) {
        return true;
      }

      return (
        candidate.title.toLowerCase().includes(normalizedSearchTerm) ||
        candidate.fileName.toLowerCase().includes(normalizedSearchTerm) ||
        candidate.markdown.toLowerCase().includes(normalizedSearchTerm)
      );
    }) ?? [];

  if (section === undefined || document === undefined) {
    return (
      <section className="page" aria-labelledby="missing-title">
        <PageTitle
          title="Content Not Found"
          description="The requested Markdown document is not available in the static catalog."
          id="missing-title"
        />
      </section>
    );
  }

  return (
    <section className="contentPage" aria-labelledby={`${sectionId}-title`}>
      <aside className="documentNav" aria-label={`${section.label} documents`}>
        <div>
          <p className="eyebrow">Lessons</p>
          <h2 id={`${sectionId}-title`}>{section.label}</h2>
          <p>{section.description}</p>
        </div>
        <label className="documentSearch">
          <span>Search {section.label.toLowerCase()}</span>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            placeholder={
              isTerminologySection ? "Search terms" : "Search terms and pages"
            }
            type="search"
            value={searchTerm}
          />
        </label>
        {matchingTermAnchors.length > 0 ? (
          <nav className="termAnchorResults" aria-label="Matching terms">
            <p className="eyebrow">Terms</p>
            {matchingTermAnchors.slice(0, 25).map((anchor) => (
              <a
                className="termAnchorLink"
                href={`#/${anchor.filePath}#${anchor.slug}`}
                key={`${anchor.filePath}#${anchor.slug}`}
              >
                <span>{anchor.text}</span>
                <small>{anchor.fileName}</small>
              </a>
            ))}
            {matchingTermAnchors.length > 25 ? (
              <p className="emptyState">
                Showing 25 of {matchingTermAnchors.length} matching terms.
                Refine the search to narrow down.
              </p>
            ) : null}
          </nav>
        ) : null}
        <nav>
          {visibleDocuments.map((candidate) => (
            <a
              aria-current={
                candidate.fileName === document.fileName ? "page" : undefined
              }
              href={`#/${candidate.filePath}`}
              key={candidate.filePath}
            >
              <span>{candidate.title}</span>
              <small>{candidate.fileName}</small>
            </a>
          ))}
          {visibleDocuments.length === 0 ? (
            <p className="emptyState">No matching pages.</p>
          ) : null}
        </nav>
      </aside>
      <MarkdownArticle document={document} />
    </section>
  );
}

function MarkdownArticle({
  document,
}: {
  readonly document: ContentDocument;
}): JSX.Element {
  const html = useMemo(() => renderMarkdown(document), [document]);

  useEffect(() => {
    const scrollToFragment = (): void => {
      const fragment = fragmentFromHash();
      if (fragment === undefined) {
        return;
      }
      requestAnimationFrame(() => {
        const target = window.document.getElementById(fragment);
        if (target !== null) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
      });
    };

    scrollToFragment();
    window.addEventListener("hashchange", scrollToFragment);
    return () => {
      window.removeEventListener("hashchange", scrollToFragment);
    };
  }, [html]);

  return (
    <article className="markdownArticle">
      <div className="documentMeta">
        <span>{document.filePath}</span>
        <a href={`#/${document.section}`}>Back to {document.section}</a>
      </div>
      <div
        className="markdownBody"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

function ChallengesPage({
  challengeId,
}: {
  readonly challengeId?: string;
}): JSX.Element {
  const [progress, setProgress] = useState<LearnerProgressState>(() =>
    readBrowserLearnerProgress(getBrowserProgressPersistence()),
  );
  const completedChallengeIds = useMemo(
    () => getCompletedChallengeIds(progress),
    [progress],
  );
  const selectedChallenge = getChallengeById(challengeId);

  function completeSelectedChallenge(
    challengeIdToComplete: string,
    flag: string,
    passedCheckIds: readonly string[],
    passedQuestionIds: readonly string[],
  ): void {
    setProgress((currentProgress) => {
      const nextProgress = completeChallenge(currentProgress, {
        challengeId: challengeIdToComplete,
        flag,
        passedCheckIds,
        passedQuestionIds,
      });
      writeBrowserLearnerProgress(
        nextProgress,
        getBrowserProgressPersistence(),
      );
      return nextProgress;
    });
  }

  if (challengeId !== undefined && selectedChallenge === undefined) {
    return (
      <section className="page" aria-labelledby="missing-challenge-title">
        <a className="backLink" href="#/challenges">
          Back to challenges
        </a>
        <PageTitle
          title="Challenge Not Found"
          description="The requested challenge is not available in the current challenge catalog."
          id="missing-challenge-title"
        />
      </section>
    );
  }

  if (selectedChallenge?.mode === "quiz") {
    return (
      <QuizChallengePage
        key={selectedChallenge.id}
        challenge={selectedChallenge}
        isCompleted={completedChallengeIds.has(selectedChallenge.id)}
        onComplete={completeSelectedChallenge}
      />
    );
  }

  if (selectedChallenge?.mode === "browser-sql") {
    return (
      <SqlChallengePage
        key={selectedChallenge.id}
        challenge={selectedChallenge}
        isCompleted={completedChallengeIds.has(selectedChallenge.id)}
        onComplete={completeSelectedChallenge}
      />
    );
  }

  if (selectedChallenge?.mode === "cloud-evidence") {
    return (
      <LocalEvidenceChallengePage
        key={selectedChallenge.id}
        challenge={selectedChallenge}
        isCompleted={completedChallengeIds.has(selectedChallenge.id)}
        onComplete={completeSelectedChallenge}
      />
    );
  }

  if (selectedChallenge?.mode === "browser-config") {
    return (
      <LocalEvidenceChallengePage
        key={selectedChallenge.id}
        challenge={selectedChallenge}
        isCompleted={completedChallengeIds.has(selectedChallenge.id)}
        onComplete={completeSelectedChallenge}
      />
    );
  }

  if (selectedChallenge !== undefined) {
    return <UnsupportedChallengePage challenge={selectedChallenge} />;
  }

  return (
    <section className="page" aria-labelledby="challenges-title">
      <PageTitle
        title="Challenges"
        description="Practice modes run from offline challenge definitions. No backend calls or hidden server checks are required."
        id="challenges-title"
      />
      <ChallengeList
        challenges={challengeCatalog}
        completedChallengeIds={completedChallengeIds}
      />
    </section>
  );
}

function FlashcardsPage(): JSX.Element {
  const [state, setState] = useState<FlashcardState>(readBrowserFlashcardState);
  const [selectedDeckId, setSelectedDeckId] = useState<string>(
    flashcardDecks[0]?.id ?? "",
  );
  const [showBack, setShowBack] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [reviewMode, setReviewMode] = useState<"due" | "all">("due");
  const [importJson, setImportJson] = useState<string>("");
  const [importMessage, setImportMessage] = useState<string>("");
  const [importPreview, setImportPreview] = useState<
    FlashcardState | undefined
  >(undefined);
  const selectedDeck =
    flashcardDecks.find((deck) => deck.id === selectedDeckId) ??
    flashcardDecks[0];
  const nowIso = new Date().toISOString();
  const searchTerms = searchText
    .trim()
    .toLowerCase()
    .split(/\s+/u)
    .filter((term) => term.length > 0);
  const totalCardCount = flashcardDecks.reduce(
    (count, deck) => count + deck.cards.length,
    0,
  );
  const totalDueCount = flashcardDecks.reduce(
    (count, deck) =>
      count +
      deck.cards.filter(
        (card) => getFlashcardState(state, card.id, nowIso).dueAt <= nowIso,
      ).length,
    0,
  );
  const dueCards =
    selectedDeck?.cards.filter(
      (card) => getFlashcardState(state, card.id, nowIso).dueAt <= nowIso,
    ) ?? [];
  const filteredCards =
    selectedDeck?.cards.filter((card) => {
      if (searchTerms.length === 0) {
        return true;
      }

      const searchableText = [
        card.front,
        card.back,
        card.id,
        ...card.sourceFacts,
        ...card.recommendedPaths,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    }) ?? [];
  const reviewCards = filteredCards.filter((card) => {
    if (reviewMode === "all") {
      return true;
    }

    return getFlashcardState(state, card.id, nowIso).dueAt <= nowIso;
  });
  const activeCard = reviewCards[0];
  const exportJson = useMemo(() => JSON.stringify(state, null, 2), [state]);

  function persistState(nextState: FlashcardState): void {
    setState(nextState);
    writeBrowserFlashcardState(nextState);
  }

  function reviewActiveCard(rating: FlashcardRating): void {
    if (activeCard === undefined) {
      return;
    }

    persistState(
      reviewFlashcard(state, activeCard.id, rating, new Date().toISOString()),
    );
    setShowBack(false);
    setImportMessage("");
  }

  function validateImport(): void {
    const result = parseFlashcardImport(importJson);

    if (result.status === "invalid") {
      setImportMessage(result.message);
      setImportPreview(undefined);
      return;
    }

    setImportPreview(result.state);
    setImportMessage(
      "Flashcard import is valid. Review the preview, then apply it locally.",
    );
  }

  function applyImport(): void {
    if (importPreview === undefined) {
      setImportMessage("Validate flashcard JSON before applying it.");
      return;
    }

    persistState(importPreview);
    setImportPreview(undefined);
    setImportMessage("Flashcard review state imported locally.");
  }

  function resetFlashcards(): void {
    const nextState = createEmptyFlashcardState(new Date().toISOString());

    persistState(nextState);
    setShowBack(false);
    setImportPreview(undefined);
    setImportMessage("Flashcard review state has been reset in this browser.");
  }

  return (
    <section className="page" aria-labelledby="flashcards-title">
      <PageTitle
        title="Flashcards"
        description="Topic-separated review decks with browser-local Anki-style timestamps, due dates, and JSON state export/import."
        id="flashcards-title"
      />
      <div className="learningPanel">
        <div className="learningPanelHeader">
          <div>
            <h2>Decks</h2>
            <p>
              Review state stays in this browser. Cards are grouped by BI topic
              and record timestamped review history.
            </p>
          </div>
          <span className="status statusReady">
            {flashcardDecks.length} decks / {totalCardCount} cards /{" "}
            {totalDueCount} due
          </span>
        </div>
        <label className="exportNotesField" htmlFor="flashcard-search">
          <span className="fieldLabel">Search flashcards</span>
          <input
            id="flashcard-search"
            onChange={(event) => {
              setSearchText(event.currentTarget.value);
              setShowBack(false);
            }}
            type="search"
            value={searchText}
          />
        </label>
        <div className="settingsButtonRow" aria-label="Review mode">
          <button
            aria-pressed={reviewMode === "due"}
            onClick={() => {
              setReviewMode("due");
              setShowBack(false);
            }}
            type="button"
          >
            Due Cards
          </button>
          <button
            aria-pressed={reviewMode === "all"}
            onClick={() => {
              setReviewMode("all");
              setShowBack(false);
            }}
            type="button"
          >
            All Cards
          </button>
        </div>
        <div className="learningMeta">
          {flashcardDecks.map((deck) => {
            const dueCount = deck.cards.filter(
              (card) =>
                getFlashcardState(state, card.id, nowIso).dueAt <= nowIso,
            ).length;

            return (
              <button
                aria-pressed={deck.id === selectedDeck?.id}
                key={deck.id}
                onClick={() => {
                  setSelectedDeckId(deck.id);
                  setShowBack(false);
                  setSearchText("");
                }}
                type="button"
              >
                {deck.title} ({dueCount} due)
              </button>
            );
          })}
        </div>
        <ExternalFlashcardSourceReviewList
          deckId={selectedDeck?.id}
          sourceReviews={selectedDeck?.sourceReviews}
        />
      </div>

      {selectedDeck !== undefined && activeCard !== undefined ? (
        <section className="learningPanel" aria-labelledby="review-card-title">
          <div className="learningPanelHeader">
            <div>
              <p className="eyebrow">{selectedDeck.topic}</p>
              <h2 id="review-card-title">{activeCard.front}</h2>
            </div>
            <span className="status statusReady">{dueCards.length} due</span>
          </div>
          {showBack ? (
            <div className="learningQuestion">
              <p>{activeCard.back}</p>
              <SourceFactList sourceFacts={activeCard.sourceFacts} />
              <div className="settingsButtonRow">
                {(["again", "hard", "good", "easy"] as const).map((rating) => (
                  <button
                    key={rating}
                    onClick={() => reviewActiveCard(rating)}
                    type="button"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setShowBack(true)}>
              Show Answer
            </button>
          )}
        </section>
      ) : (
        <section className="learningPanel" aria-labelledby="review-card-title">
          <div className="learningPanelHeader">
            <div>
              <p className="eyebrow">{selectedDeck?.topic ?? "Flashcards"}</p>
              <h2 id="review-card-title">No matching cards</h2>
            </div>
            <span className="status statusPlanned">
              {reviewMode === "due" ? "0 due" : "0 matches"}
            </span>
          </div>
          <p>
            Switch to all cards, choose another deck, or change the search text.
          </p>
        </section>
      )}

      <section className="settingsActionPanel progressExportPanel">
        <div>
          <h3>Flashcard State</h3>
          <p>
            Export or import review state as one JSON document. The JSON
            includes review timestamps, due dates, intervals, ease factors,
            repetitions, and lapses.
          </p>
        </div>
        <label className="exportNotesField" htmlFor="flashcard-import-json">
          <span className="fieldLabel">Flashcard import JSON</span>
          <textarea
            id="flashcard-import-json"
            onChange={(event) => {
              setImportJson(event.currentTarget.value);
              setImportPreview(undefined);
              setImportMessage("");
            }}
            value={importJson}
          />
        </label>
        <div className="settingsButtonRow">
          <button type="button" onClick={validateImport}>
            Validate Flashcards
          </button>
          <button
            disabled={importPreview === undefined}
            type="button"
            onClick={applyImport}
          >
            Apply Flashcards
          </button>
        </div>
        {importPreview !== undefined ? (
          <div className="feedbackBox" role="status">
            Preview ready: {Object.keys(importPreview.cards).length} reviewed
            cards from {importPreview.updatedAt}.
          </div>
        ) : null}
        <div className="exportPreview">
          <div>
            <h3>Export Preview</h3>
            <p>Review this local JSON before saving or sharing it.</p>
          </div>
          <textarea
            aria-label="Flashcard state export JSON preview"
            readOnly
            value={exportJson}
          />
        </div>
        {importMessage.length > 0 ? (
          <div className="feedbackBox" role="status">
            {importMessage}
          </div>
        ) : null}
        <div className="settingsButtonRow">
          <button type="button" onClick={resetFlashcards}>
            Reset Flashcards
          </button>
        </div>
      </section>
    </section>
  );
}

function SettingsPage(): JSX.Element {
  const [resetMessage, setResetMessage] = useState<string>("");
  const [progress, setProgress] = useState<LearnerProgressState>(() =>
    readBrowserLearnerProgress(getBrowserProgressPersistence()),
  );
  const [learnerNotes, setLearnerNotes] = useState<string>("");
  const [exportMessage, setExportMessage] = useState<string>("");
  const [importJson, setImportJson] = useState<string>("");
  const [importResult, setImportResult] = useState<
    LearnerProgressImportResult | undefined
  >();
  const [importMessage, setImportMessage] = useState<string>("");
  const progressExport = useMemo(
    () =>
      buildLearnerProgressExport(progress, challengeCatalog, {
        appVersion,
        contentVersion,
        learnerNotes,
      }),
    [learnerNotes, progress],
  );
  const exportJson = useMemo(
    () => JSON.stringify(progressExport, null, 2),
    [progressExport],
  );

  function resetProgress(): void {
    setProgress(resetBrowserLearnerProgress(getBrowserProgressPersistence()));
    setResetMessage("Local progress has been reset in this browser.");
    setExportMessage("");
    setImportMessage("");
  }

  function exportProgress(): void {
    const blob = new Blob([exportJson], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = `looker-bi-gym-progress-${progressExport.exported_at.slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    setExportMessage(
      "Progress export was prepared locally as a JSON download.",
    );
    setResetMessage("");
    setImportMessage("");
  }

  function validateImport(): void {
    const result = parseLearnerProgressImport(importJson, challengeCatalog);

    setImportResult(result);
    setImportMessage("");
    setResetMessage("");
    setExportMessage("");
  }

  function applyImport(): void {
    if (importResult?.status !== "valid") {
      return;
    }

    writeBrowserLearnerProgress(
      importResult.preview.progress,
      getBrowserProgressPersistence(),
    );
    setProgress(importResult.preview.progress);
    setImportMessage("Imported progress was applied locally in this browser.");
    setResetMessage("");
    setExportMessage("");
  }

  return (
    <section className="page settingsPage" aria-labelledby="settings-title">
      <PageTitle
        title="Settings"
        description="Learner state remains browser-local in localStorage and a same-site cookie. Export creates a user-controlled JSON file; reset clears challenge completion and local flags from this browser."
        id="settings-title"
      />
      <div className="settingsPanel">
        <div>
          <h3>Storage</h3>
          <p>
            Local browser storage plus a same-site cookie. Nothing is
            transmitted by this static app, and there is no backend session.
          </p>
        </div>
        <div>
          <h3>Release</h3>
          <p>{formatVersionLabel()}</p>
        </div>
        <div>
          <h3>Tools</h3>
          <p>
            The default path requires no learner-installed tools. Optional tools
            must be named by the tutorial.
          </p>
        </div>
        <div>
          <h3>Credentials</h3>
          <p>
            No BigQuery, Looker Studio, Google Cloud, or banking credentials are
            requested or stored.
          </p>
        </div>
      </div>
      <div className="settingsActionPanel progressExportPanel">
        <div>
          <h3>Progress Export</h3>
          <p>
            Exported JSON includes completed challenge IDs, local flags,
            timestamps, dataset versions, app/content version, and notes you
            type here. It excludes credentials, raw challenge answers, pasted
            cloud evidence, and real banking data.
          </p>
        </div>
        <button type="button" onClick={exportProgress}>
          Export JSON
        </button>
        <label className="exportNotesField" htmlFor="progress-export-notes">
          <span className="fieldLabel">Learner notes for this export</span>
          <textarea
            id="progress-export-notes"
            onChange={(event) => setLearnerNotes(event.currentTarget.value)}
            placeholder="Optional reviewer-facing notes. Do not include credentials or real banking data."
            value={learnerNotes}
          />
        </label>
        <div className="exportPreview">
          <div>
            <h3>Preview</h3>
            <p>
              Import is not available in this release. Review this local JSON
              before sharing it for completion evidence.
            </p>
          </div>
          <textarea
            aria-label="Progress export JSON preview"
            readOnly
            value={exportJson}
          />
        </div>
        {exportMessage.length > 0 ? (
          <div className="feedbackBox feedbackPass" role="status">
            {exportMessage}
          </div>
        ) : null}
      </div>
      <div className="settingsActionPanel progressExportPanel">
        <div>
          <h3>Progress Import</h3>
          <p>
            Paste a `looker-bi-gym.progress-export.v1` JSON export to validate
            it locally. The app previews the import before applying it and never
            uploads the file.
          </p>
        </div>
        <label className="exportNotesField" htmlFor="progress-import-json">
          <span className="fieldLabel">Progress import JSON</span>
          <textarea
            id="progress-import-json"
            onChange={(event) => {
              setImportJson(event.currentTarget.value);
              setImportResult(undefined);
              setImportMessage("");
            }}
            placeholder="Paste exported progress JSON here. Do not paste credentials or real banking data."
            value={importJson}
          />
        </label>
        <div className="settingsButtonRow">
          <button type="button" onClick={validateImport}>
            Validate Import
          </button>
          <button
            disabled={importResult?.status !== "valid"}
            type="button"
            onClick={applyImport}
          >
            Apply Import
          </button>
        </div>
        {importResult?.status === "invalid" ? (
          <div className="feedbackBox feedbackFail" role="status">
            {importResult.message}
          </div>
        ) : null}
        {importResult?.status === "valid" ? (
          <div className="exportPreview" aria-label="Progress import preview">
            <div>
              <h3>Import Preview</h3>
              <p>
                {importResult.preview.importedChallengeIds.length} completed
                challenges from export {importResult.preview.exportedAt}.
              </p>
              <p>
                Source versions: app {importResult.preview.appVersion}, content{" "}
                {importResult.preview.contentVersion}.
              </p>
              {importResult.preview.warnings.length > 0 ? (
                <ul>
                  {importResult.preview.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <textarea
              aria-label="Progress import challenge IDs preview"
              readOnly
              value={importResult.preview.importedChallengeIds.join("\n")}
            />
          </div>
        ) : null}
        {importMessage.length > 0 ? (
          <div className="feedbackBox feedbackPass" role="status">
            {importMessage}
          </div>
        ) : null}
      </div>
      <div className="settingsActionPanel">
        <div>
          <h3>Progress</h3>
          <p>
            Completion flags and challenge state are stored only in local
            browser storage and the same-site progress cookie. Reset does not
            delete exported JSON files that already exist outside the browser.
          </p>
        </div>
        <button type="button" onClick={resetProgress}>
          Reset Progress
        </button>
        {resetMessage.length > 0 ? (
          <div className="feedbackBox feedbackPass" role="status">
            {resetMessage}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function PageTitle({
  title,
  description,
  id,
}: {
  readonly title: string;
  readonly description: string;
  readonly id: string;
}): JSX.Element {
  return (
    <header className="pageTitle">
      <p className="eyebrow">Static app section</p>
      <h1 id={id}>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function AppPage({ route }: { readonly route: AppRoute }): JSX.Element {
  if (isContentSectionId(route.section)) {
    const defaultFileName = getDefaultDocument(route.section)?.fileName;
    const contentPageProps =
      route.fileName !== undefined
        ? { sectionId: route.section, fileName: route.fileName }
        : defaultFileName !== undefined
          ? { sectionId: route.section, fileName: defaultFileName }
          : { sectionId: route.section };

    return <ContentPage {...contentPageProps} />;
  }

  switch (route.section) {
    case "home":
      return <HomePage />;
    case "quiz":
      return <QuizBankPage />;
    case "exam":
      return <ExamPage />;
    case "facts":
      return <FactsPage factRouteId={route.fileName} />;
    case "workbench":
      return (
        <WorkbenchPage datasetRef={getWorkbenchDatasetRef(route.fileName)} />
      );
    case "flashcards":
      return <FlashcardsPage />;
    case "challenges":
      return route.fileName !== undefined ? (
        <ChallengesPage challengeId={route.fileName} />
      ) : (
        <ChallengesPage />
      );
    case "settings":
      return <SettingsPage />;
  }
}

export function App(): JSX.Element {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(routeFromHash);
  const mainRef = useRef<HTMLElement>(null);
  const hasMountedRef = useRef<boolean>(false);

  useEffect(() => {
    const onHashChange = (): void => {
      setActiveRoute(routeFromHash());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (hasMountedRef.current) {
      mainRef.current?.focus();
    } else {
      hasMountedRef.current = true;
    }
  }, [activeRoute]);

  const activeLabel = useMemo(
    () =>
      routes.find((route) => route.id === activeRoute.section)?.label ?? "Home",
    [activeRoute.section],
  );

  return (
    <div className="appShell">
      <a className="skipLink" href="#main-content">
        Skip to main content
      </a>
      <header className="topBar">
        <a className="brand" href="#/home" aria-label="Looker BI Gym home">
          <span className="brandMark" aria-hidden="true">
            BI
          </span>
          <span>Looker BI Gym</span>
        </a>
        <nav className="navLinks" aria-label="Primary navigation">
          {routes.map((route) => (
            <a
              aria-current={
                route.id === activeRoute.section ? "page" : undefined
              }
              href={`#/${route.id}`}
              key={route.id}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <div className="mobileRouteLabel" aria-live="polite">
          {activeLabel}
        </div>
        <AppPage route={activeRoute} />
      </main>
      <footer className="appFooter">
        <span>{formatVersionLabel()}</span>
        <span>Synthetic training content only.</span>
      </footer>
    </div>
  );
}
