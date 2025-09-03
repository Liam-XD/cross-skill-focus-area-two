import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

const session = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));

Before(async () => {
  // Initialising browser and context
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();

  // Set cookies
  await context.addCookies(session.cookies);

  // Set localStorage for each origin
  for (const originData of session.origins) {
    await page.addInitScript((data) => {
      for (const { name, value } of data.localStorage) {
        window.localStorage.setItem(name, value);
      }
    }, originData);
  }



});

After(async () => {
  if (browser) {
    await context.close();
    await browser.close();
  }
});

// Export variables at the top level if needed elsewhere
export { page };
