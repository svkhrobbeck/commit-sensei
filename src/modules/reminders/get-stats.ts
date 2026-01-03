import dedent from "dedent";

import { weekDays } from "@/helpers/constants";
import { formatDate, notifyDevelopers } from "@/utils";

import { getAllRepoCommitCounts, getUserAllContributions } from "@/modules/github";
import { getDeadline, getSettings, getUsers } from "@/modules/sheets";
import bot from "@/bot/core";

const getStats = async (chatId: number) => {
  const dateInstance = new Date();
  const date = formatDate(dateInstance, "DD-MM-YYYY");

  const users = await getUsers();
  const settings = await getSettings();
  const user = users.find(u => u.telegramId === chatId);

  if (!user) {
    bot.api.sendMessage(chatId, "Uzr botni ishlatish huquqiga ega odamlar safida yo'qsiz");
    return;
  }

  const setting = settings.find(s => s.userId === user.id)!;
  const deadline = await getDeadline(user.deadlineRange);
  const allContributions = await getUserAllContributions(user.github, user.githubToken);

  const todayCommitCounts = await getAllRepoCommitCounts(user.github, user.githubToken);
  const singleDeadline = deadline.find(item => item.date === date && item.id === dateInstance.getDay() && !item.passed);

  const message = dedent`
    #stats
    
    Bugun ${date}, ${weekDays[dateInstance.getDay()]}
    
    Bugun kamida ${singleDeadline?.total || setting.averageDailyCommitCount} ta commit yozishingiz kerak edi va siz ${
      todayCommitCounts > 0 ? `${todayCommitCounts} ta commit yozdingiz!` : "hechqancha commit yozmadingiz."
    } Commitlarni hisoblashda o'tgan haftadagi jarimalar hisobga olinadi.
    
    Shuningdek siz umumiy hisobda bir roppa-rosa bir yil ichida ${allContributions.totalCommits} ta commit yozgansiz.
    Shundan faqatgina ${allContributions.totalOwnerCommits} ta commit sizning o'zingizga tegishli repolarda yozilgan.
    `;

  await notifyDevelopers({ user, message });
};

export default getStats;
