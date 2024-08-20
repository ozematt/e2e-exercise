import { test, expect } from "@playwright/test";

test.describe("User actions on page", () => {
  test("user flow check", async ({ page }) => {
    //entered main page
    await page.goto("/");

    //checking button visibility
    const singUp = page.locator("a[href='/register']");
    await expect(singUp).toBeVisible();

    //button click
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

    await page.locator("button[type='submit']").click();

    await page.locator("a[href='/editor']").click();
    await page.locator("input[name='title']").fill("Tytuł artykułu");
    await page.locator("input[name='description']").fill("O niczym");
    await page.locator("textarea[name='body']").fill("Treść aktykułu...");
    await page.locator("input[placeholder='Enter tags']").fill("#tage2e");
  });
});
