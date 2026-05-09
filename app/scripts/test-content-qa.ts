import assert from "node:assert/strict";
import { access, readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { regulatoryContextReferences } from "../src/regulatoryContext";
import type {
  ChallengeManifest,
  ChallengeRequiredTools,
} from "../src/challengeTypes";

type DatasetMetadata = {
  readonly dataset_id: string;
  readonly version: string;
  readonly synthetic_only: boolean;
};

type MarkdownFile = {
  readonly path: string;
  readonly source: string;
};

type FactRegister = ReadonlySet<string>;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const challengeDirs = [
  join(repoRoot, "challenges", "manifests"),
  join(repoRoot, "challenges", "drafts"),
];
const markdownRoots = [
  "app/README.md",
  "challenges",
  "datasets",
  "docs",
  "regulations",
  "tasks",
  "tutorials",
].map((path) => join(repoRoot, path));
const disclaimerPattern =
  /not legal, regulatory, accounting, privacy, compliance, or model-risk advice/u;
const sourceFactIdPattern = /`(FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)`/gu;
const sourceFactHeadingPattern = /^### (FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*)$/gmu;
const releasedTutorialFiles = new Set([
  "00-orientation-and-stack.md",
  "01-connect-public-data.md",
  "02-build-a-bi-friendly-model.md",
  "03-first-executive-dashboard.md",
  "04-metrics-and-calculated-fields.md",
  "05-blending-vs-upstream-joins.md",
  "06-performance-and-cost-lab.md",
  "07-governance-security-and-sharing.md",
  "08-observability-and-operations.md",
  "09-technical-bi-capstone.md",
]);

function isExternalLink(target: string): boolean {
  return /^(?:https?:|mailto:|data:|#)/u.test(target);
}

function stripLinkFragment(target: string): string {
  return target.split(/[?#]/u, 1)[0] ?? target;
}

function assertRequiredTools(
  requiredTools: ChallengeRequiredTools,
  challengeId: string,
): void {
  if (requiredTools === "none") {
    return;
  }

  assert.ok(
    requiredTools.length > 0,
    `${challengeId} must list at least one required tool.`,
  );

  for (const tool of requiredTools) {
    assert.ok(
      tool.name.length > 0,
      `${challengeId} has a tool without a name.`,
    );
    assert.ok(
      tool.purpose.length > 0,
      `${challengeId} has a tool without a purpose.`,
    );
    assert.equal(
      tool.required,
      false,
      `${challengeId}:${tool.name} should stay optional for the current learner path.`,
    );
    assert.doesNotMatch(
      `${tool.name} ${tool.purpose} ${tool.platform_notes ?? ""}`,
      /(?:requires?|install)\s+(?:a\s+)?(?:service account key|google cloud cli|bigquery cli|docker|python)/iu,
      `${challengeId}:${tool.name} should not require early-track CLI, key, Docker, or Python tooling.`,
    );
  }
}

async function listFiles(
  root: string,
  extensions: ReadonlySet<string>,
): Promise<string[]> {
  const rootStats = await stat(root);

  if (rootStats.isFile()) {
    return extensions.has(extname(root)) ? [root] : [];
  }

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

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function readChallengeManifests(): Promise<ChallengeManifest[]> {
  const manifestPaths = (
    await Promise.all(
      challengeDirs.map((directory) =>
        listFiles(directory, new Set([".yaml", ".yml"])),
      ),
    )
  ).flat();
  const manifests = await Promise.all(
    manifestPaths.map(
      async (path) => parse(await readFile(path, "utf8")) as ChallengeManifest,
    ),
  );

  return manifests.sort((left, right) => left.id.localeCompare(right.id));
}

async function readMarkdownFiles(): Promise<MarkdownFile[]> {
  const markdownPaths = (
    await Promise.all(
      markdownRoots.map((root) => listFiles(root, new Set([".md"]))),
    )
  ).flat();

  return Promise.all(
    markdownPaths.map(async (path) => ({
      path,
      source: await readFile(path, "utf8"),
    })),
  );
}

async function readFactRegister(): Promise<FactRegister> {
  const factPaths = await listFiles(
    join(repoRoot, "docs", "facts"),
    new Set([".md"]),
  );
  const factIds = new Set<string>();

  for (const factPath of factPaths) {
    const source = await readFile(factPath, "utf8");

    for (const match of source.matchAll(sourceFactIdPattern)) {
      if (match[1] !== undefined) {
        factIds.add(match[1]);
      }
    }

    for (const match of source.matchAll(sourceFactHeadingPattern)) {
      if (match[1] !== undefined) {
        factIds.add(match[1]);
      }
    }
  }

  assert.ok(factIds.size > 0, "Source fact register must contain fact IDs.");

  return factIds;
}

function assertKnownSourceFacts(
  sourceFacts: readonly string[] | undefined,
  factRegister: FactRegister,
  context: string,
): void {
  assert.ok(
    sourceFacts !== undefined && sourceFacts.length > 0,
    `${context} must cite at least one source fact ID.`,
  );

  for (const sourceFact of sourceFacts) {
    assert.ok(
      factRegister.has(sourceFact),
      `${context} references unknown source fact ${sourceFact}.`,
    );
  }
}

async function assertMarkdownLinksResolve(
  markdownFiles: readonly MarkdownFile[],
): Promise<void> {
  const missingLinks: string[] = [];
  const linkPattern = /(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/gu;

  for (const markdownFile of markdownFiles) {
    for (const match of markdownFile.source.matchAll(linkPattern)) {
      const rawTarget = match[1];

      if (rawTarget === undefined || isExternalLink(rawTarget)) {
        continue;
      }

      const target = stripLinkFragment(rawTarget);

      if (target.length === 0) {
        continue;
      }

      const resolvedTarget = resolve(
        dirname(markdownFile.path),
        decodeURIComponent(target),
      );

      if (!(await pathExists(resolvedTarget))) {
        missingLinks.push(`${markdownFile.path} -> ${rawTarget}`);
      }
    }
  }

  assert.deepEqual(
    missingLinks,
    [],
    `Broken Markdown links:\n${missingLinks.join("\n")}`,
  );
}

async function assertDatasetBoundaries(): Promise<void> {
  const metadataPaths = await listFiles(
    join(repoRoot, "datasets"),
    new Set([".json"]),
  );

  for (const metadataPath of metadataPaths.filter((path) =>
    path.endsWith("metadata.json"),
  )) {
    const metadata = JSON.parse(
      await readFile(metadataPath, "utf8"),
    ) as DatasetMetadata;
    const datasetReadmePath = join(dirname(metadataPath), "README.md");
    const datasetReadme = await readFile(datasetReadmePath, "utf8");

    assert.equal(
      metadata.synthetic_only,
      true,
      `${metadata.dataset_id} ${metadata.version} must declare synthetic_only true.`,
    );
    assert.match(
      datasetReadme,
      /synthetic/iu,
      `${metadata.dataset_id} ${metadata.version} README must state the synthetic boundary.`,
    );
    assert.match(
      datasetReadme,
      /not derived from real bank data|do not use real/iu,
      `${metadata.dataset_id} ${metadata.version} README must reject real banking data.`,
    );
  }
}

async function assertRegulatoryContextLinks(
  manifests: readonly ChallengeManifest[],
): Promise<void> {
  const referencesByTag = new Map(
    regulatoryContextReferences.map(
      (reference) => [reference.tag, reference] as const,
    ),
  );

  for (const challenge of manifests) {
    for (const tag of challenge.regulatory_context) {
      const reference = referencesByTag.get(tag);

      assert.ok(
        reference !== undefined,
        `${challenge.id} has no regulation link for ${tag}.`,
      );
      const localPath = join(repoRoot, reference.href.replace(/^#\//u, ""));
      const source = await readFile(localPath, "utf8");

      assert.match(
        source,
        disclaimerPattern,
        `${reference.href} must include a disclaimer.`,
      );
    }
  }
}

function assertChallengeContentBoundaries(
  manifests: readonly ChallengeManifest[],
  factRegister: FactRegister,
): void {
  for (const challenge of manifests) {
    assertRequiredTools(challenge.required_tools, challenge.id);
    assert.match(
      JSON.stringify(challenge),
      /synthetic/iu,
      `${challenge.id} must state the synthetic-data boundary.`,
    );

    if (challenge.mode === "cloud-evidence") {
      assert.match(
        JSON.stringify(challenge),
        /credentials? must not be collected|no .*credentials/iu,
        `${challenge.id} must state that credentials are not collected.`,
      );
    }

    if (!challenge.id.endsWith("-draft")) {
      assert.ok(
        challenge.lesson_steps !== undefined &&
          challenge.lesson_steps.length >= 3,
        `${challenge.id} must include at least three step-by-step lesson steps.`,
      );
    }

    for (const step of challenge.lesson_steps ?? []) {
      assertKnownSourceFacts(
        step.source_facts,
        factRegister,
        `${challenge.id}:${step.id}`,
      );
      assert.match(
        `${step.instruction} ${step.expected_result} ${step.failure_mode}`,
        /open|run|query|select|paste|check|inspect|confirm|create|compare|filter|record|write|define|list|mark|remove|add|review|note|return|build/iu,
        `${challenge.id}:${step.id} must describe an executable learner action.`,
      );
    }

    for (const question of challenge.questions) {
      assertKnownSourceFacts(
        question.source_facts,
        factRegister,
        `${challenge.id}:${question.id}`,
      );
      assert.match(
        question.explanation ?? "",
        /FACT-[A-Z0-9]+(?:-[A-Z0-9]+)*/u,
        `${challenge.id}:${question.id} explanation must name a source fact ID.`,
      );
    }
  }
}

function assertMarkdownBoundaryLanguage(
  markdownFiles: readonly MarkdownFile[],
  factRegister: FactRegister,
): void {
  for (const markdownFile of markdownFiles) {
    if (markdownFile.path.includes(`${repoRoot}/regulations/`)) {
      assert.match(
        markdownFile.source,
        disclaimerPattern,
        `${markdownFile.path} must include the regulatory disclaimer.`,
      );
    }

    if (markdownFile.path.includes(`${repoRoot}/tutorials/`)) {
      assert.match(
        markdownFile.source,
        /synthetic/iu,
        `${markdownFile.path} must state the synthetic-data boundary.`,
      );

      const fileName = markdownFile.path.split("/").at(-1);

      if (fileName !== undefined && releasedTutorialFiles.has(fileName)) {
        for (const requiredHeading of [
          "## Source Facts",
          "## Steps",
          "## Checkpoints",
          "## Common Failure Modes",
        ]) {
          assert.ok(
            markdownFile.source.includes(requiredHeading),
            `${markdownFile.path} must include ${requiredHeading}.`,
          );
        }

        const factIds = Array.from(
          markdownFile.source.matchAll(sourceFactIdPattern),
          (match) => match[1],
        ).filter((factId): factId is string => factId !== undefined);

        assert.ok(
          factIds.length > 0,
          `${markdownFile.path} must cite source fact IDs.`,
        );

        for (const factId of factIds) {
          assert.ok(
            factRegister.has(factId),
            `${markdownFile.path} references unknown source fact ${factId}.`,
          );
        }
      }
    }
  }
}

const factRegister = await readFactRegister();
const manifests = await readChallengeManifests();
const markdownFiles = await readMarkdownFiles();

assertChallengeContentBoundaries(manifests, factRegister);
await assertRegulatoryContextLinks(manifests);
assertMarkdownBoundaryLanguage(markdownFiles, factRegister);
await assertDatasetBoundaries();
await assertMarkdownLinksResolve(markdownFiles);
