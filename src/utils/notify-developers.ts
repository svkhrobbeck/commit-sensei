import { InlineKeyboard } from "grammy";
import { extractErrorMessage } from "utilzify";

import bot from "@/bot/core";
import type { IUser } from "@/helpers";

export interface NotifyDevelopersOptions {
  user: IUser;
  message?: string;
  channelMessage?: string;
  isError?: boolean;
}

const notifyDevelopers = async ({ user, message = "", ...opts }: NotifyDevelopersOptions): Promise<void> => {
  const telegramMessage = `${opts.isError ? `<b>Xatolik yuz berdi</b>:${extractErrorMessage(message)}` : ""}`;
  const channelInlineButton = new InlineKeyboard().url("Github akkauntingiz", `https://github.com/${user.github}`);

  if (opts.isError && message) {
    await bot.api.sendMessage(user.telegramId, telegramMessage, { parse_mode: "HTML" });
    return;
  }

  if (message) {
    await bot.api.sendMessage(user.telegramId, message, { parse_mode: "HTML" });
    return;
  }

  const msgForChannel = opts.channelMessage ?? message;
  if (user.mode === "channel" && msgForChannel) {
    await bot.api.sendMessage(user.channelId, msgForChannel, {
      parse_mode: "HTML",
      reply_markup: user.channelMessageInlineButtons ? channelInlineButton : undefined,
    });
  }
};

export default notifyDevelopers;
