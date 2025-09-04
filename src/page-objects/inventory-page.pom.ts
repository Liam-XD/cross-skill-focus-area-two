import { Page, Locator } from "playwright";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly onesieItem: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  public lastAddedItemName: string | undefined;
  public lastAddedItemPrice: number | undefined;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.onesieItem = page.locator(".inventory_item", {
      hasText: "Sauce Labs Onesie",
    });
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
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

      // Get the name of the item and passing it outside of the function
      const randomItemName = await randomItem.locator('.inventory_item_name').innerText();
      const randomItemPrice = await randomItem.locator(".inventory_item_price").innerText();
      this.lastAddedItemName = randomItemName;

      // Cleaning the price string by removing the '$' sign and converting to a number
      const itemPrice: number = parseFloat(randomItemPrice.replace(/[^\d.]/g, ''));
      this.lastAddedItemPrice = itemPrice;

      // Add random item to the cart
      const addToCartButton = randomItem.getByRole("button", { name: "Add to cart" });
      await addToCartButton.click();
    } else {
      // Error will propogate to wherever function is called
      throw new Error('No inventory items were found on the page.');
    }
  }
}
