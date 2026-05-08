import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type HtmlReference = {
  readonly attribute: "href" | "src";
  readonly value: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const distRoot = join(appRoot, "dist");
const indexPath = join(distRoot, "index.html");
const configuredBase = process.env["GITHUB_PAGES_BASE"];

function isExternalReference(value: string): boolean {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//") ||
    value.startsWith("data:") ||
    value.startsWith("mailto:") ||
    value.startsWith("#")
  );
}

function stripQueryAndHash(value: string): string {
  return value.split(/[?#]/, 1)[0] ?? value;
}

function stripConfiguredBase(value: string): string {
  if (
    configuredBase === undefined ||
    configuredBase.length === 0 ||
    configuredBase === "./"
  ) {
    return value;
  }

  const normalizedBase = configuredBase.endsWith("/")
    ? configuredBase
    : `${configuredBase}/`;

  if (value.startsWith(normalizedBase)) {
    return value.slice(normalizedBase.length);
  }

  return value;
}

function localReferencePath(value: string): string | undefined {
  if (isExternalReference(value)) {
    return undefined;
  }

  const cleanedValue = stripConfiguredBase(stripQueryAndHash(value)).replace(
    /^\/+/u,
    "",
  );

  if (cleanedValue.length === 0) {
    return undefined;
  }

  return join(distRoot, cleanedValue);
}

function extractHtmlReferences(html: string): HtmlReference[] {
  const references: HtmlReference[] = [];
  const pattern = /\b(href|src)=["']([^"']+)["']/gu;

  for (const match of html.matchAll(pattern)) {
    const attribute = match[1];
    const value = match[2];

    if ((attribute === "href" || attribute === "src") && value !== undefined) {
      references.push({ attribute, value });
    }
  }

  return references;
}

async function assertExists(
  path: string,
  reference: HtmlReference,
): Promise<void> {
  try {
    await access(path);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(
        `${reference.attribute}="${reference.value}" points to missing built file ${path}.`,
        {
          cause: error,
        },
      );
    }

    throw error;
  }
}

async function main(): Promise<void> {
  const html = await readFile(indexPath, "utf8");
  const references = extractHtmlReferences(html);

  if (references.length === 0) {
    throw new Error("No href or src references found in built index.html.");
  }

  await Promise.all(
    references.map(async (reference) => {
      const path = localReferencePath(reference.value);

      if (path !== undefined) {
        await assertExists(path, reference);
      }
    }),
  );
}

await main();
