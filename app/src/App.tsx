import { useEffect, useMemo, useRef, useState } from "react";
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
  challengeCatalog,
  formatChallengeArea,
  formatChallengeDifficulty,
  formatChallengeMode,
  formatRequiredTools,
} from "./challenges";
import { renderMarkdown } from "./markdown";
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
  readLearnerProgress,
  resetLearnerProgress,
  writeLearnerProgress,
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
import type { ContentDocument, ContentSectionId } from "./content";
import type { LearnerProgressState } from "./progress";
import type { QuizAnswerState, QuizResponse } from "./quiz";
import type { SqlQueryResult, SqlTableSchema } from "./sqlRuntime";
import type { ValidationEvaluation } from "./validators";

type RouteId = "home" | ContentSectionId | "challenges" | "settings";

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
  { id: "tutorials", label: "Tutorials" },
  { id: "challenges", label: "Challenges" },
  { id: "settings", label: "Settings" },
];

const contentRouteIds: ReadonlySet<RouteId> = new Set<RouteId>([
  "docs",
  "regulations",
  "tutorials",
]);

const principles: readonly string[] = [
  "Static GitHub Pages app",
  "No backend or credentials",
  "Synthetic banking datasets only",
  "Default learner path runs in the browser",
  "Optional tools are listed per tutorial",
];

function isRouteId(value: string | undefined): value is RouteId {
  return value !== undefined && routes.some((route) => route.id === value);
}

function isContentSectionId(value: RouteId): value is ContentSectionId {
  return contentRouteIds.has(value);
}

function routeFromHash(): AppRoute {
  const hashPath = window.location.hash.replace(/^#\/?/, "");
  const [sectionCandidate, ...fileParts] = hashPath.split("/");
  const section = isRouteId(sectionCandidate) ? sectionCandidate : "home";
  const fileName = fileParts.join("/");

  return fileName.length > 0 ? { section, fileName } : { section };
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

function getStarterSql(challenge: ChallengeManifest): string {
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
        <h2>Seed tables</h2>
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
    default:
      return type;
  }
}

function CloudEvidenceField({
  evidence,
  value,
  onChange,
}: {
  readonly evidence: NonNullable<ChallengeManifest["evidence"]>[number];
  readonly value: CloudEvidenceValue | undefined;
  readonly onChange: (evidenceId: string, value: CloudEvidenceValue) => void;
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
    evidence.type === "screenshot-description";

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

function CloudEvidencePage({
  challenge,
  isCompleted,
  onComplete,
}: {
  readonly challenge: ChallengeManifest;
  readonly isCompleted: boolean;
  readonly onComplete: CompleteChallengeHandler;
}): JSX.Element {
  const [evidenceAnswers, setEvidenceAnswers] =
    useState<CloudEvidenceAnswerState>({});
  const [questionAnswers, setQuestionAnswers] = useState<QuizAnswerState>({});
  const checkEvaluation = useMemo(
    () => evaluateCloudEvidenceChecks(challenge, evidenceAnswers),
    [challenge, evidenceAnswers],
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
      check.type !== "quiz-answer" && !isCloudEvidenceCheckSupported(check),
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
    value: CloudEvidenceValue,
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
      className="page challengeDetailPage cloudEvidencePage"
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
          This cloud evidence challenge includes unsupported checks and cannot
          be completed yet.
        </div>
      ) : null}

      <div className="cloudEvidenceLayout">
        <section className="evidencePanel" aria-label="Evidence inputs">
          <div>
            <p className="eyebrow">Evidence</p>
            <h2>Local evidence capture</h2>
          </div>
          <div className="evidenceGrid">
            {(challenge.evidence ?? []).map((evidence) => (
              <CloudEvidenceField
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
            <h2>Credential boundary</h2>
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
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [runtimeState, setRuntimeState] = useState<
    | { readonly status: "loading" }
    | {
        readonly status: "ready";
        readonly tables: readonly SqlTableSchema[];
        readonly connection: Awaited<
          ReturnType<typeof getSqlRuntime>
        >["connection"];
      }
    | { readonly status: "error"; readonly message: string }
  >({ status: "loading" });
  const [queryState, setQueryState] = useState<
    | { readonly status: "idle" }
    | { readonly status: "running" }
    | { readonly status: "success"; readonly result: SqlQueryResult }
    | { readonly status: "error"; readonly message: string }
  >({ status: "idle" });
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

    void getSqlRuntime()
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
  }, [challenge.id]);

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
            <span>
              {challenge.inputs[0]?.dataset_id ?? "Synthetic CSV seed"}
            </span>
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
              <h2>Seed tables</h2>
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
                ? "Loading DuckDB-Wasm and seed tables..."
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
            <button type="button" onClick={() => setSampleQuery("branches")}>
              branches
            </button>
            <button type="button" onClick={() => setSampleQuery("products")}>
              products
            </button>
            <button type="button" onClick={() => setSampleQuery("accounts")}>
              accounts
            </button>
            <button
              type="button"
              onClick={() => setSampleQuery("account_owners")}
            >
              account_owners
            </button>
            <button
              type="button"
              onClick={() => setSampleQuery("account_daily_balances")}
            >
              account_daily_balances
            </button>
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
          <h2 id="current-track">Current Track</h2>
          <p>
            The app shell now loads existing Markdown source material. Challenge
            manifests, datasets, DuckDB-WASM SQL execution, browser validators,
            and local progress flags are in place for the first browser
            challenges.
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

function ContentPage({
  sectionId,
  fileName,
}: {
  readonly sectionId: ContentSectionId;
  readonly fileName?: string;
}): JSX.Element {
  const section = getSection(sectionId);
  const document = getDocument(sectionId, fileName);

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
          <p className="eyebrow">Markdown catalog</p>
          <h2 id={`${sectionId}-title`}>{section.label}</h2>
          <p>{section.description}</p>
        </div>
        <nav>
          {section.documents.map((candidate) => (
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
    readLearnerProgress(window.localStorage),
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
      writeLearnerProgress(nextProgress, window.localStorage);
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
          description="The requested challenge is not available in the generated static catalog."
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
      <CloudEvidencePage
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
        description="Challenge modes are loaded from validated static manifests. No backend calls or hidden server checks are required."
        id="challenges-title"
      />
      <ChallengeList
        challenges={challengeCatalog}
        completedChallengeIds={completedChallengeIds}
      />
    </section>
  );
}

function SettingsPage(): JSX.Element {
  const [resetMessage, setResetMessage] = useState<string>("");
  const [progress, setProgress] = useState<LearnerProgressState>(() =>
    readLearnerProgress(window.localStorage),
  );
  const [learnerNotes, setLearnerNotes] = useState<string>("");
  const [exportMessage, setExportMessage] = useState<string>("");
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
    setProgress(resetLearnerProgress(window.localStorage));
    setResetMessage("Local progress has been reset in this browser.");
    setExportMessage("");
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
  }

  return (
    <section className="page settingsPage" aria-labelledby="settings-title">
      <PageTitle
        title="Settings"
        description="Learner state remains browser-local. Export creates a user-controlled JSON file; reset clears challenge completion and local flags from this browser."
        id="settings-title"
      />
      <div className="settingsPanel">
        <div>
          <h3>Storage</h3>
          <p>
            Local browser storage only. Nothing is transmitted by this static
            app.
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
              Import is not implemented in this static release. Review this
              local JSON before sharing it for completion evidence.
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
      <div className="settingsActionPanel">
        <div>
          <h3>Progress</h3>
          <p>
            Completion flags and challenge state are stored only in local
            browser storage. Reset does not delete exported JSON files that
            already exist outside the browser.
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
