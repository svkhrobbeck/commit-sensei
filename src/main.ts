import cron from "node-cron";

import bot from "@/bot/core";
import { runServer } from "@/app";
import * as Reminders from "@/modules/reminders";

// start bot
bot.start({
  onStart(info) {
    console.log(`https://t.me/${info.username} ishga tushdi!`);
  },
});

// run server
runServer(console.log);

// schedule reminders
cron.schedule("0 7 * * *", Reminders.morningReminder);
cron.schedule("0 14 * * *", Reminders.afternoonReminder);
cron.schedule("0 20 * * *", Reminders.eveningReminder);
cron.schedule("58 23 * * *", Reminders.nightReminder);
cron.schedule("58 23 * * 0", Reminders.summaryReminder);
