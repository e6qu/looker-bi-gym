import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type HeadingSlug = {
  readonly file: string;
  readonly slug: string;
  readonly text: string;
  readonly line: number;
};

type TermEntry = {
  readonly file: string;
  readonly slug: string;
  readonly text: string;
  readonly line: number;
  readonly body: string;
  readonly bodyStartLine: number;
};

type TermRef = {
  readonly sourceFile: string;
  readonly line: number;
  readonly href: string;
  readonly targetFile: string | undefined;
  readonly anchor: string;
  readonly hint: string | undefined;
};

type SourceCitation = {
  readonly file: string;
  readonly slug: string;
  readonly line: number;
  readonly externalUrls: readonly string[];
  readonly factIds: readonly string[];
};

type Failure = {
  readonly file: string;
  readonly line?: number;
  readonly message: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const terminologyRoot = join(repoRoot, "terminology");
const factsRoot = join(repoRoot, "facts");

const expectedHintByFile: ReadonlyMap<string, string> = new Map([
  ["bi.md", "BI"],
  ["sql.md", "SQL"],
  ["bigquery.md", "BQ"],
  ["looker-studio.md", "LS"],
  ["banking.md", "BNK"],
  ["regulations.md", "REG"],
  ["duckdb.md", "DB"],
]);

const sourcingRequiredFiles: ReadonlySet<string> = new Set([
  "bigquery.md",
  "looker-studio.md",
  "duckdb.md",
  "regulations.md",
]);

const headingPattern = /^(#{1,6})\s+(.+?)\s*$/u;
const termRefPattern =
  /<a\s+class="termRef"\s+href="([^"]+)"\s*>([\s\S]*?)<\/a>/gu;
const supPattern = /<sup>([^<]+)<\/sup>/u;
const factIdPattern = /\bFACT-[A-Z0-9]+(?:-[A-Z0-9]+)*\b/gu;
const externalUrlPattern = /\bhttps?:\/\/[^\s)<>"']+/gu;

