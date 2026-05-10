import { generatedFactCatalog } from "./generated/contentCatalog";

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

function slugifyFactId(factId: string): string {
  return factId.toLowerCase();
}

export const factCatalog: readonly FactRecord[] = generatedFactCatalog;

export const factById = new Map(
  factCatalog.map((fact) => [fact.id, fact] as const),
);

export function getFactHref(factId: string): string {
  return factById.get(factId)?.href ?? "#/facts";
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
