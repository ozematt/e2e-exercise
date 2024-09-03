import { test as base } from "@playwright/test";
import { injectCommentService } from "../e2e/tests/services/Comment.mjs";
import { injectAuthService } from "../e2e/tests/services/Auth.mjs";
import { injectUserService } from "../e2e/tests/services/User.mjs";
import { injectArticleService } from "../e2e/tests/services/Article.mjs";

//configuration data for two users
const CONFIGURATION = {
  articleAuthorEmail: "author@automation.coderslab.pl",
  articleAuthorPassword: "secret",
  articleAuthorUsername: "Han Solo",
  articleCommenterEmail: "commenter@automation.coderslab.pl",
  articleCommenterPassword: "secret",
  articleCommenterUsername: "Star-Wars",
};

//services injected
const test = base.extend({
  commentService: injectCommentService,
  authService: injectAuthService,
  userService: injectUserService,
  articleService: injectArticleService,
});

//// TEST
test.describe("Articles creation", async () => {
  test("creation of two users, the author of the article, and the author of the commentary", async ({
    commentService,
    authService,
    userService,
    articleService,
  }) => {
    //create -> article author user
    await userService.create({
      email: CONFIGURATION.articleAuthorEmail,
      password: CONFIGURATION.articleAuthorPassword,
      username: CONFIGURATION.articleAuthorUsername,
    });
    //logged -> article author user
    const { user: loggedAuthorUser } = await authService.login({
      email: CONFIGURATION.articleAuthorEmail,
      password: CONFIGURATION.articleAuthorPassword,
    });

    //create new article by -> article author user
    const { article } = await articleService.create({
      body: "This is body from e2e - 2",
      description: "This is description from E2E - 2",
      tagList: ["#createdByE2E", "#multipleTest"],
      title: `Created by E2E - ${CONFIGURATION.articleAuthorEmail}`,
      token: loggedAuthorUser.token,
    });

    // create -> commenter user
    await userService.create({
      email: CONFIGURATION.articleCommenterEmail,
      password: CONFIGURATION.articleCommenterPassword,
      username: CONFIGURATION.articleCommenterUsername,
    });

    // logged -> commenter user
    const { user: loggedCommenterUser } = await authService.login({
      email: CONFIGURATION.articleCommenterEmail,
      password: CONFIGURATION.articleCommenterPassword,
    });

    //comment by -> commenter user
    await commentService.create({
      articleUrl: article.slug,
      articleId: article.id,
      authorId: loggedCommenterUser.id,
      comment: `Comment generated by E2E - ${CONFIGURATION.articleCommenterEmail}`,
      token: loggedCommenterUser.token,
    });

    //logged in console
    console.log({
      authorEmail: CONFIGURATION.articleAuthorEmail,
      authorPassword: CONFIGURATION.articleAuthorPassword,
      authorToken: loggedAuthorUser.token,
      commenterEmail: CONFIGURATION.articleCommenterEmail,
      commenterPassword: CONFIGURATION.articleCommenterPassword,
      commenterToken: loggedCommenterUser.token,
      articleUrl: article.slug,
    });
  });
});
