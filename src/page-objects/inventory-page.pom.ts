import { Page, Locator } from "playwright";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly onesieItem: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly addToCartButtons: Locator;
  lastAddedItemName: string | null = null;
  lastAddedItemPrice: string | null = null;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.onesieItem = page.locator(".inventory_item", {
      hasText: "Sauce Labs Onesie",
    });
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addRandomItemToCart() {
    const itemCount = await this.inventoryItems.count();
    const randomIndex = Math.floor(Math.random() * itemCount);
    const randomItem = this.inventoryItems.nth(randomIndex);
    this.lastAddedItemName = await randomItem.locator(this.inventoryItemNames).innerText();
    this.lastAddedItemPrice = await randomItem.locator(this.inventoryItemPrices).innerText();
    await randomItem.locator(this.addToCartButtons).click();
  }
}
