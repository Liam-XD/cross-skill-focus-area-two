import { Page, Locator } from "playwright";

export class CartPage {
    readonly page: Page;
    readonly firstCartItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstCartItem = page.locator('.cart_item .inventory_item_name');
    }
}