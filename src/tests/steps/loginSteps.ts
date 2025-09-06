import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../setup/browserSetup";
import { LoginPage } from "../../page-objects/login-page.pom";
import { InventoryPage } from "../../page-objects/inventory-page.pom";
import { baseUrl, username, password } from "../../../config/env";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(page, baseUrl, username, password);
  await loginPage.goto();
});

When("I enter valid credentials", async () => {
  await loginPage.usernameField.fill(username);
  await loginPage.passwordField.fill(password);
});

When("I click the 'Login' button", async () => {
  await loginPage.loginButton.click();
});

Then("I should be redirected to the product catalogue page", async () => {
  await expect(page).toHaveURL(/inventory.html/);
});

Then("I should see the product listings", async () => {
  inventoryPage = new InventoryPage(page, baseUrl);
  await expect(inventoryPage.inventoryList).toBeVisible();
});
