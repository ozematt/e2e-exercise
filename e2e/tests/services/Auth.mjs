import { Common } from "./Common.mjs";

export const injectAuthService = async ({ request }, use) =>
  await use(new Auth(request));

class Auth extends Common {
  constructor(request) {
    super(request);
  }
}
