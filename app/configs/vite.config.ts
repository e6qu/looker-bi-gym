import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function getBuildBase(): string {
  const githubPagesBase = process.env["GITHUB_PAGES_BASE"];

  if (githubPagesBase !== undefined && githubPagesBase.length > 0) {
    return githubPagesBase;
  }

  return "./";
}

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : getBuildBase(),
  plugins: [react()],
  root: appRoot,
  build: {
    chunkSizeWarningLimit: 1024,
    outDir: "dist",
    sourcemap: true,
  },
}));
