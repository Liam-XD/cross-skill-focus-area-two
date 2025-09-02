import { Page, Locator, expect } from "@playwright/test";
import { InventoryPage } from "./inventory-page.pom";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  // Reusable login function for hooks and other usage
  async login() {
    await this.usernameField.fill("standard_user");
    await this.passwordField.fill("secret_sauce");
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/inventory.html/);
    const inventoryPageInstance = new InventoryPage(this.page);
    await expect(inventoryPageInstance.inventoryList).toBeVisible();
  }
}
