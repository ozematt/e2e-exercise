import { expect, test } from "@playwright/test";

test.describe("Register user flow", () => {
  test("Go to register page, submit form with valid data, verify redirection", async ({
    page,
  }) => {
    const id = Date.now();
    const email = `yoda-${id}@coderslab.pl`;

    await page.goto("/");

    await page.locator("a[href='/register']").click();
    await page.locator('input[placeholder="Your Name"]').fill("Yoda");
    await page.locator('input[name="email"]').fill(email);
    await page.locator('.form-control[type="password"]').fill("secret");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText("yoda")).toBeVisible();
  });
});
