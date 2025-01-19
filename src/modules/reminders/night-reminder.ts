import dedent from "dedent";

import { getAllRepoCommitCounts } from "../github";
import { delay, formatDate, notifyDevelopers } from "../../utils";
import { getDeadline, getSetting, setDeadline, setSetting } from "../sheets";
import summaryReminder from "./summary-reminder";

const nightReminder = async () => {
  const todayCommitCounts = await getAllRepoCommitCounts();
  const deadline = await getDeadline();
  const setting = await getSetting();

  const todayDate = formatDate(Date.now(), "DD-MM-YYYY");
  const isSummaryDay = new Date().getDay() === 0 && todayDate === setting.summaryDate;
  const todayTaskIndex = deadline.findIndex(item => item.date === todayDate && !item.passed);

  if (todayTaskIndex >= 0) {
    const todayTask = deadline[todayTaskIndex];

    if (todayCommitCounts < todayTask.total) {
      const stockCommit = todayTask.total - todayCommitCounts;

      const message = dedent`
      #night_reminder
      
      Bugun ${todayCommitCounts} ta commit yozdingiz, kun yakunlandi, limitni to'liq bajara olmadingiz, sizga kelasi hafta uchun ${stockCommit} ta jarima yoziladi!!`;

      await notifyDevelopers(message, false);
      await delay(2000);

      await setSetting({ penaltyForNextWeek: setting.penaltyForNextWeek + stockCommit });
      await delay(2000);

      await setDeadline(todayTaskIndex, [{ passed: true, done: todayCommitCounts }]);
      await delay(2000);

      if (isSummaryDay) {
        summaryReminder();
      }
    }
  }
};

export default nightReminder;
