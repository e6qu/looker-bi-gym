export type ContentSectionId = "docs" | "regulations" | "tutorials";

export type ContentDocument = {
  readonly section: ContentSectionId;
  readonly fileName: string;
  readonly filePath: string;
  readonly title: string;
  readonly markdown: string;
};

export type ContentSection = {
  readonly id: ContentSectionId;
  readonly label: string;
  readonly description: string;
  readonly documents: readonly ContentDocument[];
};

const rawDocs = import.meta.glob<string>("../../docs/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const rawRegulations = import.meta.glob<string>("../../regulations/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const rawTutorials = import.meta.glob<string>("../../tutorials/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function titleFromMarkdown(markdown: string, fileName: string): string {
  const heading = /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim();
  if (heading !== undefined && heading.length > 0) {
    return heading;
  }

  return fileName
    .replace(/\.md$/, "")
    .replace(/^\d+-/, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter: string) => letter.toUpperCase());
}

function toDocuments(
  section: ContentSectionId,
  files: Readonly<Record<string, string>>,
): ContentDocument[] {
  return Object.entries(files)
    .map(([importPath, markdown]) => {
      const maybeFileName = importPath.split("/").at(-1);
      const fileName = maybeFileName ?? importPath;
      return {
        section,
        fileName,
        filePath: `${section}/${fileName}`,
        title: titleFromMarkdown(markdown, fileName),
        markdown,
      };
    })
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
    documents: toDocuments("docs", rawDocs),
  },
  {
    id: "regulations",
    label: "Regulations",
    description:
      "EU and Romanian regulatory context labels for synthetic banking BI scenarios.",
    documents: toDocuments("regulations", rawRegulations),
  },
  {
    id: "tutorials",
    label: "Tutorials",
    description:
      "Layered tutorial sketches and contracts for browser-first technical BI practice.",
    documents: toDocuments("tutorials", rawTutorials),
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
