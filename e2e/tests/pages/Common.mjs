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
  //click on button
  async submitClick(type) {
    await this.page.locator(`button[type=${type}]`).click();
  }
}
