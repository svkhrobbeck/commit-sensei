import moment from "moment";
import { getDeadline, getSetting, setDeadline, setHistory, setSetting } from "../sheets";
import { delay, formatDate, getDaysInMs, notifyDevelopers, sendMessageToChannel } from "../../utils";
import dedent from "dedent";
import { weekDays } from "../../helpers/constants";

const summaryReminder = async () => {
  const setting = await getSetting();
  const deadline = await getDeadline();

  const oldSummaryDate = moment(setting.summaryDate, "DD-MM-YYYY").toDate();
  const newSummaryDate = formatDate(oldSummaryDate.getTime() + getDaysInMs(7), "DD-MM-YYYY");

  const completedCount = deadline.reduce((a, b) => a + b.done, 0);
  const penaltyCount = deadline.reduce((a, b) => a + b.penaltyForNextWeek, 0);

  await setSetting({
    penaltyFromLastWeek: setting.penaltyForNextWeek > penaltyCount ? setting.penaltyForNextWeek : penaltyCount,
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
      ? `sizga ${penaltyCount} ta jarima yozildi!`
      : `siz unumdor ishladingiz va ${completedCount} ta commit yozdingiz, bu esa rejadan ${
          completedCount - setting.total
        } ta ko'p demakdir!!`
  }
  `;

  await notifyDevelopers(message, false);
  await delay(1000);
  await sendMessageToChannel(message)

  const newDeadlines = [];

  for (let i = 1; i <= 7; i++) {
    const date = formatDate(oldSummaryDate.getTime() + getDaysInMs(i), "DD-MM-YYYY");
    newDeadlines.push({ date, passed: false, done: 0 });
  }

  await setDeadline(0, newDeadlines);
};

export default summaryReminder;
