import dedent from "dedent";
import { delay } from "utilzify";

import { formatDate, notifyDevelopers } from "@/utils";

import { getAllRepoCommitCounts } from "@/modules/github";
import { getDeadline, getSettings, getUsers, setDeadline, setSetting } from "@/modules/sheets";

const nightReminder = async () => {
  const users = await getUsers();
  const settings = await getSettings();

  const dateInstance = new Date();
  const todayDate = formatDate(dateInstance, "DD-MM-YYYY");

  for (const user of users) {
    const setting = settings.find(s => s.userId === user.id)!;

    const deadline = await getDeadline(user.deadlineRange);
    const todayCommitCounts = await getAllRepoCommitCounts(user.github, user.githubToken);

    const todayTaskIndex = deadline.findIndex(
      item => item.date === todayDate && item.id === dateInstance.getDay() && !item.passed,
    );

    const tomorrowDeadline = deadline.find(
      item => item.id === (dateInstance.getDay() + 1 > 6 ? 0 : dateInstance.getDay()),
    );

    if (todayTaskIndex >= 0) {
      const todayTask = deadline[todayTaskIndex];

      if (!todayTask) return;
      if (todayCommitCounts < todayTask.total) {
        const stockCommit = todayTask.total - todayCommitCounts;

        const message = dedent`
        #night_reminder
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, limitni to'liq bajara olmadingiz, sizga kelasi hafta uchun ${stockCommit} ta jarima yoziladi!!`;

        const channelMessage = dedent`<b>
        #daily_log
        
        Bugun githubga ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, limitni to'liq bajara olmadingiz, sizga kelasi hafta uchun ${stockCommit} ta jarima yoziladi!!</b>`;

        await notifyDevelopers({ user, message, channelMessage });

        const settingRange = settings.findIndex(s => s.userId === user.id)! + 4;

        if (settingRange >= 0) {
          await setSetting(`A${settingRange}`, { penaltyForNextWeek: setting.penaltyForNextWeek + stockCommit });
        }
        await delay(2000);
      } else {
        const message = dedent`
        #night_reminder
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, kunlik limit(${
          todayTask.total
        } ta)ni to'liq bajardingiz!!${
          todayCommitCounts > setting.total
            ? " Hattoki hafta limitini bir kunda bajardingiz, natijangiz bilan tabriklaymiz!"
            : ""
        }`;

        const channelMessage = dedent`
        <b>#daily_log

        Bugun githubga ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, kunlik limit(${
          todayTask.total
        } ta)ni to'liq bajardingiz!! ${
          todayCommitCounts > setting.total
            ? "Hattoki hafta limitini bir kunda bajardingiz, natijangiz bilan tabriklaymiz!"
            : ""
        } Ertanga yana kamida ${
          tomorrowDeadline?.total || setting.averageDailyCommitCount
        } ta commit rejalangan, bajarishni unutmang!</b>`;

        await notifyDevelopers({ user, message, channelMessage });
      }

      await setDeadline(user.deadlineStartCol, todayTaskIndex, [
        { date: undefined, passed: true, done: todayCommitCounts },
      ]);
    }
  }
};

export default nightReminder;
