import { setWebhookCallback } from "vercel-grammy";

import bot, { secretToken } from "../src/bot/core";

export const config = { runtime: "edge" };

// Handler to set webhook url based on request headers
export default setWebhookCallback(bot, {
  path: "api/update",
  onError: "return",
  secretToken,
});
