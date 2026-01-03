import dedent from "dedent";

import { weekDays } from "@/helpers";
import { formatDate, notifyDevelopers } from "@/utils";

import { getDeadline, getUsers } from "@/modules/sheets";
import { getAllRepoCommitCounts } from "@/modules/github";

const eveningReminder = async () => {
  const users = await getUsers();

  for (const user of users) {
    const todayCommitCounts = await getAllRepoCommitCounts(user.github, user.githubToken);
    const deadline = await getDeadline(user.deadlineRange);

    const dateInstance = new Date();
    const todayDate = formatDate(dateInstance, "DD-MM-YYYY");
    const todayTask = deadline.find(
      item => item.date === todayDate && dateInstance.getDay() === item.id && !item.passed,
    );

    if (todayTask) {
      if (todayCommitCounts < todayTask.total) {
        const stockCommit = todayTask.total - todayCommitCounts;

        const message = dedent`
        #evening_reminder
        
        ${weekDays[dateInstance.getDay()]}
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kun oxirigacha yana 4 soat vaqtingiz bor, 23:59 gacha ${stockCommit} ta commit yozishingiz kerak. Agarda limitni bajarmasangiz jarima yoziladi!!`;

        await notifyDevelopers({ user, message });
      } else {
        const message = dedent`
        #evening_reminder
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kunlik limit allaqachon bajarilgan, tabriklaymiz!`;

        await notifyDevelopers({ user, message });
      }
    }
  }
};

export default eveningReminder;
