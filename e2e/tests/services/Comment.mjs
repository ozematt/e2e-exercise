import { Common } from "./Common.mjs";

export const injectCommentService = async ({ request }, use) =>
  await use(new Comment(request));

class Comment extends Common {
  constructor(request) {
    super(request);
  }
  async create({ articleUrl, articleId, authorId, comment, token }) {
    const data = {
      articleId,
      authorId,
      comment,
    };
    const response = await this.requestToEndpoint(
      `/api/articles/${articleUrl}/comments`,
      {
        data,
        method: "post",
        token,
        status: 200,
      }
    );
    return response.json();
  }
}
