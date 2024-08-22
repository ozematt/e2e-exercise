class Common {
  constructor(page) {
    this.page = page;
  }
  async fillInput(name, value) {
    await this.page.locator(`input[name="${name}"]`).fill(value);
  }
  async clearInput(name) {
    await this.page.locator(`input[name="${name}"]`).clear();
  }
  async buttonClick(name) {
    await this.page.getByRole(`"button", { name: "${name}" }`).click();
  }
}
