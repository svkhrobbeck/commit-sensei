import dedent from "dedent";
import { getDeadline, getSetting } from "../sheets";
import { formatDate, notifyDevelopers } from "../../utils";

const morningReminder = async () => {
  const dateInstance = new Date();
  const date = formatDate(dateInstance, "DD-MM, YYYY");
  const deadline = await getDeadline();
  const setting = await getSetting();

  const singleDeadline = deadline.find(item => item.id === dateInstance.getDay());

  const message = dedent`
    #morning_reminder
    
    Bugun ${date},
    Bugun kamida ${
      singleDeadline!.total || setting.avarageDailyCommitCount
    } ta commit yozishingiz kerak. Commitlarni hisoblashda o'tgan haftadagi jarimalar hisobga olinadi.`;

  await notifyDevelopers(message, false);
};

export default morningReminder;
