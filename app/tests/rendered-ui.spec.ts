import { expect, test } from "@playwright/test";
import { flashcardDecks } from "../src/flashcards";
import { browserProgressStorageKeys } from "../src/progress";
import type { Locator, Page } from "@playwright/test";

const responsiveRoutes = [
  "/#/home",
  "/#/docs/README.md",
  "/#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md",
  "/#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md",
  "/#/tutorials/learner-tasks/lt-dq-006-ratio-null-contract.md",
  "/#/tutorials/quiz-bank.md",
  "/#/tutorials/exam-mode.md",
  "/#/workbench/deposits-seed/v0.1.0",
  "/#/workbench/lending-month-end/v0.1.0",
  "/#/quiz",
  "/#/exam",
  "/#/facts",
  "/#/flashcards",
  "/#/facts/fact-deposits-fanout-control-totals",
  "/#/challenges",
  "/#/challenges/first-banking-dataset",
  "/#/challenges/deposit-metric-contract",
  "/#/challenges/looker-studio-evidence",
  "/#/settings",
] as const;

const tutorialContentRoutes = [
  "/#/tutorials/00-orientation-and-stack.md",
  "/#/tutorials/01-connect-public-data.md",
  "/#/tutorials/02-build-a-bi-friendly-model.md",
  "/#/tutorials/03-first-executive-dashboard.md",
  "/#/tutorials/04-metrics-and-calculated-fields.md",
  "/#/tutorials/05-blending-vs-upstream-joins.md",
  "/#/tutorials/06-performance-and-cost-lab.md",
  "/#/tutorials/07-governance-security-and-sharing.md",
  "/#/tutorials/08-observability-and-operations.md",
  "/#/tutorials/09-technical-bi-capstone.md",
  "/#/tutorials/README.md",
  "/#/tutorials/curriculum.md",
  "/#/tutorials/data-sources.md",
  "/#/tutorials/exam-mode.md",
  "/#/tutorials/learner-tasks/README.md",
  "/#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md",
  "/#/tutorials/learner-tasks/lt-bi-002-detect-fanout.md",
  "/#/tutorials/learner-tasks/lt-dq-005-reconcile-dashboard-controls.md",
  "/#/tutorials/learner-tasks/lt-dq-006-ratio-null-contract.md",
  "/#/tutorials/learner-tasks/lt-looker-004-report-ready-data-source.md",
  "/#/tutorials/learner-tasks/lt-looker-007-control-parameter-handoff.md",
  "/#/tutorials/learner-tasks/lt-sql-003-month-end-serving-result.md",
  "/#/tutorials/quiz-bank.md",
  "/#/tutorials/recipes/r-looker-001-deposits-dashboard.md",
] as const;

const viewports = [
  { width: 390, height: 844, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1366, height: 900, label: "desktop" },
] as const;

type BrowserDiagnostic = {
  readonly kind: "console" | "pageerror" | "requestfailed";
  readonly message: string;
  readonly url: string;
};

const diagnosticsByPage = new WeakMap<Page, BrowserDiagnostic[]>();
const expectedFlashcardDeckCount = flashcardDecks.length;
const expectedFlashcardCardCount = flashcardDecks.reduce(
  (count, deck) => count + deck.cards.length,
  0,
);

