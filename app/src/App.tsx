import { useEffect, useMemo, useState } from 'react';
import {
  contentSections,
  getDefaultDocument,
  getDocument,
  getSection,
} from './content';
import {
  challengeCatalog,
  formatChallengeArea,
  formatChallengeDifficulty,
  formatChallengeMode,
  formatRequiredTools,
} from './challenges';
import { renderMarkdown } from './markdown';
import { evaluateQuiz, isSupportedQuizQuestion } from './quiz';
import { getSqlRuntime, isSqlPreviewSupported, runSqlPreview } from './sqlRuntime';
import type { JSX } from 'react';
import type { ChallengeManifest } from './challengeTypes';
import type { ContentDocument, ContentSectionId } from './content';
import type { QuizAnswerState, QuizResponse } from './quiz';
import type { SqlQueryResult, SqlTableSchema } from './sqlRuntime';

type RouteId = 'home' | ContentSectionId | 'challenges' | 'settings';

type AppRoute = {
  readonly section: RouteId;
  readonly fileName?: string;
};

type Route = {
  readonly id: RouteId;
  readonly label: string;
};

const routes: readonly Route[] = [
  { id: 'home', label: 'Home' },
  { id: 'docs', label: 'Docs' },
  { id: 'regulations', label: 'Regulations' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'settings', label: 'Settings' },
];

const contentRouteIds: ReadonlySet<RouteId> = new Set<RouteId>([
  'docs',
  'regulations',
  'tutorials',
]);

const principles: readonly string[] = [
  'Static GitHub Pages app',
  'No backend or credentials',
  'Synthetic banking datasets only',
  'Default learner path runs in the browser',
  'Optional tools are listed per tutorial',
];

const quizProgressStorageKey = 'looker-bi-gym.quiz-progress.v1';

type QuizProgressState = Readonly<Record<string, boolean>>;

function isRouteId(value: string | undefined): value is RouteId {
  return value !== undefined && routes.some((route) => route.id === value);
}

function isContentSectionId(value: RouteId): value is ContentSectionId {
  return contentRouteIds.has(value);
}

