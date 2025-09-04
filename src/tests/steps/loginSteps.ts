import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../setup/browserSetup";
import { LoginPage } from "../../page-objects/login-page.pom";
import { InventoryPage } from "../../page-objects/inventory-page.pom";
import dotenv from "dotenv";
dotenv.config({ path: 'config/.env' });

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
const authFile = 'playwright/.auth/user.json';
const USERNAME = process.env.USERNAME || "";
const PASSWORD = process.env.PASSWORD || "";

Given("I am on the login page", async function () {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When("I enter valid credentials", async () => {
  await loginPage.usernameField.fill(USERNAME);
  await loginPage.passwordField.fill(PASSWORD);
});

When("I click the 'Login' button", async () => {
  await loginPage.loginButton.click();
});

Then("I should be redirected to the product catalogue page", async () => {
  await expect(page).toHaveURL(/inventory.html/);
});

Then("I should see the product listings", async () => {
  inventoryPage = new InventoryPage(page);
  await expect(inventoryPage.inventoryList).toBeVisible();
});
