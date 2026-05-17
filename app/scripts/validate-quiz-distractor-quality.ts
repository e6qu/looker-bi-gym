import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

// Scope of this validator.
//
// This script is a static, pattern-based smoke test. It catches a narrow
// class of authored mistakes:
//
//   1. Cosmetic distractors: options whose only content is chart styling,
//      colors, fonts, viewer history, or other cert-track-irrelevant
//      surface detail.
//   2. Invented / non-existent BigQuery functions: identifiers that look
//      like SQL but are not real BigQuery features. These are the most
//      damaging because a learner could carry the wrong syntax into a
//      real exam.
//   3. Known anti-patterns: false absolutes about materialized view
//      refresh SLAs, and freshness-as-auto-refresh phrasing that
//      conflates Looker Studio cache thresholds with a periodic refresh.
//
// It does NOT catch:
//   - "Technically correct but not best" tradeoffs.
//   - Off-by-one numbers, stale platform mechanics, or wrong UI labels.
//   - Distractors whose defect is purely semantic (e.g., wrong grain
//     but plausibly-worded).
//
// Treat passing this script as a floor, not a ceiling. Editorial review
// and a periodic external second opinion remain required.

type DistractorIssue = {
  readonly file: string;
  readonly questionId: string;
  readonly optionId: string;
  readonly label: string;
  readonly trigger: string;
};

type QuestionIssue = {
  readonly file: string;
  readonly questionId: string;
  readonly field: string;
  readonly snippet: string;
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

// Invented / non-existent BigQuery identifiers. Anything matching is
// almost certainly a copy of the wrong shape from a sketch or LLM
// draft. If a real BigQuery function or feature later collides with a
// name here, remove the pattern.
const inventedSqlIdentifiers: ReadonlyArray<{
  pattern: RegExp;
  name: string;
}> = [
  { pattern: /\bSESSION_USER_BRANCH\s*\(/u, name: "SESSION_USER_BRANCH()" },
  { pattern: /\bSESSION_USER_GROUP\s*\(/u, name: "SESSION_USER_GROUP()" },
  { pattern: /\bCURRENT_USER_BRANCH\s*\(/u, name: "CURRENT_USER_BRANCH()" },
  { pattern: /\bCURRENT_GROUP_USER\s*\(/u, name: "CURRENT_GROUP_USER()" },
  { pattern: /\bSESSION_BRANCH\s*\(/u, name: "SESSION_BRANCH()" },
  { pattern: /\bROW_FILTER_SESSION\s*\(/u, name: "ROW_FILTER_SESSION()" },
];

// Phrases that teach the wrong product semantics. Each is documented to
// explain why it is rejected.
const semanticAntiPatterns: ReadonlyArray<{
  pattern: RegExp;
  name: string;
  scope: "option" | "any";
}> = [
  {
    // Looker Studio data freshness is a cache-staleness threshold, not
    // an auto-refresh interval. Phrasings that say the report refreshes
    // on a freshness cadence teach the wrong model.
    pattern:
      /\b(?:freshness\s+(?:interval|setting)|data\s+freshness)\s+(?:causes|makes|forces)\b/iu,
    name: "freshness-as-auto-refresh",
    scope: "any",
  },
  {
    // Same defect with reversed clause order.
    pattern:
      /\b(?:report|dashboard)\s+(?:auto-?refresh(?:es)?|refresh(?:es)?\s+every)\s+[^.]*?\bfreshness\b/iu,
    name: "freshness-as-auto-refresh",
    scope: "any",
  },
  {
    // BigQuery materialized view automatic refresh is best-effort, not
    // a hard SLA. Phrasings that claim the cached result is bounded
    // "at any point" or "guaranteed" overstate the contract.
    pattern:
      /\bmateriali[sz]ed\s+view\b[^.]*?\b(?:at\s+any\s+point|guarantee[sd]?\s+(?:fresh|behind))/iu,
    name: "mv-refresh-hard-sla",
    scope: "any",
  },
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
  for (const candidate of inventedSqlIdentifiers) {
    if (candidate.pattern.test(label)) {
      issues.push({ trigger: `invented SQL identifier: ${candidate.name}` });
    }
  }
  for (const candidate of semanticAntiPatterns) {
    if (candidate.pattern.test(label)) {
      issues.push({ trigger: `semantic anti-pattern: ${candidate.name}` });
    }
  }
  return issues;
}

function findIssuesInQuestionText(
  text: string,
): ReadonlyArray<{ readonly trigger: string }> {
  const issues: Array<{ readonly trigger: string }> = [];
  for (const candidate of inventedSqlIdentifiers) {
    if (candidate.pattern.test(text)) {
      issues.push({ trigger: `invented SQL identifier: ${candidate.name}` });
    }
  }
  for (const candidate of semanticAntiPatterns) {
    if (candidate.pattern.test(text)) {
      issues.push({ trigger: `semantic anti-pattern: ${candidate.name}` });
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
  const optionIssues: DistractorIssue[] = [];
  const questionIssues: QuestionIssue[] = [];
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
        const fullId = `${difficulty}:${questionId}`;
        if (!allowedFiles.has(relativePath)) {
          for (const field of ["prompt", "explanation"]) {
            const value = question[field];
            if (typeof value !== "string") continue;
            for (const issue of findIssuesInQuestionText(value)) {
              questionIssues.push({
                file: relativePath,
                questionId: fullId,
                field,
                snippet: value.slice(0, 120),
                trigger: issue.trigger,
              });
            }
          }
        }
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
            optionIssues.push({
              file: relativePath,
              questionId: fullId,
              optionId,
              label,
              trigger: issue.trigger,
            });
          }
        }
      }
    }
  }

  const totalIssues = optionIssues.length + questionIssues.length;
  if (totalIssues > 0) {
    process.stderr.write(
      `Quiz distractor quality detector found ${totalIssues} issue(s):\n`,
    );
    for (const issue of optionIssues) {
      process.stderr.write(
        `  ${issue.file} :: ${issue.questionId} :: option ${issue.optionId} :: ${issue.trigger}\n      label: ${issue.label}\n`,
      );
    }
    for (const issue of questionIssues) {
      process.stderr.write(
        `  ${issue.file} :: ${issue.questionId} :: ${issue.field} :: ${issue.trigger}\n      snippet: ${issue.snippet}\n`,
      );
    }
    process.stderr.write(
      "Replace each flagged option with a plausible-but-wrong distractor that tests a real misconception. Replace invented SQL with real BigQuery shapes. Reword Looker Studio freshness and BigQuery materialized-view refresh phrasing to match the actual product semantics.\n",
    );
    process.exit(1);
  }

  process.stdout.write(
    `Quiz distractor quality check passed: ${questionCount} questions, ${optionCount} options scanned, 0 hits across cosmetic / invented-SQL / semantic anti-pattern rules.\n`,
  );
}

await main();
