import { Page, Locator } from "playwright";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly onesieItem: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.onesieItem = page.locator(".inventory_item", {
      hasText: "Sauce Labs Onesie",
    })
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" })
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.inventoryItems = this.page.locator('.inventory_item');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addRandomItemToCart() {
    const count = await this.inventoryItems.count();

    if (count > 0) {
      // Select a random item
      const randomIndex = Math.floor(Math.random() * count);
      const randomItem = this.inventoryItems.nth(randomIndex);

      // Add random item to the cart
      const addToCartButton = randomItem.getByRole("button", { name: "Add to cart" });
      await addToCartButton.click();
    } else {
      // Error will propogate to wherever function is called
      throw new Error('No inventory items were found on the page.');
    }
  }
}
