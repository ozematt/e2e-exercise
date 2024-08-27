import { Common } from "./Common.mjs";

export const injectAuthService = async ({ request }, use) =>
  await use(new Auth(request));

class Auth extends Common {
  constructor(request) {
    super(request);
  }
  async login({ email, password }) {
    const data = { user: { email, password } };
    const response = await this.requestToEndpoint("/api/users/login", {
      data,
      method: "post",
      status: 200,
    });
    return response.json();
  }
}
