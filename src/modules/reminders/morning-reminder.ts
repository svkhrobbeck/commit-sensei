import dedent from "dedent";
import { getDeadline, getSetting } from "../sheets";
import { formatDate, notifyDevelopers } from "../../utils";

const morningReminder = async () => {
  const dateInstance = new Date();
  const date = formatDate(dateInstance, "DD-MM-YYYY");
  const deadline = await getDeadline();
  const setting = await getSetting();

  const singleDeadline = deadline.find(item => item.date === date && item.id === dateInstance.getDay() && !item.passed);

  const message = dedent`
    #morning_reminder
    
    ${date}
    
    Bugun kamida ${
      singleDeadline!.total || setting.averageDailyCommitCount
    } ta commit yozishingiz kerak. Commitlarni hisoblashda o'tgan haftadagi jarimalar hisobga olinadi.`;

  await notifyDevelopers(message, false);
};

export default morningReminder;
