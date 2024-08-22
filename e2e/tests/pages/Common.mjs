export const injectCommon = async ({ page }, use) =>
  await use(new Common(page));

export class Common {
  constructor(page) {
    this.page = page;
  }
  async fillInput(name, value) {
    await this.#getInput(name).fill(value);
  }
  async clearInput(name) {
    await this.#getInput(name).clear();
  }
  async submitClick(type) {
    await this.page.locator(`button[type='${type}']`).click();
  }
  #getInput(name) {
    return this.page.locator(`input[name="${name}"]`);
  }
}
