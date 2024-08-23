import { test as base, expect } from "@playwright/test";
import { injectNewPost } from "./pages/NewPost.mjs";

const test = base.extend({
  newPost: injectNewPost,
});

test.describe("new post", () => {
  test("Go to the post creation page", async ({ page, newPost }) => {
    await page.goto("/");

    await expect(
      page.getByText("A place to share your knowledge.")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Global Feed" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Sign in" }).click();
    await newPost.fillNewPostInput("Email", "leia@coderslab.pl");
    await newPost.fillNewPostInput("Password", "secret");
    await page.getByRole("button").click();
    await expect(page.getByRole("link", { name: "leia" })).toBeVisible();

    await page.getByRole("link", { name: "New Post" }).click();
    await newPost.fillNewPostInput("Article Title", "Przykładowy tytuł");
    await newPost.fillNewPostInput(
      "What's this article about?",
      "Przykładowy tekst"
    );
    await newPost.fillNewPostInput(
      "Write your article (in markdown)",
      "Przykładowy test posta"
    );

    await newPost.fillNewPostInput("Enter tags", "Przykładowy tag");

    await page.getByRole("button", { name: "Publish Article" }).click();

    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();

    expect(page.url()).toBe("http://127.0.0.1:3000/article/przyk-adowy-tytu");

    await expect(page.locator("h1")).toHaveText("Przykładowy tytuł");
  });
});
