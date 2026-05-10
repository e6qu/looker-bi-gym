import { spawnSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { readFactCards, readSourceCards } from "facts-db-app";

type WorkbenchAction =
  | "context"
  | "generate"
  | "review"
  | "dream"
  | "dream-prompt";

type LlmProvider = "codex" | "claude" | "none";

type ProviderRunResult = {
  readonly provider: LlmProvider;
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
};

type WorkbenchPaths = {
  readonly repoRoot: string;
  readonly outputRoot: string;
  readonly contextPath: string;
  readonly candidatesRoot: string;
  readonly reviewsRoot: string;
  readonly dreamsRoot: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const outputRoot = join(repoRoot, "var", "llm-workbench");
const paths: WorkbenchPaths = {
  repoRoot,
  outputRoot,
  contextPath: join(outputRoot, "question-context.md"),
  candidatesRoot: join(outputRoot, "question-candidates"),
  reviewsRoot: join(outputRoot, "question-reviews"),
  dreamsRoot: join(outputRoot, "dreams"),
};

function parseAction(value: string | undefined): WorkbenchAction {
  switch (value) {
    case undefined:
    case "context":
    case "generate":
    case "review":
    case "dream":
    case "dream-prompt":
      if (value === undefined) {
        throw new Error(
          "Usage: bun run scripts/llm-question-workbench.ts <context|generate|review|dream|dream-prompt> [codex|claude|none]",
        );
      }

      return value;
    default:
      throw new Error(
        "Usage: bun run scripts/llm-question-workbench.ts <context|generate|review|dream|dream-prompt> [codex|claude|none]",
      );
  }
}

function parseProvider(value: string | undefined): LlmProvider {
  switch (value) {
    case undefined:
    case "":
    case "none":
      return "none";
    case "codex":
    case "claude":
      return value;
    default:
      throw new Error(`Unsupported LLM provider: ${value}.`);
  }
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/gu, "-");
}

async function ensureOutputDirectories(): Promise<void> {
  await Promise.all([
    mkdir(paths.outputRoot, { recursive: true }),
    mkdir(paths.candidatesRoot, { recursive: true }),
    mkdir(paths.reviewsRoot, { recursive: true }),
    mkdir(paths.dreamsRoot, { recursive: true }),
  ]);
}

async function readRepoFile(filePath: string): Promise<string> {
  return readFile(join(repoRoot, filePath), "utf8");
}

function shouldIncludeFact(factId: string): boolean {
  return (
    factId.startsWith("FACT-BI-") ||
    factId.startsWith("FACT-BIGQUERY-") ||
    factId.startsWith("FACT-GDPR-") ||
    factId.startsWith("FACT-EUROSTAT-") ||
    factId.startsWith("FACT-ROMANIA-NOTARIAL-") ||
    factId.startsWith("FACT-REAL-ESTATE-")
  );
}

async function buildQuestionContext(): Promise<string> {
  const [facts, sources] = await Promise.all([
    readFactCards(repoRoot),
    readSourceCards(repoRoot),
  ]);
  const selectedFacts = facts.filter((fact) => shouldIncludeFact(fact.id));
  const selectedSourceIds = new Set(
    selectedFacts.flatMap((fact) => fact.sourceIds),
  );
  const selectedSources = sources.filter((source) =>
    selectedSourceIds.has(source.id),
  );
  const [metadata, manifest, fixtureSql, fixtureJson, datasetReadme, task] =
    await Promise.all([
      readRepoFile("datasets/lending-month-end/v0.1.0/metadata.json"),
      readRepoFile("challenges/manifests/lending-month-end-snapshots.yaml"),
      readRepoFile(
        "challenges/solution-fixtures/lending-month-end-snapshots/known-good.sql",
      ),
      readRepoFile(
        "challenges/solution-fixtures/lending-month-end-snapshots/known-good.json",
      ),
      readRepoFile("datasets/lending-month-end/v0.1.0/README.md"),
      readRepoFile(
        "_development/tasks/024-deterministic-local-dataset-packs.md",
      ),
    ]);

  return `# LLM Question Workbench Context

This context is for draft generation and review only. Generated output is not
release material until a human reviews it and deterministic repository tests
pass.

## Constraints

- Romania only for real-estate collateral content.
- Synthetic property, loan, borrower, and collateral data only.
- Official historical/current market context comes from committed official
  source tables and source cards.
- Do not provide legal, tax, appraisal, real-estate, accounting, compliance, or
  underwriting advice.
- Questions must be fact-backed and deterministic.
- Numeric answers must come from fixture SQL, dataset metadata, or committed
  source tables.

## Selected Facts

${selectedFacts
  .map(
    (fact) => `### ${fact.id}

- Area: ${fact.area}
- Statement: ${fact.statement}
- Source quote: ${fact.sourceQuote}
- Derived implication: ${fact.derivedImplication}
- Related facts: ${fact.relatedFacts.join(", ")}
`,
  )
  .join("\n")}

## Selected Sources

${selectedSources
  .map(
    (source) => `### ${source.id}

- Title: ${source.title}
- Publisher: ${source.publisher ?? "unknown"}
- URL: ${source.url ?? "none"}
- Quote/body:
${source.body}
`,
  )
  .join("\n")}

## Dataset README

${datasetReadme}

## Dataset Metadata

\`\`\`json
${metadata}
\`\`\`

## Challenge Manifest

\`\`\`yaml
${manifest}
\`\`\`

## Known-Good Fixture SQL

\`\`\`sql
${fixtureSql}
\`\`\`

## Known-Good Fixture JSON

\`\`\`json
${fixtureJson}
\`\`\`

## Task Notes

${task}
`;
}

function generationPrompt(context: string): string {
  return `${context}

# Task

Generate 12 candidate challenge questions for the lending month-end and
real-estate collateral dataset.

Return JSON Lines only. Each line must be an object with:

- question_id
- type: "multiple-choice" | "select-all" | "numeric"
- prompt
- options
- answer
- tolerance for numeric questions
- explanation
- source_facts
- deterministic_answer_source
- review_risks

Use specific official-source facts and deterministic dataset values. Include at
least:

- 3 real-estate collateral valuation questions.
- 2 official HPI/notarial-reference boundary questions.
- 2 data-management questions about stale valuation, grain, or joins.
- 2 BigQuery/BI grain/date questions.
- 1 GDPR/minimisation question.
`;
}

function reviewPrompt(context: string, candidates: string): string {
  return `${context}

# Candidate Questions To Review

\`\`\`jsonl
${candidates}
\`\`\`

# Task

Review and refine these candidate questions. Return JSON Lines only, one object
per reviewed question, with:

- question_id
- decision: "accept" | "revise" | "reject"
- revised_question if accepted or revised
- reasons
- fact_grounding_notes
- deterministic_answer_check
- risks

Reject questions that make unsupported valuation, legal, tax, underwriting, or
market claims. Reject questions whose numeric answer cannot be verified from the
fixture, metadata, or committed source tables.
`;
}

function dreamPrompt(context: string): string {
  return `${context}

# Manual Dreaming Task

Dreaming in this repository means an opt-in, manually triggered, reviewable
memory/refinement pass. It reviews current facts, source cards, dataset
metadata, challenge fixtures, continuity notes, and known failure history to
surface:

- stale or contradictory facts;
- missing official source opportunities;
- weak or generic questions;
- dataset realism gaps;
- possible validator or fixture bugs;
- next concrete pull-request tasks.

Do not edit files. Return Markdown with:

1. Executive summary.
2. Fact corpus improvements.
3. Dataset realism improvements.
4. Question/tutorial refinements.
5. Possible bugs or missing tests.
6. Proposed next tasks.
7. Evidence: cite file paths, fact IDs, source IDs, fixture IDs, or SQL outputs.
`;
}

async function latestCandidateText(): Promise<string> {
  const entries = await readdir(paths.candidatesRoot, { withFileTypes: true });
  const candidates = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".jsonl"))
    .map((entry) => join(paths.candidatesRoot, entry.name))
    .sort();
  const latestCandidatePath = candidates.at(-1);

  if (latestCandidatePath === undefined) {
    throw new Error(
      `No candidate JSONL files found in ${relative(repoRoot, paths.candidatesRoot)}.`,
    );
  }

  return readFile(latestCandidatePath, "utf8");
}

