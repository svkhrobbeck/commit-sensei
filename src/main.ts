import cron from "node-cron";

import bot from "@/bot/core";
import { runServer } from "@/app";
import { afternoonReminder, eveningReminder, getStats, morningReminder, nightReminder } from "@/modules/reminders";

bot.start({
  onStart(info) {
    console.log(`https://t.me/${info.username} has been started`);
  },
});

runServer(console.log);

cron.schedule("0 7 * * *", morningReminder);
cron.schedule("0 14 * * *", afternoonReminder);
cron.schedule("58 19 * * *", eveningReminder);
cron.schedule("58 23 * * *", nightReminder);
getStats();
