import { expect } from "@playwright/test";

export class Common {
  constructor(request) {
    this.request = request;
  }
  async requestToEndpoint(
    endpoint,
    { data, token, statusCode, method = "get" }
  ) {
    const response = this.request[method.toLowerCase()](
      `http://localhost:5500${endpoint}`,
      {
        headers: {
          ...(token && { Authorization: `Token ${token}` }),
        },
        ...(data && { data }),
      }
    );

    if (statusCode) {
      expect(response.status()).toBe(statusCode);
    }
    return response;
  }
}
