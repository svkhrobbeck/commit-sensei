import { Composer } from "grammy";

const commadsHandler = new Composer();

commadsHandler.command("start", ctx =>
  ctx.reply(
    "Xush kelibsiz!\nAfsuski bot hali tayyor emas:(\nTezroq natijani ko'rmoqchi bo'lsangiz @zutsiy'ni mazgisini tirang!"
  )
);

commadsHandler.on("message:text", async ctx => {
  if (ctx.chat.type === "private") {
    ctx.reply("Aytdimku hali tayyor emas:(");
  }
});

export default commadsHandler;
