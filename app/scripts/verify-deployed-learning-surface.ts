import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import type { BrowserContext, Page } from "@playwright/test";

type ViewportSpec = {
  readonly label: string;
  readonly width: number;
  readonly height: number;
};

type RouteCheck = {
  readonly route: string;
  readonly expectedText: string;
};

type BrowserDiagnostic = {
  readonly kind: "console-error" | "pageerror" | "requestfailed";
  readonly message: string;
  readonly url: string;
};

const defaultBaseUrl = "https://e6qu.github.io/looker-bi-gym/";
const rawBaseUrl = process.env["DEPLOYED_BASE_URL"] ?? defaultBaseUrl;
const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
const allowedHost = new URL(baseUrl).hostname;

const viewports: readonly ViewportSpec[] = [
  { label: "mobile", width: 390, height: 844 },
  { label: "desktop", width: 1366, height: 900 },
];

const routeChecks: readonly RouteCheck[] = [
  { route: "/#/home", expectedText: "Looker BI Gym" },
  {
    route: "/#/tutorials/learner-tasks/lt-dq-006-ratio-null-contract.md",
    expectedText: "LT-DQ-006 - Define A Ratio Null Contract",
  },
  { route: "/#/flashcards", expectedText: "Flashcards" },
  { route: "/#/quiz", expectedText: "BI Foundations Mixed Quiz" },
  { route: "/#/exam", expectedText: "Ratio Null Contract Review" },
  {
    route: "/#/facts/fact-bigquery-safe-divide-ratio-guard",
    expectedText: "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
  },
  {
    route: "/#/workbench/deposits-seed/v0.1.0",
    expectedText: "Browser SQL Workbench",
  },
  { route: "/#/challenges", expectedText: "Challenges" },
  { route: "/#/settings", expectedText: "Settings" },
];

function fullUrl(route: string): string {
  return `${baseUrl}${route}`;
}

function collectDiagnostics(page: Page): BrowserDiagnostic[] {
  const diagnostics: BrowserDiagnostic[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }

    diagnostics.push({
      kind: "console-error",
      message: message.text(),
      url: message.location().url,
    });
  });

  page.on("pageerror", (error) => {
    diagnostics.push({
      kind: "pageerror",
      message: error.message,
      url: page.url(),
    });
  });

  page.on("requestfailed", (request) => {
    diagnostics.push({
      kind: "requestfailed",
      message: `${request.method()} ${request.resourceType()} ${request.failure()?.errorText ?? "unknown failure"}`,
      url: request.url(),
    });
  });

  return diagnostics;
}

async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  assert.ok(
    overflow.scrollWidth <= overflow.clientWidth + 1,
    `Expected no horizontal overflow, got scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}.`,
  );
}

async function assertVisibleText(
  page: Page,
  text: string,
  context: string,
): Promise<void> {
  const locator = page.getByText(text, { exact: false }).first();

  await locator.waitFor({ state: "visible", timeout: 15_000 });
  assert.ok(await locator.isVisible(), `${context} should show ${text}.`);
}

async function assertNoVisibleText(
  page: Page,
  text: string,
  context: string,
): Promise<void> {
  const locator = page.getByText(text, { exact: false });
  const count = await locator.count();

  for (let index = 0; index < count; index += 1) {
    assert.equal(
      await locator.nth(index).isVisible(),
      false,
      `${context} should not visibly show ${text}.`,
    );
  }
}

async function assertRouteSurface(
  context: BrowserContext,
  viewport: ViewportSpec,
  routeCheck: RouteCheck,
): Promise<readonly BrowserDiagnostic[]> {
  const page = await context.newPage();
  const diagnostics = collectDiagnostics(page);

  await page.goto(fullUrl(routeCheck.route), { waitUntil: "networkidle" });
  await page.getByRole("main").waitFor({ state: "visible", timeout: 15_000 });
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .waitFor({ state: "visible", timeout: 15_000 });
  await assertVisibleText(
    page,
    routeCheck.expectedText,
    `${viewport.label} ${routeCheck.route}`,
  );
  await assertNoHorizontalOverflow(page);
  await page.close();

  return diagnostics;
}

