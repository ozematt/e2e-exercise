import { Common } from "./Common.mjs";

export const injectNewPost = async ({ page }, use) =>
  await use(new NewPost(page));

class NewPost extends Common {
  constructor(page) {
    super(page);
  }

  async fillNewPostInput(placeholder, content) {
    await this.page.getByPlaceholder(placeholder).fill(content);
  }

  async clickNewPostButtons(role, name) {
    await this.page.getByRole(role, { name: name }).click();
  }
}
