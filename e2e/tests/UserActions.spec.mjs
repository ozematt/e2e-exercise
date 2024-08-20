import { test, expect } from "@playwright/test";

test.describe("User actions on page", () => {
  test("user flow check", async ({ page }) => {
    await page.goto("/");
  });
});
