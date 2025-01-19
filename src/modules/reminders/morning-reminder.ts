import dedent from "dedent";
import { formatDate, notifyDevelopers } from "../../utils";
import { getDeadline } from "../sheets";
import { weekDays } from "../../helpers/constants";

const morningReminder = async () => {
  const currentDate = new Date();
  const date = formatDate(currentDate, "DD-MMMM, YYYY");

  if (currentDate.getDay() === 1) {
    const deadline = await getDeadline();

    const message = dedent`
    #morning_reminder #new_week
    
    Bugun ${date}-yil, yangi hafta boshlanmoqda, hafta uchun grafik:

    <b>${deadline.map(item => `${weekDays[item.id]}: ${item.total} ta`).join("\n")}</b>
    commit yozishingiz kerak!!
    
    Bugun kamida ${
      deadline[0].total
    } ta commit yozishingiz kerak. Commitlarni hisoblashda haftadagi jarimalar hisobga olinadi.`;

    await notifyDevelopers(message, false);
  } else {
    const message = dedent`
    #morning_reminder
    
    Bugun ${date}-yil
    Bugun kamida 7 ta commit yozishingiz kerak. Commitlarni hisoblashda haftadagi jarimalar hisobga olinadi.`;

    await notifyDevelopers(message, false);
  }
};

export default morningReminder;
