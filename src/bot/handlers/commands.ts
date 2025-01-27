import { Composer } from "grammy";
import { getStats } from "../../modules/reminders";

const commadsHandler = new Composer();

commadsHandler.command("start", ctx =>
  ctx.reply(
    `Xush kelibsiz!\nAfsuski bot hali tayyor emas:(\nTezroq natijani ko'rmoqchi bo'lsangiz @${process.env.TG_USERNAME}'ni mazgisini tirang!`
  )
);

commadsHandler.command("stats", async ctx => {
  const message = await ctx.reply("Iltimos, kuting...");
  await getStats();
  await ctx.api.deleteMessage(ctx.chat.id, message.message_id);
});

commadsHandler.on("message:text", async ctx => {
  if (ctx.chat.type === "private") {
    ctx.reply("Aytdimku hali tayyor emas:(");
  }
});

export default commadsHandler;
