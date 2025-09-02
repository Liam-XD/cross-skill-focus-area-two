import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../../browserSetup";
import { LoginPage } from "../../../page-objects/login-page.pom";
import { InventoryPage } from "../../../page-objects/inventory-page.pom";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given("I am on the product catalog page", async () => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
});
When("I click the 'Add to cart' button for a chosen item", async () => {
  const onesieItem = page.locator(".inventory_item", {
    hasText: "Sauce Labs Onesie",
  });
  // Within that item's container, find and click the "Add to cart" button
  await onesieItem.getByRole("button", { name: "Add to cart" }).click();
});
Then(
  "the item should be added to my shopping cart, indicated by the shopping cart icon showing a '1'",
  async () => {
    const cartBadge = page.locator(".shopping_cart_badge");

    // Assert that the cart badge is visible and contains the text '1'
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText("1");
  }
);

// Scenario: User adds an item to their cart
//     Given I am on the product catalog page (https://www.saucedemo.com/inventory.html)
//     When I click the "Add to cart" button for a chosen item (e.g., "Sauce Labs Backpack")
//     Then the item should be added to my shopping cart, indicated by the shopping cart icon showing a '1' (or increasing count).
