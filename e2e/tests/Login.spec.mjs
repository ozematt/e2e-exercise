import { test as base, expect } from "@playwright/test";
import { injectLogin } from "./pages/Login.mjs";

const test = base.extend({
  login: injectLogin,
});

test.describe("Login flow", () => {
  test("Go to login page, submit form with valid data, verify redirection @login", async ({
    page,
    login,
  }) => {
    await page.goto("/");

    await page.locator(".nav-link[href='/login']").click();
    await login.fillLoginInput("email", "luke@coderslab.pl");
    await login.fillLoginInput("password", "secret");
    await login.click("submit");

    await expect(page.getByRole("link", { name: "luke" })).toBeVisible();
  });
});
