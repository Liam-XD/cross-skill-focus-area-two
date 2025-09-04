import { Page, Locator } from "playwright";

export class CartPage {
    readonly page: Page;
    readonly firstCartItem: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstCartItem = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }


}