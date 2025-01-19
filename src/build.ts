import bot, { secretToken } from "./bot/core";

export interface OptionsForHost {
  headers?: Headers | Record<string, string>;
  header?: string;
  fallback?: string;
}

export function getHost(
  {
    fallback = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL || "localhost",
    headers = globalThis.Headers ? new Headers() : {},
    header = "x-forwarded-host",
  } = {} as OptionsForHost
): string {
  return String(
    (globalThis.Headers && headers instanceof Headers
      ? headers?.get?.(header)
      : (headers as Record<string, string>)[header]) ?? fallback
  );
}

export interface OptionsForURL extends OptionsForHost {
  host?: string;
  path?: string;
}

export function getURL({ host, path = "", ...other } = {} as OptionsForURL): string {
  return new URL(path, `https://${host ?? getHost(other)}`).href;
}

const { VERCEL_ENV } = process.env;

// Allowed environments list
const allowedEnvs = [
  "production", // "preview"
];

// Check if the bot can be initialized
const setupWebhook = async () => {
  await bot.init();

  // Exit if the environment is not allowed
  if (!allowedEnvs.includes(VERCEL_ENV!)) process.exit();

  // Webhook URL generation
  const url = getURL({ path: "api/update" });

  // Webhook setup options
  const options = { secret_token: secretToken };

  // Installing a webhook
  const webhookResult = await bot.api.setWebhook(url, options);

  if (webhookResult) {
    // Checking the webhook installation
    const { url: webhookURL } = await bot.api.getWebhookInfo();

    console.info("Webhook set to URL:", webhookURL);
    console.info("Secret token:", secretToken);
    console.info("Info:", bot.botInfo);
  }
};

// Call the setup function
setupWebhook().catch(console.error);
