import { test, expect } from "@playwright/test";

test.describe("new post", () => {
  test("Go to the post creation page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("A place to share your knowledge.")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Global Feed" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").fill("leia@coderslab.pl");
    await page.getByPlaceholder("Password").fill("secret");
    await page.getByRole("button").click();

    await expect(page.getByRole("link", { name: "leia" })).toBeVisible();

    await page.getByRole("link", { name: "New Post" }).click();
    await page.getByPlaceholder("Article Title").fill("Przykładowy tytuł");
    await page
      .getByPlaceholder("What's this article about?")
      .fill("Przykładowy tekst");
    await page
      .getByPlaceholder("Write your article (in markdown)")
      .fill("Przykładowy test posta");
    await page.getByPlaceholder("Enter tags").fill("Przykładowy tag");

    await page.getByRole("button", { name: "Publish Article" }).click();

    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();

    expect(page.url()).toBe("http://127.0.0.1:3000/article/przyk-adowy-tytu");

    await expect(page.locator("h1")).toHaveText("Przykładowy tytuł");
  });
});
