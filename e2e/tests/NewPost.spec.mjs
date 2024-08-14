import { test, expect } from "@playwright/test";

test.describe("new post", () => {
  test("Go to the post creation page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").fill("leia@coderslab.pl");
    await page.getByPlaceholder("Password").fill("secret");
    await page.getByRole("button").click();

    await expect(page.getByRole("link", { name: "leia" })).toBeVisible();

    await expect(page.getByRole("link", { name: "New Post" })).toBeVisible();
  });
});
