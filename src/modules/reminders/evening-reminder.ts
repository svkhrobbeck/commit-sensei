import dedent from "dedent";

import { getDeadline } from "../sheets";
import { getAllRepoCommitCounts } from "../github";
import { formatDate, notifyDevelopers } from "../../utils";

const eveningReminder = async () => {
  const todayCommitCounts = await getAllRepoCommitCounts();
  const deadline = await getDeadline();

  const dateInstance = new Date();
  const todayDate = formatDate(dateInstance, "DD-MM-YYYY");
  const todayTask = deadline.find(item => item.date === todayDate && dateInstance.getDay() === item.id && !item.passed);

  if (todayTask) {
    if (todayCommitCounts < todayTask.total) {
      const stockCommit = todayTask.total - todayCommitCounts;

      const message = dedent`
    #evening_reminder
    
    Bugun ${todayCommitCounts} ta commit yozdingiz, kun oxirigacha yana 4 soat vaqtingiz bor, 23:58 gacha ${stockCommit} ta commit yozishingiz kerak. Agarda limitni bajarmasangiz jarima yoziladi!!`;

      await notifyDevelopers(message, false);
    } else {
      await notifyDevelopers(
        dedent`
      #evening_reminder
      
      Bugun ${todayCommitCounts} ta commit yozdingiz, kunlik limit allaqachon bajarilgan, tabriklaymiz!`,
        false
      );
    }
  }
};

export default eveningReminder;
