import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../browserSetup";

Given("I am on the login page", async () => {
  await page.goto("https://www.saucedemo.com/");
});

When("I enter valid credentials in the respective fields", async () => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
});

When("I click the 'Login' button", async () => {
  await page.locator('[data-test="login-button"]').click();
});

Then("I should be redirected to the product catalogue page", async () => {
  await expect(page).toHaveURL(/inventory.html/);
});

Then("I should see the product listings", async () => {
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
});

//  And I click the 'Login' button
// Then I should be redirected to the product catalogue page
// And I should see the product listings
