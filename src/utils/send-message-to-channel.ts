import { InlineKeyboard } from "grammy";

import bot from "../bot/core";

const channelId = process.env.CHANNEL_ID!;

const sendMessageToChannel = async (message: string, withButton: boolean = true) => {
  const inlineButton = new InlineKeyboard().url(
    "Natijalarni jadvalda kuzatish",
    "https://docs.google.com/spreadsheets/d/1OqMoJ8N1MMmYx4gnkKkTeYfFT7SHsCLYuXZQM1Fk5Vc"
  );

  if (withButton) {
    await bot.api.sendMessage(channelId, message, { parse_mode: "HTML", reply_markup: inlineButton });
  } else {
    await bot.api.sendMessage(channelId, message, { parse_mode: "HTML" });
  }
};

export default sendMessageToChannel;
