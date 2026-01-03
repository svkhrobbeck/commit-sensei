import dedent from "dedent";

import { weekDays } from "@/helpers";
import { formatDate, notifyDevelopers } from "@/utils";

import { getAllRepoCommitCounts } from "@/modules/github";
import { getDeadline, getSettings, getUsers } from "@/modules/sheets";

const afternoonReminder = async () => {
  const users = await getUsers();
  const settings = await getSettings();

  for (const user of users) {
    const setting = settings.find(s => s.userId === user.id)!;
    const todayCommitCounts = await getAllRepoCommitCounts(user.github, user.githubToken);
    const deadline = await getDeadline(user.deadlineRange);

    const dateInstance = new Date();
    const date = formatDate(dateInstance, "DD-MM-YYYY");

    if (dateInstance.getDay() === 1) {
      const message = dedent`
      #afternoon_reminder #new_week
      
      Bugun ${date}, yangi hafta boshlanmoqda, hafta uchun grafik:
      
      <b>${deadline.map(item => `${weekDays[item.id]}: ${item.total} ta`).join("\n")}</b>
      commit yozishingiz kerak!!
      
      Bugun kamida ${deadline.at(0)?.total || setting.averageDailyCommitCount} ta commit yozishingiz kerak. Commitlarni hisoblashda haftadagi jarimalar hisobga olinadi.`;

      await notifyDevelopers({ user, message });
    } else {
      const todayTask = deadline.find(item => item.date === date && !item.passed);

      if (todayTask) {
        if (todayCommitCounts < todayTask.total) {
          const stockCommit = todayTask.total - todayCommitCounts;

          const message = dedent`
          #afternoon_reminder
          
          Bugun ${todayCommitCounts} ta commit yozdingiz, kun oxirigacha yana ${stockCommit} ta commit yozishingiz kerak. Agarda limitni bajarmasangiz jarima yoziladi!!`;

          await notifyDevelopers({ user, message });
        } else {
          const message = dedent`
          #afternoon_reminder
          
          Bugun ${todayCommitCounts} ta commit yozdingiz, kunlik limit allaqachon bajarilgan, tabriklaymiz!`;

          await notifyDevelopers({ user, message });
        }
      }
    }
  }
};

export default afternoonReminder;
