class Common {
  constructor(page) {
    this.page = page;
  }
  async fillInput(name, value) {
    await this.page.locator(`input[name="${name}"]`).fill(value);
  }
}