function collectBrowserDiagnostics(page: Page): BrowserDiagnostic[] {
  const diagnostics: BrowserDiagnostic[] = [];

  page.on("console", (message) => {
    const messageType = message.type();

    if (messageType !== "error" && messageType !== "warning") {
      return;
    }

    diagnostics.push({
      kind: "console",
      message: `${messageType}: ${message.text()}`,
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

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(
    overflow.scrollWidth,
    "page should not horizontally overflow",
  ).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

async function expectTextFitsControls(page: Page): Promise<void> {
  const overflowingControls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "button, .navLinks a, .heroActions a, .status, .brand, .sqlChallengeSummary span",
      ),
    )
      .filter((element) => element.offsetParent !== null)
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => element.textContent.trim()),
  );

  expect(
    overflowingControls,
    "control text should fit inside rendered controls",
  ).toEqual([]);
}

async function expectVisibleBox(
  locator: Locator,
  label: string,
): Promise<void> {
  await expect(locator, `${label} should be visible`).toBeVisible();
  const box = await locator.boundingBox();

  expect(
    box?.width ?? 0,
    `${label} should have rendered width`,
  ).toBeGreaterThan(0);
  expect(
    box?.height ?? 0,
    `${label} should have rendered height`,
  ).toBeGreaterThan(0);
}

async function expectNonBlankScreenshot(page: Page): Promise<void> {
  const screenshot = await page.screenshot({ fullPage: false });

  expect(
    screenshot.byteLength,
    "viewport screenshot should contain rendered pixels",
  ).toBeGreaterThan(20_000);
}

function collectUnexpectedNetworkRequests(page: Page): string[] {
  const unexpectedRequests: string[] = [];

  page.on("request", (request) => {
    const requestUrl = new URL(request.url());

    if (
      (requestUrl.protocol === "http:" || requestUrl.protocol === "https:") &&
      requestUrl.hostname !== "127.0.0.1" &&
      requestUrl.hostname !== "localhost"
    ) {
      unexpectedRequests.push(request.url());
    }
  });

  return unexpectedRequests;
}

test.describe("rendered UI", () => {
  test.beforeEach(({ page }) => {
    diagnosticsByPage.set(page, collectBrowserDiagnostics(page));
  });

  test.afterEach(({ page }) => {
    const diagnostics = diagnosticsByPage.get(page) ?? [];

    diagnosticsByPage.delete(page);
    expect(diagnostics, "browser console/page/request diagnostics").toEqual([]);
  });

  test("home page renders a real product UI on desktop and mobile", async ({
    page,
  }) => {
    for (const viewport of [viewports[0], viewports[2]]) {
      await page.setViewportSize(viewport);
      await page.goto("/#/home");

      await expectVisibleBox(
        page.getByRole("banner"),
        `${viewport.label} top navigation`,
      );
      await expectVisibleBox(
        page.getByRole("main"),
        `${viewport.label} main content`,
      );
      await expect(
        page.getByRole("heading", { level: 1, name: "Looker BI Gym" }),
      ).toBeVisible();
      await expect(page.getByLabel("Synthetic dataset preview")).toBeVisible();
      await expect(page.getByLabel("Platform constraints")).toContainText(
        "Synthetic banking datasets only",
      );
      await expect(page.getByRole("contentinfo")).toContainText("App v0.1.0");

      await expectNoHorizontalOverflow(page);
      await expectTextFitsControls(page);
      await expectNonBlankScreenshot(page);
    }
  });

  for (const viewport of viewports) {
    for (const route of responsiveRoutes) {
      test(`primary route ${route} is rendered and free of control overflow on ${viewport.label}`, async ({
        page,
      }) => {
        test.setTimeout(45_000);
        await page.setViewportSize(viewport);
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.getByRole("main")).toBeVisible();
        await expect(
          page.getByRole("navigation", { name: "Primary navigation" }),
        ).toBeVisible();
        await expectNoHorizontalOverflow(page);
        await expectTextFitsControls(page);
      });
    }
  }

  test("challenge catalog and detail pages expose real learner metadata", async ({
    page,
  }) => {
    await page.goto("/#/challenges");

    await expect(
      page.getByRole("heading", { level: 1, name: "Challenges" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /000 - Orientation Quiz/u }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /020 - Account Owner Fanout CTF/u }),
    ).toBeVisible();
    await expect(page.getByText("v0.1.0").first()).toBeVisible();

    await page
      .getByRole("link", { name: /020 - Account Owner Fanout CTF/u })
      .click();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "020 - Account Owner Fanout CTF",
      }),
    ).toBeVisible();
    await expect(page.getByText("Regulatory Context")).toBeVisible();
    await expect(page.getByRole("link", { name: "BNR" })).toBeVisible();
    await expect(
      page.getByText("Flag appears after required checks pass"),
    ).toBeVisible();
  });

  test("orientation tutorial keeps the verification quiz separate and linked", async ({
    page,
  }) => {
    await page.goto("/#/tutorials/00-orientation-and-stack.md", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByRole("heading", { level: 2, name: "Separate Verification" }),
    ).toBeVisible();
    await expect(page.getByRole("main")).not.toContainText(
      "Open #/challenges/orientation-quiz",
    );
    await expect(page.getByRole("main")).not.toContainText(
      "Complete the browser quiz",
    );

    const quizLink = page.getByRole("link", {
      name: "Start the separate orientation quiz",
    });

    await expect(quizLink).toHaveAttribute(
      "href",
      /#\/challenges\/orientation-quiz$/u,
    );
    await expect(
      page.locator("code").filter({ hasText: "#/challenges/orientation-quiz" }),
    ).toHaveCount(0);
  });

  for (const route of tutorialContentRoutes) {
    test(`tutorial route ${route} keeps verification and route links learner-safe`, async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("main")).toBeVisible();
      await expect(
        page.locator("main code").filter({ hasText: "#/" }),
      ).toHaveCount(0);
      await expect(page.getByRole("main")).not.toContainText(
        "No separate quiz",
      );
      await expect(page.getByRole("main")).not.toContainText(
        "hidden reference",
      );
      await expect(page.getByRole("main")).not.toContainText("fixture file");
      await expect(page.getByRole("main")).not.toContainText("repository path");
      await expect(page.getByRole("main")).not.toContainText(
        "challenge manifest",
      );
      await expect(page.getByRole("main")).not.toContainText(
        "Complete the browser quiz",
      );
    });
  }

  test("quiz, exam, and fact graph surfaces keep assessment prompts independent", async ({
    page,
  }) => {
    await page.goto("/#/quiz");

    await expect(
      page.getByRole("heading", { level: 1, name: "Quiz" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "BI Foundations Mixed Quiz",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Before summing `ledger_balance`", { exact: false }),
    ).toBeVisible();
    await page.getByLabel("One row per account and business date.").check();
    await page.getByRole("button", { name: "Check Quiz" }).click();
    await expect(page.getByText("Recommended learner tasks")).not.toBeVisible();
    await expect(page.getByText("Source evidence")).not.toBeVisible();

    await page.goto("/#/exam");

    await expect(
      page.getByRole("heading", { level: 1, name: "Exam" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Grain And Fanout Review" }),
    ).toBeVisible();
    await expect(page.getByText("fanout_delta = 69100")).toBeVisible();
    await expect(page.getByText("Recommended learner tasks")).not.toBeVisible();
    await expect(page.getByText("Source evidence")).not.toBeVisible();

    await page.goto("/#/facts/fact-deposits-fanout-control-totals");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "FACT-DEPOSITS-FANOUT-CONTROL-TOTALS",
      }),
    ).toBeVisible();
    await expect(page.getByText("164800").first()).toBeVisible();
    await expect(page.getByText("95700").first()).toBeVisible();
    await expect(page.getByText("69100").first()).toBeVisible();
  });

  test("browser SQL workbench supports self-contained tutorial queries", async ({
    page,
  }) => {
    await page.goto("/#/workbench/deposits-seed/v0.1.0");

    await expect(
      page.getByRole("heading", { level: 1, name: "Browser SQL Workbench" }),
    ).toBeVisible();
    await expect(page.getByText("deposits-seed/v0.1.0")).toBeVisible();
    await page.getByLabel("SQL query").fill(`SELECT
  COUNT(*) AS row_count,
  CAST(MAX(business_date) AS VARCHAR) AS latest_balance_date
FROM account_daily_balances;`);
    await page.getByRole("button", { name: "Run Query" }).click();
    await expect(
      page.getByRole("table", { name: "SQL query result" }),
    ).toContainText("18");
    await expect(
      page.getByRole("table", { name: "SQL query result" }),
    ).toContainText("2026-03-31");

    await page.goto("/#/workbench/lending-month-end/v0.1.0");
    await expect(page.getByText("lending-month-end/v0.1.0")).toBeVisible();
    await expect(
      page.getByRole("button", {
        exact: true,
        name: "loan_monthly_snapshots",
      }),
    ).toBeVisible();
  });

  test("flashcards support timestamped spaced repetition state", async ({
    page,
  }) => {
    await page.goto("/#/flashcards");

    await expect(
      page.getByRole("heading", { level: 1, name: "Flashcards" }),
    ).toBeVisible();
    await expect(page.getByText("BI Fundamentals")).toBeVisible();
    await expect(
      page.getByText(
        `${expectedFlashcardDeckCount} decks / ${expectedFlashcardCardCount} cards / ${expectedFlashcardCardCount} due`,
      ),
    ).toBeVisible();
    await page.getByRole("button", { name: /BigQuery And SQL/u }).click();
    await page.getByText("External flashcard source review").click();
    await expect(
      page.getByText("Brainscape Bigquery flashcards index"),
    ).toBeVisible();
    await expect(
      page.getByText("Quizlet BigQuery flashcard set"),
    ).toBeVisible();
    await page.getByRole("button", { name: /Metric Contracts/u }).click();
    await page.getByText("External flashcard source review").click();
    await expect(
      page.getByText("Brainscape Looker flashcards index"),
    ).toBeVisible();
    await page.getByLabel("Search flashcards").fill("authorized view");
    await page.getByRole("button", { name: "All Cards" }).click();
    await expect(
      page.getByText("What does an authorized BigQuery view help control"),
    ).toBeVisible();
    await page.getByLabel("Search flashcards").fill("");
    await page.getByRole("button", { name: /BI Fundamentals/u }).click();
    await page.getByRole("button", { name: "Show Answer" }).click();
    await expect(page.getByText("Declare the row grain first")).toBeVisible();
    await page.getByRole("button", { name: "good" }).click();
    await expect(
      page.getByLabel("Flashcard state export JSON preview"),
    ).toContainText("reviewedAt");
    await expect(
      page.getByLabel("Flashcard state export JSON preview"),
    ).toContainText("nextDueAt");
    const exportJson = await page
      .getByLabel("Flashcard state export JSON preview")
      .inputValue();

    await page.evaluate(() => {
      window.localStorage.removeItem("looker-bi-gym.flashcards.v1");
    });
    await page.reload();
    await page.getByLabel("Flashcard import JSON").fill(exportJson);
    await page.getByRole("button", { name: "Validate Flashcards" }).click();
    await expect(
      page.getByText("Preview ready: 1 reviewed cards"),
    ).toBeVisible();
    await page.getByRole("button", { name: "Apply Flashcards" }).click();
    await expect(
      page.getByText("Flashcard review state imported locally."),
    ).toBeVisible();
    await page.getByRole("button", { name: "Reset Flashcards" }).click();
    await expect(
      page.getByText("Flashcard review state has been reset in this browser."),
    ).toBeVisible();
    await expect(
      page.getByLabel("Flashcard state export JSON preview"),
    ).not.toContainText("reviewedAt");
  });

  test("browser SQL challenge loads DuckDB-WASM and renders query results", async ({
    page,
  }) => {
    await page.goto(
      "/#/tutorials/learner-tasks/lt-bi-001-profile-dataset-grain.md",
    );

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "LT-BI-001 - Profile Dataset Grain",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Objective: prove the row grain"),
    ).toBeVisible();

    await page.goto("/#/challenges/first-banking-dataset");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "010 - First Banking Dataset Inspection",
      }),
    ).toBeVisible();
    const sqlEditor = page.getByRole("textbox", { name: "SQL query" });
    await expect(sqlEditor).toBeVisible();
    await expect(page.getByText("Step-by-step work")).toBeVisible();

    const runButton = page.getByRole("button", { name: "Run Query" });
    await expect(runButton).toBeEnabled({ timeout: 30_000 });
    await runButton.click();

    const resultTable = page.getByRole("table", { name: "SQL query result" });
    await expect(resultTable).toBeVisible({
      timeout: 20_000,
    });
    await expect(
      resultTable.getByRole("columnheader", { name: "row_count" }),
    ).toBeVisible();
    await expect(resultTable.getByRole("cell", { name: "18" })).toBeVisible();

    await sqlEditor.fill(`SELECT
  adb.currency_code,
  CAST(SUM(adb.ledger_balance) AS DOUBLE) AS ledger_total
FROM account_daily_balances adb
WHERE adb.business_date = '2026-03-31'
GROUP BY adb.currency_code
ORDER BY adb.currency_code;`);
    await runButton.click();

    const chart = page.getByRole("img", {
      name: "Bar chart of ledger_total by currency_code",
    });
    await expect(chart).toBeVisible({ timeout: 20_000 });
    await expect(chart.getByText("EUR", { exact: true })).toBeVisible();
    await expect(chart.getByText("16400", { exact: true })).toBeVisible();
    await expect(chart.getByText("RON", { exact: true })).toBeVisible();
    await expect(chart.getByText("79300", { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("cloud evidence and settings screens render local-only controls", async ({
    page,
  }) => {
    await page.goto("/#/challenges/looker-studio-evidence");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "030 - Looker Studio Evidence Pattern",
      }),
    ).toBeVisible();
    await expect(page.getByText("Mechanically verified")).toBeVisible();
    await expect(page.getByLabel("Serving view SQL")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Credential boundary" }),
    ).toBeVisible();
    await expect(
      page.getByText("No cloud credentials or tokens."),
    ).toBeVisible();

    await page.goto("/#/settings");

    await expect(
      page.getByRole("heading", { level: 1, name: "Settings" }),
    ).toBeVisible();
    await expect(page.getByLabel("Settings")).toContainText(
      "App v0.1.0 / content v0.1.0",
    );
    await expect(page.getByLabel("Progress export JSON preview")).toContainText(
      "looker-bi-gym.progress-export.v1",
    );
    await expect(
      page.getByRole("button", { name: "Export JSON" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Validate Import" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Apply Import" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Reset Progress" }),
    ).toBeVisible();

    const importJson = JSON.stringify({
      app_version: "0.1.0",
      completed_challenge_ids: ["orientation-quiz"],
      completed_challenges: [
        {
          challenge_id: "orientation-quiz",
          challenge_version: "v0.1.0",
          completed_at: "2026-05-10T12:00:00.000Z",
          dataset_versions: [],
          flag: "flag-orientation-quiz",
          mode: "quiz",
          passed_check_ids: [],
          passed_question_ids: [
            "q_view",
            "q_data_source",
            "q_sensitive_fields",
            "q_guarantee_limit",
          ],
          title: "000 - Orientation Quiz",
        },
      ],
      content_version: "0.1.0",
      exported_at: "2026-05-10T12:30:00.000Z",
      format: "looker-bi-gym.progress-export.v1",
      privacy: {
        backend_required: false,
        created_locally: true,
        includes_credentials: false,
        includes_raw_answers: false,
        includes_real_banking_data: false,
        state_scope: "browser-only",
        storage_mediums: ["localStorage", "same-site-cookie"],
      },
      storage_version: 1,
    });

    await page.getByLabel("Progress import JSON").fill(importJson);
    await page.getByRole("button", { name: "Validate Import" }).click();
    await expect(page.getByLabel("Progress import preview")).toContainText(
      "orientation-quiz",
    );
    await page.getByRole("button", { name: "Apply Import" }).click();
    await expect(
      page.getByText("Imported progress was applied locally in this browser."),
    ).toBeVisible();

    const importedProgress = await page.evaluate(
      (key) => window.localStorage.getItem(key),
      browserProgressStorageKeys.localStorage,
    );

    expect(importedProgress).toContain("orientation-quiz");
  });

  test("learner completes orientation quiz and state survives localStorage loss through the same-site cookie", async ({
    page,
  }) => {
    const unexpectedRequests = collectUnexpectedNetworkRequests(page);

    await page.goto("/#/home");
    await page.getByRole("link", { name: "Challenges" }).click();
    await page.getByRole("link", { name: /000 - Orientation Quiz/u }).click();

    await page.getByLabel("A virtual table defined by a SQL query.").check();
    await page
      .getByLabel(
        "It connects external data to charts and provides the report field schema.",
      )
      .check();
    await page.getByLabel("account_id").check();
    await page.getByLabel("customer_id").check();
    await page.getByLabel("synthetic_iban").check();
    await page.getByLabel("Numeric answer for question 4").fill("100000");
    await page.getByRole("button", { name: "Check Answers" }).click();

    await expect(
      page.getByText("Challenge complete. Flag: flag-orientation-quiz"),
    ).toBeVisible();

    const persistedProgress = await page.evaluate(
      (key) => window.localStorage.getItem(key),
      browserProgressStorageKeys.localStorage,
    );
    const persistedCookie = await page.evaluate(() => document.cookie);

    expect(persistedProgress).toContain("orientation-quiz");
    expect(persistedCookie).toContain(browserProgressStorageKeys.cookie);

    await page.evaluate(
      (key) => window.localStorage.removeItem(key),
      browserProgressStorageKeys.localStorage,
    );
    await page.goto("/#/settings");

    await expect(page.getByLabel("Progress export JSON preview")).toContainText(
      "orientation-quiz",
    );
    await expect
      .poll(() =>
        page.evaluate(
          (key) => window.localStorage.getItem(key),
          browserProgressStorageKeys.localStorage,
        ),
      )
      .not.toBeNull();

    await page.getByRole("button", { name: "Reset Progress" }).click();
    await expect(
      page.getByText("Local progress has been reset in this browser."),
    ).toBeVisible();
    await expect(
      page.getByLabel("Progress export JSON preview"),
    ).not.toContainText("orientation-quiz");
    await expect
      .poll(() =>
        page.evaluate(
          (key) => window.localStorage.getItem(key),
          browserProgressStorageKeys.localStorage,
        ),
      )
      .toBeNull();
    await expect
      .poll(() => page.evaluate(() => document.cookie))
      .not.toContain(browserProgressStorageKeys.cookie);

    expect(unexpectedRequests).toEqual([]);
  });

  test("learner runs browser SQL challenge and earns the local flag", async ({
    page,
  }) => {
    const unexpectedRequests = collectUnexpectedNetworkRequests(page);

    await page.goto("/#/challenges");
    await page
      .getByRole("link", { name: /010 - First Banking Dataset Inspection/u })
      .click();

    const runButton = page.getByRole("button", { name: "Run Query" });
    await expect(runButton).toBeEnabled({ timeout: 30_000 });
    await runButton.click();

    const resultTable = page.getByRole("table", { name: "SQL query result" });
    await expect(resultTable).toBeVisible({ timeout: 20_000 });
    await expect(resultTable.getByRole("cell", { name: "18" })).toBeVisible();

    await page.getByLabel("One row per account per balance date.").check();
    await page.getByLabel("account_id").check();
    await page.getByLabel("customer_id").check();
    await page.getByLabel("synthetic_iban").check();
    await expect(
      page.getByText("Challenge complete. Flag: flag-first-banking-dataset"),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          (key) => window.localStorage.getItem(key),
          browserProgressStorageKeys.localStorage,
        ),
      )
      .toContain("first-banking-dataset");

    expect(unexpectedRequests).toEqual([]);
  });

  test("learner completes cloud evidence flow without backend calls or credentials", async ({
    page,
  }) => {
    const unexpectedRequests = collectUnexpectedNetworkRequests(page);

    await page.goto("/#/challenges/looker-studio-evidence");

    await page.getByLabel("Serving view SQL")
      .fill(`CREATE OR REPLACE VIEW serving_deposit_dashboard AS
SELECT business_date, currency_code, SUM(ledger_balance) AS ledger_total
FROM account_daily_balances
GROUP BY business_date, currency_code;`);
    await page
      .getByLabel("Pasted control result")
      .fill("business_date,currency_code,ledger_total\n2026-03-31,RON,95700");
    await page.getByLabel("Visible latest-day total").fill("95700");
    await page
      .getByLabel("Report URL")
      .fill("https://lookerstudio.google.com/reporting/example");
    await page.getByLabel("Dashboard confirmation").check();
    await page.getByLabel("No cloud credentials or tokens.").check();
    await page
      .getByLabel("In the shared data source or upstream serving view.")
      .check();

    await expect(
      page.getByText("Challenge complete. Flag: flag-looker-studio-evidence"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Credential boundary" }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          (key) => window.localStorage.getItem(key),
          browserProgressStorageKeys.localStorage,
        ),
      )
      .toContain("looker-studio-evidence");

    expect(unexpectedRequests).toEqual([]);
  });

  test("learner completes browser config metric contract flow locally", async ({
    page,
  }) => {
    const unexpectedRequests = collectUnexpectedNetworkRequests(page);

    await page.goto("/#/challenges/deposit-metric-contract");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "050 - Deposit Metric Contract Review",
      }),
    ).toBeVisible();
    await expect(page.getByText("Contract checkpoint")).toBeVisible();
    await page.getByLabel("Metric contract JSON").fill(`{
  "metric_id": "latest_ledger_total",
  "source_table": "account_daily_balances",
  "grain": "business_date + currency_code",
  "measure": "ledger_balance",
  "aggregation": "SUM",
  "date_role": "business_date",
  "selected_fields": ["business_date", "currency_code", "ledger_total"],
  "excluded_fields": ["account_id", "customer_id", "synthetic_iban"],
  "owner": "upstream serving SQL or reusable data-source field"
}`);
    await page
      .getByLabel("Upstream serving SQL or a reusable data-source field.")
      .check();
    await page
      .getByRole("radio", {
        name: "Declare row grain before aggregating balances.",
      })
      .check();

    await expect(
      page.getByText("Challenge complete. Flag: flag-deposit-metric-contract"),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          (key) => window.localStorage.getItem(key),
          browserProgressStorageKeys.localStorage,
        ),
      )
      .toContain("deposit-metric-contract");

    expect(unexpectedRequests).toEqual([]);
  });
});
