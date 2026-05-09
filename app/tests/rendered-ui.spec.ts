import { expect, test } from "@playwright/test";
import { browserProgressStorageKeys } from "../src/progress";
import type { Locator, Page } from "@playwright/test";

const responsiveRoutes = [
  "/#/home",
  "/#/docs/README.md",
  "/#/challenges",
  "/#/challenges/first-banking-dataset",
  "/#/challenges/looker-studio-evidence",
  "/#/settings",
] as const;

const viewports = [
  { width: 390, height: 844, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1366, height: 900, label: "desktop" },
] as const;

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

  test("primary routes are rendered, responsive, and free of control overflow", async ({
    page,
  }) => {
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      for (const route of responsiveRoutes) {
        await page.goto(route);
        await expect(page.getByRole("main")).toBeVisible();
        await expect(
          page.getByRole("navigation", { name: "Primary navigation" }),
        ).toBeVisible();
        await expectNoHorizontalOverflow(page);
        await expectTextFitsControls(page);
      }
    }
  });

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

  test("browser SQL challenge loads DuckDB-WASM and renders query results", async ({
    page,
  }) => {
    await page.goto("/#/challenges/first-banking-dataset");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "010 - First Banking Dataset Inspection",
      }),
    ).toBeVisible();
    await expect(page.getByLabel("SQL query")).toBeVisible();
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
      page.getByRole("button", { name: "Reset Progress" }),
    ).toBeVisible();
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
});
