import dedent from "dedent";

import bot from "../bot/core";
import { developerChadIds } from "../helpers/constants";

const logAndNotifyError = async (errorMessage: string): Promise<void> => {
  const message = dedent`<b>Xatolik yuz berdi</b>: ${errorMessage}`;
  await bot.api.sendMessage(developerChadIds[0], message, { parse_mode: "HTML" });
};

export default logAndNotifyError;
