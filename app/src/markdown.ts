import { marked } from "marked";
import { contentByPath } from "./content";
import type { ContentDocument } from "./content";

function normalizePath(path: string): string {
  const output: string[] = [];

  for (const part of path.split("/")) {
    if (part.length === 0 || part === ".") {
      continue;
    }

    if (part === "..") {
      output.pop();
      continue;
    }

    output.push(part);
  }

  return output.join("/");
}

function resolveInternalMarkdownLink(
  document: ContentDocument,
  href: string,
): string | undefined {
  const [hrefPath, hash] = href.split("#");

  if (hrefPath?.endsWith(".md") !== true) {
    return undefined;
  }

  const currentDirectory = document.filePath.split("/").slice(0, -1).join("/");
  const targetPath = normalizePath(`${currentDirectory}/${hrefPath}`);

  if (!contentByPath.has(targetPath)) {
    return undefined;
  }

  return `#/${targetPath}${hash !== undefined && hash.length > 0 ? `#${hash}` : ""}`;
}

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/`/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

export function renderMarkdown(document: ContentDocument): string {
  const unsafeHtml = marked.parse(document.markdown, {
    async: false,
    gfm: true,
  });
  const parsed = new DOMParser().parseFromString(unsafeHtml, "text/html");

  parsed
    .querySelectorAll<HTMLHeadingElement>("h1, h2, h3, h4, h5, h6")
    .forEach((heading) => {
      if (heading.id.length > 0) {
        return;
      }

      const id = slugifyHeading(heading.textContent);
      if (id.length > 0) {
        heading.id = id;
      }
    });

  parsed.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === null || href.length === 0) {
      return;
    }

    if (isExternalUrl(href)) {
      link.target = "_blank";
      link.rel = "noreferrer";
      link.dataset["external"] = "true";
      link.setAttribute("aria-label", `${link.textContent} (external link)`);
      return;
    }

    const internalHref = resolveInternalMarkdownLink(document, href);
    if (internalHref !== undefined) {
      link.href = internalHref;
    }
  });

  return parsed.body.innerHTML;
}
