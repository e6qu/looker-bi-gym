import { Database } from "bun:sqlite";
import { mkdir, readdir, readFile, unlink } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";

type MarkdownSection = {
  readonly heading: string;
  readonly body: string;
};

type SourceDocument = {
  readonly sourceId: string;
  readonly title: string;
  readonly path: string;
  readonly url: string | null;
  readonly body: string;
};

export type SourceCard = {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly sourceType: string | null;
  readonly publisher: string | null;
  readonly url: string | null;
  readonly accessed: string | null;
  readonly usedByFacts: readonly string[];
  readonly body: string;
};

export type FactCard = {
  readonly id: string;
  readonly area: string;
  readonly path: string;
  readonly statement: string;
  readonly sourceQuote: string;
  readonly derivedImplication: string;
  readonly sourceIds: readonly string[];
  readonly relatedFacts: readonly string[];
  readonly body: string;
};

export type FactDatabaseBuildOptions = {
  readonly repoRoot: string;
  readonly outputPath: string;
};

export type FactDatabaseBuildSummary = {
  readonly outputPath: string;
  readonly sourceCount: number;
  readonly sourceDocumentCount: number;
  readonly factCount: number;
  readonly factSourceCount: number;
  readonly factLinkCount: number;
  readonly factTripleCount: number;
};

const markdownExtensions = new Set([".md"]);
const sourceHeadingPattern =
  /^## (SRC-[A-Z0-9]+(?:-[A-Z0-9]+)*)(?:\s+-\s+(.+))?$/u;
const factHeadingPattern = /^### (FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/u;
const factIdPattern = /FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*/gu;
const sourceIdPattern = /SRC-[A-Z0-9]+(?:-[A-Z0-9]+)*/gu;

async function listFiles(
  root: string,
  extensions: ReadonlySet<string>,
): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(root, entry.name);

      if (entry.isDirectory()) {
        return listFiles(entryPath, extensions);
      }

      return extensions.has(extname(entry.name)) ? [entryPath] : [];
    }),
  );

  return nested.flat().sort();
}

function collectSections(
  source: string,
  headingPrefix: string,
): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  let currentHeading: string | null = null;
  let currentLines: string[] = [];

  for (const line of source.split(/\r?\n/u)) {
    if (line.startsWith(headingPrefix)) {
      if (currentHeading !== null) {
        sections.push({
          heading: currentHeading,
          body: currentLines.join("\n").trim(),
        });
      }

      currentHeading = line.trim();
      currentLines = [];
      continue;
    }

    if (currentHeading !== null) {
      currentLines.push(line);
    }
  }

  if (currentHeading !== null) {
    sections.push({
      heading: currentHeading,
      body: currentLines.join("\n").trim(),
    });
  }

  return sections;
}

function extractField(body: string, label: string): string | null {
  const fieldPrefix = `- ${label}:`;
  const lines = body.split(/\r?\n/u);
  const fieldIndex = lines.findIndex((line) => line.startsWith(fieldPrefix));

  if (fieldIndex < 0) {
    return null;
  }

  const values = [lines[fieldIndex]?.slice(fieldPrefix.length).trim() ?? ""];

  for (const line of lines.slice(fieldIndex + 1)) {
    if (line.startsWith("- ")) {
      break;
    }

    if (line.startsWith("  ")) {
      values.push(line.trim());
    }
  }

  const value = values.filter((entry) => entry.length > 0).join(" ");

  return value.length === 0 ? null : value;
}

function extractIds(source: string, pattern: RegExp): string[] {
  const ids = new Set<string>();

  for (const match of source.matchAll(pattern)) {
    const id = match[0];

    if (id.length > 0) {
      ids.add(id);
    }
  }

  return [...ids].sort();
}

function stripTrailingPeriod(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  return value.endsWith(".") ? value.slice(0, -1) : value;
}

function extractBodyField(body: string, label: string): string {
  const value = extractField(body, label);

  if (value !== null) {
    return value;
  }

  return "";
}

