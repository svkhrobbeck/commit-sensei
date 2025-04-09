import bot from "../bot/core";
import { extractErrorMessage, delay } from ".";
import { developerChadIds } from "../helpers/constants";

const notifyDevelopers = async (errorMessage: string, isError = true): Promise<void> => {
  const telegramMessage = `${isError ? "<b>Xatolik yuz berdi</b>:" : ""}${extractErrorMessage(errorMessage)}`;

  for (const chatId of developerChadIds) {
    console.log(chatId);
    await delay(2500);
    await bot.api.sendMessage(chatId, telegramMessage, { parse_mode: "HTML" });
  }
};

export default notifyDevelopers;
