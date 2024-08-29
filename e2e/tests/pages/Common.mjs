export const injectCommon = async ({ page }, use) =>
  await use(new Common(page));

export class Common {
  constructor(page) {
    this.page = page;
  }
  //fill input
  async fillInput(name, value) {
    await this.#getInput(name).fill(value);
  }
  //clear input
  async clearInput(name) {
    await this.#getInput(name).clear();
  }

  async submitClick(type) {
    await this.page.locator(`button[type=${type}]`).click();
  }
  //private method
  #getInput(name) {
    return this.page.locator(`input[name=${name}]`);
  }
}
