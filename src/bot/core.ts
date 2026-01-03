import { Bot } from "grammy";

import { callbacksHandler, commandsHandler } from "./handlers";
import { errorHandlerMiddleware, ignoreOldMiddleware, limitMiddleware } from "./middlewares";

export const { BOT_TOKEN: token, SECRET_TOKEN: secretToken = String(token).split(":").pop() } = process.env;

const bot = new Bot(token!);

bot.use(ignoreOldMiddleware(35));
bot.use(limitMiddleware);
bot.use(callbacksHandler);
bot.use(commandsHandler);
bot.catch(errorHandlerMiddleware);

export default bot;
