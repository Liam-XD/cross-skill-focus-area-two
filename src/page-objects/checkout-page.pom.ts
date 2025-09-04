import { Page, Locator } from "playwright";
import * as faker from 'faker';

export class CheckoutPage {
    readonly page: Page;
    readonly yourInformationTitle: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly continueButton: Locator;
    readonly summaryInfo: Locator;
    readonly finishButton: Locator;
    readonly completeTitle: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backToHomeButton: Locator;
    readonly firstCheckoutItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yourInformationTitle = page.locator('[data-test="title"]');
        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.summaryInfo = page.locator('[data-test="summary-info"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeTitle = page.locator('[data-test="title"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backToHomeButton = page.locator('[data-test="back-to-products"]');
        this.firstCheckoutItem = page.locator('.cart_item_label .inventory_item_name');
    }

    async fillInformation() {
        await this.firstNameField.fill(faker.name.firstName());
        await this.lastNameField.fill(faker.name.lastName());
        await this.postalCodeField.fill(faker.address.zipCode());
    }
}