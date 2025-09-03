import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../setup/browserSetup";
import { LoginPage } from "../../page-objects/login-page.pom";
import { InventoryPage } from "../../page-objects/inventory-page.pom";

let inventoryPage: InventoryPage;

Given("I am on the product catalog page", async () => {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.goto()
});
When("I click the 'Add to cart' button for a chosen item", async () => {
  // Within that item's container, find and click the "Add to cart" button
  inventoryPage = new InventoryPage(page);
  //await inventoryPage.onesieItem.locator(inventoryPage.addToCartButton).click();
  await inventoryPage.addRandomItemToCart()
});
Then(
  "the item should be added to my shopping cart, indicated by the shopping cart icon showing a '1'",
  async () => {
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");

  }
);