function parseSourceDocument(
  source: string,
  sourcePath: string,
  repoRoot: string,
): SourceDocument | null {
  const sourceId =
    extractField(source, "Source ID")?.replace(/`/gu, "") ?? null;

  if (sourceId === null) {
    return null;
  }

  sourceIdPattern.lastIndex = 0;
  const hasValidSourceId = sourceIdPattern.exec(sourceId) !== null;
  sourceIdPattern.lastIndex = 0;

  if (!hasValidSourceId) {
    return null;
  }

  return {
    sourceId,
    title: source.split(/\r?\n/u)[0]?.replace(/^#\s*/u, "") ?? sourceId,
    path: relative(repoRoot, sourcePath),
    url: stripTrailingPeriod(extractField(source, "URL")),
    body: source,
  };
}

function parseSourceCard(
  section: MarkdownSection,
  sourcePath: string,
  repoRoot: string,
): SourceCard | null {
  const match = sourceHeadingPattern.exec(section.heading);
  const sourceId = match?.[1];

  if (sourceId === undefined) {
    return null;
  }

  return {
    id: sourceId,
    title: match?.[2] ?? sourceId,
    path: relative(repoRoot, sourcePath),
    sourceType: stripTrailingPeriod(extractField(section.body, "Type")),
    publisher: stripTrailingPeriod(extractField(section.body, "Publisher")),
    url: stripTrailingPeriod(extractField(section.body, "URL")),
    accessed: stripTrailingPeriod(extractField(section.body, "Accessed")),
    usedByFacts: extractIds(section.body, factIdPattern),
    body: section.body,
  };
}

function parseFactCard(
  section: MarkdownSection,
  factPath: string,
  repoRoot: string,
): FactCard | null {
  const match = factHeadingPattern.exec(section.heading);
  const factId = match?.[1];

  if (factId === undefined) {
    return null;
  }

  const path = relative(repoRoot, factPath);
  const sourceIds = extractIds(section.body, sourceIdPattern);
  const relatedFacts = extractIds(section.body, factIdPattern).filter(
    (relatedFactId) => relatedFactId !== factId,
  );

  return {
    id: factId,
    area: basename(factPath, ".md"),
    path,
    statement: extractBodyField(section.body, "Statement"),
    sourceQuote: extractBodyField(section.body, "Source quote"),
    derivedImplication: extractBodyField(section.body, "Derived implication"),
    sourceIds,
    relatedFacts,
    body: section.body,
  };
}

export async function readSourceCards(repoRoot: string): Promise<SourceCard[]> {
  const sourcePaths = await listFiles(
    join(repoRoot, "sources"),
    markdownExtensions,
  );
  const cards = await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const source = await readFile(sourcePath, "utf8");

      return collectSections(source, "## SRC-")
        .map((section) => parseSourceCard(section, sourcePath, repoRoot))
        .filter((card): card is SourceCard => card !== null);
    }),
  );

  return cards.flat().sort((left, right) => left.id.localeCompare(right.id));
}

async function readSourceDocuments(
  repoRoot: string,
): Promise<SourceDocument[]> {
  const sourcePaths = await listFiles(
    join(repoRoot, "sources"),
    markdownExtensions,
  );
  const documents = await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const source = await readFile(sourcePath, "utf8");

      return parseSourceDocument(source, sourcePath, repoRoot);
    }),
  );

  return documents
    .filter((document): document is SourceDocument => document !== null)
    .sort((left, right) => left.path.localeCompare(right.path));
}

export async function readFactCards(repoRoot: string): Promise<FactCard[]> {
  const factPaths = (
    await listFiles(join(repoRoot, "facts"), markdownExtensions)
  ).filter((path) => basename(path) !== "README.md");
  const cards = await Promise.all(
    factPaths.map(async (factPath) => {
      const source = await readFile(factPath, "utf8");

      return collectSections(source, "### FACT-")
        .map((section) => parseFactCard(section, factPath, repoRoot))
        .filter((card): card is FactCard => card !== null);
    }),
  );

  return cards.flat().sort((left, right) => left.id.localeCompare(right.id));
}

function addLink(
  links: Map<string, Set<string>>,
  leftId: string,
  rightId: string,
): void {
  const existing = links.get(leftId);

  if (existing !== undefined) {
    existing.add(rightId);
    return;
  }

  links.set(leftId, new Set([rightId]));
}

function buildFactSourceLinks(
  sources: readonly SourceCard[],
  facts: readonly FactCard[],
): Map<string, Set<string>> {
  const links = new Map<string, Set<string>>();
  const sourcesById = new Map(sources.map((source) => [source.id, source]));

  for (const fact of facts) {
    for (const sourceId of fact.sourceIds) {
      if (sourcesById.has(sourceId)) {
        addLink(links, fact.id, sourceId);
      }
    }

    for (const source of sources) {
      const hasUsedByReference = source.usedByFacts.includes(fact.id);
      const hasUrlReference =
        source.url !== null &&
        source.url.length > 0 &&
        fact.body.includes(source.url);

      if (hasUsedByReference || hasUrlReference) {
        addLink(links, fact.id, source.id);
      }
    }
  }

  return links;
}

function validateCorpus(
  sources: readonly SourceCard[],
  sourceDocuments: readonly SourceDocument[],
  facts: readonly FactCard[],
  factSourceLinks: ReadonlyMap<string, ReadonlySet<string>>,
): void {
  const sourceIds = new Set(sources.map((source) => source.id));
  const factIds = new Set(facts.map((fact) => fact.id));
  const duplicateSourceIds = sources
    .map((source) => source.id)
    .filter((id, index, allIds) => allIds.indexOf(id) !== index);
  const duplicateFactIds = facts
    .map((fact) => fact.id)
    .filter((id, index, allIds) => allIds.indexOf(id) !== index);
  const missingSourceLinks = facts
    .filter((fact) => (factSourceLinks.get(fact.id)?.size ?? 0) === 0)
    .map((fact) => fact.id);
  const missingSourceIds = facts.flatMap((fact) =>
    fact.sourceIds
      .filter((sourceId) => !sourceIds.has(sourceId))
      .map((sourceId) => `${fact.id} -> ${sourceId}`),
  );
  const unknownDocumentSourceIds = sourceDocuments
    .filter((document) => !sourceIds.has(document.sourceId))
    .map((document) => `${document.path} -> ${document.sourceId}`);
  const missingFactIds = facts.flatMap((fact) =>
    fact.relatedFacts
      .filter((relatedFactId) => !factIds.has(relatedFactId))
      .map((relatedFactId) => `${fact.id} -> ${relatedFactId}`),
  );
  const emptyStatements = facts
    .filter((fact) => fact.statement.length === 0)
    .map((fact) => fact.id);
  const emptyImplications = facts
    .filter((fact) => fact.derivedImplication.length === 0)
    .map((fact) => fact.id);

  if (duplicateSourceIds.length > 0) {
    throw new Error(`Duplicate source IDs:\n${duplicateSourceIds.join("\n")}`);
  }

  if (duplicateFactIds.length > 0) {
    throw new Error(`Duplicate fact IDs:\n${duplicateFactIds.join("\n")}`);
  }

  if (missingSourceLinks.length > 0) {
    throw new Error(
      `Facts without source links:\n${missingSourceLinks.join("\n")}`,
    );
  }

  if (missingSourceIds.length > 0) {
    throw new Error(`Unknown source IDs:\n${missingSourceIds.join("\n")}`);
  }

  if (unknownDocumentSourceIds.length > 0) {
    throw new Error(
      `Source documents with unknown source IDs:\n${unknownDocumentSourceIds.join("\n")}`,
    );
  }

  if (missingFactIds.length > 0) {
    throw new Error(`Unknown related fact IDs:\n${missingFactIds.join("\n")}`);
  }

  if (emptyStatements.length > 0) {
    throw new Error(`Facts without statements:\n${emptyStatements.join("\n")}`);
  }

  if (emptyImplications.length > 0) {
    throw new Error(
      `Facts without derived implications:\n${emptyImplications.join("\n")}`,
    );
  }
}

async function removeExistingDatabase(outputPath: string): Promise<void> {
  try {
    await unlink(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

function countLinks(links: ReadonlyMap<string, ReadonlySet<string>>): number {
  return [...links.values()].reduce(
    (total, targets) => total + targets.size,
    0,
  );
}

export async function buildFactDatabase(
  options: FactDatabaseBuildOptions,
): Promise<FactDatabaseBuildSummary> {
  const sources = await readSourceCards(options.repoRoot);
  const sourceDocuments = await readSourceDocuments(options.repoRoot);
  const facts = await readFactCards(options.repoRoot);
  const factSourceLinks = buildFactSourceLinks(sources, facts);

  validateCorpus(sources, sourceDocuments, facts, factSourceLinks);

  await mkdir(dirname(options.outputPath), { recursive: true });
  await removeExistingDatabase(options.outputPath);

  const database = new Database(options.outputPath);

  database.run("PRAGMA foreign_keys = ON");
  database.run(
    `CREATE TABLE sources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      path TEXT NOT NULL,
      source_type TEXT,
      publisher TEXT,
      url TEXT,
      accessed TEXT,
      body TEXT NOT NULL
    )`,
  );
  database.run(
    `CREATE TABLE facts (
      id TEXT PRIMARY KEY,
      area TEXT NOT NULL,
      path TEXT NOT NULL,
      statement TEXT NOT NULL,
      source_quote TEXT NOT NULL,
      derived_implication TEXT NOT NULL,
      body TEXT NOT NULL
    )`,
  );
  database.run(
    `CREATE TABLE source_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id TEXT NOT NULL REFERENCES sources(id),
      title TEXT NOT NULL,
      path TEXT NOT NULL UNIQUE,
      url TEXT,
      body TEXT NOT NULL
    )`,
  );
  database.run(
    `CREATE TABLE fact_sources (
      fact_id TEXT NOT NULL REFERENCES facts(id),
      source_id TEXT NOT NULL REFERENCES sources(id),
      PRIMARY KEY (fact_id, source_id)
    )`,
  );
  database.run(
    `CREATE TABLE fact_links (
      fact_id TEXT NOT NULL REFERENCES facts(id),
      related_fact_id TEXT NOT NULL REFERENCES facts(id),
      PRIMARY KEY (fact_id, related_fact_id)
    )`,
  );
  database.run(
    `CREATE TABLE triples (
      subject TEXT NOT NULL,
      predicate TEXT NOT NULL,
      object TEXT NOT NULL,
      PRIMARY KEY (subject, predicate, object)
    )`,
  );

  const insertSource = database.query(
    `INSERT INTO sources (
      id,
      title,
      path,
      source_type,
      publisher,
      url,
      accessed,
      body
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertFact = database.query(
    `INSERT INTO facts (
      id,
      area,
      path,
      statement,
      source_quote,
      derived_implication,
      body
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertSourceDocument = database.query(
    `INSERT INTO source_documents (
      source_id,
      title,
      path,
      url,
      body
    ) VALUES (?, ?, ?, ?, ?)`,
  );
  const insertFactSource = database.query(
    `INSERT INTO fact_sources (fact_id, source_id) VALUES (?, ?)`,
  );
  const insertFactLink = database.query(
    `INSERT INTO fact_links (fact_id, related_fact_id) VALUES (?, ?)`,
  );
  const insertTriple = database.query(
    `INSERT OR IGNORE INTO triples (subject, predicate, object) VALUES (?, ?, ?)`,
  );
  const insertAll = database.transaction(() => {
    for (const source of sources) {
      insertSource.run(
        source.id,
        source.title,
        source.path,
        source.sourceType,
        source.publisher,
        source.url,
        source.accessed,
        source.body,
      );
    }

    for (const fact of facts) {
      insertFact.run(
        fact.id,
        fact.area,
        fact.path,
        fact.statement,
        fact.sourceQuote,
        fact.derivedImplication,
        fact.body,
      );
    }

    for (const sourceDocument of sourceDocuments) {
      insertSourceDocument.run(
        sourceDocument.sourceId,
        sourceDocument.title,
        sourceDocument.path,
        sourceDocument.url,
        sourceDocument.body,
      );
    }

    for (const [factId, sourceIds] of factSourceLinks.entries()) {
      for (const sourceId of sourceIds) {
        insertFactSource.run(factId, sourceId);
        insertTriple.run(factId, "SUPPORTED_BY_SOURCE", sourceId);
        insertTriple.run(sourceId, "SUPPORTS_FACT", factId);
      }
    }

    for (const fact of facts) {
      for (const relatedFactId of fact.relatedFacts) {
        insertFactLink.run(fact.id, relatedFactId);
        insertTriple.run(fact.id, "RELATED_TO_FACT", relatedFactId);
      }
    }

    for (const sourceDocument of sourceDocuments) {
      insertTriple.run(
        sourceDocument.sourceId,
        "HAS_SOURCE_DOCUMENT",
        sourceDocument.path,
      );
    }
  });

  insertAll();
  database.close();

  return {
    outputPath: options.outputPath,
    sourceCount: sources.length,
    sourceDocumentCount: sourceDocuments.length,
    factCount: facts.length,
    factSourceCount: countLinks(factSourceLinks),
    factLinkCount: facts.reduce(
      (total, fact) => total + fact.relatedFacts.length,
      0,
    ),
    factTripleCount:
      countLinks(factSourceLinks) * 2 +
      facts.reduce((total, fact) => total + fact.relatedFacts.length, 0) +
      sourceDocuments.length,
  };
}