async function assertWorkbenchRun(
  context: BrowserContext,
): Promise<readonly BrowserDiagnostic[]> {
  const page = await context.newPage();
  const diagnostics = collectDiagnostics(page);

  await page.goto(fullUrl("/#/workbench/deposits-seed/v0.1.0"), {
    waitUntil: "networkidle",
  });
  await page.getByLabel("SQL query").fill(`SELECT
  COUNT(*) AS row_count,
  CAST(MAX(business_date) AS VARCHAR) AS latest_balance_date
FROM account_daily_balances;`);
  await page.getByRole("button", { name: "Run Query" }).click();
  await page
    .getByRole("table", { name: "SQL query result" })
    .waitFor({ state: "visible", timeout: 20_000 });
  await assertVisibleText(page, "18", "workbench SQL result");
  await assertVisibleText(page, "2026-03-31", "workbench SQL result");
  await page.close();

  return diagnostics;
}

async function assertFlashcardSearch(
  context: BrowserContext,
): Promise<readonly BrowserDiagnostic[]> {
  const page = await context.newPage();
  const diagnostics = collectDiagnostics(page);

  await page.goto(fullUrl("/#/flashcards"), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Metric Contracts/iu }).click();
  await page.getByLabel("Search flashcards").fill("zero denominator");
  await assertVisibleText(
    page,
    "What must a ratio metric contract say about zero denominators?",
    "flashcard search",
  );
  await page.close();

  return diagnostics;
}

async function assertQuizAndExamAssessmentBoundary(
  context: BrowserContext,
): Promise<readonly BrowserDiagnostic[]> {
  const page = await context.newPage();
  const diagnostics = collectDiagnostics(page);

  await page.goto(fullUrl("/#/quiz"), { waitUntil: "networkidle" });
  await assertVisibleText(page, "A branch dashboard scorecard", "quiz surface");
  await assertNoVisibleText(
    page,
    "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
    "quiz source fact metadata",
  );
  await assertNoVisibleText(
    page,
    "Recommended learner tasks",
    "quiz recommended task metadata",
  );

  await page.goto(fullUrl("/#/exam"), { waitUntil: "networkidle" });
  await assertVisibleText(page, "Ratio Null Contract Review", "exam surface");
  await assertVisibleText(
    page,
    "zero-denominator behavior is documented",
    "exam expected outputs",
  );
  await assertNoVisibleText(
    page,
    "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
    "exam source fact metadata",
  );
  await assertNoVisibleText(
    page,
    "Recommended learner tasks",
    "exam recommended task metadata",
  );
  await page.close();

  return diagnostics;
}

function assertNoUnexpectedDiagnostics(
  diagnostics: readonly BrowserDiagnostic[],
): void {
  const unexpected = diagnostics.filter((diagnostic) => {
    if (diagnostic.kind === "requestfailed") {
      const url = new URL(diagnostic.url);

      return url.hostname !== allowedHost;
    }

    return true;
  });

  assert.deepEqual(
    unexpected,
    [],
    `Unexpected deployed-surface browser diagnostics:\n${unexpected
      .map(
        (diagnostic) =>
          `${diagnostic.kind}: ${diagnostic.message} (${diagnostic.url})`,
      )
      .join("\n")}`,
  );
}

const browser = await chromium.launch();
const diagnostics: BrowserDiagnostic[] = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
    });

    try {
      for (const routeCheck of routeChecks) {
        diagnostics.push(
          ...(await assertRouteSurface(context, viewport, routeCheck)),
        );
      }

      if (viewport.label === "desktop") {
        diagnostics.push(...(await assertWorkbenchRun(context)));
        diagnostics.push(...(await assertFlashcardSearch(context)));
        diagnostics.push(
          ...(await assertQuizAndExamAssessmentBoundary(context)),
        );
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

assertNoUnexpectedDiagnostics(diagnostics);
process.stdout.write(
  `Verified deployed learning surface at ${baseUrl}: ${routeChecks.length} routes across ${viewports.length} viewports plus representative workbench, flashcard, quiz, and exam flows.\n`,
);
