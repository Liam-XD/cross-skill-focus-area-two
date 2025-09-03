import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../setup/browserSetup";
import { InventoryPage } from "../../page-objects/inventory-page.pom";
import { CartPage } from "../../page-objects/cart-page.pom";

let inventoryPage: InventoryPage;
let cartPage: CartPage;

Given("I have an item in my shopping cart", async () => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto()
    await inventoryPage.addRandomItemToCart()
    await expect(inventoryPage.cartBadge).toHaveText("1");
})

When("I click the shopping cart icon", async () => {
    await inventoryPage.cartBadge.click();
})

Then("I should be navigated to the 'Your Cart' page", async () => {
    await expect(page).toHaveURL(/cart.html/);
})

Then("I should see the selected item listed in my cart", async () => {
    cartPage = new CartPage(page);
    const firstItemName = await cartPage.firstCartItem.innerText()
    expect(inventoryPage.lastAddedItemName).toEqual(firstItemName)
})
