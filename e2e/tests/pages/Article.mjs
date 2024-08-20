class Article {
  constructor(page) {
    this.page = page;
  }
  async fillArticleTitle(title) {
    await page.locator("input[name='title']").fill(title);
  }

  async fillArticleSummary(summary) {}

  async fillArticleContent(content) {}

  async addTags(tags) {}

  async clickPublish() {}
}
