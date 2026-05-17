import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

type ViolationKind =
  | "tutorial-number-reference"
  | "learner-task-id-reference"
  | "platform-self-reference"
  | "course-meta-reference"
  | "see-other-surface";

type Violation = {
  readonly file: string;
  readonly section: string;
  readonly kind: ViolationKind;
  readonly snippet: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");

const surfaceRoots: readonly string[] = ["quizzes", "flashcards", "exams"];

const tutorialRoots: readonly string[] = ["tutorials"];

const tutorialAllowlist: ReadonlySet<string> = new Set<string>([
  // Intentionally empty. Index files were previously allowlisted, but
  // hiding any file from this validator lets visible cross-surface or
  // platform-meta references slip through. Tutorial indexes must list
  // labs by topic name only, without LT- prefixes or ordering claims.
]);

const violationPatterns: ReadonlyArray<{
  readonly pattern: RegExp;
  readonly kind: ViolationKind;
}> = [
  // "tutorial 04", "tutorial-04", "tutorial 04-".
  { pattern: /\btutorial\s+\d{1,2}\b/iu, kind: "tutorial-number-reference" },
  { pattern: /\btutorial-\d{1,2}\b/iu, kind: "tutorial-number-reference" },
  // LT-XYZ-001 visible identifier (metadata uses an explicit
  // `recommended_learner_tasks` field instead; visible body must not name
  // a specific learner task).
  { pattern: /\bLT-[A-Z]+-\d{3}\b/u, kind: "learner-task-id-reference" },
  // Platform self-reference.
  { pattern: /\blooker-bi-gym\b/iu, kind: "platform-self-reference" },
  {
    pattern: /\bthis\s+(?:course|app|platform|gym|repo|project)\b/iu,
    kind: "course-meta-reference",
  },
  { pattern: /\bcourse\s+context\b/iu, kind: "course-meta-reference" },
  {
    pattern: /\bin\s+this\s+(?:course|app|platform|gym)\b/iu,
    kind: "course-meta-reference",
  },
  // "see exam mode", "see quiz bank", "complete the orientation quiz",
  // "as we saw in the tutorial".
  {
    pattern:
      /\b(?:see|complete|review|as\s+(?:we\s+)?(?:saw|did)\s+in)\s+(?:the\s+)?(?:tutorial|quiz\s+bank|exam\s+mode|flashcard)\b/iu,
    kind: "see-other-surface",
  },
];

type QuizFrontmatter = {
  questions?: Record<string, unknown>;
};

function isObject(node: unknown): node is Record<string, unknown> {
  return typeof node === "object" && node !== null;
}

function extractFrontmatter(source: string): string | null {
  if (!source.startsWith("---\n")) {
    return null;
  }
  const close = source.indexOf("\n---\n", 4);
  if (close === -1) {
    return null;
  }
  return source.slice(4, close);
}

function extractMarkdownBody(source: string): string {
  if (!source.startsWith("---\n")) {
    return source;
  }
  const close = source.indexOf("\n---\n", 4);
  if (close === -1) {
    return source;
  }
  return source.slice(close + 5);
}

function checkText(
  text: string,
  file: string,
  section: string,
  violations: Violation[],
): void {
  for (const { pattern, kind } of violationPatterns) {
    const match = pattern.exec(text);
    if (match === null) {
      continue;
    }
    const start = Math.max(0, match.index - 40);
    const end = Math.min(text.length, match.index + match[0].length + 40);
    violations.push({
      file,
      section,
      kind,
      snippet: text.slice(start, end).replace(/\s+/gu, " ").trim(),
    });
  }
}

function checkQuiz(
  file: string,
  source: string,
  violations: Violation[],
): void {
  const frontmatter = extractFrontmatter(source);
  if (frontmatter === null) {
    return;
  }
  const parsed = parseYaml(frontmatter) as unknown;
  if (!isObject(parsed)) {
    return;
  }
  const questionsRoot = (parsed as QuizFrontmatter).questions;
  if (questionsRoot === undefined || !isObject(questionsRoot)) {
    return;
  }
  for (const [difficulty, questions] of Object.entries(questionsRoot)) {
    if (!Array.isArray(questions)) {
      continue;
    }
    for (const rawQuestion of questions) {
      if (!isObject(rawQuestion)) {
        continue;
      }
      const id =
        typeof rawQuestion["id"] === "string" ? rawQuestion["id"] : "<unknown>";
      const sectionPrefix = `${difficulty}:${id}`;
      const visibleFields = ["prompt", "explanation", "self_assessment"];
      for (const fieldName of visibleFields) {
        const value = rawQuestion[fieldName];
        if (typeof value === "string") {
          checkText(value, file, `${sectionPrefix}:${fieldName}`, violations);
        }
      }
      const options = rawQuestion["options"];
      if (Array.isArray(options)) {
        for (const option of options) {
          if (!isObject(option)) {
            continue;
          }
          const optionId =
            typeof option["id"] === "string" ? option["id"] : "<unknown>";
          const label = option["label"];
          if (typeof label === "string") {
            checkText(
              label,
              file,
              `${sectionPrefix}:option:${optionId}:label`,
              violations,
            );
          }
        }
      }
    }
  }
}

function checkFlashcard(
  file: string,
  source: string,
  violations: Violation[],
): void {
  const body = extractMarkdownBody(source);
  checkText(body, file, "body", violations);
}

function checkTutorialBody(
  file: string,
  source: string,
  violations: Violation[],
): void {
  if (tutorialAllowlist.has(file)) {
    return;
  }
  const body = extractMarkdownBody(source);
  checkText(body, file, "body", violations);
}

type ExamFrontmatter = {
  description?: unknown;
  cards?: readonly unknown[];
};

function checkExam(
  file: string,
  source: string,
  violations: Violation[],
): void {
  const frontmatter = extractFrontmatter(source);
  if (frontmatter === null) {
    return;
  }
  const parsed = parseYaml(frontmatter) as unknown;
  if (!isObject(parsed)) {
    return;
  }
  const examFrontmatter = parsed as ExamFrontmatter;
  if (typeof examFrontmatter.description === "string") {
    checkText(examFrontmatter.description, file, "description", violations);
  }
  if (Array.isArray(examFrontmatter.cards)) {
    for (const card of examFrontmatter.cards) {
      if (!isObject(card)) {
        continue;
      }
      const id = typeof card["id"] === "string" ? card["id"] : "<unknown>";
      const objective = card["objective"];
      if (typeof objective === "string") {
        checkText(objective, file, `${id}:objective`, violations);
      }
      const verification = card["verification"];
      if (isObject(verification)) {
        const expected = verification["expected_outputs"];
        if (Array.isArray(expected)) {
          for (const [index, line] of expected.entries()) {
            if (typeof line === "string") {
              checkText(
                line,
                file,
                `${id}:expected_outputs[${index}]`,
                violations,
              );
            }
          }
        }
        const selfAssessment = verification["self_assessment"];
        if (typeof selfAssessment === "string") {
          checkText(selfAssessment, file, `${id}:self_assessment`, violations);
        }
      }
    }
  }
}

async function* walkMarkdown(
  root: string,
): AsyncGenerator<{ readonly relativePath: string; readonly source: string }> {
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".md")) {
      continue;
    }
    const source = await readFile(fullPath, "utf8");
    yield { relativePath: fullPath.slice(repoRoot.length + 1), source };
  }
}

