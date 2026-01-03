import dedent from "dedent";
import { delay } from "utilzify";

import { weekDays } from "@/helpers/constants";
import { formatDate, notifyDevelopers } from "@/utils";

import { getDeadline, getSettings, getUsers } from "@/modules/sheets";

const morningReminder = async () => {
  const users = await getUsers();
  const dateInstance = new Date();
  const settings = await getSettings();
  const date = formatDate(dateInstance, "DD-MM-YYYY");

  for (const user of users) {
    const setting = settings.find(s => s.userId === user.id)!;
    const deadline = await getDeadline(user.deadlineRange);

    const singleDeadline = deadline.find(
      item => item.date === date && item.id === dateInstance.getDay() && !item.passed,
    );

    const message = dedent`
    #morning_reminder
    
    ${date}, ${weekDays[dateInstance.getDay()]}
    
    Bugun kamida ${
      singleDeadline!.total || setting.averageDailyCommitCount
    } ta commit yozishingiz kerak. Commitlarni hisoblashda o'tgan haftadagi jarimalar hisobga olinadi.`;

    await notifyDevelopers({ user, message });
    await delay(1000);
  }
};

export default morningReminder;
