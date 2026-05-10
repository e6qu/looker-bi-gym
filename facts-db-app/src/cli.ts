import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildFactDatabase } from "./fact-database";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(scriptDir, "..");
const repoRoot = join(packageRoot, "..");
const outputPath =
  process.argv[2] ?? join(repoRoot, "app", "src", "generated", "facts.sqlite");

await buildFactDatabase({
  repoRoot,
  outputPath,
});