async function main(): Promise<void> {
  const violations: Violation[] = [];
  let scannedFiles = 0;

  for (const root of surfaceRoots) {
    const surfaceRoot = join(repoRoot, root);
    for await (const { relativePath, source } of walkMarkdown(surfaceRoot)) {
      scannedFiles += 1;
      if (root === "quizzes") {
        checkQuiz(relativePath, source, violations);
      } else if (root === "flashcards") {
        checkFlashcard(relativePath, source, violations);
      } else if (root === "exams") {
        checkExam(relativePath, source, violations);
      }
    }
  }

  for (const root of tutorialRoots) {
    const tutorialRoot = join(repoRoot, root);
    for await (const { relativePath, source } of walkMarkdown(tutorialRoot)) {
      scannedFiles += 1;
      checkTutorialBody(relativePath, source, violations);
    }
  }

  if (violations.length > 0) {
    process.stderr.write(
      `Compartmentalization check failed with ${violations.length} issue(s):\n`,
    );
    for (const violation of violations) {
      process.stderr.write(
        `  ${violation.file} :: ${violation.section} :: ${violation.kind}\n      snippet: ...${violation.snippet}...\n`,
      );
    }
    process.stderr.write(
      "Quizzes, flashcards, and exams must not reference each other, learner tasks, tutorials by number, or the platform itself. Terminology is the only shared spine.\n",
    );
    process.exit(1);
  }

  process.stdout.write(
    `Compartmentalization check passed: ${scannedFiles} files scanned, 0 cross-surface or platform-meta hits.\n`,
  );
}

await main();
