import { test as base } from "@playwright/test";
import { injectCommentService } from "../e2e/tests/services/Comment.mjs";
import { injectAuthService } from "../e2e/tests/services/Auth.mjs";
import { injectUserService } from "../e2e/tests/services/User.mjs";
import { injectArticleService } from "../e2e/tests/services/Article.mjs";

const test = base.extend({
  commentService: injectCommentService,
  authService: injectAuthService,
  userService: injectUserService,
  articleService: injectArticleService,
});

const AUTHOR_CONFIGURATION = {
  email: "jan2@example.com",
  password: "secret",
  username: "Jan",
};
const COMMENTING_CONFIGURATION = {
  email: "scott@example.com",
  password: "secret",
  username: "Scott",
  comment: "Good",
};

test.describe("users interaction", async () => {
  test("test", async ({ commentService, authService, userService }) => {
    const { user: createdAuthor } = await userService.create({
      email: AUTHOR_CONFIGURATION.email,
      password: AUTHOR_CONFIGURATION.password,
      username: AUTHOR_CONFIGURATION.username,
    });

    const { user: createdCommenting } = await userService.create({
      email: COMMENTING_CONFIGURATION.email,
      password: COMMENTING_CONFIGURATION.password,
      username: COMMENTING_CONFIGURATION.username,
    });

    const { user: loggedUser } = await authService.login({
      email: AUTHOR_CONFIGURATION.email,
      password: AUTHOR_CONFIGURATION.password,
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
  });
});
