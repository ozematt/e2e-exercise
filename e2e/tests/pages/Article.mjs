import { Common } from "./Common.mjs";

export const injectArticle = async ({ page }, use) =>
  await use(new Article(page));

class Article extends Common {
  constructor(page) {
    super(page);
  }
  //used class common
  async fillArticleTitle(title) {
    await this.fillInput("title", title);
  }
  //used class common
  async fillArticleSummary(summary) {
    await this.fillInput("description", summary);
  }
  //fill textarea
  async fillArticleContent(content) {
    await this.page.locator("textarea[name='body']").fill(content);
  }

  //for list use -> for of loop
  async addTags(tags) {
    const locator = this.page.locator('input[placeholder="Enter tags"]');

    for (const tag of tags) {
      await locator.fill(tag);
      await locator.press("Enter");
    }
  }
  //used class common
  async clickPublish() {
    await this.submitClick("submit");
  }
}
