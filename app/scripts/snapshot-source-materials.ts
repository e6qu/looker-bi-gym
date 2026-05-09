import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type SourceSnapshot = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly outputPath: string;
  readonly license: string;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const googleLicense =
  "Google Cloud documentation is licensed under Creative Commons Attribution 4.0, and code samples under Apache 2.0, except as otherwise noted on the source page.";

const snapshots: readonly SourceSnapshot[] = [
  {
    id: "SRC-BIGQUERY-VIEWS-INTRO",
    title: "BigQuery Introduction To Logical Views",
    url: "https://cloud.google.com/bigquery/docs/views-intro",
    outputPath: "sources/platforms/bigquery/full/views-intro.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-VIEWS",
    title: "BigQuery Create Logical Views",
    url: "https://cloud.google.com/bigquery/docs/views",
    outputPath: "sources/platforms/bigquery/full/views.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-AUTHORIZED-VIEWS",
    title: "BigQuery Authorized Views",
    url: "https://cloud.google.com/bigquery/docs/authorized-views",
    outputPath: "sources/platforms/bigquery/full/authorized-views.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-MATERIALIZED-VIEWS",
    title: "BigQuery Materialized Views Introduction",
    url: "https://cloud.google.com/bigquery/docs/materialized-views-intro",
    outputPath: "sources/platforms/bigquery/full/materialized-views-intro.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-JOBS",
    title: "BigQuery INFORMATION_SCHEMA JOBS View",
    url: "https://cloud.google.com/bigquery/docs/information-schema-jobs",
    outputPath: "sources/platforms/bigquery/full/information-schema-jobs.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-AGGREGATE-CALLS",
    title: "BigQuery Aggregate Function Calls",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-function-calls",
    outputPath: "sources/platforms/bigquery/full/aggregate-function-calls.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-AGGREGATE-FUNCTIONS",
    title: "BigQuery Aggregate Functions",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions",
    outputPath: "sources/platforms/bigquery/full/aggregate-functions.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-APPROX-AGGREGATES",
    title: "BigQuery Approximate Aggregate Functions",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions",
    outputPath:
      "sources/platforms/bigquery/full/approximate-aggregate-functions.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-WINDOW-FUNCTIONS",
    title: "BigQuery Window Function Calls",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls",
    outputPath: "sources/platforms/bigquery/full/window-function-calls.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-NAVIGATION-FUNCTIONS",
    title: "BigQuery Navigation Functions",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions",
    outputPath: "sources/platforms/bigquery/full/navigation-functions.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-DATE-FUNCTIONS",
    title: "BigQuery Date Functions",
    url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions",
    outputPath: "sources/platforms/bigquery/full/date-functions.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-PERFORMANCE-COMPUTE",
    title: "BigQuery Optimize Query Computation",
    url: "https://cloud.google.com/bigquery/docs/best-practices-performance-compute",
    outputPath:
      "sources/platforms/bigquery/full/best-practices-performance-compute.md",
    license: googleLicense,
  },
  {
    id: "SRC-BIGQUERY-PERFORMANCE-INPUT",
    title: "BigQuery Optimize Query Inputs",
    url: "https://cloud.google.com/bigquery/docs/best-practices-performance-input",
    outputPath:
      "sources/platforms/bigquery/full/best-practices-performance-input.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-DATA-SOURCES",
    title: "Looker Studio About Data Sources",
    url: "https://cloud.google.com/looker/docs/studio/about-data-sources",
    outputPath: "sources/platforms/looker-studio/full/about-data-sources.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-CALCULATED-FIELDS",
    title: "Looker Studio Calculated Fields",
    url: "https://docs.cloud.google.com/data-studio/add-edit-and-troubleshoot-calculated-fields",
    outputPath:
      "sources/platforms/looker-studio/full/add-edit-and-troubleshoot-calculated-fields.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-ABOUT-CALCULATED-FIELDS",
    title: "Looker Studio About Calculated Fields",
    url: "https://cloud.google.com/looker/docs/studio/about-calculated-fields",
    outputPath:
      "sources/platforms/looker-studio/full/about-calculated-fields.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-CREDENTIALS",
    title: "Looker Studio Data Credentials",
    url: "https://cloud.google.com/looker/docs/studio/data-credentials",
    outputPath: "sources/platforms/looker-studio/full/data-credentials.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-BLENDED-DATA",
    title: "Looker Studio Blended Data",
    url: "https://cloud.google.com/looker/docs/studio/blended-data",
    outputPath: "sources/platforms/looker-studio/full/blended-data.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-BLENDS",
    title: "Looker Studio Blending Tips And Advanced Concepts",
    url: "https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts",
    outputPath:
      "sources/platforms/looker-studio/full/blending-tips-and-advanced-concepts.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-JOIN-KEY",
    title: "Looker Studio Join Key",
    url: "https://cloud.google.com/looker/docs/studio/join-key",
    outputPath: "sources/platforms/looker-studio/full/join-key.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-AGGREGATION",
    title: "Looker Studio Aggregation",
    url: "https://cloud.google.com/looker/docs/studio/aggregation",
    outputPath: "sources/platforms/looker-studio/full/aggregation.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-AGGREGATION-ARTICLE",
    title: "Looker Studio Aggregation Article",
    url: "https://docs.cloud.google.com/looker/docs/studio/aggregation-article",
    outputPath: "sources/platforms/looker-studio/full/aggregation-article.md",
    license: googleLicense,
  },
  {
    id: "SRC-LOOKER-STUDIO-DIMENSION",
    title: "Looker Studio Dimension",
    url: "https://cloud.google.com/looker/docs/studio/dimension",
    outputPath: "sources/platforms/looker-studio/full/dimension.md",
    license: googleLicense,
  },
];

