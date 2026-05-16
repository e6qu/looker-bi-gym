import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

type DistractorIssue = {
  readonly file: string;
  readonly questionId: string;
  readonly optionId: string;
  readonly label: string;
  readonly trigger: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const quizzesRoot = join(repoRoot, "quizzes");

const weakDistractorPatterns: ReadonlyArray<{
  pattern: RegExp;
  name: string;
}> = [
  { pattern: /\bchart\s+colou?r\b/iu, name: "chart color" },
  { pattern: /\bcolou?r\s+palette\b/iu, name: "color palette" },
  { pattern: /\bcolor\s+scheme\b/iu, name: "color scheme" },
  { pattern: /\bchart\s+border\b/iu, name: "chart border" },
  { pattern: /\bchart\s+background\b/iu, name: "chart background" },
  { pattern: /\bbackground\s+colou?r\b/iu, name: "background color" },
  { pattern: /\bfont\s+size\b/iu, name: "font size" },
  { pattern: /\bfont\s+family\b/iu, name: "font family" },
  { pattern: /\bonly\s+the\s+chart\s+font\b/iu, name: "chart font" },
  {
    pattern: /\bdecorative\s+(?:theme|layout|chart|element)/iu,
    name: "decorative theme/layout",
  },
  { pattern: /\breport\s+theme\b/iu, name: "report theme" },
  {
    pattern: /\bviewer\s+(?:history|activity|clicks?)\b/iu,
    name: "viewer history/activity/clicks",
  },
  {
    pattern: /\breport\s+title(?:\s+(?:size|text|length))?\b/iu,
    name: "report title detail",
  },
  {
    pattern: /\bchart\s+(?:title|position|spacing|padding)\b/iu,
    name: "chart styling detail",
  },
  { pattern: /\bbrowser\s+language\b/iu, name: "browser language" },
  { pattern: /\bbrowser\s+font\b/iu, name: "browser font" },
  { pattern: /\bemoji\b/iu, name: "emoji" },
  { pattern: /\bonly\s+the\s+font\b/iu, name: "only the font" },
];

const allowedFiles: ReadonlySet<string> = new Set([
  // Add filenames here if a specific distractor is intentionally weak by design.
]);

function isExpectedQuiz(node: unknown): node is {
  questions?: Record<string, unknown>;
} {
  return typeof node === "object" && node !== null;
}

function isQuestionList(
  node: unknown,
): node is ReadonlyArray<Record<string, unknown>> {
  return Array.isArray(node);
}

function isOptionRecord(
  node: unknown,
): node is { id?: unknown; label?: unknown } {
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

function findIssuesInLabel(
  label: string,
): ReadonlyArray<{ readonly trigger: string }> {
  const issues: Array<{ readonly trigger: string }> = [];
  for (const candidate of weakDistractorPatterns) {
    if (candidate.pattern.test(label)) {
      issues.push({ trigger: candidate.name });
    }
  }
  return issues;
}

async function* walkQuizMarkdown(
  root: string,
): AsyncGenerator<{ readonly relativePath: string; readonly source: string }> {
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkQuizMarkdown(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".md")) {
      continue;
    }
    const source = await readFile(fullPath, "utf8");
    yield {
      relativePath: fullPath.slice(repoRoot.length + 1),
      source,
    };
  }
}

async function main(): Promise<void> {
  const issues: DistractorIssue[] = [];
  let questionCount = 0;
  let optionCount = 0;

  for await (const { relativePath, source } of walkQuizMarkdown(quizzesRoot)) {
    const frontmatter = extractFrontmatter(source);
    if (frontmatter === null) {
      continue;
    }
    const parsed = parseYaml(frontmatter) as unknown;
    if (!isExpectedQuiz(parsed) || parsed.questions === undefined) {
      continue;
    }
    const questionsByDifficulty = parsed.questions;
    for (const [difficulty, questions] of Object.entries(
      questionsByDifficulty,
    )) {
      if (!isQuestionList(questions)) {
        continue;
      }
      for (const question of questions) {
        questionCount += 1;
        const questionId =
          typeof question["id"] === "string" ? question["id"] : "<unknown>";
        const options = question["options"];
        if (!Array.isArray(options)) {
          continue;
        }
        for (const option of options) {
          if (!isOptionRecord(option)) {
            continue;
          }
          const optionId =
            typeof option.id === "string" ? option.id : "<unknown>";
          const label = typeof option.label === "string" ? option.label : "";
          optionCount += 1;
          if (allowedFiles.has(relativePath)) {
            continue;
          }
          for (const issue of findIssuesInLabel(label)) {
            issues.push({
              file: relativePath,
              questionId: `${difficulty}:${questionId}`,
              optionId,
              label,
              trigger: issue.trigger,
            });
          }
        }
      }
    }
  }

  if (issues.length > 0) {
    process.stderr.write(
      `Weak quiz distractor detector found ${issues.length} issue(s):\n`,
    );
    for (const issue of issues) {
      process.stderr.write(
        `  ${issue.file} :: ${issue.questionId} :: option ${issue.optionId} :: ${issue.trigger}\n      label: ${issue.label}\n`,
      );
    }
    process.stderr.write(
      "Replace each flagged distractor with a plausible-but-wrong option that tests a real misconception (a different SQL shape, a confused mechanic, a wrong-but-tempting grain).\n",
    );
    process.exit(1);
  }

  process.stdout.write(
    `Quiz distractor quality check passed: ${questionCount} questions, ${optionCount} options scanned, 0 weak-pattern hits.\n`,
  );
}

await main();
