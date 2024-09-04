import { test as base, expect } from "@playwright/test";
import { injectLogin } from "./pages/Login.mjs";

const test = base.extend({
  login: injectLogin,
});


});
