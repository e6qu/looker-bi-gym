import { generatedContentDocuments } from "./generated/contentCatalog";

export type ContentSectionId =
  | "docs"
  | "regulations"
  | "terminology"
  | "tutorials";

export type ContentDocument = {
  readonly section: ContentSectionId;
  readonly fileName: string;
  readonly filePath: string;
  readonly title: string;
  readonly markdown: string;
  readonly metadata?: {
    readonly id: string;
    readonly title: string;
    readonly content_type: string;
    readonly status: string;
    readonly version: string;
    readonly topic?: string;
    readonly difficulty?: string;
    readonly estimated_minutes?: number;
    readonly source_facts?: readonly string[];
    readonly recommended_learner_tasks?: readonly string[];
    readonly prerequisites?: readonly string[];
    readonly tags?: readonly string[];
  };
};

export type ContentSection = {
  readonly id: ContentSectionId;
  readonly label: string;
  readonly description: string;
  readonly documents: readonly ContentDocument[];
};

function toDocuments(section: ContentSectionId): readonly ContentDocument[] {
  return generatedContentDocuments
    .filter((document) => document.section === section)
    .sort((left, right) => {
      if (left.fileName === "README.md") {
        return -1;
      }
      if (right.fileName === "README.md") {
        return 1;
      }
      return left.fileName.localeCompare(right.fileName);
    });
}

export const contentSections: readonly ContentSection[] = [
  {
    id: "docs",
    label: "Docs",
    description:
      "Source notes and technical references for BI foundations, banking context, and tooling decisions.",
    documents: toDocuments("docs"),
  },
  {
    id: "regulations",
    label: "Regulations",
    description:
      "EU and Romanian regulatory context labels for synthetic banking BI scenarios.",
    documents: toDocuments("regulations"),
  },
  {
    id: "terminology",
    label: "Terminology",
    description:
      "BI, SQL, BigQuery, Looker Studio, banking, regulatory, and DuckDB/browser-runtime vocabulary.",
    documents: toDocuments("terminology"),
  },
  {
    id: "tutorials",
    label: "Tutorials",
    description:
      "Layered tutorial sketches and contracts for browser-first technical BI practice.",
    documents: toDocuments("tutorials"),
  },
];

export const contentByPath = new Map(
  contentSections.flatMap((section) =>
    section.documents.map((document) => [document.filePath, document] as const),
  ),
);

export function getSection(
  sectionId: ContentSectionId,
): ContentSection | undefined {
  return contentSections.find((section) => section.id === sectionId);
}

export function getDefaultDocument(
  sectionId: ContentSectionId,
): ContentDocument | undefined {
  return getSection(sectionId)?.documents[0];
}

export function getDocument(
  sectionId: ContentSectionId,
  fileName?: string,
): ContentDocument | undefined {
  if (fileName === undefined || fileName.length === 0) {
    return getDefaultDocument(sectionId);
  }

  return (
    contentByPath.get(`${sectionId}/${fileName}`) ??
    getDefaultDocument(sectionId)
  );
}