function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/`/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

function stripFrontmatter(source: string): {
  readonly body: string;
  readonly lineOffset: number;
} {
  if (!source.startsWith("---\n")) {
    return { body: source, lineOffset: 0 };
  }

  const closing = source.indexOf("\n---\n", 4);
  if (closing === -1) {
    return { body: source, lineOffset: 0 };
  }

  const trimmedPrefix = source.slice(0, closing + 5);
  return {
    body: source.slice(closing + 5),
    lineOffset: trimmedPrefix.split("\n").length - 1,
  };
}

function extractHeadings(file: string, source: string): HeadingSlug[] {
  const { body, lineOffset } = stripFrontmatter(source);
  const out: HeadingSlug[] = [];
  const lines = body.split("\n");
  let inCodeFence = false;

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index] ?? "";
    if (rawLine.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) {
      continue;
    }

    const match = headingPattern.exec(rawLine);
    if (match === null) {
      continue;
    }

    const text = match[2] ?? "";
    const slug = slugifyHeading(text);
    if (slug.length === 0) {
      continue;
    }

    out.push({
      file,
      slug,
      text,
      line: lineOffset + index + 1,
    });
  }

  return out;
}

function extractTermEntries(file: string, source: string): TermEntry[] {
  const { body, lineOffset } = stripFrontmatter(source);
  const lines = body.split("\n");
  const entries: TermEntry[] = [];
  let inCodeFence = false;

  type Boundary = {
    readonly lineIndex: number;
    readonly slug: string;
    readonly text: string;
  };
  const boundaries: Boundary[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index] ?? "";
    if (rawLine.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) {
      continue;
    }

    const match = /^##\s+(.+?)\s*$/u.exec(rawLine);
    if (match === null) {
      continue;
    }

    const text = match[1] ?? "";
    const slug = slugifyHeading(text);
    if (slug.length === 0) {
      continue;
    }

    boundaries.push({ lineIndex: index, slug, text });
  }

  for (let i = 0; i < boundaries.length; i += 1) {
    const boundary = boundaries[i];
    if (boundary === undefined) {
      continue;
    }
    const next = boundaries[i + 1];
    const startLine = boundary.lineIndex + 1;
    const endLine = next?.lineIndex ?? lines.length;
    const body = lines.slice(startLine, endLine).join("\n");

    entries.push({
      file,
      slug: boundary.slug,
      text: boundary.text,
      line: lineOffset + boundary.lineIndex + 1,
      body,
      bodyStartLine: lineOffset + startLine + 1,
    });
  }

  return entries;
}

function parseHref(href: string): {
  readonly targetFile: string | undefined;
  readonly anchor: string;
} {
  if (!href.startsWith("#/terminology/")) {
    return { targetFile: undefined, anchor: "" };
  }

  const path = href.slice("#/terminology/".length);
  const hashIndex = path.indexOf("#");

  if (hashIndex === -1) {
    return { targetFile: path, anchor: "" };
  }

  return {
    targetFile: path.slice(0, hashIndex),
    anchor: path.slice(hashIndex + 1),
  };
}

function extractTermRefs(sourceFile: string, source: string): TermRef[] {
  const refs: TermRef[] = [];

  for (const match of source.matchAll(termRefPattern)) {
    const href = match[1] ?? "";
    const body = match[2] ?? "";
    const matchIndex = match.index;
    const line = source.slice(0, matchIndex).split("\n").length;
    const { targetFile, anchor } = parseHref(href);
    const supMatch = supPattern.exec(body);

    refs.push({
      sourceFile,
      line,
      href,
      targetFile,
      anchor,
      hint: supMatch?.[1]?.trim(),
    });
  }

  return refs;
}

function extractSources(entry: TermEntry): SourceCitation | undefined {
  const lines = entry.body.split("\n");
  const headerIndex = lines.findIndex((line) =>
    /^Sources?\s*:\s*$/u.test(line),
  );
  if (headerIndex === -1) {
    return undefined;
  }

  const externalUrls: string[] = [];
  const factIds: string[] = [];

  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const rawLine = lines[i] ?? "";
    if (/^##\s/u.test(rawLine)) {
      break;
    }
    if (/^Related\s*:\s*$/u.test(rawLine)) {
      break;
    }
    if (rawLine.trim().length === 0) {
      // allow a blank line directly after "Sources:" but stop on the first
      // blank line after we've started collecting bullet items
      if (externalUrls.length > 0 || factIds.length > 0) {
        break;
      }
      continue;
    }
    if (!rawLine.startsWith("- ")) {
      // tolerate continuation lines for wrapped bullets
      if (/^\s+/u.test(rawLine)) {
        continue;
      }
      break;
    }

    for (const urlMatch of rawLine.matchAll(externalUrlPattern)) {
      externalUrls.push(urlMatch[0]);
    }
    for (const factMatch of rawLine.matchAll(factIdPattern)) {
      factIds.push(factMatch[0]);
    }
  }

  return {
    file: entry.file,
    slug: entry.slug,
    line: entry.bodyStartLine + headerIndex,
    externalUrls,
    factIds,
  };
}

async function readTerminologyFiles(): Promise<
  ReadonlyMap<string, { readonly source: string }>
> {
  const entries = await readdir(terminologyRoot);
  const markdown = entries.filter((entry) => entry.endsWith(".md"));
  const out = new Map<string, { readonly source: string }>();

  await Promise.all(
    markdown.map(async (fileName) => {
      const source = await readFile(join(terminologyRoot, fileName), "utf8");
      out.set(fileName, { source });
    }),
  );

  return out;
}

async function loadFactIds(): Promise<ReadonlySet<string>> {
  const entries = await readdir(factsRoot);
  const markdown = entries.filter((entry) => entry.endsWith(".md"));
  const ids = new Set<string>();

  await Promise.all(
    markdown.map(async (fileName) => {
      const source = await readFile(join(factsRoot, fileName), "utf8");
      const matches = source.matchAll(
        /^###\s+(FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)\s*$/gmu,
      );
      for (const match of matches) {
        const id = match[1];
        if (id !== undefined) {
          ids.add(id);
        }
      }
    }),
  );

  return ids;
}

function checkDuplicateHeadings(
  fileName: string,
  headings: readonly HeadingSlug[],
  failures: Failure[],
): void {
  const seen = new Map<string, HeadingSlug>();
  for (const heading of headings) {
    const prior = seen.get(heading.slug);
    if (prior === undefined) {
      seen.set(heading.slug, heading);
      continue;
    }

    failures.push({
      file: fileName,
      line: heading.line,
      message: `duplicate heading slug "${heading.slug}" (also at line ${prior.line}: "${prior.text}")`,
    });
  }
}

function checkTermRef(
  ref: TermRef,
  headingsByFile: ReadonlyMap<string, readonly HeadingSlug[]>,
  failures: Failure[],
): void {
  if (ref.targetFile === undefined) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef href "${ref.href}" must point inside #/terminology/<file>`,
    });
    return;
  }

  const targetHeadings = headingsByFile.get(ref.targetFile);
  if (targetHeadings === undefined) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef targets unknown terminology file "${ref.targetFile}"`,
    });
    return;
  }

  if (ref.anchor.length === 0) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef to "${ref.targetFile}" is missing an #anchor`,
    });
    return;
  }

  const matching = targetHeadings.find(
    (heading) => heading.slug === ref.anchor,
  );
  if (matching === undefined) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef anchor "#${ref.anchor}" not found in ${ref.targetFile}`,
    });
    return;
  }

  const expectedHint = expectedHintByFile.get(ref.targetFile);
  if (expectedHint === undefined) {
    return;
  }

  if (ref.hint === undefined) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef to ${ref.targetFile}#${ref.anchor} is missing a <sup>${expectedHint}</sup> hint`,
    });
    return;
  }

  if (ref.hint !== expectedHint) {
    failures.push({
      file: ref.sourceFile,
      line: ref.line,
      message: `termRef hint <sup>${ref.hint}</sup> does not match ${ref.targetFile} domain (expected ${expectedHint})`,
    });
  }
}

