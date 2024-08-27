import { test as base } from "@playwright/test";
import { injectCommentService } from "../e2e/tests/services/Comment.mjs";
import { injectAuthService } from "../e2e/tests/services/Auth.mjs";
import { injectUserService } from "../e2e/tests/services/User.mjs";
import { injectArticleService } from "../e2e/tests/services/Article.mjs";
import { log } from "console";

const CONFIGURATION = {
  articleAuthorEmail: "author@automation.coderslab.pl",
  articleAuthorPassword: "secret",
  articleAuthorUsername: "Han Solo",
  articleCommenterEmail: "commenter@automation.coderslab.pl",
  articleCommenterPassword: "secret",
  articleCommenterUsername: "Chewbacca",
};

const test = base.extend({
  commentService: injectCommentService,
  authService: injectAuthService,
  userService: injectUserService,
  articleService: injectArticleService,
});

test.describe("Articles creation", async () => {
  test("creation of two users, the author of the article, and the author of the commentary", async ({
    commentService,
    authService,
    userService,
    articleService,
  }) => {
    const { user: createdAuthor } = await userService.create({
      email: CONFIGURATION.author.email,
      password: CONFIGURATION.author.password,
      username: CONFIGURATION.author.username,
    });

    const { user: createdCommenting } = await userService.create({
      email: CONFIGURATION.commenting.email,
      password: CONFIGURATION.commenting.password,
      username: CONFIGURATION.commenting.username,
    });

    const { user: loggedUser } = await authService.login({
      email: CONFIGURATION.author.email,
      password: CONFIGURATION.author.password,
    });

    const { article } = await articleService.create({
      body: "This is body for testing article e2e",
      description: "This is description for testing article e2e",
      tagList: ["#created-e2e", "#multipleTest"],
      title: `Created by ${CONFIGURATION.author.username}`,
      token: loggedUser.token,
    });

    const { user: loggedUser2 } = await authService.login({
      email: CONFIGURATION.commenting.email,
      password: CONFIGURATION.commenting.password,
    });

    // articleUrl oraz articleId wykorzystywane z odpowiedzi, którą zwraca metoda create serwisu Article
    await commentService.create({
      articleUrl: article.slug,
      articleId: article.id,
      authorId: createdAuthor.id,
      comment: CONFIGURATION.commenting.comment,
      token: loggedUser2.token,
    });

    console.log({
      author: {
        email: CONFIGURATION.author.email,
        username: CONFIGURATION.author.username,
        token: loggedUser.token,
      },
      commenting: {
        email: CONFIGURATION.commenting.email,
        username: CONFIGURATION.commenting.username,
        token: loggedUser2.token,
      },
    });
  });
});
