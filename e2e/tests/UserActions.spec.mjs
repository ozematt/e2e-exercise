import { test as base, expect } from "@playwright/test";
import { injectArticle } from "./pages/Article";
import { injectArticleService } from "./services/Article.mjs";
import { injectAuthService } from "./services/Auth.mjs";
import { injectCommentService } from "./services/Comment.mjs";
import { injectUserService } from "./services/User.mjs";
import { injectLogin } from "./pages/Login.mjs";

//injected POM and services
const test = base.extend({
  article: injectArticle,
  login: injectLogin,
  articleService: injectArticleService,
  commentService: injectCommentService,
  authService: injectAuthService,
  userService: injectUserService,
});

////TEST
test.describe("User actions on page", () => {
  //empty object user
  const user = {};

  //data preparation before the test
  test.beforeEach(
    async ({ articleService, authService, commentService, userService }) => {
      //dynamic id
      const id = Date.now();

      //assigning a value to an object
      Object.assign(user, {
        email: `test-${id}@coderslab.pl`,
        password: "secret",
      });

      //a user was created with data from the object "user"
      const { user: createdUser } = await userService.create({
        email: user.email,
        password: user.password,
        username: "e2euser",
      });

      //logged user
      const { user: loggedUser } = await authService.login({
        email: user.email,
        password: user.password,
      });

      // implementation of the use of the Article service, saving a new article to a variable "article"
      const { article } = await articleService.create({
        body: "This is body from e2e - 2",
        description: "This is description from E2E - 2",
        tagList: ["#createdByE2E", "#multipleTest"],
        title: `Created by E2E - ${id}`,
        token: loggedUser.token,
      });

      // articleUrl and articleId used from the response returned by the create method of the Article service
      await commentService.create({
        articleUrl: article.slug,
        articleId: article.id,
        authorId: createdUser.id,
        comment: `This is a comment created in E2E by user ${user.email}`,
        token: loggedUser.token,
      });
    }
  );

  test("user flow check @user", async ({ page, article, login }) => {
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
    await login.fillInput("username", "obi-one");
    await login.fillInput("email", email);
    await login.fillInput("password", "123456");

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
