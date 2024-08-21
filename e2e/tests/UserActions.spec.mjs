import { test, expect } from "@playwright/test";
import { Article } from "../../src/pages/Article";

test.describe("User actions on page", () => {
  test("user flow check", async ({ page }) => {
    const article = new Article(page);
    //entered main page
    await page.goto("/");

    //checking button visibility
    const singUp = page.locator("a[href='/register']");
    await expect(singUp).toBeVisible();

    //button click
    await singUp.click();

    //sing up form fill
    const id = Date.now();
    const email = `obi-one-${id}@coderslab.pl`;

    await page.locator("input[placeholder='Your Name']").fill("obi-one");
    await page.locator("input[placeholder='Email']").fill(email);
    await page.locator("input[placeholder='Password']").fill("123456");

    //values check
    await expect(page.locator("input[placeholder='Your Name']")).toHaveValue(
      "obi-one"
    );
    await expect(page.locator("input[placeholder='Email']")).toHaveValue(email);
    await expect(page.locator("input[placeholder='Password']")).toHaveValue(
      "123456"
    );

    //submit sing up form
    await page.getByRole("button", { name: "Sign up" }).click();

    //new post button click
    await page.getByRole("link", { name: "New Post" }).click();

    //new post form fill
    await page.locator("input[name='title']").fill("Tytuł artykułu");
    await page.locator("input[name='description']").fill("O niczym");
    await page.locator("textarea[name='body']").fill("Treść aktykułu...");
    await page.locator("input[placeholder='Enter tags']").fill("#tage2e");
    await page.locator("input[placeholder='Enter tags']").press("Enter");
    await page.locator("button[type='submit']").click();

    //main page return
    await page.goto("/");

    //tag visible check
    await expect(
      page.getByRole("link", { name: "#tage2e", exact: true })
    ).toBeVisible();
  });
});
