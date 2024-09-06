import { test as base, expect } from "@playwright/test";
import { injectNewPost } from "./pages/NewPost.mjs";

const test = base.extend({
  newPost: injectNewPost,
});

test.describe("new post", () => {
  test("Go to the post creation page @post", async ({ page, newPost }) => {
    await page.goto("/");

    await expect(
      page.getByText("A place to share your knowledge.")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Global Feed" })
    ).toBeVisible();

    await newPost.clickNewPostButtons("link", "Sign in");
    await newPost.fillNewPostInput("Email", "leia@coderslab.pl");
    await newPost.fillNewPostInput("Password", "secret");
    await page.getByRole("button").click();
    await expect(page.getByRole("link", { name: "leia" })).toBeVisible();

    await newPost.clickNewPostButtons("link", "New Post");
    await newPost.fillNewPostInput("Article Title", "Sample article title");
    await newPost.fillNewPostInput("What's this article about?", "Sample text");
    await newPost.fillNewPostInput(
      "Write your article (in markdown)",
      "Sample post text"
    );

    await newPost.fillNewPostInput("Enter tags", "Sample tag");
    await newPost.clickNewPostButtons("button", "Publish Article");

    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();

    expect(page.url()).toBe(
      "http://127.0.0.1:3000/article/sample-article-title"
    );

    await expect(page.locator("h1")).toHaveText("Sample article title");
  });
});
