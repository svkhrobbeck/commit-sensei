import { Composer } from "grammy";
import { getStats } from "../../modules/reminders";
import { developerChadIds } from "../../helpers/constants";

const commadsHandler = new Composer();

commadsHandler.command("start", async ctx => {
  const chatId = ctx.chat.id;

  if (developerChadIds.includes(chatId)) {
    await ctx.reply(
      `Xush kelibsiz!\nAfsuski bot hali tayyor emas:(\nTezroq natijani ko'rmoqchi bo'lsangiz @${process.env.TG_USERNAME}'ga murojaat qiling!`
    );
  } else {
    await ctx.reply("Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
  }
});

commadsHandler.command("stats", async ctx => {
  const chatId = ctx.chat.id;

  if (developerChadIds.includes(chatId)) {
    const message = await ctx.reply("Iltimos, kuting...");
    await getStats();
    await ctx.api.deleteMessage(chatId, message.message_id);
  } else {
    await ctx.reply("Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
  }
});

commadsHandler.on("message:text", async ctx => {
  const chatId = ctx.chat.id;

  if (developerChadIds.includes(chatId)) {
    if (ctx.chat.type === "private") {
      await ctx.reply("Uzr, afsuski bot hali tayyor emas:(");
    }
  } else {
    await ctx.reply("Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
  }
});

export default commadsHandler;
