import moment from "moment";
import dedent from "dedent";
import { delay } from "utilzify";

import { weekDays } from "@/helpers/constants";
import { formatDate, getDaysInMs, notifyDevelopers } from "@/utils";

import { getDeadline, getSettings, getUsers, setDeadline, setHistory, setSetting } from "@/modules/sheets";

const summaryReminder = async () => {
  const users = await getUsers();
  const settings = await getSettings();

  for (const user of users) {
    const setting = settings.find(s => s.userId === user.id)!;
    const deadline = await getDeadline(user.deadlineRange);

    const oldSummaryDate = moment(setting.summaryDate, "DD-MM-YYYY").toDate();
    const newSummaryDate = formatDate(oldSummaryDate.getTime() + getDaysInMs(7), "DD-MM-YYYY");

    const completedCount = deadline.reduce((a, b) => a + b.done, 0);
    const oldPenalties = setting.total - completedCount;
    const penaltyCount = deadline.reduce((a, b) => a + b.penaltyForNextWeek, 0);
    const fullPenaltyCount = setting.penaltyForNextWeek > penaltyCount ? setting.penaltyForNextWeek : penaltyCount;

    await setSetting({
      penaltyFromLastWeek: oldPenalties <= 0 ? fullPenaltyCount : oldPenalties + fullPenaltyCount,
      penaltyForNextWeek: 0,
      completed: completedCount,
      summaryDate: newSummaryDate,
    });

    await setHistory(deadline);
    await delay(1000);

    const message = dedent`#summary
    
    Bu haftalik statistikalar:
    
    <b>${deadline.map(item => `${weekDays[item.id]}: ${item.done} ta`).join("\n")}</b>
    commitlar yozildi.
    
    Bu hafta ${
      completedCount < setting.total
        ? `sizga ${penaltyCount} ta jarima yozildi! Kelasi hafta faolroq bo'lasiz degan umiddaman`
        : `siz unumdor ishladingiz va ${completedCount} ta commit yozdingiz, bu esa rejadan ${
            completedCount - setting.total
          } ta ko'p, keyingi haftada ham shunday davom eting!`
    }
        `;

    await notifyDevelopers({ user, message, channelMessage: message });

    const newDeadlines = [];

    for (let i = 1; i <= 7; i++) {
      const date = formatDate(oldSummaryDate.getTime() + getDaysInMs(i), "DD-MM-YYYY");
      newDeadlines.push({ date, passed: false, done: 0 });
    }

    await setDeadline(user.deadlineStartCol, 0, newDeadlines);
  }
};

export default summaryReminder;
