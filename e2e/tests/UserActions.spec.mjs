import { test as base, expect } from "@playwright/test";
import { injectArticle } from "./pages/Article";
import { injectCommon } from "./pages/Common.mjs";
import { injectArticleService } from "./services/Article.mjs";
import { injectAuthService } from "./services/Auth.mjs";
import { injectCommentService } from "./services/Comment.mjs";
import { injectUserService } from "./services/User.mjs";

const test = base.extend({
  article: injectArticle,
  articleService: injectArticleService,
  commentService: injectCommentService,
  authService: injectAuthService,
  userService: injectUserService,
  common: injectCommon,
});

test.describe("User actions on page", () => {
  const user = {};

  test.beforeEach(
    async ({ articleService, authService, commentService, userService }) => {
      const id = Date.now();
      Object.assign(user, {
        email: `test-${id}@coderslab.pl`,
        password: "secret",
      });

      const { user: createdUser } = await userService.create({
        email: user.email,
        password: user.password,
        username: "e2euser",
      });

      const { user: loggedUser } = await authService.login({
        email: user.email,
        password: user.password,
      });

      // implementacja wykorzystania serwisu Article
      const { article } = await articleService.create({
        body: "This is body from e2e - 2",
        description: "This is description from E2E - 2",
        tagList: ["#createdByE2E", "#multipleTest"],
        title: `Created by E2E - ${id}`,
        token: loggedUser.token,
      });

      // articleUrl oraz articleId wykorzystywane z odpowiedzi, którą zwraca metoda create serwisu Article
      await commentService.create({
        articleUrl: article.slug,
        articleId: article.id,
        authorId: createdUser.id,
        comment: `This is a comment created in E2E by user ${user.email}`,
        token: loggedUser.token,
      });
    }
  );

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

    //do not use common like that
    await common.fillInput("username", "obi-one");
    await common.fillInput("email", email);
    await common.fillInput("password", "123456");

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
