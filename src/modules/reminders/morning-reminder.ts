import dedent from "dedent";
import { formatDate, notifyDevelopers } from "../../utils";

const morningReminder = async () => {
  const date = formatDate(new Date(), "DD-MM, YYYY");

  const message = dedent`
    #morning_reminder
    
    Bugun ${date},
    Bugun kamida 7 ta commit yozishingiz kerak. Commitlarni hisoblashda haftadagi jarimalar hisobga olinadi.`;

  await notifyDevelopers(message, false);
};

export default morningReminder;
