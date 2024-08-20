import { test, expect } from "@playwright/test";

test.describe("Main page element displayed", () => {
  test("Sing In and Sing Up element r visible", async ({ page }) => {
    await page.goto("/");

    const feedButton = page.getByRole("button", { name: "Your Feed" });

    await expect(feedButton).not.toBeVisible();
  });
});
