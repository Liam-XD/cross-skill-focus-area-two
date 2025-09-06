import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../setup/browserSetup";
import { InventoryPage } from "../../page-objects/inventory-page.pom";
import { CartPage } from "../../page-objects/cart-page.pom";
import { CheckoutPage } from "../../page-objects/checkout-page.pom";
import { baseUrl } from "../../../config/env";
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let inventoryPage: InventoryPage;

Given("I have an item in my shopping cart", async () => {
    inventoryPage = new InventoryPage(page, baseUrl);
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

Given("I am on the 'Your Cart' page", async () => {
    inventoryPage = new InventoryPage(page, baseUrl);
    await inventoryPage.goto()
    await inventoryPage.addRandomItemToCart()
    await inventoryPage.cartBadge.click();
    await expect(page).toHaveURL(/cart.html/);
})

When("I click the 'Checkout' button", async () => {
    cartPage = new CartPage(page);
    await cartPage.checkoutButton.click()
})

Then("I should be navigated to the 'Checkout: Your Information' page", async () => {
    await expect(page).toHaveURL(/checkout-step-one.html/);
});

Given("I am on the 'Checkout: Your Information' page", async () => {
    inventoryPage = new InventoryPage(page, baseUrl);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.goto();
    await inventoryPage.addRandomItemToCart();
    await inventoryPage.cartBadge.click();
    await cartPage.checkoutButton.click();
    await expect(checkoutPage.yourInformationTitle).toBeVisible();
});

When("I enter valid shipping information", async () => {
    await checkoutPage.fillInformation();
});

When("I click the 'Continue' button", async () => {
    await checkoutPage.continueButton.click();
});

Then("I should be navigated to the 'Checkout: Overview' page", async () => {
    await expect(page).toHaveURL(/checkout-step-two.html/);
});

Given("I am on the 'Checkout: Overview' page", async () => {
    inventoryPage = new InventoryPage(page, baseUrl);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.goto();
    await inventoryPage.addRandomItemToCart();
    await inventoryPage.cartBadge.click();
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation();
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two.html/);
});

When("I review the order summary", async () => {
    const firstItemName = await checkoutPage.firstCheckoutItem.innerText()
    expect(inventoryPage.lastAddedItemName).toEqual(firstItemName)
});

When("I click the 'Finish' button", async () => {
    await checkoutPage.finishButton.click();
});

Then("I should be navigated to the 'Checkout: Complete!' page", async () => {
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeTitle).toBeVisible();
});

Then("I should see a confirmation message", async () => {
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeText).toBeVisible();

});