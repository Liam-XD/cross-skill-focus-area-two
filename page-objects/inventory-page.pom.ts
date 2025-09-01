import { Page, Locator } from "playwright";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
  }
}
