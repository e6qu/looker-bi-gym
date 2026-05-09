import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildFactDatabase } from "./fact-database";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");

await buildFactDatabase({
  repoRoot,
  outputPath: join(appRoot, "src", "generated", "facts.sqlite"),
});
