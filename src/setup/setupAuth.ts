import { chromium } from "@playwright/test";
import { LoginPage } from "../page-objects/login-page.pom";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

let loginPage: LoginPage;
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to login page
    loginPage = new LoginPage(page);
    await loginPage.goto()
    await loginPage.login()

    // Save authentication state
    const storageState = await context.storageState();
    fs.mkdirSync(path.resolve(__dirname, "../playwright/.auth"), { recursive: true });
    fs.writeFileSync(
        path.resolve(__dirname, "../playwright/.auth/user.json"),
        JSON.stringify(storageState, null, 2)
    );

    await browser.close();
})();
