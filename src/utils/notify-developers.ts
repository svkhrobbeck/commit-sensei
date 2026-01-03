import { InlineKeyboard } from "grammy";

import bot from "@/bot/core";
import type { IUser } from "@/helpers";

export interface NotifyDevelopersOptions {
  user: IUser;
  message?: string;
  channelMessage?: string;
  isError?: boolean;
}

const notifyDevelopers = async ({ user, message = "", ...opts }: NotifyDevelopersOptions): Promise<void> => {
  const telegramMessage = `${opts.isError ? `<b>Xatolik yuz berdi</b>:${message}` : ""}`;
  const channelInlineButton = new InlineKeyboard().url("Github akkauntingiz", `https://github.com/${user.github}`);

  if (opts.isError && message) {
    await bot.api.sendMessage(user.telegramId, telegramMessage, { parse_mode: "HTML" });
    return;
  }

  if (message) {
    await bot.api.sendMessage(user.telegramId, message, { parse_mode: "HTML" });
  }

  if (user.mode === "channel" && opts.channelMessage) {
    await bot.api.sendMessage(user.channelId, opts.channelMessage, {
      parse_mode: "HTML",
      reply_markup: user.channelMessageInlineButtons ? channelInlineButton : undefined,
    });
  }
};

export default notifyDevelopers;
