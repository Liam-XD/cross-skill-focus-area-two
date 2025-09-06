import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

export const baseUrl = process.env.BASE_URL || "";
export const username = process.env.USERNAME || "";
export const password = process.env.PASSWORD || "";
export const headless = process.env.HEADLESS === "true"; //true means no ui and false means the browser window will be shown

if (!baseUrl) {
    throw new Error("BASE_URL is not set in the .env file. Please check your config/.env file.");
}
if (!username || !password) {
    throw new Error("USERNAME or PASSWORD is not set in the .env file. Please check your config/.env file.");
}