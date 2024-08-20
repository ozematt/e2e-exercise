import { test, expect } from "@playwright/test";

test.describe("User actions on page", () => {
  test("user flow check", async ({ page }) => {
    await page.goto("/");

    const singUp = page.locator("a[href='/register']");
    await expect(singUp).toBeVisible();
    await singUp.click();

    await page.locator("input[placeholder='Your Name']").fill("obi-one");
    await page
      .locator("input[placeholder='Email']")
      .fill("obi-one@coderslab.pl");

    await page.locator("input[placeholder='Password']").fill("123456");

    await expect(page.locator("input[placeholder='Your Name']")).toHaveValue(
      "obi-one"
    );
    await expect(page.locator("input[placeholder='Email']")).toHaveValue(
      "obi-one@coderslab.pl"
    );
    await expect(page.locator("input[placeholder='Password']")).toHaveValue(
      "123456"
    );
  });
});
