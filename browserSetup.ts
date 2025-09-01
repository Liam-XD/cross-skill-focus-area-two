import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { LoginPage } from "./page-objects/login-page.pom";
import { InventoryPage } from "./page-objects/inventory-page.pom";

let page: Page;
let browser: Browser;

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});

// Export variables at the top level if needed elsewhere
export { page, loginPage, inventoryPage };
