import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

type SourceFile = {
  readonly path: string;
  readonly source: string;
};

const appRoot = join(fileURLToPath(new URL("..", import.meta.url)));
const repoRoot = join(appRoot, "..");
const sourceRoots = [join(appRoot, "src")];
const sourceExtensions = new Set([".ts", ".tsx"]);
const forbiddenRuntimePatterns: ReadonlyArray<{
  readonly label: string;
  readonly pattern: RegExp;
}> = [
  { label: "fetch", pattern: /\bfetch\s*\(/u },
  { label: "XMLHttpRequest", pattern: /\bXMLHttpRequest\b/u },
  { label: "WebSocket", pattern: /\bWebSocket\b/u },
  { label: "EventSource", pattern: /\bEventSource\b/u },
  { label: "sendBeacon", pattern: /\bnavigator\.sendBeacon\b/u },
  { label: "service worker", pattern: /\bserviceWorker\b/u },
  { label: "sessionStorage", pattern: /\bsessionStorage\b/u },
  { label: "IndexedDB", pattern: /\bindexedDB\b/u },
];

async function listSourceFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(root, entry.name);

      if (entry.isDirectory()) {
        return listSourceFiles(path);
      }

      return sourceExtensions.has(extname(entry.name)) ? [path] : [];
    }),
  );

  return nested.flat().sort();
}

async function readSourceFiles(): Promise<readonly SourceFile[]> {
  const paths = (await Promise.all(sourceRoots.map(listSourceFiles))).flat();

  return Promise.all(
    paths.map(async (path) => ({
      path,
      source: await readFile(path, "utf8"),
    })),
  );
}

function findForbiddenRuntimeUsage(
  files: readonly SourceFile[],
): readonly string[] {
  return files.flatMap((file) =>
    forbiddenRuntimePatterns
      .filter((entry) => entry.pattern.test(file.source))
      .map(
        (entry) =>
          `${relative(repoRoot, file.path)} uses forbidden ${entry.label}`,
      ),
  );
}

async function assertDocumentationBoundary(): Promise<void> {
  const appReadme = await readFile(join(appRoot, "README.md"), "utf8");
  const deploymentDoc = await readFile(
    join(repoRoot, "docs", "09-github-pages-deployment.md"),
    "utf8",
  );
  const testPyramidDoc = await readFile(
    join(repoRoot, "docs", "12-test-pyramid.md"),
    "utf8",
  );

  assert.match(appReadme, /frontend-only/iu);
  assert.match(appReadme, /no backend account system/iu);
  assert.match(appReadme, /localStorage/iu);
  assert.match(appReadme, /same-site browser cookie/iu);
  assert.match(deploymentDoc, /GitHub Actions as the source/iu);
  assert.match(testPyramidDoc, /Test Pyramid/iu);
  assert.match(testPyramidDoc, /Static architecture boundary/iu);
  assert.match(testPyramidDoc, /Rendered user flows/iu);
}

async function assertScriptPyramid(): Promise<void> {
  const packageJson = JSON.parse(
    await readFile(join(appRoot, "package.json"), "utf8"),
  ) as {
    readonly scripts?: Readonly<Record<string, string>>;
  };
  const scripts = packageJson.scripts ?? {};
  const checkScript = scripts["check"] ?? "";

  for (const requiredScript of [
    "format:check",
    "lint",
    "typecheck",
    "test:quiz",
    "test:sql",
    "test:fixtures",
    "test:derived-expectations",
    "test:cloud-evidence",
    "test:browser-config",
    "test:progress-export",
    "test:content-qa",
    "test:facts-db",
    "test:llm-workbench",
    "test:platform-boundary",
    "test:validators",
    "test:e2e",
    "validate:static-links",
  ]) {
    assert.ok(
      checkScript.includes(requiredScript),
      `check script must include ${requiredScript}.`,
    );
  }
}

const sourceFiles = await readSourceFiles();
const forbiddenUsage = findForbiddenRuntimeUsage(sourceFiles);

assert.deepEqual(
  forbiddenUsage,
  [],
  `Frontend-only runtime boundary violations:\n${forbiddenUsage.join("\n")}`,
);

await assertDocumentationBoundary();
await assertScriptPyramid();
