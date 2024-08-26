import { test as base, expect } from "@playwright/test";
import { injectLogin } from "./pages/Login.mjs";

const test = base.extend({
  login: injectLogin,
});

test.describe("Login flow", () => {
  test("Go to login page, submit form with valid data, verify redirection", async ({
    page,
    injectLogin,
  }) => {
    await page.goto("/");

    await page.locator(".nav-link[href='/login']").click();

    await page.locator("input[type='email']").fill("luke@coderslab.pl");

    await page.locator("input[type='password']").fill("secret");

    await page.locator("button[type='submit']").click();

    await expect(page.getByRole("link", { name: "luke" })).toBeVisible();
  });
});