function runProvider(provider: LlmProvider, prompt: string): ProviderRunResult {
  if (provider === "none") {
    return {
      provider,
      status: 0,
      stdout:
        "Provider was none. Prompt was written for manual review; no LLM was invoked.\n",
      stderr: "",
    };
  }

  const command =
    provider === "codex"
      ? {
          executable: "codex",
          args: [
            "exec",
            "-C",
            repoRoot,
            "--sandbox",
            "read-only",
            "--ask-for-approval",
            "never",
            prompt,
          ],
        }
      : {
          executable: "claude",
          args: [
            "--print",
            "--bare",
            "--permission-mode",
            "dontAsk",
            "--tools",
            "",
            "--max-budget-usd",
            "2",
            prompt,
          ],
        };
  const result = spawnSync(command.executable, command.args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
  });

  return {
    provider,
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

async function writeRunArtifacts(
  root: string,
  prefix: string,
  provider: LlmProvider,
  prompt: string,
  result: ProviderRunResult,
  extension: "jsonl" | "md",
): Promise<void> {
  const id = timestamp();
  await writeFile(join(root, `${prefix}-${id}.prompt.md`), prompt, "utf8");
  await writeFile(
    join(root, `${prefix}-${id}.${extension}`),
    result.stdout,
    "utf8",
  );

  if (result.stderr.trim().length > 0) {
    await writeFile(
      join(root, `${prefix}-${id}.stderr.txt`),
      result.stderr,
      "utf8",
    );
  }

  if (result.status !== 0) {
    throw new Error(
      `${provider} exited with status ${String(result.status)}. See ${relative(
        repoRoot,
        root,
      )}.`,
    );
  }
}

async function main(): Promise<void> {
  const action = parseAction(process.argv[2]);
  const provider = parseProvider(
    process.argv[3] ?? process.env["LLM_PROVIDER"],
  );
  await ensureOutputDirectories();
  const context = await buildQuestionContext();
  await writeFile(paths.contextPath, context, "utf8");

  switch (action) {
    case "context":
      process.stdout.write(`Wrote ${relative(repoRoot, paths.contextPath)}\n`);
      return;
    case "generate": {
      const prompt = generationPrompt(context);
      const result = runProvider(provider, prompt);
      await writeRunArtifacts(
        paths.candidatesRoot,
        `questions-${provider}`,
        provider,
        prompt,
        result,
        "jsonl",
      );
      return;
    }
    case "review": {
      const candidates = await latestCandidateText();
      const prompt = reviewPrompt(context, candidates);
      const result = runProvider(provider, prompt);
      await writeRunArtifacts(
        paths.reviewsRoot,
        `review-${provider}`,
        provider,
        prompt,
        result,
        "jsonl",
      );
      return;
    }
    case "dream":
    case "dream-prompt": {
      const prompt = dreamPrompt(context);
      const dreamProvider = action === "dream-prompt" ? "none" : provider;
      const result = runProvider(dreamProvider, prompt);
      await writeRunArtifacts(
        paths.dreamsRoot,
        `dream-${dreamProvider}`,
        dreamProvider,
        prompt,
        result,
        "md",
      );
      return;
    }
  }
}

await main();
