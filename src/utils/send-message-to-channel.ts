import { InlineKeyboard } from "grammy";

import bot from "../bot/core";
import { delay } from "./tools";

const channelIds = String(process.env.CHAT_IDS).split("/").map(Number);

const sendMessageToChannel = async (message: string, withButton: boolean = true) => {
  const inlineButton = new InlineKeyboard().url(
    "Github akkauntingiz",
    `https://github.com/${process.env.GITHUB_USERNAME}`
  );
  // .row()
  // .url("Natijalarni jadvalda kuzatish", `https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}`)

  for (const channelId of channelIds) {
    if (withButton) {
      await bot.api.sendMessage(channelId, message, { parse_mode: "HTML", reply_markup: inlineButton });
    } else {
      await bot.api.sendMessage(channelId, message, { parse_mode: "HTML" });
    }
    await delay(1200);
  }
};

export default sendMessageToChannel;
