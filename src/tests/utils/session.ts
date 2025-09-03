import { test as base } from '@playwright/test';
import fs from 'fs';

const session = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));

export const test = base.extend({
    context: async ({ browser }, use) => {
        const context = await browser.newContext();
        await context.addCookies(session.cookies);

        // Set localStorage for each origin
        for (const originData of session.origins) {
            await context.addInitScript((data) => {
                for (const { name, value } of data.localStorage) {
                    window.localStorage.setItem(name, value);
                }
            }, originData);
        }

        await use(context);
        await context.close();
    }
});