import { Bot } from "grammy";

import { errorHandler } from "./middlewares";
import { callbacksHandler, commandsHandler } from "./handlers";

export const { BOT_TOKEN: token, SECRET_TOKEN: secretToken = String(token).split(":").pop() } =
  process.env;

const bot = new Bot(token!);

bot.api.setMyCommands([{ command: "start", description: "Botni ishga tushirish" },]);

bot.use(callbacksHandler);
bot.use(commandsHandler);
bot.catch(errorHandler);

export default bot;
