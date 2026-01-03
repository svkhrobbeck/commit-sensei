import { Composer } from "grammy";

import { getStats } from "@/modules/reminders";
import { getUsers } from "@/modules/sheets";

const commadsHandler = new Composer();

commadsHandler.command("start", async ctx => {
  await ctx.reply("Xush kelibsiz!");
});

commadsHandler.command("stats", async ctx => {
  const chatId = ctx.chat.id;
  const users = await getUsers();
  const user = users.find(u => u.telegramId === chatId);

  if (user) {
    const message = await ctx.reply("Iltimos, kuting...");
    await getStats();
    await ctx.api.deleteMessage(chatId, message.message_id);
  } else {
    await ctx.reply("Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
  }
});

commadsHandler.on("message:text", async ctx => {
  const chatId = ctx.chat.id;
  const users = await getUsers();
  const user = users.find(u => u.telegramId === chatId);

  if (user) {
    if (ctx.chat.type === "private") {
      await ctx.reply("Uzr, afsuski bot hali tayyor emas:(");
    }
  } else {
    await ctx.reply("Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
  }
});

export default commadsHandler;
