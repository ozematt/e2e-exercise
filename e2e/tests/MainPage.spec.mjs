import { test, expect } from "@playwright/test";

test.describe("Page loading", () => {
  test("Go to the home page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("A place to share your knowledge.")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Global Feed" })
    ).toBeVisible();
  });
});
