import { Common } from "./Common.mjs";

export const injectUserService = async ({ request }, use) =>
  await use(new User(request));

class User extends Common {
  constructor(request) {
    super(request);
  }
  async create({ email, username, password }) {
    const data = { user: { email, username, password } };
    const response = await this.requestToEndpoint("/api/user", {
      data,
      method: "post",
      status: 201,
    });
    return response.json();
  }
}
