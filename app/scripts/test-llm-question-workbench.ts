import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const outputRoot = join(repoRoot, "var", "llm-workbench");

const result = spawnSync(
  "bun",
  ["run", "scripts/llm-question-workbench.ts", "dream-prompt", "none"],
  {
    cwd: appRoot,
    encoding: "utf8",
  },
);

assert.equal(
  result.status,
  0,
  `llm-question-workbench failed:\n${result.stdout}\n${result.stderr}`,
);

const context = await readFile(join(outputRoot, "question-context.md"), "utf8");
assert.match(context, /FACT-REAL-ESTATE-COLLATERAL-GRAIN/u);
assert.match(context, /lending-month-end-snapshots/u);

const dreamEntries = await readdir(join(outputRoot, "dreams"));
assert.ok(
  dreamEntries.some((entry) => entry.includes("dream-none")),
  "Expected a no-provider dream artifact.",
);
