import dedent from "dedent";

import summaryReminder from "./summary-reminder";
import { getAllRepoCommitCounts } from "../github";
import { getDeadline, getSetting, setDeadline, setSetting } from "../sheets";
import { delay, formatDate, notifyDevelopers, sendMessageToChannel } from "../../utils";

const nightReminder = async () => {
  const todayCommitCounts = await getAllRepoCommitCounts();
  const deadline = await getDeadline();
  const setting = await getSetting();

  const dateInstance = new Date();
  const todayDate = formatDate(dateInstance, "DD-MM-YYYY");

  const isSummaryDay = dateInstance.getDay() === 0 && todayDate === setting.summaryDate;
  const todayTaskIndex = deadline.findIndex(
    item => item.date === todayDate && item.id === dateInstance.getDay() && !item.passed
  );

  const tomorrowDeadline = deadline.find(
    item => item.id === (dateInstance.getDay() + 1 > 6 ? 0 : dateInstance.getDay())
  );

  if (todayTaskIndex >= 0) {
    const todayTask = deadline[todayTaskIndex];

    if (todayCommitCounts < todayTask.total) {
      const stockCommit = todayTask.total - todayCommitCounts;

      const message = dedent`
      #night_reminder
      
      Bugun ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, limitni to'liq bajara olmadingiz, sizga kelasi hafta uchun ${stockCommit} ta jarima yoziladi!!`;

      const channel_message = dedent`<b>
      #daily_log
      
      Bugun githubga ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, limitni to'liq bajara olmadingiz, sizga kelasi hafta uchun ${stockCommit} ta jarima yoziladi!!</b>`;

      await notifyDevelopers(message, false);
      await delay(1000);
      await sendMessageToChannel(channel_message);

      await setSetting({ penaltyForNextWeek: setting.penaltyForNextWeek + stockCommit });
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

      const channel_message = dedent`<b>#daily_log
        
      Bugun githubga ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, kunlik limit(${
        todayTask.total
      } ta)ni to'liq bajardingiz!! ${
        todayCommitCounts > setting.total
          ? "Hattoki hafta limitini bir kunda bajardingiz, natijangiz bilan tabriklaymiz!"
          : ""
      } Ertanga yana kamida ${
        tomorrowDeadline?.total || setting.averageDailyCommitCount
      } ta commit rejalangan, bajarishni unutmang!
      </b>`;
      await notifyDevelopers(message, false);
      await sendMessageToChannel(channel_message);
    }

    await setDeadline(todayTaskIndex, [{ passed: true, done: todayCommitCounts }]);
    if (isSummaryDay) {
      summaryReminder();
    }
  }
};

export default nightReminder;
