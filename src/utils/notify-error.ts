import dedent from "dedent";

import bot from "../bot/core";

const logAndNotifyError = async (errorMessage: string): Promise<void> => {
  const message = dedent`<b>Xatolik yuz berdi</b>: ${errorMessage}`;
  await bot.api.sendMessage(process.env.MY_CHAT_ID!, message, { parse_mode: "HTML" });
};

export default logAndNotifyError;
