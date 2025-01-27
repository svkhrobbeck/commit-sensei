import dedent from "dedent";

import { getDeadline } from "../sheets";
import { getAllRepoCommitCounts } from "../github";
import { formatDate, notifyDevelopers, sendMessageToChannel } from "../../utils";
import { weekDays } from "../../helpers/constants";

const afternoonReminder = async () => {
  const todayCommitCounts = await getAllRepoCommitCounts();
  const deadline = await getDeadline();

  const dateInstance = new Date();
  const date = formatDate(dateInstance, "DD-MM-YYYY");

  if (dateInstance.getDay() === 1) {
    const deadline = await getDeadline();

    const message = dedent`
    #afternoon_reminder #new_week
    
    Bugun ${date}, yangi hafta boshlanmoqda, hafta uchun grafik:
    
    <b>${deadline.map(item => `${weekDays[item.id]}: ${item.total} ta`).join("\n")}</b>
    commit yozishingiz kerak!!
    
    Bugun kamida ${
      deadline[0].total
    } ta commit yozishingiz kerak. Commitlarni hisoblashda haftadagi jarimalar hisobga olinadi.`;

    await notifyDevelopers(message, false);
    await sendMessageToChannel(message, false);
  } else {
    const todayTask = deadline.find(item => item.date === date);

    if (todayTask) {
      if (todayCommitCounts < todayTask.total) {
        const stockCommit = todayTask.total - todayCommitCounts;

        const message = dedent`
        #afternoon_reminder
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kun oxirigacha yana ${stockCommit} ta commit yozishingiz kerak. Agarda limitni bajarmasangiz jarima yoziladi!!`;

        await notifyDevelopers(message, false);
      } else {
        await notifyDevelopers(
          dedent`
          #afternoon_reminder
          
          Bugun ${todayCommitCounts} ta commit yozdingiz, kunlik limit allaqachon bajarilgan, tabriklaymiz!`,
          false
        );
      }
    }
  }
};
export default afternoonReminder;
