import "dotenv/config";
import cron from "node-cron";

import app from "./server";
import bot from "./bot/core";

import { afternoonReminder, eveningReminder, morningReminder, nightReminder } from "./modules/reminders";

const PORT = process.env.PORT!;

bot.start({
  onStart(info) {
    console.log(`https://t.me/${info.username} has been started`);
  },
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

nightReminder();
// cron schedules
cron.schedule("0 7 * * *", morningReminder);
cron.schedule("0 14 * * *", afternoonReminder);
cron.schedule("0 20 * * *", eveningReminder);
cron.schedule("45 23 * * *", nightReminder);

// 23:45 - bugun agar 7 tadan kam yozgan bo'lsa 7 - bugungi_commitlar_soni = qoldiq = jarima(googlesheets)
// har yakshanba / haftadagi statistika
