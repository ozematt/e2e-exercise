import { test, expect } from "@playwright/test";

test.describe("Main page element displayed", () => {
  test("Sing In and Sing Up element r visible", async ({ page }) => {
    await page.goto("/");

    const feedButton = page.getByRole("button", { name: "Your Feed" });
    await expect(feedButton).not.toBeVisible();

    const singIn = page.locator("a[href='/register']");
    const singUp = page.locator("a[href='/login']");
    await expect(singUp).toBeVisible();
    await expect(singIn).toBeVisible();
  });
  test("checking log in", async ({ page }) => {
    await page.goto("/");

    await page.locator(".nav-link[href='/login']").click();
    await page.locator("input[type='email']").fill("luke@coderslab.pl");
    await page.locator("input[type='password']").fill("secret");
    await page.locator("button[type='submit']").click();

    const feedButton = page.getByRole("button", { name: "Your Feed" });
    await expect(feedButton).toBeVisible();
  });
});
