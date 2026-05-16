import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type HeadingSlug = {
  readonly file: string;
  readonly slug: string;
  readonly text: string;
  readonly line: number;
};

type TermRef = {
  readonly sourceFile: string;
  readonly line: number;
  readonly href: string;
  readonly targetFile: string | undefined;
  readonly anchor: string;
  readonly hint: string | undefined;
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

const expectedHintByFile: ReadonlyMap<string, string> = new Map([
  ["bi.md", "BI"],
  ["sql.md", "SQL"],
  ["bigquery.md", "BQ"],
  ["looker-studio.md", "LS"],
  ["banking.md", "BNK"],
  ["regulations.md", "REG"],
  ["duckdb.md", "DB"],
]);

const headingPattern = /^(#{1,6})\s+(.+?)\s*$/u;
const termRefPattern =
  /<a\s+class="termRef"\s+href="([^"]+)"\s*>([\s\S]*?)<\/a>/gu;
const supPattern = /<sup>([^<]+)<\/sup>/u;

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

async function main(): Promise<void> {
  const files = await readTerminologyFiles();
  const failures: Failure[] = [];
  const headingsByFile = new Map<string, readonly HeadingSlug[]>();

  for (const [fileName, file] of files.entries()) {
    const headings = extractHeadings(fileName, file.source);
    headingsByFile.set(fileName, headings);
    checkDuplicateHeadings(fileName, headings, failures);
  }

  let referenceCount = 0;
  for (const [fileName, file] of files.entries()) {
    const refs = extractTermRefs(fileName, file.source);
    referenceCount += refs.length;
    for (const ref of refs) {
      checkTermRef(ref, headingsByFile, failures);
    }
  }

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
    `Terminology validation passed: ${files.size} files, ${headingCount} headings, ${referenceCount} termRef references.\n`,
  );
}

await main();
