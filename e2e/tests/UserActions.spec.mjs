import { test as base, expect } from "@playwright/test";
import { injectArticle } from "./pages/Article";
import { injectCommon } from "./pages/Common.mjs";

const test = base.extend({
  article: injectArticle,
  common: injectCommon,
});

test.describe("User actions on page", () => {
  test("user flow check", async ({ page, article, common }) => {
    //entered main page
    await page.goto("http://127.0.0.1:3000");

    //checking button visibility
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();

    //button click
    await page.getByRole("link", { name: "Sign up" }).click();

    //sing up form fill
    const id = Date.now();
    const email = `obi-one-${id}@coderslab.pl`;

    await common.fillInput("username", "obi-one");
    // await page.locator("input[placeholder='Your Name']").fill("obi-one");
    await common.fillInput("email", email);
    // await page.locator("input[placeholder='Email']").fill(email);
    await common.fillInput("password", "123456");
    // await page.locator("input[placeholder='Password']").fill("123456");

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
    await article.fillArticleTitle("Tytuł artykułu");
    await article.fillArticleSummary("O niczym");
    await article.fillArticleContent("Treść aktykułu...");
    await article.addTags(["#tage2e"]);
    await article.clickPublish();

    //main page return
    await page.goto("/");

    //tag visible check
    await expect(
      page.getByRole("link", { name: "#tage2e", exact: true })
    ).toBeVisible();
  });
});
