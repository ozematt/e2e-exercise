export class Common {
  constructor(page) {
    this.page = page;
  }
  async fillInput(name, value) {
    await this.#getInput.fill(value);
  }
  async clearInput(name) {
    await this.#getInput.clear();
  }
  async buttonClick(name) {
    await this.page.getByRole(`"button", { name: "${name}" }`).click();
  }
  #getInput(name) {
    return this.page.locator(`input[name="${name}"]`);
  }
}
