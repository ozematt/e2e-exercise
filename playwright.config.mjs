import { defineConfig } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: process.env.TESTING_TOOL === "true" ? "./testingTool" : "./e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "off",
  },
});
