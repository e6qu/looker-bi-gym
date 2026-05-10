export type FactRecord = {
  readonly id: string;
  readonly area: string;
  readonly fileName: string;
  readonly filePath: string;
  readonly statement: string;
  readonly sourceQuote: string;
  readonly derivedImplication: string;
  readonly relatedFacts: readonly string[];
  readonly href: string;
};

const rawFactFiles = import.meta.glob<string>("../../docs/facts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const factHeadingPattern = /^### (FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/u;
const factIdPattern = /FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*/gu;

function slugifyFactId(factId: string): string {
  return factId.toLowerCase();
}

function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.md$/u, "")
    .replaceAll("-", " ")
    .replace(/\b\w/gu, (letter) => letter.toUpperCase());
}

function extractField(body: string, label: string): string {
  const fieldPrefix = `- ${label}:`;
  const lines = body.split(/\r?\n/u);
  const fieldIndex = lines.findIndex((line) => line.startsWith(fieldPrefix));

  if (fieldIndex < 0) {
    return "";
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

  return values.filter((value) => value.length > 0).join(" ");
}

function extractRelatedFacts(body: string, factId: string): readonly string[] {
  const relatedFacts = new Set<string>();

  for (const match of body.matchAll(factIdPattern)) {
    const candidate = match[0];

    if (candidate !== factId) {
      relatedFacts.add(candidate);
    }
  }

  return [...relatedFacts].sort();
}

function parseFactFile(
  importPath: string,
  source: string,
): readonly FactRecord[] {
  const fileName = importPath.split("/").at(-1) ?? importPath;
  const filePath = `docs/facts/${fileName}`;
  const area = titleFromFileName(fileName);
  const facts: FactRecord[] = [];
  let currentFactId: string | undefined;
  let currentLines: string[] = [];

  function flushFact(): void {
    if (currentFactId === undefined) {
      return;
    }

    const body = currentLines.join("\n").trim();

    facts.push({
      id: currentFactId,
      area,
      fileName,
      filePath,
      statement: extractField(body, "Statement"),
      sourceQuote: extractField(body, "Source quote"),
      derivedImplication: extractField(body, "Derived implication"),
      relatedFacts: extractRelatedFacts(body, currentFactId),
      href: `#/facts/${slugifyFactId(currentFactId)}`,
    });
  }

  for (const line of source.split(/\r?\n/u)) {
    const factHeading = factHeadingPattern.exec(line);

    if (factHeading?.[1] !== undefined) {
      flushFact();
      currentFactId = factHeading[1];
      currentLines = [];
      continue;
    }

    if (currentFactId !== undefined) {
      currentLines.push(line);
    }
  }

  flushFact();

  return facts;
}

export const factCatalog: readonly FactRecord[] = Object.entries(rawFactFiles)
  .flatMap(([importPath, source]) => parseFactFile(importPath, source))
  .sort((left, right) => left.id.localeCompare(right.id));

export const factById = new Map(
  factCatalog.map((fact) => [fact.id, fact] as const),
);

export function getFactHref(factId: string): string {
  return factById.get(factId)?.href ?? "#/docs/facts/README.md";
}

export function getFactByRouteId(
  routeId: string | undefined,
): FactRecord | undefined {
  if (routeId === undefined || routeId.length === 0) {
    return undefined;
  }

  const normalizedRouteId = routeId.toUpperCase();

  return (
    factById.get(normalizedRouteId) ??
    factCatalog.find((fact) => slugifyFactId(fact.id) === routeId)
  );
}
