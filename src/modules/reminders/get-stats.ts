import dedent from "dedent";

import { weekDays } from "../../helpers/constants";
import { getAllRepoCommitCounts } from "../github";
import { getDeadline, getSetting } from "../sheets";
import { formatDate, notifyDevelopers, sendMessageToChannel } from "../../utils";

const getStats = async () => {
  const dateInstance = new Date();
  const date = formatDate(dateInstance, "DD-MM-YYYY");
  const deadline = await getDeadline();
  const setting = await getSetting();
  const todayCommitCounts = await getAllRepoCommitCounts();

  const singleDeadline = deadline.find(item => item.date === date && item.id === dateInstance.getDay() && !item.passed);

  const message = dedent`
    #morning_reminder (test)
    
    Bugun ${date}, ${weekDays[dateInstance.getDay()]}
    
    Bugun kamida ${singleDeadline!.total || setting.averageDailyCommitCount} ta commit yozishingiz kerak edi va siz ${
    todayCommitCounts > 0 ? `${todayCommitCounts} ta commit yozdingiz!` : "hechqancha commit yozmadingiz."
  } Commitlarni hisoblashda o'tgan haftadagi jarimalar hisobga olinadi.`;

  await notifyDevelopers(message, false);
  await sendMessageToChannel(message, true);
};

export default getStats;
