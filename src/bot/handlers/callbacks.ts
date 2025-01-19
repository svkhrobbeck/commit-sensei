import { Composer } from "grammy";

const callbacksHandler = new Composer();

callbacksHandler.callbackQuery(/query_/, async ctx => {
  const callback_data = ctx.callbackQuery.data;

  switch (true) {
    case /restart_bot/.test(callback_data):
      break;

    default:
      break;
  }
});

export default callbacksHandler;
