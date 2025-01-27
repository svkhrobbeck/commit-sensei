import { InlineKeyboard } from "grammy";

import bot from "../bot/core";
import { delay } from "./tools";

const channelIds = JSON.parse(process.env.CHANNEL_IDS || "[]");

const sendMessageToChannel = async (message: string, withButton: boolean = true) => {
  const inlineButton = new InlineKeyboard().url(
    "Natijalarni jadvalda kuzatish",
    `https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}`
  );

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
