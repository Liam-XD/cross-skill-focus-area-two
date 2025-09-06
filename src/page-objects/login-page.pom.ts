import { Page, Locator, expect } from "@playwright/test";
import { InventoryPage } from "./inventory-page.pom";

export class LoginPage {
  readonly page: Page;
  readonly baseUrl: string;
  readonly username: string;
  readonly password: string;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page, baseUrl: string, username: string, password: string) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }



  async goto() {
    await this.page.goto(this.baseUrl);
  }

  // Reusable login function for hooks and other usage
  async login() {
    await this.usernameField.fill(this.username);
    await this.passwordField.fill(this.password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/inventory.html/);
    const inventoryPageInstance = new InventoryPage(this.page, this.baseUrl);
    await expect(inventoryPageInstance.inventoryList).toBeVisible();
  }
}
