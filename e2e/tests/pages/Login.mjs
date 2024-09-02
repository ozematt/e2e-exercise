import { Common } from "./Common.mjs";

export const injectLogin = async ({ page }, use) => await use(new Login(page));

class Login extends Common {
  constructor(page) {
    super(page);
  }
  //used class common
  async fillLoginValue(name, value) {
    await this.fillInput(name, value);
  }

  //used class common
  async click(type) {
    await this.submitClick(type);
  }
}