function checkEntrySources(
  entry: TermEntry,
  factIds: ReadonlySet<string>,
  failures: Failure[],
): void {
  const required = sourcingRequiredFiles.has(entry.file);
  const citation = extractSources(entry);

  if (citation === undefined) {
    if (required) {
      failures.push({
        file: entry.file,
        line: entry.line,
        message: `entry "${entry.slug}" must include a Sources: block (vendor/regulatory files require external citations)`,
      });
    }
    return;
  }

  if (required && citation.externalUrls.length === 0) {
    failures.push({
      file: entry.file,
      line: citation.line,
      message: `entry "${entry.slug}" Sources: block must include at least one https?:// link to official documentation`,
    });
  }

  for (const factId of citation.factIds) {
    if (!factIds.has(factId)) {
      failures.push({
        file: entry.file,
        line: citation.line,
        message: `entry "${entry.slug}" references unknown ${factId} (not found in facts/)`,
      });
    }
  }
}

const curriculumScanRoots: readonly string[] = [
  "tutorials",
  "quizzes",
  "flashcards",
  "exams",
  "facts",
  "regulations",
  "challenges",
];

async function* walkMarkdown(
  root: string,
): AsyncGenerator<{ readonly relativePath: string; readonly source: string }> {
  const entries = await readdir(root, { withFileTypes: true });
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

async function scanCurriculumTermRefs(
  headingsByFile: ReadonlyMap<string, readonly HeadingSlug[]>,
  failures: Failure[],
): Promise<number> {
  let curriculumRefCount = 0;
  for (const dirName of curriculumScanRoots) {
    const root = join(repoRoot, dirName);
    try {
      await readdir(root);
    } catch {
      continue;
    }
    for await (const { relativePath, source } of walkMarkdown(root)) {
      const refs = extractTermRefs(relativePath, source);
      curriculumRefCount += refs.length;
      for (const ref of refs) {
        checkTermRef(ref, headingsByFile, failures);
      }
    }
  }
  return curriculumRefCount;
}

async function main(): Promise<void> {
  const files = await readTerminologyFiles();
  const factIds = await loadFactIds();
  const failures: Failure[] = [];
  const headingsByFile = new Map<string, readonly HeadingSlug[]>();

  for (const [fileName, file] of files.entries()) {
    const headings = extractHeadings(fileName, file.source);
    headingsByFile.set(fileName, headings);
    checkDuplicateHeadings(fileName, headings, failures);
  }

  let referenceCount = 0;
  let sourceCitationCount = 0;
  let factLinkCount = 0;

  for (const [fileName, file] of files.entries()) {
    const refs = extractTermRefs(fileName, file.source);
    referenceCount += refs.length;
    for (const ref of refs) {
      checkTermRef(ref, headingsByFile, failures);
    }

    if (fileName === "README.md") {
      continue;
    }

    const entries = extractTermEntries(fileName, file.source);
    for (const entry of entries) {
      checkEntrySources(entry, factIds, failures);
      const citation = extractSources(entry);
      if (citation !== undefined) {
        sourceCitationCount += 1;
        factLinkCount += citation.factIds.length;
      }
    }
  }

  const curriculumRefCount = await scanCurriculumTermRefs(
    headingsByFile,
    failures,
  );

  if (failures.length > 0) {
    process.stderr.write(
      `Terminology validation failed with ${failures.length} issue(s):\n`,
    );
    for (const failure of failures) {
      const location =
        failure.line === undefined
          ? failure.file
          : `${failure.file}:${failure.line}`;
      process.stderr.write(`  ${location} - ${failure.message}\n`);
    }
    process.exit(1);
  }

  let headingCount = 0;
  for (const headings of headingsByFile.values()) {
    headingCount += headings.length;
  }

  process.stdout.write(
    `Terminology validation passed: ${files.size} files, ${headingCount} headings, ${referenceCount} termRef references, ${sourceCitationCount} sourced entries, ${factLinkCount} FACT-* links, ${curriculumRefCount} inline curriculum termRefs.\n`,
  );
}

await main();