function extractBetween(
  source: string,
  startPattern: RegExp,
  endPattern: RegExp,
): string | null {
  const startMatch = startPattern.exec(source);

  if (startMatch === null || startMatch.index < 0) {
    return null;
  }

  const endMatch = endPattern.exec(source.slice(startMatch.index));

  if (endMatch === null || endMatch.index < 0) {
    return null;
  }

  const endIndex = startMatch.index + endMatch.index + endMatch[0].length;

  return source.slice(startMatch.index, endIndex);
}

function stripUnsafePageChrome(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, "")
    .replace(
      /<devsite-content-footer\b[\s\S]*?<\/devsite-content-footer>/giu,
      "",
    )
    .replace(/<devsite-book-nav\b[\s\S]*?<\/devsite-book-nav>/giu, "")
    .replace(
      /<devsite-floating-action-buttons\b[\s\S]*?<\/devsite-floating-action-buttons>/giu,
      "",
    )
    .replace(/AIza[0-9A-Za-z_-]+/gu, "[redacted-google-api-key]")
    .replace(/pk_live_[0-9A-Za-z]+/gu, "[redacted-public-token]")
    .trim();
}

function extractArticleHtml(html: string): string {
  const article = extractBetween(html, /<article\b[^>]*>/iu, /<\/article>/iu);
  const main = extractBetween(html, /<main\b[^>]*>/iu, /<\/main>/iu);
  const content = article ?? main ?? html;

  return stripUnsafePageChrome(content);
}

function renderSnapshot(snapshot: SourceSnapshot, html: string): string {
  return `# ${snapshot.title}

- Source ID: \`${snapshot.id}\`
- URL: ${snapshot.url}
- Accessed: 2026-05-09
- Local format: Markdown wrapper containing the complete fetched article HTML.
- License: ${snapshot.license}

## Complete Article HTML Snapshot

~~~html
${extractArticleHtml(html)}
~~~
`;
}

for (const snapshot of snapshots) {
  const response = await fetch(snapshot.url, {
    headers: {
      "User-Agent": "looker-bi-gym-source-snapshot/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${snapshot.url}: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const outputPath = join(repoRoot, snapshot.outputPath);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderSnapshot(snapshot, html), "utf8");
}
