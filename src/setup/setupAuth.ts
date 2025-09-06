import { chromium } from "@playwright/test";
import { LoginPage } from "../page-objects/login-page.pom";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

let loginPage: LoginPage;
dotenv.config({ path: path.resolve(__dirname, "../../config/.env") });

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
    throw new Error("BASE_URL is not set in the .env file. Please check your config/.env file.");
}

if (!username || !password) {
    throw new Error("Username or password is not set in the .env file. Please check your config/.env file.");
}

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page, baseUrl as string, username, password);

    await loginPage.goto();
    await loginPage.login();

    // Save authentication state
    const storageState = await context.storageState();
    fs.mkdirSync(path.resolve(__dirname, "../../playwright/.auth"), { recursive: true });
    fs.writeFileSync(
        path.resolve(__dirname, "../../playwright/.auth/user.json"),
        JSON.stringify(storageState, null, 2)
    );

    await browser.close();
})();
