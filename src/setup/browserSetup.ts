import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

const authFile = 'playwright/.auth/user.json';

Before(async () => {
  // Initialising browser and context
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ storageState: authFile });
  page = await context.newPage();
});

After(async () => {
  if (browser) {
    await context.close();
    await browser.close();
  }
});

// Export variables at the top level if needed elsewhere
export { page };
