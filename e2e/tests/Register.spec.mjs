import { expect, test } from "@playwright/test";

test.describe("Register user flow", () => {
  test("Go to register page, submit form with valid data, verify redirection @register", async ({
    page,
  }) => {
    const id = Date.now();
    const email = `yoda-${id}@coders-lab.pl`;

    await page.goto("/");

    await page.locator("a[href='/register']").click();

    await page.locator(".form-control[name='username']").fill("Yoda");

    await page.locator('.form-control[type="email"]').fill(email);

    await page.locator('input[name="password"]').fill("secret");

    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText("yoda")).toBeVisible();
  });
});
