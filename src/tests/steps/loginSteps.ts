import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../../browserSetup";
import { LoginPage } from "../../../page-objects/login-page.pom";
import { InventoryPage } from "../../../page-objects/inventory-page.pom";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When("I enter valid credentials", async () => {
  await loginPage.usernameField.fill("standard_user");
  await loginPage.passwordField.fill("secret_sauce");
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
