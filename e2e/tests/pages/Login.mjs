import { Common } from "./Common.mjs";

export const injectLogin = async ({ page }, use) => await use(new Login(page));

class Login extends Common {
  constructor(page) {
    super(page);
  }
  async fillLoginValue(name, value) {
    await this.fillInput(name, value);
  }
  async fillLoginInput(type, value) {
    await this.page.locator(`input[type=${type}]`).fill(value);
  }
  async click(type) {
    await this.submitClick(type);
  }
}
