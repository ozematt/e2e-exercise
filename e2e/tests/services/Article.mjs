import { Common } from "./Common.mjs";

export const injectArticleService = async ({ request }, use) =>
  await use(new Article(request));

class Article extends Common {
  constructor(request) {
    super(request);
  }
  async create({ body, description, tagList, title, token }) {
    const data = { article: { body, description, tagList, title } };

    const response = await this.requestToEndpoint("/api/article", {
      data,
      method: "post",
      token,
      status: 200,
    });
    return response.json();
  }
}
