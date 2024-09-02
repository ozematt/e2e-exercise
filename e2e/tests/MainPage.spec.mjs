import { test, expect } from "@playwright/test";

test.describe("Main page element displayed", () => {
  test("Sing In and Sing Up element r visible @login", async ({ page }) => {
    await page.goto("/");

    const feedButton = page.getByRole("button", { name: "Your Feed" });
    await expect(feedButton).not.toBeVisible();

    const singIn = page.locator("a[href='/register']");
    const singUp = page.locator("a[href='/login']");
    await expect(singUp).toBeVisible();
    await expect(singIn).toBeVisible();
  });
});
