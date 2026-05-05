import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { parse } from 'yaml';
import type { AnySchema, ErrorObject, ValidateFunction } from 'ajv';
import type { ChallengeManifest } from '../src/challengeTypes';

type ValidationTarget = {
  readonly label: string;
  readonly path: string;
  readonly shouldPass: boolean;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, '..');
const repoRoot = join(appRoot, '..');
const manifestsDir = join(repoRoot, 'challenges', 'manifests');
const fixturesDir = join(repoRoot, 'challenges', 'fixtures');
const schemaPath = join(repoRoot, 'challenges', 'schema', 'challenge-manifest.schema.json');
const generatedCatalogPath = join(appRoot, 'src', 'generated', 'challengeCatalog.json');

function formatError(error: ErrorObject): string {
  const instancePath = error.instancePath.length > 0 ? error.instancePath : '/';
  return `${instancePath} ${error.message ?? 'is invalid'}`;
}

function asManifest(value: unknown): ChallengeManifest {
  return value as ChallengeManifest;
}

async function readYaml(path: string): Promise<unknown> {
  const source = await readFile(path, 'utf8');
  return parse(source);
}

async function listYamlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith('.yaml') || fileName.endsWith('.yml'))
    .sort()
    .map((fileName) => join(directory, fileName));
}

function assertUniqueChallengeIds(manifests: readonly ChallengeManifest[]): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const manifest of manifests) {
    if (seen.has(manifest.id)) {
      duplicates.add(manifest.id);
    }
    seen.add(manifest.id);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate challenge IDs: ${Array.from(duplicates).sort().join(', ')}`);
  }
}

async function validateTarget(
  target: ValidationTarget,
  validate: ValidateFunction,
): Promise<ChallengeManifest | undefined> {
  const parsed = await readYaml(target.path);
  const isValid = validate(parsed);

  if (target.shouldPass && !isValid) {
    const errors = validate.errors?.map(formatError).join('\n') ?? 'unknown validation error';
    throw new Error(`${target.label} should be valid but failed:\n${errors}`);
  }

  if (!target.shouldPass && isValid) {
    throw new Error(`${target.label} should be invalid but passed validation.`);
  }

  if (!target.shouldPass) {
    return undefined;
  }

  return asManifest(parsed);
}

async function main(): Promise<void> {
  const schemaSource = await readFile(schemaPath, 'utf8');
  const schema = JSON.parse(schemaSource) as AnySchema;
  const ajv = new Ajv2020({ allErrors: true, allowUnionTypes: true, strict: true });
  const validate = ajv.compile(schema);
  const manifestPaths = await listYamlFiles(manifestsDir);
  const invalidFixturePath = join(fixturesDir, 'invalid-manifest.yaml');
  const targets: readonly ValidationTarget[] = [
    ...manifestPaths.map((path) => ({
      label: relative(repoRoot, path),
      path,
      shouldPass: true,
    })),
    {
      label: relative(repoRoot, invalidFixturePath),
      path: invalidFixturePath,
      shouldPass: false,
    },
  ];

  const results = await Promise.all(targets.map((target) => validateTarget(target, validate)));
  const manifests = results
    .filter((manifest): manifest is ChallengeManifest => manifest !== undefined)
    .sort((left, right) => left.id.localeCompare(right.id));

  assertUniqueChallengeIds(manifests);

  await mkdir(dirname(generatedCatalogPath), { recursive: true });
  await writeFile(generatedCatalogPath, `${JSON.stringify(manifests, null, 2)}\n`, 'utf8');
}

await main();