function routeFromHash(): AppRoute {
  const hashPath = window.location.hash.replace(/^#\/?/, '');
  const [sectionCandidate, ...fileParts] = hashPath.split('/');
  const section = isRouteId(sectionCandidate) ? sectionCandidate : 'home';
  const fileName = fileParts.join('/');

  return fileName.length > 0 ? { section, fileName } : { section };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isQuizProgressState(value: unknown): value is QuizProgressState {
  return isRecord(value) && Object.values(value).every((item) => typeof item === 'boolean');
}

function readQuizProgress(): QuizProgressState {
  const storedValue = window.localStorage.getItem(quizProgressStorageKey);

  if (storedValue === null) {
    return {};
  }

  try {
    const parsed = JSON.parse(storedValue) as unknown;
    return isQuizProgressState(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeQuizProgress(progress: QuizProgressState): void {
  window.localStorage.setItem(quizProgressStorageKey, JSON.stringify(progress));
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
        <a className="itemCard challengeCard challengeLink" href={`#/challenges/${challenge.id}`} key={challenge.id}>
          <div className="itemHeader">
            <h3>{challenge.title}</h3>
            <span
              className={
                completedChallengeIds.has(challenge.id)
                  ? 'status statusComplete'
                  : 'status statusReady'
              }
            >
              {completedChallengeIds.has(challenge.id)
                ? 'Complete'
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
              <dt>Tools</dt>
              <dd>{formatRequiredTools(challenge.required_tools)}</dd>
            </div>
          </dl>
        </a>
      ))}
    </div>
  );
}

function getChallengeById(challengeId: string | undefined): ChallengeManifest | undefined {
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
  return typeof answer === 'string' ? answer : '';
}

function getArrayAnswer(answers: QuizAnswerState, questionId: string): readonly string[] {
  const answer = getQuestionAnswer(answers, questionId);
  return answer !== undefined && typeof answer !== 'string' ? answer : [];
}

function formatSqlCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  return Object.prototype.toString.call(value);
}

function QuizChallengePage({
  challenge,
  isCompleted,
  onComplete,
}: {
  readonly challenge: ChallengeManifest;
  readonly isCompleted: boolean;
  readonly onComplete: (challengeId: string) => void;
}): JSX.Element {
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const evaluation = useMemo(() => evaluateQuiz(challenge, answers), [answers, challenge]);
  const evaluationsByQuestion = useMemo(
    () =>
      new Map(
        evaluation.questions.map((question) => [question.questionId, question] as const),
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
      onComplete(challenge.id);
    }
  }

  return (
    <section className="page challengeDetailPage" aria-labelledby={`${challenge.id}-title`}>
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
            <dt>Status</dt>
            <dd>{isCompleted ? 'Complete in this browser' : 'Not complete'}</dd>
          </div>
        </dl>
      </div>

      {unsupportedQuestions.length > 0 ? (
        <div className="feedbackBox feedbackFail" role="status">
          This quiz includes unsupported question types and cannot be completed yet.
        </div>
      ) : null}

      <div className="quizPanel">
        {challenge.questions.map((question, index) => {
          const questionEvaluation = evaluationsByQuestion.get(question.id);
          const isCorrect = questionEvaluation?.isCorrect ?? false;
          const isAnswered = questionEvaluation?.isAnswered ?? false;

          return (
            <fieldset className="quizQuestion" key={question.id}>
              <legend>
                <span>Question {index + 1}</span>
                {question.prompt}
              </legend>

              {question.type === 'multiple-choice' && question.options !== undefined ? (
                <div className="answerOptions">
                  {question.options.map((option) => (
                    <label key={option.id}>
                      <input
                        checked={getStringAnswer(answers, question.id) === option.id}
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

              {question.type === 'select-all' && question.options !== undefined ? (
                <div className="answerOptions">
                  {question.options.map((option) => {
                    const selectedAnswers = getArrayAnswer(answers, question.id);
                    const isSelected = selectedAnswers.includes(option.id);

                    return (
                      <label key={option.id}>
                        <input
                          checked={isSelected}
                          onChange={() =>
                            setAnswer(
                              question.id,
                              isSelected
                                ? selectedAnswers.filter((answer) => answer !== option.id)
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

              {question.type === 'numeric' ? (
                <input
                  className="numericAnswer"
                  inputMode="decimal"
                  onChange={(event) => setAnswer(question.id, event.currentTarget.value)}
                  type="number"
                  value={getStringAnswer(answers, question.id)}
                />
              ) : null}

              {hasSubmitted ? (
                <div
                  className={isCorrect ? 'feedbackBox feedbackPass' : 'feedbackBox feedbackFail'}
                  role="status"
                >
                  {isCorrect ? 'Correct.' : isAnswered ? 'Incorrect.' : 'Answer required.'}
                  {question.explanation !== undefined ? ` ${question.explanation}` : ''}
                </div>
              ) : null}
            </fieldset>
          );
        })}
      </div>

      <div className="quizActions">
        <button disabled={unsupportedQuestions.length > 0} onClick={submitQuiz} type="button">
          Check Answers
        </button>
        {hasSubmitted ? (
          <div
            className={
              evaluation.isComplete ? 'feedbackBox feedbackPass' : 'feedbackBox feedbackFail'
            }
            role="status"
          >
            {evaluation.isComplete
              ? `Challenge complete. Flag: ${challenge.flag.id}`
              : 'The quiz is not complete yet.'}
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
      <a className="backLink" href="#/challenges">Back to challenges</a>
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
          <button key={table.tableName} type="button" onClick={() => onSelectTable(table.tableName)}>
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
        {result.truncated ? <span>Showing first {result.rows.length} rows</span> : null}
      </div>
      <div className="sqlResultTable" role="table" aria-label="SQL query result">
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

function SqlChallengePage({
  challenge,
}: {
  readonly challenge: ChallengeManifest;
}): JSX.Element {
  const [sql, setSql] = useState<string>('SELECT * FROM branches LIMIT 10;');
  const [runtimeState, setRuntimeState] = useState<
    | { readonly status: 'loading' }
    | {
        readonly status: 'ready';
        readonly tables: readonly SqlTableSchema[];
        readonly connection: Awaited<ReturnType<typeof getSqlRuntime>>['connection'];
      }
    | { readonly status: 'error'; readonly message: string }
  >({ status: 'loading' });
  const [queryState, setQueryState] = useState<
    | { readonly status: 'idle' }
    | { readonly status: 'running' }
    | { readonly status: 'success'; readonly result: SqlQueryResult }
    | { readonly status: 'error'; readonly message: string }
  >({ status: 'idle' });

  useEffect(() => {
    let isActive = true;

    void getSqlRuntime()
      .then((runtime) => {
        if (isActive) {
          setRuntimeState({
            status: 'ready',
            tables: runtime.tables,
            connection: runtime.connection,
          });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setRuntimeState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unable to load DuckDB-Wasm.',
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [challenge.id]);

  async function runQuery(): Promise<void> {
    if (runtimeState.status !== 'ready') {
      return;
    }

    if (!isSqlPreviewSupported(sql)) {
      setQueryState({
        status: 'error',
        message: 'Enter a SELECT or WITH query to run against the browser SQL runtime.',
      });
      return;
    }

    setQueryState({ status: 'running' });

    try {
      const result = await runSqlPreview(runtimeState.connection, sql);
      setQueryState({ status: 'success', result });
    } catch (error: unknown) {
      setQueryState({
        status: 'error',
        message: error instanceof Error ? error.message : 'SQL execution failed.',
      });
    }
  }

  function setSampleQuery(tableName: string): void {
    setSql(`SELECT * FROM ${tableName} LIMIT 10;`);
  }

  return (
    <section className="page challengeDetailPage sqlChallengePage" aria-labelledby={`${challenge.id}-title`}>
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
            <strong>Loaded dataset</strong>
            <span>{challenge.inputs[0]?.dataset_id ?? 'Synthetic CSV seed'}</span>
          </div>
        </div>
      </div>

      <div className="sqlChallengeLayout">
        {runtimeState.status === 'ready' ? (
          <SqlTableBrowser tables={runtimeState.tables} onSelectTable={setSampleQuery} />
        ) : (
          <aside className="sqlSidebar" aria-label="Loaded challenge tables">
            <div className="sidebarHeader">
              <p className="eyebrow">Schema browser</p>
              <h2>Seed tables</h2>
            </div>
            <p className="sqlLoadingText">
              {runtimeState.status === 'loading'
                ? 'Loading DuckDB-Wasm and seed tables...'
                : runtimeState.message}
            </p>
          </aside>
        )}

        <section className="sqlWorkspace" aria-label="SQL workspace">
          <div className="sqlEditorPanel">
            <div className="sqlEditorHeader">
              <p className="eyebrow">SQL editor</p>
              <span>{challenge.flag.id}</span>
            </div>
            <textarea
              aria-label="SQL query editor"
              className="sqlEditor"
              onChange={(event) => setSql(event.currentTarget.value)}
              value={sql}
            />
            <div className="sqlEditorActions">
              <button
                disabled={runtimeState.status !== 'ready' || queryState.status === 'running'}
                type="button"
                onClick={() => void runQuery()}
              >
                {queryState.status === 'running' ? 'Running...' : 'Run Query'}
              </button>
              <p>Queries run fully in the browser against the loaded synthetic CSV tables.</p>
            </div>
          </div>

          <div className="sqlExamples">
            <button type="button" onClick={() => setSampleQuery('branches')}>
              branches
            </button>
            <button type="button" onClick={() => setSampleQuery('products')}>
              products
            </button>
            <button type="button" onClick={() => setSampleQuery('accounts')}>
              accounts
            </button>
            <button type="button" onClick={() => setSampleQuery('account_owners')}>
              account_owners
            </button>
            <button type="button" onClick={() => setSampleQuery('account_daily_balances')}>
              account_daily_balances
            </button>
          </div>

          {queryState.status === 'error' ? (
            <div className="feedbackBox feedbackFail sqlFeedback" role="status">
              {queryState.message}
            </div>
          ) : null}

          {queryState.status === 'success' ? <SqlResultTable result={queryState.result} /> : null}
          {queryState.status === 'idle' ? (
            <div className="sqlEmptyState">Run a query to inspect the synthetic banking tables.</div>
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
            A static React app for technical BI practice with Romanian banking flavor,
            deterministic browser checks, Markdown content, and local learner progress.
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
            The app shell now loads existing Markdown source material. Challenge manifests,
            datasets, DuckDB-WASM SQL execution, validators, and progress flags follow in
            the task backlog.
          </p>
        </section>
        <section aria-labelledby="safety-note">
          <h2 id="safety-note">Training Boundary</h2>
          <p>
            This is technical training material. It is not legal, regulatory, accounting,
            privacy, compliance, or model-risk advice. Validate production banking work with
            the appropriate institutional teams.
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
              aria-current={candidate.fileName === document.fileName ? 'page' : undefined}
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
      <div className="markdownBody" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

function ChallengesPage({
  challengeId,
}: {
  readonly challengeId?: string;
}): JSX.Element {
  const [quizProgress, setQuizProgress] = useState<QuizProgressState>(readQuizProgress);
  const completedChallengeIds = useMemo(
    () =>
      new Set(
        Object.entries(quizProgress)
          .filter((entry) => entry[1])
          .map((entry) => entry[0]),
      ),
    [quizProgress],
  );
  const selectedChallenge = getChallengeById(challengeId);

  function completeQuiz(challengeIdToComplete: string): void {
    setQuizProgress((currentProgress) => {
      const nextProgress = {
        ...currentProgress,
        [challengeIdToComplete]: true,
      };
      writeQuizProgress(nextProgress);
      return nextProgress;
    });
  }

  if (challengeId !== undefined && selectedChallenge === undefined) {
    return (
      <section className="page" aria-labelledby="missing-challenge-title">
        <a className="backLink" href="#/challenges">Back to challenges</a>
        <PageTitle
          title="Challenge Not Found"
          description="The requested challenge is not available in the generated static catalog."
          id="missing-challenge-title"
        />
      </section>
    );
  }

  if (selectedChallenge?.mode === 'quiz') {
    return (
      <QuizChallengePage
        key={selectedChallenge.id}
        challenge={selectedChallenge}
        isCompleted={completedChallengeIds.has(selectedChallenge.id)}
        onComplete={completeQuiz}
      />
    );
  }

  if (selectedChallenge?.mode === 'browser-sql') {
    return <SqlChallengePage key={selectedChallenge.id} challenge={selectedChallenge} />;
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
      <ChallengeList challenges={challengeCatalog} completedChallengeIds={completedChallengeIds} />
    </section>
  );
}

function SettingsPage(): JSX.Element {
  return (
    <section className="page settingsPage" aria-labelledby="settings-title">
      <PageTitle
        title="Settings"
        description="Learner state will remain browser-local. The reset and export controls arrive with the progress task."
        id="settings-title"
      />
      <div className="settingsPanel">
        <div>
          <h3>Storage</h3>
          <p>Local browser storage only. Nothing is transmitted by this static app.</p>
        </div>
        <div>
          <h3>Tools</h3>
          <p>
            The default path requires no learner-installed tools. Optional tools must be
            named by the tutorial.
          </p>
        </div>
        <div>
          <h3>Credentials</h3>
          <p>No BigQuery, Looker Studio, Google Cloud, or banking credentials are requested or stored.</p>
        </div>
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
    case 'home':
      return <HomePage />;
    case 'challenges':
      return route.fileName !== undefined ? (
        <ChallengesPage challengeId={route.fileName} />
      ) : (
        <ChallengesPage />
      );
    case 'settings':
      return <SettingsPage />;
  }
}

export function App(): JSX.Element {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(routeFromHash);

  useEffect(() => {
    const onHashChange = (): void => {
      setActiveRoute(routeFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeLabel = useMemo(
    () => routes.find((route) => route.id === activeRoute.section)?.label ?? 'Home',
    [activeRoute.section],
  );

  return (
    <div className="appShell">
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
              aria-current={route.id === activeRoute.section ? 'page' : undefined}
              href={`#/${route.id}`}
              key={route.id}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <div className="mobileRouteLabel" aria-live="polite">
          {activeLabel}
        </div>
        <AppPage route={activeRoute} />
      </main>
    </div>
  );
}
