import { test, expect } from "@playwright/test";

test.describe("Login flow", () => {
  test("Go to login page, submit form with valid data, verify redirection", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator(".nav-link[href='/login']").click();

    await page.locator("input[type='email']").fill("luke@coderslab.pl");

    await page.locator("input[type='password']").fill("secret");
    await page.getByRole("button").click();
    await expect(page.getByRole("link", { name: "luke" })).toBeVisible();
  });
});
