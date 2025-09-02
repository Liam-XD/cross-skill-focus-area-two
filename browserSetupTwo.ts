import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { LoginPage } from "./page-objects/login-page.pom";

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
});

After(async () => {
  if (browser) {
    await context.close();
    await browser.close();
  }
});

// Export variables at the top level if needed elsewhere
export { page };
