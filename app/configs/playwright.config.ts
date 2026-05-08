import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  testDir: join(appRoot, "tests"),
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "bun run build && bun run preview",
    url: "http://127.0.0.1:4173",
    reuseExistingServer:
      process.env["CI"] === undefined || process.env["CI"].length === 0,
    timeout: 120_000,
  },
});
